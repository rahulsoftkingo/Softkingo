"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

export default function CloneHero({ data }) {
  const [index, setIndex] = useState(0);

  const defaultImages = [
    "/images/solutions/clone-preview.jpg",
    "/images/solutions/clone-preview.jpg",
    "/images/solutions/clone-preview.jpg",
    "/images/solutions/clone-preview.jpg",
    "/images/solutions/clone-preview.jpg",
    "/images/solutions/clone-preview.jpg"
  ];

  const sliderImages = data?.sliderImages && data.sliderImages.length >= 3
    ? data.sliderImages
    : defaultImages;

  // Auto-slide (disabled when active dragging is handled by user, but let's keep it subtle)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    } else if (info.offset.x > swipeThreshold) {
      setIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    }
  };

  return (
    <section className="relative min-h-screen pt-24 pb-20 bg-[#111111] overflow-hidden flex flex-col items-center select-none">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
        {/* Breadcrumbs: Home > Solutions > [Slug] */}
        <nav className="flex items-center justify-center gap-2 text-[10px] md:text-xs text-slate-500 mb-10 tracking-[0.2em] uppercase font-bold">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} className="text-slate-700" />
          <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
          <ChevronRight size={12} className="text-slate-700" />
          <span className="text-sky-400">{data?.title || "Page"}</span>
        </nav>

        {/* Title & Subtitle */}
        <div className="max-w-4xl mx-auto mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] uppercase tracking-tighter"
          >
            {data?.title || "Clone App Development Company"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-medium"
          >
            {data?.subtitle || "Softkingo provides the most intuitive user interfaces and interactive user experience for your clone app project architecture."}
          </motion.p>
        </div>

        {/* CTA Section */}
        <div className="flex justify-center mb-24">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 rounded-xl bg-sky-500 text-white font-black text-xs hover:bg-sky-400 transform transition-all shadow-2xl shadow-sky-500/25 uppercase tracking-[0.2em]"
          >
            Request A Quote
          </motion.button>
        </div>

        {/* 3D C-Shape Carousel (Draggable) */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          className="relative h-[450px] w-full max-w-5xl mx-auto mb-32 flex items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing"
        >
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <AnimatePresence mode='popLayout'>
              {sliderImages.map((src, i) => {
                let offset = i - index;
                if (offset > sliderImages.length / 2) offset -= sliderImages.length;
                if (offset < -sliderImages.length / 2) offset += sliderImages.length;

                // 225-degree arc math for up to 6 slides
                const angle = offset * 45;
                const isCenter = offset === 0;
                const absOffset = Math.abs(offset);

                const radius = 350; // slightly tighter radius
                const x = Math.sin(angle * (Math.PI / 180)) * radius;
                const z = (Math.cos(angle * (Math.PI / 180)) - 1) * radius;
                const rotationY = -angle;

                return (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{
                      x: x,
                      z: z,
                      rotateY: rotationY,
                      scale: isCenter ? 1.05 : 0.8 - (absOffset * 0.08),
                      opacity: absOffset > 3 ? 0 : 1 - (absOffset * 0.25),
                      zIndex: 10 - absOffset,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="absolute w-[200px] md:w-[220px] aspect-[9/18.5] rounded-[2.2rem] overflow-hidden border-[6px] border-[#222] shadow-2xl bg-black group"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Image
                      src={src}
                      alt={`App Slide ${i + 1}`}
                      fill
                      className="object-cover transition-opacity duration-700"
                      style={{ opacity: isCenter ? 1 : 0.5 }}
                      draggable={false}
                    />
                    {/* Depth Gradient */}
                    {!isCenter && (
                      <div className="absolute inset-0 bg-black/50 pointer-events-none transition-opacity duration-700"></div>
                    )}
                    {/* Glass Shine */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Hint Overlay (optional) */}
          <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em] opacity-50">
            Swipe to explore
          </div>
        </motion.div>

        {/* Trusted By Brands section */}
        {data?.brands && data.brands.length > 0 && (
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-3xl flex flex-col md:flex-row items-center gap-10 md:gap-14 relative overflow-hidden group border border-slate-100"
            >
              <div className="flex-shrink-0 relative z-10">
                <h3 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-3 whitespace-nowrap tracking-tighter">
                  TRUSTED BY BRANDS <ChevronRight className="text-sky-500" strokeWidth={4} size={20} />
                </h3>
              </div>

              <div className="hidden md:block w-px h-16 bg-slate-100"></div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-10 md:gap-14 flex-grow relative z-10">
                {data.brands.map((brand, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.15, y: -5 }}
                    className="relative w-36 h-10 flex items-center justify-center"
                  >
                    <Image
                      src={brand}
                      alt={`Partner ${i + 1}`}
                      fill
                      className="object-contain"
                      draggable={false}
                    />
                  </motion.div>
                ))}
              </div>

              <div className="absolute -top-32 -right-32 w-80 h-80 bg-sky-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none"></div>
            </motion.div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .perspective-1200 {
          perspective: 1200px;
        }
      `}</style>
    </section>
  );
}
