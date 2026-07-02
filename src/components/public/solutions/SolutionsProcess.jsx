"use client";
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, animate } from 'framer-motion';
import CommonTitle from '@/components/ui/CommonTitle';

export default function SolutionsProcess({ data }) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const animationRef = useRef(null);

    const updateScrollState = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    }, []);

    useEffect(() => {
        updateScrollState();
        const el = scrollRef.current;
        if (!el) return;

        el.addEventListener('scroll', updateScrollState, { passive: true });
        window.addEventListener('resize', updateScrollState);

        return () => {
            el.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', updateScrollState);
        };
    }, [updateScrollState, data]);

    const scrollByAmount = (direction) => {
        const el = scrollRef.current;
        if (!el) return;

        const card = el.querySelector('[data-step-card]');
        const cardWidth = card ? card.getBoundingClientRect().width + 24 : 320;

        const from = el.scrollLeft;
        const maxScroll = el.scrollWidth - el.clientWidth;
        let to = direction === 'left' ? from - cardWidth : from + cardWidth;
        to = Math.max(0, Math.min(to, maxScroll));

        // Stop any in-progress scroll animation before starting a new one
        if (animationRef.current) {
            animationRef.current.stop();
        }

        // Spring animation for a natural, slightly bouncy card slide
        animationRef.current = animate(from, to, {
            type: 'spring',
            stiffness: 260,
            damping: 32,
            mass: 0.9,
            onUpdate: (value) => {
                el.scrollLeft = value;
            },
        });
    };

    if (!data) return null;

    return (
        <section className="py-8 md:py-16 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-end justify-between gap-4 flex-wrap">
                    <CommonTitle
                        align="center"
                        title="Development Process"
                        subtitle="From concept to launch, we follow a proven agile methodology."
                    />

                    <div className="hidden sm:flex items-center gap-3 mb-2">
                        <motion.button
                            type="button"
                            aria-label="Scroll left"
                            onClick={() => scrollByAmount('left')}
                            disabled={!canScrollLeft}
                            whileHover={canScrollLeft ? { scale: 1.08, backgroundColor: '#0284c7', borderColor: '#0284c7' } : {}}
                            whileTap={canScrollLeft ? { scale: 0.9 } : {}}
                            animate={{ opacity: canScrollLeft ? 1 : 0.4 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="w-11 h-11 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm disabled:cursor-not-allowed group/btn"
                        >
                            <svg
                                width="18" height="18" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                className="transition-colors duration-300 group-hover/btn:text-white"
                            >
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </motion.button>

                        <motion.button
                            type="button"
                            aria-label="Scroll right"
                            onClick={() => scrollByAmount('right')}
                            disabled={!canScrollRight}
                            whileHover={canScrollRight ? { scale: 1.08, backgroundColor: '#0284c7', borderColor: '#0284c7' } : {}}
                            whileTap={canScrollRight ? { scale: 0.9 } : {}}
                            animate={{ opacity: canScrollRight ? 1 : 0.4 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="w-11 h-11 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm disabled:cursor-not-allowed group/btn"
                        >
                            <svg
                                width="18" height="18" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                className="transition-colors duration-300 group-hover/btn:text-white"
                            >
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </motion.button>
                    </div>
                </div>

                <div className="relative mt-8 md:mt-12">
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-6 md:gap-8 pb-12 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {data.steps?.map((step, idx) => (
                            <div
                                key={idx}
                                data-step-card
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