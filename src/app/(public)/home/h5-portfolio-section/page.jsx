// app/page.js
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { FaArrowRight } from 'react-icons/fa';

export default function PortfolioSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: "App Development Portfolio",
      description: "Innovative mobile solutions crafted with Flutter, React Native, and Swift. We build cross-platform applications that deliver exceptional user experiences.",
      stats: [
        { label: "Projects", value: "48+" },
        { label: "Clients", value: "32" },
        { label: "Rating", value: "4.9★" }
      ],
      color: "from-sky-600 to-sky-400",
      image: (
        <div className="relative w-full h-64 md:h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl shadow-2xl"></div>
          <div className="absolute -top-4 -right-4 w-full h-full bg-white border  gradient-to-br from-blue-400 to-purple-500 rounded-2xl transform rotate-3"></div>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-6">
          <img src='/images/services/web-bg.png' />
            {/* <div className="text-white text-4xl mb-4">📱</div> */}
            <h3 className="text-sky-800 text-xl font-bold text-center">Mobile Apps</h3>
            <p className="text-sky-500 text-center mt-2">iOS & Android Solutions</p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Web Development Portfolio",
      description: "Modern web applications built with Next.js, React, and Tailwind CSS. We create responsive, performant websites with optimal user experience.",
      stats: [
        { label: "Projects", value: "56+" },
        { label: "Clients", value: "41" },
        { label: "Rating", value: "4.8★" }
      ],
      color: "from-sky-600 to-sky-400",
      image: (
        <div className="relative w-full h-54 md:h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl shadow-2xl"></div>
          <div className="absolute -top-4 -right-4 w-full h-full bg-white -gradient-to-br from-green-400 to-teal-500 rounded-2xl transform rotate-3"></div>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-6">
          <img src='/images/services/web-bg.png' />
            {/* <div className="text-white text-4xl mb-4">💻</div> */}
            <h3 className="text-sky-800 text-xl font-bold text-center">Web Solutions</h3>
            <p className="text-sky-500 text-center mt-2">Responsive & Modern</p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Digital Marketing Portfolio",
      description: "Comprehensive digital solutions including UI/UX design, branding, and digital marketing strategies that drive business growth.",
      stats: [
        { label: "Projects", value: "36+" },
        { label: "Clients", value: "28" },
        { label: "Rating", value: "4.7★" }
      ],
      color: "from-sky-600 to-sky-400",
      image: (
        <div className="relative w-full h-64 md:h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl shadow-2xl"></div>
          <div className="absolute -top-4 -right-4 w-full h-full bg-white -gradient-to-br from-amber-400 to-orange-500 rounded-2xl transform rotate-3"></div>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-6

          transform transition-all duration-300
    hover:rotate-2 hover:scale-105">
          <img src='/images/services/seo-bg.png' />
            {/* <div className="text-white text-4xl mb-4">🎨</div> */}
            <h3 className="text-sky-800 text-xl font-bold text-center">Digital Services</h3>
            <p className="text-sky-500 text-center mt-2">Creative Solutions</p>
          </div>
        

        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-sky-200 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-sky-900"
          >
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-sky-600">Portfolio</span> 
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Discover our work across different domains. Click the categories below to explore.
          </motion.p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {slides.map((slide, index) => (
            <motion.button
              key={slide.id}
              onClick={() => setActiveSlide(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 md:px-6 py-2 md:py-2 lg:py-2 rounded-full font-xs md:font-medium text-xs md:text-sm  transition-all duration-300 ${
                activeSlide === index
                  ? `bg-gradient-to-r ${slide.color} text-white font-xs md:text-sm text-xs md:font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 hover:bg-sky-60 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300`
                  : "bg-white text-primary shadow-md hover:bg-gray-50"
              }`}
            >
                {/* first word, only visible below md */}
    <span className="inline md:hidden">
      {slide.title.split(" ")[0]}
    </span>
    {/* full title, only visible from md up */}
    <span className="hidden md:inline">
      {slide.title}
    </span>
              {/* {slide.title.split(" ")[0]} */}
            </motion.button>
          ))}
        </div>

        {/* Slider Container - Mobile Card Style */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6"
            >
              {/* Visual Section (Top) */}
              <div className="h-48">
                {slides[activeSlide].image}
              </div>
              
              {/* Content Section (Bottom) */}
              <div className="p-6">
                <div className="text-sm font-semibold text-gray-500 mb-2">
                  PORTFOLIO CATEGORY
                </div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">
                  {slides[activeSlide].title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {slides[activeSlide].description}
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {slides[activeSlide].stats.map((stat, i) => (
                    <div 
                      key={i}
                      className="bg-gray-50 p-3 rounded-lg text-center"
                    >
                      <div className="text-lg font-bold text-sky-700">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full py-2.5 rounded-full bg-gradient-to-l from-primary via-sky-500 to-sky-600 text-white font-medium">
                  View Projects
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Container - Desktop */}
        <div className="hidden md:block relative bg-white rounded-3xl shadowxl overflow-hidden h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex"
            >
              {/* Content Section (Left) */}
              <div className="w-1/2 p-10 flex flex-col justify-center">
                <div className="mb-6">
                  <div className="text-sm font-semibold text-gray-500 mb-2">
                    PORTFOLIO CATEGORY
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    {slides[activeSlide].title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {slides[activeSlide].description}
                  </p>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {slides[activeSlide].stats.map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gray-50 p-4 rounded-xl text-center shadow-sm"
                    >
                      <div className="text-2xl font-bold text-sky-700">{stat.value}</div>
                      <div className="text-gray-500 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 md:px-6 py-2 md:py-2 lg:py-2 rounded-full bg-gradient-to-r from-sky-600 to-sky-400 text-white font-xs md:text-sm text-xs md:font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 hover:bg-sky-60 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300  self-start flex items-center group"
                >
                  View Projects <FaArrowRight className="ml-2 group-hover:ml-3 group-hover:translate-x-1 transition-transform" />
                  
                </motion.button>
              </div>
              
              {/* Visual Section (Right) */}
              <div className="w-1/2 p-8 flex items-center justify-center">
                <div className="w-full h-full max-w-md">
                  {slides[activeSlide].image}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                activeSlide === index
                  ? "bg-sky-600 w-8"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Testimonials */}
        <div className="hidden mt-16 max-w-4xl mx-auto">
          <h3 className="text-center text-xl font-semibold text-gray-700 mb-8">What Our Clients Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <div className="font-medium">Client {i+1}</div>
                    <div className="text-sm text-gray-500">Project: {slides[i].title.split(" ")[0]}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"Exceptional work on our {slides[i].title.split(" ")[0].toLowerCase()} project. Highly recommended!"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}