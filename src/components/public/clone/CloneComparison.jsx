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
        if (value === true || value === "true" || (isSK && value === "100%")) {
            return (
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 text-white shadow-sm">
                    <Check size={18} strokeWidth={3} />
                </div>
            );
        }
        return (
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-500 text-white shadow-sm">
                <X size={18} strokeWidth={3} />
            </div>
        );
    };

    return (
        <section className="py-8 md:py-16 bg-white overflow-clip">
            <div className="max-w-7xl mx-auto px-6">
                <CommonTitle
                    title={title}
                    subtitle={subtitle}
                    align="center"
                />

                <div className="mt-20 relative">
                    {/* Table Container */}
                    <div className="overflow-x-auto pb-10 scrollbar-hide">
                        <table className="w-full border-separate border-spacing-0 min-w-[800px]">
                            <thead>
                                <tr className="group">
                                    <th className="py-8 px-6 text-left border-b border-slate-100 pb-10">
                                        <span className="text-xl font-extrabold text-slate-900">Features</span>
                                    </th>
                                    <th className="relative py-8 px-6 text-center border-b border-slate-100 bg-[#DFF7FF] rounded-t-xl">
                                        <div className="flex flex-col items-center gap-2 relative z-10">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="/images/softkingo-logo.png" alt="Softkingo" className="h-7 object-contain" />
                                        </div>
                                        {/* Vertical Highlight Overlay for Header */}
                                        <div className="absolute inset-0 bg-[#DFF7FF] rounded-t-xl -z-10 shadow-[0_-10px_30px_rgba(30,174,219,0.1)]"></div>
                                    </th>
                                    <th className="py-8 px-6 text-center border-b border-slate-100 pb-10">
                                        <span className="text-xl font-extrabold text-slate-900 opacity-80">Company 1</span>
                                    </th>
                                    <th className="py-8 px-6 text-center border-b border-slate-100 pb-10">
                                        <span className="text-xl font-extrabold text-slate-900 opacity-80">Company 2</span>
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
                                                <div className="flex items-center gap-5">
                                                    <div className="w-11 h-11 rounded-xl bg-[#DFF7FF] flex items-center justify-center border border-sky-100 transition-transform group-hover:scale-110">
                                                        <IconComponent size={22} className="text-[#1EAEDB]" />
                                                    </div>
                                                    <span className="text-lg font-semibold text-slate-800 leading-normal">{row.feature}</span>
                                                </div>
                                            </td>
                                            <td className={`relative py-6 px-6 text-center border-b border-slate-100 bg-[#DFF7FF] ${i === rows.length - 1 ? 'rounded-b-xl shadow-[0_10px_30px_rgba(30,174,219,0.1)]' : ''}`}>
                                                {/* Softkingo Value Cell */}
                                                <div className="flex flex-col items-center justify-center relative z-10">
                                                    {row.sk === "100%" ? (
                                                        <span className="text-3xl font-extrabold text-[#1EAEDB] mb-2">100%</span>
                                                    ) : (
                                                        <StatusIcon value={row.sk} isSK={true} />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-6 px-6 text-center border-b border-slate-100">
                                                <div className="flex justify-center flex-col items-center gap-1">
                                                    {i === 0 ? <span className="text-xl font-bold text-slate-400">50%</span> : <StatusIcon value={row.comp1} />}
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
                </div>
            </div>
        </section>
    );
}
