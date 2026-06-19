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
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >


      <img
        src="/videos/frame.png"
        alt="Softkingo"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/softkingovideo.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      {/* Background bubbles */}
      <div className="absolute inset-0 overflow-hidden z-[2]">
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

      {/* Floating Icons */}
      <motion.div
        className="absolute top-1/3 right-10 z-[3]"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <FaCode className="text-sky-400 text-3xl" />
      </motion.div>

      <motion.div
        className="absolute top-1/4 left-10 z-[3]"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <FaMobileAlt className="text-sky-400 text-3xl" />
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 z-[3]"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4.5, repeat: Infinity }}
      >
        <FaLaptopCode className="text-sky-400 text-3xl" />
      </motion.div>

      {/* Dots */}
      {mounted &&
        bgDots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full z-[2]"
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

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div className="bg-sky-50/10 backdrop-blur-sm text-white px-6 py-2 rounded-full mb-6 border border-white/20 text-xs md:text-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block mr-2" />
            #1 Software Development Company
          </motion.div>

          {/* Heading */}
          <motion.h1 className="text-3xl md:text-6xl font-bold mb-6 text-white leading-normal">
            <span className="">AI-Driven  </span>

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-200">
              Digital Solutions
            </span>

            <span className="block mt-3 text-2xl md:text-4xl text-white">
              for Apps, Web & Digital Marketing
            </span>
          </motion.h1>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-5 md:gap-y-4 mb-8 md:mb-4 text-white text-sm md:text-base">

            <div className="flex items-center gap-1 md:gap-2">
              <span className="w-6 h-6 flex items-center justify-center bg-sky-600 rounded-full text-white text-xs font-bold">
                ✓
              </span>
              <span>400+ Projects Delivered</span>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <span className="w-6 h-6 flex items-center justify-center bg-sky-600 rounded-full text-white text-xs font-bold">
                ✓
              </span>
              <span>Trusted by 350+ Global Clients</span>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <span className="w-6 h-6 flex items-center justify-center bg-sky-600 rounded-full text-white text-xs font-bold">
                ✓
              </span>
              <span>6+ Years of Innovation</span>
            </div>

          </div>

          {/* Description */}
          <motion.p className="text-sm md:text-lg text-gray-200 mb-10 max-w-2xl">
            Softkingo is a trusted software development company helping businesses build scalable, AI-powered digital solutions. Trusted by 350+ clients worldwide, we deliver secure, innovative, and high-performance software that drives growth.
          </motion.p>

          {/* Buttons */}
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

          {/* Clients & Experience */}
          <div className="flex items-center gap-8 flex-wrap justify-center">
            {/* <div className="flex items-center">
              <div className="flex -space-x-3">
                {[
                  "/images/client/client1.png",
                  "/images/client/client5.png",
                  "/images/client/client2.png",
                  "/images/client/client3.png",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="client"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>

              <div className="ml-4 text-left">
                <p className="font-bold text-white">Our</p>
                <p className="text-sm text-gray-300">Clients</p>
              </div>
            </div> */}

            {/* <div className="h-8 w-px bg-gray-400" /> */}

            {/* <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-300 to-sky-800 flex items-center justify-center text-white font-bold">
                6+
              </div>

              <div className="ml-4 text-left">
                <p className="font-bold text-white">Years</p>
                <p className="text-sm text-gray-300">Experience</p>
              </div>
            </div> */}
          </div>
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