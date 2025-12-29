// src/app/(public)/blog/SectionPage.jsx
import Link from "next/link";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import prisma from "@/lib/prisma";
import BlogCard from "@/app/(public)/blog/BlogCard";
import { BLOG_SECTIONS } from "@/app/(public)/blog/sectionConfig";
import NewsletterStrip from "@/app/(public)/blog/NewsletterStrip";
import LatestEGuidePromoCardClient from "@/components/public/LatestEGuidePromoCardClient";

export const dynamic = "force-dynamic";

function safeImg(src, fallback = "/images/insights/hero-default.png") {
  const s = (src || "").toString().trim();
  if (!s) return fallback;
  if (s.startsWith("/")) return s;
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  return fallback;
}

export default async function SectionPage({ sectionKey, searchParams }) {
  const config = BLOG_SECTIONS[sectionKey];

  if (!config) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-sm text-slate-600">Section not found.</p>
      </div>
    );
  }

  const q = (searchParams?.q || "").toString().trim();
  const category = (searchParams?.category || "").toString().trim();

  // Pagination
  const pageSize = 12;
  const page = Math.max(1, parseInt(searchParams?.page || "1", 10) || 1);
  const skip = (page - 1) * pageSize;

  const placementNeedle = `"${sectionKey}"`;
  const typeNeedles = config.types?.length ? config.types.map((t) => `"${t}"`) : [];

  const where = {
    status: "published",
    AND: [
      {
        OR: [
          { placements: { contains: placementNeedle } },
          ...typeNeedles.map((needle) => ({ placements: { contains: needle } })),
          ...(config.types?.length ? [{ placements: null, type: { in: config.types } }] : []),
        ],
      },
      ...(q ? [{ OR: [{ title: { contains: q } }, { excerpt: { contains: q } }] }] : []),
      ...(category ? [{ category: { slug: category } }] : []),
    ],
  };

  // Total count for pagination
  const totalCount = await prisma.blogPost.count({ where }); // [web:584]
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  // Paginated posts (latest first)
  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }], // [web:584]
    skip, // [web:584]
    take: pageSize, // [web:584]
    include: { category: true, tags: { include: { tag: true } } },
  });

  const featured = posts[0] || null;
  const mostRead = posts.slice(0, 3);

  // Topics (for chips) - based on current page posts (same as your current behavior)
  const topicsSet = new Set(posts.map((p) => p.category?.slug).filter(Boolean));
  const topics = Array.from(topicsSet);

  const normalizedPosts = posts.map((p) => ({
    href: `${config.slugBase}/${p.slug}`,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    category: p.category?.name || config.title,
    tags: p.tags.map((t) => t.tag.name),
    thumbnail: safeImg(p.thumbnail, "/images/insights/hero-default.png"),
    publishedAt: p.publishedAt?.toISOString() || "",
    readingTime: p.readTimeMinutes || 8,
    viewCount: p.viewCount ?? undefined,
    likeCount: p.likeCount ?? undefined,
  }));

  const normalizedFeatured = featured && normalizedPosts.find((p) => p.slug === featured.slug);

  const normalizedMostRead = mostRead
    .map((m) => normalizedPosts.find((p) => p.slug === m.slug))
    .filter(Boolean);

  const buildUrl = (nextQ, nextCategory, nextPage = 1) => {
    const params = new URLSearchParams();
    if (nextQ) params.set("q", nextQ);
    if (nextCategory) params.set("category", nextCategory);
    if (nextPage && nextPage !== 1) params.set("page", String(nextPage));
    const query = params.toString();
    return query ? `${config.slugBase}?${query}` : config.slugBase;
  };
function getPageItems(current, total, maxButtons = 5) {
  if (total <= maxButtons) return Array.from({ length: total }, (_, i) => i + 1);

  const items = [];
  const half = Math.floor(maxButtons / 2);

  let start = Math.max(1, current - half);
  let end = Math.min(total, start + maxButtons - 1);

  // adjust start if end hit total
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
      <header className="relative border-b border-slate-200">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={safeImg(config.heroBg, "/images/insights/hero-default.png")}
            alt={config.title}
            fill
            priority
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-slate-900/60 to-slate-900/10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 sm:pt-8 sm:pb-14 text-slate-50">
          <nav className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-200 mb-4">
            <Link href="/" className="hover:text-sky-300">
              Home
            </Link>
            <span>/</span>
            <span className="text-sky-300 font-medium">{config.title}</span>
          </nav>

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)] gap-8 items-start">
            <div className="space-y-4 sm:space-y-5">
              <p className="text-[11px] sm:text-xs tracking-[0.24em] uppercase text-sky-300">
                {config.heroLabel}
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                {config.heroHeading}
              </h1>

              <p className="text-sm sm:text-base text-slate-100/90 max-w-xl">{config.heroSub}</p>

              <form action={config.slugBase} className="max-w-md">
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
                  {/* page reset handled by buildUrl on links; for form submit, page param won't be set */}
                </div>
              </form>

              <div className="flex items-center overflow-x-auto scrollbar-hide gap-2 text-[11px] sm:text-xs">
                <span className="text-slate-200 shrink-0">Browse by topic:</span>

                <Link
                  href={buildUrl(q, "", 1)}
                  className={`px-3 py-1 rounded-full border ${
                    !category
                      ? "bg-sky-500 text-slate-900 border-sky-300"
                      : "bg-slate-900/60 text-slate-100 border-slate-500 hover:bg-slate-800"
                  } text-[11px] font-medium transition-colors shrink-0`}
                >
                  All
                </Link>

                {topics.map((t) => (
                  <Link
                    key={t}
                    href={buildUrl(q, t, 1)}
                    className={`px-3 py-1 rounded-full border shrink-0 ${
                      category === t
                        ? "bg-sky-500 text-slate-900 border-sky-300"
                        : "bg-slate-900/60 text-slate-100 border-slate-500 hover:bg-slate-800"
                    } text-[11px] font-medium transition-colors`}
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>

            {normalizedFeatured && (
              <Link
                href={normalizedFeatured.href}
                className="bg-slate-100/90 border border-sky-200 rounded-2xl shadow-[0_18px_45px_rgba(15,23,42,0.4)] overflow-hidden flex flex-col hover:border-sky-400 hover:bg-white transition-all backdrop-blur"
              >
                <div className="relative h-44 sm:h-48 lg:h-60 bg-slate-200">
                  <Image
                    src={safeImg(normalizedFeatured.thumbnail, "/images/insights/hero-default.png")}
                    alt={normalizedFeatured.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-sky-500 text-slate-200 shadow-sm">
                    {normalizedFeatured.category}
                  </span>
                </div>

                <div className="p-5 sm:p-6 space-y-2.5">
                  <h2 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
                    {normalizedFeatured.title}
                  </h2>
                  <p className="text-[11px] text-sky-700 font-medium">{config.featuredCta}</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
          <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,260px)] gap-6 lg:gap-8 items-start">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm sm:text-base font-semibold text-slate-800">
                  {config.listHeading}
                </h2>

                <p className="text-[11px] text-slate-500">
                  {totalCount} article{totalCount !== 1 ? "s" : ""}
                  {q && <> matching “{q}”</>}
                  {category && <> in {category}</>}
                  {totalPages > 1 && (
                    <>
                      {" "}
                      • page {page} of {totalPages}
                    </>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {normalizedPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} variant="grid" />
                ))}

                {!normalizedPosts.length && <p className="text-sm text-slate-500">{config.emptyText}</p>}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
  <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
    {/* Prev */}
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

    {/* Numbers (max 5 + ellipsis) */}
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
                ? "bg-sky-600 border-sky-600 text-white"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {p}
          </Link>
        );
      })}
    </div>

    {/* Next */}
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

            </section>

            <aside className="hidden md:flex flex-col gap-4 sticky top-24">
              {normalizedMostRead.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.18em] mb-3">
                    Most read
                  </p>
                  <div className="space-y-2.5">
                    {normalizedMostRead.map((p) => (
                      <BlogCard key={p.slug} post={p} variant="compact" />
                    ))}
                  </div>
                </div>
              )}

              <LatestEGuidePromoCardClient />
            </aside>
          </section>

          <section className="mt-10 sm:mt-12">
            <NewsletterStrip
              source={`${sectionKey}-listing`}
              listSlug={config.newsletterList?.slug || "blog-newsletter"}
              listName={config.newsletterList?.name || "Blog Newsletter"}
              listDescription={config.newsletterList?.description || "Main blog newsletter list"}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
