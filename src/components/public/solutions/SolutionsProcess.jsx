"use client";
import React from 'react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function SolutionsProcess({ data }) {
    if (!data) return null;

    return (
        <section className="py-8 md:py-16 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <CommonTitle
                    align="center"
                    title="Development Process"
                    subtitle="From concept to launch, we follow a proven agile methodology."
                />

                <div className="relative mt-8 md:mt-12">
                    <div className="flex overflow-x-auto gap-6 md:gap-8 pb-12 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {data.steps?.map((step, idx) => (
                            <div
                                key={idx}
                                className="group relative flex-shrink-0 w-[85vw] sm:w-[320px] lg:w-[300px] snap-center pt-16"
                            >
                                {idx !== (data.steps?.length - 1) && (
                                    <div className="absolute top-8 left-1/2 w-[calc(100%+1.5rem)] md:w-[calc(100%+2rem)] border-t-[3px] border-dashed border-sky-300 z-0"></div>
                                )}

                                <div className="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-white border-[3px] md:border-4 border-sky-100 rounded-full flex items-center justify-center z-20 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-sky-500 group-hover:bg-sky-600">
                                    <span className="text-lg md:text-xl font-black text-sky-500 group-hover:text-white transition-colors duration-300">
                                        0{idx + 1}
                                    </span>
                                </div>

                                <div className="h-full bg-white pt-10 pb-8 px-5 md:px-6 rounded-3xl shadow-sm border border-slate-100 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative z-10">
                                    <div className="w-1.5 h-1.5 rounded-full bg-sky-200 mx-auto mb-4 group-hover:bg-sky-500 transition-colors"></div>
                                    <h4 className="text-base md:text-lg font-bold text-slate-900 mb-2 md:mb-3 group-hover:text-sky-700 transition-colors">
                                        {step.title}
                                    </h4>
                                    <div
                                        className="text-slate-600 text-sm md:text-base leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: step.description }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}