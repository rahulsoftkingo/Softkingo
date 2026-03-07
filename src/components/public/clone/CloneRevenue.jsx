"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function CloneRevenue({ data }) {
  const [activeTab, setActiveTab] = useState(0);

  const defaultTitle = "Our Revenue Model";
  const defaultHighlight = "Scalable, Transparent. \nBuilt For long term growth.";
  const defaultRightDesc = "At Softkingo, we consistently stay ahead of the competition by using the latest tools and technologies in mobile app development. Our commitment to innovation ensures superior services that meet our clients' evolving needs.";

  const defaultTabs = [
    {
      label: "Fixed Cost Development Model",
      title: "Fixed Cost development Model",
      description: "This AI-based feature determines pricing based on traffic, cab demand, and availability, ensuring a competitive advantage with real-time pricing models to benefit both drivers and riders through:",
      bullets: ["No Hidden cost", "Milestone based payments", "Lifetime technical guidance"],
      image: "/images/revenue/fixed-cost.png"
    },
    {
      label: "SaaS-Based Subscription Model",
      title: "SaaS-Based Subscription",
      description: "Perfect for long-term partnerships with recurring revenue streams. Our SaaS model provides continuous updates and premium support.",
      bullets: ["Monthly/Yearly plans", "Multi-tenant architecture", "Seamless scaling"],
      image: "/images/revenue/saas.png"
    },
    {
      label: "Revenue Sharing Partnership",
      title: "Revenue Sharing",
      description: "We grow as you grow. This model is designed for high-potential startups looking for a technical partner rather than just a vendor.",
      bullets: ["Shared risk", "Success-driven development", "Co-innovation"],
      image: "/images/revenue/sharing.png"
    },
    {
      label: "White-Label Licensing",
      title: "White-Label Licensing",
      description: "Quickest way to market. Buy the license once and launch under your own brand with minimal setup time.",
      bullets: ["Source code ownership", "Custom branding", "One-time fee"],
      image: "/images/revenue/licensing.png"
    }
  ];

  const tabs = data?.tabs?.length > 0 ? data.tabs : defaultTabs;

  return (
    <section className="py-24 bg-[#E6F4FA]/50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12 items-start">
          <div className="space-y-4">
            <h4 className="text-[#2FB3E0] font-black text-3xl lg:text-4xl  tracking-tighter">
              {data?.title || defaultTitle}
            </h4>
            <h2 className="text-3xl lg:text-4xl  font-black text-slate-900 leading-tight whitespace-pre-line">
              {data?.highlight || defaultHighlight}
            </h2>
          </div>

          <div className="lg:pt-14">
            <p className="text-slate-600 font-bold text-sm leading-relaxed max-w-lg">
              {data?.rightDesc || defaultRightDesc}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-sky-900/5 overflow-hidden mb-12 border border-white/50">
          <div className="flex flex-col md:flex-row items-stretch">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex-1 px-8 py-8 text-sm font-black transition-all duration-300 border-b-4 md:border-b-0 md:border-r last:border-r-0 border-slate-100 ${activeTab === index
                  ? "text-slate-900 bg-white"
                  : "text-slate-400 bg-slate-50/50 hover:bg-slate-50 hover:text-slate-600"
                  }`}
              >
                <span className={`block text-left relative ${activeTab === index ? 'after:content-[""] after:absolute after:-bottom-4 after:left-0 after:w-12 after:h-1 after:bg-[#2FB3E0] after:rounded-full' : ''}`}>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-[3rem] p-8 lg:p-20 shadow-2xl shadow-sky-900/5 relative overflow-hidden group border border-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <div className="space-y-8">
                <h3 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight ">
                  {tabs[activeTab].title}
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                  {tabs[activeTab].description}
                </p>

                <ul className="space-y-4">
                  {(tabs[activeTab].bullets || []).map((bullet, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-800 font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#2FB3E0]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative  aspect-[4/4]">
                <Image
                  src={tabs[activeTab].image || "/images/placeholder-revenue.png"}
                  alt={tabs[activeTab].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Bottom Glow Effect */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#2FB3E0]/20 blur-3xl rounded-full" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
