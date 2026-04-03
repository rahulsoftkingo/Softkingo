import React from 'react';
import Image from 'next/image';
import CommonTitle from '@/components/ui/CommonTitle';

function AwardsSection({
  variant = "default",
  title = "Our",
  gradientText = "Awards & Recognitions",
  subtitle = "These recognitions reflect our commitment to quality, innovation, and long-term partnerships with our clients.",
  awards: customAwards
}) {
  const defaultAwards = [
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

  const awards = (customAwards && customAwards.length > 0) ? customAwards : defaultAwards;

  if (variant === "service") {
    return (
      <section className="bg-white py-12 lg:py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left: Title & Subtitle */}
            <div className="lg:w-1/3 text-left">
              <div className="flex flex-col items-start gap-2">
                <CommonTitle
                  align="left"
                  pill={false}
                  title={title}
                  gradientText={gradientText}
                  subtitle={subtitle}
                />
              </div>
            </div>

            {/* Right: Awards Marquee */}
            <div className="lg:w-2/3 relative overflow-hidden">
              {/* Mask for smooth fade edge */}
              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:block hidden" />
              <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:block hidden" />

              <div className="flex animate-marquee hover:[animation-play-state:paused]">
                {[...awards, ...awards].map((award, index) => (
                  <div key={index} className="flex-shrink-0 w-1/3 md:w-1/4 px-4">
                    <Image
                      src={award.image}
                      alt={award.alt}
                      width={180}
                      height={100}
                      className="mx-auto transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <CommonTitle
            align="center"
            pill={false}
            title={title}
            gradientText={gradientText}
            subtitle={subtitle}
          />
        </div>

        {/* Auto-swipe Awards Carousel */}
        <div className="relative overflow-hidden mt-8">
          <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {[...awards, ...awards].map((award, index) => (
              <div key={index} className="flex-shrink-0 w-1/4 px-3">
                <Image
                  src={award.image}
                  alt={award.alt}
                  width={180}
                  height={100}
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