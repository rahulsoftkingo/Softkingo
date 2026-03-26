"use client";

import React, { useState } from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import Image from 'next/image';

export default function CloneTechStack({ data }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!data) return null;

  // Use default values if no data is provided from admin
  const defaultTabs = [
    { label: "Frontend", items: [{ name: "React", image: "/images/tech/react.png" }] },
    { label: "Backend", items: [{ name: "Node.js", image: "/images/tech/node.png" }] }
  ];

  const tabs = data.tabs?.length > 0 ? data.tabs : defaultTabs;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <CommonTitle
          align="center"
          title={data.title || "Technology Stack We Use"}
          gradientText={data.highlight}
          subtitle={data.subtitle || "The modern tools and frameworks power our solutions."}
        />

        {/* Scrollable Tab Navigation (Fix for mobile wrapping) */}
        <div className="mt-10 mb-16 relative">
          <div className="flex overflow-x-auto scrollbar-hide pb-2 gap-3 md:gap-4 snap-x snap-mandatory">
            <div className="flex gap-3 md:gap-4 mx-auto">
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-8 py-3 rounded-full text-sm font-black transition-all duration-300 border whitespace-nowrap snap-center ${activeTab === idx
                    ? "bg-[#2FB3E0] text-white border-[#2FB3E0] shadow-lg shadow-sky-900/20 transform scale-105"
                    : "bg-slate-50 text-slate-500 border-slate-200 hover:border-[#2FB3E0]/30 hover:text-[#2FB3E0] hover:bg-[#2FB3E0]/5"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Grid Display */}
        <div className="min-h-[200px]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 items-center justify-center">
            {tabs[activeTab]?.items?.map((tech, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center justify-center gap-4 p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100/50 hover:bg-white hover:shadow-2xl hover:shadow-sky-900/10 hover:border-[#2FB3E0]/20 transition-all duration-500"
              >
                <div className="relative w-12 h-12 md:w-16 md:h-16 group-hover:scale-110 transition-transform duration-500">
                  <Image
                    src={tech.image || "/images/placeholder-icon.png"}
                    alt={tech.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-sm font-bold text-slate-500 group-hover:text-[#2FB3E0] transition-colors">
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
