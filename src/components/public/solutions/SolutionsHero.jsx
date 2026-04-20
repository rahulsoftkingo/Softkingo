"use client";
import React, { useState, useEffect } from 'react'; // ✅ useEffect add kiya
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import PopupQuoteModal from '@/components/PopupQuoteModal';

export default function SolutionsHero({ data }) {
  // 1. Initialize State
  const [imgSrc, setImgSrc] = useState(data?.image);
  const [showModal, setShowModal] = useState(false);

  // ✅ 2. FIX: Sync state when prop updates (Navigation/Refresh ke time)
  useEffect(() => {
    setImgSrc(data?.image);
  }, [data?.image]);

  if (!data) return null;

  return (
    <section className="relative max-w-7xl mx-auto overflow-hidden">

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row px-6 lg:px-8 py-8 lg:py-14 gap-12 items-center">

          {/* Left Side - Text Content */}
          <div className="w-full lg:w-1/2 space-y-8 z-20">

            <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-600 mb-4">
              <Link href="/" className="hover:text-sky-400 transition-colors">
                Home
              </Link>
              <span>›</span>
              <Link href="/solutions" className="hover:text-sky-400 transition-colors">
                Solutions
              </Link>
              <span>›</span>
              <span className="text-sky-400 font-medium">{data.title}</span>
            </nav>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sky-950 leading-[1.1] animate-fadeInUp delay-100">
              {data.title}
            </h1>

            <div
              className="text-xs sm:text-sm md:text-base text-slate-600 leading-[1.8] max-w-xl animate-fadeInUp delay-200 rich-text"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />

            <div className="flex  sm:flex-row gap-4 pt-2 animate-fadeInUp delay-300 pb-20">
              <button
                onClick={() => setShowModal(true)}
                // href="/contact"
                className="w-fit px-4 md:px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300 items-center cursor-pointer inline-flex gap-2">
                Let's Work Together <ArrowRight size={18} />
              </button>
              <Link href="https://calendly.com/paramhans-softkingo/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 md:px-8 py-2.5 rounded-full bg-white text-[#28AFDF] border border-[#28AFDF] font-medium hover:bg-[#28AFDF]/10 transform hover:-translate-y-1 shadow-lg shadow-[#28AFDF]/30 transition-all duration-300 text-xs md:text-md inline-flex items-center justify-center gap-2">
                <Calendar size={18} /> Schedule Meeting
              </Link>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div className="relative w-full lg:w-1/2 z-10 flex justify-center lg:justify-end">
            {/* Aspect Ratio Fix */}
            <div className="relative w-full max-w-lg flex justify-center">
              {/* Check if imgSrc exists, otherwise show placeholder div */}
              {imgSrc ? (
                <Image
                  src={imgSrc}
                  alt={data.title || "Hero Image"}
                  width={800}
                  height={600}
                  className="w-full h-auto max-h-[550px] object-contain drop-shadow-2xl animate-float rounded-md"
                  priority
                  // Agar image load fail ho jaye to placeholder lagayein
                  onError={() => setImgSrc("/images/placeholder.png")}
                />
              ) : (
                // Fallback agar DB me image empty hai
                <div className="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200">
                  <div className="text-center">
                    <p className="font-bold">No Image Uploaded</p>
                    <p className="text-xs">Add image from Admin Panel</p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      <PopupQuoteModal open={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
}