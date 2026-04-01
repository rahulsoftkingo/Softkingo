'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaApple, FaGlobe, FaGooglePlay } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { homePortfolioData } from '@/data/home-portfolio';
import CommonTitle from '@/components/ui/CommonTitle';

const HomePortfolio = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const numItems = homePortfolioData.length;

    // Left scroll indicator height (Smoothly from 20% to 100%)
    const indicatorHeight = useTransform(scrollYProgress, [0, 1], ["20%", "100%"]);

    // STRICTLY BALANCED SCROLL ZONING FOR 4 ITEMS
    // Total vertical scroll (0 to 1.0) is divided into 4 segments.
    // Since the horizontal track width is 400% (numItems * 100), 
    // each card transition should be 1/numItems = 25%.

    // We hold each card centered at each dot milestone.
    // Milestones: 0% (Dot 1), 33% (Dot 2), 66% (Dot 3), 100% (Dot 4)

    const inputRanges = [
        0, 0.15,               // Card 1 plateau
        0.30, 0.45,            // Card 2 plateau
        0.60, 0.75,            // Card 3 plateau
        0.90, 1.0              // Card 4 plateau
    ];

    const outputRanges = [
        "0%", "0%",            // Card 1
        "-25%", "-25%",        // Card 2 (Moves by 1/4 of the 400% track)
        "-50%", "-50%",        // Card 3
        "-75%", "-75%"         // Card 4
    ];

    // Horizontal transform with strict zoning
    const xBase = useTransform(scrollYProgress, inputRanges, outputRanges);

    // Snappy spring for professional feedback
    const x = useSpring(xBase, { stiffness: 100, damping: 20, mass: 0.5 });

    // Dots Sync Logic: Active index matches the current Plateau
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        return scrollYProgress.on("change", v => {
            if (v < 0.25) setActiveIndex(0);
            else if (v < 0.55) setActiveIndex(1);
            else if (v < 0.85) setActiveIndex(2);
            else setActiveIndex(3);
        });
    }, [scrollYProgress]);

    return (
        <section ref={targetRef} className="relative bg-white" style={{ height: `${numItems * 100}vh` }}>
            {/* STICKY CONTAINER */}
            <div className="sticky top-0 w-full h-screen overflow-hidden bg-[radial-gradient(circle_at_center,_white_0%,_#f0f9ff_60%,_#e0f2fe_100%)] flex flex-col pt-16 pb-8 md:pt-20 md:pb-12 border-b border-sky-100">

                {/* HEADER */}
                <div className="w-full px-4 shrink-0 absolute top-12 sm:top-20 z-20 pointer-events-none">
                    <CommonTitle
                        title="Our Portfolio"
                        gradientText=""
                        subtitle="Discover our most impactful work across various industries, from logistics to international dating apps."
                        align="center"
                    />
                </div>

                {/* MAIN CONTENT AREA */}
                <div className="flex-1 w-full max-w-[1440px] mx-auto flex items-center relative mt-20 sm:mt-24 px-4 md:px-10 lg:px-20 min-h-0">

                    {/* LEFT SCROLL INDICATOR */}
                    <div className="hidden md:flex flex-col items-center gap-6 py-10 w-12 shrink-0 z-30 relative mr-8 lg:mr-16">
                        {/* THE BAR */}
                        <div className="relative h-64 w-[10px] bg-sky-100 rounded-full overflow-hidden shadow-inner border border-white/50">
                            <motion.div
                                className="absolute top-0 w-full bg-[#00AEEF] rounded-full"
                                style={{ height: indicatorHeight }}
                            />
                        </div>

                        {/* THE 4 DOTS */}
                        <div className="flex flex-col gap-4">
                            {homePortfolioData.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border ${activeIndex === idx
                                        ? "bg-[#00AEEF] border-[#00AEEF] scale-125 shadow-[0_0_8px_rgba(0,174,239,0.4)]"
                                        : "bg-white border-sky-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* VIEWPORT FOR CARDS */}
                    <div className="flex-1 h-full max-h-[480px] relative overflow-hidden">
                        {/* HORIZONTAL TRACK */}
                        <motion.div
                            style={{ x, width: `${numItems * 100}%` }}
                            className="flex h-full items-center"
                        >
                            {homePortfolioData.map((project, idx) => (
                                <div key={project.id} className="w-full h-full flex justify-center items-center py-4 px-2 sm:px-4" style={{ width: `${100 / numItems}%` }}>
                                    <div
                                        className="relative overflow-hidden rounded-[2.5rem] text-white w-full lg:max-w-[1200px] h-[460px] flex flex-col md:flex-row  transition-all duration-300 border border-white/10"
                                        style={{
                                            background: `radial-gradient(circle at bottom right, ${project.gradientColors[0]} 0%, ${project.gradientColors[1]} 50%, ${project.gradientColors[2]} 100%)`,
                                        }}
                                    >
                                        {/* Left Content Column */}
                                        <div className="relative p-6 md:p-10 lg:p-12 z-10 w-full md:w-[55%] flex flex-col justify-between h-full">
                                            <div>
                                                {/* Logo */}
                                                <div className="flex items-center gap-4 mb-4 md:mb-6">
                                                    <div className="w-16 md:w-20 h-10 md:h-14 relative flex-shrink-0">
                                                        <Image
                                                            src={project.logo}
                                                            alt={project.title}
                                                            fill
                                                            className="object-contain filter brightness-0 invert"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Description Text */}
                                                <p className="text-white/95 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-xl mb-4 md:mb-8 font-medium drop-shadow-sm line-clamp-4 md:line-clamp-none">
                                                    {project.description}
                                                </p>

                                                {/* Info Box */}
                                                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[1.25rem] p-4 md:p-5 mb-6 md:mb-8 max-w-lg shadow-inner">
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
                                                        <div>
                                                            <p className="text-[10px] md:text-xs uppercase tracking-widest text-white/70 mb-1 font-bold">Country</p>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs md:text-sm font-bold text-white">{project.stats.country}</span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] md:text-xs uppercase tracking-widest text-white/70 mb-1 font-bold">Platforms</p>
                                                            <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base lg:text-lg">
                                                                {project.stats.platforms.includes('iOS') && <FaApple title="iOS" className="drop-shadow-sm" />}
                                                                {project.stats.platforms.includes('Android') && <FaGooglePlay title="Android" className="drop-shadow-sm" />}
                                                                {project.stats.platforms.includes('Web') && <FaGlobe title="Web" className="drop-shadow-sm" />}
                                                            </div>
                                                        </div>
                                                        <div className="col-span-2 sm:col-span-1 min-w-0">
                                                            <p className="text-[10px] md:text-xs uppercase tracking-widest text-white/70 mb-1 font-bold">Techstack</p>
                                                            <p className="text-[10px] md:text-xs font-bold leading-normal truncate text-white" title={project.stats.techStack}>{project.stats.techStack}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Store Buttons - ALWAYS SHOW ALL 3 BASED ON DATA */}
                                                <div className="flex flex-wrap gap-2 md:gap-3">
                                                    <Link href={project.playStoreUrl || '#'} className="bg-black/90 hover:bg-black transition-colors rounded-xl px-2 md:px-3 py-1.5 flex items-center gap-2 border border-white/10 shadow-lg">
                                                        <FaGooglePlay className="text-sm md:text-lg text-white" />
                                                        <div className="flex flex-col leading-none">
                                                            <span className="text-[8px] md:text-[9px] text-white/60 uppercase">Get it on</span>
                                                            <span className="text-[10px] md:text-xs font-bold text-white">Google Play</span>
                                                        </div>
                                                    </Link>

                                                    <Link href={project.appStoreUrl || '#'} className="bg-black/90 hover:bg-black transition-colors rounded-xl px-2 md:px-3 py-1.5 flex items-center gap-2 border border-white/10 shadow-lg">
                                                        <FaApple className="text-base md:text-xl text-white" />
                                                        <div className="flex flex-col leading-none">
                                                            <span className="text-[8px] md:text-[9px] text-white/60 uppercase">Download on the</span>
                                                            <span className="text-[10px] md:text-xs font-bold text-white">App Store</span>
                                                        </div>
                                                    </Link>

                                                    <Link href={project.webUrl || '#'} className="bg-black/90 hover:bg-black transition-colors rounded-xl px-2 md:px-3 py-1.5 flex items-center gap-2 border border-white/10 shadow-lg">
                                                        <FaGlobe className="text-sm md:text-lg text-white" />
                                                        <div className="flex flex-col leading-none">
                                                            <span className="text-[8px] md:text-[9px] text-white/60 uppercase">Available on the</span>
                                                            <span className="text-[10px] md:text-xs font-bold text-white">Web</span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Mockup Column - HIDDEN ON MOBILE */}
                                        <div className="hidden md:block relative w-full md:w-[45%] h-full overflow-hidden">
                                            <div className="relative w-full h-full transform scale-110 md:scale-125 md:translate-x-12 translate-y-6 md:translate-y-0">
                                                <Image
                                                    src={project.mockup}
                                                    alt={`${project.title} Mockups`}
                                                    fill
                                                    className="object-contain drop-shadow-2xl"
                                                />
                                            </div>

                                            {/* View Project Button */}
                                            {project.caseStudyUrl && project.caseStudyUrl !== '#' && (
                                                <Link
                                                    href={project.caseStudyUrl}
                                                    className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-30 bg-white/20 backdrop-blur-xl border border-white/30 px-5 md:px-6 py-2 md:py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white text-white hover:text-sky-600 transition-all duration-300 group shadow-xl"
                                                >
                                                    <span className="text-xs md:text-sm">View Project</span>
                                                    <IoIosArrowForward className="group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            )}
                                        </div>

                                        {/* Mobile View Project Button */}
                                        <div className="md:hidden p-6 pt-0">
                                            {project.caseStudyUrl && project.caseStudyUrl !== '#' && (
                                                <Link
                                                    href={project.caseStudyUrl}
                                                    className="w-full bg-white/20 backdrop-blur-xl border border-white/30 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-white transition-all active:scale-95 shadow-lg"
                                                >
                                                    <span className="text-sm">View Project</span>
                                                    <IoIosArrowForward />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* MOBILE DOTS */}
            <div className="md:hidden flex justify-center gap-3 absolute bottom-12 w-full z-40">
                {homePortfolioData.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? "bg-[#00AEEF] w-6" : "bg-sky-200"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HomePortfolio;
