"use client";

import React from "react";
import { ArrowUp, ChevronDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-white border border-slate-100 shadow-lg px-3 py-2 space-y-1">
        <p className="text-[11px] text-slate-400 font-medium">{label}</p>
        {payload.map((entry) => (
          <p
            key={entry.dataKey}
            className="text-sm font-bold"
            style={{ color: entry.color }}
          >
            {Number(entry.value).toLocaleString()}{" "}
            <span className="text-[11px] font-medium text-slate-400">
              {entry.dataKey === "clicks" ? "Clicks" : "Impressions"}
            </span>
          </p>
        ))}
      </div>
    );
  }

  return null;
}

// "66K" / "1.34M" style values -> plain numbers for K-formatting axis ticks
function formatAxisTick(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
  return value;
}

export default function KeywordAndTrafficGrowth({ data, data2, data3 }) {
  // data = Keyword Ranking Growth
  // data2 / data3 = Organic Traffic Growth Object (GSC-style: stats + series[{month, clicks, impressions}])

  const keywordRows = data?.rows || [];

  const chartSource = data2 || data3;

  const trafficData =
    chartSource?.series?.map((item) => ({
      month: item.month?.trim(),
      clicks: Number(item.clicks) || 0,
      impressions: Number(item.impressions) || 0,
    })) || [];

  const stats = chartSource?.stats || [];
  const period = chartSource?.period || "Monthly";

  // Match top stat card backgrounds with Sky Blue & Pink
  const cardTheme = [
    { bg: "bg-sky-500", text: "text-white", sub: "text-sky-100" },
    { bg: "bg-pink-500", text: "text-white", sub: "text-pink-100" },
  ];
  let coloredIndex = 0;

  return (
    <section className="py-8 md:py-10 bg-white overflow-hidden">
      <div className="mx-auto px-4 sm:px-20 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4 sm:gap-6 items-stretch">

          {/* LEFT: Keyword Ranking Growth */}
          <div className="rounded-xl md:rounded-2xl border border-slate-100 bg-white p-5 sm:p-7">

            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 sm:mb-6">
              {data?.heading || "Keyword Ranking Growth"}
            </h3>

            <div className="grid grid-cols-[1fr_60px_60px] text-xs sm:text-sm text-slate-400 font-medium pb-2 border-b border-slate-100">
              <span>Keyword</span>
              <span className="text-center">Before</span>
              <span className="text-center">After</span>
            </div>

            <div className="divide-y divide-slate-100">
              {keywordRows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_60px_60px] items-center py-3 text-xs sm:text-sm"
                >
                  <span className="text-slate-700 font-medium pr-2">
                    {row.keyword}
                  </span>

                  <span className="text-center text-slate-400 font-medium">
                    {row.before}
                  </span>

                  <span className="flex items-center justify-center gap-1 text-emerald-500 font-bold">
                    {row.after}
                    <ArrowUp size={13} />
                  </span>
                </div>
              ))}
            </div>

            {keywordRows.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-6">
                No keyword data available.
              </p>
            )}
          </div>

          {/* RIGHT: Organic Traffic Growth */}
          <div className="rounded-xl md:rounded-2xl border border-slate-100 bg-white overflow-hidden">

            {/* Stat cards row + period dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-stretch border-b border-slate-100">
              <div className="flex flex-1 flex-wrap sm:flex-nowrap">
                {stats.slice(0, 2).map((stat, idx) => {
                  const isColored = stat.checked && coloredIndex < 2;
                  const theme = isColored ? cardTheme[coloredIndex] : null;
                  if (isColored) coloredIndex += 1;

                  return (
                    <div
                      key={idx}
                      className={`flex-1 min-w-[130px] px-4 py-3 sm:py-4 border-r border-slate-100 last:border-r-0 ${theme ? theme.bg : "bg-white"
                        }`}
                    >
                      <label className="flex items-center gap-1.5 cursor-default">
                        <span
                          className={`h-4 w-4 rounded-[4px] border flex items-center justify-center shrink-0 ${stat.checked
                              ? "bg-white/20 border-white"
                              : "border-slate-300"
                            }`}
                        >
                          {stat.checked && (
                            <svg
                              viewBox="0 0 16 16"
                              className={`h-2.5 w-2.5 ${theme ? "fill-white" : "fill-slate-500"}`}
                            >
                              <path d="M13.5 3.5 6 11 2.5 7.5l1-1L6 9l6.5-6.5z" />
                            </svg>
                          )}
                        </span>
                        <span
                          className={`text-xs sm:text-sm font-medium truncate ${theme ? theme.sub : "text-slate-500"
                            }`}
                        >
                          {stat.label}
                        </span>
                      </label>
                      <p
                        className={`mt-1.5 text-xl sm:text-2xl font-bold ${theme ? theme.text : "text-slate-900"
                          }`}
                      >
                        {stat.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* <div className="flex items-center justify-end px-4 py-3 sm:py-0 shrink-0">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700"
                >
                  {period}
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
              </div> */}
            </div>

            {/* Chart */}
            <div className="p-5 sm:p-7">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-medium text-slate-500">Clicks</span>
                <span className="text-xs sm:text-sm font-medium text-slate-500">Impressions</span>
              </div>

              <div className="h-64 sm:h-72">
                {trafficData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trafficData}
                      margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    >
                      <CartesianGrid vertical={false} stroke="#f1f5f9" />

                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={{ stroke: "#334155" }}
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        interval="preserveStartEnd"
                      />

                      <YAxis
                        yAxisId="clicks"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        tickFormatter={formatAxisTick}
                      />

                      <YAxis
                        yAxisId="impressions"
                        orientation="right"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        tickFormatter={formatAxisTick}
                      />

                      <Tooltip content={<CustomTooltip />} />

                      {/* Clicks Line: Sky Blue */}
                      <Line
                        yAxisId="clicks"
                        type="monotone"
                        dataKey="clicks"
                        stroke="#50c6fd"
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 5 }}
                      />

                      {/* Impressions Line: Pink */}
                      <Line
                        yAxisId="impressions"
                        type="monotone"
                        dataKey="impressions"
                        stroke="#ff8dc6"
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 5 }}
                      />
                      
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-sm text-slate-400">
                    No traffic data available.
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}