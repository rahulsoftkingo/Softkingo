"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, X, MessageSquareQuote } from 'lucide-react';

export default function Branding({ data }) {
    const { primaryColor, primaryFont, colors, secondaryColor, accentColor } = data.branding;
    const { client } = data;
    const [isModalOpen, setIsModalOpen] = useState(false);

    // UX Expert Note: Using the brand's primary font and strict 3-color palette.
    // Standardizing on 'rounded-xl' for a professional, premium feel.

    return (
        <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-white relative overflow-hidden" style={{ fontFamily: primaryFont }}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    {/* Left: Client Information */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left"
                    >
                        <div className="relative">
                            <div className="relative w-44 h-44 rounded-xl overflow-hidden border-4 border-slate-50 shadow-xl bg-slate-50">
                                {client.avatar && (
                                    <Image
                                        src={client.avatar}
                                        alt={client.name}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsModalOpen(true)}
                                className="absolute -bottom-2 -right-2 w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center border border-slate-100"
                                style={{ color: primaryColor }}
                            >
                                <MessageSquareQuote className="w-5 h-5" />
                            </motion.button>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-1">
                                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                                    {client.name}
                                </h3>
                                <div className="w-20 h-1 rounded-full mx-auto lg:mx-0" style={{ backgroundColor: primaryColor }} />
                                <p className="text-lg font-bold pt-4" style={{ color: secondaryColor }}>
                                    {client.designation || client.subtitle}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                <div className="px-4 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    {client.location}
                                </div>
                                <div className="px-4 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    {client.industry}
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="mt-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest hover:opacity-70 transition-opacity"
                                style={{ color: primaryColor }}
                            >
                                <span>View Testimonial</span>
                                <div className="h-[2px] w-8 rounded-full" style={{ backgroundColor: primaryColor }} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Right: Identity & Style Guide */}
                    <div className="space-y-8">
                        {/* Typography Card - Reverted to clean white/brand approach */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 rounded-xl p-10 border border-slate-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <span className="text-[120px] font-black leading-none" style={{ color: primaryColor }}>{primaryFont?.charAt(0)}</span>
                            </div>

                            <div className="relative z-10 space-y-4">
                                <div className="space-y-1">
                                    <p className="text-7xl font-black tracking-tighter" style={{ color: primaryColor }}>Aa</p>
                                    <p className="text-xl font-black text-slate-800">{primaryFont}</p>
                                </div>
                                <div className="w-12 h-1 rounded-full" style={{ backgroundColor: primaryColor }} />
                            </div>
                        </motion.div>

                        {/* Colors Palette Grid */}
                        <div className="grid grid-cols-3 gap-6">
                            {colors.map((color, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="text-center"
                                >
                                    <div 
                                        className="w-full aspect-square rounded-xl shadow-sm mb-3 border-2 border-slate-50"
                                        style={{ backgroundColor: color.hex }}
                                    />
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{color.hex}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Testimonial Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-white/80 backdrop-blur-xl"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-xl bg-white rounded-xl p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.1)] border border-slate-100"
                        >
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="space-y-8">
                                <Quote className="w-12 h-12" style={{ color: primaryColor }} />
                                
                                <div className="space-y-4">
                                    <div className="flex gap-1">
                                        {[...Array(client.rating || 5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed italic">
                                        "{client.review}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 pt-8 border-t border-slate-100">
                                    <div className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-slate-50 shadow-md">
                                        <Image
                                            src={client.avatar || '/images/client-avatar.png'}
                                            alt={client.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-black text-slate-900">{client.name}</h4>
                                        <p className="text-sm font-bold opacity-50">{client.designation}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
