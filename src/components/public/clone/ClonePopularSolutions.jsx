"use client";

import React from 'react';
import { motion } from 'framer-motion';
import CommonTitle from '@/components/ui/CommonTitle';

export default function ClonePopularSolutions({ data }) {
    const defaultItems = [
        { title: "Taxi Apps", image: "https://softkingo.com/uploads/solutions/taxi-mockup.png" },
        { title: "Food delivery Apps", image: "https://softkingo.com/uploads/solutions/food-mockup.png" },
        { title: "Job searching Apps", image: "https://softkingo.com/uploads/solutions/job-mockup.png" },
        { title: "Grocery Delivery Apps", image: "https://softkingo.com/uploads/solutions/grocery-mockup.png" },
    ];

    const items = data?.items?.length > 0 ? data.items : defaultItems;

    return (
        <section className="py-8 md:py-16 bg-[#F8FAFC] relative overflow-clip">
            <div className="max-w-7xl mx-auto px-6">
                <CommonTitle
                    title={data?.title || "Our Other Similar Clone App"}
                    subtitle={data?.subtitle || "Explore our wide range of ready-to-launch app clones tailored for your business needs."}
                    align="center"
                />

                {/* Desktop Grid / Mobile Scroll Container */}
                <div className="mt-16">
                    {/* Horizontal Scroll on Mobile, Grid on Desktop */}
                    <div className="flex lg:grid lg:grid-cols-4 gap-6 md:gap-10 overflow-x-auto lg:overflow-visible pb-12 lg:pb-0 scroll-smooth no-scrollbar snap-x snap-mandatory">
                        {items.slice(0, 8).map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 bg-white rounded-3xl p-8 lg:p-10 flex flex-col items-center min-h-[440px] lg:min-h-[480px] group hover:bg-slate-50 transition-all duration-500 overflow-hidden relative border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-sky-500/10 snap-center"
                            >
                                {/* Accent Circle behind Title */}
                                <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-[#2FB3E0]/5 rounded-full blur-2xl group-hover:bg-[#2FB3E0]/10 transition-colors"></div>

                                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 text-center mb-8 px-2 leading-tight group-hover:text-[#2FB3E0] transition-colors relative z-10">
                                    {item.title}
                                </h3>

                                {/* Mobile Mockup - Dramatic Half-Overflow Positioning */}
                                <div className="absolute bottom-0 left-0 right-0 flex justify-center translate-y-32 group-hover:translate-y-24 transition-all duration-700 ease-out">
                                    <div className="relative w-[85%] group-hover:scale-105 transition-transform duration-700">
                                        {/* Glass reflection effect */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(15,23,42,0.25)] group-hover:drop-shadow-[0_30px_70px_rgba(47,179,224,0.3)]"
                                        />
                                    </div>
                                </div>

                                {/* Subtle Brand Tag */}
                                <div className="absolute bottom-6 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-4 group-hover:translate-y-0">
                                    <span className="text-[10px] font-bold text-[#2FB3E0] tracking-widest uppercase bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                                        Ready to Launch
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Scroll Indicator (Optional but helpful) */}
                    <div className="flex justify-center gap-2 mt-8 lg:hidden">
                        {items.slice(0, Math.min(8, items.length)).map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
