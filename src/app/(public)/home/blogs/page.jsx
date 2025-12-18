"use client";
import { useRef, useState } from "react";
import { FaArrowRight, FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";

const Blogs = () => {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const data = [
    {
      id: 1,
      description: "How To build a multivendor Marketplace System: Cost, Timelines & Procedure",
      image: "/images/blog1.png",
      title: "Marketplace System",
      date: "May 15, 2024",
      readTime: "8 min read",
      category: "Development"
    },
    {
      id: 2,
      description: "Building an app for on-demand van delivery service: Step By Step Guide",
     image: "/images/education.png",
      title: "Van Delivery App Guide",
      date: "April 28, 2024",
      readTime: "6 min read",
      category: "Mobile Apps"
    },
    {
      id: 3,
      description: "Ultimate guide to launching your own eCommerce store from scratch.",
      image: "/images/Grocbay.png",
      title: "eCommerce Launch Guide",
      date: "June 3, 2024",
      readTime: "10 min read",
      category: "eCommerce"
    },
    {
      id: 4,
      description: "AI integration strategies for modern business applications.",
      image: "/images/blog2.png",
      title: "AI Business Integration",
      date: "May 22, 2024",
      readTime: "7 min read",
      category: "AI"
    },
    {
      id: 5,
      description: "Optimizing cloud infrastructure for startup scalability.",
      image: "/images/ind.png",
      title: "Cloud Optimization",
      date: "April 15, 2024",
      readTime: "9 min read",
      category: "Cloud"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => setActiveSlide(next),
    appendDots: dots => (
      <div className="pt-10 flex flex-col items-center justify-center">
        <div className="flex justify-center items-center gap-6 mt-8">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="text-gray-600 hover:text-white transition-all duration-300 border border-gray-300 p-3 rounded-full hover:bg-[#28AFDF] hover:border-[#28AFDF]"
          >
            <FaArrowLeft />
          </button>

          <ul className="flex space-x-2">{dots}</ul>

          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="text-gray-600 hover:text-white transition-all duration-300 border border-gray-300 p-3 rounded-full hover:bg-[#28AFDF] hover:border-[#28AFDF]"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    ),
    customPaging: (i) => (
      <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeSlide ? 'bg-[#28AFDF] w-6 rounded-lg' : 'bg-gray-300'}`}></div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section className="w-full py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-[#28AFDF]">Top Blogs</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our latest insights and industry expertise
          </p>
        </div>

        <div className="relative">
          <Slider ref={sliderRef} {...settings}>
            {data.map((item, i) => (
              <div key={i} className="px-3 py-4 mb-8">
                <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute top-4 right-4 z-10 bg-[#28AFDF] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </div>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    >
                    </Image>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <div className="flex items-center mr-4">
                        <FaCalendarAlt className="mr-1 text-[#28AFDF]" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="mr-1 text-[#28AFDF]" />
                        <span>{item.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#28AFDF] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-5 flex-grow text-sm">
                      {item.description}
                    </p>
                    
                    <button className="mt-auto flex items-center text-[#28AFDF] font-medium group-hover:text-[#1e8bb8] transition-colors duration-300">
                      <span>Read Full Article</span>
                      <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-[#28AFDF] text-white font-medium rounded-full hover:bg-[#1e8bb8] transition-colors duration-300 shadow-lg hover:shadow-xl">
            View All Blogs
          </button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#28AFDF]/10 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#28AFDF]/20 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse animation-delay-2000"></div>
    </section>
  );
};

export default Blogs;