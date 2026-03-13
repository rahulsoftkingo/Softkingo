"use client";

import React, { useState } from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import Image from 'next/image';
import { Check } from 'lucide-react';

export default function ServiceProcess({ data }) {
    const [activeIndex, setActiveIndex] = useState(1); // Default to second card as per Figma (usually the one in the middle or index 1 is preferred)

    if (!data || !data.items || data.items.length === 0) return null;

    const steps = data.items;

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <CommonTitle
                    align="center"
                    title={data.title || "Our Development Process"}
                    subtitle={data.subtitle || "We follow a streamlined methodology to deliver high-quality digital products."}
                />

                <div className="mt-16 flex flex-row gap-4 h-[420px] overflow-x-auto no-scrollbar pb-4">
                    {steps.map((step, idx) => {
                        const isActive = activeIndex === idx;

                        return (
                            <div
                                key={idx}
                                onMouseEnter={() => setActiveIndex(idx)}
                                className={`
                                    relative cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group
                                    flex-shrink-0 overflow-hidden rounded-[2.5rem] border border-sky-100
                                    ${isActive
                                        ? 'w-[300px] sm:w-[500px] md:w-[850px] bg-sky-50 shadow-[0_40px_80px_-15px_rgba(14,165,233,0.1)]'
                                        : 'w-[80px] sm:w-[120px] md:w-[320px] bg-gradient-to-b from-sky-50/50 to-sky-100/50 hover:bg-sky-50'}
                                `}
                            >
                                {/* Active State Content */}
                                <div className={`h-full flex flex-col p-8 md:p-12 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                    <div className="flex items-center gap-6 mb-8 whitespace-nowrap">
                                        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-sky-600 font-bold text-lg shadow-sm">
                                            {String(idx + 1).padStart(2, '0')}
                                        </div>
                                        <h3 className="text-xl md:text-3xl font-bold text-slate-900 leading-tight">
                                            {step.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <div className={`space-y-8 flex-grow transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                        <p className="text-slate-600 font-bold text-lg md:text-xl leading-relaxed max-w-2xl">
                                            {step.description}
                                        </p>

                                        {/* Bullets */}
                                        <div className="grid grid-cols-1 gap-4 mt-auto">
                                            {(step.bullets || []).map((bullet, bIdx) => (
                                                <div key={bIdx} className="flex gap-4 items-start group/bullet">
                                                    <div className="mt-1 w-5 h-5 rounded-full bg-white flex items-center justify-center text-sky-500 shadow-sm transition-transform group-hover/bullet:scale-110 flex-shrink-0">
                                                        <Check size={12} strokeWidth={3} />
                                                    </div>
                                                    <span className="text-slate-700 font-bold text-sm md:text-base leading-tight">
                                                        {bullet}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Collapsed State Content (Desktop) */}
                                <div className={`absolute inset-0 flex flex-col items-center justify-between py-10 px-4 transition-all duration-500 ${isActive ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-sky-600 font-bold text-xs shadow-sm">
                                        {String(idx + 1).padStart(2, '0')}
                                    </div>
                                    <div className="w-full text-center">
                                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tighter group-hover:text-sky-500 transition-colors line-clamp-2 px-2">
                                            {step.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination Dots */}
                <div className="mt-12 flex justify-center gap-2">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-8 bg-sky-500' : 'w-2 bg-slate-200'
                                }`}
                        />
                    ))}
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
