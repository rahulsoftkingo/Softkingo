"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

export default function CloneHero({ data }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const defaultSliderImages = [
    "/images/portfolio/prectivoo.svg",
    "/images/portfolio/moblix.svg",
    "/images/portfolio/bumpy.svg",
    "/images/portfolio/ezydash.svg",
    "/images/portfolio/prectivoo.svg",
    "/images/portfolio/moblix.svg"
  ];

  const defaultBrands = [
    "/images/softkingo-logo.png",
    "/images/softkingo-logo.png",
    "/images/softkingo-logo.png",
    "/images/softkingo-logo.png",
    "/images/softkingo-logo.png",
    "/images/softkingo-logo.png"
  ];

  const sliderImages = data?.sliderImages && data.sliderImages.length > 0
    ? data.sliderImages
    : defaultSliderImages;

  const brands = data?.brands && data.brands.length > 0
    ? data.brands
    : defaultBrands;

  // Auto-slide effect with pause logic
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3500); // 3.5 seconds for smooth paced auto-slide
    return () => clearInterval(timer);
  }, [sliderImages.length, isPaused]);

  const handleDragEnd = (event, info) => {
    setIsPaused(false);
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    } else if (info.offset.x > swipeThreshold) {
      setIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    }
  };

  return (
    <section className="relative min-h-screen h-full py-4 md:py-6 bg-[#1A1A1A] overflow-hidden flex flex-col items-center justify-center select-none">
      {/* Background Banner Image with Overlap/Overlay */}
      {data?.image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={data.image}
            alt="Hero Background"
            fill
            className="object-cover opacity-30 mix-blend-overlay"
            priority
          />
        </div>
      )}
      {/* Background Subtle Gradient Top-Bottom overlay */}
      <div className={`absolute inset-0 pointer-events-none ${data?.image ? 'bg-gradient-to-b from-[#111111]/80 to-[#1A1A1A]/95' : 'bg-gradient-to-b from-[#111111] to-[#1A1A1A]'}`}></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Breadcrumbs: Home Page > [Slug] */}
        <nav className="flex items-center justify-center gap-2 text-[10px] md:text-xs text-sky-400 mb-4 font-medium">
          <Link href="/" className="hover:underline transition-all">Home</Link>
          <ChevronRight size={12} className="text-white/40" />
          <Link href="/solutions" className="hover:underline transition-all">Solutions</Link>
          <ChevronRight size={12} className="text-white/40" />
          <span className="text-white hover:text-sky-400 capitalize">{data?.title || "clone app development page"}</span>
        </nav>

        {/* Hero Title & Subtitle */}
        <div className="max-w-5xl mx-auto mb-4 animate-in fade-in slide-in-from-top duration-1000">
          <h1 className="text-3xl md:text-3xl lg:text-4xl font-black text-white mb-3 leading-normal tracking-tight">
            {data?.title || "Clone App Development Company"}
          </h1>
          <p className="text-slate-300 text-xs leading-relaxed max-w-3xl mx-auto font-normal opacity-90">
            {data?.subtitle || "Softkingo has the best Front end developers capable of providing the most intuitive user interfaces and interactive user experience for your project's dream architecture."}
          </p>
        </div>

        {/* Request A Quote Button */}
        <div className="flex justify-center mb-6 md:mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-2 md:px-10 md:py-3 rounded-full bg-[#1EAEDB] text-white font-bold text-xs tracking-wide shadow-[0_10px_30px_rgba(30,174,219,0.3)] transition-all"
          >
            Request A Quote
          </motion.button>
        </div>

        {/* 3D U-Shape Carousel (Draggable & Auto) */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={handleDragEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative h-[300px] md:h-[380px] w-full max-w-6xl mx-auto mb-8 md:mb-10 flex items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing"
        >
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <AnimatePresence mode='popLayout'>
              {sliderImages.map((src, i) => {
                let offset = i - index;
                if (offset > sliderImages.length / 2) offset -= sliderImages.length;
                if (offset < -sliderImages.length / 2) offset += sliderImages.length;

                // Refined U-shape arc: sides higher, center lower
                // Non-linear angle: Center->1st = 28deg, 1st->2nd = 38deg. Total 66deg.
                const angle = Math.sign(offset) * (Math.abs(offset) === 1 ? 28 : 66);
                const absOffset = Math.abs(offset);

                // Position Math
                const radiusX = 480; // Increased to spread screens wider
                const radiusZ = 320;
                const x = Math.sin(angle * (Math.PI / 180)) * radiusX;
                const z = (Math.cos(angle * (Math.PI / 180)) - 1) * radiusZ;

                const y = - (absOffset * 22); // Vertical offset
                const rotationY = -angle * 0.4; // Subtle rotate

                return (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{
                      x: x,
                      y: y,
                      z: z,
                      rotateY: rotationY,
                      scale: absOffset === 0 ? 1 : 0.9, // Slightly smaller side screens for hierarchy
                      opacity: absOffset > 2 ? 0 : 1,
                      zIndex: 10 - absOffset,
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="absolute w-[160px] md:w-[190px] rounded-sm  shadow-2xl bg-black group"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Image
                      src={src}
                      alt={`App Slide ${i + 1}`}
                      width={400}
                      height={800}
                      className="w-full h-auto max-h-[320px] md:max-h-[380px] object-contain rounded-sm"
                      draggable={false}
                    />
                    {/* Depth Shading */}
                    {absOffset > 0 && (
                      <div
                        className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-500"
                        style={{ opacity: absOffset * 0.2 }}
                      ></div>
                    )}
                    {/* Glass Shine */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Trusted By Brands section - White Round Banner */}
        <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
          <motion.div
            className="bg-white rounded-[0.5rem] md:rounded-[1rem] p-3 md:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-center gap-4 md:gap-10 relative overflow-hidden"
          >
            <div className="flex-shrink-0 px-4 md:border-r border-slate-200">
              <h3 className="text-lg md:text-xl font-bold text-sky-900 tracking-tighter">
                Trusted By Brands
              </h3>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 flex-grow">
              {brands.slice(0, 6).map((src, it) => (
                <div key={it} className="relative w-12 h-8 md:w-16 md:h-10 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
                  <Image
                    src={src || "/images/softkingo-logo.png"}
                    alt={`Brand ${it + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
