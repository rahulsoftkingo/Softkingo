"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import CommonTitle from "@/components/ui/CommonTitle";

const IndustryProcess = ({ data }) => {
  const containerRef = useRef(null);

  // Scroll progress for the vertical line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (!data || !data.steps) return null;

  return (
    <section ref={containerRef} className="py-24 bg-white px-6 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-sky-100 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <CommonTitle
          title={data.title || "Our Development Process"}
          subtitle={data.subtitle || "A systematic, results-driven approach to every project we undertake."}
          pill={true}
          gradientText={data.gradientText || "Process"}
        />

        <div className="relative mt-24 max-w-5xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleY }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-sky-400 via-sky-600 to-blue-700 origin-top h-full shadow-[0_0_15px_rgba(14,165,233,0.5)]"
            />
          </div>

          <div className="space-y-20 md:space-y-28 relative">
            {data.steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row items-center gap-10 md:gap-20 ${isEven ? "md:flex-row-reverse" : ""
                    }`}
                >
                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -60 : 60, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 w-full"
                  >
                    <motion.div
                      whileHover={{ y: -8, scale: 1.01 }}
                      className={`p-8 md:p-10 bg-white rounded-2xl border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:border-sky-200 transition-all duration-500 group relative overflow-hidden ${isEven ? "md:text-left" : "md:text-right"
                        }`}
                    >
                      {/* Subtle background number */}
                      <span className="absolute -top-4 -right-2 text-8xl font-bold text-slate-50 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                        {i + 1}
                      </span>

                      <div className={`flex items-center gap-5 mb-6 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 text-sky-600 flex items-center justify-center text-xl font-bold shadow-inner group-hover:from-sky-600 group-hover:to-blue-700 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <h4 className="text-2xl font-bold text-slate-800 tracking-tight group-hover:text-sky-600 transition-colors">
                          {step.title}
                        </h4>
                      </div>

                      <p
                        className="text-slate-500 leading-relaxed text-base md:text-lg"
                        dangerouslySetInnerHTML={{ __html: step.description }}
                      />

                      {/* Animated bottom bar */}
                      <div className={`absolute bottom-0 h-1 bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-500 ${isEven ? "right-0 w-0 group-hover:w-1/2" : "left-0 w-0 group-hover:w-1/2"
                        }`} />
                    </motion.div>
                  </motion.div>

                  {/* Central Node */}
                  <div className="relative z-30 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, damping: 12, delay: i * 0.15 }}
                      className="w-14 h-14 rounded-[1.2rem] bg-white border-4 border-sky-500 shadow-[0_0_25px_rgba(14,165,233,0.3)] flex items-center justify-center group"
                    >
                      <div className="w-4 h-4 rounded-full bg-sky-500 animate-pulse group-hover:scale-125 transition-transform" />

                      {/* Floating Ring hover effect */}
                      <div className="absolute inset-0 rounded-[1.2rem] border-2 border-sky-400 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
                    </motion.div>
                  </div>

                  {/* Desktop Spacer */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryProcess;
