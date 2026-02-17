import React from 'react';
import Image from 'next/image';
import { Linkedin, Quote } from 'lucide-react';
import ConsultationCTA from '@/components/common/Consultation-Cta';
// import CoreValues from '@/components/public/CoreValues'; 
import CoreValues from './CoreValues'; 
import TestimonialCarousel from '@/components/public/TestimonialCarousel2';
import { testimonials as testimonialsData } from '@/data/testimonials';
import CommonTitle from '@/components/ui/CommonTitle';
import JoinTeamPopup from '@/components/admin/JoinTeamPopup';
import OurTeamClient from './OurTeamClient';
import InquirySection from "@/components/footer/InquirySection";

// --- STATIC DATA ---
const STATIC_DATA = {
    hero: {
        title: "Meet minds behind Softkingo",
        subtitle: "A team of passionate developers, designers, and strategists building smart solutions.",
        image: "/images/team/Our-Team-Softkingo.webp"
    },
    ceo: {
        name: "Paramhans Singh",
        role: "CEO & Founder",
        message: "We were very impressed with the service provided by this business. From start to finish, every step of the process was smooth, professional and effective.",
        image: "/images/team/Softkingo-Founder.webp",
        linkedin: "#"
    },
    // Keep teamList empty here, will try to fetch or fallback
    teamList: [
        { name: "John Doe", role: "CTO", image: "/images/team/m1.jpg", category: "management" },
        { name: "Jane Smith", role: "COO", image: "/images/team/m2.jpg", category: "management" },
        { name: "Dev 1", role: "Senior Dev", image: "/images/team/e1.jpg", category: "employee" },
    ],
    values: [
        { title: "Integrity", description: "No hidden costs, no fake promises. We believe in being 100% open and honest." },
        { title: "Define Clear Goals", description: "We hate confusion. We define exactly what needs to be done." },
        { title: "Differentiate Your Brand", description: "Why blend in when you can stand out? We craft unique digital experiences." },
        { title: "Focus on Value", description: "We don't just build features; we build solutions that work." }
    ],
    expertise: [
        { 
            title: "Web Development", 
            iconName: "Layout", 
            description: "Building modern, scalable web applications with cutting-edge technologies",
            skills: [
                { name: "React / Next.js", level: 95 },
                { name: "Vue.js / Nuxt", level: 85 },
                { name: "TypeScript", level: 90 },
                { name: "Tailwind CSS", level: 95 },
                { name: "Node.js", level: 88 }
            ]
        },
        { 
            title: "Mobile Apps", 
            iconName: "Smartphone", 
            description: "Creating native and cross-platform mobile experiences",
            skills: [
                { name: "React Native", level: 90 },
                { name: "Flutter", level: 85 },
                { name: "iOS / Swift", level: 80 },
                { name: "Android / Kotlin", level: 82 },
                { name: "Expo", level: 88 }
            ]
        },
        { 
            title: "Backend & Cloud", 
            iconName: "Database", 
            description: "Robust server-side architecture and cloud solutions",
            skills: [
                { name: "AWS / Azure", level: 92 },
                { name: "Python / Django", level: 87 },
                { name: "Node.js / Express", level: 90 },
                { name: "PostgreSQL / MongoDB", level: 85 },
                { name: "Microservices", level: 83 }
            ]
        },
        { 
            title: "UI/UX Design", 
            iconName: "Heart", 
            description: "Designing intuitive and beautiful user interfaces",
            skills: [
                { name: "Figma", level: 95 },
                { name: "Adobe Creative Suite", level: 85 },
                { name: "User Research", level: 88 },
                { name: "Prototyping", level: 92 },
                { name: "Brand Identity", level: 80 }
            ]
        }
    ],
    process: [
        { step: "01", title: "Discovery", desc: "We dive deep into your vision, goals, and requirements." },
        { step: "02", title: "Strategy", desc: "Planning the roadmap, architecture, and design system." },
        { step: "03", title: "Development", desc: "Agile coding with regular updates and quality checks." },
        { step: "04", title: "Launch", desc: "Deployment, testing, and post-launch support." }
    ],
    testimonials: [
        { name: "Sarah J.", role: "Product Manager", quote: "The Softkingo team felt like an extension of our own. Their dedication is unmatched.", rating: 5 },
        { name: "Michael R.", role: "Startup Founder", quote: "Technically brilliant and super easy to work with. They delivered ahead of schedule.", rating: 5 },
        { name: "Emily W.", role: "CTO", quote: "Clean code, transparent communication, and great vibes. Highly recommended.", rating: 5 }
    ]
};

// --- DATA FETCHER (Hero, Text, Team) ---
async function getTeamData() {
    try {
        // Import prisma dynamically to avoid SSR issues
        const { default: prisma } = await import('@/lib/db');
        
        const page = await prisma.page.findUnique({ where: { slug: 'our-team' } });
        
        // Fetch Team Members from TeamMember table (not User table)
        const dbTeamMembers = await prisma.teamMember.findMany({
            where: { },
            orderBy: [
                { featured: 'desc' },
                { order: 'asc' },
                { createdAt: 'desc' }
            ]
        });

        // Map Team Data with proper categorization
        let teamFromDB = [];
        if (dbTeamMembers.length > 0) {
            teamFromDB = dbTeamMembers.map(member => ({
                id: member.id,
                name: member.name,
                role: member.title || "Team Member",
                image: member.photo ? (member.photo.startsWith('http') || member.photo.startsWith('/') ? member.photo : `/uploads/${member.photo}`) : "/images/placeholder-user.jpg",
                category: member.category || 
                         (member.department?.toLowerCase() === 'management' || member.title?.toLowerCase().includes('ceo') || member.title?.toLowerCase().includes('cto') || member.title?.toLowerCase().includes('coo') || member.title?.toLowerCase().includes('founder') ? 'management' : 
                          member.title?.toLowerCase().includes('lead') || member.title?.toLowerCase().includes('head') ? 'tech-lead' : 'employee'),
                department: member.department,
                bio: member.bio,
                linkedinUrl: member.linkedinUrl,
                featured: member.featured,
                order: member.order,
                status: member.status || 'active'
            }));
        }

        if (page && page.contentJson) {
            const dbContent = JSON.parse(page.contentJson);
            return {
                ...STATIC_DATA,
                ...dbContent.content,
                teamList: teamFromDB.length > 0 ? teamFromDB : (dbContent.content?.teamList || STATIC_DATA.teamList)
            };
        }
        
        // Return with team data even if no page content
        return {
            ...STATIC_DATA,
            teamList: teamFromDB.length > 0 ? teamFromDB : STATIC_DATA.teamList
        };
    } catch (e) { 
        console.error('Error fetching team data:', e); 
        return STATIC_DATA;
    }
}

// --- ISOLATED GALLERY COMPONENT (Direct DB Access) ---
async function GallerySectionSafe() {
    let galleryImages = [];
  
    try {
      // 1. Fetch images from MediaItem
      galleryImages = await prisma.mediaItem.findMany({
        where: {
          type: 'image',
          // Optional: Add specific tag filter if you only want 'culture' images here
          // tags: { contains: 'gallery-culture' } 
        },
        orderBy: { createdAt: 'desc' },
        take: 5, // Take 5 for our masonry layout
        select: {
          id: true,
          filePath: true,
          title: true,
        }
      }).then(images =>
        images.filter(img => img.filePath).map((img, i) => {
            // Apply Layout Logic inside Map (Masonry Spans)
            const spans = [
                { span: "md:col-span-2 md:row-span-2", height: "h-[400px]" },
                { span: "md:col-span-1 md:row-span-1", height: "h-[190px]" },
                { span: "md:col-span-1 md:row-span-1", height: "h-[190px]" },
                { span: "md:col-span-1 md:row-span-2", height: "h-[400px]" },
                { span: "md:col-span-2 md:row-span-1", height: "h-[190px]" },
            ];
            
            return {
                id: img.id,
                src: img.filePath?.startsWith('/') || img.filePath?.startsWith('http') ? img.filePath : `/uploads/${img.filePath}`,
                alt: img.title || 'Life at Softkingo',
                // Loop through span patterns based on index
                span: spans[i % 5].span, 
                height: spans[i % 5].height
            };
        })
      );
    } catch (error) {
      console.log('Gallery DB timeout, using fallback');
      // Static Fallback if DB fails
      galleryImages = [
        { id: 'g1', src: "/images/team/gallery/g1.jpg", alt: "Team building", span: "md:col-span-2 md:row-span-2", height: "h-[400px]" },
        { id: 'g2', src: "/images/team/gallery/g2.jpg", alt: "Workspace", span: "md:col-span-1 md:row-span-1", height: "h-[190px]" },
        { id: 'g3', src: "/images/team/gallery/g3.jpg", alt: "Lunch", span: "md:col-span-1 md:row-span-1", height: "h-[190px]" },
        { id: 'g4', src: "/images/team/gallery/g4.jpg", alt: "Meeting", span: "md:col-span-1 md:row-span-2", height: "h-[400px]" },
        { id: 'g5', src: "/images/team/gallery/g5.jpg", alt: "Trip", span: "md:col-span-2 md:row-span-1", height: "h-[190px]" },
      ];
    }
  
    return (
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Text */}
          <div className="text-center mb-16">
            <h3 className="text-sky-600 font-bold uppercase tracking-wider mb-2">Life at Softkingo</h3>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">More Than Just Code</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
              We believe that happy teams build better products. Get a glimpse of our culture.
            </p>
          </div>
  
          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[190px]">
            {galleryImages.map((img) => (
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
    );
}


export const metadata = {
    title: 'Our Team | Softkingo',
    description: 'Meet the experts driving Softkingo success.',
    alternates: { canonical: "/our-team" }
};

export default async function OurTeamPage() {
    // 1. Fetch Main Page Data (Hero, Text, Team List from User Table)
    const data = await getTeamData();
    const { hero, ceo, teamList, values, expertise, process, testimonials } = data;
    
    // --- TEAM SPLIT LOGIC ---
    // Leaders (Exclude CEO)
    const leaders = Array.isArray(teamList) ? teamList.filter(m => 
        (m.category === 'management' || m.category === 'tech-lead' || m.role?.includes('Head')) 
        && !m.role?.includes('CEO') 
        && !(m.name === ceo.name)
    ).slice(0, 4) : [];

    // Marquee (Everyone Else - Exclude Leaders & CEO)
    const marqueeTeam = Array.isArray(teamList) ? teamList.filter(m => 
        !leaders.includes(m) 
        && !m.role?.includes('CEO') 
        && !(m.name === ceo.name)
    ) : [];


    return (
        <>
            <OurTeamClient 
                hero={hero}
                ceo={ceo}
                leaders={leaders}
                marqueeTeam={marqueeTeam}
                values={values}
                expertise={expertise}
                process={process}
                testimonials={testimonials}
                testimonialsData={testimonialsData}
            />
     <InquirySection />
        </>
    );
}