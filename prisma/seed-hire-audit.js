
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const auditData = {
    heroTitle: "Hire Top 1% Android Experts",
    heroSubtitle: "Scale your engineering team with pre-vetted senior developers who deliver high-quality code from day one.",
    heroBg: "https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?auto=format&fit=crop&q=80",
    badgeText: "Hire Page Audit",
    metrics: {
      avgTime: "24 Hours",
      network: "500+ Devs",
      rating: "5.0/5"
    },

    features: [
      { title: "Rigorous Vetting", description: "Only the top 1% pass our technical and behavioral assessment.", iconKey: "FaSearch" },
      { title: "Fast Onboarding", description: "Get your first developer interview within 24-48 hours.", iconKey: "FaRocket" },
      { title: "Risk-Free Trial", description: "Scale with confidence using our 2-week zero-risk trial period.", iconKey: "FaThumbsUp" }
    ],

    aboutTitle: "Why Hire Android Developers from Softkingo?",
    aboutSubtitle: "We provide dedicated developers who integrate seamlessly into your team and follow your internal processes.",
    benefits: [
      "Direct communication with developers",
      "100% IP & Source Code ownership",
      "Daily standups and reporting",
      "Flexible hourly or monthly billing"
    ],

    steps: [
      { number: 1, title: "Requirement Analysis", description: "We understand your project goals and tech stack requirements.", icon: "/images/hire/h1.png" },
      { number: 2, title: "Candidate Shortlisting", description: "We match you with the best-fit developers from our pool.", icon: "/images/hire/h2.png" },
      { number: 3, title: "Technical Interview", description: "You interview and select the developers yourself.", icon: "/images/hire/h3.png" },
      { number: 4, title: "Project Kickoff", description: "Onboard your developer and start building immediately.", icon: "/images/hire/h4.png" }
    ],

    services: [
      { title: "Custom App Dev", description: "Build bespoke Android applications tailored to your business.", iconKey: "FaLaptopCode", bg: "from-sky-600 to-blue-700" },
      { title: "UI/UX Design", description: "Stunning, user-centric interfaces for mobile devices.", iconKey: "FaCogs", bg: "from-emerald-600 to-teal-700" },
      { title: "App Migration", description: "Seamlessly migrate your legacy apps to modern Android stacks.", iconKey: "FaRocket", bg: "from-purple-600 to-indigo-700" }
    ],

    industryHire: {
      title: "Expertise Across Diverse Industries",
      subtitle: "Our developers bring deep domain knowledge to every project.",
      items: [
        { name: "Healthcare", title: "Smart Health Apps", description: "HIPAA compliant medical and wellness applications.", href: "/industries/healthcare", iconKey: "FaStethoscope" },
        { name: "Banking & Finance", title: "Secure Banking", description: "PCI-DSS compliant payment and investment platforms.", href: "/industries/fintech-software-development", iconKey: "FaDollarSign" },
        { name: "Retail", title: "E-Commerce", description: "Scalable shopping experiences with integrated logistics.", href: "/industries/ecommerce", iconKey: "FaStore" }
      ]
    },

    moreServices: [
      { title: "Kotlin Specialization", description: "Leveraging the full power of modern Android development.", iconKey: "BsFileEarmarkBarGraph" },
      { title: "Performance Audit", description: "Optimizing your app for speed, memory, and battery.", iconKey: "BsTransparency" },
      { title: "API Integration", description: "Connecting your app to complex backend ecosystems.", iconKey: "GiBullseye" }
    ],

    profileSection: {
      enabled: true,
      title: "Transparent Developer Profiles",
      subtitle: "Get a clear view of your developer's expertise before hiring.",
      profileFeatures: ["Verified Technical Skills", "Communication Score", "Past Project Success"],
      images: {
        leftTop: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
        rightTop: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
        rightBottom: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
      }
    },

    portfolioTitle: "Our Android Successes",
    portfolioSubtitle: "Explore real-world apps we've shipped for clients globally.",
    portfolioCategory: "app-development",

    techStack: {
      "Android Core": [
        { name: "Kotlin", color: "#7F52FF" },
        { name: "Java", color: "#007396" },
        { name: "Android SDK", color: "#3DDC84" }
      ],
      "Architecture": [
        { name: "MVVM", color: "#000" },
        { name: "Clean Architecture", color: "#000" }
      ]
    },

    modelsSection: {
      enabled: true,
      title: "Flexible Hiring Models",
      subtitle: "Choose the model that best suits your project timeline and budget.",
      models: [
        { title: "Dedicated Team", description: "A focused team dedicated exclusively to your project.", iconKey: "CiClock1", features: ["Full-time focus", "Direct management", "Daily standups"], buttonText: "Hire Team" },
        { title: "Hourly model", description: "Pay for the hours logged by the developer on your project.", iconKey: "TbCalendarClock", features: ["Pay as you go", "Flexible hours", "Timesheet tracking"], buttonText: "Hire Hourly" }
      ]
    },

    pricingSection: {
      enabled: true,
      title: "Cost-Effective Investing",
      subtitle: "Transparent pricing without any hidden recruitment fees.",
      plans: [
        { title: "Junior Dev", price: "$2200", priceNote: "month", subtitle: "2-4 years exp", featured: false, features: ["Kotlin/Java basics", "UI Implementation", "Daily Standups"] },
        { title: "Senior Dev", price: "$4500", priceNote: "month", subtitle: "7+ years exp", featured: true, features: ["Architecture Design", "Complex API Auth", "Lead Developer Role"] }
      ]
    },

    comparisonSection: {
      enabled: true,
      title: "Softkingo vs Others",
      rows: [
        { category: "Vetting Process", softkingo: { text: "Top 1% Experts", iconKey: "FaCheckCircle" }, recruiting: { text: "Resume Sourcing", iconKey: "FaTimesCircle" }, outsourcing: { text: "Internal Bench", iconKey: "FaTimesCircle" } },
        { category: "Trial Period", softkingo: { text: "2 Weeks Free", iconKey: "FaCheckCircle" }, recruiting: { text: "None", iconKey: "FaTimesCircle" }, outsourcing: { text: "Negotiable", iconKey: "FaCheckCircle" } }
      ]
    },

    blogTitle: "Android Insights",
    blogSubtitle: "Weekly updates from our core engineering team.",
    blogCategory: "technology",

    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about our Android hiring process.",
      items: [
        { q: "How quickly can I hire an Android developer?", a: "Typically, we can match you with qualified candidates within 24-48 hours." },
        { q: "Do you offer a trial period?", a: "Yes, we offer a 2-week risk-free trial period for all new hires." },
        { q: "Can I interview the developers myself?", a: "Absolutely! You have full control over the selection process." }
      ]
    },

    inquiry: {
      tagline: "READY TO SCALE?",
      title: "Connect with us today",
      subtitle: "Let's discuss how our Android experts can help you build world-class mobile experiences."
    },

    activeSections: ['hero', 'features', 'about', 'steps', 'services', 'industryHire', 'moreServices', 'profile', 'portfolio', 'techStack', 'models', 'pricing', 'comparison', 'blogs', 'faq', 'inquiry', 'ctaBanner'],

    ctaBanner: {
      enabled: true,
      title: "Hire Your Android Expert Now",
      subtitle: "Get started with our 2-week risk-free trial today.",
      buttonText: "Get Started",
      buttonHref: "/contact",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
    }
  };

  console.log("Upserting Hire Audit Page: /hire/hire-audit-test");
  await prisma.page.upsert({
    where: { slug: "hire-audit-test" },
    update: {
      title: "Hire Audit Test",
      type: "hire",
      status: "published",
      contentJson: JSON.stringify(auditData),
      key: "hire-audit-test",
    },
    create: {
      slug: "hire-audit-test",
      key: "hire-audit-test",
      title: "Hire Audit Test",
      type: "hire",
      status: "published",
      contentJson: JSON.stringify(auditData),
    },
  });

  console.log("Hire Audit Test page seeded!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
