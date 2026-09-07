import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaBriefcase, FaMicrochip, FaHeartbeat, FaGraduationCap, FaBullhorn, FaTheaterMasks, FaUsers, FaHashtag } from "react-icons/fa";
import prisma from "@/lib/prisma";
import InquirySection from "@/components/footer/InquirySection";
import PodcastBrowseSection from "../portfolio/Podcastbrowsesection";

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

// Icon lookup for category chips — falls back to a generic tag icon
// for any category name that isn't explicitly mapped.
const CATEGORY_ICONS = {
  business: FaBriefcase,
  technology: FaMicrochip,
  "health & wellness": FaHeartbeat,
  education: FaGraduationCap,
  marketing: FaBullhorn,
  comedy: FaTheaterMasks,
  "society & culture": FaUsers,
};

function getCategoryIcon(name) {
  return CATEGORY_ICONS[(name || "").toLowerCase()] || FaHashtag;
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
            className="object-cover opacity-60"
          />
          {/* Sky-toned wash instead of the previous neutral/violet gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-sky-950/80 to-sky-900/40" />
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

          {/* Eyebrow pill */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-[11px] text-sky-200 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            Discover. Listen. Get inspired.
          </div>

          {/* Header Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-end">
            {/* Left Column: Text, Search, Chips */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-5">
              <p className="text-[11px] sm:text-xs tracking-[0.24em] uppercase text-sky-300 font-semibold">
                PODCAST & TALKS
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-normal">
                Deep dives into
                <br />
                <span className="text-sky-400">tech &amp; architecture</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-100/90 max-w-md">
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
                    className="w-full pl-9 pr-3 py-2.5 rounded-full bg-slate-900/70 border border-sky-500/30 text-sm text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
                  />
                  {category && <input type="hidden" name="category" value={category} />}
                </div>
              </form>

              {/* Topic Filter Chips */}
              <div className="flex items-center overflow-x-auto scrollbar-hide gap-2 text-[11px] sm:text-xs pt-1">
                <span className="text-slate-200 shrink-0">Browse by topic:</span>

                <Link
                  href={buildUrl(q, "", 1)}
                  className={`px-3 py-1 rounded-full border ${!category
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
                    className={`px-3 py-1 rounded-full border shrink-0 ${category === t
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
                      className="relative w-[100px] sm:w-[125px] lg:w-[130px] h-10 sm:h-11 px-1.5 sm:px-2 py-1 flex items-center justify-center hover:-translate-y-0.5 transition-all shrink-0 bg-slate-900/50 rounded-xl border border-sky-700/40 backdrop-blur-sm"
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
      <PodcastBrowseSection
        episodes={episodes}
        // categories={categories}
        totalCount={totalCount}
        q={q}
        category={category}
        page={page}
        totalPages={totalPages}
        basePath="/podcasts"   // sirf string — koi error nahi aayega
      />

    </div>
  );
}

{/* Row Card Component — image left, title/host/play right, description spans full width below.
    Restyled to the "Featured Podcasts" list treatment from the reference, sky-blue accents. */}
function PodcastRowCard({ episode }) {
  const dateText = episode.publishedAt
    ? new Date(episode.publishedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    })
    : null;

  return (
    <article className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-sky-300 transition-all">
      {/* Category + Date */}
      <div className="flex items-center justify-between mb-4">
        <span className="inline-block px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wide bg-sky-500 text-white">
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
              <span className="text-sky-600 font-medium">{episode.guestName}</span>
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

{/* Sidebar Compact Card Component */}
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