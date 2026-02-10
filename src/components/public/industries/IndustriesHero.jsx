"use client";
import React from 'react';
import Image from 'next/image';

export default function IndustriesHero({ data }) {
    // Agar data nahi hai to kuch mat dikhao
    if (!data) return null;

    const { title, description, image } = data;

    // Default placeholder agar image upload nahi hui hai
    const bgImage = image || "/images/industries/industries-bg.png"; 

    return (
        <section className="relative w-full min-h-[500px] lg:min-h-[600px] flex items-center justify-center overflow-hidden">
            
            {/* 1. Background Image */}
            {image ? (
                <Image
                    src={bgImage}
                    alt={title || "Industry Background"}
                    fill
                    className="object-cover object-center z-0"
                    priority // Hero image hai, isliye priority load karenge
                />
            ) : (
                // Fallback agar image bilkul nahi hai to solid color
                <div className="absolute inset-0 bg-slate-900 z-0"></div>
            )}

            {/* 2. Dark Overlay (Text padhne layak banane ke liye) */}
            <div className="absolute inset-0 bg-black/60 z-10"></div>

            {/* 3. Centered Text Content */}
            <div className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center text-white">
                
                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight drop-shadow-lg max-w-4xl animate-fadeInUp">
                    {title}
                </h1>
                
                {/* Description */}
                {description && (
                    <p className="text-lg md:text-xl text-slate-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md animate-fadeInUp delay-100">
                        {description}
                    </p>
                )}

            </div>
        </section>
    );
}