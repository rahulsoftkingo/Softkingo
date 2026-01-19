
'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import CommonTitle from '@/components/ui/CommonTitle';
import InquirySection from '@/components/footer/InquirySection';
import Blogs from '../home/blogs/BlogSliderClient';

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

      {/* 01. Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-700 via-sky-900 to-sky-600 py-20">
        <div className="absolute inset-0">
          <div className="absolute top-16 left-8 w-[300px] h-[300px] bg-sky-500/8 rounded-full blur-xl animate-[float-subtle_6s_ease-in-out_infinite]" style={{animationDelay: '0s'}} />
          <div className="absolute bottom-24 right-12 w-[250px] h-[250px] bg-sky-400/6 rounded-full blur-xl animate-[float-subtle_6s_ease-in-out_infinite]" style={{animationDelay: '2s'}} />
        </div>
{/* 1. Main gradient */}
<div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 via-slate-900 to-slate-950" />

{/* 2. Radial gradients */}
<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.15),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.1),transparent_50%)]" />

{/* 3. Left glow orb */}
<div className="absolute top-1/4 -left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />

{/* 4. Right glow orb */}
<div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl" />

{/* 5. Grid pattern */}
<div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.6)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6  flex items-center relative z-10 w-full">
          <div className="w-full lg:flex lg:items-center lg:justify-between lg:gap-16">
            <motion.div 
              className="lg:w-1/2 text-left lg:pr-12"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-sky-500/10 backdrop-blur-md rounded-xl border border-sky-400/30 shadow-lg mb-8 w-fit">
                <div className="w-3 h-3 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full mr-2 flex-shrink-0" />
                <span className="font-semibold text-sky-200 text-sm ">Enterprise AI Engineering</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight mb-6 text-white tracking-tight bg-gradient-to-r from-white/90 via-slate-100/80 to-sky-100/70 bg-clip-text">
                AI & Machine <br className="hidden md:block" />
                <span className="block bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-400 text-transparent bg-clip-text drop-shadow-xl shrink-0">
                  Learning Engineering
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl">
                Production-grade AI systems engineered for <span className="font-semibold text-white">enterprise scale</span>.
                <span className="block mt-2 text-sky-300 font-medium text-sm">500+ deployments • 99.9% uptime • SOC2 Type II</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact" 
                  className="group px-4 md:px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300 items-center cursor-pointer inline-flex shrink-0"
                >
                  Launch AI Project
                  <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="#capabilities"
                  className="group flex items-center justify-center px-6 py-2.5 border-2 border-sky-400/50 bg-sky-500/5 backdrop-blur-sm font-semibold text-xs md:text-sm rounded-xl hover:border-sky-400 hover:bg-sky-500/15 hover:shadow-lg transition-all duration-300 text-sky-200 w-full sm:w-auto shrink-0"
                >
                  Technical Capabilities
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
            
            
            {/* Hero Right Side - Replace the mock div with this VIDEO SECTION */}

<motion.div 
  className="hidden lg:block lg:w-1/2 relative mt-12 lg:mt-0"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay: 0.3 }}
>
  {/* Video Background Container */}
  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-sky-400/5 to-transparent rounded-2xl backdrop-blur-lg border border-sky-500/20 shadow-2xl overflow-hidden">
    {/* AIO Video - Replace src with your video */}
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
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
  </div>

  {/* Content Overlay */}
  <div className="relative z-10 h-80 lg:h-[450px] w-full flex items-center justify-center ">
   
    
  </div>
</motion.div>

          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* 02. Capabilities */}
      <section id="capabilities" className="py-20 lg:py-28 bg-gray-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommonTitle
            align="center"
            pill={false}
            title="Enterprise AI"
            gradientText="Capabilities"
            subtitle="Complete AI engineering lifecycle from research to production deployment at enterprise scale"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16 lg:mt-24">
            {[
              {
                title: 'Machine Learning Engineering',
                subtitle: 'Production ML Pipelines',
                desc: 'Custom ML models optimized for production with complete MLOps lifecycle management.',
                specs: ['PyTorch 2.4', 'TensorFlow 2.16', 'Kubernetes orchestration']
              },
              {
                title: 'Computer Vision Systems',
                subtitle: 'Real-time Visual Intelligence',
                desc: 'Advanced vision systems including object detection, instance segmentation.',
                specs: ['YOLOv10', 'Detectron2', '4K@60fps processing']
              },
              {
                title: 'Generative AI & NLP',
                subtitle: 'Enterprise Language Systems',
                desc: 'Custom LLM fine-tuning, RAG, agentic workflows with enterprise security.',
                specs: ['Llama 3.1 405B', '128k+ context RAG', '50+ languages']
              }
            ].map((cap, idx) => (
              <motion.div 
                key={idx}
                className="group bg-white backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-gray-100/40 hover:border-sky-300/60 hover:shadow-xl hover:shadow-sky-200/20 hover:-translate-y-2 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="rect-icon text-white mb-6 group-hover:scale-110 transition-all duration-300">ML</div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 leading-tight">{cap.title}</h3>
                <div className="text-lg font-semibold text-sky-600 mb-5 px-3 py-1.5 bg-sky-50 rounded-lg w-fit">{cap.subtitle}</div>
                <p className="text-gray-700 mb-6 leading-relaxed text-sm lg:text-base">{cap.desc}</p>
                <div className="space-y-2">
                  {cap.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-3 p-2.5 bg-sky-50/60 rounded-lg group-hover:bg-sky-100/80 hover:scale-[1.02] transition-all duration-200">
                      <div className="w-2 h-2 bg-sky-500 rounded-full flex-shrink-0 shadow-sm" />
                      <span className="text-sm lg:text-base font-medium text-gray-800">{spec}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* 03. Use Cases */}
      <section id="usecases" className="py-20 lg:py-28 bg-gradient-to-br from-white via-sky-50 to-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommonTitle
            align="center"
            title="Real World"
            gradientText="Applications"
            subtitle="Proven AI solutions across diverse enterprise verticals"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16 lg:mt-24">
            {[
              { title: 'Predictive Analytics', desc: 'Demand forecasting, churn prediction, risk assessment', iconText: 'PA' },
              { title: 'Autonomous Operations', desc: 'Robotic process automation, self-healing systems', iconText: 'AO' },
              { title: 'Customer Intelligence', desc: 'Personalization engines, sentiment analysis', iconText: 'CI' },
              { title: 'Supply Chain AI', desc: 'Inventory optimization, route planning', iconText: 'SC' },
              { title: 'Fraud Detection', desc: 'Real-time transaction monitoring', iconText: 'FD' },
              { title: 'Content Generation', desc: 'Automated reports, marketing copy', iconText: 'CG' }
            ].map((usecase, idx) => (
              <motion.div
                key={idx}
                className="group p-8 lg:p-10 bg-white rounded-2xl border border-gray-100 hover:border-sky-300/50 hover:shadow-lg hover:shadow-sky-100/50 hover:-translate-y-2 transition-all duration-500 text-center cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <div className="rect-icon text-white mb-6 group-hover:scale-110 transition-all duration-300 mx-auto">{usecase.iconText}</div>
                <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-3">{usecase.title}</h4>
                <p className="text-gray-600 text-sm">{usecase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* 04. Deployment Section - NEW */}
      <section id="deployment" className="py-20 lg:py-28 bg-gradient-to-r from-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommonTitle
            align="center"
            title="Zero-Downtime"
            gradientText="Deployment"
            subtitle="Production-grade CI/CD pipelines with blue-green deployments and automated rollback"
          />
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mt-16 lg:mt-24">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="rect-icon text-white mb-6 mx-auto w-20 h-20">CD</div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Enterprise Deployment</h3>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start gap-3 p-4 bg-white/60 rounded-xl hover:bg-white hover:shadow-md transition-all">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm lg:text-base">Blue-green deployments</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white/60 rounded-xl hover:bg-white hover:shadow-md transition-all">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm lg:text-base">Canary releases with feature flags</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white/60 rounded-xl hover:bg-white hover:shadow-md transition-all">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm lg:text-base">99.99% deployment success rate</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:text-right"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="rect-icon text-white mb-6 mx-auto w-20 h-20">99.9%</div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Uptime SLA</h3>
              <div className="bg-gradient-to-br from-sky-500/10 to-sky-400/10 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-sky-200/30 text-center">
                <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent mb-4">24/7</div>
                <p className="text-gray-700 text-lg font-semibold">Production monitoring with auto-scaling</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* 05. Stack */}
      <section id="stack" className="py-20 lg:py-28 bg-gradient-to-br from-white to-sky-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommonTitle
            align="center"
            title="Production"
            gradientText="Tech Stack"
            subtitle="Enterprise-grade infrastructure powering mission-critical AI systems"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-6 mt-16 lg:mt-24">
            {[
              'PyTorch 2.4', 'TensorFlow 2.16', 'JAX 0.4.30', 'Kubernetes 1.30',
              'Ray 2.10', 'Docker CE', 'Redis 7.2', 'PostgreSQL 16', 'Kafka 3.7',
              'SageMaker', 'Vertex AI', 'Azure ML'
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



      {/* 06. Metrics */}
      <section id="metrics" className="py-20 lg:py-28 bg-gradient-to-b from-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommonTitle
            align="center"
            title="Proven"
            gradientText="Results"
            subtitle="Metrics that demonstrate our enterprise AI engineering expertise"
          />
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-10 mt-16 lg:mt-24">
            {[
              { num: '500+', label: 'Production Deployments', desc: 'Live AI systems worldwide' },
              { num: '98.7%', label: 'Model Precision', desc: 'Across 200+ enterprise projects' },
              { num: '12×', label: 'Performance Gains', desc: 'Average inference optimization' },
              { num: '99.9%', label: 'Uptime Guarantee', desc: 'Enterprise-grade reliability' }
            ].map((metric, idx) => (
              <motion.div
                key={idx}
                className={`group p-8 lg:p-12 rounded-2xl bg-white border border-sky-100/40 shadow-lg hover:shadow-xl hover:shadow-sky-200/30 hover:-translate-y-2 transition-all duration-500 text-center cursor-default ${inView.metrics ? 'metric-container animate' : ''}`}
                style={{animationDelay: `${idx * 150}ms`}}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl lg:text-4xl xl:text-5xl font-black bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 bg-clip-text text-transparent mb-4">
                  {metric.num}
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">{metric.label}</h3>
                <p className="text-gray-600 text-sm lg:text-base font-medium">{metric.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* 07. CTA */}
      <section id="cta" className="py-20 lg:py-28 bg-gradient-to-br from-sky-50 via-sky-200 to-sky-100 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CommonTitle
            align="center"
            title="Enterprise AI"
            gradientText="Engineered For Scale"
            subtitle="Deploying mission-critical AI systems trusted by Fortune 500 enterprises worldwide"
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
              className="group inline-flex items-center px-6 lg:px-10 py-2.5 lg:py-3 bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white font-semibold text-xs lg:text-sm rounded-full shadow-xl hover:shadow-sky-500/40 hover:shadow-2xl hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-400 border border-sky-400/30 backdrop-blur-sm tracking-wide"
            >
              <span>Transform With AI</span>
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
