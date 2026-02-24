"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Linkedin, Quote, Globe, ArrowRight, Trophy, Star, Layout, Smartphone, Database, Heart, Coffee } from 'lucide-react';
import CommonTitle from '@/components/ui/CommonTitle';
import CoreValues from './CoreValues';
import TestimonialCarousel from '@/components/public/TestimonialCarousel2';
import ConsultationCTA from '@/components/common/Consultation-Cta';
import JoinTeamPopup from '@/components/admin/JoinTeamPopup';
import AwardsSection from '@/components/common/AwardsSection';

// Icon mapping for expertise section
const iconMap = {
    Layout,
    Smartphone,
    Database,
    Heart
};


// Gallery Section handled via props

const OurTeamClient = ({
    hero,
    ceo,
    leaders,
    marqueeTeam,
    values,
    expertise,
    process,
    testimonials,
    testimonialsData,
    galleryImages
}) => {
    const [isJoinPopupOpen, setIsJoinPopupOpen] = useState(false);

    // Icon mapping
    const iconMap = {
        Layout,
        Smartphone,
        Database,
        Heart
    };

    // --- MARQUEE CARD COMPONENT ---
    const TeamCard = ({ member }) => (
        <div className="flex flex-col items-center group flex-shrink-0 w-64 mx-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-sky-400 to-cyan-300 mb-5 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <div className="w-full h-full rounded-full border-4 border-white overflow-hidden relative bg-white">
                    <Image
                        src={member.image || "/images/placeholder-user.jpg"}
                        alt={member.name}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
            <div className="text-center w-full">
                <h4 className="text-slate-900 font-bold text-lg mb-1">{member.name}</h4>
                <span className="inline-block px-3 py-0.5 bg-sky-50 text-sky-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-sky-100">
                    {member.role}
                </span>
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-white font-sans overflow-x-hidden">
            {/* 1. HERO SECTION */}
            <section className="relative h-[450px] md:h-[350px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image src={hero.image} alt="Team Hero" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-sky-900/80 mix-blend-multiply"></div>
                </div>
                <div className="relative z-10 text-center text-white max-w-4xl px-6">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-lg tracking-tight">{hero.title}</h1>
                    <p className="text-lg md:text-xl text-sky-100 font-light max-w-2xl mx-auto">{hero.subtitle}</p>
                </div>
            </section>

            {/* 2. CEO DESK */}
            <section className="pt-20 px-6 max-w-7xl mx-auto mb10">
                <div className="flex flex-col lg:flex-row items-center relative mt-12">
                    {/* LEFT: Text Card */}
                    <div className="w-full lg:w-1/2 z-20 relative order-2 lg:order-1 lg:-mr-40 mt-[-50px] lg:mt-16">
                        <div className="text-sky-500 font-black text-3xl md:text-6xl uppercase mb-6 leading-none">
                            From CEO's <br /> <span className="text-slate-800">Desk</span>
                        </div>
                        <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl shadow-sky-900/10 border border-slate-100 relative">
                            <div className="bg-gradient-to-r from-blue-600 to-sky-500 text-white py-3 px-8 rounded-full rounded-tl-none inline-block shadow-lg font-bold text-lg mb-8">
                                {ceo.name}
                            </div>
                            <div className="relative">
                                <Quote className="text-slate-100 absolute -top-4 -left-2 transform scale-150 -z-10" size={80} />
                                <p className="text-slate-600 leading-relaxed text-lg font-medium pl-4 border-l-4 border-sky-400">
                                    "{ceo.message}"
                                </p>
                            </div>
                            {ceo.linkedin && (
                                <div className="mt-8 flex justify-end">
                                    <a href={ceo.linkedin} className="bg-[#0077b5] p-3 rounded-lg text-white hover:opacity-90 transition-all shadow-md">
                                        <Linkedin size={24} />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* RIGHT: CEO Image */}
                    <div className="w-full lg:w-3/5 relative z-10 order-1 lg:order-2">
                        <div className="relative aspect-[3/4] md:aspect-[16/16] w-full overflow-hidden ">
                            <Image src={ceo.image || "/images/team/Softkingo-Founder.png"} alt={ceo.name} fill className="object-cover object-top hover:scale-105 transition-transform duration-1000" />

                        </div>
                    </div>
                </div>
            </section>

            <div className='h-20 bg-sky-500'></div>

            {/* 3. MEET OUR TEAM */}
            <section className="py-24 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-8 mb-20">
                        {/* LEFT: Ribbon Container */}

                        <div className="relative inline-block">
                            <div className="bg-gradient-to-r from-cyan-500 to-sky-600 text-white py-6 pl-8 pr-20 rounded-r-full shadow-xl relative z-10 transform -skew-x-6 origin-bottom-left">
                                <div className="transform skew-x-6">
                                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wide">Meet Our <br /> Team</h2>
                                    <p className="text-sky-100 text-xs font-bold uppercase mt-1 tracking-widest">Driving Your Success</p>
                                </div>
                            </div>
                            <div className="absolute top-full left-0 w-6 h-4 bg-sky-800 z-10 skew-x-[45deg] origin-top-left">
                            </div>
                        </div>

                        {/* RIGHT: 6 Team Members Grid */}
                        <div className="flex-1">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16 justify-center">
                                {leaders.map((member, i) => (
                                    <div key={i} className="flex flex-col items-center group">
                                        <div className="w-32 h-32 md:w-44 md:h-46 rounded-t-2xl p-1 bg-gradient-to-tr from-sky-400 to-cyan-300 mb-5 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                                            <div className="w-full h-full rounded-t-2xl border-4 border-white overflow-hidden relative bg-white">
                                                <Image src={member.image || "/images/placeholder-user.jpg"} alt={member.name} fill className="object-cover" />
                                            </div>
                                        </div>
                                        <div className="text-center bg-sky-400 text-amber-50 px-6 py-2 relative -top-10 rounded-tr-full rounded-bl-full w-full max-w-[220px]">
                                            <h4 className="font-bold text-md leading-tight whitespace-nowrap">{member.name}</h4>
                                            <span className="inline-block text-[10px] font-bold uppercase">{member.role}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Part B: MARQUEE SCROLL */}
                {marqueeTeam.length > 0 && (
                    <div className="w-full overflow-hidden border-t border-sky-100/50 pt-16 pb-8 bg-sky-50/20">
                        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                            {[...marqueeTeam, ...marqueeTeam].map((member, i) => (
                                <TeamCard key={i} member={member} />
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* 4. EXPERTISE & SKILLS */}
            <section className="py-24 bg-gradient-to-b from-slate-50 to-white px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header using CommonTitle */}
                    <CommonTitle
                        align="center"
                        pill="Our Superpowers"
                        title="Expertise & Skills"
                        gradientText="Skills"
                        subtitle="We master the technologies that power modern digital experiences. From frontend to backend, design to deployment."
                    />

                    {/* Skills Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {expertise?.map((item, i) => (
                            <div key={i} className="group">
                                {/* Card */}
                                <div className="bg-white rounded-3xl border border-slate-200 p-8 h-full hover:shadow-2xl hover:shadow-sky-100/50 transition-all duration-500 relative overflow-hidden">
                                    {/* Background Pattern */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-50 to-transparent rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Icon */}
                                    <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                                        {iconMap[item.iconName] && React.createElement(iconMap[item.iconName], { size: 32, className: "text-white" })}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                    <p className="text-slate-600 leading-relaxed mb-6">{item.description}</p>

                                    {/* Skills List */}
                                    <div className="space-y-4">
                                        {item.skills?.map((skill, idx) => (
                                            <div key={idx} className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="font-medium text-slate-700">
                                                        {typeof skill === 'string' ? skill : skill.name}
                                                    </span>
                                                    <span className="text-sky-600 font-semibold">
                                                        {typeof skill === 'string' ? '90' : skill.level}%
                                                    </span>
                                                </div>
                                                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
                                                        style={{
                                                            width: typeof skill === 'string' ? '90%' : `${skill.level}%`
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center mt-16">
                        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <Globe className="w-5 h-5" />
                            Ready to build your project?
                            <ArrowRight className="w-5 h-5" />
                        </div>
                        <p className="mt-4 text-slate-600">
                            Let's discuss how our expertise can help you succeed
                        </p>
                    </div>
                </div>
            </section>

            {/* 5. PROCESS - HOW WE WORK */}
            <section className="py-24 bg-gradient-to-br from-white to-sky-100 px-6 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-sky-200 rounded-full blur-[80px] opacity-30 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header using CommonTitle */}
                    <CommonTitle
                        align="center"
                        pill="Our Process"
                        title="How We Work"

                        subtitle="Our streamlined process ensures transparency, speed, and quality at every step of your project journey."
                    />

                    {/* Process Steps */}
                    <div className="relative mt-20">
                        {/* Desktop Connecting Line */}
                        <div className="hidden lg:block absolute top-0 left-0 w-full h-0.5 border-t-[3px] border-dashed border-sky-400/30 z-0 transform translate-y-8"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative z-10">
                            {process?.map((step, idx) => (
                                <div key={idx} className="group relative">
                                    {/* Floating Number Badge */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-800/50 backdrop-blur-sm border-4 border-sky-400/30 rounded-full flex items-center justify-center z-20 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:border-sky-400 group-hover:bg-sky-600">
                                        <span className="text-xl font-black text-sky-400 group-hover:text-white transition-colors duration-300">
                                            {step.step}
                                        </span>
                                    </div>

                                    {/* Process Card */}
                                    <div className="h-full bg-white/80 backdrop-blur-sm pt-14 pb-8 px-6 rounded-3xl border border-sky-100/50 text-center transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-sky-500/20 hover:-translate-y-2">
                                        {/* Decorative Dot */}
                                        <div className="w-2 h-2 rounded-full bg-sky-400/50 mx-auto mb-4 group-hover:bg-sky-400 transition-colors"></div>

                                        <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                                            {step.title}
                                        </h4>
                                        <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                                            {step.desc}
                                        </p>
                                    </div>

                                    {/* Mobile Connector */}
                                    {idx !== process.length - 1 && (
                                        <div className="lg:hidden absolute bottom-[-32px] left-1/2 -translate-x-1/2 w-0.5 h-8 bg-sky-400/30 border-l border-dashed"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center mt-16">
                        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <Coffee className="w-5 h-5" />
                            Let's discuss your project
                            <ArrowRight className="w-5 h-5" />
                        </div>
                        <p className="mt-4 text-slate-400">
                            Ready to start your journey with us?
                        </p>
                    </div>
                </div>
            </section>

            {/* 6. CORE VALUES */}
            <CoreValues values={values} />

            {/* 7. AWARDS & RECOGNITIONS */}
            <AwardsSection />

            {/* 8. GALLERY - LIFE AT SOFTKINGO */}
            <section className="py-24 bg-white px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header using CommonTitle */}
                    <CommonTitle
                        align="center"
                        pill="Culture"
                        title="Life at Softkingo"
                        subtitle="We believe that happy teams build better products. Get a glimpse of our culture."
                    />

                    {/* Masonry Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[190px] mt-16">
                        {galleryImages?.map((img) => (
                            <div key={img.id} className={`relative rounded-[2rem] overflow-hidden group ${img.span} ${img.height}`}>
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-sky-900/0 transition-colors duration-300 group-hover:bg-sky-900/40"></div>
                                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {img.alt}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-xl font-bold text-slate-800">Building memories, <span className="text-sky-500">not just software.</span></p>
                    </div>
                </div>
            </section>

            {/* 8. TESTIMONIALS */}
            <section className="py-24 bg-gradient-to-br from-white to-sky-100 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header using CommonTitle */}
                    <CommonTitle
                        align="center"
                        pill="Client Reviews"
                        title="Client feedback"
                        subtitle="Real feedback from real clients who have experienced our work firsthand."
                    />

                    {/* Testimonial Carousel with Different Design */}
                    <TestimonialCarousel data={testimonialsData} />
                </div>
            </section>



            <ConsultationCTA title="Join Our Team" subtitle="We are always looking for talent." href="/contact" />

            {/* Join Team Popup */}
            <JoinTeamPopup
                isOpen={isJoinPopupOpen}
                onClose={() => setIsJoinPopupOpen(false)}
            />
        </main>
    );
};

export default OurTeamClient;
