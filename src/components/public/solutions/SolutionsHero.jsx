"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Calendar, Rocket, Users, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import PopupQuoteModal from '@/components/PopupQuoteModal';

export default function SolutionsHero({ data2, data, endpoint }) {

  console.log("SolutionsHero data2:", data2);

  // 1. Initialize State
  const [imgSrc, setImgSrc] = useState(data?.image);
  const [showModal, setShowModal] = useState(false);

  // ✅ 2. FIX: Sync state when prop updates (Navigation/Refresh ke time)
  useEffect(() => {
    setImgSrc(data?.image);
  }, [data?.image]);

  if (!data) return null;

  // Stats cards data
  const stats = [
    {
      icon: <Rocket size={28} className="text-sky-500" />,
      value: data2.items?.[0]?.value,
      label: data2.items?.[0]?.label,
    },
    {
      icon: <Users size={28} className="text-sky-500" />,
      value: data2.items?.[1]?.value,
      label: data2.items?.[1]?.label,
    },
    {
      icon: <ShieldCheck size={28} className="text-sky-500" />,
      value: data2.items?.[2]?.value,
      label: data2.items?.[2]?.label,
    },
  ];

  return (
    <section className="relative max-w-7xl mx-auto overflow-hidden">

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-14 gap-8 sm:gap-12 items-center">

          {/* Left Side - Text Content */}
          <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 z-20">

            <nav className="flex items-center flex-wrap gap-2 text-xs md:text-sm text-slate-600 mb-4">
              <Link href="/" className="hover:text-sky-400 transition-colors">
                Home
              </Link>
              <span>›</span>
              <Link href="/solutions" className="hover:text-sky-400 transition-colors">
                Solutions
              </Link>
              <span>›</span>
              <span className="text-sky-400 font-medium break-all">{endpoint}</span>
            </nav>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sky-950 leading-tight lg:leading-[1.1] animate-fadeInUp delay-100">
              {data.title}
            </h1>

            <div
              className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed sm:leading-[1.8] max-w-xl animate-fadeInUp delay-200 rich-text"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />

            <div className="flex flex-col sm:flex-row gap-4 pt-2 animate-fadeInUp delay-300">
              <button
                onClick={() => setShowModal(true)}
                className="w-full sm:w-fit justify-center px-4 md:px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300 items-center cursor-pointer inline-flex gap-2"
              >
                Let's Work Together <ArrowRight size={18} />
              </button>

              <Link
                href="https://calendly.com/paramhans-softkingo/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-fit px-4 md:px-8 py-2.5 rounded-full bg-white text-[#28AFDF] border border-[#28AFDF] font-medium hover:bg-[#28AFDF]/10 transform hover:-translate-y-1 shadow-lg shadow-[#28AFDF]/30 transition-all duration-300 text-xs md:text-md inline-flex items-center justify-center gap-2"
              >
                <Calendar size={18} /> Schedule Meeting
              </Link>
            </div>

            {/* Stat Cards - Stacked on Mobile (1 col), Side-by-side on Laptop/Tablet (3 cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 pb-8 sm:pb-16 animate-fadeInUp delay-400">
              {stats.map((stat, index) => (
                <div key={index} className="relative group filter drop-shadow-md">

                  {/* SVG Clip Path Definition */}
                  <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
                    <defs>
                      <clipPath id={`card-clip-${index}`} clipPathUnits="objectBoundingBox">
                        {/* Custom path defining top-right cutout */}
                        <path d="M 0,0  
                      L 0.65,0  
                      A 0.08,0.08 0 0,1 0.73,0.08  
                      L 0.73,0.20  
                      A 0.08,0.08 0 0,0 0.81,0.28  
                      L 0.85,0.28  
                      A 0.15,0.15 0 0,1 1,0.43  
                      L 1,0.85  
                      A 0.15,0.15 0 0,1 0.85,1  
                      L 0.15,1  
                      A 0.15,0.15 0 0,1 0,0.85  
                      L 0,0 Z" />
                      </clipPath>
                    </defs>
                  </svg>

                  {/* Main White Card with Cutout */}
                  <div
                    className="bg-white p-5 pt-6 min-h-[120px] sm:min-h-[140px] flex flex-col justify-between"
                    style={{ clipPath: `url(#card-clip-${index})` }}
                  >
                    <div>
                      <p className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                        {stat.value}
                      </p>
                      <p className="text-xs md:text-sm font-medium text-slate-700 leading-snug mt-2 max-w-[85%]">
                        {stat.label}
                      </p>
                    </div>
                  </div>

                  {/* Icon positioned in the cut-out section */}
                  <div className="absolute top-[-5px] right-2 w-10 h-10 flex items-center justify-center text-sky-500">
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Side - Hero Image */}
          <div className="relative w-full lg:w-1/2 z-10 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg flex justify-center">
              {imgSrc ? (
                <Image
                  src={imgSrc}
                  alt={data.title || "Hero Image"}
                  width={800}
                  height={600}
                  className="w-full h-auto max-h-[350px] sm:max-h-[450px] lg:max-h-[550px] object-contain drop-shadow-2xl animate-float rounded-md"
                  priority
                  onError={() => setImgSrc("/images/placeholder.png")}
                />
              ) : (
                <div className="w-full h-48 sm:h-64 lg:h-full bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200">
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