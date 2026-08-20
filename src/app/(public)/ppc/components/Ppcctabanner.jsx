"use client";

import React from "react";
import { Headphones } from "lucide-react";

function TargetArrowIcon({ className }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="46" fill="#ffffff" />
      <circle cx="50" cy="50" r="46" fill="none" stroke="#1d4ed8" strokeWidth="6" />
      <circle cx="50" cy="50" r="32" fill="none" stroke="#1d4ed8" strokeWidth="6" />
      <circle cx="50" cy="50" r="18" fill="none" stroke="#1d4ed8" strokeWidth="6" />
      <circle cx="50" cy="50" r="6" fill="#1d4ed8" />
      <g transform="rotate(45 50 50)">
        <line x1="50" y1="50" x2="82" y2="18" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
        <polygon points="82,10 92,12 90,22" fill="#f97316" />
        <polygon points="50,50 42,44 44,52" fill="#f97316" />
      </g>
    </svg>
  );
}

export default function PPCCTABanner() {
  return (
    <section className="py-4 md:py-6 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="rounded-2xl bg-gradient-to-r from-[#0b1f6e] to-[#1447c9] px-6 sm:px-8 py-6 sm:py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <TargetArrowIcon className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0" />
            <div>
              <h3 className="text-base sm:text-xl font-bold text-white leading-snug">
                Ready to Get More Leads &amp; Higher ROI?
              </h3>
              <p className="text-xs sm:text-sm text-sky-100/80 font-medium mt-1">
                Our PPC experts are ready to help you grow your business
                with result-driven advertising.
              </p>
            </div>
          </div>

          <button className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-sky-700 font-bold text-xs sm:text-sm px-5 sm:px-6 py-3 rounded-full hover:bg-sky-50 transition-colors shadow-lg">
            <Headphones size={18} />
            Let's Talk
          </button>
        </div>
      </div>
    </section>
  );
}