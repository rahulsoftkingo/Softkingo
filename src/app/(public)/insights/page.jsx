// src/app/(public)/insights/page.jsx
import Link from "next/link";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import prisma from "@/lib/prisma";
import { BLOG_SECTIONS } from "@/app/(public)/blog/sectionConfig";
import InquirySection from "@/components/footer/InquirySection";

export const dynamic = "force-dynamic";

const HERO_BG = "/images/insights/hero-insights.jpg";
const FALLBACK_THUMB = "/images/insights/hero-default.png";

function safeImg(src, fallback = FALLBACK_THUMB) {
  const s = (src || "").toString().trim();
  if (!s) return fallback;
  if (s.startsWith("/")) return s;
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  return fallback;
}

function groupTypesFromSections() {
  // E‑guide intentionally excluded (separate model)
  return Object.entries(BLOG_SECTIONS)
    .flatMap(([sectionKey, cfg]) => (cfg.types || []).map((type) => ({ type, sectionKey, cfg })));
}

function titleFromType(type) {
  // simple labels; you can customize
  if (type === "press-release") return "Press releases";
  if (type === "media-coverage") return "Media coverage";
  if (type === "whitepapers") return "Whitepapers";
  return type.replace(/-/g, " ");
}

async function fetchTopPostsByType(type, take = 6) {
  return prisma.blogPost.findMany({
    where: { status: "published", type },
    orderBy: { publishedAt: "desc" },
    take,
    include: { category: true, tags: { include: { tag: true } } },
  });
}

export default async function InsightsPage(props) {
  const searchParams = await props.searchParams;
  const q = (searchParams?.q || "").toString().trim();

  // Build “type rows” from BLOG_SECTIONS
  const typeRows = groupTypesFromSections();

  // Fetch top posts for every type row in parallel
  const postsByTypePromises = typeRows.map(({ type }) => fetchTopPostsByType(type, 6));

  const [eguideTop, ...postsByType] = await Promise.all([
    prisma.eGuide.findMany({
      where: {
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
      },
      orderBy: { publishedAt: "desc" },
      take: 6,
    }),
    ...postsByTypePromises,
  ]);

  // Apply search filter to blogposts rows (optional but useful)
  const filteredPostsByType = postsByType.map((arr) => {
    if (!q) return arr;
    const needle = q.toLowerCase();
    return arr.filter((p) => {
      const t = (p.title || "").toLowerCase();
      const e = (p.excerpt || "").toLowerCase();
      return t.includes(needle) || e.includes(needle);
    });
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <header className="relative border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={safeImg(HERO_BG, HERO_BG)} alt="Insights" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-900/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-10 sm:pt-10 sm:pb-14 text-white">
          <nav className="flex items-center gap-2 text-[11px] sm:text-xs text-white/70 mb-4">
            <Link href="/" className="hover:text-sky-300">Home</Link>
            <span>/</span>
            <span className="text-sky-200 font-medium">Insights</span>
          </nav>

          <div className="max-w-2xl space-y-4">
            <p className="text-[11px] sm:text-xs tracking-[0.24em] uppercase text-sky-300">
              Insights hub
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              Explore everything we publish.
            </h1>
            <p className="text-sm sm:text-base text-white/85">
              Blog, featured stories, press releases, articles, whitepapers and more—browse by track or search in one place.
            </p>

            <form action="/insights" className="mt-2 flex flex-col sm:flex-row gap-2 sm:items-center">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FaSearch className="h-3.5 w-3.5 text-white/60" />
                </div>
                <input
                  type="search"
                  name="q"
                  defaultValue={q}
                  placeholder="Search (title, excerpt, guides...)"
                  className="w-full pl-9 pr-3 py-2.5 rounded-full bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
                />
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
              >
                Go to blog
              </Link>
            </form>
          </div>
        </div>
      </header>

      {/* BODY */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        {/* E‑Guides special row */}
        <ContentRow
          title="E‑Guides"
          subtitle="Downloadable playbooks"
          viewAllHref="/e-guides"
        >
          {eguideTop.map((g) => (
            <EGuideCard
              key={g.id}
              href={`/e-guides/${g.slug}`}
              title={g.title}
              excerpt={g.description || g.summary || ""}
              thumbnail={safeImg(g.coverImage)}
              publishedAt={g.publishedAt?.toISOString() || ""}
            />
          ))}
          {!eguideTop.length ? <EmptyRowText text="No e‑guides yet." /> : null}
        </ContentRow>

        {/* Rows for every BlogPost.type (blog/featured/press-release/...) */}
        {typeRows.map(({ type, sectionKey, cfg }, idx) => {
          const posts = filteredPostsByType[idx] || [];
          return (
            <ContentRow
              key={type}
              title={cfg?.title || titleFromType(type)}
              subtitle={cfg?.heroSub || `Latest ${titleFromType(type)}`}
              viewAllHref={cfg?.slugBase || `/${sectionKey}`}
            >
              {posts.slice(0, 6).map((p) => (
                <PostCard
                  key={p.id}
                  href={`${cfg.slugBase}/${p.slug}`}
                  title={p.title}
                  excerpt={p.excerpt || ""}
                  thumbnail={safeImg(p.thumbnail)}
                  badge={p.category?.name || cfg.title}
                  publishedAt={p.publishedAt?.toISOString() || ""}
                />
              ))}
              {!posts.length ? <EmptyRowText text={`No ${cfg.title.toLowerCase()} yet.`} /> : null}
            </ContentRow>
          );
        })}
      </main>
              <InquirySection />

    </div>
  );
}

/* ---------- UI components (server-safe) ---------- */

function ContentRow({ title, subtitle, viewAllHref, children }) {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-sky-600 font-semibold">
            {title}
          </p>
          <p className="text-sm sm:text-base font-semibold text-slate-900">
            {subtitle}
          </p>
        </div>

        <Link href={viewAllHref} className="text-[12px] font-semibold text-sky-700 hover:text-sky-800">
          View all →
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
        {children}
      </div>
    </section>
  );
}

function EmptyRowText({ text }) {
  return (
    <div className="shrink-0 w-[260px] sm:w-[320px] rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-500">
      {text}
    </div>
  );
}

function PostCard({ href, title, excerpt, thumbnail, badge, publishedAt }) {
  return (
    <Link
      href={href}
      className="snap-start shrink-0 w-[260px] sm:w-[320px] bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:border-sky-300 transition-all"
    >
      <div className="relative h-36 bg-slate-100">
        <Image src={thumbnail} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/90 text-slate-900 border border-white">
          {badge}
        </span>
      </div>

      <div className="p-4">
        <p className="text-[11px] text-slate-500">
          {publishedAt ? new Date(publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
        </p>
        <p className="mt-1 text-[13px] font-semibold text-slate-900 line-clamp-2">
          {title}
        </p>
        <p className="mt-1 text-[12px] text-slate-600 line-clamp-2">
          {excerpt}
        </p>
      </div>
    </Link>
  );
}

function EGuideCard({ href, title, excerpt, thumbnail, publishedAt }) {
  return (
    <Link
      href={href}
      className="snap-start shrink-0 w-[260px] sm:w-[320px] rounded-2xl overflow-hidden  bg-gradient-to-br from-cyan-100 via-white to-sky-100 shadow-md hover:shadow-lg hover:border-cyan-300 transition-all"
    >
      <div className="p-4 flex items-start gap-3">
        <div className="relative h-40 w-26 flex-none overflow-hidden">
          <Image src={thumbnail} alt={title} fill className="object-cover" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-200 text-[10px] font-semibold">
              E‑Guide
            </span>
            <span className="text-[11px] text-slate-500">
              {publishedAt ? new Date(publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
            </span>
          </div>

          <p className="mt-2 text-[13px] font-semibold text-slate-900 line-clamp-2 group-hover:text-cyan-700">
            {title}
          </p>

          <p className="mt-1 text-[12px] text-slate-600 line-clamp-3">
            {excerpt}
          </p>

          <p className="mt-2 text-[11px] text-cyan-700 font-medium">
            Read guide →
          </p>
        </div>
      </div>
    </Link>
  );
}
