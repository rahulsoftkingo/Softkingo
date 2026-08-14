"use client";

import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

// Dummy data — swap with real props/CMS data later
const technicalChecks = [
  ["Crawlability & Indexing", "Broken Links"],
  ["Core Web Vitals", "Sitemap & Robots.txt"],
  ["Mobile Usability", "Schema Markup"],
  ["Page Speed Optimization", "Canonical Issues"],
];

const contentStats = [
  { label: "Blog Articles Published", value: "42" },
  { label: "New Landing Pages", value: "16" },
  { label: "Existing Pages Optimized", value: "68" },
  { label: "Search Intent Mapping", value: "100%" },
];

export default function TechnicalSeoAndContentGrowth() {
  return (
    <section className="py-8 md:py-0 bg-white overflow-hidden">
      <div className="mx-auto px-4 sm:px-8 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-4 sm:gap-6 items-stretch">
          {/* LEFT: Technical SEO Improvements */}
          <div className="rounded-xl md:rounded-2xl border border-slate-100 bg-slate-50/60 p-5 sm:p-7">
            <h3 className="text-sm sm:text-base font-bold text-sky-600 mb-5 sm:mb-6">
              Technical SEO Improvements
            </h3>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              {/* Before/After boxes */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="rounded-xl bg-red-50/60 px-4 sm:px-5 py-3 sm:py-4 min-w-[120px] sm:min-w-[130px]">
                  <p className="text-xs sm:text-sm text-red-400 font-semibold">
                    Issues Found
                  </p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-red-500 mt-1">
                    68
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">
                    Critical &amp; Major Issues
                  </p>
                </div>

                <ArrowRight className="text-sky-500 shrink-0" size={20} />

                <div className="rounded-xl bg-emerald-50/60 px-4 sm:px-5 py-3 sm:py-4 min-w-[120px] sm:min-w-[130px]">
                  <p className="text-xs sm:text-sm text-emerald-400 font-semibold">
                    Issues Fixed
                  </p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-emerald-500 mt-1">
                    68
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">
                    100% Resolved
                  </p>
                </div>
              </div>

              {/* Checklist grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 flex-1 pt-1 sm:pt-2">
                {technicalChecks.map((pair, i) => (
                  <React.Fragment key={i}>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">
                        {pair[0]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">
                        {pair[1]}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Content Growth */}
          <div className="rounded-xl md:rounded-2xl border border-slate-100 bg-slate-50/60 p-5 sm:p-7">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-5 sm:mb-6">
              Content Growth
            </h3>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              {/* Before/After boxes */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="rounded-xl bg-red-50/60 px-4 sm:px-5 py-3 sm:py-4 min-w-[100px]">
                  <p className="text-xs sm:text-sm text-red-400 font-semibold">
                    Before
                  </p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-red-500 mt-1">
                    32
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">
                    Indexed Pages
                  </p>
                </div>

                <ArrowRight className="text-sky-500 shrink-0" size={20} />

                <div className="rounded-xl bg-emerald-50/60 px-4 sm:px-5 py-3 sm:py-4 min-w-[100px]">
                  <p className="text-xs sm:text-sm text-emerald-400 font-semibold">
                    After
                  </p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-emerald-500 mt-1">
                    118
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">
                    Indexed Pages
                  </p>
                </div>
              </div>

              {/* Stats list */}
              <div className="flex-1 divide-y divide-slate-100 pt-1 sm:pt-0">
                {contentStats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2.5 first:pt-0 sm:first:pt-2"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}