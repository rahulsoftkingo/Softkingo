"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TrendingUp, KeyRound, Users, Target, ArrowRight, Calendar } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PopupQuoteModal from "@/components/PopupQuoteModal";

const stats = [
  { icon: TrendingUp, value: "+185%", label: "Organic Traffic" },
  { icon: KeyRound, value: "+127%", label: "Keywords Ranked" },
  { icon: Users, value: "+94%", label: "Leads Generated" },
  { icon: Target, value: "+68%", label: "Conversion Rate" },
];

const trafficData = [
  { month: "Jan", visits: 3200 },
  { month: "Feb", visits: 6800 },
  { month: "Feb2", visits: 6400 },
  { month: "Mar", visits: 10200 },
  { month: "Mar2", visits: 9100 },
  { month: "Apr", visits: 11800 },
  { month: "Apr2", visits: 17600 },
  { month: "May", visits: 18400 },
  { month: "May2", visits: 20200 },
  { month: "May3", visits: 25800 },
  { month: "May4", visits: 26200 },
  { month: "Jun", visits: 28600 },
];

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-slate-900 border border-slate-700 shadow-xl px-3 py-2 text-white">
        <p className="text-xs font-bold">
          {payload[0].value.toLocaleString()}
        </p>
        <p className="text-[10px] text-slate-400 font-medium">Visits/Month</p>
      </div>
    );
  }
  return null;
}

export default function SeoCaseStudyHero({ endpoint = "Healthcare SEO" }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="relative bg-[#060913] text-slate-100 overflow-hidden py-10 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Asymmetric layout (5 cols vs 7 cols) gives the chart extra width */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Content & CTAs (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 z-20">
            {/* Breadcrumb styling from reference code */}
            <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-400">
              <Link href="/" className="hover:text-sky-400 transition-colors">
                Home
              </Link>
              <span>›</span>
              <Link href="/solutions" className="hover:text-sky-400 transition-colors">
                Solutions
              </Link>
              <span>›</span>
              <span className="text-sky-400 font-medium">{endpoint}</span>
            </nav>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.15]">
              Growing Organic Traffic for{" "}
              <span className="text-sky-400">Healthcare</span> Brand
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-300 font-medium flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>Technical SEO</span>
              <span className="text-slate-600">•</span>
              <span>On-Page SEO</span>
              <span className="text-slate-600">•</span>
              <span>Content Strategy</span>
              <span className="text-slate-600">•</span>
              <span>Link Building</span>
            </p>

            <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-[1.8] max-w-xl">
              Our data-driven SEO strategy helped the client increase online
              visibility, attract quality traffic and generate more leads.
            </p>

            {/* CTAs styled after reference code */}
            <div className="flex flex-wrap sm:flex-row gap-4 pt-2">
              <button
                onClick={() => setShowModal(true)}
                className="w-fit px-5 md:px-7 py-3 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-0.5 shadow-lg shadow-sky-900/30 transition-all duration-300 items-center cursor-pointer inline-flex gap-2"
              >
                Let's Work Together <ArrowRight size={18} />
              </button>
              <Link
                href="https://calendly.com/paramhans-softkingo/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 md:px-7 py-3 rounded-full bg-slate-900 text-[#28AFDF] border border-[#28AFDF] font-medium hover:bg-[#28AFDF]/10 transform hover:-translate-y-0.5 shadow-lg shadow-[#28AFDF]/20 transition-all duration-300 text-xs md:text-sm inline-flex items-center justify-center gap-2"
              >
                <Calendar size={18} /> Schedule Meeting
              </Link>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="rounded-2xl bg-[#0d1326] border border-slate-800/80 p-3.5 flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-1.5 text-green-400">
                      <Icon size={16} />
                      <span className="text-[10px] font-semibold tracking-wide">
                        +85%
                      </span>
                    </div>

                    <p className="mt-2 text-lg sm:text-xl font-extrabold text-white tracking-tight">
                      {stat.value}
                    </p>

                    <p className="mt-0.5 text-[11px] text-slate-400 font-medium leading-tight">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Wider Rectangular Chart Wrapper (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white text-slate-900 shadow-2xl p-6 sm:p-8">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Organic Traffic Growth
              </h3>

              {/* Before / After Stats */}
              <div className="flex items-center gap-10 mt-4 mb-6">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Before</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
                    8,420
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Visits/Month
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 font-medium">After</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      24,680
                    </p>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      +185%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Visits/Month
                  </p>
                </div>
              </div>

              {/* Extended Rectangular Chart Area */}
              <div className="w-full h-[280px] sm:h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={trafficData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="caseStudyFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#0284c7"
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="100%"
                          stopColor="#0284c7"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      vertical={false}
                      stroke="#f1f5f9"
                      strokeDasharray="0"
                    />

                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: "#94a3b8" }}
                      interval="preserveStartEnd"
                      ticks={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
                    />

                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: "#94a3b8" }}
                      tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}K`)}
                      domain={[0, 30000]}
                      ticks={[0, 10000, 20000, 30000]}
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Area
                      type="monotone"
                      dataKey="visits"
                      stroke="#0284c7"
                      strokeWidth={3}
                      fill="url(#caseStudyFill)"
                      dot={{ r: 4, fill: "#0284c7", strokeWidth: 0 }}
                      activeDot={{ r: 6, fill: "#0284c7" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>
      </div>

      <PopupQuoteModal open={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
}