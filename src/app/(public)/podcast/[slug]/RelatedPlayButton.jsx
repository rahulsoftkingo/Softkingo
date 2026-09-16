"use client";

import { useState } from "react";

export default function RelatedPlayButton({ audioUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!audioUrl) return;
    setIsPlaying((prev) => !prev);
    // Hook up actual audio play/pause logic here if needed
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={isPlaying ? "Pause" : "Play"}
      className="w-7 h-7 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm transition-colors"
    >
      {isPlaying ? (
        // Pause icon
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        // Play icon
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 translate-x-[1px]">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}