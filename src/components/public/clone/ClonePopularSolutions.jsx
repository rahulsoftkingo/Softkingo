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
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <CommonTitle
                    title={data?.title || "Our Other Similar Clone App"}
                    subtitle={data?.subtitle || "Explore our wide range of ready-to-launch app clones tailored for your business needs."}
                    align="center"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-[#DFF7FF] rounded-2xl p-8 pt-10 flex flex-col items-center min-h-[420px] group hover:bg-[#B5EDFF] transition-all duration-500 overflow-hidden relative"
                        >
                            <h3 className="text-2xl font-black text-slate-900 text-center mb-8 px-4 leading-tight">
                                {item.title}
                            </h3>

                            {/* Mobile Mockup - Lower Half Positioning */}
                            <div className="absolute bottom-0 left-0 right-0 flex justify-center translate-y-6 group-hover:translate-y-4 transition-transform duration-500">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-[85%] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_25px_50px_rgba(0,0,0,0.2)] transition-all"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
