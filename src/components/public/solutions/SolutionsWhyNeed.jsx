"use client";

import React, { useState } from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SolutionsWhyNeed({ data }) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!data || !data.items || data.items.length === 0) return null;

    const items = data.items;

    // Helper to render dynamic icon
    const renderIcon = (iconName, color = "currentColor", size = 24) => {
        let IconComponent = LucideIcons[iconName];

        // Ensure IconComponent is a valid React element type (string or function/object)
        // If not found or if it's the module object itself, fallback to Zap
        if (!IconComponent || typeof IconComponent === 'object' && !IconComponent.$$typeof && !IconComponent.render) {
            IconComponent = LucideIcons.Zap;
        }

        return <IconComponent size={size} style={{ color }} />;
    };

    return (
        <section className="py-24 sm:py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <CommonTitle
                    align="center"
                    title={data.title || "Key Reasons For Development"}
                    subtitle={data.subtitle || "Exploring the critical advantages and strategic value for your business."}
                />

                <div className="mt-16 flex flex-row gap-4 h-[420px] overflow-x-auto no-scrollbar pb-4">
                    {items.map((item, idx) => {
                        const isActive = activeIndex === idx;

                        return (
                            <motion.div
                                key={idx}
                                layout
                                onMouseEnter={() => setActiveIndex(idx)}
                                className={`
                                    relative cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group
                                    flex-shrink-0 overflow-hidden rounded-[2.5rem] border
                                    ${isActive
                                        ? 'w-[300px] sm:w-[500px] md:w-[850px] bg-sky-50 border-sky-100 shadow-[0_40px_80px_-15px_rgba(14,165,233,0.1)]'
                                        : 'w-[80px] sm:w-[120px] md:w-[320px] bg-slate-50 border-slate-100 hover:bg-white hover:border-sky-100 hover:shadow-xl'}
                                `}
                            >
                                {/* Background Decorative Element for Active Card */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="absolute -top-24 -right-24 w-64 h-64 bg-sky-400/10 blur-[100px] rounded-full pointer-events-none"
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Active State Content */}
                                <div className={`h-full flex flex-col p-8 md:p-12 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                    <div className="flex items-center gap-6 mb-8 whitespace-nowrap">
                                        <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                            {renderIcon(item.icon, "#0EA5E9", 32)}
                                        </div>
                                        <div className="space-y-1">

                                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 ">
                                                {item.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className={`space-y-8 flex-grow transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                        <div
                                            className="text-slate-600 font-bold text-md md:text-lg leading-relaxed max-w-2xl"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />

                                        {/* Dynamic Features/Bullets if available */}
                                        <div className="grid grid-cols-1 gap-4 mt-auto">
                                            {(item.bullets || ['Strategic Growth', 'Scalable Architecture', 'Premium Design', '24/7 Support']).map((tag, tIdx) => (
                                                <div key={tIdx} className="flex items-center gap-3 group/tag transition-transform hover:scale-105">
                                                    <div className="w-2 h-2 rounded-full bg-sky-500 flex-shrink-0" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover/tag:text-sky-600 transition-colors">{tag}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Collapsed State Content (Desktop) */}
                                <div className={`absolute inset-0 flex flex-col items-center justify-between py-10 px-4 transition-all duration-500 ${isActive ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm transition-transform group-hover:rotate-12">
                                        {renderIcon(item.icon, "#94A3B8", 24)}
                                    </div>
                                    <div className="w-full text-center">
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-tighter group-hover:text-sky-500 transition-colors line-clamp-2 px-2">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Pagination Dots */}
                <div className="mt-12 flex justify-center gap-2">
                    {items.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-8 bg-sky-500' : 'w-2 bg-slate-200'
                                }`}
                        />
                    ))}
                </div>
            </div>

        </section>
    );
}