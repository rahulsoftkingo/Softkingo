// components/HeroSection.jsx
'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaArrowRight, FaCode, FaMobileAlt, FaLaptopCode, FaBook } from 'react-icons/fa';
import { FaPhoneAlt } from "react-icons/fa";
import Link from 'next/link';

import PopupQuoteModal from '@/components/PopupQuoteModal';

const HeroSection = () => {
  const sectionRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [bgElements, setBgElements] = useState([]);
  const [bgDots, setBgDots] = useState([]);

  useEffect(() => {
    setMounted(true);

    const elements = [...Array(15)].map(() => ({
      width: Math.random() * 150 + 50,
      height: Math.random() * 150 + 50,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animateY: [0, Math.random() * 50 - 25],
      animateX: [0, Math.random() * 50 - 25],
      duration: Math.random() * 5 + 5,
    }));

    setBgElements(elements);

    const dots = [...Array(12)].map(() => ({
      width: Math.random() * 15 + 5,
      height: Math.random() * 15 + 5,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animateY: [0, Math.random() * 30 - 15],
      animateX: [0, Math.random() * 30 - 15],
      duration: Math.random() * 6 + 6,
    }));

    setBgDots(dots);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative flex flex-col md:block overflow-hidden md:min-h-screen"
    >
      {/* MEDIA BLOCK: mobile par normal flow me content ke NICHE (fixed height), desktop par absolute background */}
      <div className="order-2 md:order-none relative w-full h-[40vh] sm:h-[45vh] md:absolute md:inset-0 md:h-full z-0">
        <img
          src="/videos/frame.webp"
          alt="Softkingo"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/softkingovideo.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay - sirf desktop par */}
        <div className="hidden md:block absolute inset-0 bg-black/30 z-[1]" />

        {/* Background bubbles - desktop only */}
        <div className="hidden md:block absolute inset-0 overflow-hidden z-[2]">
          {mounted &&
            bgElements.map((el, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-sky-200 opacity-10"
                style={{
                  width: el.width,
                  height: el.height,
                  top: el.top,
                  left: el.left,
                }}
                animate={{
                  x: el.animateX,
                  y: el.animateY,
                }}
                transition={{
                  duration: el.duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
        </div>

        {/* Floating Icons - desktop only */}
        <motion.div
          className="hidden md:block absolute top-1/3 right-10 z-[3]"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <FaCode className="text-sky-400 text-3xl" />
        </motion.div>

        <motion.div
          className="hidden md:block absolute top-1/4 left-10 z-[3]"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <FaMobileAlt className="text-sky-400 text-3xl" />
        </motion.div>

        <motion.div
          className="hidden md:block absolute bottom-10 left-1/2 z-[3]"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4.5, repeat: Infinity }}
        >
          <FaLaptopCode className="text-sky-400 text-3xl" />
        </motion.div>

        {/* Dots - desktop only */}
        {mounted &&
          bgDots.map((dot, i) => (
            <motion.div
              key={i}
              className="hidden md:block absolute rounded-full z-[2]"
              style={{
                width: dot.width,
                height: dot.height,
                top: dot.top,
                left: dot.left,
                background: "#28AFDF",
                opacity: 0.15,
              }}
              animate={{
                x: dot.animateX,
                y: dot.animateY,
              }}
              transition={{
                duration: dot.duration,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
      </div>

      {/* MAIN CONTENT: mobile par video ke UPAR content flow me, desktop par flex centering */}
      <div className="order-1 md:order-none relative z-10 w-full max-w-7xl mx-auto px-4 text-center bg-white md:bg-transparent md:h-screen md:flex md:flex-col md:items-center md:justify-center">

        {/* Mobile version: plain elements, zero motion, video ke upar structure format */}
        <div className="flex md:hidden flex-col items-center pt-8 pb-12">
          {/* Badge */}
          <div className="w-fit bg-sky-50 text-sky-700 px-6 py-2 rounded-full mb-6 border border-sky-200 text-xs text-left mr-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block mr-2" />
            #1 Software Development Company
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold mb-6 text-gray-900 leading-normal text-left">
            <span>AI-Driven  </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-400">
              Digital Solutions
            </span>
            <span className="block mt-3 text-xl text-gray-800 font-medium">
              for Apps, Web & Digital Marketing
            </span>
          </h1>

          {/* Stats List */}
          <div className="flex flex-col items-start gap-3 mb-8 text-gray-800 text-sm w-full max-w-xs mx-auto">
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 flex items-center justify-center bg-sky-600 rounded-full text-white text-xs font-bold shrink-0">
                ✓
              </span>
              <span className='font-semibold text-gray-800'>400+ Projects Delivered</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-5 h-5 flex items-center justify-center bg-sky-600 rounded-full text-white text-xs font-bold shrink-0">
                ✓
              </span>
              <span className='font-semibold text-gray-800'>Trusted by 350+ Global Clients</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-5 h-5 flex items-center justify-center bg-sky-600 rounded-full text-white text-xs font-bold shrink-0">
                ✓
              </span>
              <span className='font-semibold text-gray-800'>6+ Years of Innovation</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-8 px-2 text-left">
            Softkingo is a trusted software development company helping businesses build scalable, AI-powered digital solutions. Trusted by 350+ clients worldwide, we deliver secure, innovative, and high-performance software that drives growth.
          </p>

          {/* Buttons - both in one row */}
          <div className="flex flex-row justify-center gap-3 w-full px-2">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 px-4 py-3 h-[48px] rounded-full bg-gradient-to-r from-sky-600 to-sky-400 text-white text-xs sm:text-sm font-medium shadow-lg inline-flex items-center justify-center gap-2"
            >
              Get A Quote
              <FaArrowRight />
              <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0">
                <FaPhoneAlt className="text-black text-xs" />
              </span>
            </button>

            <Link
              href="https://calendly.com/paramhans-softkingo/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-3 h-[48px] rounded-full bg-gradient-to-r from-sky-600 to-sky-400 text-white text-xs sm:text-sm font-medium shadow-lg inline-flex items-center justify-center gap-2"
            >
              Book A Meeting
              <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0">
                <FaBook className="text-black text-xs" />
              </span>
            </Link>
          </div>
        </div>

        {/* Desktop/tablet version: with motion - EXACTLY same as before */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden md:flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div className="bg-sky-50/10 backdrop-blur-sm text-white px-6 py-2 rounded-full mb-6 border border-white/20 text-xs md:text-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block mr-2" />
            #1 Software Development Company
          </motion.div>

          {/* Heading */}
          <motion.h1 className="text-3xl md:text-6xl font-bold mb-6 text-white leading-normal">
            <span>AI-Driven  </span>

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-200">
              Digital Solutions
            </span>

            <span className="block mt-3 text-2xl md:text-4xl text-white">
              for Apps, Web & Digital Marketing
            </span>
          </motion.h1>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-5 md:gap-y-4 mb-8 md:mb-4 text-white text-sm md:text-base">
            <div className="flex items-center gap-1 md:gap-2">
              <span className="w-6 h-6 flex items-center justify-center bg-sky-600 rounded-full text-white text-sm font-bold">
                ✓
              </span>
              <span className='font-extrabold text-2lg text-white'>400+ Projects Delivered</span>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <span className="w-6 h-6 flex items-center justify-center bg-sky-600 rounded-full text-white text-sm font-bold">
                ✓
              </span>
              <span className='font-extrabold text-2lg text-white'>Trusted by 350+ Global Clients</span>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <span className="w-6 h-6 flex items-center justify-center bg-sky-600 rounded-full text-white text-sm font-bold">
                ✓
              </span>
              <span className='font-extrabold text-2lg text-white'>6+ Years of Innovation</span>
            </div>
          </div>

          {/* Description */}
          <motion.p className="text-sm md:text-lg text-gray-200 mb-10 max-w-2xl align-left">
            Softkingo is a trusted software development company helping businesses build scalable, AI-powered digital solutions. Trusted by 350+ clients worldwide, we deliver secure, innovative, and high-performance software that drives growth.
          </motion.p>

          <motion.div className="flex flex-wrap justify-center gap-4 mb-10">
            <button
              onClick={() => setShowModal(true)}
              className="px-3 py-3 h-[45px] rounded-full bg-gradient-to-r from-sky-600 to-sky-400 text-white text-sm font-medium shadow-lg inline-flex items-center gap-3"
            >
              Get A Quote
              <FaArrowRight />
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <FaPhoneAlt className="text-black text-sm" />
              </span>
            </button>

            <Link
              href="https://calendly.com/paramhans-softkingo/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-3 h-[45px] rounded-full bg-gradient-to-r from-sky-600 to-sky-400 text-white text-sm font-medium shadow-lg inline-flex items-center gap-3"
            >
              Book A Meeting
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <FaBook className="text-black text-sm" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <PopupQuoteModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default HeroSection;