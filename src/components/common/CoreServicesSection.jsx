"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import CommonTitle from "@/components/ui/CommonTitle";

// ─── Default AI Services Data ────────────────────────────────────────────────
export const AI_SERVICES_DEFAULT = [
    {
        title: "AI-Powered Application Development",
        description: "Intelligent web and mobile applications powered by artificial intelligence help businesses automate workflows, personalize user experiences, and improve operational efficiency. From recommendation engines to predictive dashboards, AI-driven apps transform raw data into actionable insights.",
        capabilities: [
            "Smart recommendation systems",
            "Predictive analytics dashboards",
            "Intelligent automation features",
            "Personalized user experiences"
        ],
        tech: [
            { name: "Next.js", img: "/images/tech/Next.js.png" },
            { name: "Python", img: "/images/tech/Python.png" },
            { name: "OpenAI", img: "/images/tech/Next.js.png" },
            { name: "React", img: "/images/tech/React.png" }
        ],
        link: "/contact"
    },
    {
        title: "Custom AI Model Development",
        description: "Every business has unique data and unique challenges. Custom AI models are designed and trained specifically around your business objectives to deliver accurate predictions and reliable performance in real-world environments.",
        capabilities: [
            "Supervised & unsupervised learning models",
            "Deep learning solutions",
            "Predictive modeling & forecasting",
            "Model optimization & fine-tuning"
        ],
        tech: [
            { name: "Python", img: "/images/tech/Python.png" },
            { name: "TensorFlow", img: "/images/tech/TensorFlow.png" },
            { name: "PyTorch", img: "/images/tech/PyTorch.png" },
            { name: "Keras", img: "/images/tech/Vite.png" }
        ],
        link: "/contact"
    },
    {
        title: "NLP & AI Chatbot Development",
        description: "Conversational AI solutions enhance customer engagement by delivering intelligent, context-aware responses. Advanced NLP-based chatbots can understand human language, manage queries efficiently, and integrate seamlessly with business systems.",
        capabilities: [
            "GPT-powered chatbots",
            "Context-aware conversations",
            "Multilingual communication",
            "Voice-enabled assistants",
            "CRM & API integration"
        ],
        tech: [
            { name: "Python", img: "/images/tech/Python.png" },
            { name: "OpenAI", img: "/images/tech/Next.js.png" },
            { name: "LangChain", img: "/images/tech/Next.js.png" },
            { name: "Dialogflow", img: "/images/tech/nodejs.png" }
        ],
        link: "/contact"
    },
    {
        title: "Machine Learning Solutions",
        description: "Machine learning systems analyze historical data to uncover patterns, predict outcomes, and support data-driven decision-making. These solutions help businesses reduce risks, improve efficiency, and increase profitability.",
        capabilities: [
            "Fraud detection systems",
            "Demand forecasting",
            "Customer segmentation",
            "Risk analysis models",
            "Predictive analytics"
        ],
        tech: [
            { name: "Scikit-learn", img: "/images/tech/scikit-learn.png" },
            { name: "Python", img: "/images/tech/Python.png" },
            { name: "Pandas", img: "/images/tech/Python.png" },
            { name: "XGBoost", img: "/images/tech/Python.png" }
        ],
        link: "/contact"
    },
    {
        title: "Computer Vision Solutions",
        description: "Our CV solutions drive automation and intelligence across manufacturing, retail, security, and healthcare sectors. Interpreting visual data from images and videos with high precision.",
        capabilities: [
            "Object detection",
            "Image classification",
            "Facial recognition",
            "Video analytics",
            "Automated inspection systems"
        ],
        tech: [
            { name: "OpenCV", img: "/images/tech/OpenCV.png" },
            { name: "YOLO", img: "/images/tech/Python.png" },
            { name: "TensorFlow", img: "/images/tech/TensorFlow.png" },
            { name: "PyTorch", img: "/images/tech/PyTorch.png" }
        ],
        link: "/contact"
    },
    {
        title: "Generative AI Development",
        description: "Generative AI solutions create high-quality content, images, code, and digital assets automatically. These systems improve productivity, accelerate marketing processes, and enhance customer engagement strategies.",
        capabilities: [
            "AI content generation",
            "AI code assistants",
            "Image & media generation",
            "Automated documentation",
            "Marketing automation tools"
        ],
        tech: [
            { name: "Stable Diffusion", img: "/images/tech/Next.js.png" },
            { name: "Midjourney", img: "/images/tech/Next.js.png" },
            { name: "LLaMA 3", img: "/images/tech/Python.png" },
            { name: "DALL-E", img: "/images/tech/Next.js.png" }
        ],
        link: "/contact"
    },
    {
        title: "AI Consulting & Strategy",
        description: "Strategic AI consulting helps identify the right use cases, define data strategies, and build a clear roadmap for successful implementation. A structured approach ensures that AI investments align with measurable business outcomes.",
        capabilities: [
            "AI readiness assessment",
            "Data strategy planning",
            "Use-case validation",
            "ROI estimation",
            "Implementation roadmap"
        ],
        tech: [
            { name: "Figma", img: "/images/tech/Figma.png" },
            { name: "Tableau", img: "/images/tech/Sanity.png" },
            { name: "Power BI", img: "/images/tech/Azure.png" },
            { name: "Notion", img: "/images/tech/Next.js.png" }
        ],
        link: "/contact"
    },
    {
        title: "AI Integration & Deployment",
        description: "Seamless integration ensures AI systems work smoothly within existing CRM, ERP, mobile, and enterprise platforms. Deployment strategies focus on performance, scalability, and long-term maintainability.",
        capabilities: [
            "API integration",
            "Cloud deployment",
            "CI/CD pipelines",
            "Performance monitoring",
            "Continuous optimization"
        ],
        tech: [
            { name: "AWS", img: "/images/tech/AWS.png" },
            { name: "Docker", img: "/images/tech/Docker.png" },
            { name: "Kubernetes", img: "/images/tech/Kubernetes.png" },
            { name: "Jenkins", img: "/images/tech/Java.png" }
        ],
        link: "/contact"
    }
];

// ─── Sticky Service Card Component ───────────────────────────────────────────
function StickyServiceCard({ service, index }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.8, 1], [0.95, 1, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ scale, opacity }}
            className="bg-sky-500 rounded-2xl border border-sky-400 shadow-xl overflow-hidden min-h-[400px] flex flex-col group transition-all duration-500"
        >
            <div className="p-8 md:p-12 space-y-8 flex-1">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 flex items-center justify-center text-white font-bold text-lg shrink-0">
                            {String(index + 1).padStart(2, "0")}
                        </div>
                        <h3 className="text-white font-bold text-2xl md:text-3xl leading-tight">
                            {service?.title || service?.name || "Service"}
                        </h3>
                    </div>

                    <p className="text-lg text-white/90 leading-relaxed font-medium max-w-4xl">
                        {service?.description || service?.desc || ""}
                    </p>
                </div>

                {/* Capabilities */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold text-white/70 uppercase tracking-widest">Key Capabilities</h4>
                    <ul className="space-y-3">
                        {(service?.capabilities || []).map((cap, i) => (
                            <li key={i} className="flex items-start gap-3 text-base text-white font-medium">
                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                                {cap}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Technologies (HORIZONTAL SCROLL) */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold text-white/70 uppercase tracking-widest">Technologies We Use</h4>
                    <div className="flex flex-row gap-4 overflow-x-auto hide-scrollbar whitespace-nowrap pb-4 px-1">
                        {(service?.tech || service?.technologies || []).map((t, idx) => (
                            <div key={idx} className="group/tech relative w-14 h-14 bg-white rounded-xl p-2.5 shadow-lg shadow-sky-900/10 transition-all duration-300 flex items-center justify-center hover:scale-110 shrink-0">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={typeof t === 'string' ? `/images/tech/${t}.png` : (t.img || t.image)}
                                        alt={typeof t === 'string' ? t : t.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-sky-600 font-bold text-[10px] py-1 px-2 rounded opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-20 shadow-lg">
                                    {typeof t === 'string' ? t : t.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Link */}
                <div className="pt-6 border-t border-white/10 mt-auto">
                    <Link
                        href={service?.link || "/contact"}
                        className="inline-flex items-center gap-2 text-white font-bold hover:gap-4 transition-all duration-300 group/link"
                    >
                        Consult Our AI Experts <FaArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CoreServicesSection({
    title = "Our Core Services",
    subtitle = "End-to-end AI development services designed to solve real business problems and create measurable growth. Each solution is built with a strong focus on scalability, security, performance, and long-term business value.",
    services = AI_SERVICES_DEFAULT,
    sectionId = "core-services",
    bgClass = "bg-white",
}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    // Intersection Observer for sidebar highlight
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -50% 0px',
            threshold: 0.1
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.id.split('-')[1]);
                    if (!isNaN(index)) {
                        setActiveIndex(index);
                        // Sync mobile scroll
                        const btn = document.getElementById(`nav-btn-${index}`);
                        if (btn && scrollContainerRef.current) {
                            const container = scrollContainerRef.current;
                            container.scrollTo({
                                left: btn.offsetLeft - (container.offsetWidth / 2) + (btn.offsetWidth / 2),
                                behavior: 'smooth'
                            });
                        }
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const serviceElements = document.querySelectorAll('[id^="service-"]');
        serviceElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [services]);

    const scrollToService = (index) => {
        const el = document.getElementById(`service-${index}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <section id={sectionId} className={`${bgClass} py-16 lg:py-24`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <CommonTitle align="center" title={title} subtitle={subtitle} />

                {/* Mobile / Tablet Horizontal Navigation (NEW) */}
                <div className="lg:hidden mt-10 mb-8 sticky top-20 z-30 bg-white/80 backdrop-blur-md py-4 -mx-4 px-4 border-b border-sky-100">
                    <div
                        ref={scrollContainerRef}
                        className="flex flex-row gap-3 overflow-x-auto hide-scrollbar whitespace-nowrap"
                    >
                        {services.map((s, idx) => (
                            <button
                                key={idx}
                                id={`nav-btn-${idx}`}
                                onClick={() => scrollToService(idx)}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all shrink-0 border ${activeIndex === idx
                                        ? "bg-sky-500 text-white border-sky-400 shadow-lg shadow-sky-500/20"
                                        : "bg-white text-sky-600 border-sky-100 hover:border-sky-300"
                                    }`}
                            >
                                {s?.title || s?.name || `Service ${idx + 1}`}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-12 lg:mt-20 items-start">
                    {/* Dashboard Navigation Sidebar (Left Side Sticky) */}
                    <div className="hidden lg:block w-72 shrink-0 sticky top-32 self-start bg-sky-400 rounded-2xl p-6 shadow-xl shadow-sky-100 z-10">
                        <h4 className="text-[11px] font-bold text-white/60 uppercase tracking-widest mb-6 px-2">Navigation</h4>
                        <div className="space-y-1.5">
                            {services.map((s, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => scrollToService(idx)}
                                    onMouseEnter={() => scrollToService(idx)}
                                    className={`w-full text-left px-4 py-3.5 rounded-xl text-[13px] font-bold transition-all duration-300 flex items-center gap-4 group active:scale-[0.98] ${activeIndex === idx
                                            ? "bg-white text-sky-600 shadow-lg shadow-sky-600/10"
                                            : "text-white hover:bg-white/10"
                                        }`}
                                >
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all shrink-0 ${activeIndex === idx
                                            ? "bg-sky-500 text-white"
                                            : "bg-white/20 text-white"
                                        }`}>
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <span className="leading-tight shrink-0 overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]">
                                        {s?.title || s?.name || `Service ${idx + 1}`}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Cards Stack (Right Side) */}
                    <div className="flex-1 w-full space-y-24">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                id={`service-${index}`}
                                style={{ zIndex: index + 1 }}
                                className="sticky top-32"
                            >
                                <StickyServiceCard service={service} index={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
