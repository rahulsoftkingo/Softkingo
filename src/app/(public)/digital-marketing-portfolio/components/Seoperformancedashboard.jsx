"use client";

import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

// Dummy sparkline trend data — swap with real time-series data later
const trend = [
  { v: 10 },
  { v: 14 },
  { v: 12 },
  { v: 18 },
  { v: 16 },
  { v: 22 },
  { v: 20 },
  { v: 28 },
  { v: 26 },
  { v: 34 },
  { v: 30 },
  { v: 40 },
];

function Sparkline({ id }) {
  return (
    <div className="h-10 sm:h-12 mt-3">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={trend}
          margin={{ top: 2, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient
              id={`spark-${id}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#0ea5e9"
                stopOpacity={0.35}
              />
              <stop
                offset="100%"
                stopColor="#0ea5e9"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="v"
            stroke="#0ea5e9"
            strokeWidth={2}
            fill={`url(#spark-${id})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function SeoPerformanceDashboard({ heading, data = [] }) {
  console.log("seo performance dashboard", data);

  return (
    <section className="py-8 md:pt-0 md:pb-0 bg-white overflow-hidden">
      <div className="mx-auto px-4 sm:px-8 lg:px-20">
        <div className="rounded-xl md:rounded-2xl border border-slate-100 bg-[#F1F9FF] p-3 sm:p-3">
          
          <h3 className="text-center text-base sm:text-lg font-bold text-slate-900 mb-6 sm:mb-8">
            {heading} <span className="text-sky-500">Dashboard</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {data.map((item, i) => (
              <div
                key={i}
                className="rounded-xl bg-white border border-slate-100 p-4 sm:p-5"
              >
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  {item.label}
                </p>

                <p className="mt-1 font-extrabold text-lg sm:text-xl text-emerald-500">
                  {item.value}
                </p>

                <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
                  {item.sub}
                </p>

                <Sparkline id={i} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}