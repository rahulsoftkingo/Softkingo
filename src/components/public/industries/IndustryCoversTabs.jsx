"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, ChevronRight, CheckCircle2 } from "lucide-react";
import CommonTitle from "@/components/ui/CommonTitle";

/* ==========================================================================
   1. HERO COMPONENT (IndustriesHero)
   ========================================================================== */
export function IndustriesHero({ data }) {
  const [showModal, setShowModal] = useState(false);

  if (!data) return null;

  const { title, description, image } = data;
  const bgImage = image || "/images/industries/industries-bg.png";

  return (
    <section className="relative w-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center overflow-hidden py-12 sm:py-16 md:py-20">
      {/* 1. Background Image */}
      {image ? (
        <Image
          src={bgImage}
          alt={title || "Industry Background"}
          fill
          className="object-cover object-center z-0"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-slate-900 z-0"></div>
      )}

      {/* 2. Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* 3. Centered Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center text-white w-full">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs md:text-sm text-slate-300 mb-4">
          <Link href="/" className="hover:text-sky-400 transition-colors">
            Home
          </Link>
          <span>›</span>
          <Link href="/industries" className="hover:text-sky-400 transition-colors">
            Industries
          </Link>
          <span>›</span>
          <span className="text-sky-400 font-medium">{title}</span>
        </nav>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-white/80">
            {title}
          </span>
          {data.gradientText && (
            <span className="block sm:inline sm:ml-3 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-300">
              {data.gradientText}
            </span>
          )}
        </h1>

        {/* Description */}
        {description && (
          <div
            className="text-sm sm:text-base md:text-lg text-sky-50 font-light max-w-2xl mx-auto drop-shadow-lg rich-text"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 animate-fadeInUp delay-300 w-full sm:w-auto items-center justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto justify-center px-6 py-3 md:py-2.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300 items-center cursor-pointer inline-flex gap-2"
          >
            Let's Work Together <ArrowRight size={18} />
          </button>
          <Link
            href="https://calendly.com/paramhans-softkingo/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto justify-center px-6 md:px-8 py-3 md:py-2.5 rounded-full bg-white text-[#28AFDF] border border-[#28AFDF] font-medium hover:bg-[#28AFDF]/10 transform hover:-translate-y-1 shadow-lg shadow-[#28AFDF]/30 transition-all duration-300 text-xs md:text-md inline-flex items-center gap-2"
          >
            <Calendar size={18} /> Schedule Meeting
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   2. TABS COMPONENT (IndustryCoversTabs)
   ========================================================================== */
export function IndustryCoversTabs({ data }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!data || !data.items) return null;

  const activeItem = data.items[activeTab];

  return (
    <section className="py-8 md:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center mb-8 md:mb-16">
          <CommonTitle
            title={data.title || "What We Cover"}
            subtitle={data.subtitle || "Explore our comprehensive services tailored for the industry."}
            pill={true}
            gradientText={data.gradientText || "Coverage"}
          />
        </div>

        <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden min-h-0 lg:min-h-[500px] border border-slate-100 shadow-2xl">
          {/* LEFT SIDE: TABS (Sky Background) */}
          <div className="w-full lg:min-w-[40%] lg:w-fit bg-sky-500 p-4 sm:p-6 lg:p-8 flex flex-col">
            <div className="flex flex-row lg:flex-col gap-2 sm:gap-4 overflow-x-auto lg:overflow-y-auto flex-1 max-h-none lg:max-h-[500px] pb-2 lg:pb-0 scrollbar-none">
              {data.items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  onMouseEnter={() => setActiveTab(index)}
                  className={`text-left px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 flex items-center justify-between whitespace-nowrap lg:whitespace-normal shrink-0 lg:shrink group w-auto lg:w-full ${
                    activeTab === index
                      ? "bg-white text-sky-700 shadow-lg translate-x-0 lg:translate-x-2"
                      : "hover:bg-sky-500/50 text-sky-50 border border-transparent hover:border-sky-400"
                  }`}
                >
                  <span className="font-bold text-sm sm:text-base md:text-lg mr-2 lg:mr-0">
                    {item.title}
                  </span>
                  {activeTab === index && (
                    <ChevronRight
                      size={20}
                      className="hidden lg:block animate-in fade-in slide-in-from-left-2"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: CONTENT (White Background) */}
          <div className="w-full lg:w-[65%] bg-white p-5 sm:p-8 md:p-12 flex flex-col justify-center relative my-0 lg:my-8">
            {/* Decorative Background Pattern */}
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-sky-50 rounded-bl-full -z-0 opacity-50 pointer-events-none"></div>

            {/* Content Animation Wrapper */}
            <div
              key={activeTab}
              className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <div className="flex items-start justify-between gap-4 sm:gap-6 mb-6 md:mb-8">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                    {activeItem.title}
                  </h3>
                  <div className="h-1 w-16 sm:w-20 bg-sky-500 rounded-full"></div>
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center flex-shrink-0 text-sky-500">
                  {activeItem.icon && activeItem.icon.includes("/") ? (
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                      <Image
                        src={activeItem.icon}
                        alt="icon"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
                  )}
                </div>
              </div>

              <div className="prose prose-sm sm:prose-base md:prose-lg text-slate-600 leading-relaxed">
                <p
                  className="rich-text"
                  dangerouslySetInnerHTML={{ __html: activeItem.description }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IndustryCoversTabs;