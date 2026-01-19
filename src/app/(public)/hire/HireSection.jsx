// app/hire/HireSection.jsx
import { prisma } from '@/lib/prisma';  
import { ArrowRight, Code2, Smartphone, Database, Layers, Cloud, TestTube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function parseJsonSafe(str) {
  if (!str) return null;
  try { return JSON.parse(str); } catch { return null; }
}

function resolveIcon(icon, iconMap) {
  // Hardcoded component case
  if (typeof icon === 'function') return icon;
  // DB string case
  if (typeof icon === 'string' && iconMap[icon]) return iconMap[icon];
  // Fallback
  return Code2;
}

export default async function HireSection() {
  const page = await prisma.page.findFirst({
    where: { slug: 'hire', type: 'hire', status: 'published' }
  });

  const sections1 = [ 
    // 1) App Developers
    {
      id: 1,
      title: "Hire App Developers",
      subtitle: "On the lookout for a coding wizard? Hire mobile app developers to build high‑performance Android, iOS and cross‑platform apps.",
      imagePosition: "right",
      bgColor: "bg-gradient-to-br from-sky-50 to-pink-50",
      caseStudy: {
        title: "Mobile Experts",
        description: "iOS, Android & Cross-Platform Development",
        buttonText: "View Profiles",
        image: "/images/hire/mobile.jpg",
        developerCount: "40+ Developers",
        experience: "4+ Years Avg Experience",
        badge: "Top Rated",
        href: "/hire/app-developers"
      },
      technologies: [
        { name: "Android Developers", icon: Smartphone, href: "/hire/app-developers/android-developers" },
        { name: "iOS Developers", icon: Smartphone, href: "/hire/app-developers/ios-developers" },
        { name: "iPhone App Developers", icon: Smartphone, href: "/hire/app-developers/iphone-app-developers" },
        { name: "iPad Developers", icon: Smartphone, href: "/hire/app-developers/ipad-developers" },
        { name: "Flutter Developers", icon: Smartphone, href: "/hire/app-developers/flutter-developers" }
      ]
    },

    // 2) Frontend Developers
    {
      id: 2,
      title: "Hire Frontend Developers",
      subtitle: "Curate pixel‑perfect experiences with frontend engineers who ship fast, responsive and accessible UIs.",
      imagePosition: "left",
      bgColor: "bg-gradient-to-br from-blue-50 to-sky-50",
      caseStudy: {
        title: "Frontend Specialists",
        description: "React, Angular, Vue.js & Modern UIs",
        buttonText: "View Profiles",
        image: "/images/services/s1.png",
        developerCount: "50+ Developers",
        experience: "5+ Years Avg Experience",
        badge: "Available Now",
        href: "/hire/frontend-developers"
      },
      technologies: [
        { name: "Angular Developers", icon: Code2, href: "/hire/frontend-developers/angular-developers" },
        { name: "ReactJS Developers", icon: Code2, href: "/hire/frontend-developers/reactjs-developers" },
        { name: "Vue.js Developers", icon: Code2, href: "/hire/frontend-developers/vuejs-developers" },
        { name: "Web App Developers", icon: Code2, href: "/hire/frontend-developers/web-app-developers" }
      ]
    },

    // 3) Backend Developers
    {
      id: 3,
      title: "Hire Backend Developers",
      subtitle: "Hire backend developers who design reliable APIs, data models and cloud architectures for scale.",
      imagePosition: "right",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      caseStudy: {
        title: "Backend Architects",
        description: "Node.js, Python, Java & PHP APIs",
        buttonText: "View Profiles",
        image: "/images/hire/backend.jpg",
        developerCount: "60+ Developers",
        experience: "6+ Years Avg Experience",
        badge: "Expert Level",
        href: "/hire/backend-developers"
      },
      technologies: [
        { name: "Java Developers", icon: Database, href: "/hire/backend-developers/java-developers" },
        { name: "Node.js Developers", icon: Database, href: "/hire/backend-developers/nodejs-developers" },
        { name: "Python Developers", icon: Database, href: "/hire/backend-developers/python-developers" },
        { name: "PHP Developers", icon: Database, href: "/hire/backend-developers/php-developers" },
        { name: "Laravel Developers", icon: Database, href: "/hire/backend-developers/laravel-developers" },
        { name: "Django Developers", icon: Database, href: "/hire/backend-developers/Django-developers" }
      ]
    },

    // 4) Full-Stack Developers
    {
      id: 4,
      title: "Hire Full‑Stack Developers",
      subtitle: "Ship end‑to‑end features faster with full‑stack developers who can own frontend, backend and integrations.",
      imagePosition: "left",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      caseStudy: {
        title: "Full-Stack Masters",
        description: "MERN, MEAN & Full-Stack Solutions",
        buttonText: "View Profiles",
        image: "/images/hire/fullstack.jpg",
        developerCount: "45+ Developers",
        experience: "5+ Years Avg Experience",
        badge: "Highly Skilled",
        href: "/hire/full-stack-developers"
      },
      technologies: [
        { name: "MERN Stack Developers", icon: Layers, href: "/hire/full-stack-developers/mern-developers" },
        { name: "NextJs Developers", icon: Layers, href: "/hire/full-stack-developers/nextjs-developers" },
        { name: "Laravel + Vue Developers", icon: Layers, href: "/hire/full-stack-developers/laravel-vue-developers" },
        { name: "React + Django Developers", icon: Layers, href: "/hire/full-stack-developers/react-django-developers" }
      ]
    },

    // 5) eCommerce Developers
    {
      id: 5,
      title: "Hire eCommerce Developers",
      subtitle: "Hire eCommerce experts to build conversion‑focused, secure and scalable online stores.",
      imagePosition: "right",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      caseStudy: {
        title: "Store Specialists",
        description: "Magento, Shopify & WooCommerce",
        buttonText: "View Profiles",
        image: "/images/hire/ecommerce.jpg",
        developerCount: "35+ Developers",
        experience: "5+ Years Avg Experience",
        badge: "Store Certified",
        href: "/hire/ecommerce-developers"
      },
      technologies: [
        { name: "Magento Developers", icon: Cloud, href: "/hire/ecommerce-developers/magento-developers" },
        { name: "WordPress Developers", icon: Cloud, href: "/hire/ecommerce-developers/wordpress-developers" },
        { name: "WooCommerce Developers", icon: Cloud, href: "/hire/ecommerce-developers/woocommerce-developers" },
        { name: "Shopify Developers", icon: Cloud, href: "/hire/ecommerce-developers/shopify-developers" }
      ]
    },

    // 6) Dedicated Experts
    {
      id: 6,
      title: "Hire Dedicated Experts",
      subtitle: "Build a long‑term pod of dedicated experts across architecture, cloud, data, QA and product.",
      imagePosition: "left",
      bgColor: "bg-gradient-to-br from-rose-50 to-red-50",
      caseStudy: {
        title: "Specialist Pod",
        description: "DevOps, QA, Architects & Designers",
        buttonText: "View Profiles",
        image: "/images/hire/devops.jpg",
        developerCount: "25+ Engineers",
        experience: "7+ Years Avg Experience",
        badge: "Certified Experts",
        href: "/hire/dedicated-developers"
      },
      technologies: [
        { name: "Solution Architects", icon: TestTube, href: "/hire/solution-architects" },
        { name: "DevOps Engineers", icon: TestTube, href: "/hire/devops-engineers" },
        { name: "QA & Testers", icon: TestTube, href: "/hire/qa-testers" },
        { name: "AI & ML Engineers", icon: TestTube, href: "/hire/ml-engineers" },
        { name: "Software Developers", icon: TestTube, href: "/hire/software-developers" },
        { name: "UI/UX Designers", icon: TestTube, href: "/hire/ui-ux-designers" }
      ]
    }
  ];

  const iconMap = {
    // Lucide
    'Code2': Code2, 'Smartphone': Smartphone, 'Database': Database,
    'Layers': Layers, 'Cloud': Cloud, 'TestTube': TestTube,
    
    // React Icons (strings from DB)
    'FaAndroid': Smartphone, 'FaApple': Smartphone, 'FaReact': Code2,
    'FaAngular': Code2, 'FaVuejs': Code2, 'FaDesktop': Code2,
    'FaServer': Database, 'FaNodeJs': Database, 'FaPython': Database,
    'FaPhp': Database, 'FaLaravel': Database, 'FaShoppingCart': Cloud,
    'FaWordpress': Cloud, 'FaShopify': Cloud, 'FaUserCog': TestTube,
    'FaBullseye': TestTube, 'FaRobot': TestTube, 'FaRegIdCard': TestTube,
    'FaUserTie': TestTube, 'FaMobileAlt': Smartphone
  };

  const data = parseJsonSafe(page?.contentJson) || {};
  const tabs = Array.isArray(data?.tabs) ? data.tabs : [];

  // MAGIC LINE - dynamic + fallback
  const sections = tabs.length > 0 
    ? tabs.map((tab, idx) => ({
        id: tab?.id ?? `section-${idx}`,
        title: tab?.section?.title ?? tab?.title ?? "Hire Developers",
        subtitle: tab?.section?.subtitle ?? tab?.description ?? "",
        imagePosition: tab?.section?.imagePosition ?? "right",
        bgColor: tab?.section?.bgColor ?? "bg-gradient-to-br from-gray-50 to-slate-50",
        caseStudy: {
          title: tab?.section?.caseStudy?.title ?? tab?.title ?? "Top Talent",
          description: tab?.section?.caseStudy?.description ?? tab?.description ?? "",
          buttonText: tab?.section?.caseStudy?.buttonText ?? "View Profiles",
          image: tab?.section?.caseStudy?.image ?? "/images/hire/default.jpg",
          developerCount: tab?.section?.caseStudy?.developerCount ?? "20+ Developers",
          experience: tab?.section?.caseStudy?.experience ?? "4+ Years",
          badge: tab?.section?.caseStudy?.badge ?? "Available Now",
          href: tab?.section?.caseStudy?.href ?? "#"
        },
        technologies: Array.isArray(tab?.section?.technologies) ? tab.section.technologies.map(t => ({
          ...t,
          href: t.href ?? '#',
          icon: t.icon ?? 'Code2'
        })) : [],
      }))
    : sections1;

  const TechChip = ({ tech, iconMap }) => {
    const IconComponent = resolveIcon(tech.icon, iconMap);
    return (
      <Link 
        href={tech.href || '#'}
        className="flex items-center gap-3 bg-gradient-to-r from-sky-50 to-pink-50 px-5 py-3 rounded-xl hover-scale cursor-pointer border border-sky-100 hover:shadow-md transition-all flex-shrink-0 group"
      >
        <IconComponent className="w-5 h-5 text-sky-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-semibold text-gray-700 hover:text-sky-700 flex-shrink-0">
          {tech.name}
        </span>
      </Link>
    );
  };

  const ContentBlock = ({ section, iconMap }) => (
    <div className="space-y-8 animate-fade-left lg:animate-fade-right">
      <div className="space-y-4">
        <div className="inline-block bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
          <span className="text-sm font-semibold text-sky-600">
            {section.caseStudy.badge}
          </span>
        </div>
        
        <Link href={section.caseStudy.href || '#'} className="block hover:no-underline">
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 hover:text-sky-600 transition-colors group-hover:underline">
            {section.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          {section.subtitle}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover-lift">
          <p className="text-xl font-bold text-sky-600">
            {section.caseStudy.developerCount}
          </p>
          <p className="text-gray-600 text-sm mt-1">Ready to Hire</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover-lift">
          <p className="text-xl font-bold text-sky-600">
            {section.caseStudy.experience}
          </p>
          <p className="text-gray-600 text-sm mt-1">Experience</p>
        </div>
      </div>

      {/* Technologies */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Core Technologies</h3>
        <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-2 snap-x snap-mandatory">
          {section.technologies.map((tech, idx) => (
            <TechChip key={idx} tech={tech} iconMap={iconMap} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full overflow-hidden">
      {sections.slice(0, 6).map((section, index) => (
        <section 
          key={section.id} 
          className={`${section.bgColor} py-16 md:py-24 px-4 md:px-8 lg:px-20 animate-section`}
          style={{animationDelay: `${index * 0.15}s`}}
        >
          <div className="max-w-7xl mx-auto">
            {section.imagePosition === "right" ? (
              // Layout: Content Left, Card Right
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <ContentBlock section={section} iconMap={iconMap} />
                <DeveloperCard caseStudy={section.caseStudy} />
              </div>
            ) : (
              // Layout: Card Left, Content Right
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <DeveloperCard caseStudy={section.caseStudy} />
                <ContentBlock section={section} iconMap={iconMap} />
              </div>
            )}
          </div>
        </section>
      ))}

      <style global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-section {
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: both;
        }
        .animate-fade-left {
          animation: fadeLeft 0.8s ease-out;
        }
        .animate-fade-right {
          animation: fadeRight 0.8s ease-out;
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .hover-scale {
          transition: all 0.3s ease;
        }
        .hover-scale:hover {
          transform: scale(1.05);
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

function DeveloperCard({ caseStudy }) {
  return (
    <div className="relative group animate-scale-in">
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl hover-lift">
        <div className="relative h-80 lg:h-96 overflow-hidden">
          <Image
            src={caseStudy.image}
            alt={caseStudy.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-white">
                {caseStudy.title}
              </h3>
              <p className="text-white/90 text-lg leading-relaxed">
                {caseStudy.description}
              </p>
              
              {/* <Link href={caseStudy.href || '#'} className="block">
                <button className="mt-4 w-full bg-gradient-to-r from-sky-600 to-sky-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-sky-700 hover:to-sky-800 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 justify-center">
                  {caseStudy.buttonText}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link> */}
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-sky-50 to-sky-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">Available Now</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-400">
              {'★'.repeat(5)}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -top-4 -right-4 bg-gradient-to-r from-sky-600 to-sky-700 text-white px-6 py-3 rounded-2xl shadow-xl z-10">
        <p className="text-sm font-bold">Top Rated</p>
      </div>

      <style >{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
