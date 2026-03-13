"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaSearch, FaChevronRight, FaClock, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import ApplicationForm from './CareerForm';
import PopupQuoteModal from '@/components/PopupQuoteModal';
import ConsultationCTA from '@/components/common/Consultation-Cta';
import CommonTitle from '@/components/ui/CommonTitle';
import BlogSection from '@/components/common/BlogSection';
import FAQAccordion from '@/components/common/Faqaccordion';
import InquirySection from '@/components/footer/InquirySection';

// Static fallback jobs shown before API loads or on error
const FALLBACK_JOBS = [
    { id: 1, title: 'React.js Developer', location: 'Noida (On-site)', experience: '2-3 Years', type: 'Full Time', department: 'Development', salary: 'Competitive' },
    { id: 2, title: 'PHP + Laravel Developer', location: 'Noida (On-site)', experience: '1-3 Years', type: 'Full Time', department: 'Development', salary: 'Competitive' },
    { id: 3, title: 'Business Analyst', location: 'Noida (On-site)', experience: '2-3 Years', type: 'Full Time', department: 'BA', salary: 'Competitive' },
    { id: 4, title: 'Technical Lead', location: 'Noida (On-site)', experience: '5+ Years', type: 'Full Time', department: 'Development', salary: 'Competitive' },
];

const WhyJoinUs = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobs, setJobs] = useState(FALLBACK_JOBS);
    const [jobsLoading, setJobsLoading] = useState(true);
    const [galleryImages, setGalleryImages] = useState([]);
    const [galleryLoading, setGalleryLoading] = useState(true);

    const [filters, setFilters] = useState({
        search: '',
        department: '',
        location: ''
    });

    const filteredJobs = jobs.filter(job => {
        const matchSearch = !filters.search ||
            job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            job.department.toLowerCase().includes(filters.search.toLowerCase());
        const matchDept = !filters.department || job.department === filters.department;
        const matchLoc = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
        return matchSearch && matchDept && matchLoc;
    });

    // Fetch jobs and gallery images
    useEffect(() => {
        const loadData = async () => {
            try {
                // Load Jobs
                const jobRes = await fetch('/api/jobs');
                if (jobRes.ok) {
                    const data = await jobRes.json();
                    if (data.jobs && data.jobs.length > 0) setJobs(data.jobs);
                }

                // Load Gallery Images (tag: gallery-office or similar)
                const mediaRes = await fetch('/api/admin/media?tag=office');
                if (mediaRes.ok) {
                    const data = await mediaRes.json();
                    if (data.items && data.items.length > 0) {
                        setGalleryImages(data.items.slice(0, 6).map(img => ({
                            src: img.filePath.startsWith('/') ? img.filePath : `/uploads/${img.filePath}`,
                            alt: img.title || 'Softkingo Culture'
                        })));
                    }
                }
            } catch (err) {
                console.error("Data loading error:", err);
            } finally {
                setJobsLoading(false);
                setGalleryLoading(false);
            }
        };
        loadData();
    }, []);

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleApplyNow = (job) => {
        setSelectedJob(job);
        const formElement = document.getElementById('career-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative w-full overflow-hidden bg-gradient-to-br from-white via-sky-50 to-blue-50">
                <div className="container mx-auto px-4 py-20 lg:py-32">
                    <div className="relative min-h-[600px] flex items-center justify-center">

                        {/* Decorative Team Images */}
                        <div className="absolute top-0 left-0 w-44 h-56 lg:w-64 lg:h-80 rounded-3xl overflow-hidden shadow-2xl rotate-[-6deg] hover:rotate-0 transition-all duration-500 z-10 hidden xl:block border-8 border-white">
                            <Image src="/images/about/r1.png" alt="Team" fill className="object-cover" />
                        </div>
                        <div className="absolute top-10 right-0 w-40 h-52 lg:w-60 lg:h-72 rounded-3xl overflow-hidden shadow-2xl rotate-[8deg] hover:rotate-0 transition-all duration-500 z-10 hidden xl:block border-8 border-white">
                            <Image src="/images/about/r2.png" alt="Office" fill className="object-cover" />
                        </div>
                        <div className="absolute bottom-0 left-10 w-36 h-48 lg:w-56 lg:h-64 rounded-3xl overflow-hidden shadow-2xl rotate-[5deg] hover:rotate-0 transition-all duration-500 z-10 hidden xl:block border-8 border-white">
                            <Image src="/images/about/r3.png" alt="Culture" fill className="object-cover" />
                        </div>
                        <div className="absolute bottom-10 right-10 w-48 h-60 lg:w-72 lg:h-80 rounded-3xl overflow-hidden shadow-2xl rotate-[-4deg] hover:rotate-0 transition-all duration-500 z-10 hidden xl:block border-8 border-white">
                            <Image src="/images/about/r4.png" alt="Celebration" fill className="object-cover" />
                        </div>

                        {/* Hero Content */}
                        <div className="relative z-20 text-center max-w-4xl px-4">
                            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-sky-100 text-sky-600 text-xs font-bold uppercase tracking-widest animate-bounce">
                                Join Our Innovative Team
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-slate-800 mb-2">
                                Build Your Career At
                            </h1>
                            <h2 className="text-5xl sm:text-6xl md:text-8xl font-black bg-gradient-to-r from-sky-900 to-sky-600 bg-clip-text text-transparent mb-10">
                                Softkingo
                            </h2>
                            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
                                Join Softkingo to not only become a subject matter expert but also make a lasting impact. We&apos;re seeking passionate tech enthusiasts to shape the future together.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                    <button
                                        onClick={() => handleApplyNow(null)}
                                        className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-600 to-sky-400 text-white font-bold text-lg shadow-2xl shadow-sky-200 hover:-translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-3 group">
                                        View Openings
                                        <FaChevronRight className="text-sm group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="w-full sm:w-auto bg-white border border-sky-600 text-sky-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-sm hover:bg-sky-50 transition-all cursor-pointer">
                                        Hear from Team
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Search Section */}
            <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-slate-200"></div>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <CommonTitle
                            align="center"
                            pill="CURRENT OPENINGS"
                            title={false}
                            gradientText="Find Your Dream Job"
                            subtitle="Join Softkingo to build world-class products and grow with a team that values innovation and excellence."
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                        {/* Filters */}
                        <aside className="lg:col-span-1 space-y-6">
                            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] sticky top-24">
                                <div className="space-y-8">
                                    <div>
                                        <label className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 block">Search Job</label>
                                        <div className="relative group">
                                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500 group-focus-within:scale-110 transition-transform" />
                                            <input
                                                type="text"
                                                placeholder="Keyword..."
                                                value={filters.search}
                                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                                className="w-full bg-slate-50 text-slate-700 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 border border-slate-100 transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 block">Department</label>
                                        <div className="relative">
                                            <select
                                                value={filters.department}
                                                onChange={(e) => handleFilterChange('department', e.target.value)}
                                                className="w-full bg-slate-50 text-slate-700 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 border border-slate-100 appearance-none cursor-pointer font-medium"
                                            >
                                                <option value="">All Departments</option>
                                                <option value="Development">Development</option>
                                                <option value="Design">Design</option>
                                                <option value="BA">Business Analysis</option>
                                                <option value="Marketing">Marketing</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 block">Location</label>
                                        <div className="relative">
                                            <select
                                                value={filters.location}
                                                onChange={(e) => handleFilterChange('location', e.target.value)}
                                                className="w-full bg-slate-50 text-slate-700 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 border border-slate-100 appearance-none cursor-pointer font-medium"
                                            >
                                                <option value="">All Locations</option>
                                                <option value="Noida">Noida</option>
                                                <option value="Delhi">Delhi</option>
                                                <option value="Remote">Remote</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-sky-600 to-sky-800 p-8 rounded-[32px] text-white shadow-xl shadow-sky-800/10 overflow-hidden relative group">
                                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                                <h4 className="text-xl font-bold mb-3 relative z-10">Don&apos;t see a fit?</h4>
                                <p className="text-sky-100 text-sm mb-8 leading-relaxed opacity-90 relative z-10">Send us your CV anyway and we&apos;ll keep you in mind for future roles.</p>
                                <button
                                    onClick={() => handleApplyNow(null)}
                                    className="w-full bg-white text-sky-700 font-bold py-4 rounded-2xl hover:bg-sky-50 transition-all cursor-pointer relative z-10 shadow-lg active:scale-95"
                                >
                                    Drop Your Resume
                                </button>
                            </div>
                        </aside>

                        {/* Job Cards */}
                        <div className="lg:col-span-3 space-y-6">
                            {jobsLoading ? (
                                <div className="flex flex-col items-center justify-center py-24 gap-4">
                                    <div className="w-12 h-12 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin"></div>
                                    <p className="text-slate-400 font-medium animate-pulse">Loading opportunities...</p>
                                </div>
                            ) : filteredJobs.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-24 text-center bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
                                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm">
                                        <FaBriefcase className="text-slate-300 text-3xl" />
                                    </div>
                                    <h4 className="text-slate-800 font-bold text-xl mb-2">No openings found</h4>
                                    <p className="text-slate-500 max-w-xs mx-auto">We couldn&apos;t find any roles matching your current filters. Try adjusting them!</p>
                                    <button
                                        onClick={() => setFilters({ search: '', department: '', location: '' })}
                                        className="mt-8 text-sky-600 font-bold hover:underline"
                                    >
                                        Reset All Filters
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {filteredJobs.map((job) => (
                                        <div
                                            key={job.id}
                                            className="group bg-white p-6 sm:p-8 rounded-[32px] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                                                <div className="flex-1">
                                                    <div className="flex flex-wrap items-center gap-3 mb-6">
                                                        <span className="px-4 py-1.5 bg-sky-50 text-sky-600 text-[10px] font-bold uppercase tracking-wider rounded-full border border-sky-100">{job.department}</span>
                                                        <span className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                                                            <FaClock className="text-[10px]" /> {job.type}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 group-hover:text-sky-600 transition-colors leading-normal">{job.title}</h3>
                                                    <div className="flex flex-wrap gap-x-8 gap-y-4 text-slate-500">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-sky-50 transition-colors"><FaMapMarkerAlt className="text-sky-500 text-sm" /></div>
                                                            <span className="text-sm font-semibold">{job.location}</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-sky-50 transition-colors"><FaBriefcase className="text-sky-500 text-sm" /></div>
                                                            <span className="text-sm font-semibold">{job.experience}</span>
                                                        </div>
                                                        {job.salary && (
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-sky-50 transition-colors"><FaCheckCircle className="text-sky-500 text-sm" /></div>
                                                                <span className="text-sm font-semibold">{job.salary}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center pt-4 md:pt-0">
                                                    <button
                                                        onClick={() => handleApplyNow(job)}
                                                        className="w-full md:w-auto bg-slate-900 hover:bg-sky-600 text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-lg hover:-translate-y-1 flex items-center justify-center gap-3 group/btn cursor-pointer"
                                                    >
                                                        Apply For Role
                                                        <FaChevronRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <ConsultationCTA imageSrc="/images/cta/cta-img.png" href="/contact" />

            {/* Life at Softkingo Gallery */}
            <section className="py-20 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="mb-16">
                        <CommonTitle
                            align="center"
                            pill="LIFE AT SOFTKINGO"
                            title={false}
                            gradientText="Where Work Meets Happiness"
                            subtitle="Explore our vibrant workspace and see how we balance professional excellence with social connections and fun."
                        />
                    </div>

                    <div className="max-w-6xl mx-auto">
                        {galleryLoading ? (
                            <div className="flex justify-center py-12"><FaSpinner className="animate-spin text-3xl text-sky-500" /></div>
                        ) : galleryImages.length > 0 ? (
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                                {galleryImages.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`relative rounded-3xl overflow-hidden shadow-lg group ${idx === 0 ? 'lg:col-span-2 lg:row-span-2 aspect-[4/3] lg:aspect-auto' : 'aspect-square'}`}
                                    >
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-sky-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                            <p className="text-white font-bold text-lg">{img.alt}</p>
                                            <p className="text-sky-200 text-xs">Softkingo Culture</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-400 font-medium">No workspace photos available.</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Be Part of Us */}
            <section className="relative w-full bg-slate-50 py-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <CommonTitle
                                align="left"
                                pill="OUR CULTURE"
                                title={false}
                                gradientText="Be Part of the Growth"
                                subtitle="Working with Softkingo is not just a job—it's a journey of excellence. Here, you'll find endless opportunities for self-exploration and professional growth."
                            />

                            <div className="space-y-6">
                                {[
                                    { title: 'Fast-paced Career', desc: 'Accelerate your growth with challenging projects that push boundaries.' },
                                    { title: 'Global Exposure', desc: 'Work with clients and teams from around the world to gain diverse perspectives.' },
                                    { title: 'Tech Excellence', desc: 'Stay ahead with the latest tools, methodologies, and continuous learning.' },
                                    { title: 'Fun Workplace', desc: 'Laughter, friendship, and celebrations are part of our team DNA.' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-5 group">
                                        <div className="w-12 h-12 rounded-full bg-white flex-shrink-0 flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 group-hover:bg-sky-50 transition-all">
                                            <FaCheckCircle className="text-sky-500 text-xl" />
                                        </div>
                                        <div>
                                            <h4 className="text-slate-800 font-bold text-lg mb-1">{item.title}</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-4 bg-sky-500/10 rounded-[60px] blur-2xl group-hover:bg-sky-500/15 transition-all"></div>
                            <div className="relative rounded-[48px] overflow-hidden shadow-3xl border-8 border-white">
                                <Image
                                    src="/images/career/r3.png"
                                    alt="Team success"
                                    width={700}
                                    height={500}
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <div id="career-form" className="scroll-mt-20">
                <ApplicationForm selectedJob={selectedJob} />
            </div>

            {/* Final CTA/Vision */}
            {/* Final CTA / Vision Section */}
            <section className="relative w-full min-h-[500px] bg-gradient-to-br from-white via-sky-50 to-sky-100 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div className="text-black space-y-6 lg:space-y-8">
                            <div className="text-left md:pl-8 lg:pl-12 mb-8 sm:mb-12">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-sky-900 leading-normal">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500">
                                        Start your career at Softkingo, Let&apos;s create a better digital future together.
                                    </span>
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8">
                                    At Softkingo, we offer an environment that fosters innovation, collaboration, and
                                    continuous growth. You&apos;ll have the chance to work with cutting-edge technologies,
                                    solve real-world challenges, and make a meaningful impact. Join us and shape
                                    the future!
                                </p>
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <button
                                        onClick={() => handleApplyNow(null)}
                                        className="w-full sm:w-auto bg-sky-600 text-white font-black px-12 py-5 rounded-2xl hover:bg-sky-700 transition-all shadow-xl shadow-sky-200 active:scale-95 cursor-pointer"
                                    >
                                        Apply For Role
                                    </button>
                                    <a href="/about" className="text-sky-700 font-bold flex items-center gap-2 hover:gap-4 transition-all">
                                        Learn about our vision <FaChevronRight className="text-xs" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                            <div className="relative row-span-2 h-[280px] sm:h-[340px] lg:h-[400px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl group border-4 border-white">
                                <Image
                                    alt="Team collaboration workspace"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    src="/images/career/r4.png"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="relative h-[135px] sm:h-[165px] lg:h-[195px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl group border-4 border-white">
                                <Image
                                    alt="Modern office workspace"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    src="/images/about/r2.png"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="relative h-[135px] sm:h-[165px] lg:h-[195px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl group border-4 border-white">
                                <Image
                                    alt="Team meeting and discussion"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    src="/images/about/r4.png"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <BlogSection title="Our Latest Blogs" />
            <FAQAccordion />
            <InquirySection />
            <PopupQuoteModal open={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
};

export default WhyJoinUs;
