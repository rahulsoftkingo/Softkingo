"use client";

import React, { useState } from "react";
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
  X, // Added X for the modal close button
} from "lucide-react";
import PopupQuoteModal from "@/components/PopupQuoteModal";

export default function SocialMediaCaseStudyHero({ heroJson }) {
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false); // State for the image modal

  const data = heroJson || {};

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
          <Link href="/" className="hover:text-purple-400 transition-colors">
            Home
          </Link>

          <span className="text-slate-600">›</span>

          <Link
            href="/our-work"
            className="hover:text-purple-400 transition-colors"
          >
            Our Work
          </Link>

          <span className="text-slate-600">›</span>

          <Link
            href="/case-studies"
            className="hover:text-purple-400 transition-colors"
          >
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
            {/* Badge */}
            <span className="inline-flex w-fit items-center rounded-full bg-purple-600/20 border border-purple-500/30 px-3.5 py-1 text-[11px] font-bold tracking-wide text-purple-300">
              {data.badge}
            </span>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-bold text-white leading-[1.2]">
              {data.headline?.split(data.highlight || "")[0]}

              {data.highlight && (
                <span className="text-purple-400">{data.highlight}</span>
              )}

              {data.headline?.split(data.highlight || "")[1]}
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-[1.6] max-w-xl">
              {data.description}
            </p>

            {/* Info items */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {/* Industry */}
              <div className="rounded-xl bg-[#120a2e] border border-purple-900/40 px-3.5 py-2.5 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/10 text-purple-400">
                  <Calendar size={15} />
                </span>

                <div>
                  <p className="text-[10px] text-slate-400 font-medium leading-tight">
                    Industry
                  </p>

                  <p className="text-xs font-bold text-white leading-tight">
                    {data.industry}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="rounded-xl bg-[#120a2e] border border-purple-900/40 px-3.5 py-2.5 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/10 text-purple-400">
                  <Clock size={15} />
                </span>

                <div>
                  <p className="text-[10px] text-slate-400 font-medium leading-tight">
                    Duration
                  </p>

                  <p className="text-xs font-bold text-white leading-tight">
                    {data.duration}
                  </p>
                </div>
              </div>

              {/* Services */}
              <div className="rounded-xl bg-[#120a2e] border border-purple-900/40 px-3.5 py-2.5 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/10 text-purple-400">
                  <Layers size={15} />
                </span>

                <div>
                  <p className="text-[10px] text-slate-400 font-medium leading-tight">
                    Services
                  </p>

                  <p className="text-xs font-bold text-white leading-tight">
                    {data.services}
                  </p>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="pt-1">
              <button
                onClick={() => setShowModal(true)}
                className="w-fit px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-500 text-white text-xs md:text-sm font-medium hover:opacity-90 transform hover:-translate-y-0.5 shadow-lg shadow-purple-900/40 transition-all duration-300 items-center cursor-pointer inline-flex gap-2"
              >
                Let's Work Together
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center z-20">
            {/* Dynamic Platform Icons */}
            <div className="absolute top-1 right-4 sm:right-8 z-30 flex gap-2">
              {data.platformIcons?.slice(0, 3).map((platform, index) => {
                const IconComponent = iconMap[platform.icon];

                return (
                  <div
                    key={`${platform.name}-${index}`}
                    title={platform.name}
                    className="w-9 h-9 rounded-full bg-white/10 border border-white/10 shadow-lg flex items-center justify-center text-white"
                  >
                    {IconComponent ? (
                      <IconComponent size={17} />
                    ) : (
                      <span className="text-[9px] font-bold">
                        {platform.name?.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Main Social Post */}
            <div className="rounded-2xl bg-white text-slate-900 shadow-2xl p-3 w-full max-w-[320px] sm:max-w-xs z-20">
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

              {/* Post Image (Now Clickable) */}
              <div
                onClick={() => setShowImageModal(true)}
                className="relative aspect-square rounded-xl overflow-hidden bg-slate-900 cursor-pointer group"
              >
                <Image
                  src={data.socialPreview?.postImage || "/fitlife-post.jpg"}
                  alt={data.socialPreview?.platformHandle || "Social media post"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white p-3 text-center transition-colors duration-300 group-hover:bg-black/30">
                  <h3 className="font-black text-lg tracking-wider uppercase drop-shadow-md">
                    {data.socialPreview?.caption}
                  </h3>
                </div>
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

            {/* Brand Growth */}
            <div className="absolute bottom-2 -right-2 sm:right-0 z-30 rounded-xl bg-[#140b36]/90 backdrop-blur-md border border-purple-500/30 p-3 shadow-2xl min-w-[160px]">
              <p className="text-[10px] text-purple-300 font-medium">
                {data.brandGrowthStat?.label}
              </p>

              <p className="text-xl font-black text-purple-400 mt-0.5">
                {data.brandGrowthStat?.value}
              </p>

              <p className="text-[9px] text-slate-400 font-medium">
                {data.brandGrowthStat?.subLabel}
              </p>

              <div className="absolute right-3 bottom-3 text-emerald-400">
                <TrendingUp size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Stats */}
      <div className="absolute left-0 right-0 bottom-0 translate-y-1/2 z-30 px-6 lg:px-12 top-[526px]">
        <div className="max-w-[1400px] mx-auto">
          <div className="rounded-2xl sm:rounded-3xl bg-white shadow-2xl border border-slate-100">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y sm:divide-y-0 divide-slate-100">
              {data.statsBar?.map((stat, index) => {
                const IconComponent = iconMap[stat.icon?.trim()];

                return (
                  <div
                    key={`${stat.label}-${index}`}
                    className="flex flex-col items-center text-center gap-2 py-5 px-3"
                  >
                    {IconComponent ? (
                      <IconComponent
                        size={24}
                        strokeWidth={2.5}
                        className="text-purple-600"
                      />
                    ) : (
                      <BarChart3
                        size={24}
                        strokeWidth={2.5}
                        className="text-purple-600"
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

      {/* NEW: Fullscreen Image Pop-up Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm"
          onClick={() => setShowImageModal(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 text-white/70 hover:text-white transition-colors z-[110] bg-black/20 hover:bg-black/50 rounded-full"
          >
            <X size={28} />
          </button>

          {/* Modal Image Container */}
          <div
            className="relative w-full max-w-4xl h-[70vh] sm:h-[85vh] rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          >
            <Image
              src={data.socialPreview?.postImage || "/fitlife-post.jpg"}
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