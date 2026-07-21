"use client";

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function Results({ results, branding }) {
    const primaryColor = branding?.primaryColor || "#0369a1";   // sky-700
    const secondaryColor = branding?.secondaryColor || "#0c4a6e"; // sky-900
    const accentColor = branding?.accentColor || "#06b6d4";     // cyan-500

    return (
        <div style={{ fontFamily: branding?.primaryFont }}>
            {results.map((result, index) => (
                <section
                    key={index}
                    className="relative py-12 md:py-16 lg:py-20 bg-white overflow-hidden"
                >
                    <div className="container max-w-7xl mx-auto px-6 lg:px-12">
                        {/* Big card — gradient fully driven by branding colors */}
                        <div
                            className="relative rounded-[28px] px-6 sm:px-10 lg:px-16 pt-14 pb-32 sm:pb-40 shadow-2xl"
                            style={{
                                background: `linear-gradient(135deg, ${secondaryColor}, ${primaryColor})`,
                            }}
                        >
                            <div className="max-w-3xl mx-auto text-center space-y-5">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                                    {result.title || "Impact & Results"}
                                </h2>
                                <p className="text-sm sm:text-base leading-relaxed text-white/80">
                                    {result.description}
                                </p>

                            </div>
                        </div>

                        {/* Checklist cards — white, accentColor-driven icon/hover border,
                            pulled up to overlap the big card's bottom edge */}
                        <div className="relative -mt-24 sm:-mt-28 px-2 sm:px-4">
                            <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
                                {result.items.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group w-[220px] rounded-2xl bg-white p-6 space-y-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = accentColor)}
                                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
                                    >
                                        <div
                                            className="w-10 h-10 flex items-center justify-center rounded-full transition-colors"
                                            style={{ backgroundColor: `${accentColor}15` }}
                                        >
                                            <CheckCircle2 size={18} style={{ color: accentColor }} />
                                        </div>
                                        <p className="text-base font-semibold text-gray-900 leading-snug">
                                            {item}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}