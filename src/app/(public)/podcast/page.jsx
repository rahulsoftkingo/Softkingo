import Link from "next/link";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import prisma from "@/lib/prisma";
import InquirySection from "@/components/footer/InquirySection";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Podcast - Softkingo Insights",
  description:
    "Listen to Softkingo's podcast episodes on product strategy, mobile apps, UX, and emerging technologies.",
  alternates: { canonical: "/podcast" },
};

function safeImg(src, fallback = "/images/insights/hero-default.png") {
  const s = (src || "").toString().trim();
  if (!s) return fallback;
  if (s.startsWith("/")) return s;
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  return fallback;
}

export default async function PodcastPage(props) {
  const searchParams = await props.searchParams;
  const q = (searchParams?.q || "").toString().trim();
  const category = (searchParams?.category || "").toString().trim();

  // Pagination setup
  const pageSize = 12;
  const page = Math.max(1, parseInt(searchParams?.page || "1", 10) || 1);
  const skip = (page - 1) * pageSize;

  const where = {
    status: "published",
    AND: [
      ...(q
        ? [
            {
              OR: [
                { title: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
                { summary: { contains: q, mode: "insensitive" } },
                { guestName: { contains: q, mode: "insensitive" } },
              ],
            },
          ]
        : []),
      ...(category ? [{ category: { equals: category, mode: "insensitive" } }] : []),
    ],
  };

  const totalCount = await prisma.podcast.count({ where });
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const episodes = await prisma.podcast.findMany({
    where,
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    skip,
    take: pageSize,
  });

  // Extract topics dynamically from published episodes
  const allCategories = await prisma.podcast.findMany({
    where: { status: "published" },
    select: { category: true },
  });
  const topics = Array.from(
    new Set(allCategories.map((item) => item.category).filter(Boolean))
  );

  const mostRead = episodes.slice(0, 3);

  // 4 Podcast Platform Image URLs
  const podcastPlatforms = [
    {
      name: "Google Podcasts",
      src: "/images/podcast/google-podcast.webp",
    },
    {
      name: "Spotify",
      src: "/images/podcast/spotify-podcast.webp",
    },
    {
      name: "Apple Podcasts",
      src: "/images/podcast/apple-podcast.webp",
    },
    {
      name: "Soundcloud",
      src: "/images/podcast/sound-cloud.webp",
    },
  ];

  const buildUrl = (nextQ, nextCategory, nextPage = 1) => {
    const params = new URLSearchParams();
    if (nextQ) params.set("q", nextQ);
    if (nextCategory) params.set("category", nextCategory);
    if (nextPage && nextPage !== 1) params.set("page", String(nextPage));
    const query = params.toString();
    return query ? `/podcast?${query}` : "/podcast";
  };

  function getPageItems(current, total, maxButtons = 5) {
    if (total <= maxButtons) return Array.from({ length: total }, (_, i) => i + 1);

    const items = [];
    const half = Math.floor(maxButtons / 2);
    let start = Math.max(1, current - half);
    let end = Math.min(total, start + maxButtons - 1);

    start = Math.max(1, end - maxButtons + 1);

    if (start > 1) {
      items.push(1);
      if (start > 2) items.push("…");
    }

    for (let p = start; p <= end; p++) items.push(p);

    if (end < total) {
      if (end < total - 1) items.push("…");
      items.push(total);
    }

    return items;
  }

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header Section */}
      <header className="relative border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/insights/hero-default.png"
            alt="Podcast Header Background"
            fill
            priority
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-slate-900/70 to-slate-900/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 sm:pt-8 sm:pb-16 text-slate-50 flex flex-col justify-between min-h-[340px]">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-200 mb-4">
            <Link href="/" className="hover:text-sky-300">
              Home
            </Link>
            <span>/</span>
            <span className="text-sky-300 font-medium">Podcast</span>
          </nav>

          {/* Header Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-end">
            {/* Left Column: Text, Search, Chips */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-5">
              <p className="text-[11px] sm:text-xs tracking-[0.24em] uppercase text-sky-300 font-semibold">
                PODCAST & TALKS
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-normal">
                Deep dives into tech & architecture
              </h1>

              <p className="text-sm sm:text-base text-slate-100/90">
                In-depth articles and discussions on cloud, AI, app architecture, performance and more.
              </p>

              {/* Search Bar */}
              <form action="/podcast" className="max-w-md">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <FaSearch className="h-3.5 w-3.5 text-slate-500" />
                  </div>
                  <input
                    type="search"
                    name="q"
                    defaultValue={q}
                    placeholder="Search by title or topic..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-full bg-slate-900/70 border border-slate-500 text-sm text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
                  />
                  {category && <input type="hidden" name="category" value={category} />}
                </div>
              </form>

              {/* Topic Filter Chips */}
              <div className="flex items-center overflow-x-auto scrollbar-hide gap-2 text-[11px] sm:text-xs pt-1">
                <span className="text-slate-200 shrink-0">Browse by topic:</span>

                <Link
                  href={buildUrl(q, "", 1)}
                  className={`px-3 py-1 rounded-full border ${
                    !category
                      ? "bg-sky-500 text-slate-900 border-sky-300 font-medium"
                      : "bg-slate-900/60 text-slate-100 border-slate-500 hover:bg-slate-800"
                  } text-[11px] transition-colors shrink-0`}
                >
                  All
                </Link>

                {topics.map((t) => (
                  <Link
                    key={t}
                    href={buildUrl(q, t, 1)}
                    className={`px-3 py-1 rounded-full border shrink-0 ${
                      category === t
                        ? "bg-sky-500 text-slate-900 border-sky-300 font-medium"
                        : "bg-slate-900/60 text-slate-100 border-slate-500 hover:bg-slate-800"
                    } text-[11px] transition-colors`}
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column: Compact Inline Row with Minimal Margins */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-end items-start lg:items-end pt-2 lg:pt-0">
              <div className="flex flex-col items-start lg:items-end gap-2 w-full">
                <span className="text-[11px] text-slate-300 font-medium tracking-wide uppercase">
                  Listen on:
                </span>

                {/* Single Row Container with Compact Margins/Gaps */}
                <div className="flex flex-row items-center justify-start lg:justify-end gap-1.5 sm:gap-2 w-full overflow-x-auto scrollbar-hide">
                  {podcastPlatforms.map((platform, i) => (
                    <div
                      key={i}
                      title={platform.name}
                      className="relative w-[100px] sm:w-[125px] lg:w-[130px] h-10 sm:h-11 px-1.5 sm:px-2 py-1 flex items-center justify-center hover:-translate-y-0.5 transition-all shrink-0 bg-slate-900/50 rounded-xl border border-slate-700/60 backdrop-blur-sm"
                    >
                      <Image
                        src={safeImg(platform.src)}
                        alt={platform.name}
                        fill
                        className="object-contain p-1.5"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
          <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,260px)] gap-6 lg:gap-8 items-start">
            {/* Left Column: One-Row-Per-Episode Listing */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm sm:text-base font-semibold text-slate-800">
                  All Podcast Episodes
                </h2>

                <p className="text-[11px] text-slate-500">
                  {totalCount} article{totalCount !== 1 ? "s" : ""}
                  {q && <> matching “{q}”</>}
                  {category && <> in {category}</>}
                  {totalPages > 1 && <> • page {page} of {totalPages}</>}
                </p>
              </div>

              {/* Changed from a 3-col grid to a stacked list: one card = one full row */}
              <div className="flex flex-col gap-6">
                {episodes.map((episode) => (
                  <PodcastRowCard key={episode.slug} episode={episode} />
                ))}

                {!episodes.length && (
                  <p className="text-sm text-slate-500 py-8 text-center bg-white rounded-2xl border border-slate-200">
                    No podcast episodes found.
                  </p>
                )}
              </div>

              {/* Pagination Bar */}
              {totalPages > 1 && (
                <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
                  <Link
                    aria-disabled={!hasPrev}
                    href={hasPrev ? buildUrl(q, category, page - 1) : "#"}
                    className={`px-3 py-2 rounded-lg border text-sm ${
                      hasPrev
                        ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                        : "bg-slate-100 border-slate-200 text-slate-400 pointer-events-none"
                    }`}
                  >
                    Prev
                  </Link>

                  <div className="flex items-center gap-1">
                    {getPageItems(page, totalPages, 5).map((it, idx) => {
                      if (it === "…") {
                        return (
                          <span
                            key={`dots-${idx}`}
                            className="px-3 py-2 text-sm text-slate-400 select-none"
                          >
                            …
                          </span>
                        );
                      }

                      const p = it;
                      const active = p === page;

                      return (
                        <Link
                          key={p}
                          href={buildUrl(q, category, p)}
                          aria-current={active ? "page" : undefined}
                          className={`min-w-9 text-center px-3 py-2 rounded-lg border text-sm ${
                            active
                              ? "bg-sky-600 border-sky-600 text-white font-medium"
                              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {p}
                        </Link>
                      );
                    })}
                  </div>

                  <Link
                    aria-disabled={!hasNext}
                    href={hasNext ? buildUrl(q, category, page + 1) : "#"}
                    className={`px-3 py-2 rounded-lg border text-sm ${
                      hasNext
                        ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                        : "bg-slate-100 border-slate-200 text-slate-400 pointer-events-none"
                    }`}
                  >
                    Next
                  </Link>
                </nav>
              )}
            </div>

            {/* Right Sidebar: MOST READ (kept as-is) */}
            <aside className="hidden md:flex flex-col gap-4 sticky top-24">
              {mostRead.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.18em] mb-3">
                    MOST READ
                  </p>
                  <div className="space-y-3">
                    {mostRead.map((p) => (
                      <PodcastCompactCard key={p.slug} episode={p} />
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </section>
        </div>

        {/* Footer Inquiry Section */}
        <InquirySection />
      </main>
    </div>
  );
}

{/* Row Card Component — image left, title/host/play right, description spans full width below */}
function PodcastRowCard({ episode }) {
  const dateText = episode.publishedAt
    ? new Date(episode.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
    : null;

  return (
    <article className="bg-[#e7e7e7] border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-sky-300 transition-all">
      {/* Category + Date */}
      <div className="flex items-center justify-between mb-4">
        <span className="inline-block px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wide bg-[#1ed860] text-white">
          {episode.category || "Podcast"}
        </span>
        {dateText && (
          <span className="text-xs text-slate-500 font-medium">{dateText}</span>
        )}
      </div>

      {/* Image + Title/Host/Play */}
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
        <div className="relative w-full sm:w-80 h-44 sm:h-48 shrink-0 rounded-xl overflow-hidden bg-slate-100">
          <Image
            src={safeImg(episode.coverImage)}
            alt={episode.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center gap-2">
          <Link
            href={`/podcast/${episode.slug}`}
            className="text-lg sm:text-xl lg:text-3xl font-bold text-slate-900 hover:text-sky-600 transition-colors leading-snug"
          >
            {episode.title}
          </Link>

          {episode.guestName && (
            <p className="text-sm text-slate-800">
              - Hosted By{" "}
              <span className="text-rose-500 font-medium">{episode.guestName}</span>
            </p>
          )}

          <Link
            href={`/podcast/${episode.slug}`}
            aria-label="Play episode"
            className="mt-2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white hover:bg-sky-600 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Description spans full row width */}
      <p className="mt-4 text-sm text-slate-800 leading-relaxed line-clamp-2">
        {episode.description || episode.summary}
      </p>
    </article>
  );
}

{/* Sidebar Compact Card Component (unchanged) */}
function PodcastCompactCard({ episode }) {
  return (
    <div className="border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
      <p className="text-[10px] font-medium text-sky-600 uppercase tracking-wide mb-1">
        {episode.category || "Podcast"}
      </p>
      <Link
        href={`/podcast/${episode.slug}`}
        className="text-xs font-semibold text-slate-800 hover:text-sky-600 transition-colors line-clamp-2 leading-snug"
      >
        {episode.title}
      </Link>
    </div>
  );
}