// components/HeroSection.jsx
'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaArrowRight, FaCode, FaMobileAlt, FaLaptopCode, FaChartLine } from 'react-icons/fa';

import RightSec from './professionalcardstack';
import Link from 'next/link';
import PopupQuoteModal from '@/components/PopupQuoteModal';

const HeroSection = () => {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.8) {
          controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <div
      ref={sectionRef}
      className="relative bg-white gradient-to-br from-white via-sky-50 to-sky-100 overflow-hidden max-h-[75vh] sm:max-h-[80vh] md:max-h-[90vh] lg:max-h-screen min-h-[75vh] sm:min-h-[80vh] md:min-h-[90vh] lg:min-h-screen flex items-center md:items-center"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-30">
        {/* <div className="absolute inset-0 
        bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gODAgMCBMIDAgMCAwIDgwIiBmaWxsPSJub25lIiBzdHJva2U9IiMyOEFGREYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4yIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]
        "
        ></div> */}
      </div>
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-sky-200 opacity-10"
            style={{
              width: Math.random() * 150 + 50,
              height: Math.random() * 150 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 50 - 25],
              x: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/3 md:top-1/5 right-0 md:right-1/4 w-12 h-12 rounded-lg bg-transparent shadow-xl flex items-center justify-center"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <FaCode className="text-sky-400 text-2xl" />
      </motion.div>

      <motion.div
        className="absolute top-1/4 md:left-1/4 w-12 h-12 rounded-lg bg-transparent shadow-xl flex items-center justify-center"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
      >
        <FaMobileAlt className="text-sky-400 text-2xl" />
      </motion.div>

      <motion.div
        className="absolute bottom-8 md:bottom-1/4 left-2/4 w-12 h-12 rounded-lg bg-transparent shadow-xl flex items-center justify-center"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
      >
        <FaLaptopCode className="text-sky-400 text-2xl" />
      </motion.div>

      {/* Floating elements */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 15 + 5,
            height: Math.random() * 15 + 5,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            backgroundColor: '#28AFDF',
            opacity: 0.1
          }}
          animate={{
            y: [0, Math.random() * 30 - 15],
            x: [0, Math.random() * 30 - 15],
          }}
          transition={{
            duration: Math.random() * 6 + 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Main content */}
      <div className="container  max-w-7xl mx-auto px-4 sm:px-6 lg:px-28 pt-12 md:pt-12 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col items-center md:items-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block bg-sky-50 text-sky-400 px-6 py-2 rounded-full mb-6 font-medium border border-[#28AFDF]/30 text-xs md:text-md text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="mr-"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /></span> Transforming Businesses Since 2020
            </motion.div>

            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800 leading-tight flex flex-col items-center md:items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="block mb-3 text-sky-950">AI-Driven</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-400">
                Digital Solutions
              </span>
              <span className="text-2xl md:text-3xl lg:text-4xl block mt-3 text-sky-950">for Web, Apps & Digital Marketing</span>
            </motion.h1>

            <motion.p
              className="text-sm md:text-lg text-gray-600 mb-10 max-w-2xl text-center md:text-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Softkingo delivers AI-driven web, app & digital marketing solutions with 6+ years of experience, serving 350+ clients worldwide. We turn ideas into successful digital products.

            </motion.p>

            <motion.div
              className="flex flex-wrap gap-6 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {/* Contact Us (internal) */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 md:px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300 items-center cursor-pointer inline-flex"
                // className="px-4 md:px-6 py-2 rounded-full bg-white  text-sky-400 border border-sky-400 bg-gradient-to-rfrom-sky-600via-sky-500to-sky-400 hover:text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 hover:shadow-lg shadow-sky-900/30 transition-all duration-300  items-center cursor-pointer inline-flex"
                >
                  Get A Quote <FaArrowRight className="ml-2" />
                </button>
              </motion.div>



              {/* Meeting (Calendly external) */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="https://calendly.com/paramhans-softkingo/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 md:px-8 py-2.5 rounded-full bg-white text-[#28AFDF] border border-[#28AFDF] font-medium hover:bg-[#28AFDF]/10 transform hover:-translate-y-1 shadow-lg shadow-[#28AFDF]/30 transition-all duration-300 text-xs md:text-md inline-flex items-center justify-center"
                >
                  <span className="font-semibold text-bas text-xs md:text-md mr-3 group-hover:mr-4 transition-all">
                    Meeting
                  </span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>


            <motion.div
              className="flex flex-wrap items-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="flex items-center">
                {/* <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="w-10 h-10 rounded-full bg-white border-2 border-white shadow-md overflow-hidden"
                      whileHover={{ y: -5 }}
                    >
                      <div className="bg-gradient-to-br from-[#28AFDF] to-[#1e90ff] w-full h-full" />
                    </motion.div>
                  ))}
                </div> */}
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
                        alt={`icon-${i}`}
                        className="object-cover w-full h-full"
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="ml-4">
                  <p className="font-bold text-gray-800">Our</p>
                  <p className="text-sm text-gray-600">Clients</p>
                </div>
              </div>

              <div className="h-8 w-px bg-gray-300 md:flex hidden"></div>

              <div className="md:flex items-center hidden">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-300 to-sky-800 flex items-center justify-center">
                  <span className="text-white font-bold">6+</span>
                </div>
                <div className="ml-4">
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

      {/* Services showcase */}
      <div className="absolute bottom-0 left-0 w-full py-10 z-10 hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#28AFDF] to-[#1e90ff] rounded-xl flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <PopupQuoteModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

const services = [
  {
    icon: <FaCode className="text-white text-xl" />,
    title: "Custom Software",
    description: "Tailored solutions for unique business needs"
  },
  {
    icon: <FaMobileAlt className="text-white text-xl" />,
    title: "Mobile Apps",
    description: "iOS & Android native applications"
  },
  {
    icon: <FaLaptopCode className="text-white text-xl" />,
    title: "Web Development",
    description: "Responsive & high-performance websites"
  },
  {
    icon: <FaChartLine className="text-white text-xl" />,
    title: "Digital Transformation",
    description: "Modernize your business operations"
  }
];

export default HeroSection;