"use client";

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function TestimonialSection({ data, branding }) {
    const { primaryColor } = branding;
    const [activeIndex, setActiveIndex] = useState(0);

    // Normalize data: expected an array from admin (Client's Client / End Users)
    const testimonials = Array.isArray(data?.testimonials) ? data.testimonials : [];

    if (testimonials.length === 0) return null;

    const current = testimonials[activeIndex];

    const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="py-12 sm:py-16 bg-white relative overflow-hidden">
            {/* Soft Background Accents */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full opacity-[0.03] pointer-events-none"
                style={{ background: `radial-gradient(circle, ${primaryColor}, transparent)` }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-4 mb-10 sm:mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
                        Voices Of Trust
                    </h2>
                    <div className="w-24 h-1.5 mx-auto rounded-full" style={{ backgroundColor: primaryColor }} />
                    <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto pt-2">
                        Real Results from real partnerships with real industry
                    </p>
                </motion.div>

                {/* Testimonial Carousel Container */}
                <div className="relative max-w-6xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.06)] overflow-hidden border border-slate-50 flex flex-col md:flex-row items-stretch min-h-[400px]"
                        >
                            {/* Left: Image Section */}
                            <div className="w-full md:w-[40%] relative min-h-[400px] md:min-h-full overflow-hidden">
                                <Image
                                    src={current.avatar || '/images/client-avatar.png'}
                                    alt={current.name}
                                    fill
                                    className="object-cover object-center "
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                            </div>

                            {/* Right: Content Section */}
                            <div className="w-full md:w-[60%] p-6 sm:p-10 flex flex-col justify-center relative">
                                <Quote
                                    className="absolute top-10 right-10 w-20 h-20 opacity-[0.05] -rotate-12"
                                    style={{ color: primaryColor }}
                                />

                                <div className="space-y-4 relative z-10">
                                    <p className="text-xl sm:text-2xl font-bold text-slate-700 leading-relaxed italic">
                                        "{current.review}"
                                    </p>

                                    <div className="space-y-2">
                                        <h4 className="text-2xl sm:text-3xl font-bold text-slate-900">
                                            {current.name}
                                        </h4>
                                        <p
                                            className="text-sm sm:text-base font-bold uppercase"
                                            style={{ color: primaryColor }}
                                        >
                                            {current.designation || "Project Client"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controls (Only if multiple testimonials) */}
                    {testimonials.length > 1 && (
                        <div className="flex items-center justify-center gap-6 mt-12">
                            <button
                                onClick={prev}
                                className="w-12 h-12 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-400 transition-all active:scale-95"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            {/* Dots */}
                            <div className="flex gap-2.5">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveIndex(i)}
                                        className={`h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8' : 'w-2.5 bg-slate-200 hover:bg-slate-300'}`}
                                        style={i === activeIndex ? { backgroundColor: primaryColor } : {}}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={next}
                                className="w-12 h-12 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-400 transition-all active:scale-95"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    )}

                    {/* Decorative Blobs */}
                    <div
                        className="absolute -bottom-10 -right-10 w-40 h-40 blur-[80px] opacity-20 -z-10"
                        style={{ backgroundColor: primaryColor }}
                    />
                    <div
                        className="absolute -top-10 -left-10 w-40 h-40 blur-[80px] opacity-20 -z-10"
                        style={{ backgroundColor: primaryColor }}
                    />
                </div>
            </div>
        </section>
    );
}
