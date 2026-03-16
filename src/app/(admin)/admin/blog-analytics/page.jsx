// src/app/(admin)/admin/blog-analytics/page.jsx
import prisma from "@/lib/prisma";
import Link from "next/link";
import { 
  Eye, 
  Heart, 
  Share2, 
  MessageSquare, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Filter,
  Star,
  ArrowUpRight,
  BarChart3,
  Users,
  FileText,
  Clock,
  Download,
  BookOpen,
  Tag,
  Layers,
} from 'lucide-react';

export const dynamic = "force-dynamic";

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
  if (range === "90d") {
    const from = new Date(now);
    from.setDate(from.getDate() - 90);
    return from;
  }
  return null; // all time
}

export default async function AdminBlogAnalyticsPage(ctx) {
  const { searchParams } = ctx;
  const resolved = await searchParams;

  const range = (resolved?.range || "30d").toString();
  const sort = (resolved?.sort || "views").toString();
  const view = (resolved?.view || "blog").toString(); // blog | ebook | categories | tags

  const fromDate = getDateRange(range);

  // ==================== BLOG POSTS ====================
  const whereBase = {
    status: "published",
    ...(fromDate ? { publishedAt: { gte: fromDate } } : {}),
  };

  let orderBy = { viewCount: "desc" };
  if (sort === "likes") orderBy = { likeCount: "desc" };
  if (sort === "shares") orderBy = { shareCount: "desc" };
  if (sort === "engagement") orderBy = { viewCount: "desc" };
  if (sort === "recent") orderBy = { publishedAt: "desc" };
  if (sort === "downloads") orderBy = { downloadCount: "desc" };

  const posts = await prisma.blogPost.findMany({
    where: whereBase,
    orderBy,
    include: {
      feedbacks: {
        select: { rating: true, comment: true },
      },
      category: {
        select: { id: true, name: true },
      },
      tags: {
        include: {
          tag: {
            select: { id: true, name: true },
          },
        },
      },
      author: {
        select: { name: true },
      },
    },
  });

  const enrichedPosts = posts.map((p) => {
    const totalFeedbacks = p.feedbacks.length;
    const avgRating =
      totalFeedbacks > 0
        ? (p.feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalFeedbacks).toFixed(1)
        : null;
    
    const engagementScore =
      p.viewCount > 0
        ? ((p.likeCount + p.shareCount + totalFeedbacks) / p.viewCount) * 100
        : 0;

    return {
      ...p,
      totalFeedbacks,
      avgRating,
      engagementScore: Number(engagementScore.toFixed(2)),
    };
  });

  if (sort === "engagement") {
    enrichedPosts.sort((a, b) => b.engagementScore - a.engagementScore);
  }

  const totalPosts = enrichedPosts.length;
  const totalViews = enrichedPosts.reduce((sum, p) => sum + p.viewCount, 0);
  const totalLikes = enrichedPosts.reduce((sum, p) => sum + p.likeCount, 0);
  const totalShares = enrichedPosts.reduce((sum, p) => sum + p.shareCount, 0);
  const totalFeedbacks = enrichedPosts.reduce((sum, p) => sum + p.totalFeedbacks, 0);
  const avgEngagement = totalPosts > 0
    ? (enrichedPosts.reduce((sum, p) => sum + p.engagementScore, 0) / totalPosts).toFixed(2)
    : 0;

  // ==================== EBOOKS ====================
  const ebookWhere = {
    status: "published",
    ...(fromDate ? { publishedAt: { gte: fromDate } } : {}),
  };

  const ebooks = await prisma.ebook.findMany({
    where: ebookWhere,
    orderBy: sort === "downloads" ? { downloadCount: "desc" } : { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      downloadCount: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  const totalEbooks = ebooks.length;
  const totalEbookDownloads = ebooks.reduce((sum, g) => sum + g.downloadCount, 0);

  // Top Ebooks
  const topEbooks = [...ebooks]
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, 5);

  // ==================== CATEGORIES ====================
  const allCategories = await prisma.blogCategory.findMany({
    include: {
      posts: {
        where: whereBase,
        select: {
          viewCount: true,
          likeCount: true,
          shareCount: true,
        },
      },
    },
  });

  const categoryStats = allCategories.map(cat => {
    const totalCatViews = cat.posts.reduce((sum, p) => sum + p.viewCount, 0);
    const totalCatLikes = cat.posts.reduce((sum, p) => sum + p.likeCount, 0);
    const totalCatShares = cat.posts.reduce((sum, p) => sum + p.shareCount, 0);
    const postsCount = cat.posts.length;
    
    return {
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      posts: postsCount,
      views: totalCatViews,
      likes: totalCatLikes,
      shares: totalCatShares,
      avgViewsPerPost: postsCount > 0 ? Math.round(totalCatViews / postsCount) : 0,
    };
  }).sort((a, b) => b.views - a.views);

  // ==================== TAGS ====================
 const allTags = await prisma.blogTag.findMany({
    include: {
      posts: {
        include: {
          post: {
            select: {
              id: true,
              status: true,
              publishedAt: true,
              viewCount: true,
              likeCount: true,
              shareCount: true,
            },
          },
        },
      },
    },
  });

  // ✅ Filter and calculate stats in JavaScript
  const tagStats = allTags.map(tag => {
    // Filter posts by status and date range
    const filteredPosts = tag.posts
      .map(pt => pt.post)
      .filter(post => {
        if (post.status !== 'published') return false;
        if (fromDate && post.publishedAt) {
          return new Date(post.publishedAt) >= fromDate;
        }
        return true;
      });

    const totalTagViews = filteredPosts.reduce((sum, p) => sum + p.viewCount, 0);
    const totalTagLikes = filteredPosts.reduce((sum, p) => sum + p.likeCount, 0);
    const totalTagShares = filteredPosts.reduce((sum, p) => sum + p.shareCount, 0);
    const postsCount = filteredPosts.length;
    
    return {
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      posts: postsCount,
      views: totalTagViews,
      likes: totalTagLikes,
      shares: totalTagShares,
      avgViewsPerPost: postsCount > 0 ? Math.round(totalTagViews / postsCount) : 0,
    };
  })
  .filter(tag => tag.posts > 0) // ✅ Only include tags with posts
  .sort((a, b) => b.views - a.views);

  // ==================== TOP PERFORMERS ====================
  const topByViews = [...enrichedPosts]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5);

  const topByEngagement = [...enrichedPosts]
    .sort((a, b) => b.engagementScore - a.engagementScore)
    .slice(0, 5);

  const lowEngagement = enrichedPosts
    .filter((p) => p.viewCount >= 50)
    .sort((a, b) => a.engagementScore - b.engagementScore)
    .slice(0, 5);

  const topCategories = categoryStats.slice(0, 5);
  const topTags = tagStats.slice(0, 10);

  // ==================== URL BUILDER ====================
  const buildUrl = (params) => {
    const searchParams = new URLSearchParams();
    if (params.range) searchParams.set("range", params.range);
    if (params.sort) searchParams.set("sort", params.sort);
    if (params.view) searchParams.set("view", params.view);
    const query = searchParams.toString();
    return query ? `/admin/blog-analytics?${query}` : "/admin/blog-analytics";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Content Analytics
            </h1>
            <p className="text-sm lg:text-base text-slate-600 mt-1">
              Track blog, Ebooks, categories & tags performance
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center gap-1 rounded-2xl border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
            <Calendar className="h-3.5 w-3.5 text-slate-500" />
            <span className="text-xs font-semibold text-slate-600">Range:</span>
            {["7d", "30d", "90d", "all"].map((r) => (
              <Link
                key={r}
                href={buildUrl({ range: r, sort, view })}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                  range === r
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {r === "all" ? "All" : r}
              </Link>
            ))}
          </div>

          <div className="inline-flex items-center gap-1 rounded-2xl border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
            <Filter className="h-3.5 w-3.5 text-slate-500" />
            <span className="text-xs font-semibold text-slate-600">Sort:</span>
            {["views", "likes", "engagement", view === "ebook" ? "downloads" : "recent"].map((s) => (
              <Link
                key={s}
                href={buildUrl({ range, sort: s, view })}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                  sort === s
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* View Tabs */}
      <nav className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { key: "blog", label: "Blog Posts", icon: <FileText className="h-4 w-4" />, count: totalPosts },
          { key: "ebook", label: "Ebooks", icon: <BookOpen className="h-4 w-4" />, count: totalEbooks },
          { key: "categories", label: "Categories", icon: <Layers className="h-4 w-4" />, count: categoryStats.length },
          { key: "tags", label: "Tags", icon: <Tag className="h-4 w-4" />, count: tagStats.length },
        ].map((tab) => (
          <Link
            key={tab.key}
            href={buildUrl({ range, sort, view: tab.key })}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-t-xl text-sm font-semibold transition-all whitespace-nowrap ${
              view === tab.key
                ? "bg-white text-indigo-600 border-b-2 border-indigo-600 -mb-[2px]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {tab.icon}
            {tab.label}
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-xs font-bold text-slate-700">
              {tab.count}
            </span>
          </Link>
        ))}
      </nav>

      {/* BLOG VIEW */}
      {view === "blog" && (
        <>
          {/* Summary Cards */}
          <section className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            <StatCard icon={<FileText className="h-5 w-5" />} label="Posts" value={totalPosts.toLocaleString()} color="from-blue-500 to-cyan-500" />
            <StatCard icon={<Eye className="h-5 w-5" />} label="Views" value={totalViews.toLocaleString()} color="from-purple-500 to-pink-500" />
            <StatCard icon={<Heart className="h-5 w-5" />} label="Likes" value={totalLikes.toLocaleString()} color="from-rose-500 to-red-500" />
            <StatCard icon={<Share2 className="h-5 w-5" />} label="Shares" value={totalShares.toLocaleString()} color="from-emerald-500 to-green-500" />
            <StatCard icon={<MessageSquare className="h-5 w-5" />} label="Feedback" value={totalFeedbacks.toLocaleString()} color="from-amber-500 to-orange-500" />
            <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Avg Engagement" value={`${avgEngagement}%`} color="from-indigo-500 to-purple-500" />
          </section>

          {/* Top Categories */}
          <section className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl border border-indigo-100/50 p-6">
            <h2 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Layers className="h-4 w-4 text-indigo-600" />
              Top Categories by Views
            </h2>
            <div className="space-y-3">
              {topCategories.map((cat, idx) => (
                <div key={cat.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{cat.name}</p>
                      <p className="text-xs text-slate-500">{cat.posts} posts • {cat.avgViewsPerPost} avg views/post</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">{cat.views.toLocaleString()}</p>
                    <p className="text-xs text-slate-500">{cat.likes} likes</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Top Performers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopPerformersCard title="Top Posts by Views" icon={<Eye className="h-4 w-4" />} posts={topByViews} metricKey="viewCount" metricLabel="views" color="purple" />
            <TopPerformersCard title="Highest Engagement" icon={<TrendingUp className="h-4 w-4" />} posts={topByEngagement} metricKey="engagementScore" metricLabel="score" suffix="%" color="indigo" />
          </div>

          {/* Low Engagement Alert */}
          {lowEngagement.length > 0 && (
            <section className="rounded-3xl bg-amber-50 border-2 border-amber-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-amber-900">Low Engagement Posts (50+ views)</h2>
                  <p className="text-xs text-amber-700 mt-1">These posts have views but low interaction</p>
                </div>
              </div>
              <div className="space-y-2">
                {lowEngagement.map((p) => (
                  <Link key={p.id} href={`/admin/blog/edit/${p.id}`} className="flex items-center justify-between p-3 rounded-xl bg-white border border-amber-100 hover:border-amber-300 hover:shadow-md transition-all group">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 group-hover:text-amber-700 truncate">{p.title}</p>
                      <p className="text-xs text-slate-500">{p.viewCount} views • {p.likeCount} likes • {p.totalFeedbacks} feedback</p>
                    </div>
                    <div className="text-right ml-3 flex-shrink-0">
                      <p className="text-sm font-bold text-amber-600">{p.engagementScore}%</p>
                      <p className="text-xs text-amber-500">engagement</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* All Posts Table */}
          <BlogPostsTable posts={enrichedPosts} />
        </>
      )}

      {/* EBOOK VIEW */}
      {view === "ebook" && (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard icon={<BookOpen className="h-5 w-5" />} label="Ebooks" value={totalEbooks.toLocaleString()} color="from-blue-500 to-cyan-500" />
            <StatCard icon={<Download className="h-5 w-5" />} label="Total Downloads" value={totalEbookDownloads.toLocaleString()} color="from-purple-500 to-pink-500" />
            <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Avg Downloads" value={totalEbooks > 0 ? Math.round(totalEbookDownloads / totalEbooks) : 0} color="from-emerald-500 to-green-500" />
          </section>

          {/* Top Ebooks */}
          <section className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl border border-purple-100/50 p-6">
            <h2 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Download className="h-4 w-4 text-purple-600" />
              Top Ebooks by Downloads
            </h2>
            <div className="space-y-2">
              {topEbooks.map((guide, idx) => (
                <div key={guide.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all">
                  <div className="flex items-center gap-3">
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                      idx === 1 ? 'bg-slate-100 text-slate-700' :
                      idx === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-slate-50 text-slate-600'
                    }`}>
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{guide.title}</p>
                      <p className="text-xs text-slate-500">{guide.category || 'Uncategorized'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{guide.downloadCount.toLocaleString()}</p>
                    <p className="text-xs text-slate-500">downloads</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* All Ebooks Table */}
          <EbooksTable ebooks={ebooks} />
        </>
      )}

      {/* CATEGORIES VIEW */}
      {view === "categories" && <CategoriesTable categories={categoryStats} />}

      {/* TAGS VIEW */}
      {view === "tags" && <TagsTable tags={tagStats} />}
    </div>
  );
}

// ==================== HELPER COMPONENTS ====================

function StatCard({ icon, label, value, color }) {
  return (
    <div className="rounded-2xl bg-white shadow-lg border border-slate-100 p-4 hover:shadow-xl transition-all">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center text-white mb-3`}>
        {icon}
      </div>
      <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
  );
}

function TopPerformersCard({ title, icon, posts, metricKey, metricLabel, suffix = '', color }) {
  const colorClasses = {
    purple: 'border-purple-100/50 bg-purple-50/30 text-purple-600',
    indigo: 'border-indigo-100/50 bg-indigo-50/30 text-indigo-600',
  };

  return (
    <section className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl border border-slate-100/50 p-6">
      <h2 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
        {title}
      </h2>
      <div className="space-y-2">
        {posts.map((p, idx) => (
          <Link key={p.id} href={`/admin/blog/edit/${p.id}`} className="flex items-start justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all group">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0 ${
                idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                idx === 1 ? 'bg-slate-100 text-slate-700' :
                idx === 2 ? 'bg-orange-100 text-orange-700' :
                'bg-slate-50 text-slate-600'
              }`}>
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 line-clamp-1">{p.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{p.viewCount} views • {p.likeCount} likes</p>
              </div>
            </div>
            <div className="text-right ml-3 flex-shrink-0">
              <p className="text-sm font-bold text-slate-900">{p[metricKey].toLocaleString()}{suffix}</p>
              <p className="text-xs text-slate-500">{metricLabel}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BlogPostsTable({ posts }) {
  return (
    <section className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl border border-slate-100/50 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          <FileText className="h-4 w-4 text-slate-600" />
          All Blog Posts Performance
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Post</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase"><Eye className="h-3.5 w-3.5 inline" /> Views</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase"><Heart className="h-3.5 w-3.5 inline" /> Likes</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase"><Share2 className="h-3.5 w-3.5 inline" /> Shares</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase"><MessageSquare className="h-3.5 w-3.5 inline" /> Feedback</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase"><Star className="h-3.5 w-3.5 inline" /> Rating</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase"><TrendingUp className="h-3.5 w-3.5 inline" /> Engagement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-indigo-50/30 transition-colors group">
                <td className="px-4 py-3">
                  <Link href={`/admin/blog/edit/${p.id}`} className="block">
                    <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 line-clamp-1">{p.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-slate-500 line-clamp-1">/{p.slug}</p>
                      {p.category && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-xs font-medium text-blue-800">{p.category.name}</span>
                      )}
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3 text-center"><span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-50 text-xs font-semibold text-purple-700">{p.viewCount.toLocaleString()}</span></td>
                <td className="px-4 py-3 text-center"><span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-50 text-xs font-semibold text-rose-700">{p.likeCount.toLocaleString()}</span></td>
                <td className="px-4 py-3 text-center"><span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 text-xs font-semibold text-emerald-700">{p.shareCount.toLocaleString()}</span></td>
                <td className="px-4 py-3 text-center"><span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 text-xs font-semibold text-amber-700">{p.totalFeedbacks}</span></td>
                <td className="px-4 py-3 text-center">
                  {p.avgRating ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-50 text-xs font-semibold text-yellow-700">
                      <Star className="h-3 w-3 fill-current" />{p.avgRating}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                    p.engagementScore >= 10 ? 'bg-green-50 text-green-700' :
                    p.engagementScore >= 5 ? 'bg-blue-50 text-blue-700' :
                    'bg-slate-50 text-slate-700'
                  }`}>
                    {p.engagementScore}%
                  </span>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center">
                  <FileText className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm text-slate-600 font-medium">No published posts found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function EbooksTable({ ebooks }) {
  return (
    <section className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl border border-slate-100/50 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-slate-600" />
          All Ebooks Performance
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Ebook</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Category</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase"><Download className="h-3.5 w-3.5 inline" /> Downloads</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase"><Calendar className="h-3.5 w-3.5 inline" /> Published</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ebooks.map((guide) => (
              <tr key={guide.id} className="hover:bg-purple-50/30 transition-colors">
                <td className="px-4 py-3">
                  <p className="text-sm font-semibold text-slate-900">{guide.title}</p>
                  <p className="text-xs text-slate-500">/{guide.slug}</p>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-purple-100 text-xs font-medium text-purple-800">
                    {guide.category || 'Uncategorized'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-50 text-xs font-semibold text-purple-700">
                    {guide.downloadCount.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-xs text-slate-600">
                  {guide.publishedAt ? new Date(guide.publishedAt).toLocaleDateString() : 'N/A'}
                </td>
              </tr>
            ))}
            {ebooks.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center">
                  <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm text-slate-600 font-medium">No published Ebooks found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CategoriesTable({ categories }) {
  return (
    <section className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl border border-slate-100/50 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          <Layers className="h-4 w-4 text-slate-600" />
          All Categories Performance
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Category</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Posts</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Total Views</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Avg Views/Post</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Total Likes</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Total Shares</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-indigo-50/30 transition-colors">
                <td className="px-4 py-3">
                  <p className="text-sm font-semibold text-slate-900">{cat.name}</p>
                  <p className="text-xs text-slate-500">/{cat.slug}</p>
                </td>
                <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-1 rounded-lg bg-blue-50 text-xs font-semibold text-blue-700">{cat.posts}</span></td>
                <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-1 rounded-lg bg-purple-50 text-xs font-semibold text-purple-700">{cat.views.toLocaleString()}</span></td>
                <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-1 rounded-lg bg-indigo-50 text-xs font-semibold text-indigo-700">{cat.avgViewsPerPost.toLocaleString()}</span></td>
                <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-1 rounded-lg bg-rose-50 text-xs font-semibold text-rose-700">{cat.likes.toLocaleString()}</span></td>
                <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-1 rounded-lg bg-emerald-50 text-xs font-semibold text-emerald-700">{cat.shares.toLocaleString()}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TagsTable({ tags }) {
  return (
    <section className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl border border-slate-100/50 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          <Tag className="h-4 w-4 text-slate-600" />
          All Tags Performance
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Tag</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Posts</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Total Views</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Avg Views/Post</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Total Likes</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Total Shares</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tags.map((tag) => (
              <tr key={tag.id} className="hover:bg-purple-50/30 transition-colors">
                <td className="px-4 py-3">
                  <p className="text-sm font-semibold text-slate-900">{tag.name}</p>
                  <p className="text-xs text-slate-500">/{tag.slug}</p>
                </td>
                <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-1 rounded-lg bg-purple-50 text-xs font-semibold text-purple-700">{tag.posts}</span></td>
                <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-1 rounded-lg bg-pink-50 text-xs font-semibold text-pink-700">{tag.views.toLocaleString()}</span></td>
                <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-1 rounded-lg bg-indigo-50 text-xs font-semibold text-indigo-700">{tag.avgViewsPerPost.toLocaleString()}</span></td>
                <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-1 rounded-lg bg-rose-50 text-xs font-semibold text-rose-700">{tag.likes.toLocaleString()}</span></td>
                <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-1 rounded-lg bg-emerald-50 text-xs font-semibold text-emerald-700">{tag.shares.toLocaleString()}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
