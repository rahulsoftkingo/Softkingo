"use client";
import React, { useState } from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import Image from 'next/image';

export default function SolutionsTechStack({ data }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!data) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 1. Common Title via Props */}
        <CommonTitle 
            align="center"
            title={data.title}
            gradientText={data.highlight}
            subtitle={data.subtitle}
        />
        
        {/* 2. Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-10 mb-16">
            {data.tabs?.map((tab, idx) => (
                <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                        activeTab === idx
                        ? "bg-sky-600 text-white border-sky-600 shadow-md transform scale-105"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-600"
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>

        {/* 3. Tech Grid Display */}
        <div className="min-h-[200px]">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 items-center justify-center animate-fadeIn">
                {data.tabs[activeTab]?.items?.map((tech, idx) => (
                    <div 
                        key={idx} 
                        className="group flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-sky-100 transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="relative w-12 h-12 md:w-16 md:h-16  group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:scale-110">
                            {/* Tech Logo */}
                            <Image 
                                src={tech.image || "/images/placeholder-icon.png"} 
                                alt={tech.name} 
                                fill 
                                className="object-contain"
                            />
                        </div>
                        <span className="text-sm font-semibold text-slate-500 group-hover:text-sky-700 transition-colors">
                            {tech.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}