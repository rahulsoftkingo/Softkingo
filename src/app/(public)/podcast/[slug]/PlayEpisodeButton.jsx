"use client";

import { useState, useRef, useEffect } from "react";

export default function PlayEpisodeButton({ audioUrl }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setHasStarted(false);
    };
    const handleTimeUpdate = () => {
      if (audio.currentTime > 0) setHasStarted(true);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioUrl]);

  const togglePlay = (e) => {
    e.preventDefault();
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {
        // Autoplay/user-gesture errors land here silently
      });
    } else {
      audio.pause();
    }
  };

  if (!audioUrl) return null;

  return (
    <>
      {/* Hidden audio element this button actually controls */}
      <audio ref={audioRef} src={audioUrl} preload="none" />

      <button
        type="button"
        onClick={togglePlay}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-sm font-medium px-5 py-2.5 shadow-lg shadow-sky-900/30 hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 transition-all duration-300"
      >
        {isPlaying ? (
          <>
            {/* Pause Icon */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
            Pause Episode
          </>
        ) : (
          <>
            {/* Play / Resume Icon */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M8 5v14l11-7z" />
            </svg>
            {hasStarted ? "Resume Episode" : "Play Latest Episode"}
          </>
        )}
      </button>
    </>
  );
}