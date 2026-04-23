"use client";
import React, { useRef } from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import { DollarSign, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function SolutionsMonetization({ data }) {
    const scrollRef = useRef(null);

    if (!data) return null;

    // Scroll Handler
    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 400; // Card width + gap
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="py-8 md:py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header + Navigation Buttons */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="w-full md:w-auto text-center md:text-left mx-auto md:mx-0">
                        <CommonTitle
                            align="left"
                            title={data.title}
                            gradientText={data.highlight}
                            subtitle={data.subtitle}
                        />
                        {data.description && (
                            <div
                                className="mt-6 text-slate-600 text-lg leading-relaxed max-w-3xl"
                                dangerouslySetInnerHTML={{ __html: data.description }}
                            />
                        )}
                    </div>

                    {/* Carousel Buttons */}
                    <div className="flex gap-4 hidden md:flex pb-12">
                        <button
                            onClick={() => scroll('left')}
                            className="p-3 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-600 transition-all shadow-sm"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-3 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-600 transition-all shadow-sm"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {data.models?.map((item, idx) => (
                        <div
                            key={idx}
                            className="min-w-[320px] md:min-w-[400px] snap-center bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                        >
                            {/* Icon Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <DollarSign size={28} />
                                </div>
                                <span className="px-3 py-1 bg-slate-50 text-slate-500 text-xs font-bold rounded-full border border-slate-100">
                                    Model 0{idx + 1}
                                </span>
                            </div>

                            {/* Content */}
                            <h4 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                                {item.title}
                            </h4>
                            <div
                                className="text-slate-600 leading-relaxed mb-8"
                                dangerouslySetInnerHTML={{ __html: item.description }}
                            />

                            {/* Points List */}
                            <div className="mb-auto  border-t border-slate-50">
                                <ul className="space-y-3">
                                    {item.points?.map((point, pIdx) => (
                                        <li key={pIdx} className="flex items-start gap-3">
                                            <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm font-medium text-slate-700">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}