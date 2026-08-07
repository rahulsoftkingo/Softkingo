"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, Quote, X, MessageSquareQuote } from 'lucide-react';

/**
 * FeatureSection1 = Branding (left) + FeatureSection text/list (right)
 */
export default function FeatureSection1({
    title,
    description,
    listItems,
    mockup,
    bgImage,
    branding = {},
    client,
    isDark = false,
}) {
    const { primaryColor, secondaryColor, primaryFont, colors } = branding;
    const [activeFeat, setActiveFeat] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section
            className={`relative overflow-hidden ${isDark ? 'bg-slate-50/50' : 'bg-white'} text-slate-900`}
            style={{ fontFamily: primaryFont }}
        >
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

                    {/* LEFT: Branding Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5"
                    >
                        <div className="relative">
                            <div className="relative w-32 h-32 lg:w-36 lg:h-36 rounded-2xl overflow-hidden border-4 border-slate-50 shadow-xl bg-slate-50 flex items-center justify-center font-bold text-2xl text-slate-400">
                                {client?.avatar ? (
                                    <img src={client.avatar} alt={client.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span>{client?.name ? client.name.charAt(0) : "C"}</span>
                                )}
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsModalOpen(true)}
                                className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center border border-slate-100"
                                style={{ color: primaryColor }}
                            >
                                <MessageSquareQuote className="w-4 h-4" />
                            </motion.button>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                                {client?.name}
                            </h3>
                            <div className="w-14 h-1 rounded-full mx-auto lg:mx-0" style={{ backgroundColor: primaryColor }} />
                            <p className="text-sm font-bold tracking-wide" style={{ color: secondaryColor }}>
                                {client?.designation || client?.subtitle}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                            {client?.location && (
                                <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-bold tracking-wider uppercase text-slate-500">
                                    {client.location}
                                </span>
                            )}
                            {client?.industry && (
                                <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-bold tracking-wider uppercase text-slate-500">
                                    {client.industry}
                                </span>
                            )}
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:opacity-70 transition-opacity"
                            style={{ color: primaryColor }}
                        >
                            <span>View Testimonial</span>
                            <div className="h-[2px] w-6 rounded-full" style={{ backgroundColor: primaryColor }} />
                        </button>

                        {colors?.length > 0 && (
                            <div className="grid grid-cols-3 gap-3 pt-2 w-full max-w-[200px]">
                                {colors.map((color, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.08 }}
                                        className="text-center"
                                    >
                                        <div
                                            className="w-full aspect-square rounded-lg shadow-sm mb-1.5 border-2 border-slate-50"
                                            style={{ backgroundColor: color.hex }}
                                        />
                                        <p className="text-[8px] font-bold text-slate-400 tracking-wider uppercase">{color.hex}</p>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* RIGHT: Text / Feature List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 space-y-6"
                    >
                        <div className="space-y-3">
                            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.1] tracking-tight text-slate-900">
                                {title}
                            </h2>
                            <div className="w-16 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                        </div>

                        {description && (
                            <p className="text-base lg:text-lg leading-relaxed font-semibold text-slate-600">
                                {description}
                            </p>
                        )}

                        {listItems && listItems.length > 0 && (
                            <div className="lg:max-h-[500px] overflow-y-auto pr-3 custom-scrollbar-stylish scroll-smooth">
                                <ul className="space-y-3">
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
                                                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer group ${
                                                    isActive
                                                        ? 'bg-white shadow-xl border-slate-100 translate-x-1'
                                                        : 'bg-slate-50/50 border-transparent hover:bg-white hover:shadow-md'
                                                }`}
                                            >
                                                <div className="flex gap-3">
                                                    <div
                                                        className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center transition-all duration-500 ${
                                                            isActive ? 'bg-sky-500 text-white rotate-90 scale-110' : 'bg-slate-200 text-slate-500'
                                                        }`}
                                                        style={isActive ? { backgroundColor: primaryColor } : {}}
                                                    >
                                                        <ChevronRight size={16} strokeWidth={3} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className={`text-base font-bold tracking-tight transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                                                            {typeof item === 'string' ? item : item.title}
                                                        </h4>
                                                        {isActive && typeof item !== 'string' && item.description && (
                                                            <div
                                                                className="mt-2 text-sm text-slate-500 leading-relaxed font-medium animate-in fade-in slide-in-from-top-2 duration-300"
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

                </div>
            </div>

            {/* Testimonial Modal */}
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
                                        {[...Array(client?.rating || 5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed italic">
                                        "{client?.review}"
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 pt-8 border-t border-slate-100">
                                    <div className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-slate-50 shadow-md bg-slate-50 flex items-center justify-center font-bold text-slate-400">
                                        {client?.avatar ? (
                                            <img src={client.avatar} alt={client.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span>{client?.name ? client.name.charAt(0) : "C"}</span>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-slate-900">{client?.name}</h4>
                                        <p className="text-sm font-bold opacity-50">{client?.designation}</p>
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