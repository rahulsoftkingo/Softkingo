"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import ApplicationForm from './CareerForm';

const WhyJoinUs = () => {


    const [filters, setFilters] = useState({
        search: '',
        department: '',
        location: ''
    });

    const jobs = [
        {
            id: 1,
            title: 'React.js Developer',
            location: 'Noida',
            experience: '2-3 Years',
            type: 'Full Time'
        },
        {
            id: 2,
            title: 'PHP+ Laravel Developer',
            location: 'Noida',
            experience: '1-3 Years',
            type: 'Full Time'
        },
        {
            id: 3,
            title: 'BA',
            location: 'Noida',
            experience: '2-3 Years',
            type: 'Full Time'
        },
        {
            id: 4,
            title: 'PHP + Laravel Developer',
            location: 'Noida',
            experience: '1-2 Years',
            type: 'Full Time'
        }
    ];

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };
    const benefits = [
        { icon: '📅', title: '5 Days Working Per Week', bgColor: 'bg-orange-50' },
        { icon: '💬', title: 'Transparent Communication', bgColor: 'bg-yellow-50' },
        { icon: '👤', title: 'Employee First', bgColor: 'bg-blue-50' },
        { icon: '🌟', title: 'Positive Environment', bgColor: 'bg-orange-50' },
        { icon: '🏢', title: 'Open Work Culture', bgColor: 'bg-blue-50' },
        { icon: '💡', title: 'Onsite Opportunities', bgColor: 'bg-yellow-50' },
        { icon: '🍽️', title: 'Dedicated Pantry Area', bgColor: 'bg-orange-50' },
        { icon: '📄', title: 'Employee Friendly leave', bgColor: 'bg-yellow-50' },
    ];

    return (
        <>
            {/* build ur career */}
            <section className="relative w-full  bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
                    <div className="relative min-h-[calc(100vh-6rem)]">

                        {/* Top Left - Largest */}
                        <div className="absolute top-0 left-0 sm:left-4 lg:left-8 w-32 h-36 sm:w-44 sm:h-48 lg:w-56 lg:h-60 xl:w-96 xl:h-72 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl z-[1]">
                            <Image
                                src="/images/about/r1.png"
                                alt="Professional team"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Top Right */}
                        <div className="absolute top-4 right-0 sm:right-4 lg:right-8 w-28 h-32 sm:w-36 sm:h-40 lg:w-44 lg:h-48 xl:w-52 xl:h-56 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl z-[1]">
                            <Image
                                src="/images/about/r1.png"
                                alt="Team collaboration"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Middle Left - Hidden on mobile */}
                        {/*  <div className="hidden lg:block absolute top-1/2 left-0 -translate-y-1/2 w-40 h-44 xl:w-48 xl:h-52 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl z-[1]">
                            <Image
                                src="/images/about/r4.png"
                                alt="Team meeting"
                                fill
                                className="object-cover"
                            />
                        </div> */}

                        {/* Middle Right - Hidden on mobile */}
                        <div className="hidden lg:block absolute top-1/2 right-0 translate-y-1/4 w-40 h-44 xl:w-48 xl:h-52 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl z-[1]">
                            <Image
                                src="/images/about/r1.png"
                                alt="Collaboration"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Bottom Left */}
                        <div className="absolute bottom-0 left-0 sm:left-4 lg:left-8 w-28 h-32 sm:w-36 sm:h-40 lg:w-44 lg:h-48 xl:w-52 xl:h-56 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl z-[1]">
                            <Image
                                src="/images/about/r4.png"
                                alt="Working together"
                                fill
                                className="object-cover"
                            />
                        </div>



                        {/* Center Content with Backdrop */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6">
                            <div className="max-w-3xl text-center bg-white/40 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-2 sm:mb-3">
                                    Build Your Career At
                                </h1>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
                                    Softkingo
                                </h2>
                                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto">
                                    Join Softkingo to not only become a subject matter expert but also
                                    make a lasting impact through knowledge. We are always seeking
                                    talented, passionate, and tech enthusiasts to join our team.
                                </p>
                                <button className="bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white px-6 sm:px-8 lg:px-12 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300">
                                    Let&apos;s Work Together
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* why u schould join us  */}
            {/*             <div className="w-full bg-gradient-to-br from-cyan-400 to-blue-400 py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-white text-center mb-12">
                        Why Should You Join<br />Us
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center gap-4"
                            >
                                <div className={`${benefit.bgColor} rounded-xl p-3 text-2xl flex-shrink-0`}>
                                    {benefit.icon}
                                </div>
                                <p className="text-gray-800 font-semibold text-sm leading-tight">
                                    {benefit.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}
            {/* find jobs  */}
            <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-teal-900 py-12 md:py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-10 md:mb-16">
                        <p className="text-white text-xs md:text-sm font-semibold tracking-widest uppercase mb-3">
                            JOIN US TODAY AND BECOME PART OF THIS INCREDIBLE JOURNEY!
                        </p>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            Find your dream job
                        </h1>
                        <p className="text-gray-300 text-sm md:text-base max-w-3xl mx-auto">
                            At Softkingo, every team member is part of our family. We take pride in fostering a culture that values inclusivity,
                            transparency, and the joy of collaboration. Together, we create extraordinary solutions.
                        </p>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar Filters */}
                        <aside className="lg:col-span-1">
                            <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/30 shadow-lg space-y-5">
                                {/* Search Bar */}
                                <div className="relative">
                                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={filters.search}
                                        onChange={(e) => handleFilterChange('search', e.target.value)}
                                        className="w-full bg-slate-700/80 text-white placeholder-gray-400 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                                    />
                                </div>

                                {/* Department Filter */}
                                <div>
                                    <label className="block text-white text-sm font-medium mb-2">
                                        Department
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={filters.department}
                                            onChange={(e) => handleFilterChange('department', e.target.value)}
                                            className="w-full bg-slate-700/80 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none cursor-pointer transition-all"
                                        >
                                            <option value="">Select Department</option>
                                            <option value="development">Development</option>
                                            <option value="design">Design</option>
                                            <option value="ba">Business Analysis</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                                            ▼
                                        </div>
                                    </div>
                                </div>

                                {/* Location Filter */}
                                <div>
                                    <label className="block text-white text-sm font-medium mb-2">
                                        Location
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={filters.location}
                                            onChange={(e) => handleFilterChange('location', e.target.value)}
                                            className="w-full bg-slate-700/80 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none cursor-pointer transition-all"
                                        >
                                            <option value="">Select Location</option>
                                            <option value="noida">Noida</option>
                                            <option value="delhi">Delhi</option>
                                            <option value="remote">Remote</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                                            ▼
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Job Listings */}
                        <main className="lg:col-span-3 space-y-4">
                            {jobs.map((job) => (
                                <article
                                    key={job.id}
                                    className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 group"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        {/* Job Details */}
                                        <div className="flex-1">
                                            <h2 className="text-xl md:text-2xl font-bold text-cyan-400 mb-3 group-hover:text-cyan-300 transition-colors">
                                                {job.title}
                                            </h2>

                                            <div className="flex flex-wrap gap-4">
                                                {/* Location Badge */}
                                                <div className="flex items-center gap-2 bg-slate-700/70 px-3 py-2 rounded-lg">
                                                    <FaMapMarkerAlt className="text-white text-sm" />
                                                    <span className="text-gray-200 text-sm">{job.location}</span>
                                                </div>

                                                {/* Experience Badge */}
                                                <div className="flex items-center gap-2 bg-slate-700/70 px-3 py-2 rounded-lg">
                                                    <FaBriefcase className="text-white text-sm" />
                                                    <span className="text-gray-200 text-sm">{job.experience}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Section */}
                                        <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-2">
                                            <span className="text-white italic text-sm">
                                                {job.type}
                                            </span>
                                            <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-5 md:px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 text-sm whitespace-nowrap">
                                                Apply Now
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </main>
                    </div>
                </div>
            </div>
            {/* be part of softkingo */}
            <section className="relative w-full bg-gradient-to-r from-sky-200 to-sky-50 py-20 px-4 overflow-hidden">

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-6 z-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                                Be A Part Of Softkingo
                            </h2>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-700">
                                    Our Team is growing Fast, We'd love your help in making "Softkingo" more Special. Come join us!
                                </h3>

                                <p className="text-gray-600 leading-relaxed text-base">
                                    Working with Softkingo is not job only, but it's a journey, an experience &
                                    Excellence. Here, you'll find lots of exploration for yourself and your
                                    expertise. Challenging and enjoyable working environment surely lets
                                    you realize your actual working potential that's hidden inside you. Fast-paced
                                    career, global exposure and great service practices is what that
                                    you experience at Softkingo.
                                </p>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative z-10">
                            <div className="rounded-4xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/career/r3.png"
                                    alt="Team meeting at Softkingo"
                                    width={700}
                                    height={450}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* career form */}
            <ApplicationForm />

            {/*  */}
            <section className="relative w-full min-h-[500px] bg-gradient-to-r from-sky-200 to-sky-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 overflow-hidden">


                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                        {/* Left Side - Text Content */}
                        <div className="text-black space-y-6 lg:space-y-8">
                            <h1 className="font-bold text-xl sm:text-3xl  lg:text-4xl leading-tight">
                                Start your career at{' '}
                                <span className="text-sky-900">Softkingo</span>, Let's create a better digital future together.
                            </h1>

                            <p className="text-black text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
                                At Softkingo, we offer an environment that fosters innovation, collaboration, and
                                continuous growth. You'll have the chance to work with cutting-edge technologies,
                                solve real-world challenges, and make a meaningful impact. Join us and shape
                                the future!
                            </p>


                        </div>

                        {/* Right Side - Image Grid */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">

                            {/* Top Left - Large Image (spans 2 rows) */}
                            <div className="relative row-span-2 h-[280px] sm:h-[340px] lg:h-[400px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl group">
                                <Image
                                    src="/images/career/r4.png"
                                    alt="Team collaboration workspace"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    priority
                                />
                                {/* Optional Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Top Right */}
                            <div className="relative h-[135px] sm:h-[165px] lg:h-[195px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl group">
                                <Image
                                    src="/images/about/r2.png"
                                    alt="Modern office workspace"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Bottom Right */}
                            <div className="relative h-[135px] sm:h-[165px] lg:h-[195px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl group">
                                <Image
                                    src="/images/about/r4.png"
                                    alt="Team meeting and discussion"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WhyJoinUs;
