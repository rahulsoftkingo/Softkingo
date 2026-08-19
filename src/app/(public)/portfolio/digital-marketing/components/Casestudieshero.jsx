"use client";

import React from "react";
import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  FileCheck2,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Dummy data — swap with real props/CMS data later
const growthTrend = [
  { v: 20 },
  { v: 28 },
  { v: 24 },
  { v: 34 },
  { v: 30 },
  { v: 42 },
  { v: 38 },
  { v: 52 },
  { v: 48 },
  { v: 66 },
  { v: 62 },
  { v: 82 },
];

const clicksTrend = [
  { v: 10 }, { v: 14 }, { v: 12 }, { v: 18 }, { v: 22 }, { v: 20 }, { v: 30 },
];

const conversionsTrend = [
  { v: 8 }, { v: 12 }, { v: 10 }, { v: 16 }, { v: 15 }, { v: 22 }, { v: 26 },
];

const roiDonut = [
  { value: 312, color: "#38bdf8" },
  { value: 88, color: "#a78bfa" },
  { value: 60, color: "#fbbf24" },
  { value: 40, color: "#fb7185" },
];

const featureTags = [
  { icon: BarChart3, label: "Data-Driven Strategies" },
  { icon: CheckCircle2, label: "Measurable Results" },
  { icon: FileCheck2, label: "Transparent Reporting" },
  { icon: Target, label: "ROI Focused" },
];

export default function CaseStudiesHero() {
  return (
    <section className="relative bg-[#080d24] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-6 pb-12 lg:pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-5 mt-8">
          <Link href="/" className="hover:text-sky-400 transition-colors">
            Home
          </Link>
          <span>›</span>
          {/* <Link href="/our-work" className="hover:text-sky-400 transition-colors">
            Our Work
          </Link>
          <span>›</span> */}
          <span className="text-sky-400 font-semibold">Digital Marketing Portfolio</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT: Heading + tags */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.15]">
              Digital Marketing
              <br />
              <span className="text-sky-400">Case Studies</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-400 font-medium leading-relaxed max-w-md">
              Explore how we have helped businesses grow, rank higher,
              generate quality leads and build a strong online reputation.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7">
              {featureTags.map((tag, i) => {
                const Icon = tag.icon;
                return (
                  <div
                    key={i}
                    className="rounded-lg bg-white/[0.04] border border-white/10 px-3 py-3 flex flex-col gap-2"
                  >
                    <Icon size={16} className="text-sky-400" />
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-300 leading-tight">
                      {tag.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Overall growth + mini stats */}
          <div className="space-y-3">
            {/* Overall Growth card */}
            <div className="rounded-2xl bg-[#0f1530] border border-white/[0.06] p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-medium">
                    Overall Growth
                  </p>
                  <p className="mt-1 text-2xl sm:text-3xl font-extrabold text-emerald-400 flex items-center gap-1">
                    +152%
                    <TrendingUp size={20} className="text-emerald-400" />
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    vs Last 6 Months
                  </p>
                </div>
              </div>
              <div className="h-14 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthTrend}>
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke="#38bdf8"
                      strokeWidth={2.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Small stat cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-[#0f1530] border border-white/[0.06] p-4">
                <p className="text-[11px] text-slate-400 font-medium">
                  Total Clicks
                </p>
                <p className="text-lg sm:text-xl font-extrabold text-white mt-1">
                  98.6K
                </p>
                <p className="text-[10px] text-emerald-400 font-bold mb-1">
                  +189%
                </p>
                <div className="h-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={clicksTrend}>
                      <Line
                        type="monotone"
                        dataKey="v"
                        stroke="#34d399"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-2xl bg-[#0f1530] border border-white/[0.06] p-4">
                <p className="text-[11px] text-slate-400 font-medium">
                  Conversions
                </p>
                <p className="text-lg sm:text-xl font-extrabold text-white mt-1">
                  8.7K
                </p>
                <p className="text-[10px] text-violet-400 font-bold mb-1">
                  +156%
                </p>
                <div className="h-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={conversionsTrend}>
                      <Line
                        type="monotone"
                        dataKey="v"
                        stroke="#a78bfa"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-2xl bg-[#0f1530] border border-white/[0.06] p-4 flex flex-col items-center justify-center">
                <p className="text-[11px] text-slate-400 font-medium self-start">
                  Avg. ROI
                </p>
                <div className="relative w-14 h-14 mt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={roiDonut}
                        dataKey="value"
                        innerRadius={18}
                        outerRadius={26}
                        startAngle={90}
                        endAngle={450}
                        stroke="none"
                      >
                        {roiDonut.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-extrabold text-white">
                      312%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}