"use client";
import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

export default function SolutionsAppModule({ data, reverse = false, bg = "white" }) {
    if (!data) return null;

    return (
        <section className={`py-8 md:py-16 overflow-hidden ${bg === 'gray' ? 'bg-slate-50' : 'bg-white'}`}>
            <div className="container mx-auto px-6 lg:px-12">
                <div className={`flex flex-col lg:flex-row items-center gap-16 ${reverse ? 'lg:flex-row-reverse' : ''}`}>

                    {/* Content Side */}
                    <div className="flex-1 space-y-8 w-full">
                        <div className="inline-block px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                            {data.tag}
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-normal">
                            {data.title}
                        </h2>
                        <div
                            className="text-slate-600 text-lg"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        />

                        {/* Features Row - Horizontal Scroll added here */}
                        <div className="flex overflow-x-auto gap-4 pt-4 pb-2 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {data.features?.map((feat, i) => (
                                <div
                                    key={i}
                                    className="flex-shrink-0 snap-start flex items-center gap-3 p-3 pr-5 bg-white rounded-xl border border-slate-100 shadow-sm"
                                >
                                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    <span className="font-semibold text-slate-700 text-sm whitespace-nowrap">
                                        {feat}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Side */}
                    <div className="flex-1 relative w-full">
                        <div className={`relative z-10 w-full flex justify-center ${data.isWeb ? '' : 'max-w-sm mx-auto'}`}>
                            <Image
                                src={data.image || "/images/placeholder.png"}
                                alt={data.title}
                                width={800}
                                height={600}
                                className="w-full h-auto max-h-[550px] object-contain rounded-md"
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className={`absolute top-1/2 ${reverse ? 'left-0' : 'right-0'} -translate-y-1/2 w-96 h-96 bg-sky-200/50 rounded-full blur-3xl -z-0`}></div>
                    </div>

                </div>
            </div>
        </section>
    );
}