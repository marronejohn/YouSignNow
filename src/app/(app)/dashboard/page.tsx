import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { isAdminUser } from "@/lib/auth/admin";
import { getAuthSession } from "@/lib/auth/server";
import { getDb } from "@/lib/db/connection";
import {
  listAllEnvelopesForAdmin,
  listEnvelopesForUser,
  type DashboardEnvelopePage,
} from "@/lib/envelopes";

/** Envelopes on one page of the dashboard. */
const DASHBOARD_PAGE_SIZE = 48;

type DashboardPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstValue(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

function buildDashboardHref({
  page,
  search,
  showAll,
}: {
  page: number;
  search: string;
  showAll: boolean;
}): string {
  const params = new URLSearchParams();

  if (showAll) {
    params.set("view", "all");
  }

  if (search) {
    params.set("q", search);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();

  return query ? `/dashboard?${query}` : "/dashboard";
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const session = await getAuthSession();
  const database = getDb();
  const params = await searchParams;
  const view = firstValue(params.view);
  const search = firstValue(params.q).trim().slice(0, 160);
  const requestedPage = Number.parseInt(firstValue(params.page), 10);
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 1
      ? requestedPage
      : 1;
  let result: DashboardEnvelopePage | undefined;
  let initialState: "default" | "empty" | "error" = "error";
  let isAdmin = false;
  let showAll = false;

  try {
    isAdmin = session ? await isAdminUser(session.user.id, database) : false;
    // An administrator can see every envelope in the install, not only
    // their own.
    showAll = isAdmin && view === "all";

    const filters = {
      limit: DASHBOARD_PAGE_SIZE,
      page,
      ...(search ? { search } : {}),
    };

    result = !session
      ? { envelopes: [], hasMore: false }
      : showAll
        ? await listAllEnvelopesForAdmin(session.user.id, filters, database)
        : await listEnvelopesForUser(session.user.id, filters, database);
    // Nothing at all yet, as opposed to nothing that matches or nothing
    // on this page.
    initialState =
      result.envelopes.length === 0 && !search && page === 1
        ? "empty"
        : "default";
  } catch {
    initialState = "error";
  }

  return (
    <DashboardShell
      // A new search or view starts the shell afresh, with its own search box.
      key={`${String(showAll)}:${search}`}
      envelopes={result?.envelopes}
      initialSearch={search}
      initialState={initialState}
      pagination={{
        newerHref:
          page > 1
            ? buildDashboardHref({ page: page - 1, search, showAll })
            : undefined,
        olderHref: result?.hasMore
          ? buildDashboardHref({ page: page + 1, search, showAll })
          : undefined,
      }}
      view={isAdmin ? (showAll ? "all" : "mine") : undefined}
    />
  );
}
