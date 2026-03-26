// components/HireDevelopersPage.js
'use client';
import { Link } from 'lucide-react';
import { useState } from 'react';
import { FaStethoscope } from 'react-icons/fa';
import { FaUniversity } from 'react-icons/fa';
import { FaIndustry } from 'react-icons/fa';
import { FaTruck } from 'react-icons/fa';
import { FaBuilding } from 'react-icons/fa'; // Fixed import
import { FaChartLine } from 'react-icons/fa';
import { FaShieldAlt } from 'react-icons/fa';
import { FaDollarSign } from 'react-icons/fa';
import { FaGlobe } from 'react-icons/fa';
import { FaHeartbeat, FaGraduationCap, FaPlane, FaUtensils, FaDumbbell, FaStore, FaFilm, FaUsers, FaCar, FaHammer, FaCalendarAlt } from 'react-icons/fa';
import * as Icons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';

const getIcon = (iconName, size = 24, className = "") => {
    const IconComponent = Icons[iconName] || BsIcons[iconName];
    if (!IconComponent) return <FaIndustry size={size} className={className} />;
    return <IconComponent size={size} className={className} />;
};


export default function HireDevelopersPage({ data }) {
    // FALLBACK DATA
    const fallbackIndustries = [
        { name: 'Healthcare', icon: <FaStethoscope />, href: "/industries/healthcare" },
        { name: 'Banking & Finance', icon: <FaDollarSign />, href: "/industries/fintech-software-development" },
        { name: 'Insurance', icon: <FaShieldAlt />, href: "/industries/insurance" },
        { name: 'E-Commerce & Retail', icon: <FaStore />, href: "/industries/ecommerce" },
        { name: 'Manufacturing', icon: <FaIndustry />, href: "/industries/manufacturing" },
        { name: 'Logistics & Supply Chain', icon: <FaTruck />, href: "/industries/logistics" },
        { name: 'Education', icon: <FaGraduationCap />, href: "/industries/elearning" },
        { name: 'Real Estate', icon: <FaBuilding />, href: "/industries/real-estate" },
        { name: 'Marketing & Advertising', icon: <FaChartLine />, href: "/industries/marketing" },
        { name: 'Telecommunications', icon: <FaGlobe />, href: "/industries/telecom" },
    ];

    const fallbackIndustryContent = {
        Healthcare: {
            title: 'Healthcare',
            description: 'AI improves patient care by enabling faster diagnosis, predictive analytics, and intelligent automation while maintaining data privacy and compliance.'
        },
        'Banking & Finance': {
            title: 'Banking & Finance',
            description: 'We help financial institutions reduce risk, detect fraud, and make smarter decisions using AI-driven analytics and automation.'
        },
        Insurance: {
            title: 'Insurance',
            description: 'AI streamlines claims processing, risk assessment, and customer support, improving efficiency and accuracy across operations.'
        },
        'E-Commerce & Retail': {
            title: 'E-Commerce & Retail',
            description: 'Enhance customer experience with personalized recommendations, demand forecasting, and intelligent inventory management.'
        },
        Manufacturing: {
            title: 'Manufacturing',
            description: 'AI optimizes production, predictive maintenance, and quality control to reduce downtime and improve operational efficiency.'
        },
        'Logistics & Supply Chain': {
            title: 'Logistics & Supply Chain',
            description: 'Improve route optimization, demand prediction, and real-time tracking for faster, more cost-effective operations.'
        },
        Education: {
            title: 'Education',
            description: 'AI enables personalized learning, automated administration, and data-driven insights to improve learning outcomes.'
        },
        'Real Estate': {
            title: 'Real Estate',
            description: 'Leverage AI for property valuation, market analysis, lead management, and customer engagement.'
        },
        'Marketing & Advertising': {
            title: 'Marketing & Advertising',
            description: 'AI-driven insights power targeted campaigns, customer segmentation, and performance optimization.'
        },
        Telecommunications: {
            title: 'Telecommunications',
            description: 'AI enhances network optimization, customer support automation, and predictive maintenance.'
        }
    };

    // DYNAMIC DATA MERGE
    const title = data?.title || 'Hire Developers in India for Your Specific Industry';
    const subtitle = data?.subtitle || "Whether you are in healthcare or the restaurant industry, from e-commerce to fintech, our developers look into your startup's prospects and cater to your requirements. Get a tailor-made app!";
    const industries = Array.isArray(data?.items) && data.items.length > 0 ? data.items : fallbackIndustries;
    const [selectedIndustry, setSelectedIndustry] = useState(industries[0]?.name || 'Healthcare');

    return (
        <>
            {/* Hero Section - Industries */}
            <section className="relative z-10 bg-[url(/images/hire/hire1.png)] bg-center bg-no-repeat bg-cover ">
                <div className="absolute inset-0 bg-sky-300/90 opacity-30 z-20"></div>
                <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-30">

                    {/* Title */}
                    <div className='flex flex-col items-center mb-10 text-center'>
                        <h1 className="text-white text-3xl md:text-4xl font-black leading-tight max-w-5xl">
                            {title}
                        </h1>
                        <hr className='w-24 border-2 border-white mt-4' />
                    </div>

                    <p className="text-white/90 text-center text-base md:text-lg mb-12 max-w-4xl mx-auto font-medium">
                        {subtitle}
                    </p>

                    {/* Main Responsive Container */}
                    <div className='flex flex-col lg:flex-row gap-8 items-start'>

                        {/* Industries Grid */}
                        <div className="w-full lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {industries.map((industry) => (
                                <button
                                    key={industry.name}
                                    onClick={() => setSelectedIndustry(industry.name)}
                                    className={` flex items-center justify-start gap-3 p-4 rounded-lg
                                     border border-white/30 transition-all duration-300
                                        ${selectedIndustry === industry.name
                                            ? 'bg-white  scale-105 shadow-lg text-sky-900 border-white'
                                            : 'bg-black/20 backdrop-blur-sm hover:bg-white/20 text-sky-50'
                                        }`}
                                >
                                    <div className="text-2xl">{getIcon(industry.iconKey || industry.icon, 28)}</div>
                                    <div className="text-sm md:text-base font-bold text-left">{industry.name}</div>
                                </button>
                            ))}
                        </div>

                        {/* Industry Info Card */}
                        {selectedIndustry && (
                            <div className="w-full lg:w-1/3 mt-6 lg:mt-0 bg-white p-8 shadow-2xl rounded-2xl border border-white/20">
                                <h3 className="text-2xl font-black text-slate-900 mb-4">
                                    {industries.find(ind => ind.name === selectedIndustry)?.title || selectedIndustry}
                                </h3>
                                <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                                    {industries.find(ind => ind.name === selectedIndustry)?.description || 
                                     fallbackIndustryContent[selectedIndustry]?.description ||
                                     'Custom solutions tailored for your industry needs.'}
                                </p>

                                <button
                                    onClick={() => {
                                        window.open(
                                            industries.find(ind => ind.name === selectedIndustry)?.href || '/industries',
                                            '_self'
                                        );
                                    }}
                                    className="w-full inline-flex justify-center items-center px-6 lg:px-10 py-3 lg:py-4 bg-slate-900 text-white font-bold text-sm rounded-xl shadow-xl hover:bg-sky-600 transition-all duration-300">
                                    Know More →
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
