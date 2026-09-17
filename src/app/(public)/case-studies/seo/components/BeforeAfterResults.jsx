"use client";

import React from "react";
import {
  Users,
  LineChart,
  Trophy,
  UserCheck,
  ArrowUp,
} from "lucide-react";

// Dummy icons — API/data se icon nahi lenge
const metricIcons = [
  Users,
  LineChart,
  Trophy,
  UserCheck,
];

export default function BeforeAfterResults({ data }) {
  
  const heading = data?.heading || "Before vs After Results";
  const description = data?.description || "";

  const beforeData = data?.before || {};
  const afterData = data?.after || {};

  const beforeMetrics = Array.isArray(beforeData?.metrics)
    ? beforeData.metrics
    : [];

  const afterMetrics = Array.isArray(afterData?.metrics)
    ? afterData.metrics
    : [];

  return (
    <section className="py-8 md:py-10 bg-white overflow-hidden">
      <div className="mx-auto px-4 sm:px-8 lg:px-20">
        <div className="rounded-xl md:rounded-2xl border border-slate-100 bg-[#F1F9FF] p-5 sm:p-7">

          {/* Heading */}
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {heading}
            </h3>

            {description && (
              <p className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">
                {description}
              </p>
            )}
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">

            {/* VS badge */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-slate-100 shadow-md items-center justify-center">
              <span className="text-xs font-bold text-slate-800">
                VS
              </span>
            </div>

            {/* =================================
                BEFORE
            ================================= */}
            <div className="rounded-xl bg-white border border-slate-100 overflow-hidden">

              <div className="bg-gradient-to-r from-red-50 to-transparent px-5 py-3 text-center">
                <span className="text-sm font-bold text-red-500">
                  {beforeData?.label || "Before SEO"}
                </span>
              </div>

              <div className="divide-y divide-slate-100 px-5">
                {beforeMetrics.map((stat, i) => {
                  // Dummy icon — repeat if metrics > 4
                  const Icon = metricIcons[i % metricIcons.length];

                  return (
                    <div
                      key={i}
                      className="flex items-center gap-4 py-4"
                    >
                      {/* Icon */}
                      <div className="w-9 h-9 min-w-9 rounded-full bg-red-50 flex items-center justify-center">
                        <Icon
                          size={16}
                          className="text-red-500"
                        />
                      </div>

                      {/* Metric */}
                      <div>
                        <p className="text-base sm:text-lg font-bold text-slate-900">
                          {stat?.value || "-"}
                        </p>

                        <p className="text-xs sm:text-sm text-slate-400 font-medium">
                          {stat?.label || ""}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =================================
                AFTER
            ================================= */}
            <div className="rounded-xl bg-white border border-slate-100 overflow-hidden">

              <div className="bg-gradient-to-l from-emerald-50 to-transparent px-5 py-3 text-center">
                <span className="text-sm font-bold text-emerald-500">
                  {afterData?.label || "After SEO (6 Months)"}
                </span>
              </div>

              <div className="divide-y divide-slate-100 px-5">
                {afterMetrics.map((stat, i) => {
                  // Dummy icon — repeat if metrics > 4
                  const Icon = metricIcons[i % metricIcons.length];

                  return (
                    <div
                      key={i}
                      className="flex items-center gap-4 py-4"
                    >
                      {/* Icon */}
                      <div className="w-9 h-9 min-w-9 rounded-full bg-emerald-50 flex items-center justify-center">
                        <Icon
                          size={16}
                          className="text-emerald-500"
                        />
                      </div>

                      {/* Metric */}
                      <div className="flex-1">
                        <p className="text-base sm:text-lg font-bold text-slate-900">
                          {stat?.value || "-"}
                        </p>

                        <p className="text-xs sm:text-sm text-slate-400 font-medium">
                          {stat?.label || ""}
                        </p>
                      </div>

                      {/* Growth */}
                      {stat?.growth && (
                        <div className="flex items-center gap-1 text-emerald-500 text-xs sm:text-sm font-bold">
                          <ArrowUp size={14} />
                          {stat.growth}%
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}