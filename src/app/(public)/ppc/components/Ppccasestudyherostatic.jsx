"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ArrowDown,
  MousePointer,
  Users,
  DollarSign,
  BarChart3,
  Search,
  MonitorPlay,
  RefreshCw,
  Target,
  Calendar,
  Clock,
  Layers,
  ArrowRight,
} from "lucide-react";
import PopupQuoteModal from "@/components/PopupQuoteModal";

export default function PPCCaseStudyHero() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="relative bg-[#060913] text-slate-100 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-10 lg:pt-14 pb-20 lg:pb-24">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-slate-400 mb-6">
          <Link href="/" className="hover:text-sky-400 transition-colors">
            Home
          </Link>
          <span className="text-slate-600">›</span>
          <Link href="/our-work" className="hover:text-sky-400 transition-colors">
            Our Work
          </Link>
          <span className="text-slate-600">›</span>
          <Link href="/case-studies" className="hover:text-sky-400 transition-colors">
            Case Studies
          </Link>
          <span className="text-slate-600">›</span>
          <span className="text-white font-semibold">UrbanDrive – Car Rental</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-5 space-y-5 z-20">
            <span className="inline-flex w-fit items-center rounded-full bg-sky-500/10 border border-sky-500/30 px-4 py-1.5 text-[11px] font-bold tracking-wide text-sky-400">
              PPC CASE STUDY
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-[1.2]">
              How We Generated 4X More Leads with{" "}
              <span className="text-sky-400">Lower Cost</span> Using PPC
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-[1.8] max-w-xl">
              Explore how our data-driven PPC campaigns helped UrbanDrive, a
              car rental service, increase leads, reduce cost per lead and
              achieve exceptional ROI.
            </p>

            {/* Info items */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="rounded-2xl bg-[#0d1326] border border-slate-800/80 px-4 py-3 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-500/10 text-sky-400">
                  <Calendar size={16} />
                </span>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium leading-tight">
                    Industry
                  </p>
                  <p className="text-sm font-bold text-white leading-tight">
                    Automotive
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#0d1326] border border-slate-800/80 px-4 py-3 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-500/10 text-sky-400">
                  <Clock size={16} />
                </span>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium leading-tight">
                    Duration
                  </p>
                  <p className="text-sm font-bold text-white leading-tight">
                    3 Months
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#0d1326] border border-slate-800/80 px-4 py-3 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-500/10 text-sky-400">
                  <Layers size={16} />
                </span>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium leading-tight">
                    Services
                  </p>
                  <p className="text-sm font-bold text-white leading-tight">
                    PPC Advertising
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-row gap-4 pt-2">
              <button
                onClick={() => setShowModal(true)}
                className="w-fit px-5 md:px-7 py-3 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-0.5 shadow-lg shadow-sky-900/30 transition-all duration-300 items-center cursor-pointer inline-flex gap-2"
              >
                Let's Work Together <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN - Ad mock card */}
          <div className="lg:col-span-7 relative">
            <div className="rounded-3xl bg-white text-slate-900 shadow-2xl p-5 sm:p-6 max-w-xl ml-auto lg:mr-10">
              {/* Google Ads header */}
              <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 via-emerald-400 to-amber-400">
                  <TrendingUp size={16} className="text-white" />
                </span>
                <span className="font-semibold text-slate-800 text-sm sm:text-base">
                  Google Ads
                </span>
              </div>

              {/* Ad preview */}
              <div className="mt-4 rounded-xl border border-slate-100 p-4">
                <p className="text-[11px] text-slate-400 font-medium mb-1">Ad</p>
                <p className="text-sky-600 font-semibold text-sm sm:text-base leading-snug">
                  Book Self Drive Cars Online | UrbanDrive
                </p>
                <p className="text-emerald-700 text-xs font-medium mt-1">
                  urbandrive.com
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                  Wide Range of Cars. Best Prices. Easy Booking. 24/7 Support.
                </p>
                <button className="mt-4 px-4 py-2 rounded-md bg-blue-600 text-white text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors">
                  Book Now
                </button>
              </div>

              {/* Feature icon row */}
              <div className="mt-4 grid grid-cols-4 gap-2 pt-4 border-t border-slate-100">
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-sky-50 text-sky-500">
                    <Search size={16} />
                  </span>
                  <p className="text-[10px] text-slate-500 font-medium leading-tight">
                    Search Ads
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-sky-50 text-sky-500">
                    <MonitorPlay size={16} />
                  </span>
                  <p className="text-[10px] text-slate-500 font-medium leading-tight">
                    Display Ads
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-sky-50 text-sky-500">
                    <RefreshCw size={16} />
                  </span>
                  <p className="text-[10px] text-slate-500 font-medium leading-tight">
                    Remarketing
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-sky-50 text-sky-500">
                    <Target size={16} />
                  </span>
                  <p className="text-[10px] text-slate-500 font-medium leading-tight">
                    Conversion Tracking
                  </p>
                </div>
              </div>
            </div>

            {/* Floating mini stat cards */}
            <div className="hidden sm:flex flex-col gap-4 absolute -top-4 right-0 lg:right-4 z-30">
              {/* ROAS card */}
              <div className="rounded-2xl bg-white shadow-xl px-5 py-3 min-w-[150px]">
                <p className="text-[11px] text-slate-400 font-medium">ROAS</p>
                <div className="flex items-center justify-between gap-3 mt-1">
                  <p className="text-lg sm:text-xl font-extrabold text-emerald-600">
                    620%
                  </p>
                  <svg width="56" height="24" viewBox="0 0 56 24" fill="none">
                    <polyline
                      points="0,20 10,16 18,18 26,10 34,12 44,4 56,2"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Conversions card */}
              <div className="rounded-2xl bg-white shadow-xl px-5 py-3 min-w-[150px]">
                <p className="text-[11px] text-slate-400 font-medium">
                  Conversions
                </p>
                <div className="flex items-center justify-between gap-3 mt-1">
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900">
                    1,248
                  </p>
                  <div className="flex items-end gap-0.5 h-6">
                    {[4, 8, 6, 14, 18, 22].map((h, idx) => (
                      <span
                        key={idx}
                        style={{ height: `${h}px` }}
                        className="w-1 rounded-sm bg-emerald-500"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating stats card - overlaps hero bottom edge */}
      <div className="relative z-20 max-w-[1400px] mx-auto top-12 px-6 lg:px-12 -mt-8 sm:-mt-10">
        <div className="rounded-3xl bg-white shadow-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y sm:divide-y-0 divide-slate-100">
            <div className="flex flex-col items-center text-center gap-3 py-8 px-4">
              <TrendingUp size={30} strokeWidth={2.5} className="text-emerald-500" />
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                4X
              </p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Increase in Leads
              </p>
            </div>

            <div className="flex flex-col items-center text-center gap-3 py-8 px-4">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-500 text-white">
                <ArrowDown size={18} strokeWidth={2.5} />
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                52%
              </p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Decrease in CPL
              </p>
            </div>

            <div className="flex flex-col items-center text-center gap-3 py-8 px-4">
              <MousePointer size={28} strokeWidth={2.5} className="text-violet-500 fill-violet-500" />
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                68%
              </p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Increase in Clicks
              </p>
            </div>

            <div className="flex flex-col items-center text-center gap-3 py-8 px-4">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-500 text-white">
                <Users size={18} strokeWidth={2.5} />
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                1,248
              </p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Total Conversions
              </p>
            </div>

            <div className="flex flex-col items-center text-center gap-3 py-8 px-4">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500 text-white">
                <DollarSign size={18} strokeWidth={2.5} />
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                620%
              </p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                ROAS Achieved
              </p>
            </div>

            <div className="flex flex-col items-center text-center gap-3 py-8 px-4">
              <BarChart3 size={30} strokeWidth={2.5} className="text-sky-500" />
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                180%
              </p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Increase in Revenue
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer so the floating card doesn't overlap content below */}
      <div className="h-8 sm:h-10 bg-white" />

      <PopupQuoteModal open={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
}