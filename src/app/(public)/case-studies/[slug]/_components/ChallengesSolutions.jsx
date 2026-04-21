"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

export default function ChallengesSolutions({ data, branding }) {
    const { primaryColor, secondaryColor, primaryFont } = branding;

    // Normalize challenges data
    const challengesData = data.challenges || {};
    const solutions = Array.isArray(challengesData.solutions) 
        ? challengesData.solutions 
        : (Array.isArray(challengesData) ? challengesData : []);
    
    const mainChallenge = challengesData.mainChallenge || 
        (Array.isArray(challengesData) ? challengesData[0]?.description : data.challenges?.challenge) || 
        "Project specific challenges addressed in this case study.";

    const [activeIndex, setActiveIndex] = useState(0);
    const activeSolution = solutions[activeIndex] || solutions[0] || { tabLabel: "Info", title: "Project Overview", description: "Details coming soon.", image: "" };

    return (
        <section
            className="bg-white relative overflow-hidden py-12 md:py-24"
            style={{ fontFamily: primaryFont }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-6 lg:gap-8 items-stretch">

                    {/* Left: Challenges - Static Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl p-8 md:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
                        style={{ background: primaryColor }}
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />

                        <div className="space-y-6 relative z-10">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.1] text-white">
                                The
                                <span className="relative ml-2">
                                    Challenges
                                    <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-white/30 rounded-full" />
                                </span>
                            </h2>
                            <div 
                                className="text-base md:text-lg text-white/90 leading-relaxed font-medium rich-text-white"
                                dangerouslySetInnerHTML={{ __html: mainChallenge }}
                            />
                        </div>
                    </motion.div>

                    {/* Right: Solutions Box - Dynamic Multi-Tab Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="rounded-3xl p-6 sm:p-8 md:p-12 border flex flex-col gap-6 bg-white shadow-xl shadow-slate-200/50"
                        style={{ borderColor: `${primaryColor}15` }}
                    >
                        {/* Tab-style Pill Headers - Hover to Switch */}
                        {solutions.length > 0 && (
                            <div className="flex flex-wrap gap-2 sm:gap-3 p-1.5 bg-slate-50/50 rounded-2xl w-fit border border-slate-100">
                                {solutions.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onMouseEnter={() => setActiveIndex(idx)}
                                        className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${activeIndex === idx
                                            ? "text-white shadow-md scale-[1.02]"
                                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/80"
                                            }`}
                                        style={{
                                            background: activeIndex === idx ? `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` : 'transparent'
                                        }}
                                    >
                                        {item.tabLabel}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Solution Content Layout - Cross-fade transition */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col md:flex-row gap-8 lg:gap-10 items-start min-h-[300px]"
                            >
                                {/* Visual Asset (Mockup) - Capped height */}
                                {activeSolution.image && (
                                    <div className="relative w-full md:w-[220px] lg:w-[260px] max-h-[450px] aspect-[9/16] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm flex-shrink-0">
                                        <Image
                                            src={activeSolution.image}
                                            alt={activeSolution.title}
                                            fill
                                            className="object-contain object-top hover:scale-110 transition-transform duration-700 p-2"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent pointer-events-none" />
                                    </div>
                                )}

                                {/* Text Content - Expands if no image */}
                                <div className="space-y-5 flex-1">
                                    <div className="space-y-3">
                                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                                            {activeSolution.title}
                                            <div className="h-1.5 w-12 rounded-full mt-2" style={{ backgroundColor: primaryColor }} />
                                        </h3>
                                    </div>
                                    <div
                                        className="text-base md:text-lg text-slate-600 font-medium leading-relaxed rich-text"
                                        dangerouslySetInnerHTML={{ __html: activeSolution.description || '' }}
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
