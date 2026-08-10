// // components/TestimonialCarousel2.jsx
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { testimonials } from "@/data/testimonials";
// export default function TestimonialCarousel({
//   autoPlay = true,
//   interval = 5000,
//   columns = 'auto'
// }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [calculatedColumns, setCalculatedColumns] = useState(1);
//   const [imageErrors, setImageErrors] = useState({});
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (typeof columns === 'object') {
//       // Responsive breakpoints set karo
//       setCalculatedColumns(columns.lg || columns.md || 1);
//       return;
//     }

//     if (columns !== 'auto') {
//       setCalculatedColumns(columns);
//       return;
//     }

//     // Auto responsive logic (tumhara existing code)
//     const observer = new ResizeObserver((entries) => {
//       const width = entries[0].contentRect.width;
//       if (width < 400) setCalculatedColumns(1);
//       else if (width < 900) setCalculatedColumns(2);  // Tablet
//       else if (width < 1200) setCalculatedColumns(3); // Laptop
//       else setCalculatedColumns(3); // Large desktop
//     });

//     if (containerRef.current) observer.observe(containerRef.current);
//     return () => observer.disconnect();
//   }, [columns]);

//   useEffect(() => {
//     if (!autoPlay || isHovered) return;
//     const timer = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//     }, interval);
//     return () => clearInterval(timer);
//   }, [autoPlay, interval, isHovered, testimonials.length]);

//   const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);

//   const handleImageError = (index) => {
//     setImageErrors(prev => ({ ...prev, [index]: true }));
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="w-full relative"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div
//         className="grid gap-5 pr-6"
//         style={{
//           gridTemplateColumns: `repeat(${calculatedColumns}, minmax(0, 1fr))`
//         }}
//       >
//         {Array.from({ length: calculatedColumns }).map((_, index) => {
//           const testimonialIndex = (currentIndex + index) % testimonials.length;
//           const testimonial = testimonials[testimonialIndex];
//           const hasImageError = imageErrors[testimonialIndex];

//           return (
//             <div
//               key={index}
//               className="relative pt-8"
//             >
//               {/* Platform Badge */}
//               <div className="absolute top-3 left-8 z-10">
//                 <div className="bg-white rounded-sm shadow-sm px-4 py-2 flex items-center gap-3">
//                   {/* Platform Logo Mapping */}
//                   {(() => {
//                     const logos = {
//                       "Clutch review": "/images/award/clutch.png",
//                       "DesignRush": "/images/award/designrush.png",
//                       "Goodfirms": "/images/award/goodfirm.png",
//                       "TechBehemoths": "/images/award/techbeheb.png",
//                       "Trustpilot": "trustpilot-svg",
//                       "Review": "/images/award/goodfirm.png"
//                     };
//                     const logoSrc = logos[testimonial.source] || null;

//                     if (logoSrc === "trustpilot-svg") {
//                       return (
//                         <div className="h-5 flex items-center">
//                           <svg viewBox="0 0 100 100" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M100 38.5H61.8L50 2L38.2 38.5H0L30.9 61L19.1 97.5L50 75L80.9 97.5L69.1 61L100 38.5Z" fill="#00b67a" />
//                           </svg>
//                           <span className="ml-1 text-[10px] font-bold text-[#191919]">Trustpilot</span>
//                         </div>
//                       );
//                     }

//                     if (logoSrc) {
//                       return (
//                         <div className="h-5 flex items-center">
//                           <img
//                             src={logoSrc}
//                             alt={testimonial.source}
//                             className="h-full object-contain"
//                           />
//                         </div>
//                       );
//                     }
//                     return <span className="text-xs font-bold text-gray-900 uppercase tracking-tight">{testimonial.source}</span>;
//                   })()}

//                   <div className="flex items-center gap-0.5 bg-orange-50 px-1.5 py-0.5 rounded ml-auto">
//                     <span className="text-orange-500 text-[10px]">★</span>
//                     <span className="text-[10px] font-extrabold text-[#0B3250]">5.0</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Card */}
//               <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all p-6 ">
//                 <div className="flex items-start gap-4 mb-5">
//                   {/* Profile Image */}
//                   <div className={`relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 shadow-md border-2 border-white ${hasImageError ? 'bg-gradient-to-br from-sky-400 to-blue-600' : ''}`}>
//                     {!hasImageError ? (
//                       <img
//                         src={testimonial.image}
//                         alt={testimonial.name}
//                         className="w-full h-full object-cover"
//                         onError={() => handleImageError(testimonialIndex)}
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
//                         {testimonial.avatar}
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-xl font-bold text-gray-900 leading-normal mb-1">
//                       {testimonial.name}
//                     </h3>
//                     <p className="text-sm text-gray-600 font-medium">
//                       {testimonial.title}
//                     </p>
//                   </div>
//                 </div>

//                 <p className="text-gray-700 text-base leading-relaxed">
//                   {testimonial.review}
//                   <span className="text-orange-500 text-2xl ml-1">❞</span>
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Right Arrow Button */}
//       <button
//         onClick={next}
//         className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-sky-400 hover:bg-sky-50 flex items-center justify-center transition-all hover:scale-110 shadow-lg z-20"
//         aria-label="Next testimonial"
//       >
//         <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>
//     </div>
//   );
// }











// components/TestimonialCarousel2.jsx
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { testimonials } from "@/data/testimonials";
// export default function TestimonialCarousel({
//   autoPlay = true,
//   interval = 5000,
//   columns = 'auto'
// }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [calculatedColumns, setCalculatedColumns] = useState(1);
//   const [imageErrors, setImageErrors] = useState({});
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (typeof columns === 'object') {
//       setCalculatedColumns(columns.lg || columns.md || 1);
//       return;
//     }

//     if (columns !== 'auto') {
//       setCalculatedColumns(columns);
//       return;
//     }

//     const observer = new ResizeObserver((entries) => {
//       const width = entries[0].contentRect.width;
//       if (width < 400) setCalculatedColumns(1);
//       else if (width < 900) setCalculatedColumns(2);
//       else if (width < 1200) setCalculatedColumns(3);
//       else setCalculatedColumns(3);
//     });

//     if (containerRef.current) observer.observe(containerRef.current);
//     return () => observer.disconnect();
//   }, [columns]);

//   useEffect(() => {
//     if (!autoPlay || isHovered) return;
//     const timer = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//     }, interval);
//     return () => clearInterval(timer);
//   }, [autoPlay, interval, isHovered, testimonials.length]);

//   const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);

//   const handleImageError = (index) => {
//     setImageErrors(prev => ({ ...prev, [index]: true }));
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="w-full relative"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div
//         className="grid gap-5 pr-6"
//         style={{
//           gridTemplateColumns: `repeat(${calculatedColumns}, minmax(0, 1fr))`
//         }}
//       >
//         {Array.from({ length: calculatedColumns }).map((_, index) => {
//           const testimonialIndex = (currentIndex + index) % testimonials.length;
//           const testimonial = testimonials[testimonialIndex];
//           const hasImageError = imageErrors[testimonialIndex];

//           return (
//             <div key={index} className="relative pt-8">
//               {/* Platform Badge */}
//               <div className="absolute top-3 left-7 z-10">
//                 <div className="bg-white rounded-sm shadow-sm px-4 py-2 flex items-center gap-3">
//                   {(() => {
//                     const logos = {
//                       "Clutch review": "/images/award/clutch.png",
//                       "DesignRush": "/images/award/designrush.png",
//                       "Goodfirms": "/images/award/goodfirm.png",
//                       "TechBehemoths": "/images/award/techbeheb.png",
//                       "Trustpilot": "trustpilot-svg",
//                       "Review": "/images/award/goodfirm.png"
//                     };
//                     const logoSrc = logos[testimonial.source] || null;

//                     if (logoSrc === "trustpilot-svg") {
//                       return (
//                         <div className="h-5 flex items-center">
//                           <svg viewBox="0 0 100 100" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M100 38.5H61.8L50 2L38.2 38.5H0L30.9 61L19.1 97.5L50 75L80.9 97.5L69.1 61L100 38.5Z" fill="#00b67a" />
//                           </svg>
//                           <span className="ml-1 text-[10px] font-bold text-[#191919]">Trustpilot</span>
//                         </div>
//                       );
//                     }

//                     if (logoSrc) {
//                       return (
//                         <div className="h-5 flex items-center">
//                           <img src={logoSrc} alt={testimonial.source} className="h-full object-contain" />
//                         </div>
//                       );
//                     }
//                     return <span className="text-xs font-bold text-gray-900 uppercase tracking-tight">{testimonial.source}</span>;
//                   })()}

//                   <div className="flex items-center gap-0.5 bg-orange-50 px-1.5 py-0.5 rounded ml-auto">
//                     <span className="text-orange-500 text-[10px]">★</span>
//                     <span className="text-[10px] font-extrabold text-[#0B3250]">5.0</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Card */}
//               {/* Card */}
//               <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all p-7 h-[360px] flex flex-col">
//                 {/* Quote icon */}
//                 <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center mb-4 flex-shrink-0">
//                   <span className="text-sky-500 text-2xl leading-none -mt-1">❝</span>
//                 </div>

//                 {/* Review text - clamped so it never grows the card */}
//                 <p className="text-gray-700 text-base leading-relaxed mb-4 line-clamp-5 flex-1">
//                   {testimonial.review}
//                 </p>

//                 {/* Divider - always pinned above the author row */}
//                 <div className="border-t border-gray-100 mb-5 flex-shrink-0" />

//                 {/* Author row */}
//                 <div className="flex items-center gap-4 flex-shrink-0">
//                   <div className={`relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 shadow-md border-2 border-white ${hasImageError ? 'bg-gradient-to-br from-sky-400 to-blue-600' : ''}`}>
//                     {!hasImageError ? (
//                       <img
//                         src={testimonial.image}
//                         alt={testimonial.name}
//                         className="w-full h-full object-cover"
//                         onError={() => handleImageError(testimonialIndex)}
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
//                         {testimonial.avatar}
//                       </div>
//                     )}
//                   </div>

//                   <div className="min-w-0">
//                     <h3 className="text-base font-bold text-gray-900 leading-tight">
//                       {testimonial.name}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       {testimonial.title}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Right Arrow Button */}
//       <button
//         onClick={next}
//         className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-sky-400 hover:bg-sky-50 flex items-center justify-center transition-all hover:scale-110 shadow-lg z-20"
//         aria-label="Next testimonial"
//       >
//         <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { testimonials } from "@/data/testimonials";

export default function TestimonialCarousel({
  autoPlay = true,
  interval = 5000,
  heading = "What Our Clients Say",        // pass your own page heading here, e.g. "What our customers say"
  subheading = "Real feedback from teams we've worked with—focused on delivery quality, communication, and outcomes.",     // pass your own supporting line here
  ctaLabel = "Get started for free",
  onCtaClick,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const total = testimonials.length;
  const nextIndex = (currentIndex + 1) % total;

  useEffect(() => {
    if (!autoPlay || isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, isHovered, total]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % total);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + total) % total);

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const Avatar = ({ testimonial, index, size = 'w-14 h-14' }) => {
    const hasImageError = imageErrors[index];
    return (
      <div
        className={`relative ${size} rounded-full overflow-hidden flex-shrink-0 shadow-md border-2 border-white ${hasImageError ? 'bg-gradient-to-br from-sky-400 to-blue-600' : ''
          }`}
      >
        {!hasImageError ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
            onError={() => handleImageError(index)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
            {testimonial.avatar}
          </div>
        )}
      </div>
    );
  };

  // Platform logo mapping for the rating badge
  const logos = {
    "Clutch review": "/images/award/clutch.png",
    "DesignRush": "/images/award/designrush.png",
    "Goodfirms": "/images/award/goodfirm.png",
    "TechBehemoths": "/images/award/techbeheb.png",
    "Trustpilot": "trustpilot-svg",
    "Review": "/images/award/goodfirm.png"
  };

  const PlatformBadge = ({ testimonial }) => {
    const logoSrc = logos[testimonial.source] || null;

    return (
      <div className="bg-white rounded-sm shadow-sm px-3 py-1.5 flex items-center gap-2 shrink-0">
        {logoSrc === "trustpilot-svg" ? (
          <div className="h-4 flex items-center">
            <svg viewBox="0 0 100 100" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 38.5H61.8L50 2L38.2 38.5H0L30.9 61L19.1 97.5L50 75L80.9 97.5L69.1 61L100 38.5Z" fill="#00b67a" />
            </svg>
            <span className="ml-1 text-[9px] font-bold text-[#191919]">Trustpilot</span>
          </div>
        ) : logoSrc ? (
          <div className="h-4 flex items-center">
            <img src={logoSrc} alt={testimonial.source} className="h-full object-contain" />
          </div>
        ) : (
          <span className="text-[10px] font-bold text-gray-900 uppercase tracking-tight">
            {testimonial.source}
          </span>
        )}

        <div className="flex items-center gap-0.5 bg-orange-50 px-1.5 py-0.5 rounded">
          <span className="text-orange-500 text-[10px]">★</span>
          <span className="text-[10px] font-extrabold text-[#0B3250]">5.0</span>
        </div>
      </div>
    );
  };

  const featured = testimonials[currentIndex];
  const upNext = testimonials[nextIndex];

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_140px] gap-6 items-stretch">
        {/* Left intro column */}
        <div className="flex flex-col justify-between py-2">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-sky-900 leading-normal py-1">
              What{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500 py-1">
                Our Clients Say
              </span>
            </h2>
            {subheading && (
              <p className="text-gray-500 text-base leading-relaxed">
                {subheading}
              </p>
            )}
          </div>

          <button
            onClick={onCtaClick}
            className="mt-8 self-start px-6 py-3 rounded-full border border-gray-300 text-gray-900 text-sm font-medium hover:border-gray-900 transition-colors"
          >
            {ctaLabel}
          </button>
        </div>

        {/* Featured card */}
        <div className="bg-[#E4F4FF] rounded-3xl p-10 flex flex-col justify-between min-h-[420px]">
          <div>
            <span className="text-3xl text-gray-800 leading-none">&#8220;</span>
            <p className="text-gray-800 text-2xl leading-relaxed mt-2 line-clamp-6">
              {featured.review}
            </p>
          </div>

          <div className="flex items-end justify-between gap-6 mt-10">
            <div className="flex items-center justify-between gap-4 w-full">
              <div className="flex items-center gap-4 min-w-0">
                <Avatar testimonial={featured} index={currentIndex} />

                <div className="min-w-0">
                  <h3 className="text-base font-bold text-gray-900 leading-tight truncate">
                    {featured.name}
                  </h3>

                  <p className="text-sm text-gray-500 truncate">
                    {featured.title}
                  </p>
                </div>
              </div>

              <PlatformBadge testimonial={featured} />
            </div>

            {featured.stat && (
              <div className="text-right flex-shrink-0">
                <div className="text-6xl font-serif text-gray-900 leading-none">
                  {featured.stat.value}
                  <span className="text-3xl align-top">%</span>
                </div>
                <div className="text-[11px] tracking-[0.15em] text-gray-400 uppercase mt-1">
                  {featured.stat.label}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Peek of the next card */}
        <div className="hidden lg:block overflow-hidden rounded-3xl">
          <div className="bg-[#E4F4FF] rounded-3xl p-10 min-h-[420px] w-[420px] flex flex-col justify-between">
            <div>
              <span className="text-3xl text-gray-800 leading-none">&#8220;</span>
              <p className="text-gray-800 text-xl leading-relaxed mt-2 line-clamp-6">
                {upNext.review}
              </p>
            </div>
            <div className="flex items-center gap-4 mt-10">
              <Avatar testimonial={upNext} index={nextIndex} />
              <div className="min-w-0">
                <h3 className="text-base font-bold text-gray-900 leading-tight truncate">
                  {upNext.name}
                </h3>
                <p className="text-sm text-gray-500 truncate">{upNext.title}</p>
              </div>
              <PlatformBadge testimonial={upNext} />
            </div>
          </div>
        </div>
      </div>

      {/* Nav arrows */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={prev}
          className="w-11 h-11 rounded-full bg-white border-2 border-gray-200 hover:border-gray-400 flex items-center justify-center transition-all"
          aria-label="Previous testimonial"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="w-11 h-11 rounded-full bg-white border-2 border-gray-200 hover:border-sky-400 hover:bg-sky-50 flex items-center justify-center transition-all hover:scale-105 shadow-sm"
          aria-label="Next testimonial"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}