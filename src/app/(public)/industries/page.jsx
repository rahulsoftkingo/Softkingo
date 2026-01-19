// src/app/(public)/industries/page.jsx
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { FaIndustry, FaHeartbeat, FaGraduationCap, FaBuilding, FaPlane, FaUtensils, FaDumbbell, FaStore, FaTruck, FaFilm, FaUsers, FaDollarSign, FaCar, FaHammer, FaCalendarAlt } from 'react-icons/fa';
import InquirySection from '@/components/footer/InquirySection';

const industries = [
  { title: "Healthcare", href: "/industries/healthcare-app-development", icon: <FaHeartbeat />, color: "from-rose-500/20 via-pink-500/20 to-rose-500/10", image: "/images/industries/i-1.png" },
  { title: "Education / E-Learning", href: "/industries/elearning-app-development", icon: <FaGraduationCap />, color: "from-sky-500/20 via-cyan-500/20 to-sky-500/10", image: "/images/industries/education-preview.jpg" },
  { title: "Real Estate", href: "/industries/real-estate-app-development", icon: <FaBuilding />, color: "from-emerald-500/20 via-teal-500/20 to-emerald-500/10", image: "/images/industries/realestate-preview.jpg" },
  { title: "Travel & Tourism", href: "/industries/travel-app-development", icon: <FaPlane />, color: "from-orange-500/20 via-red-500/20 to-orange-500/10", image: "/images/industries/travel-preview.jpg" },
  { title: "Food & Restaurant", href: "/industries/food-delivery-app-development", icon: <FaUtensils />, color: "from-amber-500/20 via-yellow-500/20 to-amber-500/10", image: "/images/industries/food-preview.jpg" },
  { title: "Fitness & Wellness", href: "/industries/fitness-app-development", icon: <FaDumbbell />, color: "from-purple-500/20 via-violet-500/20 to-purple-500/10", image: "/images/industries/fitness-preview.jpg" },
  { title: "Retail & E-Commerce", href: "/industries/ecommerce-app-development", icon: <FaStore />, color: "from-indigo-500/20 via-blue-500/20 to-indigo-500/10", image: "/images/industries/ecommerce-preview.jpg" },
  { title: "Logistics/Transportation", href: "/industries/logistics-app-development", icon: <FaTruck />, color: "from-slate-500/20 via-gray-500/20 to-slate-500/10", image: "/images/industries/logistics-preview.jpg" },
  { title: "Media & Entertainment", href: "/industries/media-entertainment-app-development", icon: <FaFilm />, color: "from-lime-500/20 via-green-500/20 to-lime-500/10", image: "/images/industries/media-preview.jpg" },
  { title: "Social Networking", href: "/industries/social-media-app-development", icon: <FaUsers />, color: "from-fuchsia-500/20 via-pink-500/20 to-fuchsia-500/10", image: "/images/industries/social-preview.jpg" },
  { title: "Finance / FinTech", href: "/industries/fintech-software-development", icon: <FaDollarSign />, color: "from-green-500/20 via-emerald-500/20 to-green-500/10", image: "/images/industries/fintech-preview.jpg" },
  { title: "Automotive", href: "/industries/automotive-app-development", icon: <FaCar />, color: "from-blue-500/20 via-indigo-500/20 to-blue-500/10", image: "/images/industries/automotive-preview.jpg" },
  { title: "Construction", href: "/industries/construction-management-software-development", icon: <FaHammer />, color: "from-yellow-500/20 via-amber-500/20 to-yellow-500/10", image: "/images/industries/construction-preview.jpg" },
  { title: "Manufacturing", href: "/industries/manufacturing-app-development", icon: <FaBuilding />, color: "from-gray-500/20 via-slate-500/20 to-gray-500/10", image: "/images/industries/manufacturing-preview.jpg" },
  { title: "Event Management", href: "/industries/event-management-software-development", icon: <FaCalendarAlt />, color: "from-violet-500/20 via-purple-500/20 to-violet-500/10", image: "/images/industries/events-preview.jpg" },
];

export default function IndustriesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden min-h-[70vh]">
        <Image
          src="/images/industries/industries-bg.png"
          alt="Industries"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-sky-900/60 to-transparent opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
         
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-white via-sky-100 to-white/80 bg-clip-text text-transparent mb-8 leading-none">
            <br className="hidden lg:block" />
            <span className="block text-sky-50 text-4xl md:text-6xl lg:text-8xl tracking-tight">Industries</span>
          </h1>
          <p className="max-w-4xl mx-auto text-2xl text-sky-100/95 leading-relaxed font-light">
            We build tailored digital products for high‑impact industries like education, healthcare, finance and retail, aligned with domain workflows.
          </p>
           <div className="inline-flex items-center gap-3 bg-white/30 backdrop-blur-md border border-white/40 px-8 py-4 rounded-3xl mb-12 shadow-2xl">
            <FaIndustry className="text-sky-300 text-2xl" />
            <span className="text-lg font-semibold text-white tracking-wider uppercase">Industry‑Specific Solutions</span>
          </div>
        </div>
      </section>

      {/* Industry Sections */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white to-sky-50/30 -z-10" />
        <div className="max-w-7xl mx-auto px-6 pb-32 pt-24">
          {industries.map((industry, index) => (
            <section
              key={industry.title}
              className={`grid grid-cols-1 lg:grid-cols-2 items-stretch gap-12 lg:gap-24 mb-32 last:mb-16 group ${
                index % 2 === 0 ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Content Side */}
              <div className="flex flex-col justify-center p-12lg:p-16xl:p-20 space-y-8">
                <div className="inline-flex items-center gap-4 bg-gradient-to-r ${industry.color} backdrop-blur-xl border border-white/50 px-8 py-4 rounded-3xl shadow-xl">
                  <div className="text-3xl p-3 bg-white/20 rounded-2xl shadow-lg">{industry.icon}</div>
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-black text-slate-900 mb-2 leading-tight">{industry.title}</h3>
                    <div className="w-24 h-1 bg-gradient-to-r ${industry.color} rounded-full" />
                  </div>
                </div>

                <div>
                  <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text mb-6">
                    Domain‑Specific Innovation
                  </h2>
                  <p className="text-xl lg:text-2xl text-slate-600/90 mb-10 leading-relaxed max-w-lg">
                    Enterprise-grade solutions engineered for {industry.title.toLowerCase()} workflows. Scalable, secure, and future-proof.
                  </p>
                </div>

                {/* <div className="grid grid-cols-2 gap-6 mb-12">
                  {[
                    "Industry‑compliant architecture",
                    "Real-time operational dashboards",
                    "Scalable cloud infrastructure", 
                    "Advanced security protocols"
                  ].map((feature, i) => (
                    <div key={i} className="group p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-slate-100/50 hover:bg-white hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-500 hover:-translate-y-2">
                      <div className="w-3 h-3 bg-gradient-to-r ${industry.color} rounded-full mb-3 group-hover:scale-110 transition-transform" />
                      <p className="text-slate-700 font-medium leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div> */}

                <Link
                  href={industry.href}
                  className="group inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r ${industry.color} text-sky-700 font-bold text-lg rounded-3xl shadow-2xl hover:shadow-sky-500/25 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 max-w-fit"
                >
                  Launch Your Project
                  <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                    <FaIndustry className="text-sm" />
                  </div>
                </Link>
              </div>

              {/* Image/Visual Side */}
              <div className="relative h-[400px] lg:h-[500px] xl:h-[600px] rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-sky-200/50 transition-all duration-700">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 group-hover:rotate-1"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute -inset-2 bg-gradient-to-r ${industry.color} opacity-20 rounded-3xl blur-xl -z-10 animate-pulse" />
                
              </div>
            </section>
          ))}
        </div>
      </div>
            <InquirySection />

    </>
  );
}
