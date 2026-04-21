"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FindYourApp({ data, branding }) {
    const { primaryColor, secondaryColor } = branding;

    return (
        <section 
            className="relative overflow-hidden"
            style={{ 
                fontFamily: branding.primaryFont,
                backgroundColor: `${primaryColor}08`
            }}
        >
            {/* Soft Premium Glows for depth */}
            <div 
                className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-[0.08] pointer-events-none"
                style={{ background: `radial-gradient(circle, ${primaryColor}, transparent)` }} 
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] text-slate-900">
                            {data.findYourApp.title}
                        </h2>
                        <div className="w-20 h-1 rounded-full" style={{ backgroundColor: primaryColor }} />
                    </div>

                    <p className="text-lg md:text-xl text-slate-500 font-bold leading-relaxed max-w-xl">
                        {data.findYourApp.description || "Let's turn your idea into a success story. Our team is ready to build your next big venture."}
                    </p>

                    <div className="pt-8">
                        <Link
                            href={data.findYourApp.ctaUrl || "/contact"}
                            className="inline-flex items-center gap-3 px-12 py-5 rounded-xl font-bold uppercase text-xs transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] group"
                            style={{ 
                                backgroundColor: primaryColor,
                                color: '#fff'
                            }}
                        >
                            {data.findYourApp.ctaText || "Get Started Now"}
                            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative flex justify-center lg:justify-end"
                >
                    <div className="relative group perspective-1000">
                        {/* Shadow Glow */}
                        <div 
                            className="absolute inset-[10%] blur-[80px] opacity-[0.2] -z-10 group-hover:opacity-[0.3] transition-opacity duration-500"
                            style={{ backgroundColor: primaryColor }}
                        />
                        <motion.div 
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            whileHover={{ 
                                rotateY: -15, 
                                rotateX: 5,
                                scale: 1.05,
                                transition: { duration: 0.4 }
                            }}
                            className="relative h-[300px] sm:h-[380px] lg:h-[420px] w-auto aspect-[9/19] cursor-pointer"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <Image
                                src={data.findYourApp.mockup || data.hero.mockups[0]}
                                alt="Final CTA Mockup"
                                fill
                                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
                                priority
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
