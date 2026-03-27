"use client";

import React, { useState } from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import { motion, AnimatePresence } from 'framer-motion';

export default function CloneProcess({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const defaultSteps = [
    { title: "Consulting, Discovery, And Product Definition", description: "Every project begins with discovery. Our experts hold workshops to understand your goals, audience, and business model. This phase helps identify what kind of platform to build, whether it's community-driven, content-led, or creator-focused and how our social media application development services can turn that vision into a working product." },
    { title: "Strategic Planning & UI/UX Design", description: "We define the technical architecture and create intuitive, high-fidelity designs. Our focus is on user engagement and seamless navigation, ensuring your clone app feels premium and familiar yet uniquely yours." },
    { title: "Robust Core Development", description: "Our developers build the engine of your application using modern tech stacks. We implement scalable backend systems and responsive frontend interfaces to handle high traffic and complex interactions." },
    { title: "AI & Third-Party Integration", description: "Enhance your app with smart features like AI-driven recommendations, real-time chats, and secure payment gateways. We integrate the best-in-class APIs to give your users a complete experience." },
    { title: "Quality Assurance & Testing", description: "Rigorous testing across multiple devices and network conditions. We ensure your app is bug-free, secure, and performs optimally before it reaches your first user." },
    { title: "Market-Ready Launch & Support", description: "We handle the deployment process to App Store and Google Play. Post-launch, we provide continuous monitoring and updates to keep your application competitive and synchronized with market trends." }
  ];

  const steps = data?.items?.length > 0 ? data.items : defaultSteps;
  const currentStep = steps[activeIndex] || steps[0];

  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-clip">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2FB3E0 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <CommonTitle
            title={data?.title || "Our Complete Clone App Development Process"}
            subtitle={data?.subtitle || "As a leading clone app development company, our developers at Softkingo can help you build a top-tier solution tailored to your business-specific needs."}
            center={true}
          />
        </div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">

          {/* Left: Interactive Steps List */}
          <div className="relative">
            {/* Vertical Dotted Line */}
            <div className="absolute right-[19px] top-8 bottom-8 w-[2px] border-r-2 border-dashed border-sky-100 hidden md:block"></div>

            <div className="space-y-6">
              {steps.map((step, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setActiveIndex(i)}
                  className="flex items-center justify-end gap-0 group cursor-pointer"
                >
                  {/* Item Capsule */}
                  <div className={`
                                        flex-1 max-w-[340px] flex items-center gap-4 px-6 py-4 rounded-xl border transition-all duration-500
                                        ${activeIndex === i
                      ? 'bg-gradient-to-r from-sky-500 to-sky-400 border-sky-400 shadow-lg shadow-sky-500/20 text-white'
                      : 'bg-white border-slate-100 text-slate-600 hover:border-sky-200 hover:bg-sky-50/50'
                    }
                                    `}>
                    <div className={`
                                            w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors
                                            ${activeIndex === i ? 'bg-white/20' : 'bg-slate-50 group-hover:bg-sky-100'}
                                        `}>
                      {step.icon ? (
                        <img src={step.icon} alt="" className="w-5 h-5 object-contain" />
                      ) : (
                        <div className={`w-5 h-5 rounded-md ${activeIndex === i ? 'bg-white' : 'bg-sky-500'} opacity-50`}></div>
                      )}
                    </div>
                    <span className="text-xs md:text-sm font-semibold leading-normal uppercase tracking-wide">
                      {step.title}
                    </span>
                  </div>

                  {/* Horizontal Notch Connector */}
                  <div className={`
                                        w-12 h-[2px] transition-all duration-500 hidden md:block
                                        ${activeIndex === i ? 'bg-sky-400' : 'bg-transparent'}
                                    `}></div>

                  {/* Step Number Circle */}
                  <div className={`
                                        w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-xs z-10 transition-all duration-500 hidden md:flex
                                        ${activeIndex === i
                      ? 'bg-white border-4 border-sky-500 text-sky-600 scale-110 shadow-lg'
                      : 'bg-white border-2 border-slate-100 text-slate-300'
                    }
                                    `}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Detailed Content Card */}
          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white rounded-xl overflow-hidden shadow-2xl shadow-sky-900/5 border border-slate-50 h-full flex flex-col"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-[#2FB3E0] to-[#2FB3E0]/80 p-6 md:p-8 relative overflow-hidden">
                  <div className="absolute right-[-20px] top-[-20px] text-[180px] font-extrabold text-white/10 leading-none select-none">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-normal relative z-10 max-w-[80%]">
                    {currentStep.title}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-6 md:p-8 flex-1 rounded-t-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-sky-400 to-sky-300 mt-1.5 shrink-0 shadow-lg shadow-sky-400/30"></div>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                      {currentStep.description}
                    </p>
                  </div>

                  {/* Decorative Placeholder or Image if available */}
                  {currentStep.image && (
                    <div className="mt-8 rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
                      <img src={currentStep.image} alt={currentStep.title} className="w-full h-auto object-cover" />
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
