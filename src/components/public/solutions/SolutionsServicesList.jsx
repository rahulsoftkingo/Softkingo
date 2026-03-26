"use client";
import React, { useState } from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react'; // Dynamic Icons

export default function SolutionsServicesList({ data }) {
    const [activeTab, setActiveTab] = useState(0);

    if (!data || !data.tabs) return null;

    const currentTab = data.tabs[activeTab];

    // Helper to render dynamic icon
    const renderIcon = (iconName) => {
        const IconComponent = LucideIcons[iconName] || LucideIcons.Zap;
        return <IconComponent size={24} />;
    };

    return (
        <section className="py-20 bg-slate-50" id="services-list">
            <div className="max-w-7xl mx-auto px-6 ">

                {/* 1. Common Title (Center Aligned) */}
                <CommonTitle
                    align="center"
                    title={data.title}
                    subtitle={data.subtitle}
                />

                {/* 2. Dynamic Tabs (Mobile: Horizontal Scroll, Desktop: Center Wrap) */}
                <div className="flex overflow-x-auto lg:flex-wrap justify-start lg:justify-center gap-4 mb-16 pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {data.tabs.map((tab, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveTab(idx)}
                            // flex-shrink-0 aur snap-start lagaya taaki button dab na jaye aur smooth scroll ho
                            className={`flex-shrink-0 snap-start px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${activeTab === idx
                                    ? "bg-sky-600 text-white border-sky-600 shadow-lg shadow-sky-200"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-sky-400 hover:text-sky-500"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* 3. Main Content Grid */}
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-24 items-start">

                    {/* LEFT SIDE: Scrollable Stacking Cards */}
                    <div className="relative col-span-3 ">
                        {/* Tab Title & Description */}
                        <div className="mb-12 sticky top-24 z-10 bg-slate-50">
                            <CommonTitle
                                align="left"
                                title={currentTab.heading}
                                subtitle={currentTab.description}
                            />
                        </div>

                        {/* Stacking Items List */}
                        <div className="space-y-6 pb-20">
                            {currentTab.items?.map((item, idx) => (
                                // Sticky Card Logic: top-24 keeps it stuck while next card overlaps
                                <div
                                    key={idx}
                                    className="sticky top-64 bg-white p-6  rounded-xl border border-slate-100 shadow-sm shadow-slate-200/50 flex gap-6 transition-all duration-500 animate-fadeInUp"
                                    style={{ zIndex: idx + 1 }} // Ensures proper stacking order
                                >
                                    {/* Icon */}
                                    <div className="flex-shrink-0 w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center">
                                        {renderIcon(item.icon)}
                                    </div>

                                    {/* Text */}
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE: Sticky Image (Changes based on Tab) */}
                    <div className="hidden lg:block relative h-full col-span-2">
                        <div className="sticky top-24 transition-all duration-500 ease-in-out">
                            {/* Device Frame Logic */}
                            <div className={`relative mx-auto rounded-2xl  ${currentTab.isWeb ? "aspect-video rounded-xl " : "max-w-sm aspect-[3/5]"
                                }`}>

                                {/* Screen Image */}
                                <div className="relative w-full  h-full  ">
                                    <Image
                                        key={activeTab} // Key forces re-render animation on tab change
                                        src={currentTab.image || "/images/placeholder.png"}
                                        alt={currentTab.heading}
                                        fill
                                        // object-contain add kiya taaki notch wali image kate nahi
                                        className="object-contain animate-scaleIn"
                                    />
                                </div>

                                {/* Notch code here was completely REMOVED as per your request */}
                            </div>

                            {/* Decorative background blob behind image */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-sky-100/50 rounded-full blur-3xl -z-10 scale-110"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}