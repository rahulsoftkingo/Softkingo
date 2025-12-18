import prisma from "@/lib/prisma";
import Link from "next/link";

function getDateRange(range) {
  const now = new Date();
  if (range === "7d") {
    const d = new Date(now);
    d.setDate(d.getDate() - 7);
    return d;
  }
  if (range === "30d") {
    const d = new Date(now);
    d.setDate(d.getDate() - 30);
    return d;
  }
  return null;
}

export default async function NewsletterDetailPage(ctx) {
  const { params, searchParams } = ctx;
  const { id } = await params;
  const qs = await searchParams;

  const listId = Number(id);
  const statusFilter = (qs?.status || "all").toString(); // all | active | inactive
  const sourceFilter = (qs?.source || "all").toString();
  const range = (qs?.range || "all").toString(); // 7d | 30d | all

  const list = await prisma.newsletterList.findUnique({
    where: { id: listId },
    include: {
      _count: {
        select: { subscribers: true, campaigns: true },
      },
    },
  });

  if (!list) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-600">List not found.</p>
      </div>
    );
  }

  const dateFrom = getDateRange(range);

  const whereSub = {
    listId,
    ...(statusFilter === "active"
      ? { status: "active" }
      : statusFilter === "inactive"
      ? { status: "inactive" }
      : {}),
    ...(sourceFilter !== "all" ? { source: sourceFilter } : {}),
    ...(dateFrom ? { subscribedAt: { gte: dateFrom } } : {}),
  };

  const [subscribers, campaigns] = await Promise.all([
    prisma.newsletterSubscription.findMany({
      where: whereSub,
      orderBy: { subscribedAt: "desc" },
      take: 200,
    }),
    prisma.emailCampaign.findMany({
      where: { listId },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const buildUrl = (nextStatus, nextSource, nextRange) => {
    const params = new URLSearchParams();
    if (nextStatus) params.set("status", nextStatus);
    if (nextSource) params.set("source", nextSource);
    if (nextRange) params.set("range", nextRange);
    const query = params.toString();
    return query
      ? `/admin/newsletters/${list.id}?${query}`
      : `/admin/newsletters/${list.id}`;
  };

  const uniqueSources = Array.from(
    new Set(subscribers.map((s) => s.source).filter(Boolean))
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-slate-500 uppercase tracking-wide">
            Newsletter list
          </p>
          <h1 className="text-lg font-semibold text-slate-900">
            {list.name}
          </h1>
          <p className="text-xs text-slate-500">
            {list.slug} · {list._count.subscribers} subscribers ·{" "}
            {list._count.campaigns} campaigns
          </p>
        </div>
        <Link
          href="/admin/newsletters"
          className="text-xs text-slate-500 hover:text-sky-600"
        >
          ← Back to lists
        </Link>
      </div>

      {/* Subscribers */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-800">
            Subscribers
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {/* Status filter */}
            <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1">
              <span className="text-[10px] uppercase text-slate-500">
                Status
              </span>
              <Link
                href={buildUrl("all", sourceFilter, range)}
                className={`px-2 py-0.5 rounded-full ${
                  statusFilter === "all"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                All
              </Link>
              <Link
                href={buildUrl("active", sourceFilter, range)}
                className={`px-2 py-0.5 rounded-full ${
                  statusFilter === "active"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Active
              </Link>
              <Link
                href={buildUrl("inactive", sourceFilter, range)}
                className={`px-2 py-0.5 rounded-full ${
                  statusFilter === "inactive"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Inactive
              </Link>
            </div>

            {/* Source filter */}
            <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1">
              <span className="text-[10px] uppercase text-slate-500">
                Source
              </span>
              <Link
                href={buildUrl(statusFilter, "all", range)}
                className={`px-2 py-0.5 rounded-full ${
                  sourceFilter === "all"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                All
              </Link>
              {uniqueSources.map((src) => (
                <Link
                  key={src}
                  href={buildUrl(statusFilter, src, range)}
                  className={`px-2 py-0.5 rounded-full ${
                    sourceFilter === src
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {src}
                </Link>
              ))}
            </div>

            {/* Time range */}
            <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1">
              <span className="text-[10px] uppercase text-slate-500">
                Range
              </span>
              <Link
                href={buildUrl(statusFilter, sourceFilter, "7d")}
                className={`px-2 py-0.5 rounded-full ${
                  range === "7d"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                7d
              </Link>
              <Link
                href={buildUrl(statusFilter, sourceFilter, "30d")}
                className={`px-2 py-0.5 rounded-full ${
                  range === "30d"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                30d
              </Link>
              <Link
                href={buildUrl(statusFilter, sourceFilter, "all")}
                className={`px-2 py-0.5 rounded-full ${
                  range === "all"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                All
              </Link>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                  Email
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                  Source
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                  Status
                </th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-500">
                  Subscribed
                </th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr
                  key={s.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-3 py-2">
                    <p className="text-sm text-slate-900">{s.email}</p>
                    {s.name && (
                      <p className="text-[11px] text-slate-500">
                        {s.name}
                      </p>
                    )}
                  </td>
                  <td className="px-3 py-2 text-xs text-slate-600">
                    {s.source || "—"}
                  </td>
                  <td className="px-3 py-2 text-xs text-slate-600">
                    {s.status}
                  </td>
                  <td className="px-3 py-2 text-right text-[11px] text-slate-500">
                    {new Date(s.subscribedAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
              {!subscribers.length && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-3 py-6 text-center text-xs text-slate-500"
                  >
                    No subscribers for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Campaigns summary (link to /campaigns) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-800">
            Campaigns
          </h2>
          <Link
            href={`/admin/newsletters/${list.id}/campaigns/new`}
            className="px-3 py-1.5 rounded-md bg-sky-600 text-white text-xs font-semibold hover:bg-sky-500"
          >
            New campaign
          </Link>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                  Name
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                  Subject
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                  Status
                </th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-500">
                  Scheduled / Sent
                </th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr
                  key={c.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-3 py-2">
                    <Link
                      href={`/admin/newsletters/${list.id}/campaigns/${c.id}`}
                      className="text-sm font-medium text-slate-900 hover:text-sky-700"
                    >
                      {c.name}
                    </Link>
                    <p className="text-[11px] text-slate-400">
                      {c.slug}
                    </p>
                  </td>
                  <td className="px-3 py-2 text-xs text-slate-700">
                    {c.subject}
                  </td>
                  <td className="px-3 py-2 text-xs text-slate-700">
                    {c.status}
                  </td>
                  <td className="px-3 py-2 text-right text-[11px] text-slate-500">
                    {c.sentAt
                      ? `Sent: ${new Date(c.sentAt).toLocaleString()}`
                      : c.scheduledFor
                      ? `Scheduled: ${new Date(
                          c.scheduledFor
                        ).toLocaleString()}`
                      : "Draft"}
                  </td>
                </tr>
              ))}
              {!campaigns.length && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-3 py-6 text-center text-xs text-slate-500"
                  >
                    No campaigns yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
