import React from 'react';
import Image from 'next/image';
import CommonTitle from '@/components/ui/CommonTitle';

function AwardsSection() {
  const awards = [
    {
      image: "/images/award/Black And Gold Modern Award Ceremony Instagram Post (1).png",
      alt: "award1"
    },
    {
      image: "/images/award/Black And Gold Modern Award Ceremony Instagram Post (2).png",
      alt: "award2"
    },
    {
      image: "/images/award/Black And Gold Modern Award Ceremony Instagram Post (4).png",
      alt: "award3"
    },
    {
      image: "/images/award/Goodfirms award-softkingo.png",
      alt: "award4"
    },
    {
      image: "/images/award/techbeheb.png",
      alt: "award5"
    }
  ];

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <CommonTitle
            align="center"
            pill={false}
            title='Our'
            gradientText='Awards & Recognitions'
            subtitle='These recognitions reflect our commitment to quality, innovation,
            and long‑term partnerships with our clients.'
          />
        </div>
        
        {/* Auto-swipe Awards Carousel */}
        <div className="relative overflow-hidden mt-8">
          <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {[...awards, ...awards].map((award, index) => (
              <div key={index} className="flex-shrink-0 w-1/5 px-3">
                <Image
                  src={award.image}
                  alt={award.alt}
                  width={150}
                  height={80}
                  className="mx-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AwardsSection;