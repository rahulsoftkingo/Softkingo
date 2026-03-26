// components/HeroSection.jsx
'use client';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaArrowRight, FaCode, FaMobileAlt, FaLaptopCode, FaChartLine } from 'react-icons/fa';

import RightSec from './ProfessionalCardStack';


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
    // Generate random elements once on mount
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
      className="relative bg-white bg-gradient-to-br from-white via-sky-50 to-sky-100 overflow-hidden max-h-[75vh] sm:max-h-[80vh] md:max-h-[90vh] lg:max-h-screen min-h-[75vh] sm:min-h-[80vh] md:min-h-[90vh] lg:min-h-screen flex items-center md:items-center"
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {mounted && bgElements.map((el, i) => (
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
              y: el.animateY,
              x: el.animateX,
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Floating elements - restricted horizontally for mobile */}
      <motion.div
        className="absolute top-1/3 md:top-1/5 right-4 md:right-1/4 w-12 h-12 rounded-lg bg-transparent shadow-xl flex items-center justify-center"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <FaCode className="text-sky-400 text-2xl" />
      </motion.div>

      <motion.div
        className="absolute top-1/4 left-4 md:left-1/4 w-12 h-12 rounded-lg bg-transparent shadow-xl flex items-center justify-center"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
      >
        <FaMobileAlt className="text-sky-400 text-2xl" />
      </motion.div>

      <motion.div
        className="absolute bottom-8 md:bottom-1/4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-2/4 w-12 h-12 rounded-lg bg-transparent shadow-xl flex items-center justify-center"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
      >
        <FaLaptopCode className="text-sky-400 text-2xl" />
      </motion.div>

      {/* Floating dots */}
      {mounted && bgDots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: dot.width,
            height: dot.height,
            top: dot.top,
            left: dot.left,
            backgroundColor: '#28AFDF',
            opacity: 0.1
          }}
          animate={{
            y: dot.animateY,
            x: dot.animateX,
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Main content */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left content */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col items-center md:items-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="inline-block bg-sky-50 text-sky-400 px-6 py-2 rounded-full mb-6 font-medium border border-[#28AFDF]/30 text-xs md:text-md text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span ><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" /></span> Transforming Businesses Since 2020
            </motion.div>
 
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800 leading-normal flex flex-col items-center md:items-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="block mb-3 text-sky-950">AI-Driven</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-400">
                Digital Solutions
              </span>
              <span className="text-2xl md:text-3xl lg:text-4xl block mt-3 text-sky-950 text-center md:text-start">for Apps, Web & Digital Marketing</span>
            </motion.h1>

            <motion.p
              className="text-sm md:text-lg text-gray-600 mb-10 max-w-2xl text-center md:text-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Softkingo delivers AI-driven web, app & digital marketing solutions with 6+ years of experience, serving 350+ clients worldwide. We turn ideas into successful digital products.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-6 mb-10 justify-center md:justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 md:px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium shadow-lg shadow-sky-900/30 transition-all duration-300 inline-flex items-center cursor-pointer"
                >
                  Get A Quote <FaArrowRight className="ml-2" />
                </button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="https://calendly.com/paramhans-softkingo/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 md:px-8 py-2.5 rounded-full bg-white text-[#28AFDF] border border-[#28AFDF] font-medium shadow-lg shadow-[#28AFDF]/30 transition-all duration-300 text-xs md:text-md inline-flex items-center justify-center"
                >
                  <span className="font-semibold text-xs md:text-md mr-3 transition-all">
                    Meeting
                  </span>
                  <FaArrowRight />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-8 justify-center md:justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  {[
                    "/images/client/client1.png",
                    "/images/client/client5.png",
                    "/images/client/client2.png",
                    "/images/client/client3.png"
                  ].map((src, i) => (
                    <motion.div
                      key={i}
                      className="w-10 h-10 rounded-full bg-white border-2 border-white shadow-md overflow-hidden"
                      whileHover={{ y: -5 }}
                    >
                      <img
                        src={src}
                        alt={`client-${i}`}
                        className="object-cover w-full h-full"
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="ml-4 text-center md:text-start">
                  <p className="font-bold text-gray-800">Our</p>
                  <p className="text-sm text-gray-600">Clients</p>
                </div>
              </div>

              <div className="h-8 w-px bg-gray-300 hidden md:block"></div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-300 to-sky-800 flex items-center justify-center">
                  <span className="text-white font-bold">6+</span>
                </div>
                <div className="ml-4 text-center md:text-start">
                  <p className="font-bold text-gray-800">Years</p>
                  <p className="text-sm text-gray-600">Experience</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - Professional card stack */}
          <RightSec />
        </div>
      </div>

      <PopupQuoteModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default HeroSection;