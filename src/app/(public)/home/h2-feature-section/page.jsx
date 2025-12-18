// Feature.jsx
import React from 'react';
import "./feature.css";

const features = [
  { name: "5+",    image: "/images/feature/image 183.png" },
  { name: "5.0+",  image: "/images/feature/image 182.png" },
  { name: "450+",  image: "/images/feature/image 185.png" },
  { name: "50+",   image: "/images/feature/image 184.png" },
   { name: "50+",   image: "/images/feature/BBC.png" },
];

// triplicate for a true circle‐like loop
// const marqueeItems = [...features, ...features];
// repeatCount = however many times you want before the strip resets
const repeatCount = 20;
const marqueeItems = Array.from({ length: repeatCount })
  .flatMap(() => features); 

export default function Feature() {
  return (
    <div className="bg-white text-black py-8  overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-28 flex items-center">
        {/* Heading on top */}
        <div className="relative z-10 flex-shrink-0 pr-6 bg-whit h-full py-4 hidden md:flex">
          <h1 className="text-md md:text-lg  lg:text-xl 2xl:text-2xl font-semibold">As <span className='text-primary'>Features</span> On</h1>
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
    </div>
  );
}
