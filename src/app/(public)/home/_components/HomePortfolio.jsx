'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaApple, FaGlobe, FaGooglePlay } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { homePortfolioData } from '@/data/home-portfolio';
import CommonTitle from '@/components/ui/CommonTitle';

const HomePortfolio = () => {
    const realCount = homePortfolioData.length;

    const extendedData = [
        ...homePortfolioData,
        ...homePortfolioData,
        ...homePortfolioData,
    ];
    const totalItems = extendedData.length;

    // Responsive peek: 0 on mobile (single full-width card, no side slivers),
    // 18 on desktop (unchanged multi-peek layout)
    const [peek, setPeek] = useState(18);

    useEffect(() => {
        const updatePeek = () => {
            setPeek(window.innerWidth < 768 ? 0 : 18);
        };
        updatePeek();
        window.addEventListener('resize', updatePeek);
        return () => window.removeEventListener('resize', updatePeek);
    }, []);

    const CARD_WIDTH = 100 - peek * 2;
    const TRACK_WIDTH_VP = totalItems * CARD_WIDTH;

    const slideOffsetPercentOfTrack = (i) => {
        const xVp = peek - i * CARD_WIDTH;
        return (xVp / TRACK_WIDTH_VP) * 100;
    };

    const [virtualIndex, setVirtualIndex] = useState(realCount);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);
    const x = useMotionValue(slideOffsetPercentOfTrack(realCount));

    // Native Framer Motion transform for smooth percentage dynamic calculation
    const xPercentage = useTransform(x, (val) => `${val}%`);

    const activeIndex = ((virtualIndex % realCount) + realCount) % realCount;

    // Snap track to the correct offset whenever peek changes (e.g. resize crossing breakpoint)
    useEffect(() => {
        if (!isDragging) {
            x.set(slideOffsetPercentOfTrack(virtualIndex));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [peek]);

    useEffect(() => {
        if (!isDragging) {
            const targetX = slideOffsetPercentOfTrack(virtualIndex);

            const controls = animate(x, targetX, {
                type: 'spring',
                stiffness: 160,
                damping: 26,
                mass: 1.1,
                onComplete: () => {
                    if (virtualIndex >= realCount * 2) {
                        const resetIndex = virtualIndex - realCount;
                        setVirtualIndex(resetIndex);
                        x.set(slideOffsetPercentOfTrack(resetIndex));
                    } else if (virtualIndex < realCount) {
                        const resetIndex = virtualIndex + realCount;
                        setVirtualIndex(resetIndex);
                        x.set(slideOffsetPercentOfTrack(resetIndex));
                    }
                }
            });

            return () => controls.stop();
        }
    }, [virtualIndex, isDragging, x, realCount]);

    // KEYBOARD NAVIGATION HANDLER
    useEffect(() => {
        const handleKeyDown = (event) => {
            // Avoid intercepting arrow key inputs if user is focused inside input elements
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
                return;
            }

            if (event.key === 'ArrowLeft') {
                setVirtualIndex((prev) => prev - 1);
            } else if (event.key === 'ArrowRight') {
                setVirtualIndex((prev) => prev + 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const goToSlide = (idx) => {
        const currentReal = ((virtualIndex % realCount) + realCount) % realCount;
        const diff = idx - currentReal;
        setVirtualIndex(prev => prev + diff);
    };

    const handleDragEnd = (_, info) => {
        setIsDragging(false);

        const offset = info.offset.x;
        const velocity = info.velocity.x;
        let newVirtualIndex = virtualIndex;

        if (Math.abs(velocity) > 350) {
            newVirtualIndex = velocity < 0 ? virtualIndex + 1 : virtualIndex - 1;
        } else if (Math.abs(offset) > 70) {
            newVirtualIndex = offset < 0 ? virtualIndex + 1 : virtualIndex - 1;
        }

        setVirtualIndex(newVirtualIndex);
    };

    return (
        <section className="relative bg-white py-10 pt-6 md:py-16 select-none overflow-hidden">
            <div className="w-full bg-white flex flex-col">

                {/* HEADER SECTION */}
                <div className="w-full px-4 sm:px-6 md:px-10 lg:px-50 shrink-0 relative z-20 mb-6 md:mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

                    {/* LEFT SIDE TITLE */}
                   <div className="flex-1 min-w-0 -mb-10 md:mb-0">
                        <CommonTitle
                            title="Our Portfolio"
                            gradientText=""
                            align="left"
                        />
                    </div>

                    {/* RIGHT SIDE BUTTONS (HORIZONTAL SCROLL ON MOBILE, STACK RIGHT ON DESKTOP) */}
                    <div className="flex flex-row items-center justify-start md:justify-end gap-2.5 md:gap-3 shrink-0 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        {homePortfolioData.map((project, idx) => {
                            const isActive = activeIndex === idx;
                            return (
                                <button
                                    key={project.id}
                                    type="button"
                                    onClick={() => goToSlide(idx)}
                                    className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl min-w-[85px] sm:min-w-[120px] px-3 py-2 ml-2.5 md:py-2.5 border transition-all duration-300 cursor-pointer shrink-0 ${isActive
                                            ? "scale-105 border-white/20 shadow-md"
                                            : "bg-slate-900/90 border-white/10 hover:bg-slate-900 hover:scale-105"
                                        }`}
                                    style={
                                        isActive
                                            ? {
                                                background: `linear-gradient(135deg, ${project.gradientColors[0]}, ${project.gradientColors[1]})`,
                                            }
                                            : undefined
                                    }
                                >
                                    <div className="w-9 sm:w-12 h-4 md:h-5 relative flex items-center justify-center">
                                        <Image
                                            src={project.logo}
                                            alt={project.title}
                                            fill
                                            draggable={false}
                                            className="object-contain filter brightness-0 invert pointer-events-none"
                                        />
                                    </div>

                                    <span className="text-[10px] md:text-xs font-medium text-white/90 whitespace-nowrap text-center">
                                        {project.type}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* CAROUSEL VIEWPORT AREA */}
                <div className="w-full flex items-center relative py-2">
                    <div ref={containerRef} className="w-full min-h-[370px] sm:min-h-[480px] md:h-[480px] lg:h-[500px] relative overflow-hidden cursor-default">
                        <motion.div
                            drag="x"
                            dragElastic={0.12}
                            dragMomentum={false}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={handleDragEnd}
                            style={{ x: xPercentage, width: `${TRACK_WIDTH_VP}%` }}
                            className="flex h-full items-stretch touch-pan-y"
                        >
                            {extendedData.map((project, idx) => {
                                const isActive = idx === virtualIndex;
                                return (
                                    <div
                                        key={`${project.id}-${idx}`}
                                        className="h-full flex-shrink-0 py-2 px-2 cursor-default"
                                        style={{ width: `${100 / totalItems}%` }}
                                    >
                                        <div
                                            className={`relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] text-white w-full h-full flex flex-col md:flex-row border border-white/10 select-none transition-all duration-700 ease-out ${isActive ? "opacity-100 scale-100" : "opacity-100 scale-100 md:opacity-60 md:scale-[0.94]"
                                                }`}
                                            style={{
                                                background: `linear-gradient(135deg, ${project.gradientColors[0]} 0%, ${project.gradientColors[1]} 50%, ${project.gradientColors[2]} 100%)`,
                                            }}
                                        >
                                            {!isActive && (
                                                <div className="hidden md:block absolute inset-0 bg-black/40 z-20 transition-opacity duration-700 pointer-events-none" />
                                            )}

                                            {/* LEFT CONTENT AREA */}
                                            <div className="relative p-5 sm:p-6 md:p-10 lg:p-12 z-10 w-full md:w-[50%] lg:w-[52%] flex flex-col justify-between h-full">
                                                <div>
                                                    <div className="flex items-center mb-4 md:mb-6">
                                                        <div className="w-20 sm:w-24 md:w-32 h-8 sm:h-10 md:h-12 relative flex-shrink-0">
                                                            <Image
                                                                src={project.logo}
                                                                alt={project.title}
                                                                draggable={false}
                                                                fill
                                                                className="object-contain object-left filter brightness-0 invert pointer-events-none"
                                                            />
                                                        </div>
                                                    </div>

                                                    <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg mb-4 md:mb-6 font-normal line-clamp-3 md:line-clamp-4">
                                                        {project.description}
                                                    </p>

                                                    {/* INFO PILL BOX */}
                                                    <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 md:p-5 mb-4 md:mb-6 max-w-lg">
                                                        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 items-center">
                                                            <div>
                                                                <p className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider text-white/70 mb-1 font-semibold">COUNTRY</p>
                                                                <p className="text-xs md:text-sm font-bold text-white truncate">{project.stats.country}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider text-white/70 mb-1 font-semibold">PLATFORMS</p>
                                                                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base text-white">
                                                                    {project.stats.platforms.includes('iOS') && <FaApple title="iOS" />}
                                                                    {project.stats.platforms.includes('Android') && <FaGooglePlay title="Android" />}
                                                                    {project.stats.platforms.includes('Web') && <FaGlobe title="Web" />}
                                                                </div>
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider text-white/70 mb-1 font-semibold">TECHSTACK</p>
                                                                <p className="text-[9px] sm:text-[10px] md:text-xs font-bold truncate text-white" title={project.stats.techStack}>{project.stats.techStack}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* STORE BUTTONS */}
                                                    <div className="flex flex-wrap gap-2 md:gap-3 z-30 relative">
                                                        <Link href={project.playStoreUrl || '#'} className="bg-black hover:bg-black/80 transition-colors rounded-xl px-2.5 sm:px-3 py-1.5 flex items-center gap-2 border border-white/10 cursor-pointer">
                                                            <FaGooglePlay className="text-xs sm:text-sm md:text-base text-white" />
                                                            <div className="flex flex-col leading-none">
                                                                <span className="text-[7px] md:text-[8px] text-white/70 uppercase">Get it on</span>
                                                                <span className="text-[9px] sm:text-[10px] md:text-xs font-bold text-white">Google Play</span>
                                                            </div>
                                                        </Link>

                                                        <Link href={project.appStoreUrl || '#'} className="bg-black hover:bg-black/80 transition-colors rounded-xl px-2.5 sm:px-3 py-1.5 flex items-center gap-2 border border-white/10 cursor-pointer">
                                                            <FaApple className="text-sm sm:text-base md:text-lg text-white" />
                                                            <div className="flex flex-col leading-none">
                                                                <span className="text-[7px] md:text-[8px] text-white/70 uppercase">Download on the</span>
                                                                <span className="text-[9px] sm:text-[10px] md:text-xs font-bold text-white">App Store</span>
                                                            </div>
                                                        </Link>

                                                        <Link href={project.webUrl || '#'} className="bg-black hover:bg-black/80 transition-colors rounded-xl px-2.5 sm:px-3 py-1.5 flex items-center gap-2 border border-white/10 cursor-pointer">
                                                            <FaGlobe className="text-xs sm:text-sm md:text-base text-white" />
                                                            <div className="flex flex-col leading-none">
                                                                <span className="text-[7px] md:text-[8px] text-white/70 uppercase">Available on the</span>
                                                                <span className="text-[9px] sm:text-[10px] md:text-xs font-bold text-white">Web</span>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* RIGHT SHOWCASE MOCKUP AREA (DESKTOP) */}
                                            <div className="hidden md:block relative w-full md:w-[50%] lg:w-[48%] h-full">
                                                <div className="relative w-full h-full pointer-events-none">
                                                    <Image
                                                        src={project.mockup}
                                                        alt={`${project.title} Showcase`}
                                                        fill
                                                        draggable={false}
                                                        className="object-cover object-center select-none"
                                                    />
                                                </div>

                                                {project.caseStudyUrl && project.caseStudyUrl !== '#' && (
                                                    <Link
                                                        href={project.caseStudyUrl}
                                                        className="absolute bottom-6 right-6 z-30 bg-white/20 backdrop-blur-md border border-white/40 px-5 py-2.5 rounded-full font-medium flex items-center gap-2 text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                                                    >
                                                        <span className="text-xs md:text-sm font-semibold">View Project</span>
                                                        <IoIosArrowForward className="text-sm" />
                                                    </Link>
                                                )}
                                            </div>

                                            {/* MOBILE VIEW BUTTON */}
                                            <div className="md:hidden p-5 pt-0 relative z-20 mt-auto">
                                                {project.caseStudyUrl && project.caseStudyUrl !== '#' && (
                                                    <Link
                                                        href={project.caseStudyUrl}
                                                        className="w-full bg-white/20 backdrop-blur-md border border-white/40 px-6 py-2.5 rounded-full font-medium flex items-center justify-center gap-2 text-white transition-all active:scale-95 cursor-pointer"
                                                    >
                                                        <span className="text-xs md:text-sm font-semibold">View Project</span>
                                                        <IoIosArrowForward />
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>

                {/* BOTTOM DOT INDICATORS */}
                <div className="flex flex-col items-center gap-3 mt-4 md:mt-8 shrink-0 px-4">
                    <div className="flex flex-row gap-3 md:gap-4">
                        {homePortfolioData.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goToSlide(idx)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border cursor-pointer ${activeIndex === idx
                                        ? "bg-[#00AEEF] border-[#00AEEF] scale-125"
                                        : "bg-[#00AEEF]/20 border-sky-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HomePortfolio;