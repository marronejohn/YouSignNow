import assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildVerificationCookieValue,
  checkAccessCode,
  checkEmailCode,
  hashAccessCode,
  issueEmailCode,
  maskEmailAddress,
  readCookie,
  readVerifiedMethods,
  requiredSignerChecks,
} from "./signer-checks.ts";

test("an access code matches regardless of case and spaces, and nothing else does", () => {
  const stored = hashAccessCode("Blue Harbor 42");

  assert.equal(checkAccessCode("blueharbor42", stored), true);
  assert.equal(checkAccessCode(" BLUE HARBOR 42 ", stored), true);
  assert.equal(checkAccessCode("blueharbor43", stored), false);
  assert.equal(checkAccessCode("blueharbor42", "garbage"), false);
});

test("an emailed code is six digits and checks against its hash", () => {
  const { code, hash } = issueEmailCode();

  assert.match(code, /^\d{6}$/);
  assert.equal(checkEmailCode(code, hash), true);
  assert.equal(
    checkEmailCode(code === "000000" ? "000001" : "000000", hash),
    false,
  );
});

test("the verification cookie is bound to its link and expires", () => {
  const now = 1_800_000_000;
  const { value } = buildVerificationCookieValue(
    "hash-a",
    ["email_code", "access_code"],
    now,
  );

  assert.deepEqual(readVerifiedMethods("hash-a", value, now + 60), [
    "access_code",
    "email_code",
  ]);
  assert.deepEqual(readVerifiedMethods("hash-b", value, now + 60), []);
  assert.deepEqual(readVerifiedMethods("hash-a", value, now + 9 * 60 * 60), []);
});

test("a cookie whose method list was edited is rejected", () => {
  const now = 1_800_000_000;
  const { value } = buildVerificationCookieValue(
    "hash-a",
    ["access_code"],
    now,
  );
  const [expires, , signature] = value.split(".");

  assert.deepEqual(
    readVerifiedMethods(
      "hash-a",
      `${expires}.access_code+email_code.${signature}`,
      now,
    ),
    [],
  );
});

test("required checks follow the signer's settings", () => {
  assert.deepEqual(
    requiredSignerChecks({
      accessCodeHash: null,
      phoneE164: null,
      requireEmailCode: false,
      requireSmsCode: false,
    }),
    [],
  );
  assert.deepEqual(
    requiredSignerChecks({
      accessCodeHash: "x",
      phoneE164: null,
      requireEmailCode: true,
      requireSmsCode: false,
    }),
    ["access_code", "email_code"],
  );

  assert.deepEqual(
    requiredSignerChecks({
      accessCodeHash: null,
      phoneE164: "+61402123456",
      requireEmailCode: false,
      requireSmsCode: true,
    }),
    ["sms_code"],
  );

  // No phone number, no texted code to check.
  assert.deepEqual(
    requiredSignerChecks({
      accessCodeHash: null,
      phoneE164: null,
      requireEmailCode: false,
      requireSmsCode: true,
    }),
    [],
  );
});

test("cookie and address helpers", () => {
  assert.equal(readCookie("a=1; sd_v_x=abc%2Edef; b=2", "sd_v_x"), "abc.def");
  assert.equal(readCookie(null, "a"), null);
  assert.equal(maskEmailAddress("jane@acme.com"), "j***@acme.com");
});
