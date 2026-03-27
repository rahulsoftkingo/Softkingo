"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

export default function IndustriesHero({ data }) {
    const [showModal, setShowModal] = useState(false);
    
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
                
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-300 mb-4">
                  <Link href="/" className="hover:text-sky-400 transition-colors">
                    Home
                  </Link>
                  <span>›</span>
                  <Link href="/industries" className="hover:text-sky-400 transition-colors">
                    Industries
                  </Link>
                  <span>›</span>
                  <span className="text-sky-400 font-medium">{title}</span>
                </nav>
                
                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight drop-shadow-lg max-w-5xl animate-fadeInUp py-2">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-white/80">
                        {title}
                    </span>
                    {data.gradientText && (
                        <span className="ml-3 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-300">
                            {data.gradientText}
                        </span>
                    )}
                </h1>
                
                {/* Description */}
                {description && (
                    <div 
                        className="text-lg md:text-xl text-slate-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md animate-fadeInUp delay-100 font-medium prose prose-invert prose-lg"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2 animate-fadeInUp delay-300 pb-20">
                  <button 
                    onClick={() => setShowModal(true)}
                    className="px-4 md:px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300 items-center cursor-pointer inline-flex gap-2">
                    Let's Work Together <ArrowRight size={18}/>
                  </button>
                  <Link href="https://calendly.com/paramhans-softkingo/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 md:px-8 py-2.5 rounded-full bg-white text-[#28AFDF] border border-[#28AFDF] font-medium hover:bg-[#28AFDF]/10 transform hover:-translate-y-1 shadow-lg shadow-[#28AFDF]/30 transition-all duration-300 text-xs md:text-md inline-flex items-center justify-center gap-2">
                    <Calendar size={18}/> Schedule Meeting
                  </Link>
                </div>

            </div>
        </section>
    );
}