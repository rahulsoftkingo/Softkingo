"use client";

import { useState, useEffect } from "react";

export default function PodcastHeroPlayButton({ audioUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleAudioEvent = (e) => {
      if (e.detail?.audioUrl === audioUrl) {
        setIsPlaying(e.detail.isPlaying);
      }
    };

    window.addEventListener("podcast-audio-state", handleAudioEvent);
    return () => window.removeEventListener("podcast-audio-state", handleAudioEvent);
  }, [audioUrl]);

  const togglePlay = () => {
    window.dispatchEvent(
      new CustomEvent("toggle-podcast-audio", { detail: { audioUrl } })
    );
  };

  return (
    <button
      type="button"
      onClick={togglePlay}
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-sm font-medium px-5 py-2.5 shadow-lg shadow-sky-900/30 hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 transition-all duration-300"
    >
      {isPlaying ? (
        <>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
          Pause Episode
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M8 5v14l11-7z" />
          </svg>
          Play Latest Episode
        </>
      )}
    </button>
  );
}