import {
  EnvelopeDetailShell,
  type EnvelopeDeletionNotice,
} from "@/components/envelopes/envelope-detail-shell";
import { isAdminUser } from "@/lib/auth/admin";
import { getAuthSession } from "@/lib/auth/server";
import { getDb } from "@/lib/db/connection";
import {
  formatEnvelopeOwner,
  resolveEnvelopeViewerAccess,
} from "@/lib/envelope-access";
import { getScheduledEnvelopeDeletion } from "@/lib/envelope-deletion";
import { getEnvelopeDetailDataForUser } from "@/lib/envelopes";

const deletionDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

type EnvelopeDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EnvelopeDetailPage({
  params,
}: EnvelopeDetailPageProps) {
  const { id } = await params;

  let detailRecord: Awaited<ReturnType<typeof getEnvelopeDetailDataForUser>> =
    null;
  let initialState: "error" | "not-found" | undefined;
  let canDeleteFinished = false;
  let ownerLabel: string | undefined;
  let scheduledDeletion: EnvelopeDeletionNotice | undefined;

  try {
    const session = await getAuthSession();
    // Its sender's, or, for an administrator, anyone's.
    const access = session
      ? await resolveEnvelopeViewerAccess(session.user.id, id, getDb())
      : null;

    detailRecord = access
      ? await getEnvelopeDetailDataForUser(access.ownerUserId, id, getDb())
      : null;
    initialState = detailRecord ? undefined : "not-found";
    ownerLabel =
      access && !access.viewerIsOwner ? formatEnvelopeOwner(access) : undefined;
    // Only an administrator may delete a finished envelope.
    canDeleteFinished =
      detailRecord !== null &&
      session !== null &&
      (await isAdminUser(session.user.id, getDb()));

    const scheduled = detailRecord
      ? await getScheduledEnvelopeDeletion(id, getDb())
      : null;

    scheduledDeletion = scheduled
      ? {
          deleteOnLabel: deletionDateFormatter.format(
            new Date(scheduled.deleteAfter * 1000),
          ),
          // Why is for administrators; the sender is told who asked.
          reason: canDeleteFinished ? scheduled.reason : null,
          requestedByEmail: scheduled.requestedByEmail,
        }
      : undefined;
  } catch {
    initialState = "error";
  }

  return (
    <EnvelopeDetailShell
      canDeleteFinished={canDeleteFinished}
      envelopeId={id}
      initialState={initialState}
      key={id}
      ownerLabel={ownerLabel}
      record={detailRecord ?? undefined}
      scheduledDeletion={scheduledDeletion}
    />
  );
}
