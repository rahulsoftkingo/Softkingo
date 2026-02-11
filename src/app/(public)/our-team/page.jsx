import React from 'react';
import Image from 'next/image';
import { Linkedin, Quote, CheckCircle2 } from 'lucide-react';
import ConsultationCTA from '@/components/common/Consultation-Cta'; // Ensure path is correct
import prisma from '@/lib/db'; 

// --- STATIC FALLBACK DATA (Agar DB me data nahi mila to ye dikhega) ---
const STATIC_DATA = {
    hero: {
        title: "Meet the minds behind Softkingo",
        subtitle: "A team of passionate developers, designers, and strategists building smart solutions.",
        image: "/images/contact-hero.png"
    },
    ceo: {
        name: "Paramhans Singh",
        role: "CEO & Founder",
        message: "We were very impressed with the service provided by this business. From start to finish, every step of the process was smooth, professional and effective.",
        image: "/images/team/ceo.png",
        linkedin: "#"
    },
   teamList: [
        { name: "John Doe", role: "CTO", image: "/images/team/m1.jpg", category: "management" },
        { name: "Jane Smith", role: "COO", image: "/images/team/m2.jpg", category: "management" },
        { name: "Alice Brown", role: "Tech Lead", image: "/images/team/m3.jpg", category: "tech-lead" },
        { name: "Bob White", role: "Marketing Head", image: "/images/team/m4.jpg", category: "marketing-lead" },
        // Employees for Slider
        { name: "Dev 1", role: "Senior Dev", image: "/images/team/e1.jpg", category: "employee" },
        { name: "Dev 2", role: "Frontend Dev", image: "/images/team/e2.jpg", category: "employee" },
        { name: "Marketer 1", role: "SEO Expert", image: "/images/team/e3.jpg", category: "employee" },
        { name: "Designer 1", role: "UI Designer", image: "/images/team/e4.jpg", category: "employee" },
        { name: "Dev 3", role: "Backend Dev", image: "/images/team/e5.jpg", category: "employee" },
        { name: "Dev 4", role: "Full Stack", image: "/images/team/e6.jpg", category: "employee" },
    ],
    values: [
    { 
        title: "Integrity", 
        description: "No hidden costs, no fake promises. We believe in being 100% open and honest, treating your business exactly like we treat our own." 
    },
    { 
        title: "Define Clear Goals", 
        description: "We hate confusion. Before writing a single line of code, we define exactly what needs to be done so you always know where your project is heading." 
    },
    { 
        title: "Differentiate Your Brand", 
        description: "Why blend in when you can stand out? We craft unique digital experiences that make sure your customers remember you, not your competitors." 
    },
    { 
        title: "Focus on Value", 
        description: "We don't just build features; we build solutions that work. If it doesn't add real value to your business growth, we don't do it." 
    }
]
};

// --- DATA FETCHER ---
async function getTeamData() {
    try {
        const page = await prisma.page.findUnique({ where: { slug: 'our-team' } });
        if (page && page.contentJson) {
            const dbContent = JSON.parse(page.contentJson);
            // Merge DB content with static structure if needed
            return { 
                hero: dbContent.content?.hero || STATIC_DATA.hero,
                ceo: dbContent.content?.ceo || STATIC_DATA.ceo,
                teamList: dbContent.content?.teamList?.items || STATIC_DATA.teamList,
                values: dbContent.content?.values?.items || STATIC_DATA.values
            };
        }
    } catch (e) {
        console.error("DB Fetch Error, using static data");
    }
    return STATIC_DATA;
}
// --- SUB-COMPONENT: MEMBER CARD ---
const MemberCard = ({ member }) => (
    <div className="flex flex-col items-center group">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden mb-4 relative group-hover:-translate-y-2 transition-all duration-300 ring-4 ring-sky-50 group-hover:ring-sky-200">
            <Image 
                src={member.image && member.image.startsWith('/') ? member.image : "/images/placeholder-user.jpg"} 
                alt={member.name} 
                fill 
                className="object-cover" 
            />
        </div>
        <div className="bg-sky-500 text-white px-5 py-1.5 rounded-full text-sm font-bold mb-2 shadow-md transform group-hover:scale-110 transition-transform">
            {member.name}
        </div>
        <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider text-center">{member.role}</span>
    </div>
);
export const metadata = {
    title: 'Our Team | Softkingo',
    description: 'Meet the experts driving Softkingo success.',
    
};

export default async function OurTeamPage() {
    const data = await getTeamData();
    const { hero, ceo, teamList, values } = data;
// For now, assuming you will add 'category' in admin or use role logic
    const management = teamList.filter(m => m.category === 'management' || ['CTO', 'COO', 'Director', 'Manager'].some(r => m.role.includes(r)));
    const techLeaders = teamList.filter(m => m.category === 'tech-lead' || ['Tech Lead', 'Architect', 'Head'].some(r => m.role.includes(r)) && !management.includes(m));
    const employees = teamList.filter(m => !management.includes(m) && !techLeaders.includes(m));
    return (
        <main className="min-h-screen bg-white font-sans">
            
            {/* 1. HERO SECTION */}
            <section className="relative h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src={hero.image} 
                        alt="Team Hero" 
                        fill 
                        className="object-cover"
                        priority
                    />
                    {/* Sky Overlay */}
                    <div className="absolute inset-0 bg-sky-100/70 mix-blend-multiply"></div> 
                </div>
                
                <div className="relative z-10 text-center text-white max-w-4xl px-6">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight drop-shadow-lg">
                        {hero.title}
                    </h1>
                    <p className="text-lg md:text-xl text-sky-100 font-light max-w-2xl mx-auto">
                        {hero.subtitle}
                    </p>
                </div>
            </section>

            {/* 2. TEAM HEADER BANNER (Between Hero and CEO) */}
            <div className="relative -mt-8 z-20 container mx-auto px-6 mb-20">
                <div className="bg-sky-500 text-white py-6 px-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto transform -skew-x-6">
                    <div className="transform skew-x-6 text-center md:text-left">
                        <h2 className="text-3xl font-black uppercase tracking-wider">TEAM</h2>
                    </div>
                    <div className="transform skew-x-6 text-center md:text-right">
                        <p className="font-bold text-sky-100 text-sm md:text-base uppercase">Are you the one we need to become a successful team?</p>
                    </div>
                </div>
            </div>
            <div className="relative z-10 text-center max-w-2xl mx-auto">
<p className="mt-12 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Check back soon
                </p>
                </div>
            {/* 3. CEO DESK SECTION */}
            <section className="py-10 px-6 max-w-7xl mx-auto hidden">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left: Text & Quote */}
                    <div className="space-y-8 relative">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-sky-500 mb-2">From CEO's <br/>
                            <span className="text-sky-300">Desk</span></h2>
                        </div>
                        
                        <div className="relative bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-50 mt-12">
                            {/* Floating Name Tag */}
                            <div className="absolute -top-6 left-0 bg-sky-600 text-white px-8 py-3 rounded-r-full shadow-lg font-bold text-lg">
                                {ceo.name}
                            </div>
                            
                            {/* LinkedIn Icon */}
                            {ceo.linkedin && (
                                <a href={ceo.linkedin} className="absolute -top-5 right-8 bg-white p-2 rounded-lg shadow-sm border border-slate-100 text-sky-600 hover:text-sky-700">
                                    <Linkedin size={24} />
                                </a>
                            )}

                            <div className="mt-6">
                                <Quote className="text-sky-200 mb-4 fill-sky-50" size={40} />
                                <p className="text-slate-600 italic leading-relaxed text-lg">
                                    "{ceo.message}"
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: CEO Image */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-[450px] aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-100">
                            {/* Ensure image path is valid or use placeholder */}
                            <Image 
                                src={ceo.image && ceo.image.startsWith('/') ? ceo.image : "/images/team/ceo.png"} 
                                alt={ceo.name} 
                                fill 
                                className="object-cover object-top hover:scale-105 transition-transform duration-700" 
                            />
                        </div>
                        {/* Decorative Blob */}
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-sky-100 rounded-full blur-3xl -z-10 opacity-60"></div>
                    </div>
                </div>
            </section>
{/* 3. CORE MANAGEMENT (Static Grid) */}
            <section className="py-24 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden hidden">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Badge Title */}
                    <div className="flex justify-center mb-16">
                        <div className="relative bg-sky-500 text-white py-4 px-12 rounded-full shadow-lg">
                            <h2 className="text-3xl font-black uppercase tracking-wider">Our Leaders</h2>
                            <div className="absolute top-1/2 -left-4 w-8 h-8 bg-sky-700 rounded-full -translate-y-1/2 border-4 border-white"></div>
                            <div className="absolute top-1/2 -right-4 w-8 h-8 bg-sky-700 rounded-full -translate-y-1/2 border-4 border-white"></div>
                        </div>
                    </div>

                    {/* Management Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-center">
                        {management.map((member, i) => <MemberCard key={i} member={member} />)}
                    </div>

                    {/* Tech & Marketing Leads (Sub-section) */}
                    {techLeaders.length > 0 && (
                        <div className="mt-24">
                            <h3 className="text-center text-2xl font-bold text-slate-700 mb-12 flex items-center justify-center gap-4">
                                <span className="h-px w-16 bg-slate-300"></span>
                                Tech & Marketing Heads
                                <span className="h-px w-16 bg-slate-300"></span>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-center">
                                {techLeaders.map((member, i) => <MemberCard key={i} member={member} />)}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* 4. THE TEAM (Infinite Slider) */}
            <section className="py-24 bg-sky-900 overflow-hidden hidden">
                <div className="text-center mb-12 px-6">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-2">The Powerhouse</h2>
                    <p className="text-sky-200">Meet the developers and creators making it happen.</p>
                </div>

                {/* Marquee Container */}
                <div className="relative w-full">
                    <div className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
                        {/* Duplicate list to create infinite loop effect */}
                        {[...employees, ...employees].map((member, i) => (
                            <div key={i} className="flex flex-col items-center w-48 flex-shrink-0 group cursor-pointer">
                                <div className="w-24 h-24 rounded-full border-2 border-sky-400 p-1 mb-3 group-hover:bg-sky-800 transition-colors">
                                    <div className="w-full h-full rounded-full overflow-hidden relative">
                                        <Image src={member.image || "/images/placeholder-user.jpg"} alt={member.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all" />
                                    </div>
                                </div>
                                <h4 className="text-white font-bold text-sm">{member.name}</h4>
                                <p className="text-sky-300 text-xs uppercase tracking-wide">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* 4. MEET OUR TEAM (Ribbon Layout) */}
            <section className="py-24 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden hidden">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16 items-center">
                    
                    {/* Left: Ribbon Title */}
                    <div className="md:w-1/3 w-full">
                        <div className="relative bg-sky-500 text-white p-10 rounded-r-[3rem] rounded-bl-[3rem] shadow-2xl shadow-sky-200 overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                            
                            <h2 className="text-4xl md:text-5xl font-black leading-none mb-6">
                                Meet Our <br/> Team
                            </h2>
                            <p className="text-sky-100 font-medium text-lg border-l-4 border-sky-300 pl-4">
                                Meet Our Specialists, <br/> Driving Your Success.
                            </p>
                        </div>
                    </div>

                    {/* Right: Team Grid */}
                    <div className="md:w-2/3 w-full">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
                            {teamList?.map((member, i) => (
                                <div key={i} className="flex flex-col items-center group">
                                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-xl overflow-hidden mb-4 relative group-hover:-translate-y-2 transition-all duration-300 ring-4 ring-sky-50 group-hover:ring-sky-200">
                                        <Image 
                                            src={member.image && member.image.startsWith('/') ? member.image : "/images/placeholder-user.jpg"} 
                                            alt={member.name} 
                                            fill 
                                            className="object-cover" 
                                        />
                                    </div>
                                    <div className="bg-sky-500 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-2 shadow-md transform group-hover:scale-110 transition-transform">
                                        {member.name}
                                    </div>
                                    <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider text-center">{member.role}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. OUR VALUES (Sky Steps) */}
            <section className="py-24 px-6 max-w-4xl mx-auto hidden">
                <div className="text-center mb-16">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">Our Culture</h3>
                    <h2 className="text-3xl font-bold text-slate-900 mt-2">Core Values</h2>
                </div>
                
                <div className="space-y-8 relative">
                    {/* Center Line */}
                    <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-sky-100 -translate-x-1/2 -z-10 hidden md:block"></div>

                    {values?.map((val, i) => {
                        const isEven = i % 2 === 0;
                        return (
                            <div key={i} className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                
                                {/* Card */}
                                <div className={`flex-1 w-full p-8 rounded-3xl shadow-sm border transition-all duration-300 hover:shadow-lg
                                    ${isEven ? 'bg-sky-500 text-white border-sky-500' : 'bg-white text-slate-800 border-sky-100'}
                                `}>
                                    <h4 className="text-xl font-bold mb-3">{val.title}</h4>
                                    <p className={`text-sm leading-relaxed ${isEven ? 'text-sky-50' : 'text-slate-500'}`}>
                                        {val.description}
                                    </p>
                                </div>

                                {/* Number Bubble */}
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-xl shadow-lg z-10 border-4 border-white
                                    ${isEven ? 'bg-white text-sky-500' : 'bg-sky-500 text-white'}
                                `}>
                                    {String(i + 1).padStart(2, '0')}
                                </div>

                                {/* Empty Space for Balance */}
                                <div className="flex-1 hidden md:block"></div>
                            </div>
                        );
                    })}
                </div>
            </section>
{/* 5. OUR VALUES (Animated Swing Layout) */}
            <section className="py-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">Our Culture</h3>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3">Core Values</h2>
                    </div>
                    
                    <div className="relative space-y-[-40px]"> {/* Negative space for overlap */}
                        
                        {/* Central Thread Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-sky-200 -translate-x-1/2 rounded-full z-0 hidden md:block"></div>

                        {values?.map((val, i) => {
                            const isEven = i % 2 === 0;
                            return (
                                <div key={i} className={`relative z-10 flex md:items-center ${isEven ? 'md:justify-start' : 'md:justify-end'} group perspective-1000`}>
                                    
                                    {/* Connection Dot on Line */}
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-sky-500 rounded-full border-4 border-white shadow-md z-20 hidden md:block"></div>

                                    {/* Swinging Card */}
                                    <div 
                                        className={`w-full md:w-[55%] p-10 rounded-[2.5rem] shadow-2xl border transition-all duration-700 ease-in-out transform-gpu
                                            ${isEven 
                                                ? 'bg-sky-500 text-white border-sky-400 md:origin-right md:-rotate-3 md:hover:rotate-0 md:hover:scale-105' 
                                                : 'bg-white text-slate-800 border-sky-100 md:origin-left md:rotate-3 md:hover:rotate-0 md:hover:scale-105'
                                            }
                                            hover:z-30 hover:shadow-[0_20px_60px_-15px_rgba(14,165,233,0.3)]
                                        `}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <h4 className={`text-2xl font-bold ${isEven ? 'text-white' : 'text-slate-900'}`}>
                                                {val.title}
                                            </h4>
                                            <div className={`text-4xl font-black opacity-20 ${isEven ? 'text-white' : 'text-sky-200'}`}>
                                                {String(i + 1).padStart(2, '0')}
                                            </div>
                                        </div>
                                        <p className={`text-lg leading-relaxed ${isEven ? 'text-sky-50' : 'text-slate-500'}`}>
                                            {val.description}
                                        </p>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <ConsultationCTA 
                title="Ready to Build Your Dream Team?" 
                subtitle="Join us or hire us. Let's create something amazing together."
                href="/contact" 
            />
        </main>
    );
}