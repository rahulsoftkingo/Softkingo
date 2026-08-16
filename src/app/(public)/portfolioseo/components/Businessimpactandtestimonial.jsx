"use client";

import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

export default function BusinessImpactAndTestimonial({ data, data1 }) {
  // Safely normalize data
  const businessData = data || {};
  const toolsData = data1 || {};

  const stats = Array.isArray(businessData.stats)
    ? businessData.stats
    : [];

  const tools = Array.isArray(toolsData.tools)
    ? toolsData.tools
    : [];

  // Safely clean image URL
  const getSafeImageSrc = (value) => {
    if (typeof value !== "string") return "";

    const trimmed = value.trim();

    // Empty or invalid-looking path
    if (!trimmed) return "";

    // Prevent spaces/control characters from reaching next/image
    if (/[\u0000-\u001F\u007F]/.test(trimmed)) return "";

    return trimmed;
  };

  return (
    <section className="py-8 md:py-10 bg-white overflow-hidden">
      <div className="mx-auto px-4 sm:px-8 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch">

          {/* =========================
              LEFT: BUSINESS IMPACT
          ========================== */}
          <div className="w-full lg:w-[calc(30%-1rem)] rounded-xl md:rounded-2xl border border-slate-100 bg-slate-50/60 p-5 sm:p-7 flex flex-col justify-between">
            
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {businessData.heading || "Business Impact"}
              </h3>

              {businessData.subheading && (
                <p className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">
                  {businessData.subheading}
                </p>
              )}
            </div>

            {stats.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 mt-5 sm:mt-6">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-white border border-slate-100 px-3 py-4 text-center flex flex-col justify-center"
                  >
                    <p className="text-lg sm:text-2xl font-extrabold text-emerald-500">
                      {stat?.value || "—"}
                    </p>

                    <p className="mt-1 text-[10px] sm:text-xs text-slate-500 font-semibold leading-tight">
                      {stat?.label || "Metric"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 text-center text-sm text-slate-400">
                No business impact data available.
              </div>
            )}
          </div>

          {/* =========================
              MIDDLE: TESTIMONIAL
          ========================== */}
          <div className="w-full lg:w-[calc(30%-1rem)] rounded-xl md:rounded-2xl border border-slate-100 bg-slate-50/60 p-5 sm:p-7 flex flex-col">

            <h3 className="text-base sm:text-lg font-bold text-slate-900 text-center">
              What Our Client Says
            </h3>

            <Quote
              className="text-slate-200 mt-4"
              size={30}
              strokeWidth={2.5}
              fill="currentColor"
            />

            <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed flex-1">
              Softkingo's SEO strategy completely transformed our online
              presence. Their team is professional, responsive and
              results-driven. We saw a significant increase in traffic and
              leads within just 6 months.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <img
                src="https://i.pravatar.cc/100?img=13"
                alt="John Smith"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover"
              />

              <div>
                <p className="text-sm font-bold text-slate-900">
                  John Smith
                </p>

                <p className="text-xs text-slate-400 font-medium">
                  CEO, Healthcare Brand
                </p>
              </div>
            </div>
          </div>

          {/* =========================
              RIGHT: TOOLS
          ========================== */}
          <div className="w-full lg:w-[calc(40%-1rem)] rounded-xl md:rounded-2xl border border-slate-100 bg-slate-50/60 p-5 sm:p-7 flex flex-col justify-between">

            <h3 className="text-base sm:text-lg font-bold text-slate-900 text-center mb-5 sm:mb-6">
              {toolsData.heading || "Tools & Technologies"}
            </h3>

            {tools.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

                {tools.map((tool, i) => {
                  const imageSrc = getSafeImageSrc(tool?.logo);

                  return (
                    <div
                      key={i}
                      className="rounded-xl bg-white border border-slate-100 flex flex-col items-center justify-center text-center px-3 py-4 h-24 sm:h-28 transition-all hover:shadow-md"
                    >

                      {/* Safe image rendering */}
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={tool?.name || "Technology"}
                          width={70}
                          height={35}
                          className="h-8 sm:h-9 w-auto object-contain"
                        />
                      ) : (
                        <div className="h-8 sm:h-9 w-[70px] flex items-center justify-center">
                          <span className="text-[9px] text-slate-300">
                            No logo
                          </span>
                        </div>
                      )}

                      <span className="mt-3 text-[10px] sm:text-[11px] font-semibold text-slate-600 leading-tight">
                        {tool?.name || "Unknown Tool"}
                      </span>

                    </div>
                  );
                })}

              </div>
            ) : (
              <div className="text-center text-sm text-slate-400">
                No tools available.
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}