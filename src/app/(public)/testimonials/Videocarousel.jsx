'use client';

import { useState, useEffect, useCallback } from 'react';

// Video data — Sirf id aur youtubeId
const videos = [
  {
    id: "v1",
    youtubeId: "yUL97dFOfHA",
  },
  {
    id: "v2",
    youtubeId: "cFOI4GRFo5s",
  }

];

export default function VideoCarousel({
  autoPlay = true,
  interval = 6000,
  heading = "See It In Action",
  subheading = "Hear it straight from our clients — real stories, real results, in their own words.",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeVideoKey, setActiveVideoKey] = useState(null); // Fix audio echo using unique active state

  const total = videos.length;
  const nextIndex = (currentIndex + 1) % total;

  const next = useCallback(() => {
    setActiveVideoKey(null); // Slide change hone par playing video pause/reset ho jaye
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveVideoKey(null); // Slide change hone par playing video pause/reset ho jaye
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay functionality
  useEffect(() => {
    if (!autoPlay || isHovered || activeVideoKey) return;
    const timer = setInterval(() => {
      next();
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, isHovered, activeVideoKey, next]);

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

  // Main featured video frame (full interactive: thumbnail -> click -> iframe)
  const VideoFrame = ({ video, uniqueKey }) => {
    const isActive = activeVideoKey === uniqueKey;

    return (
      <div className="relative w-full h-full rounded-3xl overflow-hidden bg-slate-950">
        {isActive ? (
          <iframe
            key={uniqueKey}
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title="Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            onClick={() => setActiveVideoKey(uniqueKey)}
            className="absolute inset-0 w-full h-full group"
            aria-label="Play Video"
          >
            <img
              src={thumbUrl(video)}
              alt="Video Thumbnail"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayButton onClick={() => setActiveVideoKey(uniqueKey)} />
            </div>
          </button>
        )}
      </div>
    );
  };

  // Peek frame for the "up next" sliver on the right.
  // No fixed oversized width here — the image simply object-covers its
  // own real container, so what you see is a proper centered crop of
  // the actual thumbnail, not a random slice of a bigger hidden card.
  const PeekFrame = ({ video }) => (
    <div className="relative w-full h-full rounded-3xl overflow-hidden bg-slate-950">
      <img
        src={thumbUrl(video)}
        alt="Up next video thumbnail"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
      {/* subtle fade on the right edge so the partial-card peek reads as intentional */}
      <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#E4F4FF] to-transparent" />
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
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_140px] gap-6 items-stretch">
        {/* Left intro column */}
        <div className="flex flex-col justify-between py-2">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-sky-900 leading-normal py-1">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500 py-1">
                {heading}
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
            <VideoFrame video={featured} uniqueKey={`desktop-featured-${featured.id}`} />
          </div>
        </div>

        {/* Peek of the next card — clicking it also jumps to that video */}
        <button
          onClick={next}
          className="hidden lg:flex flex-col bg-[#E4F4FF] rounded-3xl p-3 min-h-[420px] w-full overflow-hidden text-left"
          aria-label="Show next video"
        >
          <div className="relative w-full flex-1 rounded-2xl overflow-hidden">
            <PeekFrame video={upNext} />
          </div>
        </button>
      </div>

      {/* Nav arrows */}
      <div className="flex justify-end gap-3 mt-6">
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
    </div>
  );
}