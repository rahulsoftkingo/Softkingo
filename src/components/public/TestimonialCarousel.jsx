// components/TestimonialCarousel.jsx
'use client';

import { useState, useEffect, useRef } from 'react';

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

  const testimonials = [
    {
      name: "Mike Stafiej",
      title: "CEO, ERIN",
      review: "Softkingo has allowed us to scale with the needs of our customers. They do go above and beyond to make sure the job is complete to satisfaction.",
      image: "/images/client/client1.png",
      avatar: "MS"
    },
    {
      name: "Rahul Sharma",
      title: "Founder, TechVenture",
      review: "Delivered our event management platform ahead of schedule. Their expertise in Next.js and real-time features was exceptional.",
      image: "/images/client/client2.png",
      avatar: "RS"
    },
    {
      name: "Priya Malhotra",
      title: "CTO, StartupHub",
      review: "Outstanding development team! Built our mobile app with React Native and handled complex payment integrations seamlessly.",
      image: "/images/client/client4.jpg",
      avatar: "PM"
    },
    {
      name: "Amit Verma",
      title: "Product Manager, DigiSolutions",
      review: "Professional, responsive, and highly skilled. Softkingo transformed our ideas into a scalable production-ready platform.",
      image: "/images/client/client3.png",
      avatar: "AV"
    },
    {
      name: "Anjali Gupta",
      title: "Tech Lead, InnovateLabs",
      review: "Exceptional work on our e-commerce platform. The team's attention to detail and commitment to quality was impressive.",
      image: "/images/client/client6.png",
      avatar: "AG"
    },
    {
      name: "Vikram Singh",
      title: "Director, CloudTech Solutions",
      review: "Best development partner we've worked with. Delivered complex features on time with excellent code quality and documentation.",
      image: "/images/client/client2.png",
      avatar: "VS"
    }
  ];

  useEffect(() => {
    if (columns !== 'auto') {
      setCalculatedColumns(columns);
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width < 400) setCalculatedColumns(1);
        else if (width < 700) setCalculatedColumns(2);
        else setCalculatedColumns(3);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

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
                  <span className="text-sm font-bold text-gray-900">Clutch</span>
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
