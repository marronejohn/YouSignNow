-- SMS signer authentication: a one-time code texted to the signer's phone
-- when they open the link. Mirrors the emailed code: the phone number and
-- the toggle are on the signer, the code is hashed and single-use, and the
-- attempt counter stops guessing.

alter table public.signers
  add column if not exists phone_e164 text,
  add column if not exists require_sms_code boolean not null default false,
  add column if not exists sms_code_hash text,
  add column if not exists sms_code_expires_at bigint,
  add column if not exists sms_code_attempts integer not null default 0,
  add column if not exists sms_code_sent_at bigint;

create index if not exists idx_signers_sms_code_pending
  on public.signers (id)
  where sms_code_hash is not null;
