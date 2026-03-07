'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ServicePageEditor from '../_components/ServicePageEditor';

export default function NewServicePage() {
  const router = useRouter();

  const initialData = {
    title: "",
    slug: "",
    excerpt: "",
    status: "draft",
    seoTitle: "",
    seoDescription: "",
    content: {
      heroTitle: "",
      heroSubtitle: "",
      heroBg: "/images/services/default-bg.png",
      stats: {
        years: "6+",
        yearsLabel: "Years of Experience",
        projects: "400+",
        projectsLabel: "Projects Completed",
        team: "50+",
        teamLabel: "Expert Team Members",
        rating: "5.0",
        ratingLabel: "Client Rating"
      },
      services: {
        title: "Our Services",
        subtitle: "Comprehensive solutions for your business",
        categories: [
          {
            shortTitle: "AI-Driven Apps",
            shortDesc: "Architect Smart Digital Products",
            fullTitle: "Your Partner in AI Engineering",
            fullDesc: "Our innovative professionals design and build custom AI solutions and ML platforms using advanced AI models to deliver strategic advantages to enterprise.",
            expertise: [
              { iconName: "FaRobot", label: "AI Consulting" },
              { iconName: "FaCode", label: "AI Development" }
            ],
            products: [
              { name: "SuperSmart", image: "/images/products/s1.png" }
            ]
          }
        ]
      },
      techStack: {
        title: "Technology Stack We Use",
        highlight: "Cutting-Edge",
        subtitle: "The modern tools and frameworks power our solutions.",
        tabs: [
          { label: "Frontend", items: [{ name: "React", image: "/images/tech/react.png" }] },
          { label: "Backend", items: [{ name: "Node.js", image: "/images/tech/node.png" }] }
        ]
      },
      process: {
        title: "Our Development Process",
        subtitle: "We follow a streamlined methodology to deliver high-quality digital products.",
        items: [
          {
            title: "Discovery & Strategy",
            description: "We start by understanding your goals and defining a clear roadmap.",
            bullets: [
              "Competitive Analysis",
              "User Persona Research",
              "Feature Prioritization"
            ]
          },
          {
            title: "Design & UX",
            description: "Creating intuitive and visually stunning interfaces.",
            bullets: [
              "Wireframing",
              "Interactive Prototypes",
              "Visual Identity Design"
            ]
          }
        ]
      },
      consultation: {
        title: "Book A FREE Consultation With Us",
        subtitle: "Share your project idea and we’ll provide a free consultation on how we will turn it into reality and an amazing digital product.",
        buttonLabel: "Book a Free Demo",
        imageSrc: "/images/cta/cta-img.png"
      },
      faq: {
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know",
        items: []
      },
      userGuide: {
        title: 'Mobile App Development',
        subtitle: 'User Guide',
        description: 'Everything you need to know about the mobile app development journey.',
        sections: []
      }
    }
  };

  return (
    <ServicePageEditor
      data={initialData}
      onBack={() => router.push('/admin/services')}
    />
  );
}
