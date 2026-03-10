'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import CommonTitle from '@/components/ui/CommonTitle';
import InquirySection from '@/components/footer/InquirySection';
import BlogSection from '@/components/common/BlogSection';
import LeadForm from '@/components/public/LeadForm';
import HireDevelopersPage from '../hire/[slug]/SelectDeveloper';
import DynamicPortfolioCard from '@/components/ui/DynamicPortfolioCard';
import ConsultationCTA from '@/components/common/Consultation-Cta';
import CoreServicesSection from '@/components/common/CoreServicesSection';
import IndustriesSection from '@/components/common/IndustriesSection';


export default function AIPage() {
  const [inView, setInView] = useState({});

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
      <style jsx>{`
        @keyframes float-subtle {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.01); }
        }
        @keyframes metric-rise {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .metric-container.animate {
          animation: metric-rise 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .section-divider {
          background: linear-gradient(135deg, transparent 0%, #0ea5e9 40%, #0284c7 60%, transparent 100%);
          height: 2px;
          width: 120px;
          margin: 4rem auto;
          border-radius: 1px;
          box-shadow: 0 1px 4px rgba(14, 165, 233, 0.3);
        }
        .rect-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #0ea5e9, #0284c7);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);
          transition: all 0.3s ease;
        }
        .rect-icon:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 12px 35px rgba(14, 165, 233, 0.4);
        }
      `}</style>

      {/* 01. Hero Section - REDESIGNED FOR IMMERSIVE FEEL */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24">
        {/* Full Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/ai/ai-hero-bg.png"
            alt="AI Hero Background"
            fill
            className="object-cover object-center scale-105"
            priority
          />

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white tracking-tight">
              AI Development Services
            </h1>

            <div className="max-w-3xl space-y-5 mb-10">
              <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-medium">
                At Softkingo Technologies, we design and develop intelligent AI solutions that help businesses automate processes, reduce operational costs, and unlock new growth opportunities.
              </p>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                Our AI development services are tailored to your industry, data, and business objectives—ensuring practical implementation with measurable impact. From AI-powered applications to advanced analytics and automation systems, we help you transform ideas into scalable AI products.
              </p>
            </div>

            <Link
              href="/contact"
              className="group relative px-10 py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-sky-500/40 overflow-hidden flex items-center gap-3"
            >
              <span>Consult Our AI Experts</span>
              <FaArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* 02. We Are Section - PIXEL PERFECT MATCH */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Left: Image - Clean & Simple */}
            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-[16/9] w-full rounded-[32px] overflow-hidden shadow-2xl">
                <Image
                  src="/images/ai/we-are.svg"
                  alt="Handshake - We are Softkingo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* Right: Content - Custom Title with Logo */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 flex flex-col items-start">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-black leading-tight">
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

              <div className="space-y-4">
                <p className="text-base md:text-lg text-slate-800 leading-relaxed font-normal">
                  We are a technology-driven company focused on building innovative digital products that create real business value. With strong expertise in AI, mobile apps, web development, and enterprise solutions, our team combines strategic thinking with technical excellence.
                </p>
                <p className="text-base md:text-lg text-slate-800 leading-relaxed font-normal">
                  Our mission is simple: deliver scalable, secure, and performance-driven AI solutions that give our clients a competitive edge in the global market.
                </p>
              </div>
            </motion.div>
          </div>

          {/* 02.5 Stats Section - Pixel Perfect Mockup Layout */}
          <div className="mt-20 lg:mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {[
              { icon: 'clock', value: '5+', label: 'Years Of Experience' },
              { icon: 'users', value: '450+', label: 'Apps Developed' },
              { icon: 'layout', value: '50+', label: 'Mobile Apps Developer' },
              { icon: 'globe', value: '400+', label: 'Clients Worldwide' }
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
                    {stat.icon === 'clock' && <svg className="w-7 h-7 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" /></svg>}
                    {stat.icon === 'users' && <svg className="w-7 h-7 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>}
                    {stat.icon === 'layout' && <svg className="w-7 h-7 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z" /></svg>}
                    {stat.icon === 'globe' && <svg className="w-7 h-7 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>}
                  </div>
                  <span className="text-3xl md:text-4xl font-black text-[#0ea5e9] tracking-tight">
                    {stat.value}
                  </span>
                </div>
                {/* Bottom Label */}
                <div className="text-sky-400 font-bold text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* 03. Core Services Section */}
      <CoreServicesSection
        title="Our Core Services"
        subtitle="End-to-end AI development services designed to solve real business problems and create measurable growth. Each solution is built with a strong focus on scalability, security, performance, and long-term business value."
        bgClass="bg-[#f8faff]"
        sectionId="ai-core-services"
      />

      {/* 04. Industries We Transform using Default AI Data */}
      <IndustriesSection />

      <div className="section-divider" />

      {/* 05. Our Process */}
      <section id="process" className="py-20 lg:py-28 bg-gradient-to-r from-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommonTitle
            align="center"
            title="Our Process"
            gradientText="Proven Approach"
            subtitle="6-step transparent methodology from discovery to optimization"
          />

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-16 lg:mt-24">
            {[
              { num: '01', title: 'Discovery & Analysis', desc: 'Understand your business, challenges, data, and objectives' },
              { num: '02', title: 'Strategy & Design', desc: 'Define best AI approach, architecture, success metrics' },
              { num: '03', title: 'Development & Training', desc: 'Build and train AI models using best practices' },
              { num: '04', title: 'Testing & Validation', desc: 'Rigorous testing for accuracy, reliability, security' },
              { num: '05', title: 'Deployment & Integration', desc: 'Seamless deployment into your existing workflow' },
              { num: '06', title: 'Support & Optimization', desc: 'Continuous monitoring and performance improvement' }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                className="group text-center p-8 lg:p-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-sky-500 to-sky-600 text-white text-2xl font-bold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-all">{step.num}</div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* 06. Why Choose Us */}
      <section id="why-us" className="py-20 lg:py-28 bg-gradient-to-br from-sky-50 to-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommonTitle
            align="center"
            title="Why"
            gradientText="Choose Us"
            subtitle="Business-focused AI delivery with experienced professionals"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16 lg:mt-24">
            {[
              { title: 'Business-Focused AI', desc: 'Prioritize real business outcomes, not just technology', iconText: 'BF' },
              { title: 'Experienced Professionals', desc: 'Data scientists, AI engineers, industry experts', iconText: 'EP' },
              { title: 'Ethical & Responsible AI', desc: 'Fairness, transparency, data privacy ensured', iconText: 'ETHICS' },
              { title: 'Scalable Architecture', desc: 'AI systems grow as your business grows', iconText: 'SCALE' },
              { title: 'Clear Communication', desc: 'Complex AI concepts in simple terms', iconText: 'TALK' }
            ].map((reason, idx) => (
              <motion.div
                key={idx}
                className="group p-8 lg:p-10 bg-white rounded-2xl border border-gray-100 hover:border-sky-300/60 hover:shadow-xl hover:shadow-sky-200/20 hover:-translate-y-2 transition-all duration-500 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="rect-icon text-white mb-6 group-hover:scale-110 transition-all duration-300 mx-auto">{reason.iconText}</div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 leading-tight">{reason.title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed text-sm lg:text-base">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <DynamicPortfolioCard
        category="Fitnes app"
        portfolioType="app"
        title="Latest App Projects"
        subtitle="Our newest mobile applications"
      />
      <div className="section-divider" />

      {/* 04. Industries */}
      <section id="industries" className="py-20 lg:py-28 bg-white hidden ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommonTitle
            align="center"
            title="Industries"
            gradientText="We Serve"
            subtitle="Healthcare, Banking, Insurance, E-Commerce, Manufacturing, and 6+ more"
          />

          <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16 lg:mt-24">
            {[
              { title: 'Healthcare', desc: 'Faster diagnosis, predictive analytics, intelligent automation, data privacy compliance', iconText: 'HC' },
              { title: 'Banking & Finance', desc: 'Risk reduction, fraud detection, smarter decisions with AI analytics', iconText: 'BF' },
              { title: 'Insurance', desc: 'Claims processing, risk assessment, improved customer support efficiency', iconText: 'INS' },
              { title: 'E-Commerce & Retail', desc: 'Personalized recommendations, demand forecasting, inventory management', iconText: 'EC' },
              { title: 'Manufacturing', desc: 'Production optimization, predictive maintenance, quality control', iconText: 'MF' },
              { title: 'Logistics & Supply Chain', desc: 'Route optimization, demand prediction, real-time tracking', iconText: 'LS' },
              { title: 'Education', desc: 'Personalized learning, automated administration, data insights', iconText: 'EDU' },
              { title: 'Real Estate', desc: 'Property valuation, market analysis, lead management', iconText: 'RE' },
              { title: 'Marketing & Advertising', desc: 'Targeted campaigns, customer segmentation, performance optimization', iconText: 'MKT' },
              { title: 'Telecommunications', desc: 'Network optimization, customer support automation, predictive maintenance', iconText: 'TEL' }
            ].map((industry, idx) => (
              <motion.div
                key={idx}
                className="group p-8 lg:p-10 bg-slate-50 rounded-2xl border border-gray-100 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100/50 hover:-translate-y-2 transition-all duration-500 text-center cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="rect-icon text-white mb-6 group-hover:scale-110 transition-all duration-300 mx-auto">{industry.iconText}</div>
                <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-3">{industry.title}</h4>
                <p className="text-gray-600 text-sm">{industry.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </section>
      <HireDevelopersPage />
      <div className="section-divider" />

      <ConsultationCTA imageSrc="/images/cta/cta-img.png" href="/contact" />
      <div className="section-divider" />

      {/* 07. Technology Stack */}
      <section id="stack" className="py-20 lg:py-28 bg-gradient-to-br from-white to-sky-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommonTitle
            align="center"
            title="Our"
            gradientText="Technology Stack"
            subtitle="Modern, proven AI technologies powering intelligent solutions"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-6 mt-16 lg:mt-24">
            {[
              'Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV',
              'LLMs', 'AWS', 'Azure', 'Google Cloud', 'Kafka', 'PostgreSQL'
            ].map((tech, idx) => (
              <motion.div
                key={idx}
                className="group p-6 lg:p-8 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100/50 hover:bg-sky-50 hover:shadow-md hover:shadow-sky-100/40 hover:-translate-y-1.5 transition-all duration-400 text-center cursor-default"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                viewport={{ once: true }}
              >
                <div className="text-md lg:text-lg xl:text-xl font-bold text-gray-900 mb-2 leading-tight">
                  {tech}
                </div>
                <div className="h-px w-12 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full mx-auto opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 origin-center transition-all duration-400" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />
      {/* 08. FAQ */}
      <section id="faq" className="py-20 lg:py-28 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommonTitle
            align="center"
            title="Frequently"
            gradientText="Asked Questions"
            subtitle="Everything you need to know about implementing AI solutions"
          />

          <div className="space-y-4 mt-16 lg:mt-24">
            {[
              { q: "What types of businesses can use AI?", a: "AI benefits businesses of all sizes—from startups to enterprises. Solutions based on your goals, industry, and data." },
              { q: "Do I need large data for AI?", a: "Not always. We work with limited datasets and recommend best approaches based on available data." },
              { q: "How long for AI implementation?", a: "Few weeks to months based on complexity with clear milestones provided from start." },
              { q: "Is AI expensive?", a: "Cost-effective solutions delivering measurable ROI and long-term value." },
              { q: "Will AI integrate with existing systems?", a: "Yes. Seamless integration with current software, platforms, and workflows." },
              { q: "Is my data secure?", a: "Strict security standards ensure data privacy, confidentiality, and compliance." },
              { q: "Ongoing support after deployment?", a: "Continuous monitoring, optimization, and support for peak performance." },
              { q: "Will AI replace employees?", a: "AI enhances human work, helping teams focus on higher-value tasks." },
              { q: "How do we get started?", a: "Free consultation to assess needs, discuss opportunities, recommend best approach." }
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                className="group bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl hover:shadow-indigo-100/50 hover:border-sky-300 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <h4 className="font-semibold text-gray-900 flex-1 pr-4">{faq.q}</h4>
                  <span className="text-2xl group-hover:rotate-45 transition-transform">+</span>
                </div>
                <p className="text-gray-600 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* 08. FAQ */}
      <section id="faq" className="hidden py-20 lg:py-28 bg-gradient-to-b from-white to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommonTitle
            align="center"
            title="Frequently"
            gradientText="Asked Questions"
            subtitle="Everything you need to know about AI implementation"
          />

          <div className="space-y-4 mt-16 lg:mt-24">
            {[
              { q: 'What types of businesses can use AI?', a: 'All sizes—from startups to enterprises. Solutions based on your goals, industry, and data.' },
              { q: 'Do I need large data for AI?', a: 'Not always. We work with limited datasets and recommend best approaches.' },
              { q: 'How long for AI implementation?', a: 'Few weeks to months based on complexity with clear milestones.' },
              { q: 'Is AI expensive?', a: 'Cost-effective solutions with measurable ROI and long-term value.' },
              { q: 'Will AI integrate with existing systems?', a: 'Seamless integration with current software and workflows.' },
              { q: 'Is my data secure?', a: 'Strict security standards ensure privacy, confidentiality, compliance.' },
              { q: 'Ongoing support after deployment?', a: 'Continuous monitoring, optimization, and support included.' },
              { q: 'Will AI replace employees?', a: 'AI enhances human work, focuses teams on higher-value tasks.' },
              { q: 'How do we get started?', a: 'Free consultation to assess needs and recommend best approach.' }
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                className="group bg-white backdrop-blur-sm rounded-2xl p-8 border border-gray-100/40 hover:border-sky-300/60 hover:shadow-xl hover:shadow-sky-200/20 hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="rect-icon text-white flex-shrink-0" style={{ fontSize: '20px' }}>Q</div>
                  <h4 className="font-semibold text-gray-900 flex-1 ml-4">{faq.q}</h4>
                </div>
                <p className="text-gray-600 ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 09. Final CTA */}
      <section id="cta" className="py-20 lg:py-28 bg-gradient-to-br from-sky-100 via-sky-200 to-sky-200 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CommonTitle
            align="center"
            title="Let's Build"
            gradientText="the Future Together"
            subtitle="AI should be practical, impactful, and aligned with your vision"
          />

          <motion.div
            className="max-w-lg mx-auto mt-12 lg:mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center px-6 lg:px-10 py-2.5 lg:py-3 bg-white text-sky-600 font-semibold text-xs lg:text-sm rounded-full shadow-xl hover:shadow-sky-500/40 hover:shadow-2xl hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-400 border border-sky-400/30 backdrop-blur-sm tracking-wide"
            >
              <span>Get In Touch Today</span>
              <FaArrowRight className="ml-2 lg:ml-3 group-hover:translate-x-1.5 transition-transform duration-400" />
            </Link>
          </motion.div>
        </div>
      </section>

      <BlogSection
        category=""
        title="Latest AI Insights"
        subtitle="Fresh perspectives from our AI engineering team"
      />
      <InquirySection />
    </>
  );
}
