// src/app/(public)/e-guides/[slug]/page.jsx
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import EGuideDownloadModal from "./DownloadModal";
import { EGuidesCard } from "../page";

export const dynamic = "force-dynamic";

// Safe helper
async function getGuide(slug) {
  if (!slug || typeof slug !== "string") return null;

  const guide = await prisma.eGuide.findUnique({
    where: { slug },
  });

  return guide;
}

// Next 15: params is a Promise, unwrap correctly
export async function generateMetadata(props) {
  const params = await props.params;
  const slug = params.slug;

  const guide = await getGuide(slug);

  if (!guide) {
    return {
      title: "E‑Guide not found | Softkingo",
      description: "The requested guide is not available.",
    };
  }

  return {
    title: `${guide.title} | E‑Guide | Softkingo`,
    description:
      guide.summary ||
      guide.description ||
      guide.title,
  };
}

export default async function EGuideDetailPage(props) {
  const params = await props.params;
  const slug = params.slug;

  const guide = await getGuide(slug);

  if (!guide) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">E‑Guide Not Found</h1>
          <p className="text-slate-400 max-w-sm">
            The guide you're looking for is no longer available or has been moved.
          </p>
          <Link 
            href="/e-guides"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 text-white font-semibold rounded-xl transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Browse All Guides
          </Link>
        </div>
      </main>
    );
  }

  const related = await prisma.eGuide.findMany({
    where: {
      status: "published",
      slug: { not: guide.slug },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  const sections = guide.sectionsJson
    ? JSON.parse(guide.sectionsJson)
    : [];

  const fullGuide = { ...guide, sections };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <HeroDetail guide={fullGuide} />
      <MainTwoColumn guide={fullGuide} />
      {related.length > 0 && <RelatedSection related={related} />}
    </main>
  );
}

/* ========== HERO ========== */

function HeroDetail({ guide }) {
  const formattedDate =
    guide.publishedAt &&
    new Date(guide.publishedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

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
          <Link 
            href="/e-guides" 
            className="hover:text-cyan-300 transition-colors duration-200"
          >
            E‑Guides
          </Link>
          <span className="text-sky-400">›</span>
          <span className="text-cyan-300 font-medium truncate max-w-[200px] lg:max-w-none">
            {guide.title}
          </span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Text content */}
          <div className="space-y-6">
            {/* Category and read time */}
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30">
                {guide.category || "E‑Guide"}
              </span>
              <span className="text-sky-200/70 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {guide.readTimeText || "20–30 min read"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl xl:text-5xl font-bold leading-tight">
              {guide.title}
            </h1>

            {/* Description */}
            {guide.summary && (
              <p className="text-xl text-sky-100/80 leading-relaxed">
                {guide.summary}
              </p>
            )}

            {/* Author and date */}
            <div className="flex items-center gap-4 text-sky-200/70">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {(guide.authorName || "SK")[0]}
                </div>
                <span>By {guide.authorName || "Softkingo Team"}</span>
              </div>
              {formattedDate && (
                <>
                  <span>•</span>
                  <span>{formattedDate}</span>
                </>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#content"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center gap-2 group"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Start Reading
              </a>

              <EGuideDownloadModal
                guideId={guide.id}
                guideSlug={guide.slug}
                pdfUrl={guide.pdfUrl}
                smallButton={false}
                boxMode={false}
              />
            </div>
          </div>

          {/* Cover image */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Floating effect container */}
              <div className="relative transform hover:scale-105 transition-transform duration-500">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 rounded-3xl blur-xl" />
                
                {/* Book cover */}
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden aspect-[3/4] group">
                  <Image
                    src={guide.coverImage || "/images/eguides/default.png"}
                    alt={guide.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                  
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-br-2xl" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-sky-500/20 to-transparent rounded-tl-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========== MAIN 2-COLUMN ========== */

function MainTwoColumn({ guide }) {
  const hasSections = Array.isArray(guide.sections) && guide.sections.length;

  return (
    <section id="content" className="py-16 lg:py-24 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick overview card */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50 p-8 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-28 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <Image
                      src={guide.coverImage || "/images/eguides/default.png"}
                      alt={guide.title}
                      width={80}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    About This Guide
                  </h2>
                  {guide.summary && (
                    <p className="text-slate-300 leading-relaxed mb-4">
                      {guide.summary}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30">
                      {guide.category || "General"}
                    </span>
                    <span className="px-3 py-1 bg-sky-500/20 text-sky-300 rounded-full text-sm border border-sky-500/30">
                      {guide.readTimeText || "20-30 min"}
                    </span>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm border border-emerald-500/30">
                      {guide.status === "published" ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning objectives */}
            {hasSections && (
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50 p-8 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  What You'll Learn
                </h3>
                
                <div className="grid gap-4">
                  {guide.sections.slice(0, 4).map((section, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/30 hover:border-cyan-500/30 transition-all duration-300 group">
                      <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-cyan-500/30 transition-colors duration-300">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                          {section.heading || `Section ${idx + 1}`}
                        </h4>
                        {section.body && (
                          <p className="text-slate-400 text-sm leading-relaxed">
                            {section.body}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed content */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50 p-8 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12m0-12a2 2 0 012-2h2a2 2 0 012 2m-6 9v-2" />
                  </svg>
                </div>
                Guide Content
              </h3>

              <div className="space-y-8">
                {hasSections ? (
                  guide.sections.map((section, idx) => (
                    <div key={idx} className="group">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                          {idx + 1}
                        </div>
                        <h4 className="text-xl font-bold text-white pt-1 group-hover:text-cyan-300 transition-colors duration-300">
                          {section.heading || `Section ${idx + 1}`}
                        </h4>
                      </div>
                      <div className="ml-12">
                        <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                          {section.body}
                        </p>
                      </div>
                      {idx < guide.sections.length - 1 && (
                        <div className="ml-12 mt-6 border-t border-slate-700/50 pt-6" />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Content Coming Soon
                    </h4>
                    <p className="text-slate-400">
                      We're working on adding detailed content to this guide.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Download card */}
            <div className="bg-gradient-to-br from-slate-800/50to-slate-900/50 rounded-3xlborderborder-slate-700/50 p-6 backdrop-blur-sm sticky top-28 hover:border-cyan-500/30 transition-all duration-300">
              <div className="text-center mb-6 hidden">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-3 transform hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Download Guide
                </h3>
                <p className="text-slate-400 text-sm">
                  Get the PDF version to read offline
                </p>
              </div>

              <EGuideDownloadModal
                guideId={guide.id}
                guideSlug={guide.slug}
                pdfUrl={guide.pdfUrl}
                smallButton={false}
                boxMode={true}
              />

               {/* Guide details */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50 p-6 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 mt-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Guide Details
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
                  <span className="text-slate-400">Author</span>
                  <span className="text-white font-medium">{guide.authorName || "Softkingo Team"}</span>
                </div>
                
                {guide.category && (
                  <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
                    <span className="text-slate-400">Category</span>
                    <span className="text-white font-medium">{guide.category}</span>
                  </div>
                )}
                
                {guide.readTimeText && (
                  <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
                    <span className="text-slate-400">Read Time</span>
                    <span className="text-white font-medium">{guide.readTimeText}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-400">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    guide.status === "published" 
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}>
                    {guide.status === "published" ? "Published" : "Draft"}
                  </span>
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

/* ========== RELATED ========== */

function RelatedSection({ related }) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            More E‑Guides You Might Like
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Explore our collection of expertly crafted guides to enhance your knowledge
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {related.map((g, index) => (
            <EGuidesCard key={g.slug} guide={g} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/e-guides"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white font-semibold rounded-xl transition-all duration-200 border border-slate-700 hover:border-slate-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            View All E‑Guides
          </Link>
        </div>
      </div>
    </section>
  );
}