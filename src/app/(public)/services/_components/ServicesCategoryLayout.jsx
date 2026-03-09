"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Rocket, Code } from "lucide-react";
import * as FaIcons from "react-icons/fa";

// Duplicate iconMap for now, or move to a shared file later
const iconMap = {
    FaMobileAlt: FaIcons.FaMobileAlt,
    FaHandSparkles: FaIcons.FaHandSparkles,
    FaHeadphones: FaIcons.FaHeadphones,
    FaDesktop: FaIcons.FaDesktop,
    FaShoppingCart: FaIcons.FaShoppingCart,
    FaBitcoin: FaIcons.FaBitcoin,
    FaSalesforce: FaIcons.FaSalesforce,
    FaRobot: FaIcons.FaRobot,
    FaCogs: FaIcons.FaCogs,
    FaRegFileCode: FaIcons.FaRegFileCode,
};

export default function ServicesCategoryLayout({ categories }) {
    const [activeIdx, setActiveIdx] = useState(0);

    if (!categories || categories.length === 0) return null;

    const activeCat = categories[activeIdx] || categories[0];

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Tabs */}
            <div className="lg:w-1/3 space-y-3">
                {categories.map((cat, idx) => (
                    <div
                        key={idx}
                        onClick={() => setActiveIdx(idx)}
                        className={`p-6 rounded-2xl border transition-all cursor-pointer group hover:border-sky-400 ${activeIdx === idx
                            ? 'bg-sky-500 border-sky-500 text-white shadow-xl shadow-sky-200'
                            : 'bg-white border-slate-100 text-slate-600'
                            }`}
                    >
                        <h4 className={`text-lg font-bold mb-1 ${activeIdx === idx ? 'text-white' : 'text-slate-900 group-hover:text-sky-600'}`}>
                            {cat.shortTitle}
                        </h4>
                        <p className={`text-sm ${activeIdx === idx ? 'text-sky-100' : 'text-slate-500'}`}>
                            {cat.shortDesc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Main Content Detail */}
            <div className="lg:w-2/3 bg-sky-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden min-h-[500px] flex flex-col justify-center shadow-2xl shadow-sky-200">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl scale-150 opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 blur-3xl scale-150 opacity-20"></div>

                <div className="relative z-10 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500" key={activeIdx}>
                    <div>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 !leading-tight">{activeCat?.fullTitle}</h3>
                        <p className="text-sky-50 text-base md:text-lg leading-relaxed max-w-2xl opacity-90">{activeCat?.fullDesc}</p>
                    </div>

                    <div className="space-y-4">
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-sky-200 bg-sky-600 w-fit px-3 py-1 rounded-full border border-sky-400/30">
                            Certified Tech Expertise
                        </h5>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {(activeCat?.expertise || []).map((exp, idx) => {
                                const Icon = iconMap[exp.iconName] || Code;
                                return (
                                    <div key={idx} className="bg-white rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3 group transition-all hover:-translate-y-2 hover:shadow-xl shadow-sky-900/10 h-32">
                                        <div className="text-sky-500 text-3xl group-hover:scale-110 transition-transform">
                                            <Icon />
                                        </div>
                                        <span className="text-[11px] font-black text-slate-800 leading-tight uppercase tracking-tight">{exp.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-4 pt-8 border-t border-white/10">
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-sky-200">Advanced Product Suite</h5>
                        <div className="flex flex-wrap items-center gap-10">
                            {(activeCat?.products || []).map((prod, idx) => (
                                <div key={idx} className="flex items-center gap-3 group cursor-pointer transition-all hover:scale-105">
                                    {prod.image ? (
                                        <div className="w-10 h-10 relative group-hover:brightness-110">
                                            <Image src={prod.image} alt={prod.name} fill className="object-contain filter brightness-0 invert" />
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                            <Rocket size={20} />
                                        </div>
                                    )}
                                    <span className="font-black text-2xl tracking-tighter uppercase">{prod.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
