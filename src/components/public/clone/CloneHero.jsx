"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    "/images/logo/AnyTime Astro-logo.webp",
    "/images/logo/CoreValentLogo.png",
    "/images/logo/Bumpy_logo.webp",
    "/images/logo/potafologo.png",
    "/images/logo/LoveLocal-logo.webp",
    "/images/logo/practivoo.png"
  ];

  const sliderImages = data?.sliderImages && data.sliderImages.length > 0
    ? data.sliderImages
    : defaultSliderImages;

  const brands = data?.brands && data.brands.length > 0
    ? data.brands
    : defaultBrands;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3500);
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
    <section className="relative pt-16 lg:pt-24 pb-12 bg-slate-900 overflow-hidden flex flex-col items-center justify-center select-none ">
      {/* 1. Background Image - Matching Industries Hero */}
      {data?.image ? (
        <Image
          src={data.image}
          alt={data.title || "Clone Solution Background"}
          fill
          className="object-cover object-center z-0"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-slate-900 z-0"></div>
      )}

      {/* 2. Dark Overlay - Matching Industries Hero */}
      <div className="absolute inset-0 bg-black/70 z-[1]"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center">

        {/* Breadcrumb - Matching Industries Hero */}
        <nav className="flex items-center justify-center gap-2 text-xs md:text-sm text-slate-300 mb-6 font-medium">
          <Link href="/" className="hover:text-sky-400 transition-all">Home</Link>
          <span>›</span>
          <Link href="/solutions" className="hover:text-sky-400 transition-all">Solutions</Link>
          <span>›</span>
          <span className="text-sky-400 capitalize">{data?.title || "clone app development page"}</span>
        </nav>

        {/* Hero Title & Subtitle - Matching Industries Hero Style */}
        <div className="max-w-6xl mx-auto mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 drop-shadow-lg text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-white/80">
              {data?.title || "Clone App Development Company"}
            </span>
            {data?.gradientText && (
              <span className="ml-3 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-300">
                {data.gradientText}
              </span>
            )}
          </h1>
          <div
            className="text-sm md:text-base lg:text-lg text-sky-50 font-light max-w-3xl mx-auto drop-shadow-lg rich-text leading-relaxed opacity-90"
            dangerouslySetInnerHTML={{ __html: data?.subtitle || "Softkingo provides intuitive user interfaces and interactive user experiences for your project's dream architecture." }}
          />
        </div>

        {/* Action Button - Matching Industries Page Listing Button */}
        <div className="flex  sm:flex-row gap-5 mb-16">
          <Link href={data?.buttonHref || "/contact"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-4 py-2 md:px-10 md:py-3 rounded-full bg-[#1EAEDB] text-white font-bold text-xs tracking-wide shadow-[0_10px_30px_rgba(30,174,219,0.3)] transition-all"
            >
              {data?.buttonLabel || "Request A Quote"} <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
          <Link
            href="https://calendly.com/paramhans-softkingo/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 md:px-10 px-4 py-2 rounded-full font-bold hover:bg-white hover:text-slate-900 transition-all shadow-xl"
          >
            <Calendar className="w-5 h-5" /> Schedule Call
          </Link>
        </div>

        {/* 3D U-Shape Carousel (Draggable & Auto) */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={handleDragEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative h-[300px] md:h-[380px] w-full max-w-6xl mx-auto mb-16 flex items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing z-10"
        >
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <AnimatePresence mode='popLayout'>
              {sliderImages.map((src, i) => {
                let offset = i - index;
                if (offset > sliderImages.length / 2) offset -= sliderImages.length;
                if (offset < -sliderImages.length / 2) offset += sliderImages.length;

                const angle = Math.sign(offset) * (Math.abs(offset) === 1 ? 28 : 66);
                const absOffset = Math.abs(offset);

                const radiusX = 480;
                const radiusZ = 320;
                const x = Math.sin(angle * (Math.PI / 180)) * radiusX;
                const z = (Math.cos(angle * (Math.PI / 180)) - 1) * radiusZ;

                const y = - (absOffset * 22);
                const rotationY = -angle * 0.4;

                return (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{
                      x: x,
                      y: y,
                      z: z,
                      rotateY: rotationY,
                      scale: absOffset === 0 ? 1 : 0.9,
                      opacity: absOffset > 2 ? 0 : 1,
                      zIndex: 10 - absOffset,
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="absolute w-[160px] md:w-[190px] "
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
                    {absOffset > 0 && (
                      <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                        style={{ opacity: absOffset * 0.2 }}
                      ></div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Trusted By Brands section - Responsive & Overflow Safe */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden">
          <motion.div
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 shadow-xl flex flex-col md:flex-row items-center gap-6 md:gap-10 overflow-hidden w-full"
          >
            <div className="flex-shrink-0 px-4 md:border-r border-white/10 w-full md:w-auto text-center md:text-left">
              <h3 className="text-base md:text-xl font-bold text-white whitespace-nowrap">
                Trusted By Brands
              </h3>
            </div>

            <div className="flex-grow overflow-hidden relative w-full">
              <motion.div
                className="flex items-center gap-10 md:gap-16 min-w-max"
                animate={{
                  x: [0, -1000],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
              >
                {/* Double the items to create a seamless loop */}
                {[...brands, ...brands].map((src, it) => (
                  <div key={it} className="relative w-20 h-8 md:w-24 md:h-12 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity">
                    <Image
                      src={src || "/images/softkingo-logo.png"}
                      alt={`Brand ${it % brands.length}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </motion.div>
              {/* Edge Fades */}
              <div className="absolute inset-y-0 left-0 w-10 md:w-20 bg-gradient-to-r from-slate-900/0 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-10 md:w-20 bg-gradient-to-l from-slate-900/0 to-transparent z-10 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}