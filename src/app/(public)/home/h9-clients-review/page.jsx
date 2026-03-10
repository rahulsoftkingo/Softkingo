"use client";
import { useState, useEffect } from "react";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TestimonialCarousel from "@/components/public/TestimonialCarousel";

const ReviewsSection = () => {
  return (
    <section className="relative w-full py-12 md:py-16 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#28AFDF]/10 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#28AFDF]/20 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="text-center mb-22">
          <motion.h2
            initial={{ opacity: 0, y: -18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-sky-900"
          >
            What Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500">
              Clients Say
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Real feedback from teams we&apos;ve worked with—focused on delivery quality, communication, and outcomes.
          </motion.p>
        </div>
        <TestimonialCarousel />

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto hidden">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-[#28AFDF]">98%</div>
            <div className="text-gray-600 mt-2">Client Satisfaction</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-[#28AFDF]">850+</div>
            <div className="text-gray-600 mt-2">Projects Completed</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-[#28AFDF]">15+</div>
            <div className="text-gray-600 mt-2">Industry Awards</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-[#28AFDF]">99.7%</div>
            <div className="text-gray-600 mt-2">On-Time Delivery</div>
          </div>
        </div>

        {/* Client logos */}
        <div className="mt-20 hidden md:block">
          <h3 className="text-center text-gray-500 font-medium mb-8">Trusted by innovative companies worldwide</h3>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {[
              "Clutch", "Google", "CloudNine",
              "DigiCore", "FutureLabs", "QuantumLeap"
            ].map((company, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-xl shadow-sm w-28 h-16 md:w-32 md:h-20 flex items-center justify-center border border-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-lg font-bold text-gray-400">{company}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;