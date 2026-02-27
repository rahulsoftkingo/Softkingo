"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Cpu } from 'lucide-react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function CloneAISolutions({ data }) {
    const defaultItems = [
        {
            title: "AI Personalization",
            description: "Deliver hyper-personalized fintech experiences with AI algorithms that analyze user behavior, spending patterns, and preferences to recommend tailored financial solutions."
        },
        {
            title: "Data Analytics",
            description: "Unlock deep insights from your data with advanced AI analytics that identify trends, optimize workflows, and drive informed business decisions."
        },
        {
            title: "Investment Advice",
            description: "Provide intelligent investment recommendations powered by AI that evaluates market conditions and user risk profiles for optimal returns."
        },
        {
            title: "Robo-Advisor",
            description: "Automate financial planning and investment management with AI-driven robo-advisors that offer low-cost, high-efficiency wealth management."
        },
        {
            title: "Predictive Insights",
            description: "Anticipate market shifts and user needs with predictive AI models that forecast future outcomes based on historical data patterns."
        },
        {
            title: "Fraud Detection & Security",
            description: "Enhance security and prevent financial crimes with real-time AI monitoring that detects suspicious activities and protects user assets."
        }
    ];

    const items = data?.items?.length > 0 ? data.items : defaultItems;
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                <CommonTitle
                    title={data?.title || "Ai Feature Solutions"}
                    subtitle={data?.subtitle || "Explore our premium fintech app features to enhance security, improve user experience, and ensure smooth financial management for your customers."}
                    align="center"
                />

                <div className="flex flex-col lg:flex-row items-stretch mt-16 rounded-[1rem] overflow-hidden  min-h-[500px]">

                    {/* Left Side: Sidebar Menu */}
                    <div className="w-full lg:w-[40%] bg-[#2FB3E0] p-4 lg:p-10 space-y-3 flex flex-col justify-center">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setActiveIndex(index)}
                                className={`group flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all duration-300 ${activeIndex === index
                                    ? 'bg-white/20 backdrop-blur-md shadow-none hover:shadow-xl hover:bg-white/25'
                                    : 'hover:bg-white/10 hover:shadow-xl'
                                    }`}
                            >
                                <span className={`text-lg font-bold transition-colors ${activeIndex === index ? 'text-white' : 'text-sky-100 group-hover:text-white'
                                    }`}>
                                    {item.title}
                                </span>
                                <ChevronRight className={`transition-transform duration-300 ${activeIndex === index ? 'text-white translate-x-1' : 'text-sky-200 group-hover:text-white group-hover:translate-x-1'
                                    }`} size={20} />
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Content Display (Slightly shorter) */}
                    <div className="w-full lg:w-[60%] bg-[#F9FBFC]/10 py-4 lg:py-8 flex flex-col justify-center">
                        <div className="bg-slate-100 rounded[2.5rem] p-6 lg:p-14 flex flex-col justify-center relative h-full r border border-white/20">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    {/* Floating Icon */}
                                    <div className="absolute top-12 right-12 text-sky-500/20">
                                        <Cpu size={120} strokeWidth={1} />
                                    </div>

                                    <div className="relative z-10">
                                        <h3 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">
                                            {items[activeIndex].title}
                                        </h3>
                                        <p className="text-slate-600 text-lg lg:text-xl font-medium leading-relaxed max-w-2xl">
                                            {items[activeIndex].description}
                                        </p>
                                    </div>

                                    {/* Bottom Glow Effect */}
                                    {/* <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-sky-200/30 blur-[100px] rounded-full"></div> */}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
