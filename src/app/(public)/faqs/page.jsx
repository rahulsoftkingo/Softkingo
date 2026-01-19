// // src/app/(public)/faqs/page.jsx - PERFECT HERO + SIMPLE FAQ CONTENT


// src/app/(public)/faqs/page.jsx - PERFECT HERO + TAB FAQ CONTENT
'use client'
import Link from 'next/link';
import { useState } from 'react';

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General Questions' },
    { id: 'mobile', label: 'Mobile App Development' }
  ];

  const faqData = {
    general: [
      {
        q: "Where is Softkingo Technologies located?",
        a: "New Ashok Nagar, New Delhi - 110096 & H61, Block H, Sector 63, Noida - 201301, India."
      },
      {
        q: "What services does Softkingo Technologies provide?",
        a: "Full-stack web & mobile app development, UI/UX design, cloud infrastructure (AWS/GCP), DevOps, and dedicated development teams."
      },
      {
        q: "How strong is the company team?",
        a: "200+ developers with 4-10+ years experience across React, Node.js, Flutter, Next.js, AWS, and full-stack expertise."
      },
      {
        q: "What is the best way to communicate with your expert advisor or sales team?",
        a: "Email: info@softkingo.com or call +91-7428750870. Average response: under 2 hours."
      },
      {
        q: "Who owns the legal rights to the technology developed by Softkingo?",
        a: "You own 100% IP rights. Full source code ownership transfers upon final payment."
      },
      {
        q: "How do you make sure your IP address is secure?",
        a: "Enterprise-grade encryption (AES-256), GDPR compliant, SOC2 certified servers, NDAs signed with all developers."
      },
      {
        q: "Why choose Softkingo Technologies for other mobile application development companies?",
        a: "98% client retention, 4.9/5 Clutch rating, 2-week risk-free trial, dedicated account manager, post-launch support included."
      }
    ],
    mobile: [
      {
        q: "What are the different types of mobile applications you can develop?",
        a: "Native (iOS Swift/Objective-C, Android Kotlin/Java), Cross-platform (Flutter, React Native), Progressive Web Apps (PWA), Hybrid (Ionic/Cordova)."
      },
      {
        q: "Can a mobile application be developed in just one month?",
        a: "Yes for MVP (3-8 screens). Complex apps: 2-6 months. We delivered 50+ apps under 30 days."
      },
      {
        q: "What security measures do you take to secure my app idea?",
        a: "NDA signed, encrypted repositories, secure code review process, penetration testing before launch."
      },
      {
        q: "What is your typical mobile app development process?",
        a: "Discovery → Wireframes → UI/UX Design → Development → QA Testing → App Store Submission → Post-launch support."
      },
      {
        q: "Will you help me with the application process?",
        a: "Complete App Store submission assistance included. We handle certificates, provisioning profiles, and approval process."
      },
      {
        q: "What if I want to change my app after launch?",
        a: "Unlimited revisions during development. Post-launch: 30 days free maintenance, then hourly support available."
      },
      {
        q: "Will your mobile app development team support me once I publish my app on the app store?",
        a: "Yes. 30 days free post-launch support included. Annual maintenance contracts available for ongoing updates."
      }
    ]
  };

  return (
    <>
      {/* PERFECT HERO (same style) */}
      <section className="relative h-[260px] md:h-[320px] lg:h-[380px] bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: "url('/images/faqs-hero.png')" }}
      >
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/80 via-slate-900 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.15),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.6)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
          <div className="w-full">
            <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-200/70 mb-3">
              <Link href="/" className="hover:text-cyan-400 transition-colors">
                Home
              </Link>
              <span>›</span>
              <span className="text-cyan-400 font-medium">FAQ</span>
            </nav>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="mt-3 max-w-xl text-xs md:text-sm lg:text-base text-slate-100/90 mb-6">
              If you have any doubt, then we can remove them through some of our questions, maybe it will help you a little to clear your doubts.
            </p>

            <div className="flex flex-wrap gap-4 text-xs md:text-sm text-slate-100/80">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span><a href="tel:+917428750870" className="hover:text-emerald-300 transition-colors">Sales: +91-7428750870</a></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span><a href="mailto:info@softkingo.com" className="hover:text-sky-300 transition-colors">Email: info@softkingo.com</a></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TAB FAQ CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center -mb-1 bg-gradient-to-r from-slate-50/50 to-blue-50/50 backdrop-blur-sm rounded-3xl p-1 shadow-xl border border-slate-200/50 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 px-6 text-center font-semibold text-sm md:text-base transition-all duration-300 rounded-2xl ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg shadow-sky-500/25 scale-105'
                  : 'text-slate-600 hover:text-sky-600 hover:bg-white/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {faqData[activeTab].map((faq, index) => (
            <div
              key={index}
              className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 hover:border-sky-200/70 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-500 overflow-hidden"
            >
              {/* Animated background shine */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg mt-1">
                  Q{index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-sky-900 mb-4 leading-tight">
                    {faq.q}
                  </h3>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-20 pt-16 border-t border-sky-200 text-center">
          <p className="text-xl text-gray-700 mb-8">
            Still have questions? Contact our experts directly:
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center text-lg mb-8">
            <a href="tel:+917428750870" className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              Call +91-7428750870 →
            </a>
            <a href="mailto:info@softkingo.com" className="inline-flex items-center gap-2 border-2 border-sky-200 hover:border-sky-500 text-sky-700 hover:text-sky-600 px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-sky-50 hover:-translate-y-1">
              Email Us →
            </a>
          </div>
          <p className="text-sm text-gray-500">
            Last Updated: <span className="font-semibold text-sky-900">January 19, 2026</span>
          </p>
        </div>
      </div>

      <style>{`
        h3 { scroll-margin-top: 120px; }
        .group:hover .group-hover\\:text-sky-900 { @apply text-sky-900; }
      `}</style>
    </>
  );
}
