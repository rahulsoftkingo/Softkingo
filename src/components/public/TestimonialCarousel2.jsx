// 📂 src/components/public/TestimonialCarousel.jsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialCarousel = ({ data }) => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            setTimeout(checkScroll, 300);
        }
    };

    return (
        <div className="relative">
            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mb-6">
                {data.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            if (scrollRef.current) {
                                const cardWidth = scrollRef.current.children[0].offsetWidth;
                                const gap = 24; // gap-6 = 24px
                                scrollRef.current.scrollTo({
                                    left: i * (cardWidth + gap),
                                    behavior: 'smooth'
                                });
                            }
                        }}
                        className="w-2 h-2 rounded-full bg-sky-200 hover:bg-sky-400 transition-colors duration-300"
                    />
                ))}
            </div>

            {/* Scroll Container */}
            <div 
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {data.map((t, i) => (
                    <div 
                        key={i} 
                        className="snap-center flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                    >
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 h-full flex flex-col hover:shadow-lg hover:border-sky-200 transition-all duration-300">
                            
                            {/* Header with Quote Icon */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    {/* Stars */}
                                    <div className="flex gap-1 text-amber-400 mb-3">
                                        {[...Array(t.rating || 5)].map((_, r) => (
                                            <Star key={r} size={14} fill="currentColor" />
                                        ))}
                                    </div>
                                </div>
                                <Quote className="text-sky-100 w-8 h-8 flex-shrink-0" />
                            </div>

                            {/* Review Text */}
                            <p className="text-slate-600 mb-6 leading-relaxed text-sm flex-grow rich-text" dangerouslySetInnerHTML={{ __html: `"${t.review || t.feedback || ""}"` }} />

                            {/* User Info */}
                            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-sky-100 flex items-center justify-center text-sky-700 font-bold text-xs flex-shrink-0">
                                    {t.image ? (
                                        <Image src={t.image} alt={t.name} fill className="object-cover" />
                                    ) : (
                                        <span>{t.avatar || t.name?.charAt(0)}</span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-900 text-sm truncate">{t.name}</h4>
                                    <p className="text-xs text-slate-500 line-clamp-1">{t.title || t.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestimonialCarousel;