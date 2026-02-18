"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

export default function CloneHero({ data }) {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <section className="relative min-h-[80vh] bg-gradient-to-br from-sky-600 via-sky-700 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-300 mb-4">
              <Link href="/" className="hover:text-sky-400 transition-colors">
                Home
              </Link>
              <span>›</span>
              <Link href="/solutions" className="hover:text-sky-400 transition-colors">
                Solutions
              </Link>
              <span>›</span>
              <span className="text-sky-400 font-medium">{data?.title || "Clone App"}</span>
            </nav>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black leading-tight">
                {data?.title || "Build Your Own Clone App"}
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                {data?.subtitle || "Launch a successful platform with our proven clone solutions. Fast, reliable, and customizable."}
              </p>
            </div>

            

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

          {/* Right Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ">
              <Image 
                src={data?.image || "/images/clone-hero.jpg"} 
                alt="Clone App Development" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 bg-sky-500 text-white rounded-full p-4 shadow-lg animate-bounce">
              <span className="text-2xl font-bold">2M+</span>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-slate-700 text-white rounded-full p-4 shadow-lg">
              <span className="text-lg font-bold">500+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 50 720 45C840 40 960 35 1080 30C1200 25 1320 20 1380 15L1440 10V120H0V120Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
