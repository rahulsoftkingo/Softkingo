"use client";
import { useRef } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import {
  FaMobileAlt,
  FaDesktop,
  FaShoppingCart,
  FaBitcoin,
  FaSalesforce,
  FaRobot,
  FaCogs,
  FaRegFileCode,
  FaAndroid,
  FaApple,
  FaReact,
  FaLaravel,
  FaWordpress,
  FaShopify,
  FaCloud,
  FaServer,
  FaEye,
  FaSearch,
  FaBullseye,
  FaMailBulk,
  FaBrain,
  FaComments,
  FaCamera,
} from "react-icons/fa";

// SERVICES DATA (same as dropdown)
const servicesData = [
  {
    id: "Mobileapptab",
    title: "Mobile App Development",
    pageHref: "/services/mobile-app-development",
    description:
      "Turning your app ideas into immersive mobile experiences. Our future‑ready mobile apps move and react along with your users.",
    links: [
      {
        href: "/services/android-app-development",
        title: "Android App Development",
        icon: FaAndroid,
      },
      {
        href: "/services/ios-app-development",
        title: "iOS App Development",
        icon: FaApple,
      },
      {
        href: "/services/hybrid-app-development",
        title: "Hybrid App Development",
        icon: FaMobileAlt,
      },
      {
        href: "/services/flutter-native-app-development",
        title: "Flutter App Development",
        icon: FaReact,
      },
      {
        href: "/services/react-native-app-development",
        title: "React Native App Development",
        icon: FaReact,
      },
      {
        href: "/services/kotlin-app-development",
        title: "Kotlin App Development",
        icon: FaRegFileCode,
      },
    ],
  },
  {
    id: "Webdevtab",
    title: "Web & CMS Development",
    pageHref: "/services/web-development",
    description:
      "Empowering businesses with fast, secure websites and CMS solutions that are easy to manage and scale.",
    links: [
      {
        href: "/services/php-web-development",
        title: "PHP Web Development",
        icon: FaRegFileCode,
      },
      {
        href: "/services/laravel-development",
        title: "Laravel Development",
        icon: FaLaravel,
      },
      {
        href: "/services/reactjs-development",
        title: "React.js Development",
        icon: FaReact,
      },
      {
        href: "/services/nextjs-development",
        title: "Next.js Development",
        icon: FaReact,
      },
      {
        href: "/services/nodejs-development",
        title: "Node.js Development",
        icon: FaServer,
      },
      {
        href: "/services/wordpress-development",
        title: "WordPress Development",
        icon: FaWordpress,
      },
    ],
  },
  {
    id: "Ecommercetab",
    title: "eCommerce Development",
    pageHref: "/services/ecommerce-development",
    description:
      "Building robust eCommerce platforms that convert visitors into loyal customers and drive recurring revenue.",
    links: [
      {
        href: "/services/shopify-development",
        title: "Shopify Development",
        icon: FaShopify,
      },
      {
        href: "/services/woocommerce-development",
        title: "WooCommerce Development",
        icon: FaShoppingCart,
      },
      {
        href: "/services/magento-development",
        title: "Magento Development",
        icon: FaShoppingCart,
      },
      {
        href: "/services/custom-ecommerce-development",
        title: "Custom eCommerce Solutions",
        icon: FaRegFileCode,
      },
    ],
  },
  {
    id: "Blockchaintab",
    title: "Blockchain Development",
    pageHref: "/services/blockchain-development",
    description:
      "From smart contracts to NFT platforms, we build secure, transparent blockchain solutions for modern businesses.",
    links: [
      {
        href: "/services/crypto-wallet-development",
        title: "Crypto Wallet Development",
        icon: FaBitcoin,
      },
      {
        href: "/services/crypto-exchange-development",
        title: "Crypto Exchange Development",
        icon: FaBitcoin,
      },
      {
        href: "/services/smart-contract-development",
        title: "Smart Contracts",
        icon: FaRegFileCode,
      },
      {
        href: "/services/nft-marketplace-development",
        title: "NFT Marketplace",
        icon: FaEye,
      },
    ],
  },
  {
    id: "Digitalmarketingtab",
    title: "Digital Marketing",
    pageHref: "/services/digital-marketing",
    description:
      "End‑to‑end digital marketing & CRM implementations to help you attract, nurture and retain high‑value customers.",
    links: [
      {
        href: "/services/seo-organic-growth",
        title: "SEO & Organic Growth",
        icon: FaSearch,
      },
      {
        href: "/services/performance-marketing",
        title: "Performance Marketing",
        icon: FaBullseye,
      },
      {
        href: "/services/crm-implementation",
        title: "CRM Implementation",
        icon: FaSalesforce,
      },
      {
        href: "/services/marketing-automation",
        title: "Marketing Automation",
        icon: FaMailBulk,
      },
    ],
  },
  {
    id: "Aimltab",
    title: "AI & ML Solutions",
    pageHref: "/services/ai-ml",
    description:
      "Use Artificial Intelligence and Machine Learning to automate decisions, personalize experiences and unlock insights from your data.",
    links: [
      {
        href: "/services/ai-chatbots-assistants",
        title: "AI Chatbots & Assistants",
        icon: FaComments,
      },
      {
        href: "/services/recommendation-engines",
        title: "Recommendation Engines",
        icon: FaBrain,
      },
      {
        href: "/services/computer-vision",
        title: "Computer Vision",
        icon: FaCamera,
      },
      {
        href: "/services/nlp-text-processing",
        title: "NLP & Text Processing",
        icon: FaRegFileCode,
      },
    ],
  },
  {
    id: "DevOpstab",
    title: "DevOps & Cloud",
    pageHref: "/services/devops-cloud",
    description:
      "Automate deployment pipelines, improve reliability and ship faster with our DevOps & cloud engineering team.",
    links: [
      {
        href: "/services/ci-cd-pipelines",
        title: "CI/CD Pipelines",
        icon: FaCogs,
      },
      {
        href: "/services/cloud-migration",
        title: "Cloud Migration",
        icon: FaCloud,
      },
      {
        href: "/services/monitoring-observability",
        title: "Monitoring & Observability",
        icon: FaEye,
      },
    ],
  },
];

export default function ServicesSection({ initialProjects = [] }) {
  // Mapping categories to their respective service tab IDs
  const categoryMap = {
    Mobileapptab: ['Mobile App', 'Android', 'iOS', 'Flutter', 'React Native'],
    Webdevtab: ['Web Development', 'PHP', 'Laravel', 'React.js', 'Next.js', 'WordPress'],
    Ecommercetab: ['E-Commerce', 'Shopify', 'WooCommerce', 'Magento'],
    Blockchaintab: ['Blockchain', 'Crypto', 'NFT', 'Smart Contracts'],
    Digitalmarketingtab: ['Digital Marketing', 'SEO', 'PPC', 'Social Media'],
    Aimltab: ['AI & ML', 'Artificial Intelligence', 'Machine Learning', 'Data Science'],
    DevOpstab: ['DevOps', 'Cloud', 'AWS', 'Azure', 'GCP', 'Kubernetes'],
  };

  // Human-written, professional content for each section
  const sectionContent = {
    Mobileapptab: {
      description: "Developing intelligent travel planning apps like TripIt that synchronize itineraries, flights, and accommodations into a single seamless experience.",
      clientNote: "We focus on real-time data synchronization and user-friendly designs that make global travel planning effortless for millions of users."
    },
    Webdevtab: {
      description: "Building comprehensive campus ecosystems and community-driven marketplaces like EzyDash that unify shopping, housing, and social engagement for global student populations.",
      clientNote: "Our web platforms are engineered to handle high-concurrency environments while maintaining a smooth, unified user journey across diverse modules."
    },
    Ecommercetab: {
      description: "Engineering B2B powerhouses like Moglix, specializing in large-scale industrial procurement, MRO supply chains, and complex enterprise catalog management.",
      clientNote: "From industrial electrical equipment to specialized tools, we create e-commerce experiences that simplify bulk procurement for modern enterprises."
    },
    Blockchaintab: {
      description: "Implementing hyperlocal grocery platforms like LoveLocal that leverage real-time inventory tracking and secure, fast localized delivery systems.",
      clientNote: "Transparency and speed are the core of our retail solutions, matching users with nearby stores for a frictionless daily shopping experience."
    },
    Digitalmarketingtab: {
      description: "Growing international communities like Bumpy by crafting data-driven global reach strategies that foster meaningful, long-term connections across 150+ countries.",
      clientNote: "Relationship-driven marketing requires a delicate balance of cross-cultural storytelling and precision-targeted user acquisition."
    },
    Aimltab: {
      description: "Powering specialized AI predictions for industry leaders like Anytime Astro, providing expert insights through advanced Vedic, Tarot, and Numerological algorithmic models.",
      clientNote: "Our AI systems turn ancient wisdom into modern digital insights, providing accurate and personalized predictions at massive scale."
    },
    DevOpstab: {
      description: "Scaling high-traffic fitness ecosystems like Fitify, ensuring that millions of users can access 900+ workout routines with zero downtime and optimized infrastructure.",
      clientNote: "Managing a global body-weight training platform requires a robust DevOps backbone that can scale dynamically with user growth and media-heavy data."
    }
  };

  // Fallback projects if DB results are empty or don't match
  const fallbackProjects = [
    { id: "app", title: "TripIt (Travel Planner App)", description: "TripIt is a smart travel planner app that organizes flights, hotels, and activities in one place, helping travelers plan trips easily with a clean design and powerful, secure technology.", bgImage: "/images/services/serviceslist/Taxi-App-Solutions.webp", readHref: "/case-studies/tripit-travel-planner-app" },
    { id: "web", title: "EzyDash: Marketplace App", description: "EzyDash is an all-in-one campus app simplifying student life across Africa by uniting shopping, housing, events, and community into one smart, seamless platform. Built for students & vendors.", bgImage: "/images/services/serviceslist/Marketplace-app.webp", readHref: "/case-studies/ezydash-marketplace-app" },
    { id: "ecommerce", title: "Moglix – An E-commerce Platform", description: "Moglix is a leading B2B e-commerce platform specializing in industrial supplies, including MRO products, electrical equipment, tools, and safety solutions.", bgImage: "/images/services/serviceslist/ecommerce-solutions.webp", readHref: "/case-studies/moglix-shopping-app" },
    { id: "blockchain", title: "LoveLocal: Grocery App", description: "LoveLocal is a hyperlocal grocery app that connects users with nearby stores, offering real-time inventory, fast delivery, and secure payments, making daily grocery shopping quick.", bgImage: "/images/services/serviceslist/Grocery-app.webp", readHref: "/case-studies/lovelocal-grocery-app" },
    { id: "digitalmarketing", title: "Bumpy – International Dating App", description: "Bumpy is a unique international dating app designed for individuals seeking meaningful, long-term relationships across more than 150 countries.", bgImage: "/images/services/serviceslist/dating-app-development-solutions.webp", readHref: "/case-studies/bumpy-dating-app" },
    { id: "ai", title: "AnyTime Astro: Online Astrology App", description: "Anytime Astro is a top-rated astrology app delivering accurate future predictions through expert astrologers using Vedic, Tarot, Numerology, Palmistry, and modern astrological techniques.", bgImage: "/images/services/serviceslist/astology-app-solutions.webp", readHref: "/case-studies/anytime-astro-online-astrology-app" },
    { id: "devops", title: "Fitify (Workout Routines & Fitness App)", description: "Fitify is your ultimate full body workout app to lose weight, burn fat, build muscle & strength. With over 900 exercises in the work out app, your daily workout routines!", bgImage: "/images/services/serviceslist/fitness-and-wellness-app-solutions.webp", readHref: "/case-studies/fitify-workout-routines-fitness-app" }
  ];

  return (
    <div className="w-full overflow-hidden">
      {servicesData.map((section, index) => {
        const layoutLeft = index % 2 === 0;

        // Use the manual fallback as the base to ensure high-quality visuals and human-written logic
        const fallbackProject = fallbackProjects[index];

        // Try to find a matching project from DB by category for dynamic links/data
        const dbProject = initialProjects.find(p =>
          categoryMap[section.id]?.some(cat => p.category?.toLowerCase().includes(cat.toLowerCase()))
        );

        // Merge logic: prefer fallback visuals, but allow DB to override specific data if it's more accurate
        const project = {
          ...fallbackProject,
          // Only use DB link if it matches the fallback link's target (to maintain E-commerce integrity)
          readHref: (dbProject && dbProject.key === fallbackProject.readHref.split('/').pop())
            ? `/case-studies/${dbProject.key}`
            : fallbackProject.readHref
        };

        // Enrich section with human-written content
        const sectionInfo = sectionContent[section.id] || { description: section.description, clientNote: section.description };
        return (
          <section
            key={section.id}
            className={`${layoutLeft ? "bg-white" : "bg-sky-50"
              } py-12 md:py-20 px-4 md:px-8 lg:px-20 animate-section`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="max-w-7xl mx-auto">
              {layoutLeft ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                  <ServiceContent section={{ ...section, description: sectionInfo.description }} layout="left" index={index} />
                  <CaseStudyCard
                    caseStudy={buildCaseStudyFromProject(project, sectionInfo, index)}
                    position="right"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                  <CaseStudyCard
                    caseStudy={buildCaseStudyFromProject(project, sectionInfo, index)}
                    position="left"
                  />
                  <ServiceContent
                    section={{ ...section, description: sectionInfo.description }}
                    layout="right"
                    index={index}
                  />
                </div>
              )}
            </div>
          </section>
        );
      })}

      <style >{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-section {
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: both;
        }
        .tech-icon:hover > div {
          background-color: #e5e7eb;
          transform: translateY(-4px);
        }
        .hover-scale {
          transition: all 0.3s ease;
        }
        .hover-scale:hover {
          background-color: #f9fafb;
          transform: scale(1.05);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

// helper: project + section se CaseStudyCard props banao
function buildCaseStudyFromProject(project, sectionInfo, index) {
  return {
    title: project.title,
    description: project.description,
    buttonText: "Read Case Study",
    image: project.bgImage || `/images/services/serviceslist/software-solutions.webp`,
    phoneMockup: project.phoneMockup || '',
    clientNote: sectionInfo.clientNote,
    readHref: project.readHref || `/portfolio#${project.id}`,
  };
}

// tumhara ServiceContent jaisa ka taisa
function ServiceContent({ section, layout, index }) {
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  const scroll = (direction) => {
    [desktopRef.current, mobileRef.current].forEach((el) => {
      if (el) {
        const scrollAmount = el.clientWidth * 0.8;
        const scrollTo =
          direction === "left"
            ? el.scrollLeft - scrollAmount
            : el.scrollLeft + scrollAmount;
        el.scrollTo({ left: scrollTo, behavior: "smooth" });
      }
    });
  };

  return (
    <div className="space-y-6 md:space-y-8 pt-4 md:pt-8 relative h-full">
      <div>
        <a
          href={section.pageHref}
          className="inline-flex items-center gap-2 md:gap-3 text-gray-900 hover:text-sky-700"
        >
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold">
            {section.title}
          </h2>
          <ArrowRight className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
        </a>
        <p className="mt-3 text-gray-600 text-base md:text-lg leading-relaxed">
          {section.description}
        </p>
      </div>

      {/* Desktop icon strip – same UI, sirf link/data dropdown se */}
      <div
        className={`hidden lg:block absolute bottom-0 ${layout === "left"
          ? "left-0 -right-48 bg-white rounded-tr-[3rem] pr-10"
          : "right-0 -left-48 bg-sky-50 rounded-tl-[3rem] pl-10"
          } py-6 md:py-8 z-10 m-0`}
      >
        <div className="flex items-center justify-between bg-gray-100 p-4 md:p-6 rounded-2xl gap-4 md:gap-6">
          <div
            ref={desktopRef}
            className="flex items-center gap-4 md:gap-8 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
          >
            {section.links.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  className="flex flex-col items-center min-w-[70px] md:min-w-[90px] tech-icon"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-2 md:mb-3 bg-white rounded-xl md:rounded-2xl transition-all">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-gray-700 text-center leading-normal">
                    {item.title.replace("Development", "").trim()}
                  </span>
                </a>
              );
            })}
          </div>
          <div className="flex flex-col gap-2 md:gap-3 ml-2 md:ml-4">
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover-scale shadow-sm cursor-pointer"
            >
              <ArrowRight
                className="w-4 h-4 md:w-5 md:h-5 text-gray-700"
                strokeWidth={2.5}
              />
            </button>
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover-scale shadow-sm cursor-pointer"
            >
              <ArrowLeft
                className="w-4 h-4 md:w-5 md:h-5 text-gray-700"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile strip – same UI */}
      <div className="block lg:hidden bg-white rounded-2xl p-4 md:p-6 shadow-lg">
        <div className="flex items-center justify-between bg-gray-100 p-3 md:p-4 rounded-xl gap-3">
          <div
            ref={mobileRef}
            className="flex items-center gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
          >
            {section.links.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  className="flex flex-col items-center min-w-[60px] md:min-w-[70px]"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-2 bg-white rounded-xl transition-all">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                  </div>
                  <span className="text-[10px] md:text-xs font-semibold text-gray-700 text-center leading-normal">
                    {item.title.replace("Development", "").trim()}
                  </span>
                </a>
              );
            })}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("right")}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm cursor-pointer"
            >
              <ArrowRight
                className="w-3 h-3 md:w-4 md:h-4 text-gray-700"
                strokeWidth={2.5}
              />
            </button>
            <button
              onClick={() => scroll("left")}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm cursor-pointer"
            >
              <ArrowLeft
                className="w-3 h-3 md:w-4 md:h-4 text-gray-700"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// CaseStudyCard – UI same, content projects se
function CaseStudyCard({ caseStudy, position }) {
  const { title, description, buttonText, image, clientNote, readHref } =
    caseStudy;

  return (
    <div className="relative space-y-4 h-full">
      <div className="relative bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 overflow-hidden case-study-card rounded-2xl lg:rounded-none">
        <div className="h-64 md:h-80 lg:h-[28rem] relative">
          <div className="w-full h-full relative">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover opacity-90"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Dark Gradient Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-transparent"></div>
          </div>
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-start">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-white">
                {title}
              </h3>
              <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-md">
                {description}
              </p>
            </div>
            <div className="mt-4 md:mt-6">
              <a
                href={readHref}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-gray-500 bg-opacity-20 backdrop-blur-xl text-gray-200 px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold hover-lift shadow-lg"
              >
                {buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`lg:absolute bg-white p-4 md:p-6 shadow-2xl border border-gray-100 
        lg:max-w-md xl:max-w-lg rounded-2xl lg:rounded-none
        ${position === "right"
            ? "lg:-right-16 xl:-right-24 lg:-bottom-12 xl:-bottom-14"
            : "lg:-left-16 xl:-left-24 lg:-bottom-12 xl:-bottom-14"
          }`}
      >
        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
          {clientNote}
        </p>
      </div>

      <style >{`
        .hover-lift {
          transition: all 0.3s ease;
        }
        .hover-lift:hover {
          background-color: rgba(107, 114, 128, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        .case-study-card {
          transition: transform 0.3s ease;
        }
        .case-study-card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
}
