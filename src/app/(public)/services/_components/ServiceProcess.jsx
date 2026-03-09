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

                <div className="mt-16 flex flex-col md:flex-row gap-4 h-auto md:h-[450px]">
                    {steps.map((step, idx) => {
                        const isActive = activeIndex === idx;

                        return (
                            <div
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`
                                    relative cursor-pointer transition-all duration-700 ease-in-out group
                                    flex-1 overflow-hidden rounded-[2rem] border border-sky-100
                                    ${isActive ? 'md:flex-[3] bg-sky-50 shadow-2xl shadow-sky-900/10' : 'md:flex-1 bg-gradient-to-b from-sky-50/50 to-sky-100/50 hover:bg-sky-50'}
                                `}
                            >
                                {/* Active State Content */}
                                <div className={`h-full flex flex-col p-8 md:p-10 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-sky-600 font-bold text-lg shadow-sm">
                                            {String(idx + 1).padStart(2, '0')}
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
                                            {step.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-6">
                                        <p className="text-slate-600 font-medium leading-relaxed max-w-xl">
                                            {step.description}
                                        </p>

                                        {/* Bullets */}
                                        <div className="grid grid-cols-1 gap-4 pt-4">
                                            {(step.bullets || []).map((bullet, bIdx) => (
                                                <div key={bIdx} className="flex gap-4 items-start group/bullet">
                                                    <div className="mt-1 w-5 h-5 rounded-full bg-white flex items-center justify-center text-sky-500 shadow-sm transition-transform group-hover/bullet:scale-110">
                                                        <Check size={12} strokeWidth={3} />
                                                    </div>
                                                    <span className="text-slate-700 font-bold text-sm md:text-base leading-snug">
                                                        {bullet}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Collapsed State Content (Desktop) */}
                                <div className={`hidden md:flex flex-col items-center justify-end h-full p-8 transition-all duration-500 ${isActive ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-sky-600 font-bold text-xs shadow-sm mb-6">
                                        {String(idx + 1).padStart(2, '0')}
                                    </div>
                                    <h3 className="text-lg font-black text-slate-800 vertical-text origin-bottom rotate-180 mb-4 tracking-tighter uppercase">
                                        {step.title}
                                    </h3>
                                </div>

                                {/* Mobile Collapsed State Titles */}
                                <div className={`md:hidden p-8 flex items-center gap-4 ${isActive ? 'hidden' : 'flex'}`}>
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sky-500 font-bold text-sm shadow-sm">
                                        {String(idx + 1).padStart(2, '0')}
                                    </div>
                                    <h3 className="text-lg font-black text-slate-800">
                                        {step.title}
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
            `}</style>
        </section>
    );
}
