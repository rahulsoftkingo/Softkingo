// app/(public)/ebooks/page.jsx
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import InquirySection from "@/components/footer/InquirySection";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "E-books | Softkingo",
  description:
    "Download expert-crafted E-books by Softkingo on mobile apps, product strategy, UX and emerging technologies.",
  alternates: { canonical: "/ebooks" }
};

export default async function EbooksPage(props) {
  const searchParams = await props.searchParams;
  const q = (searchParams?.q || "").toString().trim();

  const guides = await prisma.ebook.findMany({
    where: {
      status: "published",
      ...(q
        ? {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { category: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
            { summary: { contains: q, mode: 'insensitive' } },
          ],
        }
        : {}),
    },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <HeroSection q={q} total={guides.length} />
        <GuidesSection guides={guides} />
      </main>
      <InquirySection />
    </>
  );
}

function HeroSection({ q, total }) {
  return (
    <section className="relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.15),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.1),transparent_50%)]" />
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.6)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-24 lg:pb-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-sky-200/80 mb-8">
          <Link
            href="/"
            className="hover:text-cyan-300 transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          <span className="text-sky-400">›</span>
          <span className="text-cyan-300 font-medium">E‑books</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm tracking-[0.25em] uppercase text-cyan-400 font-semibold">
                Expert Resources
              </p>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-normal">
                Softkingo <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">E‑books</span>
              </h1>
              <p className="text-xl text-sky-100/80 leading-relaxed max-w-2xl">
                Carefully prepared guides to help founders and product teams plan,
                design and launch digital products faster — without guessing.
              </p>
            </div>

            {/* Search form */}
            <form action="/ebooks" className="space-y-3">
              <div className="relative max-w-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 rounded-2xl blur-sm" />
                <div className="relative">
                  <input
                    type="text"
                    name="q"
                    defaultValue={q}
                    placeholder="Search E‑books by title, category, or topic..."
                    className="w-full rounded-2xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 text-white placeholder-slate-400 text-base pl-6 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 flex items-center justify-center shadow-lg hover:shadow-cyan-500/25 transition-all duration-200"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-sm text-sky-200/70">
                {total} expert guide{total !== 1 ? "s" : ""} available
                {q && (
                  <> matching <span className="font-semibold text-cyan-300">"{q}"</span></>
                )}
              </p>
            </form>
          </div>

          {/* Hero image */}
          <div className="relative">
            <div className="relative w-full max-w-64 mx-auto">
              {/* Floating effect container */}
              <div className="relative transform hover:scale-105 transition-transform duration-500">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 rounded-3xl blur-xl" />

                {/* Stacked book effect */}
                <div className="relative">
                  <div className="absolute -bottom-6 -right-6 w-full h-full bg-slate-800 rounded-3xl transform rotate-3" />
                  <div className="absolute -bottom-3 -right-3 w-full h-full bg-slate-700 rounded-3xl transform rotate-2" />

                  {/* Main book */}
                  <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden aspect-[3/4] p-4">
                    <div className="">
                      <Image
                        src="/images/black book.png"
                        alt="Softkingo E‑books Collection"
                        fill
                        className="object-cover p-4"
                        priority
                      />

                    </div>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-br-2xl" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-sky-500/20 to-transparent rounded-tl-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GuidesSection({ guides }) {
  return (
    <section className="py-16 lg:py-24 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Latest <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">E‑books</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Dive into our collection of expert-curated guides covering the latest in technology and product development
          </p>
        </div>

        {/* Guides grid */}
        {guides.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <EbooksCard key={guide.slug} guide={guide} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 lg:py-24">
            <div className="w-24 h-24 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No Ebooks Found</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              We couldn't find any E‑books matching your search. Try different keywords or browse all ebooks.
            </p>
            <Link
              href="/ebooks"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all duration-200 border border-slate-700 hover:border-slate-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              View All Ebooks
            </Link>
          </div>
        )}
      </div>

    </section>

  );
}

export function EbooksCard({ guide, index }) {
  return (
    <article
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'both'
      }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      <div className="relative p-6">
        {/* Header with cover image and category */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-3">
              {guide.category || "E‑book"}
            </span>
          </div>

          {/* Read time */}
          <div className="flex items-center gap-1 text-xs text-slate-400 bg-slate-800/50 rounded-full px-2 py-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {guide.readTimeText || "20-30 min"}
          </div>
        </div>

        {/* Cover image with floating animation */}
        <div className="relative mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-sky-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative w-full max-w-42 h-62 mx-auto overflow-hidden">
            <Image
              src={guide.coverImage || "/images/eguides/default.png"}
              alt={guide.title}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500 p-2"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {(guide.authorName || "SK")[0]}
            </div>
            <span className="text-sm text-slate-300">
              By {guide.authorName || "Softkingo Team"}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white leading-normal group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2">
            {guide.title}
          </h3>

          {/* Description */}
          {/* <p className="text-slate-400 leading-relaxed line-clamp-3">
            {guide.description || guide.summary}
          </p> */}

          {/* Animated CTA button */}
          <div className="pt-4">
            <Link
              href={`/ebooks/${guide.slug}`}
              className="inline-flex items-center justify-between w-full px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 text-white font-semibold rounded-xl transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/30 group/btn overflow-hidden"
            >
              <span className="text-sm">Read Ebook</span>

              {/* Animated arrow */}
              <div className="flex items-center">
                <span className="text-xs text-slate-400 group-hover/btn:text-cyan-300 mr-2 transition-colors duration-300">
                  Explore
                </span>
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-sky-600 flex items-center justify-center transform group-hover/btn:translate-x-1 transition-transform duration-300">
                  <svg
                    className="w-3 h-3 text-white transform -rotate-45 group-hover/btn:rotate-0 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>

              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
            </Link>
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-br-2xl" />
      <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-sky-500/10 to-transparent rounded-tl-2xl" />
    </article>
  );
}