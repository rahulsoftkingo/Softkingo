"use client";

import React from 'react';
import { Check, X } from 'lucide-react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function CloneComparison({ data }) {
    const title = data?.title || "Why We Are No. 1";
    const subtitle = data?.subtitle || "We offer premium features and support that others don't.";

    const rows = data?.rows?.length > 0 ? data.rows : [
        { feature: "Launch Timeline", comp1: "1-2 Weeks", comp2: "3-4 Months" },
        { feature: "AI Integration", comp1: "Advanced Gemini/GPT", comp2: "Basic/None" },
        { feature: "Support", comp1: "24/7 Dedicated", comp2: "Email Only" },
        { feature: "Customization", comp1: "Fully Custom", comp2: "Limited" },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6">
                <div className="mb-16">
                    <CommonTitle
                        title={title}
                        subtitle={subtitle}
                        center={true}
                    />
                </div>

                <div className="overflow-hidden rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-sky-600/5">
                    <table className="w-full text-left bg-white border-collapse">
                        <thead>
                            <tr className="bg-slate-900 text-white">
                                <th className="p-6 md:p-8 text-lg font-black">Features</th>
                                <th className="p-6 md:p-8 text-center bg-sky-600">
                                    <span className="text-lg font-black">Softkingo</span>
                                </th>
                                <th className="p-6 md:p-8 text-center text-slate-400">
                                    <span className="text-lg font-black opacity-50">Others</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {rows.map((row, i) => (
                                <tr key={i} className="hover:bg-sky-50 transition-colors">
                                    <td className="p-6 md:p-8 font-bold text-slate-700">{row.feature}</td>
                                    <td className="p-6 md:p-8 text-center bg-sky-50/50">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
                                                <Check size={20} />
                                            </div>
                                            <span className="text-xs font-black text-sky-700 uppercase">{row.comp1}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 md:p-8 text-center">
                                        <div className="flex flex-col items-center gap-1 opacity-50">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                                                <X size={20} />
                                            </div>
                                            <span className="text-xs font-bold text-slate-500 uppercase">{row.comp2}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm font-bold text-slate-400">
                        * Comparison based on industry standards and past client feedback.
                    </p>
                </div>
            </div>
        </section>
    );
}
