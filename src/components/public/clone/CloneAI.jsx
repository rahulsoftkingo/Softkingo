"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Cpu, Zap, Brain, Shield, Rocket, Globe } from 'lucide-react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function CloneAI({ data }) {
    const defaultFeatures = [
        {
            title: "Advanced Data Security",
            description: "Protecting user data with enterprise-grade encryption and secure access controls to ensure maximum privacy."
        },
        {
            title: "Real-time AI Analytics",
            description: "Leveraging machine learning to provide actionable insights and trend analysis for business growth."
        },
        {
            title: "Custom User Experiences",
            description: "Crafting personalized interfaces that adapt to user behavior through intelligent design systems."
        },
        {
            title: "Strategic API Integrations",
            description: "Seamlessly connecting your platform with third-party tools to expand functionality and reach."
        },
        {
            title: "Performance Optimization",
            description: "High-speed infrastructure designed to handle millions of requests with low latency and high availability."
        },
        {
            title: "Global Scalability",
            description: "Cloud-native solutions that grow alongside your user base, supporting multi-region deployments."
        }
    ];

    const features = data?.items?.length > 0 ? data.items : defaultFeatures;

    // Icon mapping logic based on index or keywords
    const getFeatureIcon = (index) => {
        const icons = [Bot, Sparkles, Cpu, Zap, Brain, Shield, Rocket, Globe];
        const IconComponent = icons[index % icons.length] || Zap;
        return <IconComponent className="text-white" size={32} />;
    };

    return (
        <section className="py-8 md:py-16 bg-white overflow-clip">
            <div className="max-w-7xl mx-auto px-6">

                <CommonTitle
                    title={data?.title || "Advanced Features"}
                    subtitle={data?.subtitle || "Leverage cutting-edge technologies and intelligent systems to stay ahead in the competitive market."}
                    align="center"
                />

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-16 mt-16">
                    {features.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative flex items-center group"
                        >
                            {/* Icon Container - Overlapping the card */}
                            <div className="absolute left-0 z-10 transition-transform duration-300 group-hover:scale-110">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_10px_25px_rgba(79,195,247,0.4)] border-4 border-white">
                                    {getFeatureIcon(i)}
                                </div>
                            </div>

                            {/* Card Content with Title and Description */}
                            <div className="ml-10 flex-1 bg-white rounded-2xl p-8 pl-14 min-h-[160px] flex flex-col justify-center border border-slate-100 hover:border-sky-100 hover:shadow-xl hover:shadow-sky-900/5 transition-all duration-300">
                                <h4 className="text-[#1e293b] text-lg font-extrabold mb-2 group-hover:text-sky-600 transition-colors">
                                    {item.title}
                                </h4>
                                <p className="text-[#64748b] text-sm md:text-base font-medium leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
