"use client";

import { useState, useRef, useEffect } from "react";

export default function PlayEpisodeButton({ audioUrl }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setHasStarted(false);
      setCurrentTime(0);
    };
    const handleTimeUpdate = () => {
      if (audio.currentTime > 0) setHasStarted(true);
      setCurrentTime(audio.currentTime);
    };
    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
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

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = Number(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds) => {
    if (!isFinite(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!audioUrl) return null;

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm">
      {/* Hidden audio element this button actually controls */}
      <audio ref={audioRef} src={audioUrl} preload="none" />

      {/* Play/Resume + Follow on the same line */}
      <div className="flex flex-row items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-sm font-medium px-5 py-2.5 shadow-lg shadow-sky-900/30 hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
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

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-sky-400 bg-white text-sky-600 hover:bg-sky-50 text-sm font-medium px-5 py-2.5 shadow-md shadow-sky-900/10 transform hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
            <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 10-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
          </svg>
          Follow
        </button>
      </div>

      {/* Seek bar: shows current position and lets user jump anywhere in the audio */}
      {(hasStarted || duration > 0) && (
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="tabular-nums w-10">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1.5 rounded-full accent-sky-500 cursor-pointer"
          />
          <span className="tabular-nums w-10">{formatTime(duration)}</span>
        </div>
      )}
    </div>
  );
}