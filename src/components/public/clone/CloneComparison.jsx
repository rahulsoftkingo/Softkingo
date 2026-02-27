"use client";

import React from 'react';
import { Check, X, Smartphone, Brain, Globe, Database, Settings, ShieldCheck, Heart } from 'lucide-react';
import CommonTitle from '@/components/ui/CommonTitle';
import Image from 'next/image';

export default function CloneComparison({ data }) {
    const title = data?.title || "What Makes Us No. 1 Custom Application Development Company in India ?";
    const subtitle = data?.subtitle || "The cost to build an astrology app varies based on feature scope, personalization depth, platform selection, and astrology systems involved. We offer transparent pricing with flexible engagement models aligned to business needs.";

    const defaultRows = [
        { feature: "Basic Astrology App", icon: <Brain size={20} className="text-sky-500" />, sk: "100%", comp1: "50%", comp2: false },
        { feature: "Mid-Level Astrology App", icon: <Smartphone size={20} className="text-sky-500" />, sk: true, comp1: false, comp2: false },
        { feature: "Advanced Astrology App (AI-Powered)", icon: <Brain size={20} className="text-sky-500" />, sk: true, comp1: false, comp2: false },
        { feature: "Third-Party Integrations", icon: <Globe size={20} className="text-sky-500" />, sk: true, comp1: false, comp2: false },
        { feature: "Backend & API Development", icon: <Database size={20} className="text-sky-500" />, sk: true, comp1: false, comp2: false },
        { feature: "Maintenance & Updates", icon: <Settings size={20} className="text-sky-500" />, sk: true, comp1: false, comp2: false },
    ];

    const rows = data?.rows?.length > 0 ? data.rows : defaultRows;

    const StatusIcon = ({ value, isSK = false }) => {
        if (value === true || value === "true") {
            return (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isSK ? 'bg-white text-green-500 border-2 border-green-500' : 'bg-white text-red-400 border-2 border-red-200'}`}>
                    {isSK ? <Check size={20} strokeWidth={3} /> : <X size={20} strokeWidth={3} />}
                </div>
            );
        }
        if (value === false || value === "false") {
            return (
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-red-400 border-2 border-red-200">
                    <X size={20} strokeWidth={3} />
                </div>
            );
        }
        return <span className={`text-2xl font-black ${isSK ? 'text-green-500' : 'text-slate-300'}`}>{value}</span>;
    };

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <CommonTitle
                    title={title}
                    subtitle={subtitle}
                    align="center"
                />

                <div className="mt-20 relative px-4">
                    {/* Table Container */}
                    <div className="overflow-x-auto pb-10 scrollbar-hide">
                        <table className="w-full border-separate border-spacing-0 min-w-[800px]">
                            <thead>
                                <tr>
                                    <th className="py-8 px-6 text-left border-b border-slate-100">
                                        <span className="text-xl font-bold text-slate-800">Features</span>
                                    </th>
                                    <th className="py-8 px-6 text-center border-b border-slate-100 bg-[#B5EDFF] rounded-t-3xl border-x-2 border-t-2 border-[#B5EDFF] shadow-[-10px_0_20px_rgba(0,183,235,0.05)]">
                                        <div className="flex flex-col items-center gap-2">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="/logo.png" alt="Softkingo" className="h-8 object-contain" />
                                        </div>
                                    </th>
                                    <th className="py-8 px-6 text-center border-b border-slate-100">
                                        <span className="text-xl font-bold text-slate-800">Company 1</span>
                                    </th>
                                    <th className="py-8 px-6 text-center border-b border-slate-100">
                                        <span className="text-xl font-bold text-slate-800">Company 2</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, i) => {
                                    const IconComponent = {
                                        Brain: Brain,
                                        Smartphone: Smartphone,
                                        Globe: Globe,
                                        Database: Database,
                                        Settings: Settings,
                                        ShieldCheck: ShieldCheck,
                                        Heart: Heart
                                    }[row.iconKey] || ShieldCheck;

                                    return (
                                        <tr key={i} className="group">
                                            <td className="py-6 px-6 border-b border-slate-100">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center">
                                                        <IconComponent size={20} className="text-sky-500" />
                                                    </div>
                                                    <span className="text-lg font-bold text-slate-800">{row.feature}</span>
                                                </div>
                                            </td>
                                            <td className={`py-6 px-6 text-center border-b border-slate-100 bg-[#B5EDFF] border-x-2 border-[#B5EDFF] shadow-[-10px_0_20px_rgba(0,183,235,0.05)] ${i === rows.length - 1 ? 'rounded-b-3xl border-b-2' : ''}`}>
                                                <div className="flex justify-center">
                                                    <StatusIcon value={row.sk} isSK={true} />
                                                </div>
                                            </td>
                                            <td className="py-6 px-6 text-center border-b border-slate-100">
                                                <div className="flex justify-center">
                                                    <StatusIcon value={row.comp1} />
                                                </div>
                                            </td>
                                            <td className="py-6 px-6 text-center border-b border-slate-100">
                                                <div className="flex justify-center">
                                                    <StatusIcon value={row.comp2} />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Bottom Shadow Decoration */}
                    <div className="absolute -bottom-4 left-1/4 right-1/4 h-10 bg-sky-500/10 blur-3xl -z-10 rounded-full"></div>
                </div>
            </div>
        </section>
    );
}
