// src/app/(public)/podcast/[slug]/page.jsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ConsultationCTA from "@/components/common/Consultation-Cta";
import InquirySection from "@/components/footer/InquirySection";

export const dynamic = "force-dynamic";

function safeImg(src, fallback = "/images/insights/hero-default.png") {
  const s = (src || "").toString().trim();
  if (!s) return fallback;
  if (s.startsWith("/")) return s;
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  return fallback;
}

function parseSegments(segmentsJson) {
  if (!segmentsJson?.trim()) return [];
  try {
    const arr = JSON.parse(segmentsJson);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const episode = await prisma.podcast.findUnique({
    where: { slug },
  });

  if (!episode) return {};

  return {
    title: `${episode.title} - Softkingo Podcast`,
    description: episode.description || episode.summary || undefined,
    alternates: { canonical: `/podcast/${slug}` },
  };
}

export default async function PodcastDetailPage({ params }) {
  const { slug } = await params;

  const episode = await prisma.podcast.findUnique({
    where: { slug },
  });

  if (!episode || episode.status !== "published") {
    notFound();
  }

  const segments = parseSegments(episode.segmentsJson);

  // Related episodes (same category, excluding current)
  const related = await prisma.podcast.findMany({
    where: {
      status: "published",
      slug: { not: slug },
      ...(episode.category ? { category: episode.category } : {}),
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <header className="relative border-b border-slate-200">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={safeImg(episode.coverImage)}
            alt={episode.title}
            fill
            priority
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-slate-900/60 to-slate-900/10" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 sm:pt-8 sm:pb-14 text-slate-50">
          <nav className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-200 mb-4">
            <Link href="/" className="hover:text-sky-300">
              Home
            </Link>
            <span>/</span>
            <Link href="/podcast" className="hover:text-sky-300">
              Podcast
            </Link>
            <span>/</span>
            <span className="text-sky-300 font-medium line-clamp-1">
              {episode.title}
            </span>
          </nav>

          <div className="space-y-4 sm:space-y-5 max-w-3xl">
            {episode.category && (
              <p className="text-[11px] sm:text-xs tracking-[0.24em] uppercase text-sky-300">
                {episode.category}
              </p>
            )}

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-normal">
              {episode.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-200/90">
              {episode.durationText && (
                <span className="inline-flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {episode.durationText}
                </span>
              )}
              {episode.episodeNumber != null && (
                <span className="px-2 py-0.5 rounded-full bg-sky-500/90 text-slate-900 font-semibold text-[11px]">
                  Ep. {episode.episodeNumber}
                </span>
              )}
              {episode.publishedAt && (
                <span>
                  {new Date(episode.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,260px)] gap-6 lg:gap-8 items-start">
            {/* LEFT: description + summary + show notes */}
            <section className="space-y-8">
              {episode.description && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                    {episode.description}
                  </p>
                </div>
              )}

              {episode.summary && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                  <h2 className="text-sm sm:text-base font-semibold text-slate-800 mb-2">
                    What you'll learn
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {episode.summary}
                  </p>
                </div>
              )}

              {segments.length > 0 && (
                <div>
                  <h2 className="text-sm sm:text-base font-semibold text-slate-800 mb-4">
                    Show Notes
                  </h2>
                  <div className="space-y-3">
                    {segments.map((seg, i) => (
                      <div
                        key={i}
                        className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
                      >
                        <div className="flex items-center gap-3 mb-1.5">
                          {seg.timestamp && (
                            <span className="text-[11px] font-mono font-semibold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">
                              {seg.timestamp}
                            </span>
                          )}
                          <h3 className="text-sm font-semibold text-slate-900">
                            {seg.heading}
                          </h3>
                        </div>
                        {seg.body && (
                          <p className="text-[13px] text-slate-600 leading-relaxed whitespace-pre-line">
                            {seg.body}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!episode.description && !episode.summary && segments.length === 0 && (
                <p className="text-sm text-slate-500">
                  No additional show notes for this episode yet.
                </p>
              )}
            </section>

            {/* RIGHT: author + audio player + related */}
            <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
              {/* Author / host card */}
              {(episode.hostName || episode.guestName) && (
                <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.18em] mb-3">
                    Hosted by
                  </p>

                  {episode.hostName && (
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {episode.hostName[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {episode.hostName}
                        </p>
                        {episode.hostRole && (
                          <p className="text-[11px] text-slate-500 truncate">
                            {episode.hostRole}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {episode.guestName && (
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {episode.guestName[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {episode.guestName}
                        </p>
                        <p className="text-[11px] text-slate-500">Guest</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Audio player card */}
              {episode.audioUrl && (
                <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.18em] mb-3">
                    Listen to the episode
                  </p>
                  <audio
                    src={episode.audioUrl}
                    controls
                    controlsList="nodownload noplaybackrate"
                    className="w-full h-10"
                  >
                    Your browser does not support the audio element.
                  </audio>
                  {episode.durationText && (
                    <p className="text-[11px] text-slate-500 mt-2">
                      Duration: {episode.durationText}
                    </p>
                  )}
                </div>
              )}

              {/* Related episodes */}
              {related.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.18em] mb-3">
                    More episodes
                  </p>
                  <div className="space-y-3">
                    {related.map((ep) => (
                      <Link
                        key={ep.slug}
                        href={`/podcast/${ep.slug}`}
                        className="flex gap-3 group"
                      >
                        <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden border border-slate-200">
                          <Image
                            src={safeImg(ep.coverImage)}
                            alt={ep.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-800 line-clamp-2 group-hover:text-sky-700 transition-colors">
                            {ep.title}
                          </p>
                          {ep.durationText && (
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              {ep.durationText}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <Link
                href="/podcast"
                className="text-center text-xs font-medium text-sky-700 hover:text-sky-800 bg-sky-50 border border-sky-200 rounded-xl py-2.5 transition-colors"
              >
                ← Back to all episodes
              </Link>
            </aside>
          </div>
        </div>

        <ConsultationCTA />
        <InquirySection />
      </main>
    </div>
  );
}