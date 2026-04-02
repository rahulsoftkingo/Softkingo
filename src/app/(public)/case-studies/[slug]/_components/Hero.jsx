"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero({ data }) {
    const { primaryColor, secondaryColor } = data.branding;

    return (
        <section
            className="relative overflow-hidden py-8 md:py-16"
            style={{
                backgroundColor: primaryColor,
            }}
        >
            {/* Background Texture/Image */}
            <div className="absolute inset-0">
                <Image
                    src={data.hero.backgroundImage}
                    alt="Hero BG"
                    fill
                    className="object-cover opacity-90"
                    priority
                />
                {/* Minimal Overlay for Maximum Image Visibility */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundColor: `${primaryColor}15`,
                        backgroundImage: `linear-gradient(to right, ${primaryColor}33, transparent)`
                    }}
                />
                {/* Secondary Bottom Shadow for grounding */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white space-y-8"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 md:w-28 md:h-28 rounded-lg  flex items-center justify-center overflow-hidden  ">
                                <Image
                                    src={data.logo}
                                    alt={data.title}
                                    width={100}
                                    height={100}
                                    className="h-auto w-auto object-contain"
                                />
                            </div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-normal leading-normal">
                                {data.title}
                            </h1>
                        </div>

                        <p className="text-base md:text-lg lg:text-xl font-medium leading-relaxed opacity-90 max-w-2xl">
                            {data.subtitle}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            {/* App Badges Logic (Can be abstracted further if needed) */}
                            {data.downloads?.googlePlay?.url && (
                                <a href={data.downloads.googlePlay.url} className="hover:scale-105 transition-transform">
                                    <Image src={data.downloads.googlePlay.image} alt="Google Play" width={160} height={50} className="h-10 w-auto" />
                                </a>
                            )}
                            {data.downloads?.appStore?.url && (
                                <a href={data.downloads.appStore.url} className="hover:scale-105 transition-transform">
                                    <Image src={data.downloads.appStore.image} alt="App Store" width={160} height={50} className="h-10 w-auto" />
                                </a>
                            )}
                        </div>
                    </motion.div>

                    {/* Right Mockups */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-[360px] aspect-square">
                            {/* Main Floating Mockup */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src={data.hero.mockups[0]}
                                    alt="Project Mockup"
                                    fill
                                    className="object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.5)]"
                                />
                            </motion.div>

                            {/* Subtle Glow Effect using Primary Color */}
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-[100px] opacity-20 -z-10"
                                style={{ backgroundColor: primaryColor }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
