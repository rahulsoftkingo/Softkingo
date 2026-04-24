"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export default function CloneInvestment({ data }) {
    const defaultTitle = "Why to invest in Clone App Development?";
    const defaultSubtitle = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

    const defaultItems = [
        {
            number: "462.5 million+",
            label: "Users by 2029",
            sublabel: "Rapid Market Growth"
        },
        {
            number: "$10.378 billion+",
            label: "Projected by 2029",
            sublabel: "Booming Industry, Limitless Potential"
        },
        {
            number: "462.5 million+",
            label: "Users by 2029",
            sublabel: "Global Demand on the Rise"
        }
    ];

    const items = data?.items?.length > 0 ? data.items : defaultItems;

    return (
        <section className="py-8 md:py-16 bg-white overflow-clip">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Grid */}
                <div className="grid lg:grid-cols-2 gap-12 mb-20 items-start">
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl lg:text-5xl font-bold text-slate-900 leading-normal"
                    >
                        <span className="text-[#2FB3E0]">Why to invest</span> in <br />
                        Clone App Development?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-slate-500 text-lg leading-relaxed"
                    >
                        {data?.subtitle || defaultSubtitle}
                    </motion.p>
                </div>

                {/* Investment Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-50 p-10 rounded-xl space-y-4 border border-slate-100 hover:border-[#2FB3E0]/30 transition-all group relative overflow-hidden"
                        >
                            {/* Floating Icon */}
                            <div className="absolute top-8 right-8 text-[#2FB3E0]/5 group-hover:text-[#2FB3E0]/10 transition-colors duration-500">
                                <TrendingUp size={80} strokeWidth={1} />
                            </div>
                            <h3 className="text-4xl font-bold text-[#2FB3E0] group-hover:scale-105 transition-transform duration-300">
                                {item.number}
                            </h3>
                            <div className="space-y-3 pt-2">
                                <p className="text-slate-900 text-lg">
                                    {item.label}
                                </p>
                                <p className="text-slate-500 ">
                                    {item.sublabel}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
