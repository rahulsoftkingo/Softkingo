"use client";

import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function TechnicalSeoAndContentGrowth({ data }) {
  const technicalData = data?.issues || {};
  const technicalChecklist = data?.checklist || [];
  const contentData = data?.contentGrowth || {};
  const contentStats = contentData?.checklist || [];

  return (
    <section className="py-8 md:py-0 bg-white overflow-hidden">
      <div className="mx-auto px-4 sm:px-8 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-4 sm:gap-6 items-stretch">

          {/* LEFT: Technical SEO Improvements */}
          <div className="rounded-xl md:rounded-2xl border border-slate-100 bg-slate-50/60 p-5 sm:p-7">
            <h3 className="text-sm sm:text-base font-bold text-sky-600 mb-5 sm:mb-6">
              {data?.heading || "Technical SEO Improvements"}
            </h3>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">

              {/* Before/After boxes */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="rounded-xl bg-red-50/60 px-4 sm:px-5 py-3 sm:py-4 min-w-[120px] sm:min-w-[130px]">
                  <p className="text-xs sm:text-sm text-red-400 font-semibold">
                    Issues Found
                  </p>

                  <p className="text-2xl sm:text-3xl font-extrabold text-red-500 mt-1">
                    {technicalData?.found ?? 0}
                  </p>

                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">
                    {technicalData?.foundLabel || "Issues Found"}
                  </p>
                </div>

                <ArrowRight
                  className="text-sky-500 shrink-0"
                  size={20}
                />

                <div className="rounded-xl bg-emerald-50/60 px-4 sm:px-5 py-3 sm:py-4 min-w-[120px] sm:min-w-[130px]">
                  <p className="text-xs sm:text-sm text-emerald-400 font-semibold">
                    Issues Fixed
                  </p>

                  <p className="text-2xl sm:text-3xl font-extrabold text-emerald-500 mt-1">
                    {technicalData?.fixed ?? 0}
                  </p>

                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">
                    {technicalData?.fixedLabel || "Resolved"}
                  </p>
                </div>
              </div>

              {/* Checklist grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 flex-1 pt-1 sm:pt-2">
                {technicalChecklist.map((item, i) => (
                  <div
                    key={`${item}-${i}`}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-emerald-500 shrink-0"
                    />

                    <span className="text-xs sm:text-sm text-slate-700 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Content Growth */}
          <div className="rounded-xl md:rounded-2xl border border-slate-100 bg-slate-50/60 p-5 sm:p-7">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-5 sm:mb-6">
              {contentData?.heading || "Content Growth"}
            </h3>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">

              {/* Before/After boxes */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="rounded-xl bg-red-50/60 px-4 sm:px-5 py-3 sm:py-4 min-w-[100px]">
                  <p className="text-xs sm:text-sm text-red-400 font-semibold">
                    Before
                  </p>

                  <p className="text-2xl sm:text-3xl font-extrabold text-red-500 mt-1">
                    {contentData?.before?.value ?? 0}
                  </p>

                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">
                    {contentData?.before?.label || "Indexed Pages"}
                  </p>
                </div>

                <ArrowRight
                  className="text-sky-500 shrink-0"
                  size={20}
                />

                <div className="rounded-xl bg-emerald-50/60 px-4 sm:px-5 py-3 sm:py-4 min-w-[100px]">
                  <p className="text-xs sm:text-sm text-emerald-400 font-semibold">
                    After
                  </p>

                  <p className="text-2xl sm:text-3xl font-extrabold text-emerald-500 mt-1">
                    {contentData?.after?.value ?? 0}
                  </p>

                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">
                    {contentData?.after?.label || "Indexed Pages"}
                  </p>
                </div>
              </div>

              {/* Stats list */}
              <div className="flex-1 divide-y divide-slate-100 pt-1 sm:pt-0">
                {contentStats.map((stat, i) => (
                  <div
                    key={`${stat?.label}-${i}`}
                    className="flex items-center justify-between py-2.5 first:pt-0 sm:first:pt-2"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-emerald-500 shrink-0"
                      />

                      <span className="text-xs sm:text-sm text-slate-700 font-medium">
                        {stat?.label}
                      </span>
                    </div>

                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {stat?.value}
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