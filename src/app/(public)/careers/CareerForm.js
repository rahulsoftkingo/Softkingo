'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ApplicationForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        jobTitle: '',
        currentCTC: '',
        noticePeriod: '',
        message: '',
        resume: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            resume: e.target.files[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
    };

    return (
        <section className="relative w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-8 lg:mb-12">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
                        SEND IN YOUR APPLICATION TODAY!
                    </p>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Ready to Start Your Journey with Softkingo?
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        At Softkingo, milestones are more than just achievements, they're moments to celebrate.
                        We value the unique magic you bring and foster an environment where memories, friendships,
                        and laughter thrive, creating bonds that last a lifetime.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">

                    {/* Left Side - How It Works */}
                    <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-cyan-700 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">How It Works</h2>
                        <p className="text-blue-100 text-sm mb-8 leading-relaxed">
                            It all starts with your CV. We can't wait to meet you and find out what sets
                            you apart from the rest! Join our team's dynamics. Please follow these simple
                            steps to get closer to being a part of our team.
                        </p>

                        {/* Steps Flow */}
                        <div className="space-y-4">

                            {/* Step 1 */}
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 text-right">
                                    <span className="text-blue-200 text-xs font-bold">STEP</span>
                                    <p className="text-white text-2xl font-bold leading-tight">01</p>
                                </div>

                                <div className="flex justify-between w-full items-center bg-blue-50/20 backdrop-blur-sm rounded-3xl px-4 py-3">
                                    <p className="text-blue-50 font-medium">Send Your CV</p>
                                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 w-12 h-12 flex items-center justify-center shadow-lg">
                                        <svg className="w-8 h-8 text-cyan-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Connector */}
                            <div className="ml-4 border-l-2 border-dashed border-blue-300/30 h-6"></div>

                            {/* Step 2 */}
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 text-right">
                                    <span className="text-blue-200 text-xs font-bold">STEP</span>
                                    <p className="text-white text-2xl font-bold leading-tight">02</p>
                                </div>

                                <div className="flex justify-between w-full items-center bg-blue-50/20 backdrop-blur-sm rounded-3xl px-4 py-3">
                                    <p className="text-blue-50 font-medium">Stay in Touch</p>
                                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 w-12 h-12 flex items-center justify-center shadow-lg">
                                        <svg className="w-8 h-8 text-cyan-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Connector */}
                            <div className="ml-4 border-l-2 border-dashed border-blue-300/30 h-6"></div>

                            {/* Step 3 */}
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 text-right">
                                    <span className="text-blue-200 text-xs font-bold">STEP</span>
                                    <p className="text-white text-2xl font-bold leading-tight">03</p>
                                </div>

                                <div className="flex justify-between w-full items-center bg-blue-50/20 backdrop-blur-sm rounded-3xl px-4 py-3">
                                    <p className="text-blue-50 font-medium">Complete a Test / Assignment</p>
                                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 w-12 h-12 flex items-center justify-center shadow-lg">
                                        <svg className="w-8 h-8 text-cyan-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Connector */}
                            <div className="ml-4 border-l-2 border-dashed border-blue-300/30 h-6"></div>

                            {/* Step 4 */}
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 text-right">
                                    <span className="text-blue-200 text-xs font-bold">STEP</span>
                                    <p className="text-white text-2xl font-bold leading-tight">04</p>
                                </div>

                                <div className="flex justify-between w-full items-center bg-blue-50/20 backdrop-blur-sm rounded-3xl px-4 py-3">
                                    <p className="text-blue-50 font-medium">Get Interviewed</p>
                                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 w-12 h-12 flex items-center justify-center shadow-lg">
                                        <svg className="w-8 h-8 text-cyan-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Connector */}
                            <div className="ml-4 border-l-2 border-dashed border-blue-300/30 h-6"></div>

                            {/* Step 5 */}
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 text-right">
                                    <span className="text-blue-200 text-xs font-bold">STEP</span>
                                    <p className="text-white text-2xl font-bold leading-tight">05</p>
                                </div>

                                <div className="flex justify-between w-full items-center bg-blue-50/20 backdrop-blur-sm rounded-3xl px-4 py-3">
                                    <p className="text-blue-50 font-medium">Join Our Team</p>
                                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 w-12 h-12 flex items-center justify-center shadow-lg">
                                        <svg className="w-8 h-8 text-cyan-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Application Form */}
                    <div className="bg-white rounded-3xl  p-6 sm:p-8 shadow-xl border border-gray-100">
                        <h2 className='text-sky-700 text-2xl sm:text-3xl sm:text-nowrap l font-bold lg:text-5xl text-center py-8'>Find Your Career</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Name Fields */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        First Name*
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your First Name..."
                                        className="w-full px-4 text-black py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all bg-blue-50/30"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Last Name*
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your Last Name..."
                                        className="w-full text-black px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all bg-blue-50/30"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email and Phone */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address*
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your Email..."
                                        className="w-full text-black px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all bg-blue-50/30"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number*
                                    </label>
                                    <div className="flex gap-2 items-center w-full px-4 py-3 rounded-xl border border-gray-200 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-200 transition-all bg-blue-50/30">
                                        <select className="bg-transparent text-gray-700 font-medium border-0 outline-none cursor-pointer" value="91">
                                            <option value="">+91</option>
                                            <option value="">+66</option>
                                        </select>

                                        <div className="h-6 w-px bg-gray-300"></div>

                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Enter Your Phone Number..."
                                            className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                                            required
                                        />
                                    </div>
                                </div>

                            </div>

                            {/* Job Title and CTC */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        name="jobTitle"
                                        value={formData.jobTitle}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your Job Title Applying For..."
                                        className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all bg-blue-50/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Current CTC
                                    </label>
                                    <input
                                        type="text"
                                        name="currentCTC"
                                        value={formData.currentCTC}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your Current CTC..."
                                        className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all bg-blue-50/30"
                                    />
                                </div>
                            </div>

                            {/* Notice Period */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Notice Period
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="noticePeriod"
                                            value="immediate"
                                            checked={formData.noticePeriod === 'immediate'}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                                        />
                                        <span className="text-sm text-gray-700">Immediate to 15 Days</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="noticePeriod"
                                            value="2months"
                                            checked={formData.noticePeriod === '2months'}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                                        />
                                        <span className="text-sm text-gray-700">2 Months</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="noticePeriod"
                                            value="3months"
                                            checked={formData.noticePeriod === '3months'}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                                        />
                                        <span className="text-sm text-gray-700">3 Months</span>
                                    </label>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Enter Your Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Enter Your Message..."
                                    rows="4"
                                    className="w-full px-4  text-black py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all bg-blue-50/30 resize-none"
                                ></textarea>
                            </div>

                            {/* File Upload */}
                            <div>
                                <label className="flex items-center space-x-2 cursor-pointer bg-blue-50/50 hover:bg-blue-50 border-2 border-dashed border-gray-300 rounded-xl px-4 py-3 transition-all">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-700">
                                        {formData.resume ? formData.resume.name : 'Attach Your Resume'}
                                    </span>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full cursor-pointer bg-sky-800 hover:bg-sky-900 text-white font-semibold py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Submit Form
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
