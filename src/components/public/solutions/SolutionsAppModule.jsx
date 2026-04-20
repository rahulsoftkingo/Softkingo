"use client";
import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

export default function SolutionsAppModule({ data, reverse = false, bg = "white", componentOnly = false }) {
    if (!data) return null;

    const content = (
        <div className={`flex flex-col lg:flex-row items-stretch gap-12 lg:gap-24 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
            {/* Content Side */}
            <div className="flex-1 w-full py-4 flex flex-col">
                <div className="space-y-6 mb-12">
                    {data.tag && (
                        <div className="inline-block px-4 py-1.5 bg-sky-50 text-sky-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-sky-100">
                            {data.tag}
                        </div>
                    )}
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">
                        {data.title}
                    </h2>
                    {data.description && (
                        <div
                            className="text-slate-500 text-lg leading-relaxed max-w-2xl rich-text"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        />
                    )}
                </div>

                {/* Detailed Features List - Scrollable with Gradient Fade */}
                <div className="relative group/scroll flex-1 mt-4">
                    <div className="space-y-4 max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-4 custom-scrollbar-stylish pb-10">
                        {data.features?.map((feat, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-sky-500/5 hover:border-sky-200 transition-all duration-300 group animate-in fade-in slide-in-from-bottom-2"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                                    <Check size={22} strokeWidth={3} />
                                </div>
                                <div className="space-y-1.5">
                                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                                        {typeof feat === 'string' ? feat : feat.title}
                                    </h3>
                                    {feat.desc && (
                                        <div
                                            className="text-slate-500 text-sm leading-relaxed rich-text"
                                            dangerouslySetInnerHTML={{ __html: feat.desc }}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Bottom Fade Mask to indicate more content */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
                </div>
            </div>

            {/* Image Side - Sticky Preview */}
            <div className="flex-1 relative w-full lg:sticky lg:top-32 self-start py-8">
                <div className={`relative z-10 w-full flex justify-center ${data.isWeb ? '' : 'max-w-md mx-auto'}`}>
                    <div className="relative group/img">
                        <Image
                            src={data.image || "/images/placeholder.png"}
                            alt={data.title}
                            width={800}
                            height={1600}
                            className="w-full h-auto max-h-[750px] object-contain rounded-[2.5rem] "
                        />
                        {/* Dynamic Glow */}
                        <div className="absolute -inset-10 bg-sky-200/30 rounded-full blur-[80px] -z-10 group-hover/img:bg-sky-400/20 transition-all duration-700"></div>
                    </div>
                </div>
                {/* Decorative Background Accents */}
                <div className={`absolute top-1/2 ${reverse ? '-left-20' : '-right-20'} -translate-y-1/2 w-[500px] h-[500px] bg-sky-50 rounded-full blur-[120px] -z-0 opacity-40 pointer-events-none`}></div>
            </div>
        </div>
    );

    if (componentOnly) return content;

    return (
        <section className={`py-8 md:py-16 overflow-hidden ${bg === 'gray' ? 'bg-slate-50' : 'bg-white'}`}>
            <div className="container mx-auto px-6 lg:px-12">
                {content}
            </div>
        </section>
    );
}