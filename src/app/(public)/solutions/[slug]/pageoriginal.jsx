import React from 'react';
import { notFound } from 'next/navigation';

// Importing All Dynamic Components
import SolutionsHero from '@/components/public/solutions/SolutionsHero';
import SolutionsStats from '@/components/public/solutions/SolutionsStats';
import SolutionsContentSplit from '@/components/public/solutions/SolutionsContentSplit';
import SolutionsFeatureGrid from '@/components/public/solutions/SolutionsFeatureGrid';
import AwardsSection from '@/components/common/AwardsSection';
import SolutionsWhyNeed from '@/components/public/solutions/SolutionsWhyNeed';
import SolutionsServicesList from '@/components/public/solutions/SolutionsServicesList';
import SolutionsAppModule from '@/components/public/solutions/SolutionsAppModule';
import SolutionsAICapabilities from '@/components/public/solutions/SolutionsAICapabilities';
import SolutionsPortfolio from '@/components/public/solutions/SolutionsPortfolio';
import SolutionsProcess from '@/components/public/solutions/SolutionsProcess';
import SolutionsTechStack from '@/components/public/solutions/SolutionsTechStack';
import SolutionsMonetization from '@/components/public/solutions/SolutionsMonetization';
import SolutionsSecurity from '@/components/public/solutions/SolutionsSecurity';

import FAQAccordion from '@/components/common/Faqaccordion';
import DynamicPortfolioCard from '@/components/ui/DynamicPortfolioCard';
import ConsultationCTA from '@/components/common/Consultation-Cta';


// --- MOCK DATABASE (Full Data Structure) ---
const getPageData = (slug) => {
    // Example for 'educational-app' slug
    if (slug === 'educational-app') {
        return {
            slug: 'educational-app',
            title: 'Educational App Development',
            sections: {
                hero: {
                    badge: "Trusted by 500+ Schools",
                    title: "Your Knowledge,",
                    highlight: "At Your Own Way.",
                    description: "Launch your own branded learning app with live classes, recorded lectures, and PDF notes. Fully customizable and white-label.",
                    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
                },
                stats: {
                    items: [
                        { value: "1M+", label: "Downloads" },
                        { value: "4.8", label: "App Rating" },
                        { value: "200+", label: "Clients" },
                        { value: "24/7", label: "Support" }
                    ]
                },
                intro: {
                    title: "A Platform That Changes Learning",
                    description: "We provide a seamless learning experience with our advanced LMS solution. It handles everything from student registration to certification.",
                    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
                    listItems: [
                        "Live Interactive Classes",
                        "Automated Attendance System",
                        "Fee Management & Payroll",
                        "Online Exams & Results"
                    ],
                    pill: "Smart LMS"
                },
                // features

                features: {
                    title: "Our App Development",
                    highlight: "Services",
                    subtitle: "End-to-end solutions for startups and enterprises.",
                    items: [
                        {
                            title: "iOS App Development",
                            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300", description: "Interactive live streaming with chat and polls.",
                            description: "Native iOS apps built with Swift for peak performance and best user experience on Apple devices."
                        },
                        {
                            title: "Android App Development",
                            image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300", description: "Download videos and notes to study without internet.",
                            description: "Scalable Android applications using Kotlin and Java that run smoothly on all devices."
                        },
                        {
                            title: "Cross-Platform Apps",
                            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=300", description: "End-to-end encryption for all student data.",
                            description: "Save cost and time with Flutter & React Native apps that work on both iOS and Android."
                        },
                        { title: "Live Classes", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300", description: "Interactive live streaming with chat and polls." },
                        { title: "Offline Mode", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300", description: "Download videos and notes to study without internet." },
                        { title: "Secure Data", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=300", description: "End-to-end encryption for all student data." },
                        // ... add more items up to 9
                    ]
                },
                whyNeed: {
                    title: "Why Invest in an Education App?",
                    subtitle: "Digital learning is the future. Don't get left behind.",
                    items: [
                        { title: "Global Reach", description: "Teach students from anywhere in the world.", icon: "Globe" },
                        { title: "Higher Engagement", description: "Gamified learning keeps students motivated.", icon: "Zap" },
                        { title: "Cost Effective", description: "Reduce infrastructure costs significantly.", icon: "TrendingUp" },
                        { title: "Data Insights", description: "Track student performance with analytics.", icon: "BarChart" }
                    ]
                },
                servicesList: {
                    title: "Tailored Solutions",
                    subtitle: "Choose the platform that fits your business model.",
                    tabs: [
                        {
                            label: "Customer App",
                            heading: "User-Friendly Customer App",
                            description: "Give your customers a seamless ordering experience with a native mobile app designed for higher conversion rates.",
                            image: "/images/placeholder2.png",
                            isWeb: false, // Mobile Frame
                            items: [
                                { icon: "Search", title: "Advanced Search", description: "Smart filters to find products quickly." },
                                { icon: "MapPin", title: "Live Tracking", description: "Real-time order tracking on map." },
                                { icon: "CreditCard", title: "Secure Payments", description: "Multiple payment gateways integrated." },
                                { icon: "Bell", title: "Push Notifications", description: "Instant updates on order status." },
                                { icon: "Star", title: "Ratings & Reviews", description: "Build trust with user feedback." }
                            ]
                        },
                        {
                            label: "Admin Panel",
                            heading: "Powerful Admin Dashboard",
                            description: "Control your entire business from a single robust dashboard. Analytics, management, and reports in one place.",
                            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
                            isWeb: true, // Laptop/Web Frame
                            items: [
                                { icon: "BarChart", title: "Analytics Dashboard", description: "View sales, orders, and growth graphs." },
                                { icon: "Users", title: "User Management", description: "Manage customers and vendors easily." },
                                { icon: "Settings", title: "Content CMS", description: "Update banners and text instantly." }
                            ]
                        },
                        // Add Vendor App etc...
                    ]
                },
                userApp: {
                    tag: "For Students",
                    title: "Student Learning App",
                    description: "A feature-rich mobile app for students to access courses, take tests, and track progress.",
                    features: ["Video Lectures", "Practice Tests", "Doubt Solving", "Performance Reports"],
                    image: "/images/placeholder.png",
                    isWeb: false
                },

                // Inside getPageData function
                aiCapabilities: {
                    title: "AI-Powered",
                    highlight: "Capabilities",
                    subtitle: "Integrate next-gen intelligence into your applications.",
                    items: [
                        {
                            title: "Predictive Analytics",
                            description: "Forecast trends and user behavior with high accuracy using machine learning models.",
                            points: ["Data Forecasting", "Trend Analysis", "Risk Assessment", "User Segmentation"],
                            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800"
                        },
                        {
                            title: "AI Chatbots",
                            description: "Automate customer support with 24/7 intelligent conversational agents.",
                            points: ["Natural Language Processing", "Instant Responses", "Multi-language", "Sentiment Analysis"],
                            image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800"
                        },
                        {
                            title: "Voice Recognition",
                            description: "Enable hands-free commands and voice search for better accessibility.",
                            points: ["Voice Search", "Speech to Text", "Voice Biometrics", "Command Control"],
                            image: "https://images.unsplash.com/photo-1589254065878-42c9da9e205b?auto=format&fit=crop&w=800"
                        },
                        {
                            title: "Image Recognition",
                            description: "Identify objects, faces, and text in images automatically.",
                            points: ["Face Detection", "OCR", "Object Tracking", "Visual Search"],
                            image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800"
                        }
                    ]
                },

                process: {
                    steps: [
                        { title: "Discovery", description: "We analyze your requirements." },
                        { title: "Design", description: "Creating intuitive UI/UX." },
                        { title: "Development", description: "Coding with scalable tech." },
                        { title: "Launch", description: "Deploying to App Stores." }
                    ]
                },

                techStack: {
                    title: "Our Technology",
                    highlight: "Stack",
                    subtitle: "We use the latest frameworks and technologies to build scalable solutions.",
                    tabs: [
                        {
                            label: "Mobile",
                            items: [
                                { name: "Flutter", image: "https://cdn.worldvectorlogo.com/logos/flutter.svg" },
                                { name: "React Native", image: "https://cdn.worldvectorlogo.com/logos/react-native-1.svg" },
                                { name: "Swift", image: "https://cdn.worldvectorlogo.com/logos/swift-15.svg" },
                                { name: "Kotlin", image: "https://cdn.worldvectorlogo.com/logos/kotlin-1.svg" }
                            ]
                        },
                        {
                            label: "Frontend",
                            items: [
                                { name: "React.js", image: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
                                { name: "Next.js", image: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
                                { name: "Vue.js", image: "https://cdn.worldvectorlogo.com/logos/vue-9.svg" },
                                { name: "Tailwind", image: "https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg" }
                            ]
                        },
                        {
                            label: "Backend",
                            items: [
                                { name: "Node.js", image: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
                                { name: "Python", image: "https://cdn.worldvectorlogo.com/logos/python-5.svg" },
                                { name: "Laravel", image: "https://cdn.worldvectorlogo.com/logos/laravel-2.svg" }
                            ]
                        },
                        {
                            label: "Database",
                            items: [
                                { name: "MongoDB", image: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg" },
                                { name: "MySQL", image: "https://cdn.worldvectorlogo.com/logos/mysql-6.svg" },
                                { name: "PostgreSQL", image: "https://cdn.worldvectorlogo.com/logos/postgresql.svg" },
                                { name: "Firebase", image: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg" }
                            ]
                        },
                        {
                            label: "Cloud & DevOps",
                            items: [
                                { name: "AWS", image: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
                                { name: "Docker", image: "https://cdn.worldvectorlogo.com/logos/docker.svg" },
                                { name: "Google Cloud", image: "https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg" }
                            ]
                        }
                    ]
                },

                // Inside getPageData in page.jsx

                monetization: {
                    title: "Revenue & Monetization",
                    highlight: "Models",
                    subtitle: "Explore different ways to generate revenue from your application.",
                    models: [
                        {
                            title: "In-App Purchases",
                            description: "Allow users to buy virtual goods, premium features, or extra content directly within the app.",
                            points: ["Consumable Items", "Non-consumable Features", "Unlockable Levels", "Virtual Currency"]
                        },
                        {
                            title: "Subscription Model",
                            description: "Generate recurring revenue by charging users a weekly, monthly, or annual fee for access.",
                            points: ["Recurring Billing", "Free Trials", "Tiered Plans (Basic/Pro)", "Exclusive Content Access"]
                        },
                        {
                            title: "Advertisement",
                            description: "Monetize free users by displaying banner, interstitial, or rewarded video ads.",
                            points: ["Google AdMob Integration", "Rewarded Videos", "Native Banners", "Sponsorship Deals"]
                        },
                        {
                            title: "Commission Based",
                            description: "Charge a percentage fee for every transaction or service booked through your platform.",
                            points: ["Transaction Fees", "Service Charges", "Vendor Commissions", "Payout Management"]
                        },
                        {
                            title: "Freemium Model",
                            description: "Offer basic features for free and charge for advanced capabilities.",
                            points: ["Limited Free Access", "Premium Upgrades", "Watermark Removal", "Priority Support"]
                        }
                    ]
                },
                // Inside getPageData in page.jsx

                whyChoose: {
                    title: "Why Choose Softkingo",
                    highlight: "for App Development",
                    subtitle: "We deliver excellence through agile methodology and robust technology.",
                    items: [
                        {
                            icon: "ShieldCheck",
                            title: "Secure & Scalable",
                            description: "We build apps with bank-grade security and cloud architecture that grows with your user base.",
                            points: ["GDPR Compliant", "End-to-End Encryption", "AWS Cloud Infrastructure", "DDoS Protection"]
                        },
                        {
                            icon: "Zap",
                            title: "High Performance",
                            description: "Optimized coding practices ensure your app loads under 2 seconds and runs smoothly on all devices.",
                            points: ["Native Performance", "Clean Code Architecture", "CDN Integration", "Lazy Loading"]
                        },
                        {
                            icon: "Users",
                            title: "User-Centric Design",
                            description: "Our UI/UX designers create intuitive interfaces that boost engagement and retention rates.",
                            points: ["Intuitive Navigation", "Dark Mode Support", "Accessibility Standards", "Interactive Animations"]
                        },
                        {
                            icon: "Headphones",
                            title: "24/7 Support",
                            description: "We don't just build; we support. Get dedicated technical support and maintenance post-launch.",
                            points: ["Dedicated Project Manager", "Real-time Bug Fixes", "Regular Updates", "SLA Guarantee"]
                        }
                    ]
                },
                cta: {
                    title: "Ready to launch your Education App?",
                    subtitle: "Get a free consultation and quote today. We help you go live in 14 days.",
                    btnText: "Book Free Consultation"
                },

                faq: {
                    title: "Frequently Asked Questions",
                    subtitle: "Have questions? We've got answers. Look through our most asked questions.",
                    items: [
                        {
                            id: 1,
                            q: " How do you ensure the security and quality of the app or software you develop?",
                            a: "At Softkingo, security and quality aren’t afterthoughts—they’re part of our foundation. From day one, we take deliberate steps to make sure your software is secure, stable, and built to last. We begin every project by signing a Non-Disclosure Agreement (NDA), ensuring that your ideas, data, and business details stay completely confidential. On the security front, our developers follow secure coding standards and implement strong data protection practices from the initial development phase. Depending on your industry, we align your solution with global compliance standards such as GDPR, HIPAA, and PCI DSS. We also use advanced security measures like data encryption, multi-factor authentication, role-based access control, and frequent code reviews to reduce risks and prevent vulnerabilities. To maintain high quality, we embed a comprehensive QA process into our Agile workflow. Every app or software solution goes through extensive testing, including manual and automated testing, functionality checks, usability testing, performance optimization, and security testing. Even after launch, we don’t step away. We conduct regular vulnerability assessments, third-party security audits, and continuous monitoring to keep your product safe and efficient. Our QA and development teams work closely together to quickly resolve bugs, performance issues, or user concerns—both during development and post-deployment."
                        },
                        {
                            id: 2,
                            q: "How do you ensure a seamless user experience in your designs?",
                            a: "Delivering a smooth and intuitive user experience is a top priority for us. Our design process starts with detailed user research and competitor analysis so we can truly understand your audience, their expectations, and their challenges. Our UI/UX designers focus on simplicity, consistency, and ease of use. We follow the latest design trends and strictly adhere to platform-specific guidelines to ensure your app feels familiar and intuitive to users from the first interaction. Before finalizing any design, we create wireframes and interactive prototypes. These allow us to test usability early and gather feedback from stakeholders, helping us refine the experience before development begins. At Softkingo, our goal is to create designs that are not only visually appealing but also practical and user-friendly—experiences that users enjoy and businesses can rely on."
                        },
                        {
                            id: 3,
                            q: "What makes Softkingo the best software and mobile app development company?",
                            a: "Softkingo stands out because of our proven experience, strong technical expertise, and passion for innovation. Our team of 50+ skilled professionals—including developers, designers, and industry experts—works collaboratively to deliver solutions that truly make an impact. We’ve successfully completed 400+ projects for over 350+ clients across the globe. Our expertise covers mobile app development (iOS, Android, and hybrid), IoT solutions, AI-powered platforms, marketplaces, and custom software development. Our portfolio includes high-profile projects like LocalLove’s, Guidly, Moglix, and Fitify all of which have achieved excellent user engagement and commercial success. We’ve also helped startups turn ideas into thriving products. Platforms such as Ezydash, Fitify, and Lovelocal were built with scalability in mind, helping founders secure funding and compete effectively in their markets. Our work has earned industry recognition as well. Softkingo has been listed among the Top 100 Mobile App Development Companies by Clutch, received the Best App Development Company award in 2022, and was recently awarded Top Mobile App Development Company in India in 2025 by Tech Behemoths. In addition, we provide staff augmentation services, allowing businesses to quickly scale their teams with vetted experts and round-the-clock support—ensuring smooth collaboration across time zones."
                        },
                        {
                            id: 4,
                            q: "What software development services do you offer?",
                            a: "With over 6+ years of experience, Softkingo delivers robust and scalable digital solutions to businesses worldwide. We’ve successfully completed 400+ projects across 25+ countries, offering end-to-end custom software development services, including: Software Consulting, Custom Software Development, Enterprise Software Development, Software Product Development, Software Integration, Custom CRM Development, API Development, and ERP Software Development. We follow Agile development methodologies to ensure faster delivery and better adaptability. By dividing projects into smaller sprints, we enable continuous feedback and greater transparency throughout the development lifecycle. To meet diverse business needs, we also offer flexible engagement models—dedicated development teams, hourly hiring, and fixed-cost projects—so you can scale resources as your project evolves."
                        },
                        {
                            id: 5,
                            q: "Do you offer post-launch support and maintenance?",
                            a: "Yes, absolutely. Post-launch support and maintenance are an essential part of our services. We ensure your app continues to perform smoothly, stays secure, and evolves with changing technologies. Our app maintenance services include: Technology-based software upgrades, Automated backups, Issue tracking and resolution, Ongoing bug fixes and support, Performance optimization, Security updates, Version upgrades, User support, and Continuous performance monitoring. Our experts proactively monitor your application, address technical challenges, and implement improvements to ensure a seamless user experience long after launch."
                        },
                        {
                            id: 6,
                            q: "Do you offer a free consultation or project estimate?",
                            a: "Yes, we do. We offer a completely free initial consultation and project estimate to help you move forward with confidence. During the consultation, we take time to understand your business objectives, target audience, technical needs, and long-term goals. Based on this discussion, we provide a customized project roadmap along with a transparent cost and timeline estimate—at no cost to you. If you’re ready to bring your idea to life, get in touch with us today and let’s start building something great together."
                        },
                        {
                            id: 7,
                            q: "Can you integrate AI or other emerging technologies into my app?",
                            a: "Yes, we specialize in integrating AI and emerging technologies into mobile and web applications to help businesses stay competitive and future-ready. Our team can integrate AI-driven features such as chatbots, predictive analytics, natural language processing (NLP), facial recognition, and recommendation systems. We stay updated with the latest advancements and use reliable frameworks and APIs to ensure seamless integration with your existing infrastructure. Whether you have a clear idea or are exploring possibilities, our AI experts are here to help you build smarter, next-generation applications."
                        },
                        {
                            id: 8,
                            q: "What is the average cost and timeline for developing a mobile app?",
                            a: "The cost and timeline of mobile app development depend on multiple factors, including app complexity, features, platform selection, design requirements, and integrations. A simple app with basic functionality typically costs between $10,000 and $30,000. More complex apps with advanced features generally range from $30,000 to $50,000 or higher. In terms of timelines, simple apps can be completed within 2 to 3 months, while complex applications may take 6 to 9 months, depending on scope and requirements. Since every project is unique, we recommend connecting with our experts for a personalized consultation. We’ll provide a detailed cost and timeline estimate tailored specifically to your vision."
                        },
                        {
                            id: 9,
                            q: "What mobile app development services do you offer?",
                            a: "As a globally recognized development company, we offer complete mobile app development services, including: Custom App Development, iOS App Development, Android App Development, Flutter App Development, React Native App Development, Web App Development, Progressive Web App (PWA) Development, Healthcare App Development, AI/ML App Development, AR/VR App Development, dApp Development, IoT App Development, Wearable App Development, and Dating App Development. At Softkingo, we believe in building long-term partnerships. From ideation to launch and ongoing support, we stay involved at every stage. By combining strategic planning, agile execution, and continuous improvement, we deliver products that drive real business value."
                        },
                        {
                            id: 10,
                            q: "How do you handle project management and communication?",
                            a: "We follow a transparent and client-centric approach to ensure smooth project execution and clear communication at every stage. Our teams work using Agile project management methodologies, breaking projects into manageable sprints. This allows us to remain flexible and quickly adapt to changing requirements or priorities. For communication, we use dedicated channels such as Slack, Zoom, Microsoft Teams, and email. Each project is assigned a dedicated project manager who serves as your single point of contact. We also provide real-time project tracking through tools like Jira, Trello, and Asana, giving you full visibility into progress and keeping you involved throughout the development journey."
                        }
                    ]
                },
            }
        };
    }
    return null;
};

// FIX 1: generateMetadata with await
export async function generateMetadata(props) {
    const params = await props.params;
    const data = getPageData(params.slug);
    if (!data) return { title: 'Not Found' };
    return {
        title: `${data.title} | Softkingo`,
        description: data.sections.hero.description,
    };
}

// FIX 2: Page Component with await
export default async function DynamicSolutionPage(props) {
    const params = await props.params;
    const data = getPageData(params.slug);

    if (!data) return notFound();

    const { hero, stats, intro, features, whyNeed, servicesList, userApp, aiCapabilities, portfolio, process, techStack, monetization, whyChoose, cta, faq } = data.sections;

    return (
        <main className="min-h-screen bg-white">
            {/* 1. Hero Section */}
            <SolutionsHero data={hero} />

            {/* 2. Stats Banner */}
            <SolutionsStats data={stats} />

            {/* 3. Intro Section (Text Left, Form Right) */}
            <SolutionsContentSplit data={intro} reverse={false} />

            {/* 4. Feature Grid (Why Choose Us) */}
            <SolutionsFeatureGrid data={features} />

            {/* 5. Awards Section */}
            <AwardsSection />

            {/* --- NEW SECTIONS SEQUENCE --- */}

            {/* 6. Why Businesses Need a Custom App */}
            <SolutionsWhyNeed data={whyNeed} />

            {/* 7. Our App Development Solutions */}
            <SolutionsServicesList data={servicesList} />

            {/* 8. User App Features */}
            <SolutionsAppModule data={userApp} reverse={true} bg="white" />


            {/* 9. AI-Powered & Smart App Capabilities */}
            <SolutionsAICapabilities data={aiCapabilities} />

            {/* 10 */}
            <DynamicPortfolioCard category=""
                portfolioType="app"
                title="Our App Development Portfolio"
                subtitle="" />

            {/* 11. How We Build Your App */}
            <SolutionsProcess data={process} />

            {/* 12. Technology Stack We Use */}
            <SolutionsTechStack data={techStack} />

            {/* 13. Revenue & Monetization Models */}
            <SolutionsMonetization data={monetization} />

            {/* 14. Security, Scalability & Performance */}
            <SolutionsSecurity data={whyChoose} />
            {/* 15 */}
            <ConsultationCTA
                title="Book A FREE Consultation With Us"
                subtitle="Share your project idea and we’ll provide a free consultation on how we will turn it into reality and an amazing digital product."
                buttonLabel="Book a Free Demo"
                href="/contact"
                imageSrc="/images/cta/cta-img.png"
            />
            {/* 16. FAQ */}
            <FAQAccordion data={faq} />



        </main>
    );
}