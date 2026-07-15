"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import CommonTitle from '@/components/ui/CommonTitle';
import PopupQuoteModal from '@/components/PopupQuoteModal';
import { Plus, Minus, MessageCircle, ArrowRight } from 'lucide-react';

// Container controls the stagger timing for its children
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Each FAQ item animates up + fades in
const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function FAQAccordion({ data }) {

  const [openIndex, setOpenIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const defaultItems = [
    {
      id: 1,
      q: "How do you ensure the security and quality of the app or software you develop?",
      a: "At Softkingo, security and quality aren't afterthoughts—they're part of our foundation. From day one, we take deliberate steps to make sure your software is secure, stable, and built to last. We begin every project by signing a Non-Disclosure Agreement (NDA), ensuring that your ideas, data, and business details stay completely confidential. On the security front, our developers follow secure coding standards and implement strong data protection practices from the initial development phase. Depending on your industry, we align your solution with global compliance standards such as GDPR, HIPAA, and PCI DSS. We also use advanced security measures like data encryption, multi-factor authentication, role-based access control, and frequent code reviews to reduce risks and prevent vulnerabilities. To maintain high quality, we embed a comprehensive QA process into our Agile workflow. Every app or software solution goes through extensive testing, including manual and automated testing, functionality checks, usability testing, performance optimization, and security testing. Even after launch, we don't step away. We conduct regular vulnerability assessments, third-party security audits, and continuous monitoring to keep your product safe and efficient. Our QA and development teams work closely together to quickly resolve bugs, performance issues, or user concerns—both during development and post-deployment."
    },
    {
      id: 2,
      q: "How do you ensure a seamless user experience in your designs?",
      a: "Delivering a smooth and intuitive user experience is a top priority for us. Our design process starts with detailed user research and competitor analysis so we can truly understand your audience, their expectations, and their challenges. Our UI/UX designers focus on simplicity, consistency, and ease of use. We follow the latest design trends and strictly adhere to platform-specific guidelines to ensure your app feels familiar and intuitive to users from the first interaction. Before finalizing any design, we create wireframes and interactive prototypes. These allow us to test usability early and gather feedback from stakeholders, helping us refine the experience before development begins. At Softkingo, our goal is to create designs that are not only visually appealing but also practical and user-friendly—experiences that users enjoy and businesses can rely on."
    },
    {
      id: 3,
      q: "What makes Softkingo the best software and mobile app development company?",
      a: "Softkingo stands out because of our proven experience, strong technical expertise, and passion for innovation. Our team of 50+ skilled professionals—including developers, designers, and industry experts—works collaboratively to deliver solutions that truly make an impact. We've successfully completed 400+ projects for over 350+ clients across the globe."
    },
    {
      id: 4,
      q: "What software development services do you offer?",
      a: "With over 6+ years of experience, Softkingo delivers robust and scalable digital solutions to businesses worldwide. We've successfully completed 400+ projects across 25+ countries, offering end-to-end custom software development services, including: Software Consulting, Custom Software Development, Enterprise Software Development, Software Product Development, Software Integration, Custom CRM Development, API Development, ERP Software Development."
    },
    {
      id: 5,
      q: "Do you offer post-launch support and maintenance?",
      a: "Yes, absolutely. Post-launch support and maintenance are an essential part of our services. We ensure your app continues to perform smoothly, stays secure, and evolves with changing technologies."
    },
    {
      id: 6,
      q: "Do you offer a free consultation or project estimate?",
      a: "Yes, we do. We offer a completely free initial consultation and project estimate to help you move forward with confidence. During the consultation, we take time to understand your business objectives, target audience, technical needs, and long-term goals."
    },
    {
      id: 7,
      q: "Can you integrate AI or other emerging technologies into my app?",
      a: "Yes, we specialize in integrating AI and emerging technologies into mobile and web applications to help businesses stay competitive and future-ready."
    },
    {
      id: 8,
      q: "What is the average cost and timeline for developing a mobile app?",
      a: "The cost and timeline of mobile app development depend on multiple factors, including app complexity, features, platform selection, design requirements, and integrations. A simple app with basic functionality typically costs between $10,000 and $30,000."
    },
    {
      id: 9,
      q: "What mobile app development services do you offer?",
      a: "As a globally recognized development company, we offer complete mobile app development services, including: Custom App Development, iOS App Development, Android App Development, Flutter App Development, React Native App Development, Web App Development."
    },
    {
      id: 10,
      q: "How do you handle project management and communication?",
      a: "We follow a transparent and client-centric approach to ensure smooth project execution and clear communication at every stage. Our teams work using Agile project management methodologies, breaking projects into manageable sprints."
    }
  ];

  const items = data?.items || defaultItems;
  const title = data?.title;
  const subtitle = data?.subtitle;
  const gradientText = data?.gradientText || "";

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i));

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <CommonTitle
          align="center"
          title={title}
          gradientText={gradientText}
          subtitle={subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 items-start">

          <div className="lg:col-span-2">
            <div
              className="faq-scroll overflow-y-auto pr-3"
              style={{ maxHeight: "60vh" }}
            >
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {items.map((it, i) => {
                  const isOpen = i === openIndex;
                  return (
                    <motion.div
                      key={it.id || i}
                      variants={itemVariants}
                      className={`border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? "bg-slate-50 border-sky-100 ring-1 ring-sky-100" : "bg-white"
                        }`}
                    >
                      <button
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${it.id || i}`}
                        onClick={() => toggle(i)}
                        className="w-full flex items-start gap-4 px-6 py-5 text-left bg-transparent hover:bg-slate-50/50 transition-colors"
                      >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors mt-0.5 ${isOpen ? "bg-sky-500 border-sky-500 text-white" : "bg-white border-slate-200 text-slate-500"
                          }`}>
                          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                        </div>
                        <h3 className={`text-lg font-bold flex-1 ${isOpen ? "text-sky-900" : "text-slate-900"}`}>
                          {it.q}
                        </h3>
                      </button>

                      <div
                        id={`faq-panel-${it.id || i}`}
                        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                      >
                        <div className="overflow-hidden">
                          <div
                            className="px-6 pb-6 pl-[4.5rem] text-sm md:text-base text-slate-600 leading-relaxed prose prose-sm max-w-none rich-text"
                            dangerouslySetInnerHTML={{ __html: it.a }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          <aside className="w-full lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="sticky top-24 rounded-2xl bg-gradient-to-br from-[#28AFDF] to-[#06465D] p-8 shadow-xl text-center"
            >
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm shadow-inner">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
              </div>
              <h4 className="text-white font-bold text-xl mt-6">Have Different Questions?</h4>
              <p className="mt-3 text-sm text-sky-100 leading-relaxed">
                Our team is ready to answer all your questions. We ensure a quick response within 24 hours.
              </p>
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 bg-white text-sky-700 hover:bg-sky-50 hover:text-sky-800 px-6 py-3 rounded-full font-bold shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  Contact Us <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </aside>

        </div>
      </div>

      <PopupQuoteModal open={showModal} onClose={() => setShowModal(false)} />

      <style jsx global>{`
        .faq-scroll {
          scrollbar-width: thin;
          scrollbar-color: #28AFDF #f1f5f9;
        }
        .faq-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .faq-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 8px;
        }
        .faq-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #28AFDF, #06465D);
          border-radius: 8px;
        }
        .faq-scroll::-webkit-scrollbar-thumb:hover {
          background: #06465D;
        }
      `}</style>
    </section>
  );
}