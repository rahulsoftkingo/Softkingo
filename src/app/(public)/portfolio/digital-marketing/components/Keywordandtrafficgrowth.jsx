"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const value = Number(payload[0].value);

    return (
      <div className="rounded-lg bg-white border border-slate-100 shadow-lg px-3 py-2">
        <p className="text-sm font-bold text-slate-900">
          {value.toLocaleString()}
        </p>

        <p className="text-[11px] text-slate-400 font-medium">
          Visits/Month
        </p>
      </div>
    );
  }

  return null;
}

export default function KeywordAndTrafficGrowth({ data, data2, data3 }) {
  // data = Keyword Ranking Growth
  // data3 = Organic Traffic Growth Object

  const keywordRows = data?.rows || [];

  // data3 prioritize karenge graph payload ke liye
  const chartSource = data3 || data2;

  const trafficData =
    chartSource?.series?.map((item) => ({
      month: item.month?.trim(),
      visits: Number(item.value),
    })) || [];

  // After ki main value dikhane ke liye extraction
  const afterValue = chartSource?.after?.value || chartSource?.value;
  const afterUnit = chartSource?.after?.unit || chartSource?.unit;

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
          <div className="rounded-xl md:rounded-2xl border border-slate-100 bg-white p-5 sm:p-7">

            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              {chartSource?.title || "Organic Traffic Growth"}
            </h3>

            {/* Direct After Value Display (Original UI style) */}
            {afterValue && (
              <div className="mb-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {typeof afterValue === "number" ? afterValue.toLocaleString() : afterValue}
                </span>

                {afterUnit && (
                  <span className="ml-2 text-xs sm:text-sm text-slate-400 font-medium">
                    {afterUnit}
                  </span>
                )}
              </div>
            )}

            <div className="h-64 sm:h-72">
              {trafficData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={trafficData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -10,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="trafficFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#0ea5e9"
                          stopOpacity={0.25}
                        />

                        <stop
                          offset="100%"
                          stopColor="#0ea5e9"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      vertical={false}
                      stroke="#f1f5f9"
                    />

                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tick={{
                        fontSize: 11,
                        fill: "#94a3b8",
                      }}
                      interval="preserveStartEnd"
                    />

                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{
                        fontSize: 11,
                        fill: "#94a3b8",
                      }}
                      tickFormatter={(value) =>
                        value >= 1000
                          ? `${value / 1000}K`
                          : value
                      }
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Area
                      type="monotone"
                      dataKey="visits"
                      stroke="#0ea5e9"
                      strokeWidth={2.5}
                      fill="url(#trafficFill)"
                      dot={{
                        r: 3,
                        fill: "#0ea5e9",
                        strokeWidth: 0,
                      }}
                      activeDot={{
                        r: 5,
                      }}
                    />
                  </AreaChart>
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
    </section>
  );
}