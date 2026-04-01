"use client";

import { Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Stats({ data }) {
    const { primaryColor, secondaryColor } = data.branding;

    return (
        <section className="bg-slate-50 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Team Stats */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group bg-white p-8 lg:p-10 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border-l-4"
                    style={{ borderColor: primaryColor }}
                >
                    {/* Background Soft Glow */}
                    <div
                        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.08] pointer-events-none"
                        style={{ backgroundColor: primaryColor }}
                    />
                    <div className="flex items-center justify-between relative z-10">
                        <div className="space-y-4">
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                <span className="w-4 h-[2px]" style={{ backgroundColor: secondaryColor }} />
                                {data.team.title}
                            </p>
                            <h3 className="text-3xl md:text-4xl font-black text-slate-900">
                                {data.team.size}
                            </h3>
                            <p className="text-slate-500 font-medium text-sm lg:text-base leading-relaxed">
                                {data.team.roles}
                            </p>
                        </div>
                        <div
                            className="w-16 h-16 rounded-xl flex items-center justify-center transition-colors group-hover:bg-opacity-20"
                            style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}
                        >
                            <Users size={32} />
                        </div>
                    </div>
                </motion.div>

                {/* Timeline Stats */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="group bg-white p-8 lg:p-10 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border-l-4"
                    style={{ borderColor: secondaryColor }}
                >
                    <div className="flex items-center justify-between">
                        <div className="space-y-4">
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                <span className="w-4 h-[2px]" style={{ backgroundColor: primaryColor }} />
                                Timeline
                            </p>
                            <h3 className="text-3xl md:text-4xl font-black text-slate-900">
                                {data.team.timeline}
                            </h3>
                            <p className="text-slate-500 font-medium text-sm lg:text-base leading-relaxed">
                                {data.team.duration}
                            </p>
                        </div>
                        <div 
                            className="w-16 h-16 rounded-xl flex items-center justify-center transition-colors group-hover:bg-opacity-20"
                            style={{ backgroundColor: `${secondaryColor}10`, color: secondaryColor }}
                        >
                            <Clock size={32} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
