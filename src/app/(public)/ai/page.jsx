'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import CommonTitle from '@/components/ui/CommonTitle';
import InquirySection from '@/components/footer/InquirySection';
import Blogs from '../home/blogs/BlogSliderClient';
import LeadForm from '@/components/public/LeadForm';
import HireDevelopersPage from '../hire/[slug]/SelectDeveloper';
import DynamicPortfolioCard from '@/components/ui/DynamicPortfolioCard';
import ConsultationCTA from '@/components/common/Consultation-Cta';


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

      {/* 01. Hero Section - EXACT CONTENT */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-700 via-sky-900 to-sky-600 py-20">
        <div className="absolute inset-0">
          <div className="absolute top-16 left-8 w-[300px] h-[300px] bg-sky-500/8 rounded-full blur-xl animate-[float-subtle_6s_ease-in-out_infinite]" style={{ animationDelay: '0s' }} />
          <div className="absolute bottom-24 right-12 w-[250px] h-[250px] bg-sky-400/6 rounded-full blur-xl animate-[float-subtle_6s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.15),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.6)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center relative z-10 w-full">
          <div className="w-full lg:flex lg:items-center lg:justify-between lg:gap-16">
            <motion.div
              className="lg:w-1/2 text-left lg:pr-12"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-sky-500/10 backdrop-blur-md rounded-xl border border-sky-400/30 shadow-lg mb-8 w-fit">
                <div className="w-3 h-3 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full mr-2 flex-shrink-0" />
                <span className="font-semibold text-sky-200 text-sm">Intelligent AI Solutions</span>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight mb-6 text-white tracking-tight">
                Intelligent AI Solutions for <br className="hidden md:block" />
                <span className="block bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-400 text-transparent bg-clip-text drop-shadow-xl">
                  Smarter Businesses
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 mb-4 leading-relaxed max-w-xl">
                Transforming Data Into Decisions. Automation Into Growth.
              </p>
              <p className="text-sm md:text-lg text-slate-300 mb-10 leading-relaxed max-w-xl">
                Artificial Intelligence is no longer a future concept—<span className="font-semibold text-white">it is a business necessity</span>. We help organizations unlock AI power with intelligent, scalable, ethical solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group px-4 md:px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300 items-center cursor-pointer inline-flex shrink-0 w-fit"
                >
                  Get Started
                  <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="hidden lg:block lg:w-1/2 relative mt-12 lg:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Video Background Container */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-sky-400/5 to-transparent rounded-xl backdrop-blur-lg  shadow-2xl overflow-hidden">

                <video
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
                >
                  <source
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    type="video/mp4"
                  />
                  {/* AI Engineering Stock Videos - FREE */}
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-neural-network-12166-large.mp4" type="video/mp4" />
                  <source src="https://player.vimeo.com/proxy?src=https%3A//player.vimeo.com/hls/play/76979871/master.m3u8&color=ff0179&background=000000" type="video/mp4" />
                </video>

                {/* Overlay Gradient */}
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              </div>
              {/* Content Overlay */}
              <div className="relative z-10 h-80 lg:h-[420px] w-full flex items-center justify-center ">


                {/* </div> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* 02. About Us */}
      <section id="about" className="py-16 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_minmax(320px,380px)] gap-10 items-center ">
            <div>
              <CommonTitle
                align="left"
                pill={false}
                title="About Us"
                gradientText="Your Trusted AI Partner"
                subtitle="Helping businesses innovate, optimize, and scale with cutting-edge AI technologies"
              />

              <motion.div
                className="max-w-3xl mx-auto text-start mt-16 "
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  We are an AI solutions company combining deep technical expertise, industry knowledge, and strong focus on business outcomes. AI should be transparent, responsible, and human-centered—designed to support people, improve decision-making, and drive sustainable growth.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <div className="rect-icon text-sky-900 mx-auto">AI</div>
                </div>
              </motion.div>

            </div>
            <div className="w-full">
              <LeadForm
                formType="ai"
                formKey="ai"
                serviceName="Ai Page"
                title="Get In Touch"
                subtitle="Get matched with top talent in 24 Hours! "
                variant="solid"
                showLogo={true}
                showCompany={false}
                showBudget={false}
                showAttachment={false}
                showNDA={false}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* 03. What We Do */}
      <section id="services" className="py-20 lg:py-28 bg-gradient-to-br from-white via-sky-50 to-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommonTitle
            align="center"
            title="What We Do"
            gradientText="AI Solutions"
            subtitle="Custom development, automation, and consulting services"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16 lg:mt-24">
            {[
              {
                title: 'Custom AI Development',
                desc: 'Tailored solutions: ML/DL Models, Predictive Analytics, Recommendation Systems, NLP, Computer Vision',
                iconText: 'AI'
              },
              {
                title: 'AI Automation',
                desc: 'Intelligent Process Automation, Chatbots & Virtual Assistants, Document Processing, Workflow Optimization',
                iconText: 'AUTO'
              },
              {
                title: 'AI Consulting',
                desc: 'AI Readiness Assessment, Use Case Identification, Data Strategy, Ethical AI & Compliance Guidance',
                iconText: 'CONSULT'
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                className="group p-8 lg:p-10 bg-white rounded-2xl border border-gray-100 hover:border-sky-300/50 hover:shadow-lg hover:shadow-sky-100/50 hover:-translate-y-2 transition-all duration-500 text-center cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="rect-icon text-white mb-6 group-hover:scale-110 transition-all duration-300 mx-auto">{service.iconText}</div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 leading-tight">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />


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

      <Blogs
        category=""
        featured={false}
        title="Latest AI Insights"
        subtitle="Fresh perspectives from our AI engineering team"
      />
      <InquirySection />
    </>
  );
}
