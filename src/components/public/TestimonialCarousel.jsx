// components/TestimonialCarousel2.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { testimonials } from "@/data/testimonials";
export default function TestimonialCarousel({ 
  autoPlay = true, 
  interval = 5000,
  columns = 'auto'
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [calculatedColumns, setCalculatedColumns] = useState(1);
  const [imageErrors, setImageErrors] = useState({});
  const containerRef = useRef(null);

useEffect(() => {
  if (typeof columns === 'object') {
    // Responsive breakpoints set karo
    setCalculatedColumns(columns.lg || columns.md || 1);
    return;
  }
  
  if (columns !== 'auto') {
    setCalculatedColumns(columns);
    return;
  }
  
  // Auto responsive logic (tumhara existing code)
  const observer = new ResizeObserver((entries) => {
    const width = entries[0].contentRect.width;
    if (width < 400) setCalculatedColumns(1);
    else if (width < 900) setCalculatedColumns(2);  // Tablet
    else if (width < 1200) setCalculatedColumns(3); // Laptop
    else setCalculatedColumns(3); // Large desktop
  });
  
  if (containerRef.current) observer.observe(containerRef.current);
  return () => observer.disconnect();
}, [columns]);

  useEffect(() => {
    if (!autoPlay || isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, isHovered, testimonials.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div 
      ref={containerRef}
      className="w-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="grid gap-5 pr-6"
        style={{ 
          gridTemplateColumns: `repeat(${calculatedColumns}, minmax(0, 1fr))`
        }}
      >
        {Array.from({ length: calculatedColumns }).map((_, index) => {
          const testimonialIndex = (currentIndex + index) % testimonials.length;
          const testimonial = testimonials[testimonialIndex];
          const hasImageError = imageErrors[testimonialIndex];
          
          return (
            <div 
              key={index}
              className="relative pt-8"
            >
              {/* Clutch Badge */}
              <div className="absolute top-3 left-8 z-10">
                <div className="bg-white rounded-sm shadow-sm px-5 py-2  flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">{testimonial.source}</span>
                  <div className="flex items-center gap-0.5 bg-orange-50 px-1.5 py-0.5 rounded">
                    <span className="text-orange-500 text-xs">★</span>
                    <span className="text-xs font-bold">5.0</span>
                  </div>
                  <span className="text-[9px] font-bold text-gray-500 uppercase">100+</span>
                </div>
              </div>

              {/* Card */}
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all p-6 ">
                <div className="flex items-start gap-4 mb-5">
                  {/* Profile Image */}
                  <div className={`relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 shadow-md border-2 border-white ${hasImageError ? 'bg-gradient-to-br from-sky-400 to-blue-600' : ''}`}>
                    {!hasImageError ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(testimonialIndex)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                        {testimonial.avatar}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">
                      {testimonial.title}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 text-base leading-relaxed">
                  {testimonial.review}
                  <span className="text-orange-500 text-2xl ml-1">❞</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Arrow Button */}
      <button 
        onClick={next}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-sky-400 hover:bg-sky-50 flex items-center justify-center transition-all hover:scale-110 shadow-lg z-20"
        aria-label="Next testimonial"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
