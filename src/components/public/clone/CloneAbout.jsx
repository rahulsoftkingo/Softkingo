"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import CommonTitle from '@/components/ui/CommonTitle';
import Link from 'next/link';

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
    <section className="py-24 bg-white overflow-clip">
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
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 relative">
              {/* Decorative Blur Background for Stats */}
              <div className="absolute -inset-10 bg-sky-50/50 blur-3xl -z-10 rounded-[3rem]"></div>

              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 md:p-8 rounded-2xl shadow-lg shadow-sky-900/5 border border-slate-100 group hover:border-sky-200 transition-all duration-300">
                  <div className="space-y-2 text-center">
                    <h3 className="text-2xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#2FB3E0] to-[#1EAEDB] group-hover:scale-110 transition-transform">
                      {stat.number}
                    </h3>
                    <p className="text-slate-500 font-semibold text-xs md:text-sm uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <Link href={data?.buttonHref || "/contact"}>
                <button className="px-10 py-4 rounded-xl bg-[#2FB3E0] text-white font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-sky-400/20">
                  {data?.buttonLabel || "Let's Discuss Your Project"}
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Reasons To Choose Us */}
          <div className="relative">
            {/* vertical line separator for desktop */}
            <div className="hidden lg:block absolute left-[-48px] top-10 bottom-10 w-px bg-slate-100"></div>

            <div className="space-y-12 pl-0 lg:pl-10">
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-slate-800 ">Reasons To Choose Us</h3>
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
                      <h4 className="text-2xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors leading-normal">
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
