"use client";

import React, { useState } from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function CloneIndustries({ data, industries = [] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!industries || industries.length === 0) return null;

    const activeIndustry = industries[activeIndex] || industries[0];
    const content = activeIndustry.content || {};

    // Get custom image from data.items if available
    const customSelection = data?.items?.find(item => item.slug === activeIndustry.slug);
    const displayImage = customSelection?.image || content.hero?.image || '/images/placeholders/laptop-mockup.png';

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-8">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 text-center mb-12">
                        {data?.title || "Industries"}
                    </h2>
                </div>

                {/* Figma Accurate Tabs: Underlined style with gray baseline */}
                <div className="relative mb-20">
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-200"></div>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-12 relative overflow-x-auto no-scrollbar pb-0">
                        {industries.map((ind, i) => (
                            <button
                                key={ind.slug}
                                onClick={() => setActiveIndex(i)}
                                className={`
                                    relative py-4 px-2 text-sm md:text-lg font-bold transition-all duration-300 whitespace-nowrap
                                    ${activeIndex === i ? 'text-sky-500' : 'text-slate-400 hover:text-slate-600'}
                                `}
                            >
                                {ind.title}
                                {activeIndex === i && (
                                    <motion.div
                                        layoutId="activeTabUnderline"
                                        className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-sky-400 rounded-t-full z-10"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Combined Image (Canva Style) */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.5 }}
                                className="relative z-10"
                            >
                                <div className="relative group">
                                    <div className="rounded-3xl overflow-hidden relative">
                                        <img
                                            src={displayImage}
                                            alt={activeIndustry.title}
                                            className="w-full h-auto drop-shadow-xl"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right: Text Content */}
                    <div className="lg:pl-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-8"
                            >
                                <div className="space-y-4">
                                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                                        {activeIndustry.title}
                                    </h3>
                                    <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                                        {content.hero?.description || activeIndustry.excerpt || "We build affordable platforms tailored to your business. Our expert developers create secure, scalable solutions that elevate customer experience and boost growth."}
                                    </p>
                                </div>

                                {/* Feature Bullets: Pulling from content.challenges.items */}
                                <div className="space-y-4">
                                    {(content.challenges?.items || [
                                        { title: "Custom feature integration" },
                                        { title: "Scalable cloud architecture" },
                                        { title: "User-centric design focus" }
                                    ]).slice(0, 3).map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <Check size={20} className="text-slate-800" strokeWidth={3} />
                                            <span className="text-slate-800 font-bold text-sm md:text-base">
                                                {item.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Standard Site Button UI */}
                                <div className="pt-4">
                                    <Link
                                        href={`/industries/${activeIndustry.slug}`}
                                        className="inline-flex items-center gap-4 px-10 py-5 rounded-full font-black text-[14px] shadow-2xl transition-all hover:-translate-y-1 active:scale-95 cursor-pointer z-20 bg-gradient-to-r from-sky-600 via-sky-600 to-sky-400 text-white shadow-sky-400/30 group"
                                    >
                                        <span className="inline-block w-3 h-3 rounded-full bg-white animate-pulse" />
                                        <span>{activeIndustry.title} case studies</span>
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
