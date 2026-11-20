import { createHash } from "node:crypto";

import type pg from "pg";

// One account may send ten envelopes an hour (the limit in
// src/app/api/envelopes/[id]/send/route.ts), and together the tests send
// more than that as the administrator. A test that sends starts that count
// afresh, so whether it is refused does not depend on how many ran before.

export async function startSendLimitAfresh(
  database: pg.Client,
  userId: string,
): Promise<void> {
  await database.query("delete from public.rate_limits where key = $1", [
    createHash("sha256").update(`envelope-send:${userId}`).digest("hex"),
  ]);
}
