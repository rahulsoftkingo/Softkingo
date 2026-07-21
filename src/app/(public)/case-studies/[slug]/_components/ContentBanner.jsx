"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ContentBanner({ data, branding }) {
    const { primaryColor, secondaryColor } = branding;

    return (
        <section
            className="relative"
            style={{ fontFamily: branding.primaryFont }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-visible rounded-[28px] px-6 sm:px-10 lg:px-16 py-14 sm:py-16 lg:py-20"
                    style={{
                        background: secondaryColor
                            ? `linear-gradient(120deg, ${primaryColor}, ${secondaryColor})`
                            : primaryColor,
                    }}
                >
                    {/* Soft inner glow for depth */}
                    <div
                        className="absolute inset-0 rounded-[28px] pointer-events-none"
                        style={{
                            background: `radial-gradient(circle at 15% 30%, rgba(255,255,255,0.12), transparent 55%)`,
                        }}
                    />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-6 items-center">
                        {/* Mockup image — bleeds above and below the card, same as reference */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative order-2 lg:order-1 flex justify-center lg:justify-start"
                        >
                            <div className="relative group perspective-1000 w-[220px] sm:w-[280px] lg:w-[340px] h-[260px] sm:h-[340px] lg:h-[420px]  -mt-24 sm:-mt-32 lg:-mt-40 -mb-14 sm:-mb-16 lg:-mb-20">
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    whileHover={{
                                        rotateY: -15,
                                        rotateX: 5,
                                        scale: 1.05,
                                        transition: { duration: 0.4 }
                                    }}
                                    className="relative w-full h-full cursor-pointer"
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <Image
                                        src={data.findYourApp.mockup || data.hero.mockups[0]}
                                        alt="Final CTA Mockup"
                                        fill
                                        className="object-contain object-bottom drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)]"
                                        priority
                                    />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Copy */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="order-1 lg:order-2 space-y-5 text-center lg:text-left"
                        >
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-white">
                                {data.findYourApp.title}
                            </h2>

                            <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                {data.findYourApp.description || "Let's turn your idea into a success story. Our team is ready to build your next big venture."}
                            </p>

                            <div className="pt-2">
                                <Link
                                    href={data.findYourApp.ctaUrl || "/contact"}
                                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white border-2 border-white/80 transition-all duration-300 hover:bg-white hover:text-slate-900 group"
                                >
                                    {data.findYourApp.ctaText || "Get Started Now"}
                                    <ArrowRight
                                        size={18}
                                        className="group-hover:translate-x-1 transition-transform"
                                    />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}