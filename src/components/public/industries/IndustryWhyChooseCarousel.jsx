"use client";
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function IndustryWhyChooseCarousel({ items }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (!current) return;

        // Grab the first card to measure its real rendered width
        const card = current.querySelector('[data-carousel-card]');
        if (!card) return;

        const gap = 24; // matches gap-6 (6 * 4px = 24px)
        const cardWidth = card.getBoundingClientRect().width + gap;
        const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    if (!items?.length) return null;

    return (
        <div className="relative px-6">
            
            {/* Left Button - Half inside, half outside */}
            <button 
                onClick={() => scroll('left')} 
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 p-3 rounded-full border border-slate-200 bg-white hover:bg-sky-50 hover:border-sky-200 text-slate-500 hover:text-sky-600 transition-all shadow-md"
            >
                <ChevronLeft size={20} />
            </button>

            {/* Right Button - Half inside, half outside */}
            <button 
                onClick={() => scroll('right')} 
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 p-3 rounded-full border border-slate-200 bg-white hover:bg-sky-50 hover:border-sky-200 text-slate-500 hover:text-sky-600 transition-all shadow-md"
            >
                <ChevronRight size={20} />
            </button>

            {/* Carousel Container */}
            <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10 px-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.map((item, i) => (
                    <div 
                        key={i}
                        data-carousel-card
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
                                className="text-slate-600 text-sm leading-relaxed rich-text"
                                dangerouslySetInnerHTML={{ __html: item.description }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}