"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function IndustryTechCarousel({ title, description, items }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = direction === 'left' ? -350 : 350;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header: Title Left, Buttons Right */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                       
                        <CommonTitle 
                            title={title}
                            subtitle={description}
                            pill={true}
                            align="left"
                            
                        />
                    </div>
                    
                    {/* Navigation Buttons */}
                    <div className="flex gap-3">
                        <button onClick={() => scroll('left')} className="p-3 rounded-full border border-slate-200 hover:bg-sky-50 hover:border-sky-200 text-slate-600 hover:text-sky-600 transition-all">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={() => scroll('right')} className="p-3 rounded-full border border-slate-200 hover:bg-sky-50 hover:border-sky-200 text-slate-600 hover:text-sky-600 transition-all">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                {/* showing 3.5 items on desktop (w-[28%]), 2.5 on tablet, 1.2 on mobile */}
                <div 
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {items?.map((item, i) => (
                        <div 
                            key={i} 
                            className="relative flex-shrink-0 w-[85%] md:w-[40%] lg:w-[28%] snap-start group cursor-pointer"
                        >
                            <div className="relative aspect-[3/3] w-full rounded-3xl overflow-hidden shadow-lg border border-slate-100">
                                {/* Background Image */}
                                <Image 
                                    src={item.image || "/images/placeholder-tech.jpg"} 
                                    alt={item.name} 
                                    fill 
                                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                                />
                                
                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                                {/* Content on Image */}
                                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-start gap-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                                        <Zap size={24} fill="currentColor" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white leading-tight">{item.name}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}