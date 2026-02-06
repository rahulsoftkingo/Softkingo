"use client";
import React, { useState } from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import { Check } from 'lucide-react';

export default function SolutionsAICapabilities({ data }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!data) return null;

  return (
    <section className="py-24 bg-slate-50" id="ai-capabilities">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 1. Common Heading */}
        <CommonTitle 
            align="center"
            title={data.title}
            gradientText={data.highlight}
            subtitle={data.subtitle}
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center mt-16">
            
            {/* 2. LEFT SIDE: Tabs Navigation (Controls) - 4 Cols */}
            <div className="lg:col-span-5 space-y-4">
                {data.items?.map((item, idx) => {
                    const isActive = activeTab === idx;
                    return (
                        <div 
                            key={idx}
                            onClick={() => setActiveTab(idx)}
                            className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border-l-4 ${
                                isActive 
                                ? "bg-white border-sky-500 shadow-md translate-x-2" 
                                : "bg-transparent border-slate-200 hover:bg-white hover:border-sky-200 hover:shadow-sm"
                            }`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className={`text-lg font-bold transition-colors ${isActive ? "text-sky-600" : "text-slate-700"}`}>
                                        {item.title}
                                    </h4>
                                   
                                </div>
                                {isActive && <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 3. RIGHT SIDE: Sticky Content Card (Display) - 7 Cols */}
            <div className="lg:col-span-7 relative h-full min-h-[400px]">
                <div className="sticky top-32">
                    <div className="relative bg-sky-50 rounded-sm p-6 md:p-12 overflow-hidden border border-sky-100 shadow-xl transition-all duration-500">
                        
                        {/* Background Giant Shadow Number */}
                        <div className="absolute top-0 right-0 text-[12rem] md:text-[15rem] font-black leading-none text-white/50 select-none pointer-events-none -mt-10 -mr-10 z-0">
                             0{activeTab + 1}
                        </div>

                        {/* Content Container */}
                        <div className="relative z-10 text-left animate-fadeIn">
                            
                            {/* Main Title */}
                            <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-6">
                                {data.items[activeTab]?.title}
                            </h3>
                            
                            {/* Description */}
                            <p className="text-slate-600 text-md leading-relaxed mb-8 max-w-lg">
                                {data.items[activeTab]?.description}
                            </p>

                            {/* Points List */}
                            <div className="">
                                <h5 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">Key Capabilities</h5>
                                <div className="grid sm:grid-cols-1 gap-4">
                                    {data.items[activeTab]?.points?.map((point, pIdx) => (
                                        <div key={pIdx} className="flex items-start gap-3">
                                            <div className="mt-1 p-1 shadow-2xl rounded-full text-sky-100 bg-sky-600 flex-shrink-0">
                                                <Check size={14} strokeWidth={3} />
                                            </div>
                                            <span className="text-slate-700 font-medium text-sm md:text-base">{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Decorative Blob */}
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-200/30 rounded-full blur-3xl -z-0 translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}