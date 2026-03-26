"use client";

import React, { useState } from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// ─── Default AI Industries Data ──────────────────────────────────────────────
export const DEFAULT_AI_INDUSTRIES = [
    {
        title: "Healthcare",
        slug: "healthcare",
        excerpt: "AI-driven diagnostics, predictive patient care, and automated administrative workflows that enhance medical outcomes and operational efficiency.",
        content: {
            challenges: {
                items: [
                    { title: "Predictive disease modeling & diagnosis" },
                    { title: "Automated EHR processing & analysis" },
                    { title: "AI-powered virtual health assistants" }
                ]
            }
        },
        image: "/images/industries/clone/healthcare.png"
    },
    {
        title: "Finance & Fintech",
        slug: "fintech",
        excerpt: "Intelligent fraud detection, algorithmic trading, and personalized financial advisory systems that secure and accelerate digital banking.",
        content: {
            challenges: {
                items: [
                    { title: "Real-time fraud detection & prevention" },
                    { title: "Algorithmic risk assessment models" },
                    { title: "Automated wealth management (Robo-advisors)" }
                ]
            }
        },
        image: "/images/industries/clone/fintech.png"
    },
    {
        title: "E-Commerce & Retail",
        slug: "ecommerce",
        excerpt: "Hyper-personalized shopping experiences, dynamic pricing engines, and intelligent supply chain forecasting to maximize retail ROI.",
        content: {
            challenges: {
                items: [
                    { title: "Hyper-personalized product recommendations" },
                    { title: "Dynamic pricing & demand forecasting" },
                    { title: "Visual search & AI inventory management" }
                ]
            }
        },
        image: "/images/industries/clone/ecommerce.png"
    },
    {
        title: "Logistics & Supply Chain",
        slug: "logistics",
        excerpt: "Route optimization, predictive maintenance, and autonomous fleet management solutions that drastically reduce operational overhead.",
        content: {
            challenges: {
                items: [
                    { title: "AI-powered route & fleet optimization" },
                    { title: "Predictive maintenance for vehicles" },
                    { title: "Automated warehouse robotics integration" }
                ]
            }
        },
        image: "/images/industries/clone/logistics.png"
    },
    {
        title: "Education & EdTech",
        slug: "education",
        excerpt: "Adaptive learning platforms, automated grading systems, and intelligent tutoring bots that personalize education at scale.",
        content: {
            challenges: {
                items: [
                    { title: "Personalized adaptive learning algorithms" },
                    { title: "Automated grading & student analytics" },
                    { title: "24/7 AI tutoring & support bots" }
                ]
            }
        },
        image: "/images/industries/clone/education.png"
    },
    {
        title: "Real Estate",
        slug: "real-estate",
        excerpt: "Automated property valuation, AI-driven lead matching, and virtual 3D property tours that accelerate the buying and selling process.",
        content: {
            challenges: {
                items: [
                    { title: "Predictive property valuation models" },
                    { title: "AI-driven buyer-seller matchmaking" },
                    { title: "Automated lease & contract parsing" }
                ]
            }
        },
        image: "/images/industries/clone/real-estate.png"
    }
];

// Fallback images strictly for backward compatibility with old clone setup
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

// ─── Main Component ───────────────────────────────────────────────────────────
export default function IndustriesSection({ data, industries }) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Determine the active source of truth.
    // If the admin passes 'industries' (Solutions page style) or 'data.items' (Services page style), use that.
    // Otherwise, fallback to the robust AI default list.
    let activeIndustriesList = DEFAULT_AI_INDUSTRIES;

    if (industries && industries.length > 0) {
        activeIndustriesList = industries;
    } else if (data && data.items && data.items.length > 0) {
        activeIndustriesList = data.items;
    }

    if (!activeIndustriesList || activeIndustriesList.length === 0) return null;

    const activeIndustry = activeIndustriesList[activeIndex] || activeIndustriesList[0];

    // Safely extract content blocks (handles both Prisma nested JSON structure and direct objects)
    const contentObj = activeIndustry.content || activeIndustry;
    const heroDesc = contentObj.hero?.description || activeIndustry.excerpt || activeIndustry.description || activeIndustry.itemDesc || "We build intelligent, scalable solutions tailored to your industry to elevate performance and accelerate growth.";

    // Safely extract feature bullets
    let featuresList = [];
    if (contentObj.challenges?.items) {
        featuresList = contentObj.challenges.items;
    } else if (activeIndustry.itemPoints && Array.isArray(activeIndustry.itemPoints)) {
        featuresList = activeIndustry.itemPoints.map(p => ({ title: p }));
    } else if (activeIndustry.capabilities) {
        featuresList = activeIndustry.capabilities.map(c => ({ title: c }));
    } else {
        featuresList = [
            { title: "Custom AI model integration" },
            { title: "Secure infrastructure deployment" },
            { title: "Scalable performance optimization" }
        ];
    }

    // Safely extract image (Custom from array -> DB Image -> Default Map -> Generic Fallback)
    const customSelection = data?.items?.find?.(item => item.slug === activeIndustry.slug);
    const displayImage = customSelection?.image || activeIndustry.image || activeIndustry.itemImage || contentObj.hero?.image || defaultIndustryImages[activeIndustry.slug] || '/images/industries/clone/149.png';

    const sectionTitle = data?.title || "Industries We Transform";

    return (
        <section className="py-20 bg-[#EFF9FF] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <CommonTitle
                    align="center"
                    title={sectionTitle}
                    subtitle={data?.subtitle}
                />

                {/* Tabs: Separated Underlined style */}
                <div className="relative mb-16 flex lg:justify-center w-full overflow-hidden">
                    <div className="flex gap-4 md:gap-5 lg:gap-8 overflow-x-auto no-scrollbar [&::-webkit-scrollbar]:hidden pb-4 relative z-10 w-full px-4 items-center justify-start lg:justify-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {activeIndustriesList.map((ind, i) => (
                            <button
                                key={ind.slug || ind.title || i}
                                onClick={() => setActiveIndex(i)}
                                onMouseEnter={() => setActiveIndex(i)}
                                className={`
                                    relative py-2 px-3 text-xs md:text-sm lg:text-base font-bold transition-all duration-300 whitespace-nowrap flex flex-col items-center group shrink-0
                                    ${activeIndex === i ? 'text-[#1EAEDB]' : 'text-slate-400 hover:text-slate-600'}
                                `}
                            >
                                <span className="mb-2">{ind.title || ind.itemTitle}</span>

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
                                className="relative w-full aspect-square md:aspect-auto md:h-[500px]"
                            >
                                <img
                                    src={displayImage}
                                    alt={activeIndustry.title || activeIndustry.itemTitle || 'Industry'}
                                    className="w-full h-full object-contain"
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
                                        {activeIndustry.title || activeIndustry.itemTitle}
                                    </h3>
                                    <div
                                        className="text-[#333] text-sm md:text-lg leading-relaxed font-medium max-w-xl opacity-90 rich-text"
                                        dangerouslySetInnerHTML={{ __html: heroDesc }}
                                    />
                                </div>

                                {/* Feature Bullets */}
                                <div className="space-y-4 pt-2">
                                    {featuresList.slice(0, 3).map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <Check size={20} className="text-[#1A1A1A]" strokeWidth={2.5} />
                                            <span
                                                className="text-[#1A1A1A] font-bold text-sm md:text-lg rich-text"
                                                dangerouslySetInnerHTML={{ __html: item.title }}
                                            />
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
                                            href={`/industries/${activeIndustry.slug || 'it-consulting'}`}
                                            className="px-8 py-3.5 rounded-full bg-[#1EAEDB] text-white font-bold text-base md:text-lg transition-all shadow-[0_10px_20px_rgba(30,174,219,0.3)] flex items-center gap-2"
                                        >
                                            {activeIndustry.title || activeIndustry.itemTitle}
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
            {/* Custom Background Circle for texture */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-sky-100 rounded-full opacity-30 blur-[100px] pointer-events-none"></div>

        </section>
    );
}
