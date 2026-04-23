"use client";

import React, { useState } from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ServiceProcess({ data }) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!data || !data.items || data.items.length === 0) return null;

    const items = data.items;

    // Helper to render dynamic icon
    const renderIcon = (iconName, color = "currentColor", size = 24) => {
        let IconComponent = LucideIcons[iconName];

        if (!IconComponent || typeof IconComponent === 'object' && !IconComponent.$$typeof && !IconComponent.render) {
            IconComponent = LucideIcons.Zap;
        }

        return <IconComponent size={size} style={{ color }} />;
    };

    return (
        <section className="py-8 md:py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                <CommonTitle
                    align="center"
                    title={data.title || "Our Development Process"}
                    subtitle={data.subtitle || "We follow a streamlined methodology to deliver high-quality digital products."}
                />

                {data.description && (
                    <div
                        className="max-w-3xl mx-auto text-center mt-6 text-slate-600 text-lg leading-relaxed animate-fadeIn"
                        dangerouslySetInnerHTML={{ __html: data.description }}
                    />
                )}

                <div className="mt-16 flex flex-row gap-3 sm:gap-4 h-[420px] overflow-x-auto no-scrollbar pb-4">
                    {items.map((item, idx) => {
                        const isActive = activeIndex === idx;

                        return (
                            <motion.div
                                key={idx}
                                layout
                                onMouseEnter={() => setActiveIndex(idx)}
                                className={`
                                    relative cursor-pointer transition-all duration-500 ease-out group
                                    flex-shrink-0 overflow-hidden rounded-xl md:rounded-xl border
                                    ${isActive
                                        ? 'w-[280px] sm:w-[480px] md:w-[700px] lg:w-[850px] bg-sky-50 border-sky-100'
                                        : 'w-[75px] sm:w-[100px] md:w-[200px] lg:w-[320px] bg-slate-50 border-slate-100 hover:bg-white hover:border-sky-100'}
                                `}
                            >
                                {/* Active State Content */}
                                <div className={`h-full flex flex-col p-5 sm:p-6 lg:p-8 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                    <div className="flex items-center gap-4 lg:gap-6 mb-2">
                                        <div className="space-y-1">
                                            <h3 className="text-lg sm:text-xl lg:text-3xl font-bold text-slate-900 whitespace-normal line-clamp-2 sm:line-clamp-none">
                                                {item.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className={`space-y-4 flex-grow transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                        <div
                                            className="text-slate-500 font-medium text-xs sm:text-sm lg:text-[17px] leading-relaxed max-w-2xl line-clamp-4 sm:line-clamp-none rich-text"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />

                                        {/* Dynamic Features/Bullets if available */}
                                        <div className="grid grid-cols-1 gap-2 sm:gap-2 mt-auto">
                                            {(item.bullets || []).map((tag, tIdx) => (
                                                <div key={tIdx} className="flex items-center gap-2 sm:gap-3 group/tag transition-transform hover:scale-105">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover/tag:bg-sky-500 transition-colors flex-shrink-0" />
                                                    <span className="text-xs sm:text-sm text-slate-400 group-hover/tag:text-slate-700 transition-colors truncate">
                                                        {tag}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Collapsed State Content */}
                                <div className={`absolute inset-0 flex flex-col items-center justify-center sm:justify-between py-8 px-2 sm:py-10 sm:px-4 transition-all duration-500 ${isActive ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white flex items-center justify-center shadow-sm transition-transform group-hover:rotate-12 mb-2 sm:mb-0">
                                        <div className="scale-75 sm:scale-100 text-sky-600 font-bold">
                                            {item.icon ? renderIcon(item.icon, "#0084d1", 24) : String(idx + 1).padStart(2, '0')}
                                        </div>
                                    </div>
                                    <div className="w-full text-center">
                                        <h3 className="text-[10px] sm:text-xs lg:text-xl font-bold text-sky-600 group-hover:text-sky-500 transition-colors line-clamp-3 sm:line-clamp-2 px-1">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Pagination Dots */}
                <div className="mt-8 sm:mt-12 flex justify-center gap-2">
                    {items.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-8 bg-sky-500' : 'w-2 bg-slate-200'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

