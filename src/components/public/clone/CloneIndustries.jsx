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

    // Default Images mapping from public/images/industries/clone
    const defaultIndustryImages = {
        'healthcare': '/images/industries/clone/healthcare.png',
        'blockchain': '/images/industries/clone/blockchain.png',
        'iot-solutions': '/images/industries/clone/iot-solutions.png',
        'ott-solution': '/images/industries/clone/ott-solution.png',
        'fitness': '/images/industries/clone/fitness.png',
        'real-estate': '/images/industries/clone/real-estate.png',
        'enterprise': '/images/industries/clone/enterprise.png',
        'education': '/images/industries/clone/education.png',
        'logistics': '/images/industries/clone/logistics.png',
        'ecommerce': '/images/industries/clone/ecommerce.png',
        'fintech': '/images/industries/clone/fintech.png',
    };

    // Get custom image from data.items or fallback to industry mapping
    const customSelection = data?.items?.find(item => item.slug === activeIndustry.slug);
    const displayImage = customSelection?.image || content.hero?.image || defaultIndustryImages[activeIndustry.slug] || '/images/industries/clone/149.png';

    return (
        <section className="py-20 bg-[#EFF9FF] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-8">
                    <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] text-center mb-12 tracking-tight">
                        {data?.title || "Industries"}
                    </h2>
                </div>

                {/* Tabs: Separated Underlined style per Figure */}
                <div className="relative mb-16 flex justify-center">
                    <div className="flex flex-wrap justify-center gap-2 md:gap-8 overflow-x-auto no-scrollbar pb-4 relative z-10 w-full px-4">
                        {industries.map((ind, i) => (
                            <button
                                key={ind.slug}
                                onClick={() => setActiveIndex(i)}
                                className={`
                                    relative py-3 px-4 text-sm md:text-xl font-bold transition-all duration-300 whitespace-nowrap flex flex-col items-center group
                                    ${activeIndex === i ? 'text-[#1EAEDB]' : 'text-slate-400 hover:text-slate-600'}
                                `}
                            >
                                <span className="mb-2">{ind.title}</span>

                                {/* Individual Underline Segment */}
                                <div
                                    className={`h-[2px] w-full transition-colors duration-300 ${activeIndex === i ? 'bg-[#1EAEDB]' : 'bg-slate-300'}`}
                                />

                                {/* Active Pointer Triangle */}
                                {activeIndex === i && (
                                    <div className="absolute bottom-[-1px] left-1/2 -translate-x-1/2">
                                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1EAEDB]"></div>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Device Mockups */}
                    <div className="relative flex justify-center lg:justify-start">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="relative w-full"
                            >
                                <img
                                    src={displayImage}
                                    alt={activeIndustry.title}
                                    className="w-full h-auto object-contain"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right: Text Content */}
                    <div className="lg:pl-6 text-left">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-8"
                            >
                                <div className="space-y-6">
                                    <h3 className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tight">
                                        {activeIndustry.title}
                                    </h3>
                                    <p className="text-[#333] text-sm md:text-lg leading-relaxed font-medium max-w-xl opacity-90">
                                        {content.hero?.description || activeIndustry.excerpt || "We build affordable platforms tailored to your business. Our expert developers create secure, scalable solutions that elevate patient care, streamline workflows, and boost growth."}
                                    </p>
                                </div>

                                {/* Feature Bullets */}
                                <div className="space-y-4 pt-2">
                                    {(content.challenges?.items || [
                                        { title: "First product search tools" },
                                        { title: "Secure checkout flow setup" },
                                        { title: "Personalized buyer experience path" }
                                    ]).slice(0, 3).map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <Check size={20} className="text-[#1A1A1A]" strokeWidth={2.5} />
                                            <span className="text-[#1A1A1A] font-bold text-sm md:text-lg">
                                                {item.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Custom CTA Button */}
                                <div className="pt-4">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-block"
                                    >
                                        <Link
                                            href={`/industries/${activeIndustry.slug}`}
                                            className="px-10 py-4 rounded-full bg-[#1EAEDB] text-white font-bold text-base md:text-lg transition-all shadow-[0_10px_20px_rgba(30,174,219,0.3)] capitalize"
                                        >
                                            {activeIndustry.title} case studies
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
            {/* Custom Background Circle for texture if needed */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-sky-100 rounded-full opacity-30 blur-[100px] pointer-events-none"></div>

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
