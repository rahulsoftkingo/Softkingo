// src/app/(public)/insights/page.jsx
import Link from "next/link";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import prisma from "@/lib/prisma";
import { BLOG_SECTIONS } from "@/app/(public)/blog/sectionConfig";

export const dynamic = "force-dynamic";

const SECTION_KEYS = Object.keys(BLOG_SECTIONS);

function getSectionKeyForType(type) {
  return SECTION_KEYS.find((key) => BLOG_SECTIONS[key].types?.includes(type));
}

export default async function InsightsPage(props) {
  const searchParams = await props.searchParams;

  const q = (searchParams?.q || "").toString().trim();
  const typeFilter = (searchParams?.type || "").toString().trim();

  // All blogpost types that you manage via BlogPost.type
  // IMPORTANT: EGuide is NOT in BlogPost.type, so keep it out from blog query
  const allBlogPostTypes = SECTION_KEYS.flatMap((key) => BLOG_SECTIONS[key].types || []).filter(
    (t) => t !== "e-guide"
  );

  const whereBlog = {
    status: "published",
    type: { in: allBlogPostTypes },
    ...(q
      ? {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { excerpt: { contains: q, mode: "insensitive" } },
        ],
      }
      : {}),
    ...(typeFilter && typeFilter !== "e-guide" ? { type: typeFilter } : {}),
  };

  const whereEGuide = {
    status: "published",
    ...(q
      ? {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { category: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { summary: { contains: q, mode: "insensitive" } },
        ],
      }
      : {}),
  };

  const [latestPosts, latestGuides] = await Promise.all([
    prisma.blogPost.findMany({
      where: whereBlog,
      orderBy: { publishedAt: "desc" },
      take: 36,
      include: { category: true },
    }),
    // If filtering by a non-eguide type, still fetch guides so "All types" view is complete.
    // If you want to skip guides unless typeFilter empty/e-guide, you can add a conditional.
    prisma.eGuide.findMany({
      where: whereEGuide,
      orderBy: { publishedAt: "desc" },
      take: 36,
    }),
  ]);

  // Normalize BlogPosts -> unified card shape
  const normalizedPosts = latestPosts.map((p) => {
    const sectionKey = getSectionKeyForType(p.type) || "articles";
    const sectionConfig = BLOG_SECTIONS[sectionKey] || {
      title: "Articles",
      slugBase: "/articles",
      heroSub: "",
    };

    return {
      key: `post:${p.id}`, // unique key for React lists
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt || "",
      type: p.type,
      sectionKey,
      sectionTitle: sectionConfig.title,
      sectionSlugBase: sectionConfig.slugBase,
      thumbnail: p.thumbnail || "/images/insights/launch-thumb.png",
      publishedAt: p.publishedAt?.toISOString() || "",
    };
  });

  // Normalize EGuides -> unified card shape
  const normalizedGuides = latestGuides.map((g) => ({
    key: `eguide:${g.id}`,
    slug: g.slug,
    title: g.title,
    excerpt: g.description || g.summary || "",
    type: "e-guide",
    sectionKey: "eGuides",
    sectionTitle: "E‑Guides",
    sectionSlugBase: "/e-guides",
    thumbnail: g.coverImage || "/images/insights/launch-thumb.png",
    publishedAt: g.publishedAt?.toISOString() || "",
  }));

  // Merge + filter + sort by date desc
  const merged = [...normalizedPosts, ...normalizedGuides]
    .filter((x) => (typeFilter ? x.type === typeFilter : true))
    .sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));

  const latestNormalized = merged.slice(0, 36);

  const featured = latestNormalized[0] || null;
  const totalCount = latestNormalized.length;

  // Per-section latest (for the overview tiles)
  // NOTE: include EGuides tile too (even if BLOG_SECTIONS doesn't have it)
  const perSectionLatest = SECTION_KEYS.map((key) => {
    const config = BLOG_SECTIONS[key];
    const item = latestNormalized.find((p) => p.sectionKey === key);
    return { key, config, item };
  });

  // Type dropdown options: blog types + e-guide
  const typeOptions = Array.from(new Set([...allBlogPostTypes, "e-guide"]));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-9 sm:pt-8 sm:pb-11">
          <nav
            className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-500 mb-3"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-sky-600">
              Home
            </Link>
            <span>/</span>
            <span className="text-sky-700 font-medium">Insights</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.2fr)] gap-6 lg:gap-8 items-start">
            <div className="space-y-4">
              <p className="text-[11px] sm:text-xs tracking-[0.24em] uppercase text-sky-600">
                Insights hub
              </p>
              <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
                All content tracks in one place.
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-xl">
                Explore blogs, technical articles, whitepapers, e‑guides, press releases, podcasts and more—
                organised by track but searchable from a single view.
              </p>

              {/* Search + type filter */}
              <form action="/insights" className="mt-2 flex flex-col sm:flex-row gap-2 sm:items-center">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <FaSearch className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <input
                    type="search"
                    name="q"
                    defaultValue={q}
                    placeholder="Search across all tracks (title, excerpt, e‑guides)..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-full bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
                  />
                </div>

                <select
                  name="type"
                  defaultValue={typeFilter}
                  className="sm:w-52 px-3 py-2.5 rounded-full bg-slate-50 border border-slate-300 text-[12px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
                >
                  <option value="">All types</option>
                  {typeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </form>

              {/* Quick pills: each BLOG_SECTION + EGuides */}
              <div className="flex flex-wrap gap-2 pt-2">
                {SECTION_KEYS.map((key) => {
                  const sec = BLOG_SECTIONS[key];
                  return (
                    <Link
                      key={key}
                      href={sec.slugBase}
                      className="px-3 py-1.5 rounded-full bg-slate-100 text-[12px] text-slate-700 border border-slate-200 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200 transition-colors"
                    >
                      {sec.title}
                    </Link>
                  );
                })}

                {/* E‑Guides pill (since it's separate model) */}
                <Link
                  href="/e-guides"
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-[12px] text-slate-700 border border-slate-200 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200 transition-colors"
                >
                  E‑Guides
                </Link>
              </div>
            </div>

            {/* Featured latest across all */}
            {featured && (
              <Link
                href={`${featured.sectionSlugBase}/${featured.slug}`}
                className="bg-white border border-sky-100 rounded-2xl shadow-[0_16px_45px_rgba(15,23,42,0.12)] overflow-hidden flex flex-col hover:border-sky-300 hover:shadow-[0_22px_55px_rgba(15,23,42,0.18)] transition-all"
              >
                <div className="relative h-36 sm:h-40 bg-slate-100">
                  <Image src={featured.thumbnail} alt={featured.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-sky-600 text-white shadow-sm">
                    Featured {featured.sectionTitle.toLowerCase()}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-[11px] text-slate-500">
                    {featured.sectionTitle} ·{" "}
                    {featured.publishedAt
                      ? new Date(featured.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                      : ""}
                  </p>
                  <h2 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
                    {featured.title}
                  </h2>
                  <p className="text-[12px] sm:text-[13px] text-slate-600 line-clamp-3">{featured.excerpt}</p>
                  <p className="text-[11px] text-sky-700 font-medium">Open insight →</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* BODY */}
      <main className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14 space-y-10">
          {/* Track overview row */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {perSectionLatest.map(({ key, config, item }) => (
              <Link
                key={key}
                href={config.slugBase}
                className="group rounded-2xl border border-slate-200 bg-white px-4 py-3 hover:border-sky-300 hover:bg-sky-50 transition-all flex flex-col gap-2"
              >
                <p className="text-[11px] font-semibold text-sky-600">{config.title}</p>
                <p className="text-[12px] text-slate-600 line-clamp-3">{config.heroSub}</p>
                {item && (
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">
                    Latest:{" "}
                    <span className="font-medium text-slate-800 group-hover:text-sky-700">{item.title}</span>
                  </p>
                )}
                <p className="mt-1 text-[11px] text-sky-700 group-hover:text-sky-800">
                  Go to {config.title.toLowerCase()} →
                </p>
              </Link>
            ))}

            {/* Extra tile for E‑Guides */}
            <Link
              href="/e-guides"
              className="group rounded-2xl border border-slate-200 bg-white px-4 py-3 hover:border-sky-300 hover:bg-sky-50 transition-all flex flex-col gap-2"
            >
              <p className="text-[11px] font-semibold text-sky-600">E‑Guides</p>
              <p className="text-[12px] text-slate-600 line-clamp-3">
                Step‑by‑step playbooks to plan, build and scale web and mobile products.
              </p>
              {latestNormalized.find((x) => x.type === "e-guide") && (
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">
                  Latest:{" "}
                  <span className="font-medium text-slate-800 group-hover:text-sky-700">
                    {latestNormalized.find((x) => x.type === "e-guide")?.title}
                  </span>
                </p>
              )}
              <p className="mt-1 text-[11px] text-sky-700 group-hover:text-sky-800">Go to e‑guides →</p>
            </Link>
          </section>

          {/* Combined grid */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm sm:text-base font-semibold text-slate-800">Latest across all tracks</h2>
              <p className="text-[11px] text-slate-500">
                {totalCount} item{totalCount !== 1 ? "s" : ""}
                {q && <> matching “{q}”</>}
                {typeFilter && <> in {typeFilter}</>}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {latestNormalized.map((item) =>
                item.type === "e-guide" ? (
                  <EGuideInsightCard key={item.key} item={item} />
                ) : (
                  <PostInsightCard key={item.key} item={item} />
                )
              )}
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}
function PostInsightCard({ item }) {
  return (
    <Link
      href={`${item.sectionSlugBase}/${item.slug}`}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col"
    >
      <div className="relative h-32 bg-slate-100">
        <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
      </div>

      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1">
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {item.type}
            </span>
            <span className="text-slate-400">· {item.sectionTitle}</span>
          </span>
          <span>
            {item.publishedAt
              ? new Date(item.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
              : ""}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-sky-700 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-[12px] text-slate-600 line-clamp-3 flex-1">{item.excerpt}</p>

        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
          <span>Open insight →</span>
        </div>
      </div>
    </Link>
  );
}
function EGuideInsightCard({ item }) {
  return (
    <Link
      href={`${item.sectionSlugBase}/${item.slug}`} // /e-guides/slug
      className="group relative rounded-2xl overflow-hidden border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-sky-50 shadow-sm hover:shadow-md hover:border-cyan-300 transition-all flex flex-col"
    >
      {/* top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 to-sky-500" />

      <div className="p-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-cyan-700">
            <span className="px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-200">
              E‑Guide
            </span>
            <span className="text-slate-500">Downloadable</span>
          </span>

          <h3 className="mt-2 text-sm font-semibold text-slate-900 group-hover:text-cyan-700 line-clamp-2">
            {item.title}
          </h3>
        </div>

        {/* cover */}
        <div className="relative h-20 w-16 flex-none rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
          <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
        </div>
      </div>

      <div className="px-4 pb-4 flex flex-col gap-2 flex-1">
        <p className="text-[12px] text-slate-600 line-clamp-3 flex-1">
          {item.excerpt}
        </p>

        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>
            {item.publishedAt
              ? new Date(item.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
              : ""}
          </span>
          <span className="text-cyan-700 font-medium">Read guide →</span>
        </div>
      </div>
    </Link>
  );
}
