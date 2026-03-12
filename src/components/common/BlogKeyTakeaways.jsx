"use client";
import React from "react";
import { FaRocket, FaCheckCircle } from "react-icons/fa";

export default function BlogKeyTakeaways({ points }) {
  if (!points || points.length === 0) return null;
  return (
    <div className="bg-sky-50/50 border-2 border-dashed border-sky-200 rounded-3xl p-6 sm:p-8 mb-8 mt-4">
      <h3 className="text-xl font-bold text-sky-900 mb-4 flex items-center  gap-2 text-center">
        <FaRocket className="text-sky-500" />
        Key Takeaways
      </h3>
      <ul className="grid grid-cols-1 gap-4">
        {points.map((pt, i) => (
          <li key={i} className="flex items-start gap-3">
            <FaCheckCircle className="text-sky-500 mt-1 flex-shrink-0" />
            <span className="text-slate-700 text-sm sm:text-base leading-relaxed">{pt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
