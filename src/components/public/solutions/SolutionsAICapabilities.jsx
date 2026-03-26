"use client";
import React, { useState } from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import { Check } from 'lucide-react';

export default function SolutionsAICapabilities({ data }) {
    const [activeTab, setActiveTab] = useState(0);

    if (!data) return null;

    return (
        <section className="py-20 md:py-24 bg-slate-50 overflow-hidden" id="ai-capabilities">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* 1. Common Heading */}
                <CommonTitle
                    align="center"
                    title={data.title}
                    gradientText={data.highlight}
                    subtitle={data.subtitle}
                />

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-20 items-start mt-10 md:mt-16">

                    {/* 2. LEFT SIDE: Tabs Navigation (Mobile: Horizontal Scroll, Desktop: Vertical Stack) */}
                    <div className="lg:col-span-5 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-4 lg:gap-0 lg:space-y-4 pb-4 lg:pb-0 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {data.items?.map((item, idx) => {
                            const isActive = activeTab === idx;
                            return (
                                <div
                                    key={idx}
                                    onClick={() => setActiveTab(idx)}
                                    // Mobile par fixed width (w-[75vw]) di hai taaki cards smooth scroll ho
                                    className={`flex-shrink-0 snap-start w-[75vw] sm:w-[300px] lg:w-auto p-4 rounded-2xl cursor-pointer transition-all duration-300 border-l-4 ${isActive
                                            ? "bg-white border-sky-500 shadow-md lg:translate-x-2"
                                            // Unselected tabs ke liye thoda sa background add kiya mobile par better visibility ke liye
                                            : "bg-white/50 lg:bg-transparent border-slate-200 hover:bg-white hover:border-sky-200 hover:shadow-sm"
                                        }`}
                                >
                                    <div className="flex justify-between items-center gap-3">
                                        <div>
                                            <h4 className={`text-sm md:text-lg font-bold transition-colors line-clamp-2 md:line-clamp-none ${isActive ? "text-sky-600" : "text-slate-700"}`}>
                                                {item.title}
                                            </h4>
                                        </div>
                                        {isActive && <div className="flex-shrink-0 w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* 3. RIGHT SIDE: Sticky Content Card */}
                    {/* lg:sticky laga diya hai taaki scroll sirf desktop par stuck ho, mobile par natural flow rahe */}
                    <div className="lg:col-span-7 relative h-full lg:min-h-[400px]">
                        <div className="lg:sticky lg:top-32">
                            <div className="relative bg-sky-50 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 overflow-hidden border border-sky-100 shadow-xl transition-all duration-500">

                                {/* Background Giant Shadow Number */}
                                {/* Font size mobile ke hisaab se chhota kiya hai (8rem) */}
                                <div className="absolute top-0 right-0 text-[8rem] sm:text-[12rem] md:text-[15rem] font-black leading-none text-white/50 select-none pointer-events-none -mt-4 sm:-mt-10 -mr-4 sm:-mr-10 z-0">
                                    0{activeTab + 1}
                                </div>

                                {/* Content Container */}
                                <div className="relative z-10 text-left animate-fadeIn">

                                    {/* Main Title */}
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mb-4 md:mb-6 pr-16 sm:pr-24">
                                        {data?.items?.[activeTab]?.title}
                                    </h3>

                                    {/* Description */}
                                    <div
                                        className="text-slate-600 text-sm md:text-md leading-relaxed mb-6 md:mb-8 max-w-lg"
                                        dangerouslySetInnerHTML={{ __html: data?.items?.[activeTab]?.description }}
                                    />

                                    {/* Points List */}
                                    <div>
                                        <h5 className="font-bold text-slate-800 mb-3 md:mb-4 text-xs md:text-sm uppercase tracking-wider">Key Capabilities</h5>
                                        <div className="grid grid-cols-1 gap-3 md:gap-4">
                                            {data.items[activeTab]?.points?.map((point, pIdx) => (
                                                <div key={pIdx} className="flex items-start gap-3">
                                                    <div className="mt-1 p-1 shadow-2xl rounded-full text-sky-100 bg-sky-600 flex-shrink-0">
                                                        <Check className="w-3 h-3 md:w-[14px] md:h-[14px]" strokeWidth={3} />
                                                    </div>
                                                    <span className="text-slate-700 font-medium text-xs sm:text-sm md:text-base leading-snug">{point}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                                {/* Decorative Blob */}
                                <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-sky-200/30 rounded-full blur-3xl -z-0 translate-y-1/2 -translate-x-1/2"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}