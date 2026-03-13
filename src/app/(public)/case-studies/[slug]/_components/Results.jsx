"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Results({ results, branding }) {
    const { primaryColor, accentColor, secondaryColor } = branding;

    return (
        <div className="bg-white">
            {results.map((result, index) => (
                <section
                    key={index}
                    className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-12 border-b border-slate-50 last:border-none relative overflow-hidden"
                >
                    {/* Background Soft Glow */}
                    <div 
                        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.08] pointer-events-none"
                        style={{ backgroundColor: primaryColor }}
                    />

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Mockup Column */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className={`relative flex justify-center ${result.position === "right" ? "lg:order-2" : ""}`}
                        >
                            <div className="relative h-[400px] sm:h-[500px] w-auto aspect-[9/19]">
                                {/* Primary Shadow Glow for Mockup */}
                                <div 
                                    className="absolute inset-[10%] blur-[80px] opacity-25 -z-10"
                                    style={{ backgroundColor: primaryColor }}
                                />
                                <Image
                                    src={result.mockup}
                                    alt="Result Mockup"
                                    fill
                                    className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
                                />
                            </div>
                        </motion.div>

                        {/* Content Column */}
                        <motion.div 
                            initial={{ opacity: 0, x: result.position === "right" ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`space-y-8 ${result.position === "right" ? "lg:order-1" : ""}`}
                        >
                            <div className="space-y-6">
                                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                                    Results Delivered
                                </h3>
                                <div className="w-20 h-1 rounded-full" style={{ backgroundColor: primaryColor }} />
                            </div>

                            <ul className="space-y-5">
                                {result.items.map((item, idx) => (
                                    <motion.li 
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex gap-4 group"
                                    >
                                        <span 
                                            className="text-2xl flex-shrink-0 transition-transform group-hover:scale-125"
                                            style={{ color: accentColor || primaryColor }}
                                        >
                                            ▸
                                        </span>
                                        <p className="font-bold text-lg text-slate-700 leading-relaxed">
                                            {item}
                                        </p>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </section>
            ))}
        </div>
    );
}
