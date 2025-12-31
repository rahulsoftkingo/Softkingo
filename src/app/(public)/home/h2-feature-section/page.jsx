// Feature.jsx
import React from 'react';

const features = [
  { name: "5+", image: "/images/feature/image 183.png" },
  { name: "5.0+", image: "/images/feature/image 182.png" },
  { name: "450+", image: "/images/feature/image 185.png" },
  { name: "50+", image: "/images/feature/image 184.png" },
  { name: "50+", image: "/images/feature/BBC.png" },
];

const repeatCount = 20;
const marqueeItems = Array.from({ length: repeatCount })
  .flatMap(() => features);

export default function Feature() {
  return (
    <div className="bg-white text-black pb-8 pt-4 px-4 sm:px-6  overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Heading on top */}
        <div className="relative z-10 flex-shrink-0 pr-6 bg-whit h-full py-4 hidden md:flex">
          <h1 className="text-md md:text-lg  lg:text-xl 2xl:text-2xl font-semibold text-sky-900">As <span className='bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500'>Features</span> On</h1>
        </div>

        {/* Scrolling strip behind */}
        <div className="relative inset-y-0 left-0 w-full flex overflow-hidden z-0   ">
          <div className="flex whitespace-nowrap animate-marquee ">
            {marqueeItems.map((feature, i) => (
              <div key={i} className="flex-shrink-0 mr-12 md:mr-28 flex items-center">
                <img
                  src={feature.image}
                  alt={feature.name}
                  className="h-6 md:h-8 lg:h-12 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style >{`
       @keyframes marquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
       }

       @layer utilities {
         .animate-marquee {
           animation: marquee 60s linear infinite;
         }
       }
      `}</style>
    </div>
    
  );
  
}
