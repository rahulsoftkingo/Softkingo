'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CommonTitle from '@/components/ui/CommonTitle';
import PhoneField from '@/components/common/PhoneField';
import { countryList } from "@/data/countries";

export default function ApplicationForm({ selectedJob }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        currentJob: '',
        education: '',
        linkedinUrl: '',
        portfolioUrl: '',
        coverLetter: '',
        resume: null
    });
    const [selectedCountry, setSelectedCountry] = useState(countryList[1]); // Default to India (index 1)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    // Auto-fill form when selectedJob changes
    useEffect(() => {
        if (selectedJob) {
            setFormData(prev => ({
                ...prev,
                position: selectedJob.title,
                experience: selectedJob.experience,
            }));
        }
    }, [selectedJob]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const formDataToSend = new FormData();

            // Add all form fields
            Object.keys(formData).forEach(key => {
                if (key !== 'resume' && formData[key]) {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // Adjust phone with dial code
            const fullPhone = `(${selectedCountry.dial}) ${formData.phone}`;
            formDataToSend.set('phone', fullPhone);

            // Add resume file if exists
            if (formData.resume) {
                formDataToSend.append('resume', formData.resume);
            }

            // Add source
            formDataToSend.append('source', 'career_page');

            const response = await fetch('/api/career', {
                method: 'POST',
                body: formDataToSend,
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitMessage('Application submitted successfully! We will get back to you soon.');
                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    position: '',
                    experience: '',
                    currentJob: '',
                    education: '',
                    linkedinUrl: '',
                    portfolioUrl: '',
                    coverLetter: '',
                    resume: null
                });
            } else {
                setSubmitMessage(data.error || 'Failed to submit application. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitMessage('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-8 lg:mb-16">
                    <CommonTitle
                        align="center"
                        pill="JOIN OUR TEAM"
                        title={false}
                        gradientText="Start Your Journey With Us"
                        subtitle="At Softkingo, milestones are more than just achievements, they're moments to celebrate. We foster an environment where memories, friendships, and laughter thrive."
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">

                    {/* Left Side - How It Works */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 rounded-[40px] p-8 sm:p-10 lg:p-12 shadow-2xl border border-white/10 h-full relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>

                        <h2 className="text-3xl sm:text-4xl font-black text-white mb-8 relative z-10">How It Works</h2>
                        <p className="text-blue-100/70 text-base mb-12 leading-relaxed relative z-10 font-medium">
                            It all starts with your CV. We can&apos;t wait to meet you and find out what sets
                            you apart! Join our team dynamics by following these simple steps.
                        </p>

                        {/* Steps Flow with Animation */}
                        <div className="space-y-6 relative z-10">
                            {[
                                { step: '01', title: 'Send Your CV', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                                { step: '02', title: 'Stay in Touch', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                                { step: '03', title: 'Complete a Test', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
                                { step: '04', title: 'Get Interviewed', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                                { step: '05', title: 'Join Our Team', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' }
                            ].map((item, idx, arr) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                >
                                    <div className="flex items-center gap-6 group">
                                        <div className="flex-shrink-0 text-right w-14">
                                            <span className="text-sky-400 text-[11px] font-black block mb-0.5 tracking-tighter">PHASE</span>
                                            <p className="text-white text-3xl font-black leading-none">{item.step}</p>
                                        </div>

                                        <div className="flex justify-between w-full items-center bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 transition-all duration-300 border border-white/5 hover:border-sky-500/30 group-hover:translate-x-2">
                                            <p className="text-sky-50 font-bold text-lg">{item.title}</p>
                                            <div className="flex-shrink-0 bg-sky-500/20 rounded-xl p-2.5 w-12 h-12 flex items-center justify-center shadow-lg border border-sky-400/20 group-hover:bg-sky-500 group-hover:scale-110 transition-all duration-500">
                                                <svg className="w-6 h-6 text-sky-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    {idx !== arr.length - 1 && (
                                        <div className="ml-7 border-l-2 border-dashed border-sky-400/20 h-8 my-1"></div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side - Application Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-[40px] p-8 sm:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-slate-100 h-full"
                    >
                        {selectedJob && (
                            <div className="mb-6 p-4 bg-sky-50 border border-sky-100 rounded-2xl flex items-center gap-3">
                                <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white text-lg ring-4 ring-sky-100">
                                    ✓
                                </div>
                                <div>
                                    <p className="text-xs text-sky-600 font-semibold uppercase tracking-wider">Applying for</p>
                                    <p className="text-slate-800 font-bold">{selectedJob.title} <span className="text-sky-600 font-normal">({selectedJob.experience})</span></p>
                                </div>
                            </div>
                        )}

                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-700 to-sky-500 bg-clip-text text-transparent">Find Your Career</h2>
                            <p className="text-slate-500 text-sm mt-1">Fill out the form below to apply</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name Fields */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <FloatingInput
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. John"
                                />
                                <FloatingInput
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. Doe"
                                />
                            </div>

                            {/* Email and Phone */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <FloatingInput
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="john@example.com"
                                />
                                <PhoneField
                                    phone={formData.phone}
                                    setPhone={(val) => setFormData(prev => ({ ...prev, phone: val }))}
                                    selectedCountry={selectedCountry}
                                    setSelectedCountry={setSelectedCountry}
                                    label="Phone Number"
                                    placeholder="98765 43210"
                                />
                            </div>

                            {/* Job Title and Experience */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <FloatingInput
                                    label="Position Applied For"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Developer, Designer etc."
                                />
                                <FloatingInput
                                    label="Years of Experience"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 3+ years"
                                />
                            </div>

                            {/* Current Job and Education */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <FloatingInput
                                    label="Current Job Title"
                                    name="currentJob"
                                    value={formData.currentJob}
                                    onChange={handleInputChange}
                                    placeholder="Current Role"
                                />
                                <FloatingInput
                                    label="Education"
                                    name="education"
                                    value={formData.education}
                                    onChange={handleInputChange}
                                    placeholder="Highest Degree"
                                />
                            </div>

                            {/* LinkedIn and Portfolio */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <FloatingInput
                                    label="LinkedIn Profile"
                                    name="linkedinUrl"
                                    type="url"
                                    value={formData.linkedinUrl}
                                    onChange={handleInputChange}
                                    placeholder="linkedin.com/in/..."
                                />
                                <FloatingInput
                                    label="Portfolio Website"
                                    name="portfolioUrl"
                                    type="url"
                                    value={formData.portfolioUrl}
                                    onChange={handleInputChange}
                                    placeholder="yourportfolio.com"
                                />
                            </div>

                            {/* Cover Letter */}
                            <div className="relative rounded-2xl border border-slate-300 bg-white px-4 pt-1 pb-3 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-200 transition-all">
                                <label className="inline-block px-1 text-[11px] text-slate-500 bg-white relative -top-3.5 left-0 font-medium tracking-tight">
                                    Cover Letter
                                </label>
                                <textarea
                                    name="coverLetter"
                                    value={formData.coverLetter}
                                    onChange={handleInputChange}
                                    placeholder="Tell us about yourself..."
                                    rows="3"
                                    className="w-full bg-transparent border-none outline-none text-slate-800 text-sm -mt-2 resize-none placeholder:text-slate-300"
                                ></textarea>
                            </div>

                            {/* File Upload */}
                            <div className="group">
                                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 group-hover:border-sky-400 rounded-2xl p-6 bg-slate-50/50 group-hover:bg-sky-50 transition-all cursor-pointer">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-slate-400 group-hover:text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-700">
                                        {formData.resume ? formData.resume.name : 'Click to Upload Resume'}
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">PDF, DOC, DOCX (Max 5MB)</p>
                                    <input type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx" />
                                </label>
                            </div>

                            {/* Submit Message */}
                            {submitMessage && (
                                <div className={`p-4 rounded-2xl text-sm font-medium animate-in fade-in slide-in-from-top-2 ${submitMessage.includes('successfully') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                                    {submitMessage}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-sky-700 hover:bg-sky-800 disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-sky-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Submitting...</span>
                                    </>
                                ) : 'Submit Application'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function FloatingInput({ label, name, value, onChange, placeholder, type = "text", required }) {
    return (
        <div className="relative h-12 border border-slate-300 rounded-lg bg-white px-4 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-200 transition-all">
            <label className="inline-block px-1 text-[11px] text-slate-500 bg-white relative -top-4 left-0 font-medium">
                {label}{required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full bg-transparent border-none outline-none text-slate-800 text-sm -top-2 relative placeholder:text-slate-300"
            />
        </div>
    );
}
