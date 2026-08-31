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
import { ChevronRight } from "lucide-react"; 
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

              {/* Post Image Container (5-Sec Slider + Zoom + Manual Nav) */}
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

                {/* Right-side scroll button */}
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // don't trigger the image modal
                      setCurrentImageIndex((prev) => (prev + 1) % images.length);
                    }}
                    aria-label="Next image"
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <ChevronRight size={18} />
                  </button>
                )}

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

            {/* RIGHT SIDE: Floating Platform Icons & Growth Card ... unchanged, keep as in your original file */}
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