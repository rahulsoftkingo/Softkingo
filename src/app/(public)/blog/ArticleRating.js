"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faces = [
  { value: 1, label: "Not useful", emoji: "😞", color: "from-rose-50 to-rose-100", border: "border-rose-200" },
  { value: 2, label: "Needs work", emoji: "😕", color: "from-orange-50 to-orange-100", border: "border-orange-200" },
  { value: 3, label: "Okay", emoji: "😐", color: "from-amber-50 to-amber-100", border: "border-amber-200" },
  { value: 4, label: "Helpful", emoji: "🙂", color: "from-lime-50 to-lime-100", border: "border-lime-200" },
  { value: 5, label: "Very helpful", emoji: "😊", color: "from-emerald-50 to-emerald-100", border: "border-emerald-200" },
];

export default function ArticleRating({ slug }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const current = faces[(hover || rating || 3) - 1];

  const handleSubmit = async () => {
    if (!rating || !slug) return;
    try {
      setSubmitting(true);
      await fetch(`/api/public/blog/${slug}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Submit rating failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`
        bg-gradient-to-r ${current.color} ${current.border}
        rounded-2xl p-6 sm:p-7 text-center shadow-sm
      `}
    >
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
        {faces.map((face) => {
          const active = face.value <= (hover || rating);
          return (
            <motion.button
              key={face.value}
              type="button"
              onMouseEnter={() => setHover(face.value)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(face.value)}
              whileHover={{ scale: 1.15, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className={`
                relative flex items-center justify-center
                h-10 w-10 sm:h-11 sm:w-11 rounded-full
                transition-colors duration-200
                ${active ? "bg-white shadow-md" : "bg-white/70"}
              `}
            >
              <span
                className={`
                  text-lg sm:text-xl
                  ${active ? "" : "opacity-70"}
                `}
              >
                {face.emoji}
              </span>
              {active && (
                <motion.span
                  layoutId="smiley-glow"
                  className="pointer-events-none absolute inset-0 rounded-full bg-yellow-300/20 blur-sm"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.h3
          key={current.label + (submitted ? "-done" : "-pending")}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="text-lg sm:text-xl font-semibold text-amber-900 mb-1"
        >
          {submitted ? "Thanks for your feedback!" : "Was this article helpful?"}
        </motion.h3>
      </AnimatePresence>

      {!submitted && (
        <>
          <p className="text-amber-700 text-xs sm:text-sm mb-4">
            Current mood: <span className="font-semibold">{current.label}</span>
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              type="button"
              disabled={!rating || submitting}
              className={`
                px-4 py-2 rounded-full text-xs sm:text-sm font-semibold
                text-white bg-amber-500 hover:bg-amber-600
                disabled:bg-amber-300 disabled:cursor-not-allowed
                transition-colors
              `}
              onClick={handleSubmit}
            >
              {submitting
                ? "Saving..."
                : rating
                ? `Submit ${rating}/5`
                : "Pick a face to rate"}
            </button>
            {rating > 0 && (
              <button
                type="button"
                onClick={() => setRating(0)}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border border-amber-300 text-amber-700 hover:bg-amber-100 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
