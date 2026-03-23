"use client";
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function IndustryWhyChooseCarousel({ items }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!items?.length) return null;

    return (
        <div className="relative">
            
            {/* Controls (Top Right) */}
            <div className="flex justify-end gap-3 mb-6 px-2">
                <button onClick={() => scroll('left')} className="p-3 rounded-full border border-slate-200 hover:bg-sky-50 hover:border-sky-200 text-slate-500 hover:text-sky-600 transition-all shadow-sm">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={() => scroll('right')} className="p-3 rounded-full border border-slate-200 hover:bg-sky-50 hover:border-sky-200 text-slate-500 hover:text-sky-600 transition-all shadow-sm">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Carousel Container */}
            <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10 px-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.map((item, i) => (
                    <div 
                        key={i} 
                        className="relative flex-shrink-0 w-[85%] md:w-[45%] lg:w-[30%] snap-start"
                    >
                        <div className="h-full p-8 bg-white rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            
                            {/* Icon/Number */}
                            <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                                <CheckCircle2 size={24} />
                            </div>

                            <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                                {item.title}
                            </h4>
                            
                            <p 
                                className="text-slate-600 text-sm leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: item.description }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}