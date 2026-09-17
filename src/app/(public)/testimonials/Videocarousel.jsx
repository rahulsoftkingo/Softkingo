'use client';

import { useState, useEffect, useCallback } from 'react';

// Video data — edit/replace this list with your own.
const videos = [
  {
    id: "v1",
    youtubeId: "yUL97dFOfHA",
    title: "How we work with our clients",
    name: "Client Showcase",
    role: "Project Walkthrough",
    source: "Client interview",
    stat: { value: 92, label: "Faster delivery" },
  },
];

export default function VideoCarousel({
  autoPlay = true,
  interval = 6000,
  heading = "See It In Action",
  subheading = "Hear it straight from our clients — real stories, real results, in their own words.",
  ctaLabel = "Watch all videos",
  onCtaClick,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [playing, setPlaying] = useState({}); // { [index]: true } once a card's video is activated

  const total = videos.length;
  const nextIndex = (currentIndex + 1) % total;

  const next = useCallback(() => setCurrentIndex((prev) => (prev + 1) % total), [total]);
  const prev = useCallback(() => setCurrentIndex((prev) => (prev - 1 + total) % total), [total]);

  // Autoplay through featured cards (pauses on hover or once a video is actually playing)
  useEffect(() => {
    if (!autoPlay || isHovered || playing[currentIndex]) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, isHovered, total, playing, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  const thumbUrl = (video) =>
    video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

  const activate = (index) => setPlaying((prev) => ({ ...prev, [index]: true }));

  const PlayButton = ({ onClick, size = 'w-14 h-14' }) => (
    <button
      onClick={onClick}
      aria-label="Play video"
      className={`${size} rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-transform hover:scale-105`}
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-sky-700 translate-x-[1px]" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  );

  const VideoFrame = ({ video, index, active }) => (
    <div className="relative w-full h-full rounded-3xl overflow-hidden bg-slate-950">
      {active ? (
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          onClick={() => activate(index)}
          className="absolute inset-0 w-full h-full group"
          aria-label={`Play: ${video.title}`}
        >
          <img
            src={thumbUrl(video)}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayButton onClick={() => activate(index)} />
          </div>
        </button>
      )}
    </div>
  );

  const featured = videos[currentIndex];
  const upNext = videos[nextIndex];

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ===================== DESKTOP / LAPTOP LAYOUT ===================== */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-[320px_1fr_140px] gap-6 items-stretch">
        {/* Left intro column */}
        <div className="flex flex-col justify-between py-2">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-sky-900 leading-normal py-1">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500 py-1">
                Video Testimonials
              </span>
            </h2>
            {subheading && (
              <p className="text-gray-500 text-base leading-relaxed">
                {subheading}
              </p>
            )}
          </div>
        </div>

        {/* Featured video card */}
        <div className="bg-[#E4F4FF] rounded-3xl p-4 flex flex-col min-h-[420px]">
          <div className="relative w-full flex-1 rounded-2xl overflow-hidden shadow-[0_14px_40px_rgba(2,6,23,0.10)] border border-slate-100">
            <VideoFrame video={featured} index={currentIndex} active={!!playing[currentIndex]} />
          </div>

          <div className="flex items-center justify-between gap-6 mt-4 px-2">
            <div className="min-w-0">
              <h3 className="text-base font-bold text-gray-900 leading-tight truncate">
                {featured.title}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {featured.name}{featured.role ? ` · ${featured.role}` : ''}
              </p>
            </div>

            {featured.stat && (
              <div className="text-right flex-shrink-0">
                <div className="text-3xl font-serif text-gray-900 leading-none">
                  {featured.stat.value}
                  <span className="text-lg align-top">%</span>
                </div>
                <div className="text-[10px] tracking-[0.15em] text-gray-400 uppercase mt-1">
                  {featured.stat.label}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Peek of the next card */}
        <div className="hidden lg:block overflow-hidden rounded-3xl">
          <div className="bg-[#E4F4FF] rounded-3xl p-3 min-h-[420px] w-[420px] flex flex-col">
            <div className="relative w-full flex-1 rounded-2xl overflow-hidden">
              <VideoFrame video={upNext} index={nextIndex} active={!!playing[nextIndex]} />
            </div>
            <div className="mt-3 px-1">
              <h3 className="text-sm font-bold text-gray-900 leading-tight truncate">
                {upNext.title}
              </h3>
              <p className="text-xs text-gray-500 truncate">{upNext.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Nav arrows - desktop only */}
      <div className="hidden lg:flex justify-end gap-3 mt-6">
        <button
          onClick={prev}
          className="w-11 h-11 rounded-full bg-white border-2 border-gray-200 hover:border-gray-400 flex items-center justify-center transition-all"
          aria-label="Previous video"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="w-11 h-11 rounded-full bg-white border-2 border-gray-200 hover:border-sky-400 hover:bg-sky-50 flex items-center justify-center transition-all hover:scale-105 shadow-sm"
          aria-label="Next video"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ===================== MOBILE LAYOUT ===================== */}
      <div className="lg:hidden">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-3 text-sky-900 leading-normal py-1">
            See It{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500 py-1">
              In Action
            </span>
          </h2>
          {subheading && (
            <p className="text-gray-500 text-sm leading-relaxed">
              {subheading}
            </p>
          )}
        </div>

        {/* Finger/touch swipe scroll */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 pb-2">
          {videos.map((video, index) => (
            <div
              key={video.id ?? index}
              className="snap-start flex-shrink-0 w-[82%] sm:w-[60%] bg-[#E4F4FF] rounded-3xl p-3 flex flex-col min-h-[300px]"
            >
              <div className="relative w-full flex-1 rounded-2xl overflow-hidden">
                <VideoFrame video={video} index={index} active={!!playing[index]} />
              </div>

              <div className="mt-3 px-1">
                <h3 className="text-sm font-bold text-gray-900 leading-tight truncate">
                  {video.title}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {video.name}{video.role ? ` · ${video.role}` : ''}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onCtaClick}
          className="mt-6 px-6 py-3 rounded-full border border-gray-300 text-gray-900 text-sm font-medium hover:border-gray-900 transition-colors"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}