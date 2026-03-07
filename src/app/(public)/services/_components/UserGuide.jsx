"use client";

import React, { useState, useEffect } from "react";
import CommonTitle from "@/components/ui/CommonTitle";

const UserGuide = ({ data }) => {
    const [activeTab, setActiveTab] = useState("");

    // Use dynamic data if available, otherwise fallback to static content
    const rawSections = data?.sections || [
        {
            id: "what-is",
            title: "What is Mobile App Development?",
            description: "Mobile application development is the process of making software for smartphones, tablets and digital assistants, most commonly for the Android and iOS operating systems. The software can be preinstalled on the device, downloaded from a mobile app store or accessed through a mobile web browser. It involves various stages, including:",
            subSections: [
                {
                    title: "Idea Generation",
                    bullets: ["Identifying a specific need or problem that the mobile app aims to address.", "Clearly defining the app's purpose and outlining its features."]
                },
                {
                    title: "App Design:",
                    bullets: ["Conceptualizing and outlining the essential features and functionalities of the app", "Crafting detailed wireframes and designing the user interface (UI) and user experience (UX)."]
                },
                {
                    title: "Development",
                    bullets: ["Writing code to bring the app to life, utilizing programming languages such as Swift for iOS or Kotlin/Java for Android."]
                },
                {
                    title: "Testing",
                    bullets: ["Rigorously ensuring the app's functionality and performance meet established standards.", "Conducting thorough testing to identify and address any potential issues or bugs."]
                },
                {
                    title: "Deployment",
                    bullets: ["Publishing the completed app on major platforms like the Apple App Store or Google Play, making it accessible to users."]
                },
                {
                    title: "Maintenance",
                    bullets: ["On-going efforts to provide updates and support for the app.", "Addressing bugs, incorporating new features, and ensuring compatibility with the latest operating systems."]
                }
            ]
        },
        {
            id: "key-components",
            title: "What are the key components of a Mobile App?",
            description: "A mobile app typically consists of several key components:",
            subSections: [
                {
                    title: "User Interface (UI):",
                    bullets: ["Components: Buttons, menus, screens, icons, and other elements users interact with.", "Purpose: Facilitate smooth navigation and usage of the app.", "Importance: A clear and intuitive UI is crucial for user satisfaction and app adoption."]
                },
                {
                    title: "User Experience (UX):",
                    bullets: ["Integrated Approach: Covers design, usability, accessibility, performance, and emotional impact, taking into account all essential elements.", "Goal: Create a seamless, enjoyable, and efficient interaction with the app.", "Impact: A positive UX can lead to increased engagement, loyalty, and brand reputation."]
                },
                {
                    title: "Functionality:",
                    bullets: ["Features: The diverse capabilities and functionalities of the app to fulfill its intended purpose.", "Examples: Booking appointments, making purchases, accessing information, sharing content, etc.", "Importance: Functionality should be relevant, reliable, and cater to user needs."]
                },
                {
                    title: "Backend Services:",
                    bullets: ["Server-side components: Oversee vital functions such as data storage, retrieval, processing, and other operations crucial to the app's functionality.", "Illustrations: Instances such as user accounts, processing payments, managing databases, and interacting with external services, among others.", "Importance: Robust backend services ensure efficient app performance and scalability."]
                },
                {
                    title: "Database:",
                    bullets: ["Secure storage: Organizes and protects app-related data like user information, content, and preferences."]
                }
            ]
        },
        {
            id: "platforms",
            title: "What are the different mobile platforms on which mobile apps can be built?",
            description: "Mobile apps are primarily built for two major platforms:",
            subSections: [
                {
                    title: "iOS (Apple)",
                    bullets: ["The operating system used exclusively for Apple devices like iPhone and iPad. Development typically uses Swift or Objective-C."]
                },
                {
                    title: "Android (Google)",
                    bullets: ["An open-source operating system used by various manufacturers like Samsung, Google (Pixel), and others. Development typically uses Kotlin or Java."]
                }
            ]
        },
        {
            id: "approaches",
            title: "What are the different development approaches (native, hybrid, and cross-platform)?",
            description: "",
            subSections: [
                {
                    title: "Native Development",
                    bullets: ["Building separate apps for each platform using platform-specific languages (e.g., Swift for iOS, Kotlin for Android). Offers best performance and access to all device features."]
                },
                {
                    title: "Cross-Platform Development",
                    bullets: ["Using a single codebase to create apps for multiple platforms (e.g., React Native, Flutter). Efficient for faster development and consistent UI."]
                },
                {
                    title: "Hybrid Development",
                    bullets: ["Web applications wrapped in a native container (e.g., Ionic). Essentially websites that function like apps."]
                }
            ]
        }
    ];

    const sections = rawSections.map((section, index) => ({
        id: section.id || `section-${index}`,
        title: section.title,
        content: (
            <div className="space-y-4">
                {section.description && (
                    <p className="text-gray-600 leading-relaxed">
                        {section.description}
                    </p>
                )}
                <div className="space-y-6">
                    {section.subSections?.map((sub, sIdx) => (
                        <div key={sIdx}>
                            {sub.title && <h4 className="font-bold text-gray-800 mb-2">{sub.title}</h4>}
                            <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                {sub.bullets?.map((bullet, bIdx) => (
                                    <li key={bIdx}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        )
    }));

    useEffect(() => {
        if (sections.length > 0) {
            setActiveTab(sections[0].id);
        }
    }, [data]);

    if (sections.length === 0) return null;

    const activeSection = sections.find((s) => s.id === activeTab) || sections[0];

    return (
        <section className="bg-white py-16 px-4 md:px-6 lg:px-12" id="user-guide">
            <div className="max-w-7xl mx-auto">
                <CommonTitle
                    align="center"
                    pill={false}
                    title={data?.title || "Mobile App Development"}
                    gradientText={data?.subtitle || "User Guide"}
                    subtitle={data?.description || "Everything you need to know about the mobile app development journey."}
                />

                <div className="mt-12 flex flex-col lg:flex-row gap-8 lg:gap-16">
                    {/* Sidebar Navigation */}
                    <aside className="lg:w-1/3 lg:sticky lg:top-24 h-fit">
                        <nav className="space-y-1">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveTab(section.id)}
                                    className={`w-full text-left px-4 py-4 rounded-lg text-sm font-medium transition-all duration-200 border-l-4 ${activeTab === section.id
                                        ? "bg-sky-50 text-sky-600 border-sky-500 shadow-sm"
                                        : "text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-800"
                                        }`}
                                >
                                    {section.title}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content Area */}
                    <main className="lg:w-2/3 min-h-[400px]">
                        <div className="bg-gray-50/50 rounded-2xl p-6 md:p-10 border border-gray-100 shadow-sm animate-fadeIn">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                                {activeSection.title}
                            </h3>
                            <div className="prose prose-sky max-w-none">
                                {activeSection.content}
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </section>
    );
};

export default UserGuide;
