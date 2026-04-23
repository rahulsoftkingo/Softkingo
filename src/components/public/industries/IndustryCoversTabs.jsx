"use client";
import React, { useState } from 'react';
import { ChevronRight, CheckCircle2, Layers } from 'lucide-react';
import Image from 'next/image';
import CommonTitle from '@/components/ui/CommonTitle';

export default function IndustryCoversTabs({ data }) {
    const [activeTab, setActiveTab] = useState(0);

    if (!data || !data.items) return null;

    const activeItem = data.items[activeTab];

    return (
        <section className="py-8 md:py-16  relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Heading */}
                <div className="text-center mb-16">

                    <CommonTitle
                        title={data.title || "What We Cover"}
                        subtitle={data.subtitle || "Explore our comprehensive services tailored for the industry."}
                        pill={true}
                        gradientText={data.gradientText || "Coverage"}
                    />
                </div>

                <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden min-h-[500px] borderborder-slate-100shadow-2xl">

                    {/* LEFT SIDE: TABS (Sky Background) */}
                    <div className="w-full lg:min-w-[40%] lg:w-fit bg-sky-500 p-8 flex flex-col">

                        <div className="flex flex-col gap-4 overflow-auto  flex-1  max-h-[500px]">
                            {data.items.map((item, index) => (
                                <button
                                    key={index}
                                    onMouseEnter={() => setActiveTab(index)}
                                    className={`text-left px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${activeTab === index
                                        ? "bg-white text-sky-700 shadow-lg translate-x-2 max-w-fit"
                                        : "hover:bg-sky-500/50 text-sky-50 border border-transparent hover:border-sky-400 max-w-fit "
                                        }`}
                                >
                                    <span className="font-bold text-base md:text-lg">{item.title}</span>
                                    {activeTab === index && (
                                        <ChevronRight size={20} className="animate-in fade-in slide-in-from-left-2" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE: CONTENT (White Background) */}
                    <div className="w-full lg:w-[65%] bg-white p-8 md:p-12 flex flex-col justify-center relative my-8">

                        {/* Decorative Background Pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-bl-full -z-0 opacity-50"></div>

                        {/* Content Animation Wrapper */}
                        <div key={activeTab} className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

                            <div className="flex items-start justify-between gap-6 mb-8">
                                <div>
                                    <h3 className="text-3xl font-bold text-slate-900 mb-2">
                                        {activeItem.title}
                                    </h3>
                                    <div className="h-1 w-20 bg-sky-500 rounded-full"></div>
                                </div>
                                <div className="w-18 h-18  flex items-center justify-center  flex-shrink-0">
                                    {/* Icon: Using generic icon if URL is not an image, or use image tag */}
                                    {activeItem.icon && activeItem.icon.includes('/') ? (
                                        <div className="relative w-18 h-18">
                                            <Image src={activeItem.icon} alt="icon" fill className="object-contain" />
                                        </div>
                                    ) : (
                                        <CheckCircle2 size={32} />
                                    )}
                                </div>

                            </div>

                            <div className="prose prose-lg text-slate-600 leading-relaxed">
                                <p className="rich-text" dangerouslySetInnerHTML={{ __html: activeItem.description }} />
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}