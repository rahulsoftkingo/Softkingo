"use client"
import { useState } from "react";
import {
    FiEye, FiLayout, FiCode, FiCpu, FiCheckCircle, FiSettings
} from "react-icons/fi";

export default function MethodologySection() {
    const [hoveredStep, setHoveredStep] = useState(null);

    const methodologySteps = [
        {
            id: 1,
            title: "Validation of Idea",
            description: "First of all we carry an in-depth validation of the mobile app idea, based on behavioral patterns and target audience.",
            icon: FiEye,
            color: "#3B82F6"
        },
        {
            id: 2,
            title: "App Wireframing",
            description: "We visualize the app idea via app wireframing and present the exact user journey of target users, based on the business needs.",
            icon: FiLayout,
            color: "#06B6D4"
        },
        {
            id: 3,
            title: "App Development",
            description: "Once a prototype is approved, we develop the app based on human-centric design and best practices of Android and iOS platforms.",
            icon: FiCode,
            color: "#8B5CF6"
        },
        {
            id: 4,
            title: "App Prototype",
            description: "Based on wireframe and the feedback, we will develop a prototype of the mobile app by using advanced tools and software.",
            icon: FiCpu,
            color: "#10B981"
        },
        {
            id: 5,
            title: "Testing & QA",
            description: "Based on the responsiveness, stability, and scalability, we rigorously test the mobile app to ensure a seamless user experience.",
            icon: FiCheckCircle,
            color: "#F59E0B"
        },
        {
            id: 6,
            title: "Go-Live & Maintenance",
            description: "Once the mobile app is live on the app stores, we will assist you in maintaining the app, and optimizing its performance.",
            icon: FiSettings,
            color: "#EF4444"
        }
    ];

    return (
        <section className="bg-gradient-to-br from-[#1a1b2e] via-[#252641] to-[#1a1b2e] py-12 md:py-16 lg:py-20 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16 lg:mb-20">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                        Our Methodology For Developing Mobile Apps
                    </h2>
                    <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed text-sm md:text-base lg:text-lg px-4">
                        We understand that ensuring a seamless user experience is the key to success for any mobile app.
                        This is the reason our mobile app development company has deployed a human-centric approach
                        combined with a sharp technological push for developing mobile apps.
                    </p>
                </div>

                {/* Methodology Flow */}
                <div className="relative px-0 lg:px-12">
                    {/* Dashed Line Path - Desktop Only */}
                    <svg
                        className="hidden lg:block absolute top-0 left-0 w-full h-full pointer-events-none"
                        style={{ zIndex: 0 }}
                        viewBox="0 0 1200 1000"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: "#3B82F6", stopOpacity: 0.7 }} />
                                <stop offset="50%" style={{ stopColor: "#06B6D4", stopOpacity: 0.7 }} />
                                <stop offset="100%" style={{ stopColor: "#8B5CF6", stopOpacity: 0.7 }} />
                            </linearGradient>
                        </defs>
                        <path
                            d="M 200,80 L 1000,80 Q 1100,80 1100,180 Q 1100,280 1100,380 L 1100,380 Q 1100,480 1000,480 L 200,480 Q 100,480 100,580 Q 100,680 100,780 L 100,780 Q 100,880 200,880 L 1000,880"
                            stroke="url(#lineGradient)"
                            strokeWidth="3"
                            strokeDasharray="12,8"
                            fill="none"
                            className="animate-dash"
                        />
                    </svg>

                    {/* Steps Grid */}
                    <div className="space-y-16 md:space-y-24 lg:space-y-40">
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
                            {methodologySteps.slice(0, 2).map((step) => (
                                <div
                                    key={step.id}
                                    className="flex flex-col items-center text-center transition-all duration-300"
                                    onMouseEnter={() => setHoveredStep(step.id)}
                                    onMouseLeave={() => setHoveredStep(null)}
                                >
                                    <div
                                        className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-6 md:mb-8 transition-all duration-300 ${
                                            hoveredStep === step.id ? 'scale-110 shadow-2xl' : 'shadow-lg'
                                        }`}
                                        style={{
                                            backgroundColor: hoveredStep === step.id ? step.color : '#374151',
                                            boxShadow: hoveredStep === step.id
                                                ? `0 0 40px ${step.color}`
                                                : '0 10px 25px rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        <step.icon
                                            className="w-10 h-10 md:w-12 md:h-12 text-white transition-transform duration-300"
                                            style={{
                                                transform: hoveredStep === step.id ? 'scale(1.2)' : 'scale(1)'
                                            }}
                                        />
                                    </div>

                                    <div className="max-w-md px-4">
                                        <h3
                                            className={`text-xl md:text-2xl font-bold mb-3 md:mb-4 transition-colors duration-300 ${
                                                hoveredStep === step.id ? 'text-cyan-400' : 'text-white'
                                            }`}
                                        >
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
                            {methodologySteps.slice(2, 4).map((step) => (
                                <div
                                    key={step.id}
                                    className="flex flex-col items-center text-center transition-all duration-300"
                                    onMouseEnter={() => setHoveredStep(step.id)}
                                    onMouseLeave={() => setHoveredStep(null)}
                                >
                                    <div
                                        className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-6 md:mb-8 transition-all duration-300 ${
                                            hoveredStep === step.id ? 'scale-110 shadow-2xl' : 'shadow-lg'
                                        }`}
                                        style={{
                                            backgroundColor: hoveredStep === step.id ? step.color : '#374151',
                                            boxShadow: hoveredStep === step.id
                                                ? `0 0 40px ${step.color}`
                                                : '0 10px 25px rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        <step.icon
                                            className="w-10 h-10 md:w-12 md:h-12 text-white transition-transform duration-300"
                                            style={{
                                                transform: hoveredStep === step.id ? 'scale(1.2)' : 'scale(1)'
                                            }}
                                        />
                                    </div>

                                    <div className="max-w-md px-4">
                                        <h3
                                            className={`text-xl md:text-2xl font-bold mb-3 md:mb-4 transition-colors duration-300 ${
                                                hoveredStep === step.id ? 'text-cyan-400' : 'text-white'
                                            }`}
                                        >
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
                            {methodologySteps.slice(4, 6).map((step) => (
                                <div
                                    key={step.id}
                                    className="flex flex-col items-center text-center transition-all duration-300"
                                    onMouseEnter={() => setHoveredStep(step.id)}
                                    onMouseLeave={() => setHoveredStep(null)}
                                >
                                    <div
                                        className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-6 md:mb-8 transition-all duration-300 ${
                                            hoveredStep === step.id ? 'scale-110 shadow-2xl' : 'shadow-lg'
                                        }`}
                                        style={{
                                            backgroundColor: hoveredStep === step.id ? step.color : '#374151',
                                            boxShadow: hoveredStep === step.id
                                                ? `0 0 40px ${step.color}`
                                                : '0 10px 25px rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        <step.icon
                                            className="w-10 h-10 md:w-12 md:h-12 text-white transition-transform duration-300"
                                            style={{
                                                transform: hoveredStep === step.id ? 'scale(1.2)' : 'scale(1)'
                                            }}
                                        />
                                    </div>

                                    <div className="max-w-md px-4">
                                        <h3
                                            className={`text-xl md:text-2xl font-bold mb-3 md:mb-4 transition-colors duration-300 ${
                                                hoveredStep === step.id ? 'text-cyan-400' : 'text-white'
                                            }`}
                                        >
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
