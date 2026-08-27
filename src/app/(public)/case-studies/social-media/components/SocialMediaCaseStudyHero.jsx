"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Eye,
  UserPlus,
  Send,
  BarChart3,
  DollarSign,
  Calendar,
  Clock,
  Layers,
  ArrowRight,
  Heart,
  MessageCircle,
  Bookmark,
  TrendingUp,
  X,
} from "lucide-react";
import PopupQuoteModal from "@/components/PopupQuoteModal";

export default function SocialMediaCaseStudyHero({ heroJson }) {
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  // Slide State & Auto Play Control
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const data = heroJson || {};

  // Extract images array (fallback to postImage or default path)
  const images = data.socialPreview?.postImages?.length
    ? data.socialPreview.postImages
    : [data.socialPreview?.postImage || "/fitlife-post.jpg"];

  // 5-Second Auto Change Interval Logic
  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  // Dynamic icon mapping
  const iconMap = {
    Users,
    Eye,
    UserPlus,
    Send,
    BarChart3,
    DollarSign,
    Heart,
    Calendar,
    Clock,
    Layers,
  };

  return (
    <section className="relative bg-[#08031a] text-slate-100 mb-16 sm:mb-20">
      {/* Hero Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-6 lg:pt-10 pb-20 lg:pb-24">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-slate-400 mb-4">
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
          <span className="text-white font-semibold">
            {data.socialPreview?.platformHandle || "Case Study"}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-6 space-y-4 z-20">
            <span className="inline-flex w-fit items-center rounded-full bg-sky-600/20 border border-sky-500/30 px-3.5 py-1 text-[11px] font-bold tracking-wide text-sky-300">
              {data.badge}
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-bold text-white leading-[1.2]">
              {data.headline?.split(data.highlight || "")[0]}
              {data.highlight && (
                <span className="text-sky-400">{data.highlight}</span>
              )}
              {data.headline?.split(data.highlight || "")[1]}
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-[1.6] max-w-xl">
              {data.description}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <div className="rounded-xl bg-[#120a2e] border border-sky-900/40 px-3.5 py-2.5 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-500/10 text-sky-400">
                  <Calendar size={15} />
                </span>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium leading-tight">Industry</p>
                  <p className="text-xs font-bold text-white leading-tight">{data.industry}</p>
                </div>
              </div>

              <div className="rounded-xl bg-[#120a2e] border border-sky-900/40 px-3.5 py-2.5 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-500/10 text-sky-400">
                  <Clock size={15} />
                </span>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium leading-tight">Duration</p>
                  <p className="text-xs font-bold text-white leading-tight">{data.duration}</p>
                </div>
              </div>

              <div className="rounded-xl bg-[#120a2e] border border-sky-900/40 px-3.5 py-2.5 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-500/10 text-sky-400">
                  <Layers size={15} />
                </span>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium leading-tight">Services</p>
                  <p className="text-xs font-bold text-white leading-tight">{data.services}</p>
                </div>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={() => setShowModal(true)}
                className="w-fit px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:opacity-90 transform hover:-translate-y-0.5 shadow-lg shadow-sky-900/40 transition-all duration-300 items-center cursor-pointer inline-flex gap-2"
              >
                Let's Work Together
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          {/* RIGHT COLUMN */}
          <div className="lg:col-span-6 relative flex flex-col md:flex-row justify-center lg:justify-end items-center gap-6 z-20">

            {/* Main Social Post Card */}
            <div className="rounded-[28px] bg-white text-slate-900 shadow-2xl p-3 w-full max-w-[320px] sm:max-w-xs z-20 border border-slate-200">
              {/* Post Header */}
              <div className="flex items-center justify-between pb-2 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-bold text-[9px]">
                    fit.
                  </div>
                  <span className="font-semibold text-slate-900 text-xs">
                    {data.socialPreview?.platformHandle}
                  </span>
                </div>
                <span className="text-slate-400 text-xs font-bold">•••</span>
              </div>

              {/* Post Image Container (5-Sec Slider + Zoom) */}
              <div
                onClick={() => setShowImageModal(true)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 cursor-pointer group"
              >
                <Image
                  key={images[currentImageIndex]}
                  src={images[currentImageIndex]}
                  alt={data.socialPreview?.platformHandle || "Social media post"}
                  fill
                  className="object-cover transition-opacity duration-700 ease-in-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white p-3 text-center transition-colors duration-300 group-hover:bg-black/30 pointer-events-none">
                  <h3 className="font-black text-lg tracking-wider uppercase drop-shadow-md">
                    {data.socialPreview?.caption}
                  </h3>
                </div>

                {/* Slider Indicator Dots */}
                {images.length > 1 && (
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                    {images.map((_, idx) => (
                      <span
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex
                          ? "w-4 bg-white"
                          : "w-1.5 bg-white/50"
                          }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-2.5 px-1">
                <div className="flex items-center gap-2.5 text-slate-800">
                  <Heart size={18} className="text-red-500 fill-red-500" />
                  <MessageCircle size={18} />
                  <Send size={18} />
                </div>
                <Bookmark size={18} className="text-slate-800" />
              </div>

              {/* Likes */}
              <div className="pt-1.5 px-1">
                <p className="text-[11px] font-bold text-slate-900">
                  {data.socialPreview?.likes} likes
                </p>
              </div>
            </div>

            {/* RIGHT SIDE: Floating Platform Icons & Growth Card */}
            <div className="flex flex-col gap-6 items-center lg:items-start z-30">

              {/* Floating Social Icons (Instagram, Facebook, TikTok) */}
              <div className="flex items-center gap-3 py-4">
                {/* 1. Instagram (Top) */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px] shadow-lg shadow-sky-500/20 hover:scale-110 -translate-y-4 transition-all duration-300">
                  <div className="w-full h-full bg-[#08031a] rounded-full flex items-center justify-center text-white">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                </div>

                {/* 2. Facebook (Middle) */}
                <div className="w-12 h-12 rounded-full bg-blue-600 p-[2px] shadow-lg shadow-blue-500/30 hover:scale-110 translate-y-0 transition-all duration-300 flex items-center justify-center text-white">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>

                {/* 3. TikTok (Bottom) */}
                <div className="w-12 h-12 rounded-full bg-black border border-sky-500/40 p-[2px] shadow-lg shadow-sky-500/20 hover:scale-110 translate-y-4 transition-all duration-300 flex items-center justify-center text-white">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.07-1.3 1.8-.24.84-.04 1.77.47 2.44.57.78 1.54 1.23 2.5 1.2 1.03-.01 2.01-.52 2.58-1.37.47-.7.66-1.57.65-2.43.01-4.83.01-9.66.01-14.49z" />
                  </svg>
                </div>
              </div>

              {/* Brand Growth Glass Card */}
              <div className="rounded-2xl bg-[#0f0a28]/80 backdrop-blur-md border border-sky-500/30 p-5 shadow-2xl min-w-[200px]">
                <p className="text-xs text-sky-300 font-medium">
                  {data.brandGrowthStat?.label || "Brand Growth"}
                </p>

                <p className="text-3xl font-black text-sky-400 mt-1">
                  {data.brandGrowthStat?.value || "300%"}
                </p>

                <p className="text-xs text-slate-400 font-medium mt-1">
                  {data.brandGrowthStat?.subLabel || "Engagement Increase"}
                </p>

                <div className="flex justify-end mt-2 text-sky-400">
                  <TrendingUp size={24} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Stats Bar */}
      <div className="absolute left-0 right-0 bottom-0 translate-y-1/2 z-30 px-6 lg:px-12 top-[526px]">
        <div className="max-w-[1400px] mx-auto">
          <div className="rounded-2xl sm:rounded-3xl bg-white shadow-2xl border border-slate-100">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y sm:divide-y-0 divide-slate-100">
              {data.statsBar?.map((stat, index) => {
                const IconComponent = iconMap[stat.icon?.trim()];
                return (
                  <div
                    key={`${stat.label}-${index}`}
                    className="flex flex-col items-center text-center gap-2 py-7 px-3"
                  >
                    {IconComponent ? (
                      <IconComponent
                        size={24}
                        strokeWidth={2.5}
                        className="text-sky-600"
                      />
                    ) : (
                      <BarChart3
                        size={24}
                        strokeWidth={2.5}
                        className="text-sky-600"
                      />
                    )}
                    <p className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {stat.value}
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <PopupQuoteModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />

      {/* Fullscreen Image Pop-up Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm"
          onClick={() => setShowImageModal(false)}
        >
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 text-white/70 hover:text-white transition-colors z-[110] bg-black/20 hover:bg-black/50 rounded-full"
          >
            <X size={28} />
          </button>

          <div
            className="relative w-full max-w-4xl h-[70vh] sm:h-[85vh] rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentImageIndex]}
              alt="Expanded post image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}