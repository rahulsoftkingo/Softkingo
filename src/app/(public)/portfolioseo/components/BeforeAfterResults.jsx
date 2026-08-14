"use client";

import React from "react";
import { Users, LineChart, Trophy, UserCheck, ArrowUp } from "lucide-react";

// Dummy data — swap with real props/CMS data later
const beforeStats = [
  { icon: Users, value: "8,420", label: "Monthly Organic Traffic" },
  { icon: LineChart, value: "126", label: "Ranking Keywords" },
  { icon: Trophy, value: "12", label: "Keywords in Top 10" },
  { icon: UserCheck, value: "18", label: "Leads per Month" },
];

const afterStats = [
  { icon: Users, value: "24,680", label: "Monthly Organic Traffic", change: "+185%" },
  { icon: LineChart, value: "489", label: "Ranking Keywords", change: "+127%" },
  { icon: Trophy, value: "67", label: "Keywords in Top 10", change: "+458%" },
  { icon: UserCheck, value: "74", label: "Leads per Month", change: "+311%" },
];

export default function BeforeAfterResults() {
  return (
    <section className="py-8 md:py-10 bg-white overflow-hidden">
      <div className="mx-auto px-4 sm:px-8 lg:px-20">
        <div className="rounded-xl md:rounded-2xl border border-slate-100 bg-[#F1F9FF] p-5 sm:p-7">
          {/* Heading */}
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Before vs After Results
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">
              Real improvement. Real results.
            </p>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* VS badge */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-slate-100 shadow-md items-center justify-center">
              <span className="text-xs font-bold text-slate-800">VS</span>
            </div>

            {/* BEFORE */}
            <div className="rounded-xl bg-white border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-red-50 to-transparent px-5 py-3 text-center">
                <span className="text-sm font-bold text-red-500">Before SEO</span>
              </div>
              <div className="divide-y divide-slate-100 px-5">
                {beforeStats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="flex items-center gap-4 py-4">
                      <div className="w-9 h-9 min-w-9 rounded-full bg-red-50 flex items-center justify-center">
                        <Icon size={16} className="text-red-500" />
                      </div>
                      <div>
                        <p className="text-base sm:text-lg font-bold text-slate-900">
                          {stat.value}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-400 font-medium">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AFTER */}
            <div className="rounded-xl bg-white border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-l from-emerald-50 to-transparent px-5 py-3 text-center">
                <span className="text-sm font-bold text-emerald-500">
                  After SEO (6 Months)
                </span>
              </div>
              <div className="divide-y divide-slate-100 px-5">
                {afterStats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="flex items-center gap-4 py-4">
                      <div className="w-9 h-9 min-w-9 rounded-full bg-emerald-50 flex items-center justify-center">
                        <Icon size={16} className="text-emerald-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-base sm:text-lg font-bold text-slate-900">
                          {stat.value}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-400 font-medium">
                          {stat.label}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-500 text-xs sm:text-sm font-bold">
                        <ArrowUp size={14} />
                        {stat.change}
                      </div>
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