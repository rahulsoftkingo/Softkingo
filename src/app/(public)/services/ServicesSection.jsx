// src/app/(public)/services/ServicesSection.jsx
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
        href: "/services/mobile-app-development/android-app-development",
        title: "Android App Development",
        icon: FaAndroid,
      },
      {
        href: "/services/mobile-app-development/ios-app-development",
        title: "iOS App Development",
        icon: FaApple,
      },
      {
        href: "/services/mobile-app-development/hybrid-app-development",
        title: "Hybrid App Development",
        icon: FaMobileAlt,
      },
      {
        href: "/services/mobile-app-development/flutter-app-development",
        title: "Flutter App Development",
        icon: FaReact,
      },
      {
        href: "/services/mobile-app-development/react-native-app-development",
        title: "React Native App Development",
        icon: FaReact,
      },
      {
        href: "/services/mobile-app-development/kotlin-app-development",
        title: "Kotlin App Development",
        icon: FaRegFileCode,
      },
    ],
  },
  {
    id: "Webdevtab",
    title: "Web & CMS Development",
    pageHref: "/services/web-cms-development",
    description:
      "Empowering businesses with fast, secure websites and CMS solutions that are easy to manage and scale.",
    links: [
      {
        href: "/services/web-cms-development/php-web-development",
        title: "PHP Web Development",
        icon: FaRegFileCode,
      },
      {
        href: "/services/web-cms-development/laravel-development",
        title: "Laravel Development",
        icon: FaLaravel,
      },
      {
        href: "/services/web-cms-development/reactjs-development",
        title: "React.js Development",
        icon: FaReact,
      },
      {
        href: "/services/web-cms-development/nextjs-development",
        title: "Next.js Development",
        icon: FaReact,
      },
      {
        href: "/services/web-cms-development/nodejs-development",
        title: "Node.js Development",
        icon: FaServer,
      },
      {
        href: "/services/web-cms-development/wordpress-development",
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
        href: "/services/ecommerce-development/shopify-development",
        title: "Shopify Development",
        icon: FaShopify,
      },
      {
        href: "/services/ecommerce-development/woocommerce-development",
        title: "WooCommerce Development",
        icon: FaShoppingCart,
      },
      {
        href: "/services/ecommerce-development/magento-development",
        title: "Magento Development",
        icon: FaShoppingCart,
      },
      {
        href: "/services/ecommerce-development/custom-ecommerce-development",
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
        href: "/services/blockchain-development/crypto-wallet-development",
        title: "Crypto Wallet Development",
        icon: FaBitcoin,
      },
      {
        href: "/services/blockchain-development/crypto-exchange-development",
        title: "Crypto Exchange Development",
        icon: FaBitcoin,
      },
      {
        href: "/services/blockchain-development/smart-contract-development",
        title: "Smart Contracts",
        icon: FaRegFileCode,
      },
      {
        href: "/services/blockchain-development/nft-marketplace-development",
        title: "NFT Marketplace",
        icon: FaEye,
      },
    ],
  },
  {
    id: "Digitalmarketingtab",
    title: "Digital & CRM Solutions",
    pageHref: "/services/digital-crm-solutions",
    description:
      "End‑to‑end digital marketing & CRM implementations to help you attract, nurture and retain high‑value customers.",
    links: [
      {
        href: "/services/digital-crm-solutions/seo-organic-growth",
        title: "SEO & Organic Growth",
        icon: FaSearch,
      },
      {
        href: "/services/digital-crm-solutions/performance-marketing",
        title: "Performance Marketing",
        icon: FaBullseye,
      },
      {
        href: "/services/digital-crm-solutions/crm-implementation",
        title: "CRM Implementation",
        icon: FaSalesforce,
      },
      {
        href: "/services/digital-crm-solutions/marketing-automation",
        title: "Marketing Automation",
        icon: FaMailBulk,
      },
    ],
  },
  {
    id: "Aimltab",
    title: "AI & ML Solutions",
    pageHref: "/services/ai-ml-solutions",
    description:
      "Use Artificial Intelligence and Machine Learning to automate decisions, personalize experiences and unlock insights from your data.",
    links: [
      {
        href: "/services/ai-ml-solutions/ai-chatbots-assistants",
        title: "AI Chatbots & Assistants",
        icon: FaComments,
      },
      {
        href: "/services/ai-ml-solutions/recommendation-engines",
        title: "Recommendation Engines",
        icon: FaBrain,
      },
      {
        href: "/services/ai-ml-solutions/computer-vision",
        title: "Computer Vision",
        icon: FaCamera,
      },
      {
        href: "/services/ai-ml-solutions/nlp-text-processing",
        title: "NLP & Text Processing",
        icon: FaRegFileCode,
      },
    ],
  },
  {
    id: "DevOpstab",
    title: "DevOps & Cloud",
    pageHref: "/services/devops-cloud-engineering",
    description:
      "Automate deployment pipelines, improve reliability and ship faster with our DevOps & cloud engineering team.",
    links: [
      {
        href: "/services/devops-cloud-engineering/ci-cd-pipelines",
        title: "CI/CD Pipelines",
        icon: FaCogs,
      },
      {
        href: "/services/devops-cloud-engineering/cloud-migration",
        title: "Cloud Migration",
        icon: FaCloud,
      },
      {
        href: "/services/devops-cloud-engineering/monitoring-observability",
        title: "Monitoring & Observability",
        icon: FaEye,
      },
    ],
  },
];

// CASE STUDIES DATA – sirf yahan se title/description/link/bg lenge
const projects = [
  {
    id: "lovelocal-grocery-app",
    title: "LoveLocal: Grocery App",
    description:
      "Experience the convenience and freshness that LoveLocal brings to your everyday grocery shopping.",
    bgImage: "/images/portfolio/bg-1.png",
    phoneMockup: "/images/case-studies/screen1.png",
    readHref: "https://lovelocal.in", // read case study link yahan se
  },
  {
    id: "hopin-taxi",
    title: "HopIn",
    description:
      "HopIn app got started in our even greater, real app. Get the HopIn app and order a ride without adding your bank details.",
    bgImage: "/images/portfolio/bg-1.png",
    phoneMockup: "/images/portfolio/hopin-phone.png",
    readHref: "https://hopin.com",
  },
  {
    id: "moglix-b2b",
    title: "Moglix - B2B e-Com Shopping",
    description:
      "Moglix kicked us with a mission rich reliance retail app that could handle the complexities of B2B commerce.",
    bgImage: "/images/portfolio/bg-1.png",
    phoneMockup: "/images/portfolio/moglix-phone.png",
    readHref: "https://moglix.com",
  },
  {
    id: "potato-delivery",
    title: "Potato Delivery App",
    description:
      "A game-changing app that's redefining how businesses streamline supplies.",
    bgImage: "/images/portfolio/bg-1.png",
    phoneMockup: "/images/portfolio/potato-phone.png",
    readHref: "https://potatoapp.com",
  },
  {
    id: "bumpy-dating",
    title: "Bumpy Dating App",
    description:
      "Bumpy is a discreet international dating app designed for users around the world by offering a platform that values discretion.",
    bgImage: "/images/portfolio/bg-1.png",
    phoneMockup: "/images/portfolio/bumpy-phone.png",
    readHref: "https://bumpyapp.com",
  },
  // agar 6th,7th ke liye chahiye to yahan aur objects add kar sakte ho
];

export default function ServicesSection() {
  return (
    <div className="w-full overflow-hidden">
      {servicesData.map((section, index) => {
        const layoutLeft = index % 2 === 0;
        const project = projects[index]; // index mapping

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
                  <ServiceContent section={section} layout="left" index={index} />
                  <CaseStudyCard
                    caseStudy={buildCaseStudyFromProject(project, section, index)}
                    position="right"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                  <CaseStudyCard
                    caseStudy={buildCaseStudyFromProject(project, section, index)}
                    position="left"
                  />
                  <ServiceContent
                    section={section}
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
function buildCaseStudyFromProject(project, section, index) {
  if (!project) {
    return {
      title: section.title,
      description: section.description,
      buttonText: "Read Case Study",
      image: `/images/services/s${index + 1}.png`,
      clientNote: section.description,
      readHref: "#",
    };
  }

  return {
    title: project.title,
    description: project.description,
    buttonText: "Read Case Study",
    image: project.bgImage, // bg image tumhare UI ka hi rahe
    phoneMockup: project.phoneMockup,
    clientNote: section.description, // niche white box me
    readHref: project.readHref,
  };
}

// tumhara ServiceContent jaisa ka taisa
function ServiceContent({ section, layout, index }) {
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
          <div className="flex items-center gap-4 md:gap-8 overflow-x-auto pb-2 scrollbar-hide">
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
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover-scale shadow-sm cursor-default">
              <ArrowRight
                className="w-4 h-4 md:w-5 md:h-5 text-gray-700"
                strokeWidth={2.5}
              />
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover-scale shadow-sm cursor-default">
              <ArrowLeft
                className="w-4 h-4 md:w-5 md:h-5 text-gray-700"
                strokeWidth={2.5}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile strip – same UI */}
      <div className="block lg:hidden bg-white rounded-2xl p-4 md:p-6 shadow-lg">
        <div className="flex items-center justify-between bg-gray-100 p-3 md:p-4 rounded-xl gap-3">
          <div className="flex items-center gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-hide">
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
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm cursor-default">
              <ArrowRight
                className="w-3 h-3 md:w-4 md:h-4 text-gray-700"
                strokeWidth={2.5}
              />
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm cursor-default">
              <ArrowLeft
                className="w-3 h-3 md:w-4 md:h-4 text-gray-700"
                strokeWidth={2.5}
              />
            </div>
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
