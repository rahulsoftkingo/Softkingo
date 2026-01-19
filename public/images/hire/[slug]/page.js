// components/HireDevelopers.js

import HireContactForm from "./HireContactForm";
import Image from "next/image";
import { BsCheck, BsCheckCircle, BsClock, BsTransparency } from "react-icons/bs";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import { GiBullseye } from "react-icons/gi";
import HireDevelopersPage from "./SelectDeveloper";
import TechStack from "./TechStack";
import { CiClock1, CiTimer } from "react-icons/ci";
import { TbCalendarClock } from "react-icons/tb";
import { FaThumbsUp } from "react-icons/fa";

export default function HireDevelopers() {

    const features = [
        {
            title: 'People Cohesion',
            description: 'Creating a collaborative atmosphere where individuals work and align with goals.',
            icon: '👥'
        },
        {
            title: 'Team Leadership',
            description: 'Taking a visionary and quiet approach by consistently delivering.',
            icon: '🎯'
        },
        {
            title: 'Team Build Up',
            description: 'Building the capability of our clients to attain learning growth.',
            icon: '🚀'
        },
        {
            title: 'Strategy',
            description: 'Providing superior creativity in employee benefits plan design.',
            icon: '💡'
        },
        {
            title: 'Communication',
            description: 'Keeping our clients by maximizing the performance of their organization.',
            icon: '💬'
        },
        {
            title: 'Find A Job',
            description: 'Recruiting the right people who uphold corporate and wisdom to deliver.',
            icon: '🔍'
        }
    ];

    const benefits = [
        'Experienced, skilled, & dedicated front end developers',
        'Reduce 60% of development cost',
        'Ensure project privacy with strict NDA signed documents',
        'Complete source code authorization & premium code quality',
        'Highly skilled in design patterns & functional programming',
        'Experts in HTML CSS and JavaScript Angular, ReactJS Technologies',
        'Flexible engagement models'
    ];

    const steps = [
        {
            number: 1,
            icon: "/images/hire/h1.png",
            title: 'Place a free request',
            description: 'Share a short form and shed all on ways to receive developers'
        },
        {
            number: 2,
            icon: "/images/hire/h2.png",
            title: 'Tell Us about your needs',
            description: 'On a brief 30-min call, our team will listen and get chooses experts for you'
        },
        {
            number: 3,
            icon: "/images/hire/h3.png",
            title: 'Interview The Best',
            description: 'Meet 3-5 hand-picked talents within 48 hours. Select the ones you like'
        },
        {
            number: 4,
            icon: "/images/hire/h4.png",
            title: 'Onboard The chosen One',
            description: 'Begin your journey alongside with new team members, Onboard them'
        }
    ];

    const services = [
        {
            title: 'Transparent',
            icon: <BsTransparency size={100} />,
            description: 'Set the rules for your journey by negotiating with us directly. Transparency with clients is our motto.',
            bgColor: 'bg-blue-500',

        },
        {
            title: 'Productive',
            icon: <BsFileEarmarkBarGraph size={100} />,
            description: 'Enhance your team with distractions-spared developers and bring strong waves of productivity.',
            bgColor: 'bg-green-500',
            iconBg: 'bg-green-400/50'
        },
        {
            title: 'To the point',
            icon: <GiBullseye size={100} />,
            description: 'Find the perfect remote developers for the busy market. Just tailored services to your needs.',
            bgColor: 'bg-gray-200',
            textColor: 'text-gray-800',
            iconBg: 'bg-gray-300/50'
        }
    ];

    const Moreservices = [
        { title: 'Front-end web development', icon: '💻', description: 'Our front-end developers can swear by user-friendly and seamless navigation throughout the website. A complete understanding of the web technologies like HTML, CSS and Javascript can craft such websites.' },
        { title: 'Back-end development', icon: '⚙️', description: 'Robust server-side solutions with scalable architecture and secure database management.' },
        { title: 'Full stack web development', icon: '🌐', description: 'End-to-end development solutions combining both frontend and backend expertise.' },
        { title: 'HTML5/CSS3 development', icon: '📝', description: 'Modern, responsive web interfaces using the latest HTML5 and CSS3 standards.' },
        { title: 'Front-end optimization service', icon: '⚡', description: 'Performance optimization for faster load times and better user experience.' },
        { title: 'Mobile Interface development', icon: '📱', description: 'Whatever looks good on the screen in comparison shouldn\'t miss its displays on your mobile. Our front-end developers create a pleasant and appealing UI that flows seamlessly across varied platforms with React Native Expertise.' },
        { title: 'MEAN stack service', icon: '🔧', description: 'Full-stack JavaScript development using MongoDB, Express, Angular, and Node.js.' },
        { title: 'CMS design & development', icon: '📊', description: 'Custom content management systems tailored to your business needs.' },
        { title: 'Testing & debugging service', icon: '🐛', description: 'Comprehensive testing and debugging to ensure bug-free applications.' },
        { title: 'Custom web app development', icon: '🎨', description: 'Bespoke web applications designed specifically for your business requirements.' }
    ];

    const profileFeatures = [
        'Professional Summary',
        'Major Projects',
        'Work History',
        'Intro Video',
        'Verified Profile'
    ];

    const comparisonData = [
        {
            category: 'Top Talents',
            Softkingo: { icon: '✓', text: 'Startup-experienced, vetted', highlight: true },
            recruiting: { icon: '⊗', text: 'No vetting' },
            outsourcing: { text: 'Generalist, mixed expertise' }
        },
        {
            category: 'Speed of Hiring',
            Softkingo: { icon: '⚡', text: '48-hour hiring', highlight: true },
            recruiting: { icon: '🐌', text: 'Slow & manual' },
            outsourcing: { icon: '📅', text: 'Weeks/months' }
        },
        {
            category: 'Control & Collaboration',
            Softkingo: { text: 'Direct access, full control', highlight: true },
            recruiting: { text: 'No post-hiring involvement' },
            outsourcing: { text: 'Limited control, external teams' }
        },
        {
            category: 'Time Zone & Fit',
            Softkingo: { text: 'Aligned with your time', highlight: true },
            recruiting: { text: 'Candidate-dependent' },
            outsourcing: { text: 'Time zone gaps' }
        },
        {
            category: 'Post-Hiring Support',
            Softkingo: { text: 'Lifetime free replacement', highlight: true },
            recruiting: { text: 'Limited, paid replacements' },
            outsourcing: { text: 'No guaranteed support' }
        },
        {
            category: 'Motivation & Ownership',
            Softkingo: { text: 'Challenge-driven, proactive', highlight: true },
            recruiting: { text: 'Placement-focused, not engaged' },
            outsourcing: { text: 'Task-focused, low ownership' }
        }
    ];

    // Data for the Flexible Working Model Section
    const models = [
        {
            title: "Full-time",
            icon: <CiClock1 className="w-12 h-12 text-blue-300" />,
            description: "Hire dedicated developers to work exclusively on your project. Ideal for long-term and large-scale development needs with consistent collaboration.",
            features: ["8 hrs/day", "Monthly billing", "Team integration"],
            buttonText: "Hire Now"
        },
        {
            title: "Part-time",
            icon: <TbCalendarClock className="w-12 h-12 text-sky-300" />,
            description: "Perfect for when you need expert developers for a few hours a day for specific tasks or support roles. Get dedicated help without long-term commitments.",
            features: ["4 hrs/day", "Flexible slots", "Reduced cost"],
            buttonText: "Hire Now"
        },
        {
            title: "Hourly",
            icon: <CiTimer className="w-12 h-12 text-slate-200" />,
            description: "Hire top developers on-demand for tasks, testing, or urgent fixes. No long-term commitment required, pay only for what you use, when you need it.",
            features: ["Time-based", "No contract", "Budget-friendly"],
            buttonText: "Hire Now"
        }
    ];

    // Data for "Why You Should Hire" Section
    const morebenefits = [
        {
            title: "Experienced & Skilled Resources",
            desc: "You can hire a team of experienced professionals who have great domain expertise."
        },
        {
            title: "Cost effective & On-time Delivery",
            desc: "When you hire dedicated developers from us, just remain assured of timely completion."
        },
        {
            title: "Communication via Skype/Email/Phone",
            desc: "You can communicate with your team in real-time using any convenient methods."
        },
        {
            title: "Code & Backup Management",
            desc: "We have robust code and backup management in the case of any unwanted issues."
        },
        {
            title: "Flexible Pricing & Working Models",
            desc: "We offer flexibility in pricing and scalability when you hire dedicated developers."
        },
        {
            title: "No Expenses on Training & Retaining",
            desc: "You can save big on training and retaining employees by hiring a team of developers."
        },
        {
            title: "Daily/Weekly Reporting",
            desc: "You can stay updated with the project status through regular reporting from the team."
        },
        {
            title: "Dedicated Lead as Single Point of Contact",
            desc: "We assign a dedicated lead for your team of developers as a single point of contact."
        },
        {
            title: "Update and Tracking via PMS",
            desc: "You can track your project in real time using advanced Project Management Software."
        },
        {
            title: "Secured & Fail-safe Environment",
            desc: "Your confidential corporate data is completely safe when we work on your project."
        }
    ];

    // Data for "Startups / Mid-Size / Enterprise" Section
    const businessTypes = [
        {
            title: "Startups",
            description: "Global startups can hire dedicated development teams from Softkingo Technologies to build innovative digital solutions. Fast-track your project development process while keeping the budget and timeframe in control.",
            image: "/images/hire/h8.png"
        },
        {
            title: "Mid-Size Businesses",
            description: "Mid-size businesses can hire dedicated developers to sustain steady growth. Our experts provide digital solutions that not only invite innovation but risk mitigation while helping businesses take a leap forward towards excellence.",
            image: "/images/hire/h9.png"
        },
        {
            title: "Enterprise Level Businesses",
            description: "Large-scale enterprises hire experienced developers from our team who can help them handle their large and complex development projects through our technical expertise that brings more value for strategic innovation.",
            image: "/images/hire/h10.png"
        }
    ];

    return (
        <main className="relative bg-white overflow-x-hidden">
            {/* Hero Section */}
            <section className="max-w-7xl bg-gradient-to-r from-white to-sky-200 mx-auto relative">
                <div className="relative opacity-90 bg-[url(/images/hire/hire1.png)] bg-center bg-no-repeat bg-cover px-4 md:px-10 py-10 md:py-32 pb-20 md:pb-40">
                    <div className="mb-16">
                        <h1 className="text-3xl md:text-5xl text-white font-bold mb-5 leading-tight">
                            Hire Front-End Developers
                        </h1>
                        <p className="text-base md:text-xl text-white mb-8 max-w-2xl">
                            Want a sleek, user-friendly UI? Our expert Front-end developers bring your
                            designs to life with pixel-perfect precision.
                        </p>
                        <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium transition-colors">
                            Hire Front end Developers Now →
                        </button>
                    </div>
                </div>

                {/* Features Grid - Overlapping */}
                <div className="w-full px-4 -mt-20 md:-mt-32 relative z-20">
                    <div className="max-w-6xl mx-auto bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-xl shadow-2xl">
                        {features.map((feature, index) => (
                            <div key={index} className="items-center p-4 md:p-6 md:gap-4 flex flex-col md:flex-row border-b md:border-none hover:bg-gray-50 transition-colors">
                                <div className="text-4xl text-cyan-500">{feature.icon}</div>
                                <div className="text-center md:text-left">
                                    <h3 className="text-lg font-semibold text-black mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Content Section */}
                <div className="text-black mt-16 md:mt-24 max-w-7xl mx-auto px-4 md:px-10 pb-8 md:pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
                        {/* Left Content */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Front end developers by Softkingo
                            </h2>

                            <p className="text-gray-600 leading-relaxed mb-5">
                                Are you thinking to hire Front end developers to create highly interactive web and mobile
                                apps? Well, Softkingo has a massive pool of top Front-end developers who can deliver an
                                extraordinary user experience to elevate your brand's value. Get the best resources on an
                                hourly, monthly, or yearly basis from us.
                            </p>

                            <p className="text-gray-600 leading-relaxed mb-5">
                                With a talented team, Softkingo has the best Front end developers capable of providing
                                the most intuitive user interfaces and interactive user experience. Our front-end
                                engineers, developers, and experts have experience in UX/UI design, implementation, and
                                optimization of your project's dream front-end architecture.
                            </p>

                            <div className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                            ✓
                                        </span>
                                        <span className="text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="w-full">
                            <HireContactForm />
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-r max-w-7xl mx-auto from-cyan-400 to-sky-400  py-8 md:py-20 px-8 md:px-10">
                <div className="max-w-6xl mx-auto ">
                    {/* Section Title */}
                    <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-2 md:mb-16">
                        How To Hire Front-End Developer From Softkingo
                    </h2>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`relative text-center px-3 py-4 md:px-6 md:py-8 ${index < steps.length - 1 ? 'md:border-r md:border-white/30' : ''
                                    }`}
                            >
                                <div className="flex items-center justify-center mb-4">
                                    <span className="text-5xl md:text-6xl font-bold text-white/90 mr-2">
                                        {step.number}
                                    </span>
                                    <Image alt={step.title} src={step.icon} width={50} height={50} />
                                </div>
                                <h3 className="text-white text-lg md:text-xl font-semibold mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-white/90 text-sm md:text-base leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-cyan-500 transition-all duration-300">
                            Hire With Confidence →
                        </button>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto  py-8 md:py-20 px-4 md:px-10">
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 md:p-12 bg-white/50">
                    <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
                        Developers As A Service
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {services.map((services, index) => (
                            <div
                                key={index}
                                className={`${services.bgColor} ${services.textColor || 'text-white'} rounded-xl p-8 flex flex-col items-center shadow-lg`}
                            >
                                <h3 className="text-2xl font-bold mb-4">{services.title}</h3>
                                <div className="mb-6">
                                    <div className={`w-32 h-32 md:w-40 md:h-40 ${services.iconBg} rounded-full flex items-center justify-center`}>
                                        <span className="text-4xl">{services.icon}</span>
                                    </div>
                                </div>
                                <p className={`text-sm md:text-base text-center leading-relaxed ${services.textColor ? 'text-gray-600' : 'text-white/90'}`}>
                                    {services.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <HireDevelopersPage />

            {/* Services Provided Section */}
            <section className="max-w-7xl mx-auto bg-white  py-8 md:py-20 px-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                                Services Provided
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Services that our resource will provide to your business
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {Moreservices.map((service, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                        <span className="text-cyan-500 mt-1">▶</span>
                                        <span className="text-gray-700 text-sm md:text-base">
                                            {service.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6 h-[500px] overflow-y-auto pr-2">
                            {Moreservices.map((service, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <span className="text-2xl">{service.icon}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-black mb-2">
                                                {service.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Profile Section */}
            <section className="max-w-7xl mx-auto bg-gradient-to-r from-sky-400 to-sky-300  py-8 md:py-20 px-6 md:px-10">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Detailed profile for Confident Hiring Decisions
                    </h2>
                    <p className="text-white/90 text-base md:text-lg mb-8 max-w-3xl">
                        Each candidate profile includes comprehensive details to ensure you make the right choice.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <div className="overflow-hidden rounded-lg">
                                <Image
                                    src="/images/hire/h7.png"
                                    width={1000}
                                    height={1000}
                                    alt="Profile Preview"
                                    className=" object-cover"
                                />
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-col gap-4">
                            <div className="overflow-hidden rounded-lg flex-1">
                                <Image
                                    src="/images/hire/h6.png"
                                    width={1000}
                                    height={1000}
                                    alt="Chart Preview"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 rounded-lg overflow-hidden">
                                <Image
                                    src="/images/hire/h5.png"
                                    width={1000}
                                    height={1000}
                                    alt="Professional Summary"
                                    className=" object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8">
                        <div className="space-y-4">
                            {profileFeatures.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white/20 hover:bg-white/30 transition-all duration-300 rounded-lg p-4 cursor-pointer"
                                >
                                    <h3 className="text-white text-base md:text-lg font-semibold">
                                        {feature}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto bg-gradient-to-r from-sky-200 to-white  py-8 md:py-20 md:px-8 px-4">
                <div>
                    {/* CTA Banner */}
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
                            <div className="text-white z-10">
                                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                    Book A FREE Consultation With Us
                                </h2>
                                <p className="text-white/90 mb-6 max-w-2xl">
                                    Share your project idea and we'll provide a free consultation on how we can turn it into a reality deal an amazing digital product.
                                </p>
                                <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg">
                                    Book a Free Demo
                                </button>
                            </div>
                            <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto md:mx-0 hidden md:block">
                                <Image
                                    src="/images/consultant.png"
                                    alt="Consultant"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        Why Softkingo is the better choice for Tech companies
                    </h2>

                    {/* Comparison Table - Scrollable on mobile */}
                    <div className="bg-white overflow-x-auto">
                        <div className="min-w-[800px]">
                            <div className="grid grid-cols-4 gap-4 bg-gray-50 p-6 border-b-2 border-gray-200">
                                <div className="font-semibold text-gray-700"></div>
                                <div className="text-center font-bold text-blue-600">Softkingo</div>
                                <div className="text-center font-semibold text-gray-600">Recruiting & Agencies</div>
                                <div className="text-center font-semibold text-gray-600">Outsourcing</div>
                            </div>
                            {comparisonData.map((row, index) => (
                                <div
                                    key={index}
                                    className={`grid grid-cols-4 gap-4 p-4 items-center ${index % 2 === 0 ? 'bg-white border-2' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
                                >
                                    <div className="font-medium text-gray-700 text-sm md:text-base">
                                        {row.category}
                                    </div>
                                    <div className={`text-center p-2 rounded-lg ${row.Softkingo.highlight ? 'bg-blue-50 border-2 border-blue-200' : ''}`}>
                                        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                                            {row.Softkingo.icon && <span className="text-xl text-green-500">{row.Softkingo.icon}</span>}
                                            <span className="text-sm md:text-base text-gray-800 font-medium">{row.Softkingo.text}</span>
                                        </div>
                                    </div>
                                    <div className="text-center p-4">
                                        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                                            {row.recruiting.icon && <span className="text-xl text-red-500">{row.recruiting.icon}</span>}
                                            <span className="text-sm md:text-base text-gray-600">{row.recruiting.text}</span>
                                        </div>
                                    </div>
                                    <div className="text-center p-4">
                                        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                                            {row.outsourcing.icon && <span className="text-xl">{row.outsourcing.icon}</span>}
                                            <span className="text-sm md:text-base text-gray-600">{row.outsourcing.text}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <TechStack />

            {/* Flexible Working Model & Why You Should Hire */}
            <section className="max-w-7xl mx-auto bg-white">
                <section className=" py-8 md:py-20 px-4 bg-gradient-to-b from-blue-50 via-white to-blue-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                                Our Flexible Working Model
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                We make hiring dedicated developers easy with flexible models tailored to your needs.
                                Whether you want full-time commitment or short-term support, we've got you covered.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {models.map((model, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-900 rounded-3xl p-8 flex flex-col text-white shadow-xl hover:-translate-y-2 transition-transform duration-300"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="bg-white/10 p-3 rounded-full">
                                            {model.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold">{model.title}</h3>
                                    </div>
                                    <p className="text-slate-300 mb-8 text-sm leading-relaxed flex-grow border-b border-slate-700 pb-8">
                                        {model.description}
                                    </p>
                                    <ul className="space-y-4 mb-8">
                                        {model.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <div className="bg-white rounded-full p-0.5">
                                                    <BsCheckCircle className="w-3 h-3 text-slate-900 stroke-[3]" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-200">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="w-full py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold transition-colors shadow-lg shadow-cyan-500/20">
                                        {model.buttonText}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="relative bg-cyan-500  py-8 md:py-20">
                    <div className="relative max-w-7xl mx-auto px-4">
                        {/* Overlapping Card */}
                        <div className="relative  bg-white rounded-xl shadow-xl p-6 md:p-10 z-10">
                            <div className="mb-12">
                                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center md:text-left">
                                    Why You Should Hire Dedicated Developers From Softkingo
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                {morebenefits.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-start">
                                        <div className="mt-1 flex-shrink-0">
                                            <BsCheckCircle className="w-6 h-6 text-cyan-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-base mb-1">
                                                {item.title}
                                            </h4>
                                            <p className="text-slate-600 text-sm leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Startups/Enterprise Section */}
                <section className=" py-8 md:py-20  px-4 bg-white">
                    <div className="mb-12 max-w-5xl mx-auto text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                            Hire Front-end Developers Who Are Passionate to Turn Business Idea into A Reality
                        </h2>
                        <p className="text-slate-600 text-lg md:text-xl">
                            Hire Futuristic Front-end Developers to Access Our Technical Proficiency.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {businessTypes.map((type, idx) => (
                            <div key={idx} className="group flex flex-col relative bg-slate-50 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                                <div className="relative h-96">
                                    {/* Text Overlay */}
                                    <div className="absolute top-0 left-0 w-full p-8 z-20 text-white">
                                        <h3 className="text-2xl font-bold mb-4">{type.title}</h3>
                                        <p className="text-slate-200 text-sm leading-relaxed">
                                            {type.description}
                                        </p>
                                    </div>

                                    {/* Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10"></div>

                                    {/* Image */}
                                    <img
                                        src={type.image}
                                        alt={type.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </section>

            {/* Pricing Plans */}
            <section className="max-w-7xl mx-auto  py-8 md:py-20 px-4 bg-white">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">
                        Pricing Plans
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Our pricing plans, along with a free trial of 2 weeks
                    </p>
                </div>

                {/* Responsive Grid: 1 column on mobile, 3 on Desktop */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                    {/* Plan 1: Part-time Developer */}
                    <div className="bg-purple-500 rounded-3xl p-4 md:p-8 text-white text-center flex flex-col h-full shadow-xl hover:scale-105 transition-transform duration-300">
                        <h3 className="text-3xl font-bold mb-2 leading-tight">Part-time<br />Developer</h3>
                        <p className="text-purple-100 text-sm mb-8 leading-relaxed px-2">
                            Receive a few hours of assistance from our dedicated engineers to develop your tailored solution.
                        </p>

                        <div className="mb-8">
                            <span className="text-5xl font-bold">80 hours</span>
                            <span className="block text-purple-100 mt-1 text-sm">/month</span>
                        </div>

                        <div className="bg-purple-600/50 rounded-2xl p-4 md:p-6 text-left space-y-3 mb-8 flex-grow text-sm">
                            <p>• 4 Hours a Day, 5 Days a Week</p>
                            <p>• Billing cycle: Weekly / Monthly</p>
                            <p>• Minimum: 1 Month</p>
                            <p>• Available for You When Required</p>
                        </div>

                        <button className="w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors">
                            Hire Part-time Developer
                        </button>
                    </div>

                    {/* Plan 2: Full-time Developer (Featured) */}
                    <div className="bg-emerald-500 rounded-3xl  p-4 md:p-8 text-white text-center flex flex-col h-full shadow-2xl md:scale-105 z-10 border-4 border-emerald-400/30 relative overflow-hidden">
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-emerald-800/30 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-2 text-sm font-medium">
                            Recommended <FaThumbsUp size={16} fill="currentColor" />
                        </div>

                        <div className="mt-12">
                            <h3 className="text-3xl font-bold mb-2 leading-tight">Full-time<br />Developer</h3>
                            <p className="text-emerald-100 text-sm mb-8 leading-relaxed px-2">
                                Harness the expertise of our dedicated engineers, who will dedicate themselves to your project.
                            </p>
                        </div>

                        <div className="mb-8">
                            <span className="text-5xl font-bold">160 hours</span>
                            <span className="block text-emerald-100 mt-1 text-sm">/month</span>
                        </div>

                        <div className="bg-emerald-800/20 rounded-2xl p-6 text-left space-y-3 mb-8 flex-grow text-sm">
                            <p>• 8 Hours a Day, 5 Days a Week</p>
                            <p>• Billing cycle: Weekly / Monthly</p>
                            <p>• Minimum: 1 Month</p>
                            <p>• Billing cycle: Weekly / Monthly</p>
                        </div>

                        <button className="w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors">
                            Hire Dedicated Developer
                        </button>
                    </div>

                    {/* Plan 3: Hourly Developer */}
                    <div className="bg-teal-400 rounded-3xl  p-4 md:p-8 text-white text-center flex flex-col h-full shadow-xl hover:scale-105 transition-transform duration-300">
                        <h3 className="text-3xl font-bold mb-2 leading-tight">Hire Hourly<br />Developer</h3>
                        <p className="text-teal-100 text-sm mb-8 leading-relaxed px-2">
                            Engage Dedicated engineers on an hourly basis for swift deadlines, brief tasks, and maintenance needs.
                        </p>

                        <div className="mb-8">
                            <span className="text-5xl font-bold">Custom Hours</span>
                            <span className="block text-teal-100 mt-1 text-sm">/month</span>
                        </div>

                        <div className="bg-teal-600/30 rounded-2xl p-6 text-left space-y-3 mb-8 flex-grow text-sm">
                            <p>• Billing cycle: Weekly / Monthly</p>
                            <p>• Minimum: 30 Hours</p>
                            <p>• Payment Based on Hours Worked</p>
                        </div>

                        <button className="w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors">
                            Hire Hourly Developer
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
