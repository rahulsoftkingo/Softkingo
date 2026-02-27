"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function CloneAbout({ data }) {
  const defaultStats = [
    { number: "10+", label: "Years Experience" },
    { number: "500+", label: "Projects Delivered" },
    { number: "50+", label: "Expert Developers" },
    { number: "24/7", label: "Support Available" }
  ];

  const stats = data?.stats?.length === 4 ? data.stats : defaultStats;
  const reasons = data?.reasons?.length > 0 ? data.reasons : [
    { title: "Expert Development Team", description: "Our team consists of industry veterans with deep expertise in clone script development." },
    { title: "Scalable Architecture", description: "We build solutions that grow with your business, ensuring long-term success." },
    { title: "Cost-Effective Solutions", description: "Get premium quality at a fraction of the cost of building from scratch." }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-3 gap-16 items-start">

          {/* Left Column: Heading, Stats & CTA */}
          <div className="space-y-10 col-span-2">
            <CommonTitle
              title={data?.title || "Why Softkingo is the Best Choice for Your Clone?"}
              subtitle={data?.description || "We combine technical excellence with industry-specific insights to deliver world-class clone solutions."}
              align="left"
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {/* Decorative Blur Background for Stats */}
              <div className="absolute -inset-10 bg-sky-50/50 blur-3xl -z-10 rounded-[3rem]"></div>

              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-xl shadow-sky-900/5 border border-slate-50 group hover:border-sky-100 transition-all duration-300"
                >
                  <div className="space-y-3 text-center">
                    <h3 className="text-4xl md:text-5xl font-black text-[#2FB3E0] group-hover:scale-110 transition-transform">
                      {stat.number}
                    </h3>
                    <p className="text-sky-400 font-bold text-sm md:text-base tracking-tight">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <button className="px-10 py-4 rounded-2xl bg-[#2FB3E0] text-white font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-sky-400/20">
                Let's Discuss Your Project
              </button>
            </motion.div>
          </div>

          {/* Right Column: Reasons To Choose Us */}
          <div className="relative">
            {/* vertical line separator for desktop */}
            <div className="hidden lg:block absolute left-[-48px] top-10 bottom-10 w-px bg-slate-100"></div>

            <div className="space-y-12 pl-0 lg:pl-10">
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-slate-800 tracking-tight">Reasons To Choose Us</h3>
                <div className="w-12 h-1 bg-sky-400 rounded-full"></div>
              </div>

              <div className="space-y-10">
                {reasons.map((reason, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-sky-500 group-hover:text-sky-500 transition-all">
                        <CheckCircle2 size={18} strokeWidth={3} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors leading-tight">
                        {reason.title}
                      </h4>
                      <p className="text-slate-600 font-medium leading-relaxed text-sm md:text-base max-w-sm">
                        {reason.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
