"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CommonTitle from '@/components/ui/CommonTitle';
import SolutionsAppModule from './SolutionsAppModule';

export default function SolutionsAppModuleTabs({ data }) {
    const [activeTab, setActiveTab] = useState(0);

    if (!data || !data.tabs || data.tabs.length === 0) return null;

    return (
        <section className="py-8 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                
                {/* 1. Section Header */}
                {(data.title || data.subtitle) && (
                    <div className="mb-12">
                        <CommonTitle 
                            title={data.title || "Powerful App Modules"}
                            subtitle={data.subtitle}
                            align="center"
                        />
                    </div>
                )}

                {/* 2. Tab Navigation */}
                <div className="flex overflow-x-auto justify-start md:justify-center gap-0 mb-16 pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-[#F1F3F6] p-1.5 rounded-2xl w-fit mx-auto border border-slate-100">
                    {data.tabs.map((tab, idx) => (
                        <button
                            key={idx}
                            onMouseEnter={() => setActiveTab(idx)}
                            className={`px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 whitespace-nowrap snap-center ${activeTab === idx
                                ? "bg-sky-500 text-white shadow-md z-10"
                                : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                            }`}
                        >
                            {tab.tag || `Module ${idx + 1}`}
                        </button>
                    ))}
                </div>

                {/* 3. Module Display with Animation */}
                <div className="relative min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <SolutionsAppModule 
                                data={data.tabs[activeTab]} 
                                componentOnly={true} 
                                reverse={false} // Tabs usually look better with consistent alignment
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}
