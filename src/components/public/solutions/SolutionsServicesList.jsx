"use client";
import React from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';

export default function SolutionsServicesList({ data }) {
    if (!data) return null;

    // Use tabs, items or data directly
    const services = data.tabs || data.items || [];
    const sectionTitle = data.title || "Our Comprehensive Services";
    const sectionSubtitle = data.subtitle || data.description || "End-to-end solutions designed to scale your business.";

    // Helper to render dynamic icon
    const renderIcon = (iconName) => {
        const IconComponent = LucideIcons[iconName] || LucideIcons.Zap;
        return <IconComponent size={32} />;
    };

    return (
        <section className="py-16 md:py-24 bg-white" id="services-list">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                
                {/* Header */}
                <CommonTitle
                    align="center"
                    title={sectionTitle}
                    subtitle={sectionSubtitle}
                />

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 md:mt-24">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="relative group bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-sky-200/50 overflow-hidden"
                        >
                            {/* Decorative Glow */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-400/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-sky-400/10 transition-colors" />

                            <div className="relative z-10 space-y-6">
                                {/* Icon Frame */}
                                <div className="w-16 h-16 rounded-2xl bg-white text-sky-600 flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all duration-500">
                                    {renderIcon(service.icon || service.items?.[0]?.icon)}
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                                        {service.label || service.title || service.heading}
                                    </h3>
                                    <div 
                                        className="text-slate-500 text-sm md:text-base leading-relaxed line-clamp-5 rich-text"
                                        dangerouslySetInnerHTML={{ __html: service.description || service.subtitle }}
                                    />
                                </div>

                                {/* Learn More Hint */}
                                <div className="pt-4 flex items-center gap-2 text-sky-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                    View Details <LucideIcons.ArrowRight size={16} />
                                </div>
                            </div>

                            {/* Section Index */}
                            <div className="absolute bottom-6 right-8 text-4xl font-bold text-slate-200/50 select-none group-hover:text-sky-100 transition-colors">
                                {idx < 9 ? `0${idx + 1}` : idx + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}