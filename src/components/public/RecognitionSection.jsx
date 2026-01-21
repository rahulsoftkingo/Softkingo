"use client";
import { useState, useEffect, useRef } from 'react';

export default function RecognitionSection() {
  const recognitions = [
    {
      image: "/images/award/itfirms-awards.png",
      year: "2025",
      country: "UNITED ARAB EMIRATES",
      category: "MOBILE APP DEVELOPMENT",
      title: "TOP COMPANIES",
      subtitle: "ITFirms",
      description: "World's Top Mobile App Development Companies 2025"
    },
    {
      image: "/images/award/award.png",
      year: "2025",
      country: "UNITED STATES",
      category: "WEB DEVELOPMENT",
      title: "TOP AGENCIES",
      subtitle: "TechAwards",
      description: "Quality You Can Trust – ISO Certified"
    },
    {
      image: "/images/award/award2.png",
      year: "2020",
      country: "UNITED KINGDOM",
      category: "UI/UX DESIGN",
      title: "INNOVATION LEADERS",
      subtitle: "DesignReview",
      description: "Recognized as a Top Developer in India"
    },
    {
      image: "/images/award/techbeheb.png",
      year: "2023",
      country: "CANADA",
      category: "APP DEVELOPMENT",
      title: "TECH PIONEERS",
      subtitle: "FutureTech",
      description: "Top Developers Out 100 Companies in India"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  // Auto-swiping functionality
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!paused) {
        setCurrentIndex(prevIndex => (prevIndex + 1) % recognitions.length);
      }
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [paused, recognitions.length]);

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % recognitions.length);
    resetInterval();
  };

  const goToPrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? recognitions.length - 1 : prevIndex - 1
    );
    resetInterval();
  };

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!paused) {
        setCurrentIndex(prevIndex => (prevIndex + 1) % recognitions.length);
      }
    }, 4000);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetInterval();
  };

  return (
    <div className="min-h-screen bg-gradient-to-bfrom-sky-100 to-sky-50 text-black py-12 px-4 sm:px8">
      <div className="max-w-7xl mx-auto">
        {/* <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-blue-500">Recognition</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Awards and recognitions we've earned for our exceptional work and innovation
          </p>
        </div> */}

        <div
          className="relative h-[400px] w-full max-w-5xl mx-auto overflow-hidden rounded-2xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 rounded-full p-3 transition-all hidden"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 rounded-full p-3 transition-all hidden"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Recognition Cards */}
          {recognitions.map((recognition, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === currentIndex
                  ? 'opacity-100 translate-x-0 z-10'
                  : index < currentIndex
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                }`}
            >
              <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-sky-50 rounded-2xl overflow-hidden bordeborder-sky-0">
                {/* Background pattern */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg[radial-gradient(circle_at_center,rgba(30,30,40,0.8)_0%,rgba(0,0,0,0.9)_70%)]"></div>
                  <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="grid grid-cols-8 gap-4 transform rotate-12 -translate-x-20 -translate-y-20">
                      {[...Array(64)].map((_, i) => (
                        <div key={i} className="h-8 w-8 border border-sky-500 rounded-lg"></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="relative z-10 h-full flex flex-col justify-end items-center p-8 text-center">

                  <div className='mb-2'>
                    <img src={recognition.image} className='max-h-[12rem]' />
                  </div>
                  {/* <div className="mb-8">
                    <div className="text-5xl font-bold text-blue-400 mb-2">{recognition.year}</div>
                    <div className="text-xl uppercase tracking-widest text-gray-300">{recognition.country}</div>
                  </div> */}

                  <div className="mb-10">
                    {/* <div className="text-lg uppercase tracking-widest text-blue-300 mb-4">
                      {recognition.category}
                    </div>
                    <div className="text-4xl sm:text-5xl font-bold mb-3">{recognition.title}</div> */}
                    <div className="text-md sm:text-lg font-bold text-sky-400 mb-2">{recognition.subtitle}</div>
                    <div className="text-sm sm:text-md max-w-xl mx-auto">{recognition.description}</div>
                  </div>

                  <div className="mt-1">
                    <div className="flex justify-center space-x-2">
                      {recognitions.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goToSlide(i)}
                          className={`h-2 w-2 rounded-full transition-all ${i === currentIndex ? 'bg-primary' : 'bg-sky-100'
                            }`}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold">Verified Recognition</h3>
              <p className="text-gray-400">Our awards are independently verified by industry experts</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}