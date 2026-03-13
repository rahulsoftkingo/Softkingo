'use client';

import Image from 'next/image';
import {
    HiOutlineDocumentText,
    HiOutlineLightBulb,
    HiOutlineCode,
    HiOutlineSparkles,
    HiOutlineRocketLaunch,
    HiOutlineCodeBracket
} from 'react-icons/hi2';

export default function FoodMethodology() {
    // Steps data
    const steps = [
        {
            id: 1,
            title: "Requirement & Analysis",
            icon: HiOutlineDocumentText,
            description: "Gathering client delivery needs"
        },
        {
            id: 2,
            title: "UI/UX Design",
            icon: HiOutlineLightBulb,
            description: "Creating intuitive design"
        },
        {
            id: 3,
            title: "App Development & Integration",
            icon: HiOutlineCodeBracket,
            description: "Building robust solutions"
        },
        {
            id: 4,
            title: "Testing & Quality Assurance",
            icon: HiOutlineSparkles,
            description: "Ensuring flawless performance"
        },
        {
            id: 5,
            title: "Deployment & Post-Launch Support",
            icon: HiOutlineRocketLaunch,
            description: "Launch and continuous support"
        }
    ];

    // Right side content data
    const requirements = [
        "Business Understanding",
        "Target Audience",
        "Feature List",
        "Competitor Analysis"
    ];

    return (
        <section className="max-w-7xl mx-auto py-8 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-500">
            <div className="">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Our Methodology For Developing a<br />Food Delivery App
                    </h2>
                </div>

                {/* Main Grid */}
                <div className="bg-white rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

                        {/* Left Side - How It Works */}
                        <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-cyan-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                                How It Works
                            </h3>
                            <p className="text-blue-100 text-sm mb-8 leading-relaxed">
                                Gathering client delivery needs just 7 days starts with the right process. We follow our team's dynamics and development methods for the best outcome.
                            </p>

                            {/* Steps Flow */}
                            <div className="space-y-2 sm:space-y-4">
                                {steps.map((step, index) => {
                                    const IconComponent = step.icon;
                                    return (
                                        <div key={step.id}>
                                            {/* Step */}
                                            <div className="flex items-center gap-4">
                                                <div className="flex-shrink-0 text-center w-16">
                                                    <span className="text-blue-200 text-xs font-bold">STEP</span>
                                                    <p className="text-white text-2xl font-bold leading-normal">
                                                        {String(step.id).padStart(2, '0')}
                                                    </p>
                                                </div>

                                                <div className="flex justify-between w-full items-center bg-blue-50/20 backdrop-blur-sm rounded-3xl px-4 py-3">
                                                    <p className="text-blue-50 font-medium text-sm sm:text-base">
                                                        {step.title}
                                                    </p>
                                                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg">
                                                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-700" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Connector - Only show if not last step */}
                                            {index < steps.length - 1 && (
                                                <div className="ml-8 border-l-2 border-dashed border-blue-300/30 h-6"></div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Side - Requirements */}
                        <div className=" hidden md:block  flex-col justify-center">
                            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                                    Requirement Analysis & Planning
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
                                    We start by understanding your business needs, target audience, and core features. This helps to build a clear and actionable development roadmap.
                                </p>

                                {/* Requirements List */}
                                <ul className="space-y-3">
                                    {requirements.map((req, index) => (
                                        <li key={index} className="flex items-center gap-3 text-gray-800">
                                            <div className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0"></div>
                                            <span className="text-sm sm:text-base font-medium">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
