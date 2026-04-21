"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TechStack({ data }) {
    const { primaryColor, secondaryColor, accentColor } = data.branding;

    return (
        <section className="relative overflow-hidden bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-3 mb-10"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
                        Technology & Tools
                    </h2>
                    <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: primaryColor }} />
                </motion.div>

                <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
                    {data.technologies.items.map((tech, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ y: -10 }}
                            className="group relative w-full max-w-[160px]"
                        >
                            <div className="relative z-10 aspect-square rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center justify-center p-6 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:border-transparent">

                                {/* Animated Hover Border */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 p-[2px]"
                                    style={{ background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})` }}
                                >
                                    <div className="w-full h-full bg-white rounded-[14px]" />
                                </div>

                                <div className="relative w-full h-full">
                                    <Image
                                        src={tech.icon}
                                        alt={tech.name}
                                        fill
                                        className="object-contain transition-all duration-500 scale-90 group-hover:scale-100"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 text-center">
                                <span
                                    className="text-[10px] font-bold uppercase text-slate-400 group-hover:text-slate-900 transition-colors duration-300"
                                    style={{ color: primaryColor }}
                                >
                                    {tech.name}
                                </span>
                            </div>

                            {/* Subtle Glow beneath card */}
                            <div
                                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-1/2 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                                style={{ backgroundColor: primaryColor }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
