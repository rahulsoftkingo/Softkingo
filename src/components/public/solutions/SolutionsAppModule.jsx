"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, X, Smartphone, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SolutionsAppModule({ data, reverse = false, bg = "white", componentOnly = false }) {
    const [activeFeat, setActiveFeat] = useState(0);

    if (!data) return null;

    const content = (
        <div className={`flex flex-col lg:flex-row items-start gap-6 lg:gap-8 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
            {/* 1. LEFT SIDE: Accordion Feature List */}
            <div className="flex-1 w-full relative">
                {/* Module Header Inside Tab */}
                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">{data.title}</h2>
                    {data.description && (
                        <div
                            className="text-slate-600 text-base md:text-lg leading-relaxed font-medium"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        />
                    )}
                </div>

                <div className="space-y-4 py-8 lg:max-h-[550px] overflow-y-auto pr-4 custom-scrollbar-stylish scroll-smooth">
                    {data.features?.map((feat, i) => {
                        const isActive = activeFeat === i;
                        const title = typeof feat === 'string' ? feat : feat.title;
                        const desc = typeof feat === 'string' ? null : feat.desc;

                        return (
                            <div
                                key={i}
                                onMouseEnter={() => setActiveFeat(i)}
                                className={`group cursor-pointer transition-all duration-500 overflow-hidden rounded-xl border ${isActive
                                    ? "bg-white border-slate-100 shadow-xl shadow-sky-500/5 ring-1 ring-slate-100"
                                    : "bg-white border-slate-100 shadow-sm hover:shadow-md"
                                    }`}
                            >
                                <div className="relative px-4 py-4 sm:px-6 sm:py-6  ">
                                    {/* Left Indicator Bar - Always Visible */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-[4px] z-10 transition-colors duration-300 ${isActive ? 'bg-sky-500' : 'bg-sky-500 group-hover:bg-sky-300'}`} />

                                    <div className=" flex items-center gap-4 lg:gap-6">
                                        {/* Circular Icon Wrapper */}
                                        <div className={`w-8 h-8 min-w-8 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-sky-600 text-white shadow-lg' : 'bg-sky-50 text-sky-500'}`}>
                                            <Check size={20} strokeWidth={3} />
                                        </div>

                                        {/* Title */}
                                        <div className="flex-grow">
                                            <h3 className={`font-bold text-xl transition-colors ${isActive ? 'text-slate-950' : 'text-slate-700'}`}>
                                                {title}
                                            </h3>
                                        </div>


                                    </div>

                                    {/* Accordion Content (Description) */}
                                    <AnimatePresence initial={false}>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="pt-2 ">
                                                    <div
                                                        className="text-slate-600 text-base font-medium leading-relaxed  rich-text"
                                                        dangerouslySetInnerHTML={{ __html: desc || "Exploring the critical advantages and strategic value for your business feature development." }}
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 2. RIGHT SIDE: Simple Preview Mockup */}
            <div className="flex-1 relative w-full lg:sticky lg:top-36 self-start flex justify-center">
                <div className="relative w-full max-w-lg">
                    <Image
                        src={data.image || "/images/placeholder.png"}
                        alt={data.title}
                        width={1000}
                        height={1000}
                        className="w-full h-auto object-contain rounded-xl"
                        priority
                    />

                    {/* Subtle Shadow below the image instead of around it */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-slate-400/5 blur-[60px] -z-10" />
                </div>
            </div>
        </div>
    );

    if (componentOnly) return content;

    return (
        <section className={`py-8 md:py-16 overflow-hidden ${bg === 'gray' ? 'bg-slate-50' : 'bg-white'}`}>
            <div className="container mx-auto px-6 lg:px-12">
                {content}
            </div>
        </section>
    );
}