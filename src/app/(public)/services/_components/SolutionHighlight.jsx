"use client";

import React, { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import * as FaIcons from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CommonTitle from "@/components/ui/CommonTitle";

// Icon mapping for dynamic icons
const iconMap = {
    FaMobileAlt: FaIcons.FaMobileAlt,
    FaHandSparkles: FaIcons.FaHandSparkles,
    FaHeadphones: FaIcons.FaHeadphones,
    FaDesktop: FaIcons.FaDesktop,
    FaShoppingCart: FaIcons.FaShoppingCart,
    FaBitcoin: FaIcons.FaBitcoin,
    FaSalesforce: FaIcons.FaSalesforce,
    FaRobot: FaIcons.FaRobot,
    FaCogs: FaIcons.FaCogs,
    FaRegFileCode: FaIcons.FaRegFileCode,
    FaBrain: FaIcons.FaBrain,
    FaShieldAlt: FaIcons.FaShieldAlt,
    FaLaptopCode: FaIcons.FaLaptopCode,
};

export default function SolutionHighlight({ data }) {
    const [activeIdx, setActiveIdx] = useState(0);

    if (!data || !data.tabs || data.tabs.length === 0) return null;

    const activeTab = data.tabs[activeIdx] || data.tabs[0];

    return (
        <section className="py-24 bg-white overflow-hidden" id="solution-highlight">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <CommonTitle
                    title={data.title || "Solutions"}
                    subtitle={data.subtitle}
                    align="center"
                />

                <div className="grid lg:grid-cols-12 gap-0 items-center mt-12 relative">
                    {/* Left Sidebar: Feature Tabs */}
                    <div className="lg:col-span-4 flex flex-col gap-4 relative z-20 lg:translate-x-6">
                        {data.tabs.map((tab, idx) => {
                            const Icon = iconMap[tab.iconName] || FaIcons.FaRobot;
                            const isActive = activeIdx === idx;
                            return (
                                <motion.div
                                    key={idx}
                                    onClick={() => setActiveIdx(idx)}
                                    whileHover={{ x: isActive ? 0 : 5 }}
                                    className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer flex items-center gap-5 border-2 ${isActive
                                        ? "bg-white border-sky-100 shadow-[0_15px_35px_rgba(14,165,233,0.1)] scale-105"
                                        : "bg-white border-transparent text-slate-400 hover:border-sky-50"
                                        }`}
                                >
                                    <div className={`p-3 rounded-xl transition-all duration-300 ${isActive ? "bg-sky-50 text-sky-500" : "bg-slate-50 text-slate-300"}`}>
                                        <Icon size={26} />
                                    </div>
                                    <h4 className={`text-lg font-bold tracking-tight transition-all duration-300 ${isActive ? "text-sky-600" : "text-slate-500"
                                        }`}>
                                        {tab.label}
                                    </h4>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right Content Area: Detailed Insight */}
                    <div className="lg:col-span-8 bg-[#4eb1f1] rounded-[2rem] p-8 md:p-14 text-white shadow-2xl shadow-sky-200/30 relative overflow-hidden min-h-[580px] flex flex-col lg:pl-20">
                        {/* Decorative Background Element */}
                        <div className="absolute -top-24 -right-12 w-80 h-80 bg-white/10 rounded-full blur-[80px] pointer-events-none"></div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIdx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="relative z-10 flex flex-col flex-1"
                            >
                                {/* Active Heading */}
                                <div className="flex items-center gap-4 mb-10">
                                    <span className="text-white/50 text-2xl font-light">→</span>
                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold leading-normal tracking-tight">
                                        {activeTab.fullTitle || activeTab.label}
                                    </h3>
                                </div>

                                {/* Feature Highlights */}
                                <div className="space-y-5 mb-12 flex-1">
                                    {(activeTab.features || []).map((feature, fIdx) => (
                                        <motion.div
                                            key={fIdx}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: fIdx * 0.05 }}
                                            className="flex items-start gap-4"
                                        >
                                            <div className="mt-1 flex-shrink-0">
                                                <Check size={20} strokeWidth={3} className="text-white" />
                                            </div>
                                            <p className="text-base md:text-lg font-semibold text-white/90 leading-snug">
                                                {feature}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Footer: Capabilities & Action */}
                                <div className="mt-auto pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-8">
                                    {/* Tech/Capability Icons */}
                                    <div className="flex flex-wrap items-center justify-center gap-6">
                                        {(activeTab.icons || []).map((iconObj, iIdx) => {
                                            const BottomIcon = iconMap[iconObj.iconName] || FaIcons.FaRobot;
                                            return (
                                                <div key={iIdx} className="flex flex-col items-center gap-2">
                                                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
                                                        <BottomIcon size={24} />
                                                    </div>
                                                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/60 text-center">
                                                        {iconObj.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Primary CTA */}
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-3 bg-white text-sky-500 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-sky-50 transition-all shadow-lg hover:-translate-y-1 active:scale-95 group"
                                    >
                                        Get In Touch
                                        <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
