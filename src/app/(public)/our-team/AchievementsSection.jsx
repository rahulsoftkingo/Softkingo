"use client";

import React from "react";

const stats = [
    { value: "6+", label: "Years of Innovation" },
    { value: "350+", label: "Global Clients" },
    { value: "400+", label: "Projects Delivered" },
    { value: "15k+", label: "User Engagement" },

];

const AchievementsSection = () => {
    return (
        <section className="px-4 py-8 md:py-12">
            <div className="max-w-7xl mx-auto">
                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-sky-600 to-cyan-500 px-2 py-10 md:py-10 shadow-2xl shadow-sky-900/20">


                    <div className="absolute -top-10 -right-20 w-56 h-56 rounded-full border-[28px] border-white/10"></div>

                    <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-64 h-64 rounded-full border-[24px] border-white/10"></div>

                    <div className="relative z-10 text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
                            Our Achievements
                        </h2>
                        <p className="text-sky-50 text-base md:text-lg font-medium leading-relaxed">
                            Softkingo is a trusted software development company helping businesses build scalable, AI-powered digital solutions. Trusted by 350+ clients worldwide, we deliver secure, innovative, and high-performance software that drives growth.
                        </p>
                    </div>

                    <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mt-14 max-w-5xl mx-auto">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center justify-start text-center min-h-[110px]"
                            >
                                <div className="text-4xl md:text-5xl font-black text-white leading-none">
                                    {stat.value}
                                </div>

                                <div className="mt-3 text-sky-50 text-sm md:text-base font-medium leading-snug">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AchievementsSection;