"use client";
import { useState, useEffect } from "react";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TestimonialCarousel from "@/components/public/TestimonialCarousel";

const ReviewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CTO, TechInnovate",
      content: "The team at Softkingo delivered exceptional results for our mobile app project. Their attention to detail and technical expertise exceeded our expectations.",
      rating: 5,
      date: "May 15, 2024",
      image: "/images/client1.png"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Product Manager, NexGen Solutions",
      content: "Working with Softkingo transformed our digital presence. Their innovative approach to web development helped us increase conversions by 45%.",
      rating: 5,
      date: "April 2, 2024",
      image: "/images/client/image 73.png"
    },
    {
      id: 3,
      name: "Jennifer Lee",
      role: "CEO, Visionary Startups",
      content: "The UI/UX design provided by Softkingo was exactly what our platform needed. Their user-centric approach made our product intuitive and engaging.",
      rating: 4,
      date: "March 20, 2024",
      image: "/images/client1.png"
    },
    {
      id: 4,
      name: "Robert Chen",
      role: "Director, Global Enterprises",
      content: "Softkingo's cloud solutions streamlined our operations and reduced costs significantly. Their team is professional, responsive, and highly skilled.",
      rating: 5,
      date: "June 5, 2024",
      image: "/images/client1.png"
    },
    {
      id: 5,
      name: "Amanda Williams",
      role: "Marketing Head, GrowthHack",
      content: "From concept to launch, Softkingo guided us through the entire development process. Their technical expertise and strategic insights were invaluable.",
      rating: 5,
      date: "May 28, 2024",
      image: "/images/client1.png"
    },
    {
      id: 6,
      name: "David Thompson",
      role: "Founder, StartupHub",
      content: "Softkingo's mobile development expertise helped us create an app that users love. Their technical skills and user-focused approach were impressive.",
      rating: 5,
      date: "June 12, 2024",
      image: "/images/client1.png"
    }
  ];

  const nextReview = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  // Auto-advance reviews
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      nextReview();
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  // Function to get the 3 reviews to display
  const getDisplayedReviews = () => {
    if (isMobile) {
      return [reviews[activeIndex]];
    }

    const reviewsToShow = [];
    for (let i = 0; i < 3; i++) {
      const index = (activeIndex + i) % reviews.length;
      reviewsToShow.push(reviews[index]);
    }
    return reviewsToShow;
  };

  const displayedReviews = getDisplayedReviews();

  return (
    <section className="relative w-full py-12 md:py-16 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#28AFDF]/10 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#28AFDF]/20 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
<div className="text-center mb-22">
          <motion.h2
            initial={{ opacity: 0, y: -18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-sky-900"
          >
            What Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500">
              Clients Say
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Real feedback from teams we&apos;ve worked with—focused on delivery quality, communication, and outcomes.
          </motion.p>
        </div>        
  <TestimonialCarousel />

        <div
          className="relative hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-16`}>
            {displayedReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 relative overflowhidden h-full"
              >
                {/* Gradient accent */}
                {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#28AFDF] to-primary"> */}

<div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-[#28AFDF]/20 bg-white z-20">
                  <Image
                    src={review.image}
                    alt={review.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 hover:scale-110"
                  />
                </div>
                {/* </div> */}
                
                <div className="relative z-10 mt-8">

                  <div className="flex flex-col items-center mb-2">
                    {/* Client image in circle */}


                    <h3 className="text-xl font-bold text-gray-900 text-center">{review.name}</h3>
                    <p className="text-gray-600 text-center">{review.role}</p>

                    <div className="flex items-center  " > <img src="/images/clutch.png" className="max-h-[4rem] mr-4" />

                      <div className="flex items-center mt-">

                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="ml-2 bg-[#28AFDF]/10 text-[#28AFDF] px-2 py-1 rounded-full text-xs font-medium">
                          {review.rating}/5
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* <p className="text-gray-700 leading-relaxed mb-6 relative pl-6">
                    <FaQuoteLeft className="text-[#28AFDF]/30 text-2xl absolute top-0 left-0" />
                    {review.content}
                  </p> */}
                  <p className="text-gray-700 mb-6 relative pl-6 line-clamp-3">
  <FaQuoteLeft className="text-[#28AFDF]/30 text-2xl absolute top-0 left-0" />
  {review.content}
</p>


                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">{review.date}</span>
                    <div className="flex items-center text-[#28AFDF] font-medium">
                      <span>Read full story</span>
                      <FaChevronRight className="ml-1 text-sm" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation controls */}
          <div className="flex justify-center mt-12 space-x-4">
            <button
              onClick={prevReview}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#28AFDF]/10 transition-all duration-300 group border border-gray-200"
            >
              <FaChevronLeft className="text-gray-600 group-hover:text-[#28AFDF] text-lg" />
            </button>

            <div className="flex items-center space-x-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeIndex ? 1 : -1);
                    setActiveIndex(idx);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'bg-[#28AFDF] w-4 rounded-lg' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#28AFDF]/10 transition-all duration-300 group border border-gray-200"
            >
              <FaChevronRight className="text-gray-600 group-hover:text-[#28AFDF] text-lg" />
            </button>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto hidden">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-[#28AFDF]">98%</div>
            <div className="text-gray-600 mt-2">Client Satisfaction</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-[#28AFDF]">850+</div>
            <div className="text-gray-600 mt-2">Projects Completed</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-[#28AFDF]">15+</div>
            <div className="text-gray-600 mt-2">Industry Awards</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-[#28AFDF]">99.7%</div>
            <div className="text-gray-600 mt-2">On-Time Delivery</div>
          </div>
        </div>

        {/* Client logos */}
        <div className="mt-20 hidden md:block">
          <h3 className="text-center text-gray-500 font-medium mb-8">Trusted by innovative companies worldwide</h3>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {[
              "Clutch", "Google", "CloudNine",
              "DigiCore", "FutureLabs", "QuantumLeap"
            ].map((company, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-xl shadow-sm w-28 h-16 md:w-32 md:h-20 flex items-center justify-center border border-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-lg font-bold text-gray-400">{company}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;