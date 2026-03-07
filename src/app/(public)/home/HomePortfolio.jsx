'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaGooglePlay, FaApple, FaGlobe } from 'react-icons/fa';
import { IoIosArrowForward } from "react-icons/io";
import { homePortfolioData } from '@/data/home-portfolio';
import CommonTitle from '@/components/ui/CommonTitle';

const HomePortfolio = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const scrollRef = useRef(null);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const index = Math.round(scrollLeft / clientWidth);
            if (index !== activeSlide) {
                setActiveSlide(index);
            }
        }
    };

    const scrollToSlide = (index) => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: index * scrollRef.current.clientWidth,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <CommonTitle
                    title="Our Premium"
                    gradientText="Portfolio"
                    subtitle="Discover our most impactful work across various industries, from logistics to international dating apps."
                    align="center"
                />

                <div className="relative mt-12 flex flex-col md:flex-row gap-8 items-start">
                    {/* Scroll Indicator (Vertical Line) */}
                    <div className="hidden md:flex flex-col items-center gap-4 py-10 w-2 sticky top-20 h-[500px] justify-center">
                        <div className="relative h-64 w-[10px] bg-sky-100 rounded-full overflow-hidden">
                            <motion.div
                                className="absolute top-0 w-full bg-[#00AEEF] rounded-full"
                                animate={{
                                    height: `${((activeSlide + 1) / homePortfolioData.length) * 100}%`,
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                        </div>
                        {/* Dots for manual navigation */}
                        <div className="flex flex-col gap-3 mt-4">
                            {homePortfolioData.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => scrollToSlide(idx)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === activeSlide ? 'bg-[#00AEEF] scale-125' : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Carousel Container */}
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex-1 flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-8"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {homePortfolioData.map((project, idx) => (
                            <div
                                key={project.id}
                                className="min-w-full snap-center"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                    className="relative overflow-hidden rounded-[2rem] text-white h-auto md:h-[500px] flex flex-col md:flex-row shadow-2xl"
                                    style={{
                                        background: `radial-gradient(circle at bottom, ${project.gradientColors[0]} 0%, ${project.gradientColors[1]} 50%, ${project.gradientColors[2]} 100%)`,
                                    }}
                                >
                                    {/* Left Content Column */}
                                    <div className="relative p-8 md:p-14 z-10 w-full md:w-[55%] flex flex-col justify-between h-full">
                                        <div>
                                            {/* Logo and Name */}
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="w-22 h-16 relative flex-shrink-0">
                                                    <Image
                                                        src={project.logo}
                                                        alt={project.title}
                                                        width={92}
                                                        height={72}
                                                        className="object-contain filter brightness-0 invert"
                                                    />
                                                </div>
                                                {/* <h3 className="text-3xl md:text-[2.5rem] font-bold tracking-tight">
                                                    {project.title}
                                                </h3> */}
                                            </div>

                                            {/* Description Text */}
                                            <p className="text-white/90 text-sm md:text-lg leading-relaxed max-w-xl mb-10">
                                                {project.description}
                                            </p>

                                            {/* Info Box */}
                                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[1.5rem] p-6 mb-8 max-w-lg">
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                                    <div>
                                                        <p className="text-xs uppercase tracking-widest text-white/60 mb-2 font-bold">Country</p>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-semibold">{project.stats.country}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs uppercase tracking-widest text-white/60 mb-2 font-bold">Platforms</p>
                                                        <div className="flex items-center gap-3 text-lg">
                                                            {project.stats.platforms.includes('iOS') && <FaApple title="iOS" />}
                                                            {project.stats.platforms.includes('Android') && <FaGooglePlay title="Android" />}
                                                            {project.stats.platforms.includes('Web') && <FaGlobe title="Web" />}
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-1">
                                                        <p className="text-xs uppercase tracking-widest text-white/60 mb-2 font-bold">Techstack</p>
                                                        <p className="text-xs font-semibold leading-tight">{project.stats.techStack}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Store Buttons */}
                                            <div className="flex flex-wrap gap-4">
                                                <Link href={project.playStoreUrl} className="bg-black hover:bg-gray-900 transition-colors rounded-xl px-4 py-2 flex items-center gap-3 border border-white/10">
                                                    <FaGooglePlay className="text-xl" />
                                                    <div className="flex flex-col leading-none">
                                                        <span className="text-[10px] text-white/60 uppercase">Get it on</span>
                                                        <span className="text-sm font-bold">Google Play</span>
                                                    </div>
                                                </Link>
                                                <Link href={project.appStoreUrl} className="bg-black hover:bg-gray-900 transition-colors rounded-xl px-4 py-2 flex items-center gap-3 border border-white/10">
                                                    <FaApple className="text-2xl" />
                                                    <div className="flex flex-col leading-none">
                                                        <span className="text-[10px] text-white/60 uppercase">Download on the</span>
                                                        <span className="text-sm font-bold">App Store</span>
                                                    </div>
                                                </Link>
                                                <Link href={project.webUrl} className="bg-black hover:bg-gray-900 transition-colors rounded-xl px-4 py-2 flex items-center gap-3 border border-white/10">
                                                    <FaGlobe className="text-xl" />
                                                    <div className="flex flex-col leading-none">
                                                        <span className="text-[10px] text-white/60 uppercase">Available on the</span>
                                                        <span className="text-sm font-bold">Web</span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Mockup Column */}
                                    <div className="relative mt-12 md:mt-0 w-full md:w-[45%] h-[300px] md:h-full">
                                        <motion.div
                                            className="relative w-full h-full flex items-center"
                                            initial={{ opacity: 0, x: 50, rotate: 5 }}
                                            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            viewport={{ once: true }}
                                        >
                                            <div className="relative w-full h-full transform md:scale-125 md:translate-x-10">
                                                <Image
                                                    src={project.mockup}
                                                    alt={`${project.title} Mockups`}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>

                                            {/* Floating View Project Button - Positioned in bottom right of mockup area */}
                                            <Link
                                                href={project.caseStudyUrl}
                                                className="absolute bottom-4 right-4 md:bottom-10 md:right-10 z-20 bg-white/20 backdrop-blur-xl border border-white/30 text-sky-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white hover:text-[#2563eb] transition-all group shadow-xl"
                                            >
                                                View Project
                                                <IoIosArrowForward className="group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Navigation Dots */}
                <div className="flex md:hidden justify-center gap-3 mt-8">
                    {homePortfolioData.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollToSlide(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeSlide ? 'w-8 bg-[#00AEEF]' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomePortfolio;
