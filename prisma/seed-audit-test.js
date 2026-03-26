
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const slug = 'audit-test';
    const auditData = {
      heroTitle: "Ultimate Service Audit Page",
      heroSubtitle: "Testing 100% Dynamism across all 15 sections of the service page template.",
      heroBg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
      heroButtonText: "Get Technical Audit",
      heroButtonLink: "/contact",
      trustedByText: "Trusted By Fortune 500 Modern Tech Giants",
      
      stats: {
        years: "12+",
        yearsLabel: "Years of Engineering",
        projects: "850+",
        projectsLabel: "Success Stories",
        team: "120+",
        teamLabel: "Core Experts",
        rating: "4.9/5",
        ratingLabel: "Clutch Rating"
      },
      statsTitle: "Our Impact (Admin Only)",
      statsSubtitle: "This title should NOT appear on the public page.",

      awards: {
        title: "Global",
        gradientText: "Recognitions & Accolades",
        subtitle: "We are proud to be recognized by the top industry benchmarkers.",
        items: [
           { image: "/images/about/clutch.png", alt: "Clutch 2024" },
           { image: "/images/about/goodfirm.png", alt: "GoodFirms Leader" },
           { image: "/images/about/upwork.png", alt: "Upwork Top Rated" }
        ]
      },

      services: {
        title: "Our Core Offerings",
        subtitle: "Enterprise-grade solutions for complex problems.",
        categories: [
          {
            id: 1,
            shortTitle: "AI Development",
            shortDesc: "Smart Intelligence",
            fullTitle: "Custom AI & Machine Learning Engineering",
            fullDesc: "We build bespoke AI models that drive real business value.",
            expertise: [
              { iconName: "FaRobot", label: "NLP Processing" },
              { iconName: "FaCogs", label: "Deep Learning" }
            ],
            products: [
              { name: "TensorFlow", image: "/images/tech/react.png" },
              { name: "PyTorch", image: "/images/tech/node.png" }
            ]
          }
        ]
      },

      consultation: {
        title: "Ready to scale your next project?",
        subtitle: "Talk to our technical architects today and get a blueprint.",
        buttonLabel: "Schedule Free Audit",
        imageSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80"
      },

      techStack: {
        title: "Technologies We",
        highlight: "Master",
        subtitle: "Our developers stay ahead of the curve with modern stacks.",
        tabs: [
          {
            label: "Frontend",
            items: [
              { name: "Next.js", image: "/images/tech/react.png" },
              { name: "Tailwind", image: "/images/tech/react.png" }
            ]
          },
          {
            label: "Backend",
            items: [
              { name: "Node.js", image: "/images/tech/node.png" },
              { name: "GoLang", image: "/images/tech/node.png" }
            ]
          }
        ]
      },

      process: {
        title: "Our Agile",
        subtitle: "Development Lifecycle",
        items: [
          {
            title: "Discovery & Planning",
            description: "We dive deep into your requirements and create a roadmap.",
            bullets: ["Requirement Gathering", "Competitor Research", "Feasibility Study"]
          },
          {
            title: "Design & UX",
            description: "Prototyping high-fidelity designs for modern users.",
            bullets: ["Wireframing", "User Personas", "Visual Identity"]
          }
        ]
      },

      highlight: {
        title: "Solution",
        subtitle: "Highlights & Capabilities",
        tabs: [
          {
            label: "Custom Logic",
            iconName: "FaRobot",
            fullTitle: "Highly Intelligent Business Logic",
            features: ["Scalable Architecture", "Secure Data Flow"],
            icons: [
              { iconName: "FaShieldAlt", label: "Enterprise Security" },
              { iconName: "FaZap", label: "High Performance" }
            ]
          }
        ]
      },

      portfolioTitle: "Our Recent Hits",
      portfolioSubtitle: "Explore our successful deployments across the globe.",
      portfolioCategory: "app-development",

      solutions: {
        title: "Specific Industry",
        subtitle: "Solutions for Growth",
        items: [
          {
            itemTitle: "Fintech Pro",
            itemDesc: "Advanced banking and payment solutions.",
            itemImage: "https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?auto=format&fit=crop&q=80",
            points: ["Secure Payments", "Fraud Detection", "Real-time Analytics"],
            buttonLink: "/industries/fintech"
          }
        ]
      },

      industrySection: {
        title: "Industries We",
        subtitle: "Serve with Passion",
        items: [
          {
            itemTitle: "Healthcare",
            itemDesc: "Advanced AI-driven diagnostics and predictive patient care systems.",
            itemPoints: ["Predictive Diagnosis", "Automated EHR", "Virtual Assistants"],
            itemImage: "https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80"
          },
          {
            itemTitle: "Finance",
            itemDesc: "Intelligent fraud detection and algorithmic trading for digital banking.",
            itemPoints: ["Fraud Detection", "Risk Assessment", "Robo-Advisors"],
            itemImage: "https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?auto=format&fit=crop&q=80"
          }
        ]
      },

      userGuide: {
        title: "Technical",
        subtitle: "Resource Center",
        mode: "structured",
        sections: [
          {
            title: "Getting Started",
            description: "Learn how to use our platform effectively.",
            subSections: [
              {
                title: "Onboarding",
                bullets: ["Account Setup", "API Integration"]
              }
            ]
          }
        ]
      },

      faq: {
        title: "Frequently Asked",
        subtitle: "Common Questions",
        items: [
          { q: "How long is the audit?", a: "Typically 2-3 business days." },
          { q: "Is it free?", a: "The initial consultation is completely free." }
        ]
      },

      blogTitle: "Latest Insights",
      blogSubtitle: "Read our thoughts on the future of technology.",
      blogCategory: "technology",

      inquiry: {
        tagline: "WANT TO DISCUSS?",
        titlePrefix: "Let's ",
        title: "Design Your Future",
        subtitle: "Reach out and we'll reply within 12 hours!"
      }
    };

    console.log("Upserting service: /services/audit-test");
    await prisma.page.upsert({
      where: { slug: "audit-test" },
      update: {
        title: "Service Audit Test",
        type: "service",
        status: "published",
        contentJson: JSON.stringify({
          activeSections: ['hero', 'stats', 'awards', 'services', 'consultation', 'tech', 'process', 'highlight', 'portfolio', 'solutions', 'industries', 'user-guide', 'faq', 'blogs', 'inquiry', 'seo'],
          content: auditData
        }),
      },
      create: {
        slug: "audit-test",
        key: "audit-test",
        title: "Service Audit Test",
        type: "service",
        status: "published",
        contentJson: JSON.stringify({
          activeSections: ['hero', 'stats', 'awards', 'services', 'consultation', 'tech', 'process', 'highlight', 'portfolio', 'solutions', 'industries', 'user-guide', 'faq', 'blogs', 'inquiry', 'seo'],
          content: auditData
        }),
      },
    });

  console.log("Audit test service seeded: /services/audit-test");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
