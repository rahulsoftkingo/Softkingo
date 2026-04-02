"use client";
import { ArrowRight, Briefcase, ShoppingCart, Star, Zap, LayoutGrid, ShieldCheck, Copy } from 'lucide-react';
import { FaUtensils, FaCar, FaHospital, FaStore, FaMobileAlt, FaCloud, FaGraduationCap, FaBuilding, FaPlane, FaDumbbell, FaTruck, FaFilm, FaUsers, FaDollarSign, FaHammer, FaCalendarAlt, FaSpa, FaUserGraduate, FaWrench, FaCarSide, FaHome, FaShoppingCart, FaMusic, FaSpotify, FaCameraRetro, FaQuestionCircle, FaCamera, FaHeart, FaBed, FaShoppingBag, FaProjectDiagram, FaCoins, FaIndustry as FaFactory, } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SolutionsSection() {
  const solutions = [
    {
      id: "industry",
      title: "Industry-Specific Solutions",
      subtitle: "We deliver customized solutions for a wide range of industries, from healthcare and education to e-commerce and finance. Our apps are designed to streamline operations, improve user engagement, and drive business growth. Whatever your industry, we provide technology that fits your unique needs.",
      imagePosition: "right",
      bgColor: "bg-white",
      caseStudy: {
        // title: "Enterprise Transformation",
        // description: "Helping industries adopt AI and Cloud to lead in the global market.",
        buttonText: "Explore Industries",
        image: "/images/solutions/solutionslist/Industry-specific-solutions.webp",
      },
      items: [
        { name: "Healthcare", href: "/solutions/healthcare-app-development", icon: FaHospital },
        { name: "Education", href: "/solutions/elearning-app-development", icon: FaGraduationCap },
        { name: "Real Estate", href: "/solutions/real-estate-app-development", icon: FaBuilding },
        { name: "Travel", href: "/solutions/travel-app-development", icon: FaPlane },
        { name: "FinTech", href: "/solutions/fintech-app-development", icon: FaDollarSign },
        { name: "Manufacturing", href: "/solutions/manufacturing-app-development", icon: FaFactory },
        { name: "Construction", href: "/solutions/construction-management-app-development", icon: FaHammer },
      ]
    },
    {
      id: "ondemand",
      title: "On-Demand & Real-Time Solutions",
      subtitle: "Our on-demand platforms connect users with services instantly, making everything fast, convenient, and reliable. From food delivery and taxi booking to home services and healthcare apps, we ensure seamless real-time experiences. We help businesses thrive in the fast-paced on-demand market.",
      imagePosition: "left",
      bgColor: "bg-sky-50",
      caseStudy: {
        // title: "Hyperlocal Delivery",
        // description: "Scalable architectures for order matching and GPS tracking.",
        buttonText: "View On-Demand",
        image: "/images/solutions/solutionslist/on-demand-platform.webp",
      },
      items: [
        { name: "Food Delivery", href: "/solutions/food-delivery-app-development", icon: FaUtensils },
        { name: "Taxi Booking", href: "/solutions/taxi-app-development", icon: FaCar },
        { name: "Grocery Delivery", href: "/solutions/grocery-delivery-app-development", icon: FaShoppingBag },
        { name: "Home Services", href: "/solutions/on-demand-home-service-app-development", icon: FaHome },
        { name: "Beauty/Salon", href: "/solutions/salon-app-development", icon: FaSpa },
        { name: "Laundry", href: "/solutions/laundry-app-development", icon: FaShoppingBag },
        { name: "Mechanic App", href: "/solutions/mechanic-app-development", icon: FaWrench },
      ]
    },
    {
      id: "cloneapps",
      title: "Ready-Made Clone App Solutions",
      subtitle: "Launch apps inspired by top market leaders with our customizable clone solutions. Save time, reduce costs, and enter the market faster with apps tailored to your branding and features. From e-commerce and ride-hailing to social and entertainment apps, we provide ready-to-use solutions.",
      imagePosition: "right",
      bgColor: "bg-white",
      caseStudy: {
        // title: "Rapid Market Entry",
        // description: "Customizable models like Zomato, Uber, and Amazon clones.",
        buttonText: "Browse Clones",
        image: "/images/solutions/solutionslist/clone-solutions.webp",
      },
      items: [
        { name: "Amazon Clone", href: "/solutions/amazon-clone-app-development", icon: FaShoppingCart },
        { name: "Zomato Clone", href: "/solutions/zomato-clone-app-development", icon: FaUtensils },
        { name: "Uber Clone", href: "/solutions/uber-clone-app-development", icon: FaCar },
        { name: "Instagram Clone", href: "/solutions/instagram-clone-app-development", icon: FaCamera },
        { name: "Tinder Clone", href: "/solutions/tinder-clone-app-development", icon: FaHeart },
        { name: "Spotify Clone", href: "/solutions/spotify-clone-app-development", icon: FaSpotify },
      ]
    },
    {
      id: "business",
      title: "Business-Model Based Solutions",
      subtitle: "We create apps and software built around the business model that works best for you. From marketplaces and subscription platforms to CRM, ERP, and booking systems, our solutions are designed to generate revenue and scale efficiently. We turn ideas into profitable, operationally strong businesses.",
      imagePosition: "left",
      bgColor: "bg-sky-50",
      caseStudy: {
        // title: "Scalable SaaS",
        // description: "B2B marketplaces and CRM/ERP custom software.",
        buttonText: "View Enterprise",
        image: "/images/solutions/solutionslist/Business-Model Solutions.webp",
      },
      items: [
        { name: "Marketplace", href: "/solutions/marketplace-app-development", icon: FaStore },
        { name: "SaaS Product", href: "/solutions/saas-product-development", icon: FaCloud },
        { name: "CRM Systems", href: "/solutions/crm-software-development", icon: FaProjectDiagram },
        { name: "ERP Software", href: "/solutions/erp-software-development", icon: ShieldCheck },
        { name: "Loyalty Apps", href: "/solutions/loyalty-membership-platform-development", icon: FaCoins },
        { name: "HR Management", href: "/solutions/hr-software-development", icon: FaUsers },
      ]
    }
  ];
  return (
    <div className="w-full">
      {solutions.map((section, index) => (
        <section key={section.id} className={`${section.bgColor} py-16 md:py-24 px-6 md:px-12 lg:px-16 overflow-hidden`}>
          <div className="max-w-7xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${section.imagePosition === "left" ? "lg:flex-row-reverse" : ""}`}>

              <div className={section.imagePosition === "left" ? "lg:order-1" : "lg:order-2"}>
                <CaseStudyCard caseStudy={section.caseStudy} />
              </div>

              <div className={`space-y-8 ${section.imagePosition === "right" ? "lg:order-1" : "lg:order-2"}`}>
                <div className="z-10 relative">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-normal flex items-center gap-4">
                    {section.title} <ArrowRight className="w-8 h-8 text-sky-500 shrink-0" />
                  </h2>
                  <p className="mt-4 text-lg text-gray-600 leading-relaxed">{section.subtitle}</p>
                </div>

                {/* --- Fix: Scrollable Carousel with Hover Pause --- */}
                <div className="relative py-4 overflow-visible">
                  <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <motion.div
                      className="flex gap-4 cursor-grab active:cursor-grabbing"
                      drag="x"
                      dragConstraints={{ left: -1500, right: 0 }}
                      // Animation logic
                      animate={{ x: [0, -1000] }}
                      transition={{
                        x: {
                          repeat: Infinity,
                          duration: 30,
                          ease: "linear",
                          pauseOnHover: true // Ye property hover pe animation rok degi
                        }
                      }}
                      style={{ width: "max-content" }}
                    >
                      {[...section.items, ...section.items, ...section.items].map((tech, i) => {
                        const Icon = tech.icon;
                        return (
                          <Link
                            key={i}
                            href={tech.href}
                            onPointerDown={(e) => e.stopPropagation()} // Drag aur click ka conflict handle karne ke liye
                            className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-6 py-3 shadow-sm hover:border-sky-400 hover:shadow-md transition-all whitespace-nowrap"
                          >
                            <Icon className="w-5 h-5 text-sky-600" />
                            <span className="font-bold text-sm text-gray-800">{tech.name}</span>
                          </Link>
                        );
                      })}
                    </motion.div>
                  </div>
                </div>

                {/* <div className="pt-6 border-t border-gray-100 relative z-10">
                  <h3 className="text-2xl font-black text-gray-900">{section.caseStudy.title}</h3>
                  <p className="mt-2 text-md text-gray-600 max-w-lg">{section.caseStudy.description}</p>
                </div> */}
              </div>

            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function CaseStudyCard({ caseStudy }) {
  return (
    <div className="relative group z-0">
      <div className="overflow-hidden rounded-3xl shadow-xl transition-all duration-500 group-hover:shadow-sky-200">
        <Image
          src={caseStudy.image}
          alt={caseStudy.title}
          width={800}
          height={550}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
      </div>
      {/* <div className="mt-6">
        <Link href="/contact" className="inline-flex items-center gap-2 bg-sky-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-sky-500 transition-colors shadow-lg shadow-sky-600/20">
          {caseStudy.buttonText} <ArrowRight className="w-4 h-4" />
        </Link>
      </div> */}
    </div>
  );
}
