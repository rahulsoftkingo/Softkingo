'use client';

import CommonTitle from "@/components/ui/CommonTitle";
import { useState } from "react";


// Move data outside component for better performance
const timelineData = [
  {
    year: 2020,
    title: 'The Beginning',
    description: 'At Softkingo, we empower businesses through complete digital transformation, engineering innovative and scalable solutions. Our mission is to tackle every tech challenge, paving the way for new opportunities and delivering positive ROI.',
    image: '/images/about/r1.png',
  },
  {
    year: 2021,
    title: 'Expansion Phase',
    description: 'We expanded our team and services, delivering cutting-edge solutions to clients across multiple industries, establishing ourselves as a trusted IT partner.',
    image: '/images/about/r2.png',
  },
  {
    year: 2022,
    title: 'Innovation & Growth',
    description: 'Launched innovative products and scaled our operations globally, helping businesses transform digitally with AI and cloud solutions.',
    image: '/images/about/r3.png',
  },
  {
    year: 2023,
    title: 'Market Leadership',
    description: 'Achieved significant milestones in customer satisfaction and project delivery, becoming a market leader in custom software development.',
    image: '/images/about/r4.png',
  },
  {
    year: 2024,
    title: 'Global Recognition',
    description: 'Recognized internationally for excellence in IT services, expanding partnerships and delivering transformative solutions worldwide.',
    image: '/images/about/r1.png',
  },
  {
    year: 2025,
    title: 'Future Forward',
    description: 'Continuing to innovate and lead the industry with next-generation technologies, AI-driven solutions, and sustainable digital transformation.',
    image: '/images/about/r2.png',
  },
];

export default function StoryTimeline() {
  const [activeYear, setActiveYear] = useState(2020);
  
  const currentData = timelineData.find((item) => item.year === activeYear);

  return (
    <section className="relative bg-gradient-to-br from-white via-sky-50 to-sky-200 py-12 md:py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
      
<CommonTitle
    align = "center"
    pill= {false}
    title='The'
    gradientText='SoftKingo Story'
    subtitle= {false}
/> 
        {/* Content Area */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center mb-12 md:mb-16">
          {/* Left - Image */}
          <div key={activeYear} className="relative">
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={currentData.image}
                alt={`Softkingo in ${currentData.year} - ${currentData.title}`}
                className="w-full h-[300px] md:h-[350px] lg:h-[400px] object-cover"
              />
              {/* Year Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 md:p-8">
                  <h3 className="text-5xl md:text-6xl lg:text-8xl font-bold text-white tracking-tight">
                    {currentData.year}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div key={`content-${activeYear}`} className="space-y-4 md:space-y-6">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sky-950">
              {currentData.title}
            </h3>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed">
              {currentData.description}
            </p>
          </div>
        </div>

        {/* Timeline Navigation */}
        <div className="relative">
          {/* Timeline Line - Desktop only */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/30 -translate-y-1/2 hidden sm:block"></div>

          {/* Active Progress Line - Desktop only */}
          <div
            className="absolute top-1/2 left-0 h-1 bg-white -translate-y-1/2 transition-all duration-500 hidden sm:block"
            style={{
              width: `${((activeYear - 2020) / 5) * 100}%`,
            }}
          ></div>

          {/* Year Buttons */}
          <div className="relative flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center gap-4 sm:gap-0">
            {timelineData.map((item) => (
              <button
                key={item.year}
                onClick={() => setActiveYear(item.year)}
                className={`flex flex-col items-center gap-2 transition-all duration-300 group ${
                  activeYear === item.year ? 'scale-110' : 'scale-100'
                }`}
                aria-label={`View ${item.year} timeline`}
              >
                {/* Circle Button */}
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                    activeYear === item.year
                      ? 'bg-white border-white shadow-lg'
                      : 'bg-cyan-400 border-white/50 hover:border-white'
                  }`}
                >
                  {activeYear === item.year && (
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-cyan-500"></div>
                  )}
                </div>

                {/* Year Label */}
                <span
                  className={`text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 ${
                    activeYear === item.year
                      ? 'text-sky-950 scale-110'
                      : 'text-sky-700 group-hover:text-black'
                  }`}
                >
                  {item.year}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Hidden content for SEO - All timeline data */}
        <div className="sr-only">
          {timelineData.map((item) => (
            <div key={item.year}>
              <h3>{item.year} - {item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
