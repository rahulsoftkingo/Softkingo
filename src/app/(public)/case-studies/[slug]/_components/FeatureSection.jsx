"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

/**
 * FeatureSection handles Overview, Requirements, Goals, and Challenges.
 * It uses a flexible layout that alternates between left-image and right-image.
 */
export default function FeatureSection({
    title,
    description,
    listItems,
    mockup,
    bgImage,
    imagePosition = 'right',
    branding,
    isDark = false,
    client,
}) {
    const { primaryColor, secondaryColor, accentColor, colors } = branding;
    const [activeFeat, setActiveFeat] = useState(0);

    // Premium Light Design strategy for consistency and readability
    return (
        <section
            className={`relative overflow-hidden ${isDark ? 'bg-slate-50/50' : 'bg-white'} text-slate-900`}
            style={{ fontFamily: branding.primaryFont }}
        >
            {/* Soft Brand Glow Accents */}
            {isDark && (
                <>
                    <div
                        className="absolute -top-24 -left-24 w-[600px] h-[600px] opacity-[0.08] blur-[150px] pointer-events-none"
                        style={{ background: `radial-gradient(circle, ${primaryColor}, transparent)` }}
                    />
                    <div
                        className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-[0.05] blur-[120px] pointer-events-none"
                        style={{ background: `radial-gradient(circle, ${secondaryColor}, transparent)` }}
                    />
                </>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 relative z-10">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center`}>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: imagePosition === 'right' ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={`space-y-6 ${imagePosition === 'right' ? '' : 'lg:order-2'}`}
                    >
                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-normal text-slate-900">
                                {title}
                            </h2>
                            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: primaryColor }} />
                        </div>
                        {description && (
                            <p className="text-lg leading-relaxed font-bold font-sans text-slate-600">
                                {description}
                            </p>
                        )}
                        {/* {title === "Project Overview" && colors?.length > 0 && (
                            <div className="flex flex-wrap gap-6 pt-6">
                                {colors.map((color, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center shadow-lg">
                                            <div
                                                className="w-14 h-14 rounded-full border-4 border-white shadow-md"
                                                style={{ backgroundColor: color.hex }}
                                            />
                                        </div>

                                        <p className="mt-3 text-xs font-semibold text-slate-500 uppercase">
                                            {color.name}
                                        </p>
                                        <p className="text-[11px] text-slate-400">
                                            {color.hex}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )} */}
                        {/* {title === "Project Overview" && client && (
                            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={client.avatar}
                                        alt={client.name}
                                        width={60}
                                        height={60}
                                        className="rounded-full object-cover"
                                    />

                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900">
                                            {client.name}
                                        </h4>

                                        <p className="text-sm text-slate-500">
                                            {client.designation}
                                        </p>
                                    </div>
                                </div>

                                <p className="mt-4 text-slate-600 italic leading-relaxed">
                                    "{client.review}"
                                </p>
                            </div>
                        )} */}
                        {listItems && listItems.length > 0 && (
                            <div className="lg:max-h-[550px] overflow-y-auto pr-4 custom-scrollbar-stylish scroll-smooth">
                                <ul className="space-y-4">
                                    {listItems.map((item, idx) => {
                                        const isActive = activeFeat === idx;
                                        return (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.05 }}
                                                onMouseEnter={() => setActiveFeat(idx)}
                                                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer group ${isActive
                                                    ? 'bg-white shadow-xl border-slate-100 translate-x-1'
                                                    : 'bg-slate-50/50 border-transparent hover:bg-white hover:shadow-md'
                                                    }`}
                                            >
                                                <div className="flex gap-4">
                                                    <div
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-sky-500 text-white rotate-90 scale-110' : 'bg-slate-200 text-slate-500'
                                                            }`}
                                                        style={isActive ? { backgroundColor: primaryColor } : {}}
                                                    >
                                                        <ChevronRight size={18} strokeWidth={3} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className={`text-lg font-bold transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                                                            {typeof item === 'string' ? item : item.title}
                                                        </h4>

                                                        {isActive && typeof item !== 'string' && item.description && (
                                                            <div
                                                                className="mt-3 text-base text-slate-500 leading-relaxed font-medium animate-in fade-in slide-in-from-top-2 duration-300"
                                                                dangerouslySetInnerHTML={{ __html: item.description }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </motion.div>

                    {/* Image/Mockup Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className={`relative flex justify-center ${imagePosition === 'right' ? '' : 'lg:order-1'}`}
                    >
                        {mockup ? (
                            <div className="relative">
                                {/* Decorative Primary Glow Shadow */}
                                <div
                                    className="absolute inset-[10%] blur-[100px] opacity-30 -z-10"
                                    style={{ backgroundColor: primaryColor }}
                                />
                                <div className="relative h-[400px] sm:h-[500px] md:h-[600px] w-auto aspect-[9/19]">
                                    <Image
                                        src={mockup}
                                        alt={title}
                                        fill
                                        className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
                                    />
                                </div>
                            </div>
                        ) : bgImage ? (
                            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                                <Image src={bgImage} alt={title} fill className="object-cover" />
                                {/* Overlay Shadow for consistency */}
                                <div
                                    className="absolute inset-0 opacity-20"
                                    style={{ backgroundColor: primaryColor, mixBlendMode: 'multiply' }}
                                />
                            </div>
                        ) : null}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
