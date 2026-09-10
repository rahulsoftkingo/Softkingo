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

function parseArray(json) {
  if (!json?.trim()) return [];
  try {
    const arr = JSON.parse(json);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function parseObject(json, defaults) {
  if (!json?.trim()) return { ...defaults };
  try {
    const obj = JSON.parse(json);
    return typeof obj === "object" && obj !== null ? { ...defaults, ...obj } : { ...defaults };
  } catch {
    return { ...defaults };
  }
}

const SOCIAL_DEFAULTS = { website: "", instagram: "", twitter: "", linkedin: "" };
const PLATFORM_DEFAULTS = { spotify: "", applePodcasts: "", youtubeMusic: "", soundcloud: "" };

const SOCIAL_ICONS = {
  website: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20 4.5c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.6-2.1-.7.4-1.6.8-2.4.9A3.7 3.7 0 0011 6.9c0 .3 0 .6.1.8-3-.1-5.7-1.6-7.5-3.8-.3.6-.5 1.2-.5 1.9 0 1.3.6 2.4 1.6 3.1-.6 0-1.1-.2-1.6-.4v.1c0 1.8 1.3 3.3 3 3.7-.3.1-.6.1-1 .1-.2 0-.5 0-.7-.1.5 1.5 1.9 2.6 3.5 2.6a7.4 7.4 0 01-5.4 1.5A10.4 10.4 0 009 18.5c6.2 0 9.6-5.1 9.6-9.6v-.4c.7-.5 1.2-1.1 1.4-1.9" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M4.98 3.5a2 2 0 100 4 2 2 0 000-4zM3 8.98h4v11.5H3zM9.5 8.98h3.8v1.6h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.53 4.78 5.82v6.03h-4v-5.35c0-1.28-.02-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.83v5.44h-4z" />
    </svg>
  ),
};

const podcastPlatforms = [
  { key: "google", name: "Google Podcasts", src: "/images/podcast/google-podcast.webp" },
  { key: "spotify", name: "Spotify", src: "/images/podcast/spotify-podcast.webp" },
  { key: "apple", name: "Apple Podcasts", src: "/images/podcast/apple-podcast.webp" },
  { key: "soundcloud", name: "Soundcloud", src: "/images/podcast/sound-cloud.webp" },
];

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const podcast = await prisma.podcast.findUnique({ where: { slug } });
  if (!podcast) return {};

  return {
    title: `${podcast.title} - Softkingo Podcast`,
    description: podcast.description || podcast.summary || undefined,
    alternates: { canonical: `/podcast/${slug}` },
  };
}

export default async function PodcastDetailPage({ params }) {
  const { slug } = await params;

  const podcast = await prisma.podcast.findUnique({ where: { slug } });

  if (!podcast || podcast.status !== "published") {
    notFound();
  }

  const topics = parseArray(podcast.topicsJson);
  const socialLinks = parseObject(podcast.socialLinksJson, SOCIAL_DEFAULTS);
  const platformLinks = parseObject(podcast.platformLinksJson, PLATFORM_DEFAULTS);

  const related = await prisma.podcast.findMany({
    where: {
      status: "published",
      slug: { not: slug },
      ...(podcast.category ? { category: podcast.category } : {}),
    },
    orderBy: { publishedAt: "desc" },
    take: 4,
  });

  const activeSocials = Object.entries(socialLinks).filter(([, v]) => v?.trim());
  const activePlatforms = Object.entries(platformLinks).filter(([, v]) => v?.trim());

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <header className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-sky-100 border-b border-sky-100">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sky-100/60 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <nav className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-600 animate-fadeInUp">
            <Link href="/" className="hover:text-sky-500 transition-colors">
              Home
            </Link>
            <span>›</span>
            <Link href="/podcast" className="hover:text-sky-500 transition-colors">
              Podcasts
            </Link>
            {podcast.category && (
              <>
                <span>›</span>
                <span className="text-slate-500">{podcast.category}</span>
              </>
            )}
            <span>›</span>
            <span className="text-sky-500 font-medium line-clamp-1">{podcast.title}</span>
          </nav>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-8 sm:pt-6 sm:pb-10">
          <div className="grid gap-6 sm:grid-cols-[300px_minmax(0,1fr)] items-start">
            {/* Cover */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-sky-100 shadow-lg shadow-sky-900/10 bg-gradient-to-br from-sky-100 to-slate-100">
              <Image
                src={safeImg(podcast.coverImage)}
                alt={podcast.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="space-y-3">
              {podcast.category && (
                <p className="text-[11px] sm:text-xs tracking-[0.24em] uppercase text-sky-500 animate-fadeInUp delay-100">
                  {podcast.category}
                </p>
              )}

              <h1 className="text-2xl sm:text-3xl font-bold text-sky-950 leading-snug animate-fadeInUp delay-100">
                {podcast.title}
              </h1>

              {podcast.hostName && (
                <p className="text-sm text-slate-500 animate-fadeInUp delay-200">{podcast.hostName}</p>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-600 animate-fadeInUp delay-200">
                {podcast.rating != null && (
                  <span className="inline-flex items-center gap-1 font-medium text-amber-500">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" />
                    </svg>
                    <span className="text-slate-700">{podcast.rating.toFixed(1)}</span>
                  </span>
                )}
                {podcast.followersCount != null && (
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                      <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M10 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                    </svg>
                    {podcast.followersCount.toLocaleString()} followers
                  </span>
                )}
                {podcast.frequency && <span className="text-slate-500">{podcast.frequency}</span>}
                {podcast.publishedAt && (
                  <span className="text-slate-500">
                    {new Date(podcast.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
              </div>

              {podcast.description && (
                <p className="text-sm text-slate-600 leading-relaxed max-w-xl animate-fadeInUp delay-300">
                  {podcast.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-1 animate-fadeInUp delay-400">
                {podcast.latestEpisodeAudioUrl && (
                  <a
                    href="#latest-episode"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-sm font-medium px-5 py-2.5 shadow-lg shadow-sky-900/30 hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Play Latest Episode
                  </a>
                )}
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-sky-400 bg-white text-sky-600 hover:bg-sky-50 text-sm font-medium px-5 py-2.5 shadow-md shadow-sky-900/10 transform hover:-translate-y-1 transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                    <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 10-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
                  </svg>
                  Follow
                </button>
              </div>

              {activePlatforms.length > 0 && (
                <div className="pt-2 animate-fadeInUp delay-400">
                  <p className="text-[11px] text-slate-400 mb-2">Listen on your favorite platform</p>
                  <div className="flex flex-wrap items-center gap-3">
                    {activePlatforms.map(([key, url]) => {
                      const platform = podcastPlatforms.find(
                        (p) => p.key === key || p.name.toLowerCase().includes(key.toLowerCase())
                      );
                      if (!platform) return null;

                      return (
                        <a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={platform.name}
                        >
                          <Image
                            src={platform.src}
                            alt={platform.name}
                            width={115}
                            height={32}
                            className="w-[115px] h-auto object-contain"
                          />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] items-start">
            {/* LEFT SIDEBAR */}
            <aside className="space-y-5 lg:sticky lg:top-24">
              {/* About This Podcast */}
              {podcast.summary && (
                <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    About This Podcast
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                    {podcast.summary}
                  </p>
                </div>
              )}

              {/* Host card */}
              {podcast.hostName && (
                <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-sky-100 shrink-0">
                      {podcast.hostAvatar ? (
                        <Image
                          src={safeImg(podcast.hostAvatar)}
                          alt={podcast.hostName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sky-700 text-xs font-bold">
                          {podcast.hostName[0]}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">Host</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{podcast.hostName}</p>
                      {podcast.hostRole && (
                        <p className="text-[11px] text-slate-500 truncate">{podcast.hostRole}</p>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600 pt-1 border-t border-slate-100">
                    {podcast.category && (
                      <li className="flex items-center gap-2 pt-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                        <span>{podcast.category}</span>
                      </li>
                    )}
                    {podcast.language && (
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                        <span>{podcast.language}</span>
                      </li>
                    )}
                    {podcast.frequency && (
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                        <span>{podcast.frequency}</span>
                      </li>
                    )}
                  </ul>

                  {activeSocials.length > 0 && (
                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide mb-2">
                        Follow &amp; Connect
                      </p>
                      <div className="flex items-center gap-2">
                        {activeSocials.map(([key, url]) => (
                          <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-sky-100 text-slate-500 hover:text-sky-700 flex items-center justify-center transition-colors"
                            title={key}
                          >
                            {SOCIAL_ICONS[key]}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Latest episode / audio */}
              {podcast.latestEpisodeAudioUrl && (
                <div
                  id="latest-episode"
                  className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm scroll-mt-24"
                >
                  <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    Latest Episode
                  </h2>
                  {podcast.latestEpisodeTitle && (
                    <p className="text-sm font-medium text-slate-800 mb-2 line-clamp-2">
                      {podcast.latestEpisodeTitle}
                    </p>
                  )}
                  <audio
                    src={podcast.latestEpisodeAudioUrl}
                    controls
                    controlsList="nodownload noplaybackrate"
                    className="w-full h-9"
                  >
                    Your browser does not support the audio element.
                  </audio>
                  {podcast.latestEpisodeDuration && (
                    <p className="text-[11px] text-slate-400 mt-2">
                      Duration: {podcast.latestEpisodeDuration}
                    </p>
                  )}
                </div>
              )}

              {/* You may also like */}
              {related.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
                    You May Also Like
                  </h2>
                  <div className="space-y-3">
                    {related.map((p) => (
                      <Link key={p.slug} href={`/podcast/${p.slug}`} className="flex items-center gap-3 group">
                        <div className="relative w-11 h-11 shrink-0 rounded-lg overflow-hidden border border-slate-200">
                          <Image src={safeImg(p.coverImage)} alt={p.title} fill className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-slate-800 line-clamp-1 group-hover:text-sky-700 transition-colors">
                            {p.title}
                          </p>
                          {p.rating != null && (
                            <p className="text-[11px] text-amber-500 font-medium">★ {p.rating.toFixed(1)}</p>
                          )}
                        </div>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-500 shrink-0"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Build your own podcast app promo */}
              {/* Build your own podcast app promo */}
              <div className="relative bg-white rounded-2xl p-5 text-gray-900 shadow-sm border border-gray-100 min-h-[290px] overflow-visible">

                {/* Text Section */}
                <div className="relative z-10 w-[58%] translate-x-[5px] space-y-1.5">
                  <h2 className="text-sm font-semibold leading-tight text-slate-900">
                    Build Your Own Podcast App
                  </h2>

                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Launch your podcast with a beautiful, branded mobile app that grows
                    your audience.
                  </p>
                </div>


                {/* Phone Image */}
                <div className="absolute -top-7 right-[-15px] w-[215px] h-[285px] z-20 pointer-events-none">
                  <Image
                    src="/images/podcast/phone.png"
                    alt="Podcast mobile app"
                    width={215}
                    height={285}
                    priority
                    className="w-full h-full object-contain rotate-[8deg] drop-shadow-xl"
                  />
                </div>

                {/* Button */}
                <div className="absolute bottom-5 left-5 right-5 z-30">
                  <Link
                    href="/services"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold px-3 py-2.5 shadow-sm transition-colors"
                  >
                    View App Services
                    <span className="text-sm">→</span>
                  </Link>
                </div>

              </div>

              <Link
                href="/podcast"
                className="text-center block text-xs font-medium text-sky-700 hover:text-sky-800 bg-sky-50 border border-sky-200 rounded-xl py-2.5 transition-colors"
              >
                ← Back to all podcasts
              </Link>
            </aside>

            {/* RIGHT SIDE (Single White Card Container) */}
            <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
              {podcast.aboutText && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600 mb-2">
                    Podcast Overview
                  </p>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                    About {podcast.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {podcast.aboutText}
                  </p>
                </div>
              )}

              {podcast.quoteText && (
                <blockquote className="bg-sky-50 border border-sky-100 rounded-2xl p-5 sm:p-6">
                  <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed">
                    “{podcast.quoteText}”
                  </p>
                  {podcast.quoteAuthor && (
                    <footer className="mt-3 text-xs font-medium text-sky-700">
                      — {podcast.quoteAuthor}
                    </footer>
                  )}
                </blockquote>
              )}

              {podcast.whatItsAbout && (
                <div>
                  <h2 className="text-sm sm:text-base font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-sky-500">
                      <path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.4.3.5.7.5 1.1v.5h6v-.5c0-.4.1-.8.5-1.1A6 6 0 0012 3z" />
                    </svg>
                    What This Podcast Is About
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {podcast.whatItsAbout}
                  </p>
                </div>
              )}

              {topics.length > 0 && (
                <div>
                  <h2 className="text-sm sm:text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-sky-500">
                      <path d="M20.6 12.5l-8 8a2 2 0 01-2.8 0l-6.4-6.4a2 2 0 010-2.8l8-8H18a2.6 2.6 0 012.6 2.6v6.6zM7 7h.01" />
                    </svg>
                    Topics We Explore
                  </h2>
                  <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {topics.map((t, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="w-4 h-4 text-sky-500 shrink-0"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {podcast.whoShouldListen && (
                <div>
                  <h2 className="text-sm sm:text-base font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-sky-500">
                      <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M10 11a4 4 0 100-8 4 4 0 000 8z" />
                    </svg>
                    Who Should Listen
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {podcast.whoShouldListen}
                  </p>
                </div>
              )}

              {!podcast.aboutText &&
                !podcast.whatItsAbout &&
                !podcast.whoShouldListen &&
                topics.length === 0 && (
                  <p className="text-sm text-slate-500">
                    No additional overview content for this podcast yet.
                  </p>
                )}
            </section>
          </div>
        </div>

        <ConsultationCTA />
        <InquirySection />
      </main>
    </div>
  );
}