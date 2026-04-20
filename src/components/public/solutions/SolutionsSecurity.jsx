"use client";
import React, { useState } from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import * as LucideIcons from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';

export default function SolutionsWhyChoose({ data }) {
    const [activeTab, setActiveTab] = useState(0);

    if (!data) return null;

    // Helper to render dynamic icon
    const renderIcon = (iconName) => {
        const IconComponent = LucideIcons[iconName] || LucideIcons.Zap;
        return <IconComponent size={20} />;
    };

    return (
        <section className="py-8 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* 1. Header */}
                <CommonTitle
                    align="center"
                    title={data.title}
                    gradientText={data.highlight}
                    subtitle={data.subtitle}
                />

                {data.description && (
                    <div 
                        className="max-w-3xl mx-auto text-center mt-6 text-slate-600 text-lg leading-relaxed animate-fadeIn"
                        dangerouslySetInnerHTML={{ __html: data.description }}
                    />
                )}

                {/* 2. Main Container Box */}
                <div className="mt-16 bg-sky-50 rounded-xl p-4  border border-sky-100 shadow-xl overflow-hidden relative">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                        {/* --- LEFT SIDE: Vertical Stepper Tabs (4 Cols) --- */}
                        <div className="lg:col-span-5 relative p-2 bg-white rounded-xl">
                            {/* Vertical Connecting Line */}
                            <div className="absolute left-12 top-8 bottom-8 w-0.5 bg-sky-200 hidden lg:block"></div>

                            {/* Added Flex row & overflow for mobile, kept vertical for desktop */}
                            <div className="flex overflow-x-auto lg:flex-col lg:space-y-4 gap-4 lg:gap-0 relative z-10 pb-4 lg:pb-0 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                {data.items?.map((item, idx) => {
                                    const isActive = activeTab === idx;
                                    return (
                                        <div
                                            key={idx}
                                            onMouseEnter={() => setActiveTab(idx)} // Added Hover
                                            onClick={() => setActiveTab(idx)}      // Kept click for mobile
                                            className={`group flex items-center gap-6 p-4 rounded-2xl cursor-pointer transition-all duration-300 flex-shrink-0 snap-center w-[280px] sm:w-[320px] lg:w-auto ${isActive
                                                ? "bg-white shadow-md lg:translate-x-2 border border-sky-50 lg:border-transparent"
                                                : "bg-slate-50/50 lg:bg-transparent hover:bg-white/50 lg:hover:translate-x-1 border border-transparent"
                                                }`}
                                        >
                                            {/* Icon Circle */}
                                            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-sm ${isActive
                                                ? "bg-sky-600 border-white text-white scale-110"
                                                : "bg-sky-100 border-sky-50 text-sky-500 group-hover:bg-white group-hover:border-sky-200"
                                                }`}>
                                                {renderIcon(item.icon)}
                                            </div>

                                            {/* Tab Text */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className={`text-lg font-bold transition-colors truncate lg:whitespace-normal ${isActive ? "text-slate-900" : "text-slate-600 group-hover:text-sky-700"
                                                    }`}>
                                                    {item.title}
                                                </h4>
                                            </div>

                                            {/* Arrow Indicator */}
                                            {isActive && (
                                                <div className="text-sky-500 animate-pulse hidden lg:block flex-shrink-0">
                                                    <LucideIcons.ChevronRight size={20} />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* --- RIGHT SIDE: Content Display (8 Cols) --- */}
                        <div className="lg:col-span-7 relative min-h-[400px] flex flex-col justify-center">

                            {/* Background Giant Shadow Number */}
                            <div className="absolute top-0 right-0 text-[10rem] md:text-[15rem] font-black leading-none text-sky-900/5 select-none pointer-events-none z-0">
                                0{activeTab + 1}
                            </div>

                            <div className="relative z-10 animate-fadeIn">

                                {/* Main Title */}
                                <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                                    {data.items[activeTab]?.title}
                                </h3>

                                {/* Description */}
                                <div
                                    className="text-slate-600 text-lg leading-relaxed mb-10 max-w-lg rich-text"
                                    dangerouslySetInnerHTML={{ __html: data.items[activeTab]?.description }}
                                />

                                {/* Points Grid */}
                                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-sm">
                                    <h5 className="text-sm font-bold text-slate-400 mb-6">Key Benefits</h5>
                                    <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                                        {data.items[activeTab]?.points?.map((point, pIdx) => (
                                            <div key={pIdx} className="flex items-start gap-3">
                                                <CheckCircle2 size={20} className="text-sky-600 mt-0.5 flex-shrink-0" />
                                                <span className="text-slate-700 font-semibold text-sm md:text-base">
                                                    {point}
                                                </span>
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