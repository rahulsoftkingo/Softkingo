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
        <section className="py-8 md:py-16 bg-white overflow-hidden" id="services-list">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

                    {/* LEFT COLUMN: Title & Description */}
                    <div className="lg:w-1/2 lg:sticky lg:top-32">
                        <CommonTitle
                            align="left"
                            title={sectionTitle}
                            subtitle={sectionSubtitle}
                        />


                    </div>

                    {/* RIGHT COLUMN: Cards with Scroll */}
                    <div className="lg:w-1/2 w-full">
                        <div className="grid grid-cols-1 gap-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar-stylish">
                            {services.map((service, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group bg-slate-50 rounded-3xl p-8 border border-slate-100 transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-sky-100 border-l-4 border-l-transparent hover:border-l-sky-500"
                                >
                                    <div className="space-y-6">
                                        {/* Icon Frame */}
                                        <div className="w-14 h-14 rounded-2xl bg-white text-sky-600 flex items-center justify-center shadow-sm border border-slate-100 group-hover:bg-sky-600 group-hover:text-white transition-all duration-500">
                                            {renderIcon(service.icon || service.items?.[0]?.icon)}
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                                                {service.label || service.title || service.heading}
                                            </h3>
                                            <div
                                                className="text-slate-500 text-sm md:text-base leading-relaxed rich-text opacity-90"
                                                dangerouslySetInnerHTML={{ __html: service.description || service.subtitle }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
