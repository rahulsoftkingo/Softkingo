"use client";
import React, { useState, useRef } from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import { Check } from 'lucide-react';

export default function SolutionsAICapabilities({ data }) {
    const [activeTab, setActiveTab] = useState(0);
    const mobileContentRef = useRef(null);
    const tabListRef = useRef(null);
    const isManualScroll = useRef(false);

    if (!data) return null;

    // Scroll both tab list button and content card into view when activeTab changes
    const handleTabClick = (idx) => {
        setActiveTab(idx);
        isManualScroll.current = true;

        // 1. Scroll top tab container to the selected tab button
        if (tabListRef.current) {
            const tabContainer = tabListRef.current;
            const targetTab = tabContainer.children[idx];
            if (targetTab) {
                const targetLeft = targetTab.offsetLeft - (tabContainer.clientWidth / 2) + (targetTab.clientWidth / 2);
                tabContainer.scrollTo({
                    left: Math.max(0, targetLeft),
                    behavior: 'smooth'
                });
            }
        }

        // 2. Scroll mobile content card container
        if (mobileContentRef.current) {
            const cardWidth = mobileContentRef.current.clientWidth;
            mobileContentRef.current.scrollTo({
                left: cardWidth * idx,
                behavior: 'smooth'
            });
        }

        setTimeout(() => {
            isManualScroll.current = false;
        }, 500);
    };

    // Track active card while user is swiping content on mobile
    const handleMobileScroll = () => {
        if (isManualScroll.current || !mobileContentRef.current) return;

        const container = mobileContentRef.current;
        const scrollPosition = container.scrollLeft;
        const cardWidth = container.clientWidth;

        if (cardWidth > 0) {
            const newIndex = Math.round(scrollPosition / cardWidth);
            if (newIndex !== activeTab && newIndex >= 0 && newIndex < (data.items?.length || 0)) {
                setActiveTab(newIndex);

                // Auto scroll tab navigation bar as user swipes through cards
                if (tabListRef.current) {
                    const tabContainer = tabListRef.current;
                    const targetTab = tabContainer.children[newIndex];
                    if (targetTab) {
                        const targetLeft = targetTab.offsetLeft - (tabContainer.clientWidth / 2) + (targetTab.clientWidth / 2);
                        tabContainer.scrollTo({
                            left: Math.max(0, targetLeft),
                            behavior: 'smooth'
                        });
                    }
                }
            }
        }
    };

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

                    {/* 2. LEFT SIDE: Tabs Navigation */}
                    <div className="lg:col-span-5 bg-sky-50 rounded-xl p-4 lg:p-6 lg:max-h-[600px] overflow-x-auto custom-scrollbar-stylish relative z-20 lg:translate-x-12">
                        <div
                            ref={tabListRef}
                            className="flex lg:flex-col overflow-x-auto lg:overflow-visible touch-pan-x gap-4 lg:gap-3 pb-4 lg:pb-0 snap-x snap-mandatory lg:snap-none scroll-smooth [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                            style={{ WebkitOverflowScrolling: 'touch' }}
                        >
                            {data.items?.map((item, idx) => {
                                const isActive = activeTab === idx;
                                return (
                                    <div
                                        key={idx}
                                        onMouseEnter={() => {
                                            // Trigger on hover only on desktop screens
                                            if (window.innerWidth >= 1024) setActiveTab(idx);
                                        }}
                                        onClick={() => handleTabClick(idx)}
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

                    {/* 3. RIGHT SIDE: Mobile Scrollable / Laptop Sticky Content Container */}
                    <div className="lg:col-span-7 relative z-10 h-full lg:min-h-[450px]">

                        {/* MOBILE SCREEN VERSION (Horizontal Scroll Carousel with Snap) */}
                        <div
                            ref={mobileContentRef}
                            onScroll={handleMobileScroll}
                            className="flex lg:hidden overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4"
                        >
                            {data.items?.map((item, idx) => (
                                <div key={idx} className="w-full flex-shrink-0 snap-center min-h-[450px]">
                                    <div className="relative h-full min-h-[450px] bg-white rounded-[1rem] p-5 sm:p-6 overflow-hidden border border-slate-100 shadow-xl flex flex-col justify-center">

                                        {/* Background Decorative Elements */}
                                        <div className="absolute top-0 right-0 text-[8rem] sm:text-[10rem] font-bold leading-none text-sky-50/50 select-none pointer-events-none -mt-4 -mr-4 z-0">
                                            0{idx + 1}
                                        </div>
                                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky-400/5 blur-[80px] rounded-full pointer-events-none" />

                                        {/* Content */}
                                        <div className="relative z-10 text-left">
                                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pr-12 leading-tight line-clamp-3">
                                                {item.title}
                                            </h3>

                                            <div
                                                className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-xl font-medium"
                                                dangerouslySetInnerHTML={{ __html: item.description }}
                                            />

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {item.points?.map((point, pIdx) => (
                                                    <div key={pIdx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-transparent">
                                                        <div className="p-1 rounded-full text-white bg-sky-500 flex-shrink-0 shadow-sm">
                                                            <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                                        </div>
                                                        <span className="text-slate-700 font-bold text-xs sm:text-sm">{point}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* LAPTOP / DESKTOP VERSION (Sticky Display) */}
                        <div className="hidden lg:block lg:sticky lg:top-32 h-full">
                            <div className="relative h-full min-h-[450px] bg-white rounded-[1.5rem] p-6 lg:p-10 xl:p-12 overflow-hidden border border-slate-100 shadow-2xl transition-all duration-500 hover:shadow-sky-200/50 group flex flex-col justify-center">

                                {/* Background Decorative Elements */}
                                <div className="absolute top-0 right-0 text-[8rem] lg:text-[10rem] xl:text-[15rem] font-bold leading-none text-sky-50/50 select-none pointer-events-none -mt-6 -mr-6 lg:-mt-10 lg:-mr-10 z-0 transition-transform group-hover:scale-110 duration-700">
                                    0{activeTab + 1}
                                </div>
                                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky-400/5 blur-[80px] rounded-full pointer-events-none" />

                                {/* Content Container */}
                                <div className="relative z-10 text-left animate-fadeIn lg:pl-4 xl:pl-16">

                                    {/* Main Title */}
                                    <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-slate-900 mb-6 pr-14 lg:pr-16 xl:pr-24 leading-tight line-clamp-3">
                                        {data?.items?.[activeTab]?.title}
                                    </h3>

                                    {/* Description */}
                                    <div
                                        className="text-slate-600 text-sm lg:text-base xl:text-lg leading-relaxed mb-10 max-w-xl font-medium"
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