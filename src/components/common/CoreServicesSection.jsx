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
            className="bg-gradient-to-br from-sky-600 via-sky-500 to-sky-400 rounded-3xl overflow-hidden min-h-[450px] flex flex-col group transition-all duration-500 relative"
        >
            <Link href={service?.link || "/contact"} className="block h-full w-full p-6 md:p-10 relative z-10">
                {/* Navigation Arrow Top Right */}
                <div className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white -rotate-45 group-hover:rotate-0 group-hover:bg-white group-hover:text-sky-500 transition-all duration-500 z-20 shadow-lg">
                    <FaArrowRight className="text-xl" />
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl opacity-30 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-300/10 rounded-full -ml-32 -mb-32 blur-3xl opacity-20 pointer-events-none"></div>

                <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 flex items-center justify-center text-white font-semibold text-2xl md:text-3xl lg:text-4xl shrink-0">
                            {String(index + 1).padStart(2, "0")}
                        </div>
                        <h3 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl pr-16 md:pr-20">
                            {service?.title || service?.name || "Service"}
                        </h3>
                    </div>

                    <div
                        className="text-sm md:text-md text-sky-50 max-w-4xl opacity-90 rich-text mb-8"
                        dangerouslySetInnerHTML={{ __html: service?.description || service?.desc || "" }}
                    />

                    {/* Capabilities */}
                    <div className="space-y-4 mb-8">
                        <h4 className="text-sm font-bold text-white/70 uppercase tracking-widest">Key Capabilities</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {(service?.capabilities || []).map((cap, i) => (
                                <li key={i} className="flex items-start gap-3 text-base text-white opacity-90 font-medium">
                                    <span className="p-1 border border-white/50 rounded-full shrink-0 mt-1"> <FaArrowRight className="h-2 w-2" /> </span>
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
                                <div key={idx} className="group/tech relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl p-2.5 shadow-lg shadow-sky-900/10 transition-all duration-300 flex items-center justify-center hover:scale-110 shrink-0">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={typeof t === 'string' ? `/images/tech/${t}.png` : (t.img || t.image)}
                                            alt={typeof t === 'string' ? t : t.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-sky-600 font-bold text-[10px] py-1 px-2 rounded opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-30 shadow-lg">
                                        {typeof t === 'string' ? t : t.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
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
        <section id={sectionId} className={`${bgClass}relative`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
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
                    <div className="hidden lg:block w-80 shrink-0 sticky top-32 self-start bg-white rounded-3xl p-3 shadow-2xl shadow-sky-200/50 border border-sky-100 z-10">
                        {/* <div className="bg-sky-500 rounded-2xl p-6 mb-2">
                            <h4 className="text-[10px] font-semibold text-white/80 uppercase tracking-[0.2em]">Solution Navigator</h4>
                            <p className="text-white text-lg font-bold leading-normal mt-1">Explore Core Expertise</p>
                        </div> */}
                        <div className="space-y-1 p-2">
                            {services.map((s, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => scrollToService(idx)}
                                    className={`w-full text-left px-5 py-4 rounded-xl text-[13px] font-semibold transition-all duration-300 flex items-center gap-4 group active:scale-[0.98] ${activeIndex === idx
                                        ? "bg-sky-50 text-sky-600 shadow-sm"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-sky-500"
                                        }`}
                                >
                                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-semibold transition-all shrink-0 ${activeIndex === idx
                                        ? "bg-sky-500 text-white shadow-lg shadow-sky-200"
                                        : "bg-slate-100 text-slate-400 group-hover:bg-sky-100 group-hover:text-sky-500"
                                        }`}>
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <span className="leading-normal overflow-hidden text-ellipsis whitespace-nowrap  tracking-wider">
                                        {s?.title || s?.name || `Service ${idx + 1}`}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Cards Stack (Right Side) */}
                    <div className="flex-1 w-full space-y-8">
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
