import { createHash, randomUUID } from "node:crypto";
import { mkdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import { readEnv, type EnvSource } from "../utils/env.ts";

// SMS is configured like email: no credentials means the capture driver,
// which writes each message to the local outbox instead of sending it. With
// TWILIO_* set the service sends through Twilio's REST API.

const DEFAULT_CAPTURE_DIR = ".data/outbox";

export type SmsDriver = "capture" | "twilio";

export type SmsMessage = {
  text: string;
  to: string;
};

export type SmsDeliveryResult = {
  messageId?: string;
};

export type SmsSendOptions = {
  idempotencyKey?: string;
};

export function resolveSmsDriver(env: EnvSource = process.env): SmsDriver {
  const configured = readEnv(env, "SMS_DRIVER");

  if (configured === "twilio" || configured === "capture") {
    return configured;
  }

  if (
    readEnv(env, "TWILIO_ACCOUNT_SID") &&
    readEnv(env, "TWILIO_AUTH_TOKEN") &&
    readEnv(env, "TWILIO_FROM_NUMBER")
  ) {
    return "twilio";
  }

  return "capture";
}

export class SmsSendError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SmsSendError";
  }
}

export type SmsService = {
  send(
    message: SmsMessage,
    options?: SmsSendOptions,
  ): Promise<SmsDeliveryResult>;
};

type CreateSmsServiceOptions = {
  env?: EnvSource;
  fetch?: typeof globalThis.fetch;
};

export function createSmsService(
  options: CreateSmsServiceOptions = {},
): SmsService {
  const driver = resolveSmsDriver(options.env);

  if (driver === "twilio") {
    return createTwilioSmsService(options);
  }

  return createCaptureSmsService(options);
}

/** The capture driver writes each message to the local outbox instead. */
function createCaptureSmsService(options: CreateSmsServiceOptions): SmsService {
  const env = options.env ?? process.env;
  const dir = readEnv(env, "CAPTURE_OUTBOX_DIR") ?? DEFAULT_CAPTURE_DIR;

  return {
    async send(message, sendOptions = {}) {
      const messageId = `capture-${randomUUID()}`;
      const now = new Date().toISOString();
      const record = {
        idempotencyKey: sendOptions.idempotencyKey ?? null,
        messageId,
        sentAt: now,
        text: message.text,
        to: message.to,
      };
      const digest = createHash("sha256")
        .update(sendOptions.idempotencyKey ?? messageId)
        .digest("hex")
        .slice(0, 24);
      const target = path.join(dir, `sms-${digest}.json`);
      const staging = `${target}.tmp`;

      await mkdir(dir, { recursive: true });
      await writeFile(staging, JSON.stringify(record, null, 2));
      await rename(staging, target);

      return { messageId };
    },
  };
}

function createTwilioSmsService(options: CreateSmsServiceOptions): SmsService {
  const env = options.env ?? process.env;
  const accountSid = readEnv(env, "TWILIO_ACCOUNT_SID")!;
  const authToken = readEnv(env, "TWILIO_AUTH_TOKEN")!;
  const fromNumber = readEnv(env, "TWILIO_FROM_NUMBER")!;
  const doFetch = options.fetch ?? globalThis.fetch;
  const credentials = Buffer.from(`${accountSid}:${authToken}`).toString(
    "base64",
  );

  return {
    async send(message) {
      const response = await doFetch(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          body: new URLSearchParams({
            Body: message.text,
            From: fromNumber,
            To: message.to,
          }),
          headers: {
            authorization: `Basic ${credentials}`,
            "content-type": "application/x-www-form-urlencoded",
          },
          method: "POST",
        },
      );

      if (!response.ok) {
        const detail = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;

        throw new SmsSendError(
          detail?.message ??
            `Twilio refused the message (status ${String(response.status)}).`,
        );
      }

      const payload = (await response.json()) as { sid?: string };

      return { messageId: payload.sid };
    },
  };
}
