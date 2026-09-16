"use client";

import { useState, useEffect } from "react";

export default function PlayEpisodeButton() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Latest episode audio element dhundte hain
    const container = document.getElementById("latest-episode");
    const audioElement = container?.querySelector("audio");

    if (!audioElement) return;

    // Audio ke standard events ko listen karke state update karte hain
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audioElement.addEventListener("play", handlePlay);
    audioElement.addEventListener("pause", handlePause);
    audioElement.addEventListener("ended", handleEnded);

    // Initial state check
    if (!audioElement.paused) {
      setIsPlaying(true);
    }

    return () => {
      audioElement.removeEventListener("play", handlePlay);
      audioElement.removeEventListener("pause", handlePause);
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = (e) => {
    e.preventDefault();

    const container = document.getElementById("latest-episode");
    const audioElement = container?.querySelector("audio");

    if (!audioElement) return;

    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  };

  return (
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
          {isPlaying === false && document.querySelector("#latest-episode audio")?.currentTime > 0 
            ? "Resume Episode" 
            : "Play Latest Episode"}
        </>
      )}
    </button>
  );
}