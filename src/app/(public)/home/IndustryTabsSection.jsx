// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion, AnimatePresence, useScroll } from "framer-motion";
// import { 
//   FaCheckCircle, FaArrowRight, FaHeartbeat, FaGraduationCap, 
//   FaBuilding, FaPlane, FaUtensils, FaDumbbell, FaStore, 
//   FaTruck , FaFilm , FaUsers , FaCar, FaHammer ,FaIndustry, FaCalendarAlt, FaDollarSign     
// } from "react-icons/fa";

// export default function IndustryTabsSection() {
// const [industries] = useState([
//   {
//     title: "Healthcare",
//     id: "healthcare",
//     href: "/industries/healthcare",
//     subtitle: "We build HIPAA-compliant digital healthcare ecosystems that prioritize patient care and data security. Our integrated solutions empower providers to deliver superior care while streamlining clinical workflows and improving long-term patient outcomes across all platforms.",
//     points: [
//       "Real‑time patient monitoring",
//       "Appointment scheduling & reminders",
//       "Electronic health records access",
//       "Telemedicine & virtual consultations",
//       "Digital prescription management",
//       "Emergency alerts & notifications"
//     ],
//     icon: <FaHeartbeat />,
//     image: "/images/industries/healthcare.jpg",
//     subButtons: [
//       "Healthcare App Development",
//       "Healthcare Website Design",
//       "EHR/EMR System Integration",
//       "Medical Digital Marketing"
//     ]
//   },
//   {
//     title: "Travel & Hospitality",
//     id: "travel",
//     href: "/industries/travel",
//     subtitle: "We assist travel agencies and hotels to develop digital solutions providing visitors with a smooth experience throughout their journey. Our services enable users to book easily while accessing real-time information about accommodation and tour details effortlessly.",
//     points: [
//       "Online travel booking systems",
//       "Hotel and tour management",
//       "Personalized itinerary planning",
//       "Real-time travel notifications",
//       "Customer feedback management",
//       "Loyalty programs & tracking"
//     ],
//     icon: <FaPlane />,
//     image: "/images/industries/travel.webp",
//     subButtons: [
//       "Travel Booking App Development",
//       "Hotel Management Software",
//       "Booking Portal Development",
//       "Marketing for Travel Services"
//     ]
//   },
//   {
//     title: "Education / E-Learning",
//     id: "elearning",
//     href: "/industries/elearning",
//     subtitle: "We assist educational institutions and EdTech startups to create digital solutions which enhance learning accessibility and student engagement. Our services create a streamlined process for course management while delivering immediate learning progress and data insights.",
//     points: [
//       "Online course management",
//       "Virtual classroom streaming",
//       "Enrollment & progress tracking",
//       "Assessments and certifications",
//       "Analytics and student insights",
//       "Communication & notifications"
//     ],
//     icon: <FaGraduationCap />,
//     image: "/images/industries/education.webp",
//     subButtons: [
//       "E-Learning App Development",
//       "Education Website Design",
//       "LMS Software Development",
//       "Digital Marketing for EdTech"
//     ]
//   },
//   {
//     title: "Real Estate",
//     id: "real-estate",
//     href: "/industries/real-estate",
//     subtitle: "We develop digital solutions which help real estate agencies and property developers to manage listings and increase market presence. Our services enable customers to conduct property searches and complete transactions with real-time data to assist in critical decision-making.",
//     points: [
//       "Property listing management",
//       "Virtual tours & 3D walkthroughs",
//       "Buyer & tenant lead tracking",
//       "Appointment & viewing schedules",
//       "Market analytics and insights",
//       "Customer support & feedback"
//     ],
//     icon: <FaBuilding />,
//     image: "/images/industries/realestate.avif",
//     subButtons: [
//       "Real Estate App Development",
//       "Property Website Solutions",
//       "Real Estate CRM Software",
//       "Marketing for Real Estate"
//     ]
//   },
//   {
//     title: "Fitness & Wellness",
//     id: "fitness",
//     href: "/industries/fitness",
//     subtitle: "Softkingo provides digital solution development to gyms and wellness centers to create personalized programs that drive user engagement. Our services enable organizations to manage schedules while monitoring student advancement and improving customer interactions.",
//     points: [
//       "Workout tracking & analytics",
//       "Class scheduling and booking",
//       "Personalized nutrition guides",
//       "Progress monitoring tools",
//       "Membership & plan handling",
//       "Smart notifications & reminders"
//     ],
//     icon: <FaDumbbell />,
//     image: "/images/industries/finance.avif",
//     subButtons: [
//       "Fitness App Development",
//       "Gym Management Software",
//       "Wellness Website Solutions",
//       "Fitness Digital Marketing"
//     ]
//   },
//   {
//     title: "Logistics & Transport",
//     id: "logistics",
//     href: "/industries/logistics",
//     subtitle: "We help logistics companies and transportation businesses create digital solutions that make moving goods and managing fleets smooth and efficient. Our solutions help teams stay connected and deliveries stay on schedule while keeping customers informed at every single stage.",
//     points: [
//       "Shipment tracking & delivery",
//       "Fleet & route optimization",
//       "Warehouse & inventory control",
//       "Order scheduling & dispatch",
//       "Real-time alerts & status",
//       "Reporting & operational insights"
//     ],
//     icon: <FaTruck />,
//     image: "/images/industries/manufacturing.jpg",
//     subButtons: [
//       "Logistics App Development",
//       "Fleet Management Software",
//       "Logistics Website Design",
//       "Marketing for Logistics"
//     ]
//   },
//   {
//     title: "Media & Entertainment",
//     id: "media-entertainment",
//     href: "/industries/media-entertainment",
//     subtitle: "We help media companies and streaming platforms build digital solutions that make it easy for people to enjoy and share content. Whether it is video or live shows, our solutions help you connect with your audience in meaningful ways while maximizing your global reach.",
//     points: [
//       "Content & media organization",
//       "Seamless video & audio playback",
//       "Fast content publishing tools",
//       "Personalized recommendations",
//       "Real-time audience analytics",
//       "Push notification engagement"
//     ],
//     icon: <FaFilm />,
//     image: "/images/industries/entertainment.avif",
//     subButtons: [
//       "Media App Development",
//       "Entertainment Web Solutions",
//       "Content Streaming Platforms",
//       "Marketing for Media Brands"
//     ]
//   },
//   {
//     title: "Social Networking",
//     id: "social-media",
//     href: "/industries/social-media",
//     subtitle: "Softkingo helps businesses and startups build social networking platforms that bring people together and foster meaningful connections. Our mobile solutions make it simple, engaging, and secure for users to interact anytime, anywhere, while protecting sensitive user data.",
//     points: [
//       "Profile & connection management",
//       "Easy post and media sharing",
//       "Real-time chat & messaging",
//       "Community and event building",
//       "User activity & data analytics",
//       "Advanced privacy & security"
//     ],
//     icon: <FaUsers />,
//     image: "/images/industries/education.webp",
//     subButtons: [
//       "Social App Development",
//       "Social Website Solutions",
//       "Community Management Tools",
//       "Social Media Marketing"
//     ]
//   },
//   {
//     title: "Automotive",
//     id: "automotive",
//     href: "/industries/automotive",
//     subtitle: "We help manufacturers and dealerships create digital solutions that make every step of the vehicle journey simple and enjoyable. From browsing cars to scheduling service appointments, our solutions help businesses connect with customers and manage complex operations.",
//     points: [
//       "Vehicle listing & inventory",
//       "Test drive & service booking",
//       "Maintenance history tracking",
//       "Real-time vehicle telematics",
//       "Sales and behavior analytics",
//       "Personalized customer support"
//     ],
//     icon: <FaCar />,
//     image: "/images/industries/travel.webp",
//     subButtons: [
//       "Automotive App Development",
//       "Dealership Web Solutions",
//       "Inventory Management Tools",
//       "Marketing for Automotive"
//     ]
//   },
//   {
//     title: "Construction",
//     id: "construction",
//     href: "/industries/construction",
//     subtitle: "We build digital solutions that make managing your construction projects smoother, helping your teams stay connected and deadlines stay on track. Our platforms allow you to track tasks and milestones in one place while keeping clients informed through every phase.",
//     points: [
//       "Task & milestone tracking",
//       "Team & vendor coordination",
//       "Progress updates & alerts",
//       "Resource & budget management",
//       "Safety & compliance monitoring",
//       "Equipment check scheduling"
//     ],
//     icon: <FaHammer />,
//     image: "/images/industries/realestate.avif",
//     subButtons: [
//       "Construction App Development",
//       "Construction Web Design",
//       "Project Management Tools",
//       "Marketing for Construction"
//     ]
//   },
//   {
//     title: "Manufacturing",
//     id: "manufacturing",
//     href: "/industries/manufacturing",
//     subtitle: "We help manufacturers and industrial businesses build digital solutions that simplify operations, streamline workflows, and improve productivity. From tracking inventory to monitoring machinery, our solutions make it easier to stay on top of every part of your operation.",
//     points: [
//       "Production process tracking",
//       "Inventory & supply chain data",
//       "Equipment & maintenance alerts",
//       "Product quality reporting",
//       "Departmental coordination",
//       "Performance data analytics"
//     ],
//     icon: <FaIndustry />,
//     image: "/images/industries/manufacturing.jpg",
//     subButtons: [
//       "Manufacturing App Solutions",
//       "Industrial Website Design",
//       "Manufacturing ERP Software",
//       "Marketing for Manufacturing"
//     ]
//   },
//   {
//     title: "Event Management",
//     id: "event-management",
//     href: "/industries/event-management",
//     subtitle: "We help event management companies and venues create digital solutions that make planning, executing, and tracking events easier than ever. From managing attendees to coordinating vendors and schedules, our platforms handle the stress of complex event logistics.",
//     points: [
//       "End-to-end event planning",
//       "Attendee & ticket management",
//       "Vendor & staff coordination",
//       "Real-time event notifications",
//       "Engagement & data tracking",
//       "Support & feedback systems"
//     ],
//     icon: <FaCalendarAlt />,
//     image: "/images/industries/retail.jpg",
//     subButtons: [
//       "Event App Development",
//       "Event Website Solutions",
//       "Event Management Software",
//       "Digital Marketing for Events"
//     ]
//   },
//   {
//     title: "Retail & E-Commerce",
//     id: "ecommerce-2",
//     href: "/industries/ecommerce",
//     subtitle: "We help retail businesses grow with smart digital solutions built to handle real-world demand. Our ecommerce services are designed to boost online sales, improve customer engagement, and create smooth shopping experiences across all modern devices and platforms.",
//     points: [
//       "Secure payments & checkout",
//       "Inventory & catalog control",
//       "Order tracking & fulfillment",
//       "Personalized user accounts",
//       "Actionable performance data",
//       "Customer ticketing systems"
//     ],
//     icon: <FaStore />,
//     image: "/images/industries/retail.jpg",
//     subButtons: [
//       "Ecommerce App Development",
//       "Ecommerce Website Design",
//       "AI Shopping Solutions",
//       "Payment Gateway Integration"
//     ]
//   },
//   {
//     title: "Banking & FinTech",
//     id: "fintech",
//     href: "/industries/fintech",
//     subtitle: "We help financial institutions and FinTech startups build secure digital solutions that people can truly trust. Our development services are designed to simplify complex financial processes, strengthen security, and help businesses innovate with total confidence.",
//     points: [
//       "Secure data & transactions",
//       "Smooth KYC and onboarding",
//       "Digital wallet solutions",
//       "Real-time data dashboards",
//       "Fraud & risk management",
//       "Support & ticketing systems"
//     ],
//     icon: <FaDollarSign />,
//     image: "/images/industries/finance.avif",
//     subButtons: [
//       "FinTech App Development",
//       "AI Fraud Detection Tools",
//       "Digital Wallet Solutions",
//       "Blockchain for Finance"
//     ]
//   },
//   {
//     title: "Food & Restaurant",
//     id: "food-restaurant",
//     href: "/industries/food-delivery",
//     subtitle: "We provide scalable and user-friendly digital solutions for the Food sector. Our development services enable restaurants and cloud kitchens to improve their operational workflow and boost their online sales while engaging better with their customers every day.",
//     points: [
//       "Online ordering & booking",
//       "Menu & catalog customization",
//       "Payment & billing systems",
//       "Delivery tracking & status",
//       "Customer loyalty & offers",
//       "Data analytics & reporting"
//     ],
//     icon: <FaUtensils />,
//     image: "/images/industries/entertainment.avif",
//     subButtons: [
//       "Food Delivery App Design",
//       "Restaurant Management Tech",
//       "Cloud Kitchen Software",
//       "Marketing for Food Brands"
//     ]
//   }
// ]);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const sectionRef = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"]
//   });

//   useEffect(() => {
//     return scrollYProgress.on("change", (v) => {
//       const step = 1 / industries.length;
//       const index = Math.min(Math.floor(v / step), industries.length - 1);
//       if (index !== currentIndex && index >= 0) {
//         setCurrentIndex(index);
//       }
//     });
//   }, [scrollYProgress, currentIndex, industries.length]);

//   const active = industries[currentIndex];

//   return (
//     <section 
//       ref={sectionRef} 
//       className="relative bg-white pt-16" 
//       style={{ height: `${industries.length * 100}vh` }}
//     >
//       <div className="text-center mb-1 px-4">
//         <motion.h2
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-sky-900"
//         >
//           Industries{" "}
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500">
//             We Serve
//           </span>
//         </motion.h2>

//         <motion.p
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//           className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
//         >
//           From healthcare and finance to e‑commerce, manufacturing, and education, we build custom software that drives efficiency and growth.
//         </motion.p>
//       </div>

//       <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 md:px-6 ">
//         <div className="w-full max-w-7xl bg-sky-400 rounded-3xl px-6 pb-6 pt-0 shadow-2xl relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />

//           {/* 1. TOP TABS BAR */}
//           <div className="w-full mb-0 relative -bottom-8 z-50  overflow-x-auto scrollbar-hide pb-6">
//             <div className="flex items-start justify-between gap-6 min-w-max px-2">
//               {industries.map((item, idx) => (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     const targetScroll = (idx / industries.length) * (sectionRef.current.scrollHeight - window.innerHeight);
//                     window.scrollTo({ top: sectionRef.current.offsetTop + targetScroll, behavior: 'smooth' });
//                   }}
//                   className={`flex flex-col items-center gap-3 transition-all duration-500 flex-shrink-0 group ${
//                     currentIndex === idx 
//                     ? 'bg-white rounded-lg p-4 shadow-md text-[#00B7EB]' 
//                     : 'text-white/80 hover:text-white'
//                   }`}
//                 >
//                   <div className={`text-xl md:text-2xl transition-transform group-hover:scale-110`}>{item.icon}</div>
//                   <span className="text-[9px] md:text-[10px] font-black tracking-widest text-center leading-tight w-20">
//                     {item.title.split(' / ')[0]}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* 2. DYNAMIC CONTENT CARD */}
//           <div className="w-full">
//             <AnimatePresence mode="wait">
//               <motion.div 
//                 key={active.id}
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -50 }}
//                 transition={{ duration: 0.5, ease: "circOut" }}
//                 className="bg-gradient-to-b from-white to-[#DFF7FF] rounded-2xl overflow-hidden flex flex-col lg:flex-row min-h-[450px] lg:min-h-[300px] shadow-inner"
//               >
//                 {/* Left Side: Content */}
//                 <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
//                 <Link href={active.href} > 
//                   <h2 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-sky-950 mb-6 flex items-center gap-4">
//                     {active.title} <FaArrowRight className="text-sky-500 text-2xl md:text-3xl"/>
//                   </h2>
// </Link>
//                   {/* ✅ SUBTITLE WORKING NOW */}
//                   <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed mb-8 font-medium line-clamp-3 md:line-clamp-none">
//                     {active.subtitle}
//                   </p>
                  
//                   {/* Checkmark List */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 mb-10">
//                     {active.points.map((point, i) => (
//                       <div key={i} className="flex items-start gap-3">
//                         <FaCheckCircle className="text-[#00B7EB] mt-1 shrink-0 text-sm" />
//                         <span className="text-slate-700 font-bold text-xs md:text-sm tracking-tight">{point}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <Link href={active.href} className="bg-[#00B7EB] text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all w-fit shadow-lg shadow-sky-400/20">
//                     Learn More →
//                   </Link>
//                 </div>

//                 {/* Right Side: Media & Glass Grid */}
//                 <div className="flex-1 relative min-h-28 lg:min-h-full lg:pt-1lg:pr-1">
//                   <div className="relative w-full h-full rounded-tr-xl lg:rounded-tr-2xl overflow-hidden">
//                     <Image 
//                       src={active.image} 
//                       alt={active.title} 
//                       fill 
//                       className="object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//                   </div>
                  
//                   {/* Glassmorphism Buttons Grid */}
//                   <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 lg:pr-12 grid grid-cols-2 gap-2 md:gap-3 bg-white/10 backdrop-blur-md border-t border-white/20">
//                     {active.subButtons.map((btn, idx) => (
//                       <motion.div 
//                         whileHover={{ scale: 1.03 }}
//                         key={idx} 
//                         className="bg-white/95 border border-sky-100 p-2 md:p-3.5 rounded-xl flex items-center justify-start gap-4 group cursor-pointer hover:bg-sky-50 transition-all duration-300"
//                       >
//                       <FaArrowRight className="text-sky-500 text-[8px] md:text-[10px] flex-shrink-0"/>
//                         <span className="text-sky-600  text-base md:text-[10px]  tracking-tighter  truncate pr-1">{btn}</span>
                        
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle, FaArrowRight, FaHeartbeat, FaGraduationCap,
  FaBuilding, FaPlane, FaUtensils, FaDumbbell, FaStore,
  FaTruck, FaFilm, FaUsers, FaCar, FaHammer, FaIndustry, FaCalendarAlt, FaDollarSign
} from "react-icons/fa";

export default function IndustryTabsSection() {
  const [industries] = useState([
    {
      title: "Healthcare",
      id: "healthcare",
      href: "/industries/healthcare",
      subtitle: "We build HIPAA-compliant digital healthcare ecosystems that prioritize patient care and data security. Our integrated solutions empower providers to deliver superior care while streamlining clinical workflows and improving long-term patient outcomes across all platforms.",
      points: [
        "Real‑time patient monitoring",
        "Appointment scheduling & reminders",
        "Electronic health records access",
        "Telemedicine & virtual consultations",
        "Digital prescription management",
        "Emergency alerts & notifications"
      ],
      icon: <FaHeartbeat />,
      image: "/images/industries/healthcare.jpg",
      subButtons: [
        "Healthcare App Development",
        "Healthcare Website Design",
        "EHR/EMR System Integration",
        "Medical Digital Marketing"
      ]
    },
    {
      title: "Travel & Hospitality",
      id: "travel",
      href: "/industries/travel",
      subtitle: "We assist travel agencies and hotels to develop digital solutions providing visitors with a smooth experience throughout their journey. Our services enable users to book easily while accessing real-time information about accommodation and tour details effortlessly.",
      points: [
        "Online travel booking systems",
        "Hotel and tour management",
        "Personalized itinerary planning",
        "Real-time travel notifications",
        "Customer feedback management",
        "Loyalty programs & tracking"
      ],
      icon: <FaPlane />,
      image: "/images/industries/travel.webp",
      subButtons: [
        "Travel Booking App Development",
        "Hotel Management Software",
        "Booking Portal Development",
        "Marketing for Travel Services"
      ]
    },
    {
      title: "Education / E-Learning",
      id: "elearning",
      href: "/industries/elearning",
      subtitle: "We assist educational institutions and EdTech startups to create digital solutions which enhance learning accessibility and student engagement. Our services create a streamlined process for course management while delivering immediate learning progress and data insights.",
      points: [
        "Online course management",
        "Virtual classroom streaming",
        "Enrollment & progress tracking",
        "Assessments and certifications",
        "Analytics and student insights",
        "Communication & notifications"
      ],
      icon: <FaGraduationCap />,
      image: "/images/industries/education.webp",
      subButtons: [
        "E-Learning App Development",
        "Education Website Design",
        "LMS Software Development",
        "Digital Marketing for EdTech"
      ]
    },
    {
      title: "Real Estate",
      id: "real-estate",
      href: "/industries/real-estate",
      subtitle: "We develop digital solutions which help real estate agencies and property developers to manage listings and increase market presence. Our services enable customers to conduct property searches and complete transactions with real-time data to assist in critical decision-making.",
      points: [
        "Property listing management",
        "Virtual tours & 3D walkthroughs",
        "Buyer & tenant lead tracking",
        "Appointment & viewing schedules",
        "Market analytics and insights",
        "Customer support & feedback"
      ],
      icon: <FaBuilding />,
      image: "/images/industries/realestate.avif",
      subButtons: [
        "Real Estate App Development",
        "Property Website Solutions",
        "Real Estate CRM Software",
        "Marketing for Real Estate"
      ]
    },
    {
      title: "Fitness & Wellness",
      id: "fitness",
      href: "/industries/fitness",
      subtitle: "Softkingo provides digital solution development to gyms and wellness centers to create personalized programs that drive user engagement. Our services enable organizations to manage schedules while monitoring student advancement and improving customer interactions.",
      points: [
        "Workout tracking & analytics",
        "Class scheduling and booking",
        "Personalized nutrition guides",
        "Progress monitoring tools",
        "Membership & plan handling",
        "Smart notifications & reminders"
      ],
      icon: <FaDumbbell />,
      image: "/images/industries/finance.avif",
      subButtons: [
        "Fitness App Development",
        "Gym Management Software",
        "Wellness Website Solutions",
        "Fitness Digital Marketing"
      ]
    },
    {
      title: "Logistics & Transport",
      id: "logistics",
      href: "/industries/logistics",
      subtitle: "We help logistics companies and transportation businesses create digital solutions that make moving goods and managing fleets smooth and efficient. Our solutions help teams stay connected and deliveries stay on schedule while keeping customers informed at every single stage.",
      points: [
        "Shipment tracking & delivery",
        "Fleet & route optimization",
        "Warehouse & inventory control",
        "Order scheduling & dispatch",
        "Real-time alerts & status",
        "Reporting & operational insights"
      ],
      icon: <FaTruck />,
      image: "/images/industries/manufacturing.jpg",
      subButtons: [
        "Logistics App Development",
        "Fleet Management Software",
        "Logistics Website Design",
        "Marketing for Logistics"
      ]
    },
    {
      title: "Media & Entertainment",
      id: "media-entertainment",
      href: "/industries/media-entertainment",
      subtitle: "We help media companies and streaming platforms build digital solutions that make it easy for people to enjoy and share content. Whether it is video or live shows, our solutions help you connect with your audience in meaningful ways while maximizing your global reach.",
      points: [
        "Content & media organization",
        "Seamless video & audio playback",
        "Fast content publishing tools",
        "Personalized recommendations",
        "Real-time audience analytics",
        "Push notification engagement"
      ],
      icon: <FaFilm />,
      image: "/images/industries/entertainment.avif",
      subButtons: [
        "Media App Development",
        "Entertainment Web Solutions",
        "Content Streaming Platforms",
        "Marketing for Media Brands"
      ]
    },
    {
      title: "Social Networking",
      id: "social-media",
      href: "/industries/social-media",
      subtitle: "Softkingo helps businesses and startups build social networking platforms that bring people together and foster meaningful connections. Our mobile solutions make it simple, engaging, and secure for users to interact anytime, anywhere, while protecting sensitive user data.",
      points: [
        "Profile & connection management",
        "Easy post and media sharing",
        "Real-time chat & messaging",
        "Community and event building",
        "User activity & data analytics",
        "Advanced privacy & security"
      ],
      icon: <FaUsers />,
      image: "/images/industries/education.webp",
      subButtons: [
        "Social App Development",
        "Social Website Solutions",
        "Community Management Tools",
        "Social Media Marketing"
      ]
    },
    {
      title: "Automotive",
      id: "automotive",
      href: "/industries/automotive",
      subtitle: "We help manufacturers and dealerships create digital solutions that make every step of the vehicle journey simple and enjoyable. From browsing cars to scheduling service appointments, our solutions help businesses connect with customers and manage complex operations.",
      points: [
        "Vehicle listing & inventory",
        "Test drive & service booking",
        "Maintenance history tracking",
        "Real-time vehicle telematics",
        "Sales and behavior analytics",
        "Personalized customer support"
      ],
      icon: <FaCar />,
      image: "/images/industries/travel.webp",
      subButtons: [
        "Automotive App Development",
        "Dealership Web Solutions",
        "Inventory Management Tools",
        "Marketing for Automotive"
      ]
    },
    {
      title: "Construction",
      id: "construction",
      href: "/industries/construction",
      subtitle: "We build digital solutions that make managing your construction projects smoother, helping your teams stay connected and deadlines stay on track. Our platforms allow you to track tasks and milestones in one place while keeping clients informed through every phase.",
      points: [
        "Task & milestone tracking",
        "Team & vendor coordination",
        "Progress updates & alerts",
        "Resource & budget management",
        "Safety & compliance monitoring",
        "Equipment check scheduling"
      ],
      icon: <FaHammer />,
      image: "/images/industries/realestate.avif",
      subButtons: [
        "Construction App Development",
        "Construction Web Design",
        "Project Management Tools",
        "Marketing for Construction"
      ]
    },
    {
      title: "Manufacturing",
      id: "manufacturing",
      href: "/industries/manufacturing",
      subtitle: "We help manufacturers and industrial businesses build digital solutions that simplify operations, streamline workflows, and improve productivity. From tracking inventory to monitoring machinery, our solutions make it easier to stay on top of every part of your operation.",
      points: [
        "Production process tracking",
        "Inventory & supply chain data",
        "Equipment & maintenance alerts",
        "Product quality reporting",
        "Departmental coordination",
        "Performance data analytics"
      ],
      icon: <FaIndustry />,
      image: "/images/industries/manufacturing.jpg",
      subButtons: [
        "Manufacturing App Solutions",
        "Industrial Website Design",
        "Manufacturing ERP Software",
        "Marketing for Manufacturing"
      ]
    },
    {
      title: "Event Management",
      id: "event-management",
      href: "/industries/event-management",
      subtitle: "We help event management companies and venues create digital solutions that make planning, executing, and tracking events easier than ever. From managing attendees to coordinating vendors and schedules, our platforms handle the stress of complex event logistics.",
      points: [
        "End-to-end event planning",
        "Attendee & ticket management",
        "Vendor & staff coordination",
        "Real-time event notifications",
        "Engagement & data tracking",
        "Support & feedback systems"
      ],
      icon: <FaCalendarAlt />,
      image: "/images/industries/retail.jpg",
      subButtons: [
        "Event App Development",
        "Event Website Solutions",
        "Event Management Software",
        "Digital Marketing for Events"
      ]
    },
    {
      title: "Retail & E-Commerce",
      id: "ecommerce-2",
      href: "/industries/ecommerce",
      subtitle: "We help retail businesses grow with smart digital solutions built to handle real-world demand. Our ecommerce services are designed to boost online sales, improve customer engagement, and create smooth shopping experiences across all modern devices and platforms.",
      points: [
        "Secure payments & checkout",
        "Inventory & catalog control",
        "Order tracking & fulfillment",
        "Personalized user accounts",
        "Actionable performance data",
        "Customer ticketing systems"
      ],
      icon: <FaStore />,
      image: "/images/industries/retail.jpg",
      subButtons: [
        "Ecommerce App Development",
        "Ecommerce Website Design",
        "AI Shopping Solutions",
        "Payment Gateway Integration"
      ]
    },
    {
      title: "Banking & FinTech",
      id: "fintech",
      href: "/industries/fintech",
      subtitle: "We help financial institutions and FinTech startups build secure digital solutions that people can truly trust. Our development services are designed to simplify complex financial processes, strengthen security, and help businesses innovate with total confidence.",
      points: [
        "Secure data & transactions",
        "Smooth KYC and onboarding",
        "Digital wallet solutions",
        "Real-time data dashboards",
        "Fraud & risk management",
        "Support & ticketing systems"
      ],
      icon: <FaDollarSign />,
      image: "/images/industries/finance.avif",
      subButtons: [
        "FinTech App Development",
        "AI Fraud Detection Tools",
        "Digital Wallet Solutions",
        "Blockchain for Finance"
      ]
    },
    {
      title: "Food & Restaurant",
      id: "food-restaurant",
      href: "/industries/food-delivery",
      subtitle: "We provide scalable and user-friendly digital solutions for the Food sector. Our development services enable restaurants and cloud kitchens to improve their operational workflow and boost their online sales while engaging better with their customers every day.",
      points: [
        "Online ordering & booking",
        "Menu & catalog customization",
        "Payment & billing systems",
        "Delivery tracking & status",
        "Customer loyalty & offers",
        "Data analytics & reporting"
      ],
      icon: <FaUtensils />,
      image: "/images/industries/entertainment.avif",
      subButtons: [
        "Food Delivery App Design",
        "Restaurant Management Tech",
        "Cloud Kitchen Software",
        "Marketing for Food Brands"
      ]
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const active = industries[currentIndex];

  return (
    <section className="relative bg-white pt-16 pb-20">
      
      {/* SECTION HEADER */}
      <div className="text-center mb-8 px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-sky-900"
        >
          Industries{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500">
            We Serve
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
        >
          From healthcare and finance to e‑commerce, manufacturing, and education, we build custom software that drives efficiency and growth.
        </motion.p>
      </div>

      {/* MAIN CONTAINER */}
      <div className="w-full flex items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-7xl bg-sky-400 rounded-3xl px-2 pb-2 sm:px-4 sm:pb-4 pt-0 shadow-2xl relative overflow-hidden">
          
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />

          {/* 1. TOP TABS BAR (SCROLLABLE) */}
          <div className="w-full mb-0 relative -bottom-12 z-20 overflow-x-auto scrollbar-hide pb-6">
            <div className="flex items-start justify-between gap-6 min-w-max px-2 py-4">
              {industries.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex flex-col items-center gap-3 transition-all duration-300 flex-shrink-0 group ${
                    currentIndex === idx 
                    ? 'bg-white rounded-lg p-3 shadow-lg scale-110 -translate-y-1 text-[#00B7EB]' 
                    : 'text-white/80 hover:text-white hover:scale-105'
                  }`}
                >
                  <div className="text-xl md:text-2xl transition-transform">{item.icon}</div>
                  <span className="text-[9px] md:text-[10px] fontblack trackingwidest text-center leading-normal shrink-0 w-fit min-w-20">
                    {item.title.split(' / ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. DYNAMIC CONTENT CARD */}
          <div className="w-full relative z-10">
            <AnimatePresence mode="wait">
              <motion.div 
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-gradient-to-b from-white to-[#DFF7FF] rounded-2xl overflow-hidden flex flex-col lg:flex-row min-h-[450px] shadow-inner"
              >
                
                {/* Left Side: Content */}
                <div className="flex-1 p-6 md:p-10 flex flex-col justify-center">
                  <Link href={active.href} className="group"> 
                    <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-sky-950 mb-6 flex items-center gap-4 group-hover:text-sky-600 transition-colors">
                      {active.title} <FaArrowRight className="text-sky-500 text-xl md:text-2xl group-hover:translate-x-1 transition-transform"/>
                    </h2>
                  </Link>

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 font-medium">
                    {active.subtitle}
                  </p>
                  
                  {/* Checkmark List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 mb-10">
                    {active.points.map((point, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <FaCheckCircle className="text-[#00B7EB] mt-1 shrink-0 text-sm" />
                        <span className="text-slate-700 font-bold text-xs md:text-sm tracking-tight">{point}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={active.href} className="bg-[#00B7EB] text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-900 transition-all w-fit shadow-lg shadow-sky-400/20">
                    Learn More →
                  </Link>
                </div>

                {/* Right Side: Media & Glass Grid */}
                <div className="flex-1 relative min-h-[150px] lg:min-h-full">
                  <div className="relative w-full h-full lg:rounded-tl-none lg:rounded-bl-none overflow-hidden">
                    <Image 
                      src={active.image} 
                      alt={active.title} 
                      fill 
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                  
                  {/* Glassmorphism Buttons Grid */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 grid grid-cols-2 gap-3 bg-white/10 backdrop-blur-md border-t border-white/20 lg:rounded-br-lh">
                    {active.subButtons.map((btn, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white/95 border border-sky-100 p-3 rounded-lg flex items-center justify-between group cursor-default hover:bg-sky-50 transition-colors"
                      >
                         <FaArrowRight className="text-sky-500 text-xs flex-shrink-0"/>
                        <span className="text-sky-700 font-bold text-[10px] uppercase tracking-tight truncate pl-2 w-full">{btn}</span>
                       
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}