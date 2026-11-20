import { NextResponse } from "next/server";

import { getDb } from "@/lib/db/connection";
import { logRouteError } from "@/lib/security/logging";
import {
  applyRateLimit,
  buildRateLimitKey,
} from "@/lib/security/route-controls";
import { getClientIpAddress } from "@/lib/security/request";
import {
  SigningAccessError,
  SigningMutationError,
  sendSignerSmsCode,
} from "@/lib/signing";

type SmsCodeRouteContext = {
  params: Promise<{
    token: string;
  }>;
};

const NO_STORE = { "cache-control": "private, no-store" };

export async function POST(request: Request, context: SmsCodeRouteContext) {
  const { token } = await context.params;
  // Texts cost money and codes are short: a tight window per link.
  const rateLimitResponse = await applyRateLimit({
    category: "signing_sms_code",
    key: buildRateLimitKey(["signing-sms-code", token]),
    limit: 5,
    message: "Several codes were sent already. Check your messages.",
    request,
    windowMs: 60 * 60 * 1000,
  });

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    return NextResponse.json(
      await sendSignerSmsCode(token, { database: getDb() }),
      { headers: NO_STORE },
    );
  } catch (error) {
    if (error instanceof SigningMutationError) {
      return NextResponse.json(
        { error: error.message },
        { headers: NO_STORE, status: error.statusCode },
      );
    }

    if (error instanceof SigningAccessError) {
      return NextResponse.json(
        { error: error.message, state: error.state },
        { headers: NO_STORE, status: error.statusCode },
      );
    }

    logRouteError(error, {
      category: "signing_sms_code_failure",
      ipAddress: getClientIpAddress(request.headers),
      message: "Unexpected failure while sending a signer code.",
      path: request.url,
    });

    return NextResponse.json(
      { error: "The code could not be sent right now." },
      { headers: NO_STORE, status: 500 },
    );
  }
}
