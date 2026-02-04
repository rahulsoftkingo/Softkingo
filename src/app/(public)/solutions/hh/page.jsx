"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaCheckCircle, FaClock, FaDollarSign, FaUsers, 
  FaMobileAlt, FaLink, FaUserShield, FaSun, FaArrowRight 
} from 'react-icons/fa';
import { BsCheckCircle } from 'react-icons/bs';

// Components
import LeadForm from "@/components/public/InquiryForm"; 
import Blogs from "@/app/(public)/home/blogs/BlogSliderClient";
import InquirySection from "@/components/footer/InquirySection";
import CommonTitle from "@/components/ui/CommonTitle";
import DynamicPortfolioCard from "@/components/ui/DynamicPortfolioCard";
import ConsultationCTA from "@/components/common/Consultation-Cta";
import FAQAccordion from "@/components/common/Faqaccordion";
import TechView from "@/components/common/TechView";


export default function GeneratedPage() {
    // 🔥 CRITICAL FIX: Inject content variable here
    const content = {"hero":{"title":"hh","subtitle":"","image":""},"aboutTitle":"About Our Solution","aboutSubtitle":"We provide comprehensive solutions.","benefits":["Scalable Architecture","24/7 Support"],"services":[{"title":"User App","image":""},{"title":"Admin Panel","image":""}],"caseStudy":{"image":""},"portfolioCategory":"app","cta":{"title":"Ready to Scale?"}}; 

    return (
        <main className="bg-white text-slate-900 font-sans">
            
        
      <section className="relative overflow-hidden flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 min-h-[600px]">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={content.hero.image || "/images/services/default-bg.png"}
            alt={content.hero.title}
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-800/70 to-slate-500/60 opacity-40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 w-full">
          <div className="max-w-3xl text-white space-y-6 md:space-y-8">
            {/* Breadcrumb */}
            <nav className="mb-6 md:mb-8 animate-fadeInUp">
              <div className="flex flex-wrap items-center text-xs md:text-sm text-sky-100/80 gap-1 md:gap-2">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
                <span>›</span>
                <span className="font-semibold text-cyan-400">{content.hero.title}</span>
              </div>
            </nav>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fadeInUp animation-delay-200">
                {content.hero.title}
              </h1>
              <p className="text-sky-100 text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed animate-fadeInUp animation-delay-400">
                {content.hero.subtitle}
              </p>
            </div>

            <div className="flex gap-4 animate-fadeInUp animation-delay-600">
              <Link href="/contact" className="px-6 md:px-8 py-3.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-sm md:text-base font-bold hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300 items-center cursor-pointer inline-flex">
                Let’s Work Together <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
        
        <style>{`
            @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
            .animation-delay-200 { animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards; }
            .animation-delay-400 { animation-delay: 0.4s; opacity: 0; animation-fill-mode: forwards; }
            .animation-delay-600 { animation-delay: 0.6s; opacity: 0; animation-fill-mode: forwards; }
        `}</style>
      </section>
    
        
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="lead-form">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_minmax(320px,380px)] gap-10 items-start">
          
          {/* Left: About Text & Benefits */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {content.aboutTitle || "Transforming Ideas into Reality"}
            </h2>
            <p className="text-slate-600 mb-6 text-sm md:text-base leading-relaxed">
              {content.aboutSubtitle || "We deliver scalable, robust, and secure solutions tailored to your business goals."}
            </p>

            {content.benefits && content.benefits.length > 0 && (
              <div className="space-y-4">
                {content.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <span className="flex-shrink-0 mt-1">
                      <BsCheckCircle className="w-5 h-5 text-sky-600" />
                    </span>
                    <span className="text-slate-700 font-medium text-sm md:text-base">{b}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Lead Form */}
          <div className="w-full relative">
             <div className="absolute inset-0 bg-sky-200 blur-2xl opacity-20 rounded-full" />
             <LeadForm
               formType="service"
               formKey="hh"
               serviceName={content.hero.title}
               title="Get Your Free Quote"
               subtitle="Fast response within 24 hours"
               variant="solid"
               showLogo={true}
               showCompany={false}
               showBudget={false}
               showAttachment={false}
               showNDA={false}
             />
          </div>
        </div>
      </section>
    
        
      <section className="max-w-7xl mx-auto p-6 lg:px-20 py-16">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <CommonTitle pill={false}
            title="Features"
            subtitle="Explore the key features that make our solution stand out."
            gradientText="Key Capabilities"
            align="center" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {content.services?.map((service, idx) => (
            <div key={idx} className="group gap-4 transition-all duration-300 cursor-pointer">
              <div className="relative h-52 w-full bg-slate-100 overflow-hidden rounded-2xl shadow-sm group-hover:shadow-xl transition-all mb-4 border border-slate-200">
                <Image
                  src={service.image || "/images/placeholder.jpg"}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm group-hover:border-sky-200 transition-colors">
                <h3 className="text-center text-base font-bold text-slate-800 leading-snug">
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    
        
      <section className="relative w-full mb-16 max-w-7xl mx-auto px-6">
        <div className="bg-sky-50 rounded-[3rem] w-full overflow-hidden border border-sky-100">
          <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">
                Hungry For <span className="text-sky-600">Growth?</span>
              </h2>
              <p className="text-slate-600 text-lg font-medium max-w-xl">
                Explore your app development potential with technical excellence and bring your vision to life.
              </p>
              <Link href="/contact" className="inline-block bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-sky-600 transition-colors shadow-lg shadow-slate-200">
                Get Started Today
              </Link>
            </div>
            <div className="relative w-full md:w-1/3 h-64">
               <Image
                  src="/images/food-service/i6.png"
                  alt="Illustration"
                  fill
                  className="object-contain"
               />
            </div>
          </div>
        </div>
      </section>
    
        
      <section className='py-20 bg-gradient-to-br from-white to-slate-50'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className="text-center mb-16">
             <CommonTitle pill={false} title="Why" subtitle={false} gradientText="Invest In This Solution?" align="center" />
          </div>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src={content.caseStudy.image || "/images/food-service/i4.png"} 
                alt="Why Invest"
                fill
                className="object-cover"
              />
            </div>
            <div className='space-y-8'>
              {[
                { title: "Increased Efficiency & Speed", desc: "Automate workflows to save time." },
                { title: "Cost Reduction", desc: "minimize operational costs effectively." },
                { title: "Better Customer Experience", desc: "Engage users with intuitive UI." },
                { title: "Scalable Infrastructure", desc: "Grow without technical bottlenecks." }
              ].map((item, i) => (
                <div key={i} className='flex gap-5 items-start p-4 rounded-xl hover:bg-white transition-colors hover:shadow-sm'>
                  <div className="w-12 h-12 flex-shrink-0 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-bold">
                    {i+1}
                  </div>
                  <div>
                    <h4 className='text-lg font-bold text-slate-900 mb-1'>{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    
        <TechView />
        
      <DynamicPortfolioCard 
        category="app" 
        portfolioType="app" 
        title="Latest Projects" 
        subtitle="Explore our recent work in this domain." 
      />
    
        
      <section className="bg-white py-16 border-y border-slate-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <CommonTitle align="center" pill={false} title='Our' gradientText='Awards & Recognitions' subtitle='Recognized for excellence.' />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
             <Image src="/images/award/Goodfirms award-softkingo.png" alt="award" width={150} height={80} className="mx-auto"/>
             <Image src="/images/award/techbeheb.png" alt="award" width={150} height={80} className="mx-auto"/>
             <Image src="/images/award/Black And Gold Modern Award Ceremony Instagram Post (1).png" alt="award" width={150} height={80} className="mx-auto"/>
             <Image src="/images/award/Black And Gold Modern Award Ceremony Instagram Post (2).png" alt="award" width={150} height={80} className="mx-auto"/>
             <Image src="/images/award/Black And Gold Modern Award Ceremony Instagram Post (4).png" alt="award" width={150} height={80} className="mx-auto"/>
          </div>
        </div>
      </section>
    
        
      <ConsultationCTA 
        imageSrc="/images/cta/cta.png" 
        href="/contact" 
        title={content.cta?.title || "Let’s Build Your Next Big App"} 
        subtitle="Collaborate with a leading development agency to turn your innovative idea into a feature-rich mobile application." 
      />
    
        
      <Blogs
        category=""
        featured={false}
        title="Related Insights"
        subtitle="Expert articles and guides to help you scale."
      />
    
        <FAQAccordion />
    
            <InquirySection />
        </main>
    );
}