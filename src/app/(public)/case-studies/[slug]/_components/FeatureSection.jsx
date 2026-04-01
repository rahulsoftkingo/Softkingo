"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

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
    isDark = false
}) {
    const { primaryColor, secondaryColor, accentColor } = branding;

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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative z-10">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: imagePosition === 'right' ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={`space-y-10 ${imagePosition === 'right' ? '' : 'lg:order-2'}`}
                    >
                        <div className="space-y-6">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-normal text-slate-900">
                                {title}
                            </h2>
                            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: primaryColor }} />
                        </div>

                        {description && (
                            <p className="text-lg leading-relaxed font-bold text-slate-600">
                                {description}
                            </p>
                        )}

                        {listItems && listItems.length > 0 && (
                            <ul className="space-y-6">
                                {listItems.map((item, idx) => (
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
                                            style={{ color: primaryColor }}
                                        >
                                            ▸
                                        </span>
                                        <div className="space-y-1 pt-1">
                                            {typeof item === 'string' ? (
                                                <p className="font-bold text-lg text-slate-700 leading-relaxed">{item}</p>
                                            ) : (
                                                <>
                                                    <h4 className="font-black text-lg text-slate-900">{item.title}</h4>
                                                    <p className="text-base font-bold text-slate-500 leading-relaxed">{item.description}</p>
                                                </>
                                            )}
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
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
