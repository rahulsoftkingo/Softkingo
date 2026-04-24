"use client";
import React, { useState } from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import { Check, Zap } from 'lucide-react';

export default function SolutionsAICapabilities({ data }) {
    const [activeTab, setActiveTab] = useState(0);

    if (!data) return null;

    return (
        <section className="py-8 md:py-16 bg-slate-50 overflow-hidden" id="ai-capabilities">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* 1. Common Heading */}
                <CommonTitle
                    align="center"
                    title={data.title}
                    gradientText={data.highlight}
                    subtitle={data.subtitle}
                />

                <div className="grid lg:grid-cols-12 gap-4 lg:gap-0 items-center mt-8 md:mt-10">

                    {/* 2. LEFT SIDE: Tabs Navigation (Overlapping Container) */}
                    <div className="lg:col-span-5 bg-sky-50 rounded-xl p-4 lg:p-6 lg:max-h-[600px] lg:overflow-y-auto custom-scrollbar-stylish relative z-20 lg:translate-x-12">
                        <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-4 lg:gap-3 pb-4 lg:pb-0 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {data.items?.map((item, idx) => {
                                const isActive = activeTab === idx;
                                return (
                                    <div
                                        key={idx}
                                        onMouseEnter={() => setActiveTab(idx)}
                                        className={`flex-shrink-0 snap-start w-[75vw] sm:w-[300px] lg:w-auto p-4 rounded-xl cursor-pointer transition-all duration-300 border-l-4 ${isActive
                                            ? "bg-white border-sky-500 shadow-sm lg:translate-x-2"
                                            : "border-transparent hover:bg-white/50"
                                            }`}
                                    >
                                        <div className="flex justify-between items-center gap-3">
                                            <div>
                                                <h4 className={`text-sm md:text-lg font-bold transition-colors line-clamp-2 md:line-clamp-none ${isActive ? "text-sky-600" : "text-slate-600"}`}>
                                                    {item.title}
                                                </h4>
                                            </div>
                                            {isActive && <div className="flex-shrink-0 w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 3. RIGHT SIDE: Sticky Content Card */}
                    <div className="lg:col-span-7 relative z-10 h-full lg:min-h-[450px]">
                        <div className="lg:sticky lg:top-32 h-full">
                            <div className="relative h-full min-h-[450px] bg-white rounded-[1rem] md:rounded-[1.5rem] p-4 sm:p-6 md:p-10 lg:p-12 overflow-hidden border border-slate-100 shadow-2xl transition-all duration-500 hover:shadow-sky-200/50 group flex flex-col justify-center">

                                {/* Background Decorative Elements */}
                                <div className="absolute top-0 right-0 text-[10rem] sm:text-[15rem] font-bold leading-none text-sky-50/50 select-none pointer-events-none -mt-4 sm:-mt-10 -mr-4 sm:-mr-10 z-0 transition-transform group-hover:scale-110 duration-700">
                                    0{activeTab + 1}
                                </div>
                                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky-400/5 blur-[80px] rounded-full pointer-events-none" />

                                {/* Content Container */}
                                <div className="relative z-10 text-left animate-fadeIn lg:pl-16">

                                    {/* Icon Backdrop */}
                                    {/* <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shadow-lg shadow-sky-200 mb-8 transform transition-transform group-hover:rotate-6">
                                        <Zap className="w-8 h-8 text-white" />
                                    </div> */}

                                    {/* Main Title */}
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-6 pr-16 sm:pr-24 leading-tight">
                                        {data?.items?.[activeTab]?.title}
                                    </h3>

                                    {/* Description */}
                                    <div
                                        className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 max-w-xl font-medium"
                                        dangerouslySetInnerHTML={{ __html: data?.items?.[activeTab]?.description }}
                                    />

                                    {/* Points Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {data.items[activeTab]?.points?.map((point, pIdx) => (
                                            <div key={pIdx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-sky-100 hover:bg-white transition-all duration-300">
                                                <div className="p-1.5 rounded-full text-white bg-sky-500 flex-shrink-0 shadow-sm">
                                                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                                </div>
                                                <span className="text-slate-700 font-bold text-xs sm:text-sm">{point}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}