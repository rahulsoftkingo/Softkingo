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


export default function HireDevelopersPage() {
    const [selectedIndustry, setSelectedIndustry] = useState('Healthcare');

    const industries = [
        { name: 'Healthcare', icon: <FaStethoscope />, href: "/industries/healthcare-app-development" },
        { name: 'Banking & Finance', icon: <FaDollarSign />, href: "/industries/fintech-software-development" },
        { name: 'Insurance', icon: <FaShieldAlt />, href: "/industries/insurance-app-development" },
        { name: 'E-Commerce & Retail', icon: <FaStore />, href: "/industries/ecommerce-app-development" },
        { name: 'Manufacturing', icon: <FaIndustry />, href: "/industries/manufacturing-app-development" },
        { name: 'Logistics & Supply Chain', icon: <FaTruck />, href: "/industries/logistics-app-development" },
        { name: 'Education', icon: <FaGraduationCap />, href: "/industries/elearning-app-development" },
        { name: 'Real Estate', icon: <FaBuilding />, href: "/industries/real-estate-app-development" },
        { name: 'Marketing & Advertising', icon: <FaChartLine />, href: "/industries/marketing-app-development" },
        { name: 'Telecommunications', icon: <FaGlobe />, href: "/industries/telecom-app-development" },
    ];
    const industryContent = {

        Healthcare: {
            title: 'Healthcare',
            description: 'AI improves patient care by enabling faster diagnosis, predictive analytics, and intelligent automation while maintaining data privacy and compliance.'
        },
        Finance: {
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


        // Add other industry descriptions here...
    };

    return (
        <>
            {/* Hero Section - Industries */}
            <section className="relative z-10 bg-[url(/images/hire/hire1.png)] bg-center bg-no-repeat bg-cover ">
                <div className="absolute inset-0 bg-sky-300/90 opacity-30 z-20"></div>
                <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-30">

                    {/* Title */}
                    <div className='flex flex-col items-center mb-10 text-center'>
                        <h1 className="text-white text-3xl md:text-4xl font-bold">
                            Hire Android App Developers in India for Your Specific Industry
                        </h1>
                        <hr className='w-24 border-2 border-white mt-4' />
                    </div>

                    <p className="text-white/90 text-center text-base md:text-lg mb-12 max-w-4xl mx-auto">
                        Whether you are in healthcare or the restaurant industry, from e-commerce to fintech, our developers look into your startup's prospects and cater to your requirements. Get a tailor-made app!
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
                                            ? 'bg-white  scale-105 shadow-lg text-sky-900'
                                            : 'bg-black/20 backdrop-blur-sm hover:bg-white/20 text-sky-50'
                                        }`}
                                >
                                    <div className="text-2xl">{industry.icon}</div>
                                    <div className="text-sm md:text-base font-bold text-left">{industry.name}</div>
                                </button>
                            ))}
                        </div>

                        {/* Industry Info Card */}
                        {selectedIndustry && (
                            <div className="w-full lg:w-1/3 mt-6 lg:mt-0 bg-white p-8 shadow-2xl rounded-lg">
                                <h3 className="text-2xl font-bold text-black mb-4">
                                    {industryContent[selectedIndustry]?.title || selectedIndustry}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {industryContent[selectedIndustry]?.description ||
                                        'Custom solutions tailored for your industry needs.'}
                                </p>

                                <buttom

                                    onClick={() => {

                                        window.open(
                                            industries.find(ind => ind.name === selectedIndustry)?.href || '/industries',
                                            '_self'
                                        );
                                    }}
                                    className="inline-flex items-center px-6 lg:px-10 py-2.5 lg:py-3 bg-gradient-to-br from-sky-500 via-sky-600 to-sky-800 text-white  font-semibold text-xs lg:text-sm rounded-full shadow-xl hover:shadow-sky-500/40 hover:shadow-2xl hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-400  backdrop-blur-sm tracking-wide cursor-pointer">
                                    Know More →
                                </buttom>


                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
