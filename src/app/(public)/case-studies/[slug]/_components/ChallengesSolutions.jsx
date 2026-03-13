"use client";

import { motion } from 'framer-motion';

export default function ChallengesSolutions({ data, branding }) {
    const { primaryColor, secondaryColor, primaryFont } = branding;
    const { challenge, solution } = data;

    return (
        <section
            className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-white relative overflow-hidden"
            style={{ fontFamily: primaryFont }}
        >
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

                    {/* Left: Challenges */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl p-8 md:p-12 border border-slate-100 flex flex-col justify-center"
                        style={{ backgroundColor: `${primaryColor}08` }}
                    >
                        <div className="space-y-6 mb-8">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-normal text-slate-900">
                                The Challenges
                            </h2>
                            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: primaryColor }} />
                        </div>
                        <p className="text-lg md:text-xl text-slate-600 font-bold leading-relaxed">
                            {challenge}
                        </p>
                    </motion.div>

                    {/* Right: Solutions Box */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl p-8 md:p-12 border border-slate-100 flex flex-col justify-center relative overflow-hidden"
                        style={{ backgroundColor: `${primaryColor}08` }}
                    >
                        {/* Decorative Background Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                            <div className="w-full h-full rounded-full blur-2xl" style={{ backgroundColor: primaryColor }} />
                        </div>

                        <div className="relative z-10 space-y-6">
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                                The Solution
                            </h3>
                            <div className="w-16 h-1 rounded-full" style={{ backgroundColor: primaryColor }} />
                            <p className="text-lg md:text-xl text-slate-600 font-bold leading-relaxed">
                                {solution}
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
