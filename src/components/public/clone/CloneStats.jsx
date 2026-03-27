"use client";

import React from 'react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function CloneStats({ data }) {
    // Default stats if none provided
    const stats = data || [
        { number: "5+", label: "Years Of Experience" },
        { number: "450+", label: "Scalable & Swift Development" },
        { number: "100+", label: "Expert Developers" },
        { number: "100%", label: "Client Satisfaction" }
    ];

    return (
        <section className="py-16 bg-[#111827] overflow-clip">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <CommonTitle
                        title="Why Softkingo is the Best Mobile App development Company in India"
                        subtitle="Reasons To Choose Us"
                        center={true}
                    />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center group">
                            <div className="relative inline-block mb-4">
                                <div className="absolute inset-0 bg-sky-500/10 rounded-xl scale-0 group-hover:scale-110 transition-transform duration-300 -rotate-6"></div>
                                <h3 className="relative text-4xl md:text-5xl font-extrabold text-white tracking-tighter transition-colors group-hover:text-sky-400">
                                    {stat.number}
                                </h3>
                            </div>
                            <p className="text-sm md:text-md font-semibold text-slate-400 uppercase tracking-wide leading-normal">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
