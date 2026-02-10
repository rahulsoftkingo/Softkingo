"use client";
import React, { useState } from 'react';
import { ChevronRight, CheckCircle2, Layers } from 'lucide-react';
import Image from 'next/image';

export default function IndustryCoversTabs({ data }) {
    const [activeTab, setActiveTab] = useState(0);

    if (!data || !data.items) return null;

    const activeItem = data.items[activeTab];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Section Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                        {data.title || "What We Cover"}
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Explore our comprehensive services tailored for the industry.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl border border-slate-100 min-h-[500px]">
                    
                    {/* LEFT SIDE: TABS (Sky Background) */}
                    <div className="w-full lg:w-[35%] bg-sky-600 p-8 flex flex-col">
                        <div className="mb-6 flex items-center gap-3 text-sky-100 opacity-80">
                            <Layers size={20} />
                            <span className="text-xs font-bold uppercase tracking-widest">Service Areas</span>
                        </div>
                        
                        <div className="flex flex-col gap-2 overflow-y-auto custom-scrollbar flex-1">
                            {data.items.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTab(index)}
                                    className={`text-left px-6 py-5 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                                        activeTab === index 
                                        ? "bg-white text-sky-700 shadow-lg translate-x-2" 
                                        : "hover:bg-sky-500/50 text-sky-50 border border-transparent hover:border-sky-400"
                                    }`}
                                >
                                    <span className="font-bold text-lg">{item.title}</span>
                                    {activeTab === index && (
                                        <ChevronRight size={20} className="animate-in fade-in slide-in-from-left-2" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE: CONTENT (White Background) */}
                    <div className="w-full lg:w-[65%] bg-white p-8 md:p-12 flex flex-col justify-center relative">
                        
                        {/* Decorative Background Pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-bl-full -z-0 opacity-50"></div>

                        {/* Content Animation Wrapper */}
                        <div key={activeTab} className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            
                            <div className="flex items-start gap-6 mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shadow-sm flex-shrink-0">
                                    {/* Icon: Using generic icon if URL is not an image, or use image tag */}
                                    {activeItem.icon && activeItem.icon.includes('/') ? (
                                        <div className="relative w-8 h-8">
                                            <Image src={activeItem.icon} alt="icon" fill className="object-contain" />
                                        </div>
                                    ) : (
                                        <CheckCircle2 size={32} />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-slate-900 mb-2">
                                        {activeItem.title}
                                    </h3>
                                    <div className="h-1 w-20 bg-sky-500 rounded-full"></div>
                                </div>
                            </div>

                            <div className="prose prose-lg text-slate-600 leading-relaxed">
                                <p>{activeItem.description}</p>
                            </div>

                            <div className="mt-10 pt-8 border-t border-slate-100 flex gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Capabilities</span>
                                    <div className="flex gap-2 flex-wrap">
                                        {['Scalable', 'Secure', 'Customizable'].map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-full border border-slate-200">
                                                {tag}
                                            </span>
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