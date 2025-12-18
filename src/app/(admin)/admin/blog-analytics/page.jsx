import prisma from "@/lib/prisma";
import Link from "next/link";

// Simple helper: which date range to use
function getDateRange(range) {
  const now = new Date();
  if (range === "7d") {
    const from = new Date(now);
    from.setDate(from.getDate() - 7);
    return from;
  }
  if (range === "30d") {
    const from = new Date(now);
    from.setDate(from.getDate() - 30);
    return from;
  }
  return null; // all time
}

export default async function AdminBlogAnalyticsPage( ctx ) {
      // In Next 15, ctx.searchParams is a Promise
  const { searchParams } = ctx;
  const resolved = await searchParams;


  const range = (resolved?.range || "30d").toString(); // '7d' | '30d' | 'all'
  const sort = (resolved?.sort || "views").toString(); // 'views' | 'likes' | 'recent'

  const fromDate = getDateRange(range);

  const whereBase = {
    status: "published",
    ...(fromDate
      ? {
          publishedAt: { gte: fromDate },
        }
      : {}),
  };

  let orderBy = { viewCount: "desc" };
  if (sort === "likes") orderBy = { likeCount: "desc" };
  if (sort === "recent") orderBy = { publishedAt: "desc" };

  // Fetch posts with counters + feedbacks
  const posts = await prisma.blogPost.findMany({
    where: whereBase,
    orderBy,
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      viewCount: true,
      likeCount: true,
      shareCount: true,
      publishedAt: true,
      feedbacks: {
        select: { rating: true },
      },
    },
  });

  // Enrich with avg rating, total feedbacks, engagement %
  const enrichedPosts = posts.map((p) => {
    const totalFeedbacks = p.feedbacks.length;
    const avgRating =
      totalFeedbacks > 0
        ? (
            p.feedbacks.reduce((sum, f) => sum + f.rating, 0) /
            totalFeedbacks
          ).toFixed(1)
        : null;
    const engagementScore =
      p.viewCount > 0
        ? ((p.likeCount + totalFeedbacks) / p.viewCount) * 100
        : 0;

    return {
      ...p,
      totalFeedbacks,
      avgRating,
      engagementScore: Number(engagementScore.toFixed(1)),
    };
  });

  // Totals for header
  const totalViews = enrichedPosts.reduce(
    (sum, p) => sum + p.viewCount,
    0
  );
  const totalLikes = enrichedPosts.reduce(
    (sum, p) => sum + p.likeCount,
    0
  );
  const totalShares = enrichedPosts.reduce(
    (sum, p) => sum + p.shareCount,
    0
  );
  const totalFeedbacks = enrichedPosts.reduce(
    (sum, p) => sum + p.totalFeedbacks,
    0
  );

  // Top and low engagement lists
  const topByViews = [...enrichedPosts]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5);

  const lowEngagement = enrichedPosts
    .filter((p) => p.viewCount >= 50)
    .sort((a, b) => a.engagementScore - b.engagementScore)
    .slice(0, 5);

  const buildUrl = (nextRange, nextSort) => {
    const params = new URLSearchParams();
    if (nextRange) params.set("range", nextRange);
    if (nextSort) params.set("sort", nextSort);
    const query = params.toString();
    return query ? `/admin/blog-analytics?${query}` : "/admin/blog-analytics";
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            Blog Analytics
          </h1>
          <p className="text-xs text-slate-500">
            Track views, likes, shares and reader feedback for blog posts.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 text-xs">
          <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1">
            <span className="text-[10px] uppercase text-slate-500">
              Range
            </span>
            <Link
              href={buildUrl("7d", sort)}
              className={`px-2 py-0.5 rounded-full ${
                range === "7d"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              7d
            </Link>
            <Link
              href={buildUrl("30d", sort)}
              className={`px-2 py-0.5 rounded-full ${
                range === "30d"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              30d
            </Link>
            <Link
              href={buildUrl("all", sort)}
              className={`px-2 py-0.5 rounded-full ${
                range === "all"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              All time
            </Link>
          </div>

          <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1">
            <span className="text-[10px] uppercase text-slate-500">
              Sort by
            </span>
            <Link
              href={buildUrl(range, "views")}
              className={`px-2 py-0.5 rounded-full ${
                sort === "views"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Views
            </Link>
            <Link
              href={buildUrl(range, "likes")}
              className={`px-2 py-0.5 rounded-full ${
                sort === "likes"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Likes
            </Link>
            <Link
              href={buildUrl(range, "recent")}
              className={`px-2 py-0.5 rounded-full ${
                sort === "recent"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Recent
            </Link>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <p className="text-[11px] text-slate-500 uppercase tracking-wide">
            Total views
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-900">
            {totalViews}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <p className="text-[11px] text-slate-500 uppercase tracking-wide">
            Total likes
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-900">
            {totalLikes}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <p className="text-[11px] text-slate-500 uppercase tracking-wide">
            Total shares
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-900">
            {totalShares}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <p className="text-[11px] text-slate-500 uppercase tracking-wide">
            Feedback received
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-900">
            {totalFeedbacks}
          </p>
        </div>
      </section>

      {/* Main table */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-800">
          Post performance
        </h2>
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                  Post
                </th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-500">
                  Views
                </th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-500">
                  Likes
                </th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-500">
                  Shares
                </th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-500">
                  Feedback
                </th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-500">
                  Avg rating
                </th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-500">
                  Engagement %
                </th>
              </tr>
            </thead>
            <tbody>
              {enrichedPosts.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-3 py-2">
                    <Link
                      href={`/admin/blog/edit/${p.id}`}
                      className="text-sm font-medium text-slate-900 hover:text-sky-700"
                    >
                      {p.title}
                    </Link>
                    <p className="text-[11px] text-slate-400">{p.slug}</p>
                  </td>
                  <td className="px-3 py-2 text-right text-xs text-slate-700">
                    {p.viewCount}
                  </td>
                  <td className="px-3 py-2 text-right text-xs text-slate-700">
                    {p.likeCount}
                  </td>
                  <td className="px-3 py-2 text-right text-xs text-slate-700">
                    {p.shareCount}
                  </td>
                  <td className="px-3 py-2 text-right text-xs text-slate-700">
                    {p.totalFeedbacks}
                  </td>
                  <td className="px-3 py-2 text-right text-xs text-slate-700">
                    {p.avgRating ? `${p.avgRating} / 5` : "—"}
                  </td>
                  <td className="px-3 py-2 text-right text-xs text-slate-700">
                    {p.engagementScore}%
                  </td>
                </tr>
              ))}
              {!enrichedPosts.length && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-3 py-6 text-center text-xs text-slate-500"
                  >
                    No blog posts found for this range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Top / low engagement */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-800">
            Top posts by views
          </h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-3 space-y-2">
            {topByViews.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/admin/blog/edit/${p.id}`}
                    className="block text-[13px] font-medium text-slate-900 hover:text-sky-700 line-clamp-1"
                  >
                    {p.title}
                  </Link>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {p.slug}
                  </p>
                </div>
                <div className="text-right ml-2">
                  <p className="text-[11px] text-slate-700">
                    {p.viewCount} views
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {p.likeCount} likes · {p.totalFeedbacks} fb
                  </p>
                </div>
              </div>
            ))}
            {!topByViews.length && (
              <p className="text-[11px] text-slate-500">
                Not enough data yet.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-800">
            Low engagement posts
          </h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-3 space-y-2">
            {lowEngagement.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/admin/blog/edit/${p.id}`}
                    className="block text-[13px] font-medium text-slate-900 hover:text-sky-700 line-clamp-1"
                  >
                    {p.title}
                  </Link>
                  <p className="text-[11px] text-slate-500">
                    {p.viewCount} views · {p.totalFeedbacks} fb ·{" "}
                    {p.likeCount} likes
                  </p>
                </div>
                <div className="text-right ml-2">
                  <p className="text-[11px] text-slate-700">
                    {p.engagementScore}%
                  </p>
                  <p className="text-[10px] text-slate-500">
                    engagement
                  </p>
                </div>
              </div>
            ))}
            {!lowEngagement.length && (
              <p className="text-[11px] text-slate-500">
                No low engagement posts for this range.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
