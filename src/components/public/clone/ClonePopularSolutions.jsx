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
                    title={data?.title || "Popular App Solutions"}
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
                            className="bg-[#DFF7FF]/50 rounded-[2.5rem] p-8 flex flex-col items-center justify-between min-h-[400px] group hover:bg-[#DFF7FF] transition-colors duration-500 overflow-hidden"
                        >
                            <h3 className="text-2xl font-bold text-slate-900 text-center mb-6 px-4">
                                {item.title}
                            </h3>

                            <div className="w-full relative mt-auto transform group-hover:scale-105 transition-transform duration-500 flex justify-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-[85%] h-auto object-contain drop-shadow-2xl translate-y-4"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
