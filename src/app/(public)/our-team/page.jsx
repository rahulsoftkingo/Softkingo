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
import { commonSchemas } from "@/lib/commonSchema";

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
        message: "We combine innovation, technology, and expertise to build digital solutions that drive business growth. Our focus is simple — deliver quality, build trust, and create long-term success for our clients.",
        image: "/images/team/Softkingo-Founder.webp",
        linkedin: "https://www.linkedin.com/in/paramhans/"
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



 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [

    {
      "@type": "WebPage",
      "@id": "https://www.softkingo.com/our-team",
      "url": "https://www.softkingo.com/our-team",
      "name": "Our Team - Softkingo",
      "description": "Meet the expert team behind Softkingo's innovative digital solutions."
    },

    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "softkingo",
          "item": "https://www.softkingo.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "our-team",
          "item": "https://www.softkingo.com/our-team"
        }
      ]
    },

    {
      "@type": "ImageObject",
      "contentUrl": "https://asthatechnologies.org/wp-content/uploads/2025/09/Food-Delivery_.webp",
      "width": 937,
      "height": 937,
      "associatedMedia": "https://www.softkingo.com/our-team"
    },

    {
      "@type": "Organization",
      "@id": "https://softkingo.com/#organization",
      "name": "Softkingo",
      "url": "https://softkingo.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://softkingo.com/logo.png",
        "width": 200,
        "height": 60
      },
      "description": "Softkingo is a global IT services company specializing in mobile app development, web development, AI solutions, and digital transformation services.",
      "telephone": "+91-7428750870",
      "email": "sales@softkingo.com",
      "foundingDate": "2018",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": 50
      },
      "areaServed": "Worldwide",
      "sameAs": [
        "https://www.facebook.com/softkingo",
        "https://www.linkedin.com/company/softkingo",
        "https://www.instagram.com/softkingo"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "sales",
          "telephone": "+91-7428750870",
          "email": "sales@softkingo.com",
          "availableLanguage": ["English", "Hindi"],
          "areaServed": "Worldwide"
        },
        {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "telephone": "+91-7428750870",
          "email": "sales@softkingo.com",
          "availableLanguage": ["English", "Hindi"]
        }
      ],
      "address": [
        {
          "@type": "PostalAddress",
          "streetAddress": "A179, Block ED, New Ashok Nagar",
          "addressLocality": "New Delhi",
          "addressRegion": "Delhi",
          "postalCode": "110096",
          "addressCountry": "IN",
          "name": "Delhi Office"
        },
        {
          "@type": "PostalAddress",
          "streetAddress": "B-148, Block B, Sector 63",
          "addressLocality": "Noida",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "201301",
          "addressCountry": "IN",
          "name": "Noida Office"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "120",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "name": "Outstanding Mobile App Development",
          "author": { "@type": "Person", "name": "James Carter" },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "datePublished": "2024-11-10",
          "reviewBody": "Softkingo delivered our mobile app on time and exceeded our expectations. The team was professional, communicative, and highly skilled. Highly recommend for any mobile development project."
        },
        {
          "@type": "Review",
          "name": "Excellent Web Development Partner",
          "author": { "@type": "Person", "name": "Priya Sharma" },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "datePublished": "2024-10-22",
          "reviewBody": "We hired Softkingo for our web development project and were truly impressed. The team has deep technical expertise and delivered a flawless product. Great value for money."
        },
        {
          "@type": "Review",
          "name": "Game-changing AI Solution",
          "author": { "@type": "Person", "name": "Michael Thompson" },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "datePublished": "2024-09-15",
          "reviewBody": "Their AI solution transformed our business operations. Softkingo understood our requirements perfectly and built a scalable, intelligent system. Exceptional work!"
        },
        {
          "@type": "Review",
          "name": "Reliable Digital Transformation Partner",
          "author": { "@type": "Person", "name": "Sarah Mitchell" },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "datePublished": "2024-08-05",
          "reviewBody": "Softkingo helped us digitally transform our entire workflow. From planning to delivery, their team was thorough and transparent. A trusted technology partner."
        },
        {
          "@type": "Review",
          "name": "Top-notch Flutter App Development",
          "author": { "@type": "Person", "name": "Rahul Verma" },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "datePublished": "2024-07-18",
          "reviewBody": "The Flutter app built by Softkingo is fast, beautiful, and bug-free. Their developers are top-notch and the project management was smooth throughout. Will definitely work with them again."
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "IT Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Solutions" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Transformation" } }
        ]
      }
    },

    {
      "@type": "FAQPage",
      "@id": "https://softkingo.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services does Softkingo offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Softkingo offers mobile app development (iOS & Android), web development, AI & machine learning solutions, UI/UX design, and digital transformation consulting for businesses worldwide."
          }
        },
        {
          "@type": "Question",
          "name": "Where is Softkingo located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Softkingo has two offices in India — Delhi: A179, Block ED, New Ashok Nagar, New Delhi 110096, and Noida: B-148, Block B, Sector 63, Noida 201301. We serve clients globally."
          }
        },
        {
          "@type": "Question",
          "name": "How can I contact Softkingo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can reach Softkingo by phone at +91-7428750870 or by email at sales@softkingo.com. Our team is available Monday to Friday, 9:00 AM to 6:30 PM IST."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to develop a mobile app?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A basic app typically takes 4–8 weeks, while a complex enterprise application may take 4–6 months. Softkingo provides a detailed estimate after an initial consultation."
          }
        },
        {
          "@type": "Question",
          "name": "Does Softkingo provide post-launch support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Softkingo offers post-launch support and maintenance packages including bug fixes, performance optimization, and feature updates to keep your application running smoothly."
          }
        }
      ]
    }

  ]
};

// --- DATA FETCHER (Hero, Text, Team, Gallery) ---
async function getTeamData() {
    try {
        // Import prisma dynamically to avoid SSR issues
        const { default: prisma } = await import('@/lib/db');

        const page = await prisma.page.findUnique({ where: { slug: 'our-team' } });

        // Fetch Team Members
        const dbTeamMembers = await prisma.teamMember.findMany({
            where: {},
            orderBy: [
                { featured: 'desc' },
                { order: 'asc' },
                { createdAt: 'desc' }
            ]
        });

        // Fetch Gallery Images for Team/Culture
        const galleryImages = await prisma.mediaItem.findMany({
            where: {
                type: 'image',
                tags: { contains: 'gallery-team' }
            },
            orderBy: { createdAt: 'desc' },
            take: 10
        }).then(images =>
            images.map((img, i) => {
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
                    span: spans[i % 5].span,
                    height: spans[i % 5].height
                };
            })
        );

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

        const baseData = {
            ...STATIC_DATA,
            galleryImages: galleryImages.length > 0 ? galleryImages : [
                { id: 'g1', src: "/images/team/gallery/g1.jpg", alt: "Team building", span: "md:col-span-2 md:row-span-2", height: "h-[400px]" },
                { id: 'g2', src: "/images/team/gallery/g2.jpg", alt: "Workspace", span: "md:col-span-1 md:row-span-1", height: "h-[190px]" },
                { id: 'g3', src: "/images/team/gallery/g3.jpg", alt: "Lunch", span: "md:col-span-1 md:row-span-1", height: "h-[190px]" },
                { id: 'g4', src: "/images/team/gallery/g4.jpg", alt: "Meeting", span: "md:col-span-1 md:row-span-2", height: "h-[400px]" },
                { id: 'g5', src: "/images/team/gallery/g5.jpg", alt: "Trip", span: "md:col-span-2 md:row-span-1", height: "h-[190px]" },
            ]
        };

        if (page && page.contentJson) {
            const dbContent = JSON.parse(page.contentJson);
            return {
                ...baseData,
                ...dbContent.content,
                teamList: teamFromDB.length > 0 ? teamFromDB : (dbContent.content?.teamList || STATIC_DATA.teamList)
            };
        }

        return {
            ...baseData,
            teamList: teamFromDB.length > 0 ? teamFromDB : STATIC_DATA.teamList
        };
    } catch (e) {
        console.error('Error fetching team data:', e);
        return { ...STATIC_DATA, galleryImages: [] };
    }
}

// Gallery section removed from here, handled in OurTeamClient


export const metadata = {
    title: 'Our Team - Meet the Experts',
    description: 'Meet the experts driving Softkingo success.',
    alternates: { canonical: "/our-team" }
};

export default async function OurTeamPage() {
    // 1. Fetch Main Page Data (Hero, Text, Team List, Gallery)
    const data = await getTeamData();
    const { hero, ceo, teamList, values, expertise, process, testimonials, galleryImages } = data;

    // --- TEAM SPLIT LOGIC ---
    // Leaders (Exclude CEO)
    const leaders = Array.isArray(teamList) ? teamList.filter(m =>
        (m.category === 'management' || m.category === 'tech-lead' || m.role?.includes('Head'))
        && !m.role?.includes('CEO')
        && !(m.name === ceo.name)
    ).slice(0, 6) : [];

    // Marquee (Everyone Else - Exclude Leaders & CEO)
    const marqueeTeam = Array.isArray(teamList) ? teamList.filter(m =>
        !leaders.includes(m)
        && !m.role?.includes('CEO')
        && !(m.name === ceo.name)
    ) : [];


    return (
        <>
              <Script
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                          "@context": "https://schema.org",
                          "@graph": [
                            ...commonSchemas,
                            {
                              "@type": "Service",
                              "@id": "https://softkingo.com/#mobile-app-development",
                              "name": "Mobile App Development",
                              "serviceType": "App Development",
                              "category": "Software Development Service",
                              "description": "Custom mobile app solutions...",
              
                              "provider": {
                                "@type": "Organization",
                                "@id": "https://softkingo.com/#organization",
                                "name": "Softkingo",
                                "url": "https://softkingo.com"
                              },
              
                              "areaServed": {
                                "@type": "Place",
                                "name": "Worldwide"
                              },
              
                              "isRelatedTo": {
                                "@type": "Thing",
                                "name": "App Development"
                              },
              
                              "potentialAction": {
                                "@type": "ContactAction",
                                "target": "https://softkingo.com/contact"
                              }
                            }
                          ]
                        })
                      }}
                    />
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
                galleryImages={galleryImages}
            />
            <InquirySection />
        </>
    );
}