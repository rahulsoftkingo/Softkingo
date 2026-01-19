// components/HireDevelopersPage.js
'use client';
import { useState } from 'react';
import { BsBuilding } from 'react-icons/bs';
import { FiDollarSign } from 'react-icons/fi';
import { IoIosRestaurant } from "react-icons/io";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import { MdOutlineTravelExplore } from "react-icons/md";
import { GoLaw } from "react-icons/go";
import { FaSpa } from 'react-icons/fa';

export default function HireDevelopersPage() {
    const [selectedIndustry, setSelectedIndustry] = useState('Real Estate');

    const industries = [
        { name: 'Real Estate', icon: <BsBuilding /> },
        { name: 'Restaurant', icon: <IoIosRestaurant /> },
        { name: 'Fintech', icon: <FiDollarSign /> },
        { name: 'Travel & Tourism', icon: <MdOutlineTravelExplore /> },
        { name: 'Legal', icon: <GoLaw /> },
        { name: 'Healthcare', icon: <FaHeartCirclePlus /> },
        { name: 'Spa', icon: <FaSpa /> },
        { name: 'Ecommerce', icon: <CiShoppingCart /> }, // Corrected Icon
        { name: 'Retail', icon: <CiShoppingCart /> },
    ];

    const industryContent = {
        Healthcare: {
            title: 'Healthcare',
            description: 'We help you and your users design comprehensive plans, find doctors, manage care team calendars, process claims, track health and fitness, approach management and accessibility, and locate pharmacies.'
        },
        'Real Estate': {
            title: 'Real Estate',
            description: 'Our developers build custom real estate platforms for property listings, virtual tours, agent management, and seamless transaction processing to modernize the property market.'
        },
        Restaurant: {
            title: 'Restaurant',
            description: 'From online ordering systems and table reservation platforms to delivery logistics, we provide tech solutions that streamline restaurant operations and enhance the customer dining experience.'
        },
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
                                    className={` flex items-center justify-start gap-3 p-4 rounded-lg border border-white/30 transition-all duration-300
                                        ${selectedIndustry === industry.name 
                                            ? 'bg-white text-black scale-105 shadow-lg' 
                                            : 'bg-black/20 backdrop-blur-sm hover:bg-white/20'
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
                                <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
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
