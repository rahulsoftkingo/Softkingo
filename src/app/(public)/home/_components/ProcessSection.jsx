"use client";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { motion } from 'framer-motion';

import arrowAnimation from "@/components/logo/wired-outline-221-arrow-10-hover-streach.json";

function Process() {
  const [current, setCurrent] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const process = [
    { id: 1, title: "Discovery & Strategy", description: "We start by diving deep into your business needs and objectives. This phase includes comprehensive research, market analysis, and strategic planning to create a roadmap aligned with your goals.", image: "/images/process/Rectangle 10.png" },
    { id: 2, title: "Design & Development", description: "Transforming ideas into practical designs and scalable, high-performance digital solutions.", image: "/images/black.jpg" },
    { id: 3, title: "Testing & Quality Assurance", description: "Ensuring every feature works flawlessly through rigorous testing and validation processes.", image: "/images/black.jpg" },
    { id: 4, title: "Launch & Deployment", description: "Deploying the solution securely and efficiently, ensuring a smooth rollout with minimal downtime.", image: "/images/black.jpg" },
    { id: 5, title: "Continuous Support & Optimization", description: "Providing ongoing support and enhancements to keep your solution fast, secure, and effective.", image: "/images/black.jpg" }
  ];

  const handleCardInteraction = (id) => {
    if (isMobile) {
      setCurrent(current === id ? 1 : id);
    } else {
      setCurrent(id);
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-white to-white py-8 md:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-sky-900"
          >
            Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500">
              Process
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Explore our recent projects showcasing our expertise across different industries and technologies
          </motion.p>
        </div>

        {/* Desktop Layout (Row) */}
        <div className="hidden md:flex justify-center">
          <div className="flex w-full max-w-[1265px] h-[619px] space-x-1 transition-all duration-500">
            {process.map((item) => {
              const isActive = current === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => handleCardInteraction(item.id)}
                  onMouseLeave={() => setCurrent(1)}
                  className={`relative overflow-hidden transition-all duration-500 flex ${isActive ? 'flex-[3]' : 'flex-[1]'}`}
                >
                  {/* Arrow overlay: show only if NOT active */}
                  <div className={`absolute inset-0 flex items-start justify-center transition-opacity duration-500 z-10 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                    <Lottie
                      animationData={arrowAnimation}
                      loop
                      style={{ width: 100, height: 100, filter: 'brightness(0) invert(1)' }}
                    />
                  </div>

                  {/* Rotated title: hide when active */}
                  <p className={`-rotate-90 font-bold text-white text-[20px] absolute left-1/2 top-1/2 transform transition-all duration-700 ease-in-out z-10 whitespace-nowrap ${isActive ? 'opacity-0 translate-x-full' : '-translate-x-1/2 -translate-y-1/2 opacity-100'}`}>
                    {item.title}
                  </p>

                  {/* Detail panel: show when active */}
                  <div
                    className={`absolute bottom-4 left-4 p-6 transform transition-all duration-500 ease-in-out text-white whitespace-normal z-10 bg-white/20 backdrop-blur-md rounded-2xl ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
                    style={{ width: '400px' }}
                  >
                    <p className="font-semibold text-2xl">{item.title}</p>
                    <p className="text-[16px] font-light mt-3">{item.description}</p>
                  </div>

                  {/* Background image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover brightness-50 z-0"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Layout (Column) */}
        <div className="md:hidden flex flex-col items-center space-y-2">
          {process.map((item) => {
            const isActive = current === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleCardInteraction(item.id)}
                className={`relative overflow-hidden transition-all duration-500 w-full ${isActive ? 'h-[300px]' : 'h-[80px]'}`}
              >
                {/* Arrow overlay */}
                <div className={`absolute inset-0 flex items-start justify-end transition-opacity duration-500 z-10 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                  <Lottie
                    animationData={arrowAnimation}
                    loop
                    style={{
                      width: 60,
                      height: 60,
                      filter: 'brightness(0) invert(1)',
                      transform: 'rotate(90deg)'
                    }}
                  />
                </div>

                <p className="font-bold text-white text-[18px] absolute top-4 left-4 z-10">
                  {item.title}
                </p>

                <div className={`absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/20 backdrop-blur-md text-white whitespace-normal z-10 transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
                  <p className="text-[12px] font-light mt-3">{item.description}</p>
                </div>

                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover brightness-50 z-0"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Process;
