"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Navigation, UserPlus, Share2, UserCheck, ShieldCheck, Settings, Layers, ChevronRight } from 'lucide-react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function CloneVerticalSuite({ data }) {
    // 1. Determine Tabs (Dynamic from data.tabs OR Legacy hardcoded)
    const rawTabs = data?.tabs && data.tabs.length > 0
        ? data.tabs.map((t, idx) => ({ id: `tab-${idx}`, label: t.label, ...t }))
        : [
            { id: 'user', label: 'User Panel', ...data?.user },
            { id: 'admin', label: 'Admin Panel', ...data?.admin },
            { id: 'advanced', label: 'Advanced Features', ...data?.advanced },
        ];

    // Filter out tabs that have no content (for legacy compatibility if some keys are missing)
    const tabs = rawTabs.filter(t => t.label && (t.description || (t.items && t.items.length > 0)));

    const [activeTabId, setActiveTabId] = useState(tabs[0]?.id || 'user');
    const [activeFeature, setActiveFeature] = useState(0);

    const currentTabContent = tabs.find(t => t.id === activeTabId) || tabs[0] || {
        description: "Dive into the realm of custom development, where panels are designed for simplicity and enjoyment.",
        image: "/images/solutions/tablet-mockup.png",
        items: []
    };

    // Default icons mapping if none provided
    const getIcon = (index) => {
        const icons = [Heart, MessageCircle, Navigation, UserPlus, Share2, UserCheck, ShieldCheck, Settings, Layers];
        const IconComponent = icons[index % icons.length];
        return <IconComponent size={20} />;
    };

    return (
        <section className="py-8 md:py-16 px-6 bg-slate-50 relative overflow-clip">
            <div className="max-w-7xl mx-auto px-6 text-center">

                <CommonTitle
                    title={data?.title || "Get a Robust and Customizable Tech Suite for Your Idea"}
                    subtitle={data?.subtitle || "Our custom development services stand out as a perfect match for your business needs."}
                    align="center"
                />

                {/* Tab Navigation */}
                <div className="inline-flex flex-wrap items-center justify-center p-2 bg-white rounded-xl shadow-xl shadow-sky-900/5 mb-12 mt-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTabId(tab.id);
                                setActiveFeature(0);
                            }}
                            onMouseEnter={() => {
                                setActiveTabId(tab.id);
                                setActiveFeature(0);
                            }}
                            className={`px-8 md:px-12 py-3.5 rounded-xl font-bold text-sm md:text-base transition-all duration-300 ${activeTabId === tab.id
                                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                                : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Intro Text */}
                <div className="max-w-2xl mx-auto mb-16 px-4">
                    <p className="text-slate-500 text-sm md:text-base font-medium italic">
                        {currentTabContent.description}
                    </p>
                </div>

                {/* Content Area */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 text-left">
                    {/* Features List */}
                    <div className="w-full lg:w-[45%] space-y-4">
                        <div className="space-y-4">
                            {(currentTabContent.items || []).map((feature, idx) => (
                                <motion.div
                                    key={`${activeTabId}-${idx}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    onMouseEnter={() => setActiveFeature(idx)}
                                    className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${activeFeature === idx
                                        ? 'bg-white border-white shadow-2xl shadow-sky-900/10 scale-[1.02]'
                                        : 'bg-white/40 border-transparent hover:bg-white/60'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-lg transition-colors duration-300 ${activeFeature === idx ? 'bg-sky-500 text-white' : 'bg-sky-100 text-sky-500'
                                            }`}>
                                            {getIcon(idx)}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={`text-lg font-extrabold mb-2 transition-colors ${activeFeature === idx ? 'text-slate-900' : 'text-slate-700'
                                                }`}>
                                                {feature.title}
                                            </h4>
                                            {activeFeature === idx && (
                                                <motion.p
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    className="text-slate-500 text-sm leading-relaxed"
                                                >
                                                    {feature.description}
                                                </motion.p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Image / Mockup Area */}
                    <div className="w-full lg:w-[55%] relative">
                        {/* Decorative Background for Image */}
                        <div className="absolute inset-0 bg-[#DDF3FF] rounded-3xl transform rotate-3 scale-95 opacity-50"></div>
                        <div className="absolute inset-0 bg-sky-100 rounded-3xl transform -rotate-2 scale-90 opacity-30"></div>

                        <motion.div
                            key={activeTabId}
                            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10 "
                        >
                            <div className="relative w-full flex justify-center">
                                <Image
                                    src={currentTabContent.image || "/images/solutions/tablet-mockup.png"}
                                    alt={tabs.find(t => t.id === activeTabId)?.label}
                                    width={800}
                                    height={800}
                                    className="w-full h-auto max-h-[600px] object-contain rounded-md"
                                />
                            </div>
                        </motion.div>

                        {/* Floating Decoration */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute -top-10 -right-10 w-24 h-24 bg-sky-400/20 blur-2xl rounded-full"
                        ></motion.div>
                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ repeat: Infinity, duration: 5 }}
                            className="absolute -bottom-10 -left-10 w-32 h-32 bg-sky-400/10 blur-3xl rounded-full"
                        ></motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
