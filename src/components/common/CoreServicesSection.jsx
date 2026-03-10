"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommonTitle from "@/components/ui/CommonTitle";

// ─── Default AI Services Data ────────────────────────────────────────────────
export const AI_SERVICES_DEFAULT = [
    {
        id: 1,
        title: "AI-Powered Application Development",
        description:
            "Intelligent web and mobile applications powered by artificial intelligence help businesses automate workflows, personalize user experiences, and improve operational efficiency. From recommendation engines to predictive dashboards, AI-driven apps transform raw data into actionable insights.",
        capabilities: [
            "Smart recommendation systems",
            "Predictive analytics dashboards",
            "Intelligent automation features",
            "Personalized user experiences",
        ],
        technologies: ["Python", "TensorFlow", "React", "Node.js", "AWS"],
    },
    {
        id: 2,
        title: "Custom AI Model Development",
        description:
            "Every business has unique data and unique challenges. Custom AI models are designed and trained specifically around your business objectives to deliver accurate predictions and reliable performance in real-world environments.",
        capabilities: [
            "Supervised & unsupervised learning models",
            "Deep learning solutions",
            "Predictive modeling & forecasting",
            "Model optimization & fine-tuning",
        ],
        technologies: ["PyTorch", "Scikit-Learn", "Keras", "Pandas", "GCP"],
    },
    {
        id: 3,
        title: "NLP & AI Chatbot Development",
        description:
            "Conversational AI solutions enhance customer engagement by delivering intelligent, context-aware responses. Advanced NLP-based chatbots can understand human language, manage queries efficiently, and integrate seamlessly with business systems.",
        capabilities: [
            "GPT-powered chatbots",
            "Context-aware conversations",
            "Multilingual communication",
            "Voice-enabled assistants",
            "CRM & API integration",
        ],
        technologies: ["OpenAI GPT", "LangChain", "Rasa", "Dialogflow", "Azure"],
    },
    {
        id: 4,
        title: "Machine Learning Solutions",
        description:
            "Machine learning systems analyze historical data to uncover patterns, predict outcomes, and support data-driven decision-making. These solutions help businesses reduce risks, improve efficiency, and increase profitability.",
        capabilities: [
            "Fraud detection systems",
            "Demand forecasting",
            "Customer segmentation",
            "Risk analysis models",
            "Predictive analytics",
        ],
        technologies: ["Spark", "Databricks", "XGBoost", "Airflow", "Snowflake"],
    },
    {
        id: 5,
        title: "Computer Vision Solutions",
        description:
            "Computer vision systems empower machines to interpret visual data from images and videos with high precision. Our CV solutions drive automation and intelligence across manufacturing, retail, security, and healthcare sectors.",
        capabilities: [
            "Object detection",
            "Image classification",
            "Facial recognition",
            "Video analytics",
            "Automated inspection systems",
        ],
        technologies: ["OpenCV", "YOLO", "MediaPipe", "TensorRT", "Azure Vision"],
    },
    {
        id: 6,
        title: "Generative AI Development",
        description:
            "Generative AI solutions create high-quality content, images, code, and digital assets automatically. These systems improve productivity, accelerate marketing processes, and enhance customer engagement strategies.",
        capabilities: [
            "AI content generation",
            "AI code assistants",
            "Image & media generation",
            "Automated documentation",
            "Marketing automation tools",
        ],
        technologies: ["GPT-4", "Stable Diffusion", "Midjourney API", "Claude", "Gemini"],
    },
    {
        id: 7,
        title: "AI Consulting & Strategy",
        description:
            "Strategic AI consulting helps identify the right use cases, define data strategies, and build a clear roadmap for successful implementation. A structured approach ensures that AI investments align with measurable business outcomes.",
        capabilities: [
            "AI readiness assessment",
            "Data strategy planning",
            "Use-case validation",
            "ROI estimation",
            "Implementation roadmap",
        ],
        technologies: ["Strategy Frameworks", "Data Auditing", "POC Development", "Risk Analysis"],
    },
    {
        id: 8,
        title: "AI Integration & Deployment",
        description:
            "Seamless integration ensures AI systems work smoothly within existing CRM, ERP, mobile, and enterprise platforms. Deployment strategies focus on performance, scalability, and long-term maintainability.",
        capabilities: [
            "API integration",
            "Cloud deployment",
            "CI/CD pipelines",
            "Performance monitoring",
            "Continuous optimization",
        ],
        technologies: ["Docker", "Kubernetes", "AWS SageMaker", "Azure ML", "GitHub Actions"],
    },
];

// ─── Tech Badge ───────────────────────────────────────────────────────────────
function TechBadge({ tech }) {
    return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-600 border border-sky-200">
            {tech}
        </span>
    );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ service, index }) {
    return (
        <motion.div
            id={`service-${service.id}`}
            className="bg-white rounded-2xl border border-sky-100 overflow-hidden group hover:shadow-xl hover:border-sky-200 transition-all duration-500"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            viewport={{ once: true, margin: "-80px" }}
        >
            {/* Card Header */}
            <div className="bg-[#0ea5e9] px-6 py-5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-sm shrink-0">
                        {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-white font-bold text-lg leading-tight">
                        {service.title}
                    </h3>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-5">
                <p className="text-slate-600 text-sm leading-relaxed">
                    {service.description}
                </p>

                {/* Capabilities */}
                {service.capabilities?.length > 0 && (
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Key capabilities
                        </p>
                        <ul className="space-y-1.5">
                            {service.capabilities.map((cap, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                                    {cap}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Technologies */}
                {service.technologies?.length > 0 && (
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Technologies We Use
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech, i) => (
                                <TechBadge key={i} tech={tech} />
                            ))}
                        </div>
                    </div>
                )}
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
    const [activeId, setActiveId] = useState(services[0]?.id || 1);
    const observer = useRef(null);
    const cardRefs = useRef({});

    // IntersectionObserver to sync sidebar highlight on scroll
    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = Number(entry.target.getAttribute("data-service-id"));
                        if (id) setActiveId(id);
                    }
                });
            },
            { threshold: 0.5, rootMargin: "-10% 0px -50% 0px" }
        );

        // Observe all cards
        Object.values(cardRefs.current).forEach((el) => {
            if (el) observer.current.observe(el);
        });

        return () => observer.current?.disconnect();
    }, [services]);

    const scrollToService = (id) => {
        const el = document.getElementById(`service-${id}`);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            setActiveId(id);
        }
    };

    return (
        <section id={sectionId} className={`${bgClass} py-16 lg:py-24`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <CommonTitle
                    align="center"
                    title={title}
                    subtitle={subtitle}
                />

                <div className="flex gap-6 lg:gap-10 mt-12 lg:mt-16 items-start">
                    {/* ── Left Sidebar Navigation — Sticky ── */}
                    <div className="hidden lg:block w-64 shrink-0 sticky top-24 self-start">
                        <div className="space-y-1">
                            {services.map((service, idx) => (
                                <button
                                    key={service.id}
                                    onClick={() => scrollToService(service.id)}
                                    onMouseEnter={() => scrollToService(service.id)}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3 group cursor-pointer ${activeId === service.id
                                        ? "bg-sky-500 text-white shadow-md shadow-sky-200"
                                        : "text-slate-600 hover:bg-sky-50 hover:text-sky-600"
                                        }`}
                                >
                                    <span
                                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${activeId === service.id
                                            ? "bg-white text-sky-500"
                                            : "bg-sky-100 text-sky-500 group-hover:bg-sky-500 group-hover:text-white"
                                            }`}
                                    >
                                        {idx + 1}
                                    </span>
                                    <span className="leading-tight">{service.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Right Cards Area ── */}
                    <div className="flex-1 min-w-0 space-y-6">
                        {services.map((service, idx) => (
                            <div
                                key={service.id}
                                data-service-id={service.id}
                                ref={(el) => { cardRefs.current[service.id] = el; }}
                            >
                                <ServiceCard service={service} index={idx} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
