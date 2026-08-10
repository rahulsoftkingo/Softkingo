"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CommonTitle from "@/components/ui/CommonTitle";
import PopupQuoteModal from "@/components/PopupQuoteModal";
import { Plus, Minus, MessageCircle, ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

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
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef(null);
  const listRef = useRef(null);

  // Detect mobile / below-lg viewport so we can switch to a simple,
  // non-scroll-jacked accordion instead of the desktop scroll-driven one.
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)");
    const handleChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const defaultItems = [
    {
      id: 1,
      q: "How do you ensure the security and quality of the app or software you develop?",
      a: "At Softkingo, security and quality aren't afterthoughts—they're part of our foundation. From day one, we take deliberate steps to make sure your software is secure, stable, and built to last. We begin every project by signing a Non-Disclosure Agreement (NDA), ensuring that your ideas, data, and business details stay completely confidential.",
    },
    {
      id: 2,
      q: "How do you ensure a seamless user experience in your designs?",
      a: "Delivering a smooth and intuitive user experience is a top priority for us. Our design process starts with detailed user research and competitor analysis so we can truly understand your audience, their expectations, and their challenges.",
    },
    {
      id: 3,
      q: "What makes Softkingo the best software and mobile app development company?",
      a: "Softkingo stands out because of our proven experience, strong technical expertise, and passion for innovation. Our team of 50+ skilled professionals works collaboratively to deliver solutions that truly make an impact.",
    },
    {
      id: 4,
      q: "What software development services do you offer?",
      a: "With over 6+ years of experience, Softkingo delivers robust and scalable digital solutions to businesses worldwide, offering end-to-end custom software development services.",
    },
    {
      id: 5,
      q: "Do you offer post-launch support and maintenance?",
      a: "Yes, absolutely. Post-launch support and maintenance are an essential part of our services. We ensure your app continues to perform smoothly, stays secure, and evolves with changing technologies.",
    },
    {
      id: 6,
      q: "Do you offer a free consultation or project estimate?",
      a: "Yes, we do. We offer a completely free initial consultation and project estimate to help you move forward with confidence.",
    },
    {
      id: 7,
      q: "Can you integrate AI or other emerging technologies into my app?",
      a: "Yes, we specialize in integrating AI and emerging technologies into mobile and web applications to help businesses stay competitive and future-ready.",
    },
    {
      id: 8,
      q: "What is the average cost and timeline for developing a mobile app?",
      a: "The cost and timeline depend on multiple factors, including app complexity, features, platform selection, design requirements, and integrations.",
    },
    {
      id: 9,
      q: "What mobile app development services do you offer?",
      a: "As a globally recognized development company, we offer complete mobile app development services, including Custom App, iOS, Android, Flutter, and React Native development.",
    },
    {
      id: 10,
      q: "How do you handle project management and communication?",
      a: "We follow a transparent and client-centric approach. Our teams work using Agile methodologies, breaking projects into manageable sprints.",
    },
  ];

  const items = data?.items || defaultItems;
  const title = data?.title;
  const subtitle = data?.subtitle;
  const gradientText = data?.gradientText || "";

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i));

  // Framer Motion Scroll Trigger logic (desktop only)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Dynamically translate list upwards as the page scrolls (desktop only)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  // NOTE: Auto-opening the accordion item based on scroll position has been
  // removed. The list still moves/scrolls via the `y` transform above, but
  // which item is open is now controlled ONLY by clicking (see `toggle`).

  const renderItem = (it, i) => {
    const isOpen = i === openIndex;
    return (
      <motion.div
        key={it.id || i}
        variants={itemVariants}
        className={`border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
          isOpen
            ? "bg-slate-50 border-sky-100 ring-1 ring-sky-100"
            : "bg-white"
        }`}
      >
        <button
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${it.id || i}`}
          onClick={() => toggle(i)}
          className="w-full flex items-start gap-4 px-6 py-5 text-left bg-transparent hover:bg-slate-50/50 transition-colors"
        >
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors mt-0.5 ${
              isOpen
                ? "bg-sky-500 border-sky-500 text-white"
                : "bg-white border-slate-200 text-slate-500"
            }`}
          >
            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
          </div>
          <h3
            className={`text-lg font-bold flex-1 ${
              isOpen ? "text-sky-900" : "text-slate-900"
            }`}
          >
            {it.q}
          </h3>
        </button>

        <div
          id={`faq-panel-${it.id || i}`}
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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
  };

  const ctaCard = (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="rounded-2xl bg-gradient-to-br from-[#28AFDF] to-[#06465D] p-8 shadow-xl text-center"
    >
      <div className="flex justify-center">
        <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm shadow-inner">
          <MessageCircle className="w-10 h-10 text-white" />
        </div>
      </div>
      <h4 className="text-white font-bold text-xl mt-6">
        Have Different Questions?
      </h4>
      <p className="mt-3 text-sm text-sky-100 leading-relaxed">
        Our team is ready to answer all your questions. We ensure a quick
        response within 24 hours.
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
  );

  // ---------- MOBILE: simple, normal-flow accordion (no scroll-jacking) ----------
  if (isMobile) {
    return (
      <section className="relative bg-white py-10">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <CommonTitle
            align="center"
            title={title}
            gradientText={gradientText}
            subtitle={subtitle}
          />

          <div className="mt-10 space-y-4">
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {items.map((it, i) => renderItem(it, i))}
            </motion.div>
          </div>

          <div className="mt-8">{ctaCard}</div>
        </div>

        <PopupQuoteModal open={showModal} onClose={() => setShowModal(false)} />
      </section>
    );
  }

  // ---------- DESKTOP: scroll-driven sticky version, click-to-open only ----------
  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{ height: `${items.length * 35}vh` }} // Dynamic height based on item count
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <CommonTitle
            align="center"
            title={title}
            gradientText={gradientText}
            subtitle={subtitle}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 items-start">
            {/* Scrollable list driven by Framer Motion */}
            <div className="lg:col-span-2 overflow-hidden h-[55vh] relative rounded-2xl">
              <motion.div style={{ y }} ref={listRef} className="space-y-4 pr-3">
                <motion.div
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {items.map((it, i) => renderItem(it, i))}
                </motion.div>
              </motion.div>
            </div>

            {/* Sidebar CTA */}
            <aside className="w-full lg:col-span-1">{ctaCard}</aside>
          </div>
        </div>
      </div>

      <PopupQuoteModal open={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
}