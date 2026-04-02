'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowRight, FaRobot, FaBrain, FaDatabase, FaShoppingCart, FaMagic, FaChartLine, FaCheck, FaUserTie, FaChess, FaShieldAlt, FaComments, FaHeadset } from 'react-icons/fa';
import CommonTitle from '@/components/ui/CommonTitle';
import InquirySection from '@/components/footer/InquirySection';
import BlogSection from '@/components/common/BlogSection';
import FAQAccordion from '@/components/common/Faqaccordion';
import LeadForm from '@/components/public/LeadForm';
import HireDevelopersPage from '../hire/[slug]/SelectDeveloper';
import IndustriesSection from '@/components/common/IndustriesSection';
import ConsultationCTA from '@/components/common/Consultation-Cta';
import DynamicPortfolioCard from '@/components/ui/DynamicPortfolioCard';
import CoreServicesSection from '@/components/common/CoreServicesSection';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import PopupQuoteModal from '@/components/PopupQuoteModal';
import { Calendar } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

export default function AIPage() {
  const [inView, setInView] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeProcess, setActiveProcess] = useState(0);
  const [activeAiSolution, setActiveAiSolution] = useState(0);
  const [activeSolution, setActiveSolution] = useState('Frameworks');
  const techNavRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setInView(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('section[id]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>

      {/* 01. Hero Section - REDESIGNED FOR IMMERSIVE FEEL */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        {/* Full Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/ai/AI-Services.webp"
            alt="AI Hero Background"
            fill
            className="object-cover object-center scale-105"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16 relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg text-white">
              AI Development Services
            </h1>

            <div className="max-w-2xl mx-auto space-y-2 mb-8">
              <p className="text-md md:text-lg text-sky-50 font-light leading-relaxed">
                At Softkingo Technologies, we design and develop intelligent AI solutions that help businesses automate processes, reduce operational costs, and unlock new growth opportunities.
              </p>
            </div>


            <div className="flex sm:flex-row gap-4 pt-2 animate-fadeInUp delay-300">
              <buttom
                onClick={() => setShowModal(true)}
                // href="/contact"
                className="w-fit px-4 md:px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300 items-center cursor-pointer inline-flex gap-2">
                Consult Our AI Experts <ArrowRight size={18} />
              </buttom>
              <Link href="https://calendly.com/paramhans-softkingo/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 md:px-8 py-2.5 rounded-full bg-white text-[#28AFDF] border border-[#28AFDF] font-medium hover:bg-[#28AFDF]/10 transform hover:-translate-y-1 shadow-lg shadow-[#28AFDF]/30 transition-all duration-300 text-xs md:text-md inline-flex items-center justify-center gap-2">
                <Calendar size={18} /> Schedule Meeting
              </Link>
            </div>
          </motion.div>
        </div>
      </section>



      {/* 02. We Are Section - PIXEL PERFECT MATCH */}
      <section id="about" className=" bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
            {/* Left: Image - Clean & Simple */}
            <motion.div
              className="w-full lg:w-1/3 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-[18/12] lg:aspect-[18/12] w-full rounded-2xl  shadow-2xl">
                <Image
                  src="/images/ai/AI-Solutions.webp"
                  alt="Handshake - We are Softkingo"
                  fill
                  className="object-cover rounded-3xl"
                  priority
                />
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* <CommonTitle
                align="left"
                title="We are"
                gradientText="Softkingo"
                subtitle="We are a technology-driven company focused on building innovative digital products that create real business value. With strong expertise in AI, mobile apps, web development, and enterprise solutions, our team combines strategic thinking with technical excellence."
              /> */}
              <div className="mb-6 flex flex-col items-start">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sky-900 leading-normal">
                    We are
                  </h2>
                  <Image
                    src="/images/softkingo-logo.png"
                    alt="Softkingo"
                    width={150}
                    height={35}
                    className="h-8 md:h-10 w-auto object-contain"
                  />
                </div>
                <div className="w-20 h-1.5 bg-[#0ea5e9] rounded-full" />
              </div>
              <div className="mt-8">
                <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
                  Our mission is simple: deliver scalable, secure, and performance-driven AI solutions that give our clients a competitive edge in the global market.

                  We are a technology-driven company focused on building innovative digital products that create real business value. With strong expertise in AI, mobile apps, web development, and enterprise solutions, our team combines strategic thinking with technical excellence.
                </p>
              </div>
            </motion.div>
          </div>

          {/* 02.5 Stats Section - Pixel Perfect Mockup Layout */}
          <div className="mt-16 lg:mt-22 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {[
              { icon: 'clock', value: '6+', label: 'Years Of Experience' },
              { icon: 'users', value: '400+', label: 'Apps Developed' },
              { icon: 'layout', value: '50+', label: 'AI Solutions' },
              { icon: 'globe', value: '350+', label: 'Clients Worldwide' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-[#f0f9ff] border border-sky-100/50 rounded-2xl p-6 lg:p-10 flex flex-col items-center justify-center text-center group hover:bg-white hover:shadow-2xl hover:shadow-sky-100/40 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Top Row: Icon + Value */}
                <div className="flex items-center justify-center gap-3 mb-1">
                  <div className="text-[#0ea5e9]">
                    {stat.icon === 'clock' && <svg className="w-5 h-5 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" /></svg>}
                    {stat.icon === 'users' && <svg className="w-5 h-5 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>}
                    {stat.icon === 'layout' && <svg className="w-5 h-5 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z" /></svg>}
                    {stat.icon === 'globe' && <svg className="w-5 h-5 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>}
                  </div>
                  <span className="text-2xl md:text-4xl font-bold text-[#0ea5e9] tracking-tight">
                    {stat.value}
                  </span>
                </div>
                {/* Bottom Label */}
                <div className="text-sky-400 font-semibold text-xs md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* 03. AI Services Section - Shared Component */}
      <CoreServicesSection
        title="Our Core Services"
        subtitle="End-to-end AI development services designed to solve real business problems and create measurable growth. Each solution is built with a strong focus on scalability, security, performance, and long-term business value."
      />

      {/* 04. Industries We Transform */}
      <IndustriesSection />

      {/*  */}

      {/* 05. Consultation CTA */}
      <ConsultationCTA
        theme="white"
        title="Predict outcomes and automate your business with AI"
        subtitle="Consult our AI experts to identify how machine learning, natural language processing, and advanced analytics can drive real value for your organization."
        imageSrc="/images/cta/cta-img.png"
        href="/contact"
      />




      {/* 06. Our Expertise in AI Development */}
      <section id="expertise" className="bg-gradient-to-br from-white to-sky-100 backdrop-blur-sm overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
          <CommonTitle
            align="center"
            title="Our Expertise in"
            gradientText="AI Development"
            subtitle="Strong expertise across advanced AI technologies enables the development of intelligent systems that solve real business challenges."
          />

          <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px] mt-16 lg:mt-24">
            {[
              {
                title: "Machine Learning (ML)",
                desc: "Harness the power of data with custom ML models. From predictive analytics to pattern recognition, we build systems that learn and adapt to your unique business needs.",
                img: "/images/ai/ml-expertise.png",
              },
              {
                title: "Deep Learning",
                desc: "Leverage neural networks for complex tasks. Our deep learning solutions power advanced applications like speech recognition and autonomous decision-making systems.",
                img: "/images/ai/deep-learning-expertise.png",
              },
              {
                title: "Natural Language Processing (NLP)",
                desc: "Enable machines to understand human language. We develop AI that processes, analyzes, and generates text for chatbots, sentiment analysis, and translation.",
                img: "/images/ai/nlp-expertise.png",
              },
              {
                title: "Computer Vision",
                desc: "Give your systems the ability to see. Our vision AI identifies objects, detects anomalies, and extracts information from images and video streams in real-time.",
                img: "/images/ai/computer-vision-expertise.png",
              },
              {
                title: "Generative AI",
                desc: "Unlock creativity with generative models. We build AI that creates content, code, and designs, helping businesses automate creative workflows and drive innovation.",
                img: "/images/ai/generative-ai-expertise.png",
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`relative overflow-hidden rounded-[32px] cursor-pointer transition-all duration-700 ease-in-out h-[400px] lg:h-full ${activeIndex === idx ? "lg:flex-[2.5]" : "lg:flex-1"
                  }`}
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className={`object-cover transition-transform duration-1000 ${activeIndex === idx ? "scale-110" : "scale-100"
                    }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end">
                  <h3 className={`text-2xl md:text-3xl font-bold text-white mb-4 transition-colors duration-300 ${activeIndex === idx ? "text-sky-400" : "text-white"
                    }`}>
                    {item.title}
                  </h3>

                  <div className={`overflow-hidden transition-all duration-700 ${activeIndex === idx ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                    }`}>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* 07. Why AI Development? */}
      <section id="why-invest" className="bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left: Sticky Title & Info */}
            <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit z-10">
              <CommonTitle
                align="left"
                title="Why"
                gradientText="AI Development?"
                subtitle="AI investment delivers long-term strategic benefits that strengthen performance and growth."
              />
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-3 bg-white text-black border border-slate-200 rounded-full font-bold text-sm hover:bg-slate-50 transition-all shadow-sm"
                >
                  <span>Start Growing Today</span>
                  <FaArrowRight className="ml-2 w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Right: Benefit Cards (STACKING/CLIMBING) */}
            <div className="lg:w-2/3 space-y-8">
              {[
                {
                  title: "Faster Decision-Making",
                  desc: "Real-time data analysis simplifies quicker, smarter business decisions.",
                  icon: <svg className="w-8 h-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H9a1 1 0 01-1-1v-4z" /></svg>
                },
                {
                  title: "Increased Operational Efficiency",
                  desc: "Automation reduces manual work and improves overall productivity.",
                  icon: <svg className="w-8 h-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                },
                {
                  title: "Reduced Human Errors",
                  desc: "AI-driven automation minimizes the risk by following strict data-driven logic.",
                  icon: <svg className="w-8 h-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                },
                {
                  title: "Cost Optimization",
                  desc: "Streamlined processes help lower operational and resource costs.",
                  icon: <svg className="w-8 h-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                },
                {
                  title: "24/7 Intelligent Systems",
                  desc: "AI-powered solutions work continuously without downtime.",
                  icon: <svg className="w-8 h-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                },
                {
                  title: "Improved Customer Insights",
                  desc: "Advanced analytics provide deeper understanding of customer behavior and preferences.",
                  icon: <svg className="w-8 h-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                },
                {
                  title: "Greater Business Scalability",
                  desc: "With a few lines of code, your business can compete city-wide or regionally with a software experience unique to your brand.",
                  icon: <svg className="w-8 h-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                },
                {
                  title: "Actionable Data Insights",
                  desc: "Access powerful analytics on demand patterns and behavior. Use this data to optimize pricing and marketing for maximum ROI.",
                  icon: <svg className="w-8 h-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                }
              ].map((card, idx) => (
                <div key={idx} style={{ zIndex: idx + 1 }} className="sticky top-40">
                  <motion.div
                    className="border border-sky-100 rounded-2xl p-6 bg-white hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="mb-6">{card.icon}</div>
                    <h3 className="text-xl font-bold text-black mb-4">
                      • {card.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                      {card.desc}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* 08. AI Development Process */}
      <section id="process" className="bg-gradient-to-br from-white to-sky-100 backdrop-blur-sm overflow-hidden w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16 w-full">
          <CommonTitle
            align="center"
            title="AI Development"
            gradientText="Process"
            subtitle="We follow a structured, transparent, and results-driven AI development approach:"
          />

          <div className="flex flex-col lg:flex-row mt-10 md:mt-16 lg:mt-24 items-center w-full">
            {/* Left: Steps Selection Panel */}
            <motion.div
              className="w-full lg:w-[450px] bg-[#e3f6fe] rounded-[24px] lg:rounded-[32px] p-4 sm:p-6 lg:p-10 relative shadow-xl border border-sky-100 z-10 lg:-mr-20 mb-6 lg:mb-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >

              {/* Responsive Tabs: Horizontal Scroll on Mobile, Vertical on Desktop */}
              <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-3 lg:gap-4 pb-2 lg:pb-0 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full">
                {[
                  "Discovery & Consultation",
                  "Data Strategy & Preparation",
                  "Model Design & Development",
                  "Integration & Deployment",
                  "Monitoring & Continuous Improvement"
                ].map((step, idx) => (
                  <button
                    key={idx}
                    onMouseEnter={() => setActiveProcess(idx)}
                    onClick={() => setActiveProcess(idx)} // Mobile fallback
                    className={`flex-shrink-0 snap-start w-[260px] sm:w-[300px] lg:w-full text-left px-5 lg:px-6 py-4 rounded-xl transition-all duration-300 font-bold flex items-center gap-3 ${activeProcess === idx
                      ? "bg-[#38bdf8] text-white shadow-lg shadow-sky-200"
                      : "text-[#1e293b] hover:bg-white/50 bg-white/40 lg:bg-transparent"
                      }`}
                  >
                    <span className="opacity-70 text-sm">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                    <span className="text-sm md:text-base leading-snug whitespace-normal">{step}</span>
                  </button>
                ))}
              </div>

              {/* Decorative side bar */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 w-1.5 h-32 bg-[#020617] rounded-full hidden lg:block opacity-80" />
            </motion.div>

            {/* Right: Active Step Detail Panel */}
            <motion.div
              className="flex-1 w-full lg:pl-16"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              key={activeProcess}
            >
              <div className="bg-[#38bdf8] rounded-[24px] lg:rounded-[32px] p-6 sm:p-8 lg:p-16 lg:pl-24 h-full min-h-[280px] md:min-h-[350px] lg:min-h-[450px] flex flex-col justify-center text-white shadow-2xl shadow-sky-200/50">
                <motion.h3
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 leading-normal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {[
                    "Discovery & Consultation",
                    "Data Strategy & Preparation",
                    "Model Design & Development",
                    "Integration & Deployment",
                    "Monitoring & Continuous Improvement"
                  ][activeProcess]}
                </motion.h3>
                <motion.p
                  className="text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed opacity-95"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {[
                    "We understand your business challenges, goals, and technical requirements to build a solid foundation for your AI initiative.",
                    "Our team handles data collection, rigorous cleaning, and complex transformation to ensure your AI models are trained on high-quality information.",
                    "We design and optimize custom AI algorithms and neural networks specifically tailored to solve your unique business problems.",
                    "We ensure seamless integration of robust AI models into your existing production environments with minimal disruption.",
                    "Our engagement continues with ongoing performance tracking, proactive optimization, and continuous model refinement for long-term success."
                  ][activeProcess]}
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* 09. Our AI Projects */}
      <section id="projects" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
          <CommonTitle
            align="center"
            title="Our AI"
            gradientText="Projects"
            subtitle="We have delivered AI-powered enterprise solutions that improved workflow automation, predictive analytics, and operational transparency."
          />

          <div className="mt-16 lg:mt-24 flex flex-col xl:flex-row gap-12 items-top">
            {/* Left: Project Details */}
            <div className="flex-1 space-y-8">
              <div className='p-3 bg-sky-50 rounded-[24px] space-y-8'>
                {/* Challenge Card */}
                <motion.div
                  className="bg-[#38bdf8] rounded-[24px] p-8 lg:p-10 text-white shadow-xl shadow-sky-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold mb-4">Challenge</h3>
                  <p className="text-sm lg:text-md font-medium leading-relaxed opacity-95">
                    With a talented team, Softkingo has the best Front end developers capable of providing the most intuitive user interfaces and interactive user experience.
                  </p>
                </motion.div>

                {/* Agile & Impact Grid */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-xl font-bold text-black mb-6">Agile Approach</h4>
                    <ul className="space-y-4">
                      {[
                        "Agile development methodology",
                        "Scalable architecture",
                        "Secure data handling"
                      ].map((item, idx) => (
                        <li key={idx} className="flex font-bold items-center gap-3 text-slate-700">
                          <span className="text-sky-500 text-sm">0{idx + 1}</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-xl font-bold text-black mb-6">Impact/Outcome</h4>
                    <ul className="space-y-4">
                      {[
                        "Improved operational efficiency",
                        "Enhanced user engagement",
                        "Data-driven decision making"
                      ].map((item, idx) => (
                        <li key={idx} className="flex font-bold items-center gap-3 text-slate-700">
                          <span className="text-sky-500 text-sm">0{idx + 1}</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
              {/* View Case Study Button */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-3.5 bg-[#38bdf8] text-white rounded-full font-bold text-sm hover:bg-sky-500 transition-all shadow-lg shadow-sky-100"
                >
                  <span>View Case Study</span>
                </Link>
              </motion.div>
            </div>

            {/* Right: Laptop Mockup */}
            <motion.div
              className="lg:w-[450px] "
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative group">
                <Image
                  src="/images/ai/ai-project-mockup.png"
                  alt="AI Project Dashboard"
                  width={800}
                  height={600}
                  className="w-full h-auto drop-shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 10. Ai Powered Solutions */}
      <section id="solutions" className="bg-gradient-to-br from-white to-sky-100 backdrop-blur-sm text-black overflow-hidden w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16 w-full">
          <CommonTitle
            align="center"
            title="Ai Powered Solutions"
            gradientText="for Your Business"
            subtitle="Intelligent mobile and web applications powered by AI help businesses improve efficiency, enhance customer experience, and accelerate growth"
          />

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-stretch mt-10 md:mt-16 w-full">

            {/* Left: Solutions Grid (Mobile: Horizontal Scroll, Desktop: 2-Col Grid) */}
            <div className="lg:w-1/2 flex overflow-x-auto md:grid md:grid-cols-2 gap-3 sm:gap-4 pb-4 md:pb-0 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full">
              {[
                { title: "AI Chatbot & Virtual Assistant Development", icon: <FaRobot /> },
                { title: "AI-Based Recommendation System", icon: <FaBrain /> },
                { title: "Smart CRM & ERP Integration", icon: <FaDatabase /> },
                { title: "AI-Powered E-commerce Solutions", icon: <FaShoppingCart /> },
                { title: "Automation & Workflow Optimization", icon: <FaMagic /> },
                { title: "AI-Driven Customer Insights", icon: <FaChartLine /> }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  onMouseEnter={() => setActiveAiSolution(idx)}
                  onClick={() => setActiveAiSolution(idx)} // Mobile touch support
                  className={`flex-shrink-0 snap-start w-[240px] sm:w-[280px] md:w-auto p-4 md:p-6 lg:p-8 rounded-[20px] md:rounded-[24px] transition-all duration-300 cursor-pointer flex flex-col gap-3 md:gap-4 border border-sky-100/50 ${activeAiSolution === idx
                    ? "bg-white text-black shadow-xl shadow-sky-200/50 border-sky-300"
                    : "bg-white/40 backdrop-blur-md text-slate-600 hover:bg-white/60"
                    }`}
                  initial={{ opacity: 0, scale: 0.8, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className={`text-xl md:text-2xl ${activeAiSolution === idx ? "text-[#38bdf8]" : "text-slate-400 opacity-80"}`}>
                    {item.icon}
                  </div>
                  <h3 className={`text-xs sm:text-sm md:text-base font-bold leading-snug whitespace-normal ${activeAiSolution === idx ? "text-black" : "text-slate-600"}`}>
                    {item.title}
                  </h3>
                </motion.div>
              ))}
            </div>

            {/* Middle: Vertical Divider (Hidden on Mobile/Tablet) */}
            <div className="hidden lg:block w-px bg-slate-200 self-stretch my-4" />

            {/* Right: Detail Panel */}
            <motion.div
              className="lg:w-1/2 flex flex-col justify-center w-full mt-4 lg:mt-0"
              key={activeAiSolution}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {(() => {
                const solutionsData = [
                  {
                    title: "AI App Development",
                    desc: "Smart conversational systems that handle customer queries, provide instant responses, and improve engagement",
                    features: ["24/7 support", "Multilingual capability", "CRM integration", "Context-aware responses"]
                  },
                  {
                    title: "Custom Recommendations",
                    desc: "Increase conversion rates by providing users with hyper-personalized content and product suggestions based on behavior.",
                    features: ["Behavioral analysis", "Real-time personalization", "Increased AOV", "Higher retention"]
                  },
                  {
                    title: "Enterprise AI Integration",
                    desc: "Modernize your existing workflows by embedding AI intelligence into your core business systems and processes.",
                    features: ["Unified data access", "Automated entry", "Predictive maintenance", "Seamless compatibility"]
                  },
                  {
                    title: "Smart E-commerce",
                    desc: "Optimization of every stage of the buyer journey, from discovery to checkout, using AI-driven tools.",
                    features: ["Visual search", "Price optimization", "Inventory prediction", "Fraud protection"]
                  },
                  {
                    title: "Workflow Automation",
                    desc: "Eliminate repetitive tasks and streamline operations so your team can focus on what truly matters.",
                    features: ["RPA solutions", "Logic optimization", "Accuracy improvement", "Speed boost"]
                  },
                  {
                    title: "Customer Intelligence",
                    desc: "Turn raw data into actionable insights to understand your audience better and predict future trends.",
                    features: ["Sentiment analysis", "Churn prediction", "Market segmentation", "Lifetime value growth"]
                  }
                ];
                const data = solutionsData[activeAiSolution] || solutionsData[0];
                return (
                  <div className="bg-white/50 lg:bg-transparent p-5 sm:p-6 lg:p-0 rounded-[20px] border border-sky-50 lg:border-transparent">
                    {/* Responsive Fonts: Smaller on mobile, larger on desktop */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4 lg:mb-8 leading-snug md:leading-normal text-black break-words">
                      {data?.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-slate-700 mb-6 lg:mb-12 leading-relaxed break-words">
                      {data?.desc}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                      {(data?.features || []).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-sm sm:text-base md:text-lg font-bold text-slate-800">
                          <FaCheck className="text-sky-500 text-xs sm:text-sm mt-1 sm:mt-1.5 flex-shrink-0" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}
            </motion.div>

          </div>
        </div>
      </section>



      {/* 11. AI Capability Models */}
      <section id="capabilities" className="bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
          <CommonTitle
            align="center"
            title="Advanced AI"
            gradientText="Capabilities"
            subtitle="Explore our range of intelligent models designed to solve complex business challenges with precision and scale."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Automating Manual Tasks",
                desc: "Intelligent models that reduce repetitive work by automating routine business processes.",
                image: "/images/ai/models/automating-tasks-bg.svg"
              },
              {
                title: "Image & Data Labeling",
                desc: "AI-powered systems that accurately classify and organize large volumes of visual and structured data.",
                image: "/images/ai/models/data-labeling-bg.svg"
              },
              {
                title: "Motion Analysis",
                desc: "Smart models that detect and analyze human movements for applications in healthcare, security, and fitness.",
                image: "/images/ai/models/motion-analysis-bg.svg"
              },
              {
                title: "Object Detection",
                desc: "Computer vision models that identify and track objects in images and video streams.",
                image: "/images/ai/models/object-detection-bg.svg"
              },
              {
                title: "Speech Recognition",
                desc: "Voice-enabled AI systems that convert spoken language into accurate text for automation and virtual assistants.",
                image: "/images/ai/models/speech-recognition-bg.svg"
              },
              {
                title: "Fraud Detection",
                desc: "Predictive models that identify suspicious patterns and prevent financial or transactional fraud.",
                image: "/images/ai/models/fraud-detection-bg.svg"
              },
              {
                title: "Predictive Analytics",
                desc: "Data-driven models that forecast trends, demand, and future outcomes to support strategic planning.",
                image: "/images/ai/models/predictive-analytics-bg.svg"
              },
              {
                title: "Sentiment Analysis",
                desc: "NLP-based systems that analyze customer feedback, reviews, and social media to understand emotions and opinions.",
                image: "/images/ai/models/sentiment-analysis-bg.svg"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="group relative h-[450px] rounded-[32px] overflow-hidden cursor-pointer shadow-2xl"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: "backOut" }}
                viewport={{ once: true }}
              >
                {/* Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-2 h-2 rounded-full bg-sky-400 group-hover:scale-150 transition-transform duration-300" />
                      <h3 className="text-xl md:text-2xl font-bold leading-normal group-hover:text-sky-300 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base font-medium text-gray-200 leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* 12. Why Choose Us */}
      <section id="why-us" className="py-8 md:py-16 bg-gradient-to-br from-white to-sky-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-16">
            {/* Left Column: Title & Intro */}
            <div className="lg:w-2/5 lg:sticky lg:top-32 h-fit z-10">
              <CommonTitle
                align="left"
                title="Why Choose Softkingo"
                gradientText="for AI Development"
                subtitle="Choosing the right AI partner is about more than just technical skills. It's about finding a team that understands your vision, values transparency, and focuses on delivering real business impact."
              />
            </div>

            {/* Right Column: Detailed List */}
            <div className="lg:w-3/5 space-y-8">
              {[
                {
                  title: "Expert AI Talent",
                  desc: "A dedicated team of experienced AI engineers, data scientists, and developers works behind every solution. Strong technical expertise combined with practical industry knowledge ensures reliable and high-performing AI systems.",
                  icon: <FaUserTie />
                },
                {
                  title: "Comprehensive AI Strategy",
                  desc: "AI success requires more than development—it requires direction. Every solution is built around a long-term strategy that aligns with business goals, growth plans, and measurable outcomes.",
                  icon: <FaChess />
                },
                {
                  title: "Scalable & Secure Solutions",
                  desc: "Future-ready architecture ensures that AI systems grow as your business grows. Strong security standards and best practices protect data while maintaining performance and scalability.",
                  icon: <FaShieldAlt />
                },
                {
                  title: "Transparent Communication",
                  desc: "Clear communication, regular updates, and milestone tracking keep every project aligned and on schedule. Complete visibility ensures confidence at every stage of development.",
                  icon: <FaComments />
                },
                {
                  title: "Post-Deployment Support",
                  desc: "Deployment is just the beginning. Continuous monitoring, optimization, and dedicated support ensure AI systems remain efficient, accurate, and up to date as business needs evolve.",
                  icon: <FaHeadset />
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex gap-6 lg:gap-8 group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-[18px] bg-sky-50 flex items-center justify-center text-2xl lg:text-3xl text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl lg:text-2xl font-bold text-black">
                      {item.title}
                    </h3>
                    <p className="text-sm lg:text-base font-medium text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*  */}

      {/* 13. Latest App Projects */}
      {/* <DynamicPortfolioCard
        category="Fitnes app"
        portfolioType="app"
        title="Latest App Projects"
        subtitle="Our newest mobile applications"
      /> */}
      {/*  */}



      {/* 14. Technology Stack - RESTORED SIDEBAR + IMAGE GRID */}
      <section id="stack" className="py-8 md:py-16 bg-gradient-to-br from-white to-sky-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommonTitle
            align="center"
            title="Our"
            gradientText="Technology Stack"
            subtitle="Modern, proven AI technologies powering intelligent solutions"
          />

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mt-10 items-start">
            {/* Sidebar (Restored Layout + Hover/Mobile Scroll) */}
            <aside className="w-full lg:w-72 shrink-0 bg-gradient-to-tl from-sky-400 via-sky-600 to-sky-500 rounded-lg md:rounded-2xl p-2 lg:p-6 lg:sticky lg:top-32 h-fit shadow-xl shadow-sky-600/20">
              {/* <h4 className="text-xs font-bold text-sky-100 uppercase tracking-widest mb-6 px-4 hidden lg:block">Categories</h4> */}

              {/* Horizontal Scroll for Mobile */}
              <div
                ref={techNavRef}
                className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible hide-scrollbar whitespace-nowrap lg:whitespace-normal"
              >
                {['Frameworks', 'Languages', 'Cloud & DevOps', 'Data & Databases'].map((item) => (
                  <button
                    key={item}
                    onMouseEnter={() => {
                      setActiveSolution(item);
                    }}
                    onClick={() => {
                      setActiveSolution(item);
                      // Sync mobile scroll
                      const btn = document.getElementById(`tech-nav-${item}`);
                      if (btn && techNavRef.current) {
                        techNavRef.current.scrollTo({
                          left: btn.offsetLeft - (techNavRef.current.offsetWidth / 2) + (btn.offsetWidth / 2),
                          behavior: 'smooth'
                        });
                      }
                    }}
                    id={`tech-nav-${item}`}
                    className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full cursor-pointer transition-all text-xs lg:text-sm font-bold shrink-0 lg:w-full text-left ${(activeSolution === item)
                      ? 'bg-white shadow-lg text-sky-600 scale-105'
                      : 'text-sky-50 hover:bg-white/10'
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </aside>

            {/* Tech Grid (Restored Layout with Images) */}
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-8 text-sky-900 flex items-center gap-4">
                {activeSolution || 'Frameworks'}
                <div className="h-1 flex-1 bg-gradient-to-r from-sky-500 to-transparent rounded-full opacity-20" />
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
                {(
                  activeSolution === 'Languages' ? [
                    { name: 'Python', img: '/images/tech/Python.png' },
                    { name: 'R', img: '/images/tech/Express.png' },
                    { name: 'C++', img: '/images/tech/C++-(CPlusPlus).png' },
                    { name: 'Java', img: '/images/tech/Java.png' }
                  ] : activeSolution === 'Cloud & DevOps' ? [
                    { name: 'AWS', img: '/images/tech/AWS.png' },
                    { name: 'Azure', img: '/images/tech/Azure.png' },
                    { name: 'GCP', img: '/images/tech/Google-Cloud.png' },
                    { name: 'Docker', img: '/images/tech/Docker.png' },
                    { name: 'Kubernetes', img: '/images/tech/Kubernetes.png' },
                    { name: 'Terraform', img: '/images/tech/HashiCorp-Terraform.png' }
                  ] : activeSolution === 'Data & Databases' ? [
                    { name: 'Kafka', img: '/images/tech/Apache-Kafka.png' },
                    { name: 'PostgreSQL', img: '/images/tech/postgresql.png' },
                    { name: 'MongoDB', img: '/images/tech/MongoDB.png' },
                    { name: 'Redis', img: '/images/tech/Redis.png' },
                    { name: 'Snowflake', img: '/images/tech/Sanity.png' }
                  ] : [
                    { name: 'TensorFlow', img: '/images/tech/TensorFlow.png' },
                    { name: 'PyTorch', img: '/images/tech/PyTorch.png' },
                    { name: 'Scikit-learn', img: '/images/tech/scikit-learn.png' },
                    { name: 'OpenCV', img: '/images/tech/OpenCV.png' },
                    { name: 'Keras', img: '/images/tech/Vite.png' },
                    { name: 'LangChain', img: '/images/tech/Next.js.png' }
                  ]
                ).map((tech, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white hover:bg-sky-50 rounded-[24px] p-6 flex flex-col items-center justify-center border border-sky-100/50 shadow-sm hover:shadow-2xl hover:shadow-sky-200/50 transition-all duration-500 cursor-pointer group hover:-translate-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative w-16 h-16 md:w-20 md:h-20 mb-4 transition-transform group-hover:scale-110 duration-500">
                      <Image
                        src={tech.img}
                        alt={tech.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-800 text-center tracking-tight">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 15. AI FAQ Section */}
      <FAQAccordion
        data={{
          title: "AI Development",
          gradientText: "FAQ",
          subtitle: "Explore common questions about our AI solutions, implementation timeline, and data security.",
          items: [
            {
              id: 1,
              q: "What types of AI solutions can Softkingo build for my business?",
              a: "We specialize in a wide range of AI solutions including Custom Machine Learning Models, Generative AI (LLMs), AI Chatbots & Virtual Assistants, Predictive Analytics, Computer Vision (Object Detection), and Automated Workflow Systems tailored to your industry."
            },
            {
              id: 2,
              q: "How long does a typical AI development project take?",
              a: "The timeline varies by complexity. A Proof of Concept (PoC) takes 4-6 weeks, while a full-scale enterprise AI integration typically ranges from 3 to 6 months. We follow an Agile approach to deliver value in incremental phases."
            },
            {
              id: 3,
              q: "Can you integrate AI with our existing software and legacy systems?",
              a: "Yes, absolutely. We design AI solutions with integration in mind. Using custom APIs, middleware, and secure connectors, we embed AI capabilities directly into your existing CRM, ERP, or proprietary software without requiring a complete system overhaul."
            },
            {
              id: 4,
              q: "What kind of data do I need to provide for AI training?",
              a: "Quality data is the fuel for AI. Depending on the project, you might need historical transaction records, customer logs, images, or sensor data. If your data is unorganized, our experts can provide data strategy and engineering services to get it AI-ready."
            },
            {
              id: 5,
              q: "How do you ensure the accuracy and reliability of AI models?",
              a: "We implement rigorous validation frameworks. This includes using high-quality training sets, continuous testing with real-world scenarios, human-in-the-loop verification, and advanced techniques like RAG (Retrieval-Augmented Generation) to ensure high reliability."
            },
            {
              id: 6,
              q: "Is my sensitive business data secure during AI development?",
              a: "Data security is our top priority. We sign NDAs for every project and use secure, encrypted environments for data processing. We comply with industry best practices, ensuring your intellectual property and user data remain protected throughout the project."
            }
          ]
        }}
      />

      <BlogSection
        category=""
        title="Latest AI Insights"
        subtitle="Fresh perspectives from our AI engineering team"
      />
      <InquirySection />
      <PopupQuoteModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
