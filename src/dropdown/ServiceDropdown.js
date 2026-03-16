import React, { useState } from "react";
import Link from "next/link";
// import { ResourceItem } from "./InsightsMenu";
import { FaArrowRight } from "react-icons/fa";
import LatestEbookPromoCardClient from "@/components/public/LatestEbookPromoCardClient";

import {
  FaMobileAlt,
  FaDesktop,
  FaShoppingCart,
  FaBitcoin,
  FaSalesforce,
  FaRobot,
  FaMicrochip,
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
  FaProjectDiagram,
  FaCamera,
  FaMicrochip as FaChip,
  FaChartLine,
  FaTools,
} from "react-icons/fa";
export const ResourceItem = ({
  href,
  title,
  description,
  meta,
  activeTab,
  handleTabChange,
}) => (
  <Link
    href={href}
    onMouseEnter={() => handleTabChange(title)}
  // className="group block p-4 rounded-2xl border border-sky-100 bg-white hover:bg-sky-50 hover:border-sky-200 shadow-sm hover:shadow-md transition"
  >
    <div className="flex items-center justify-between">
      <span
        className={`font-semibold text-[12px] ${activeTab === title ? "text-sky-700" : "text-sky-900"
          }`}
      >
        {title}
      </span>
      <FaArrowRight className="text-sky-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-xs" />
    </div>
    <p className="text-slate-600 text-[13px] mt-1 leading-relaxed">
      {description}
    </p>
    {/* {meta && (
      <p className="text-slate-500 text-[11px] mt-2">
        {meta}
      </p>
    )} */}            
  </Link>
);
// const servicesData = [
//   {
//     id: "Mobileapptab",
//     icon: <FaMobileAlt />,
//     heading: "Mobile App Development",
//     pageHref: "/services/mobile-app-development",
//     title: "Top Mobile App Development Company",
//     description:
//       "Turning your app ideas into immersive mobile experiences. Our future‑ready mobile apps move and react along with your users.",
//     links: [
//       {
//         href: "/services/mobile-app-development/android-app-development",
//         title: "Android App Development",
//         icon: <FaAndroid />,
//       },
//       {
//         href: "/services/mobile-app-development/ios-app-development",
//         title: "iOS App Development",
//         icon: <FaApple />,
//       },
//       {
//         href: "/services/mobile-app-development/hybrid-app-development",
//         title: "Hybrid App Development",
//         icon: <FaMobileAlt />,
//       },
//       {
//         href: "/services/mobile-app-development/flutter-app-development",
//         title: "Flutter App Development",
//         icon: <FaReact />,
//       },
//       {
//         href: "/services/mobile-app-development/react-native-app-development",
//         title: "React Native App Development",
//         icon: <FaReact />,
//       },
//       {
//         href: "/services/mobile-app-development/kotlin-app-development",
//         title: "Kotlin App Development",
//         icon: <FaRegFileCode />,
//       },
//     ],
//   },
//   {
//     id: "Webdevtab",
//     icon: <FaDesktop />,
//     heading: "Web & CMS Development",
//     pageHref: "/services/web-cms-development",
//     title: "Top Web & CMS Development Company",
//     description:
//       "Empowering businesses with fast, secure websites and CMS solutions that are easy to manage and scale.",
//     links: [
//       {
//         href: "/services/web-cms-development/php-web-development",
//         title: "PHP Web Development",
//         icon: <FaRegFileCode />,
//       },
//       {
//         href: "/services/web-cms-development/laravel-development",
//         title: "Laravel Development",
//         icon: <FaLaravel />,
//       },
//       {
//         href: "/services/web-cms-development/reactjs-development",
//         title: "React.js Development",
//         icon: <FaReact />,
//       },
//       {
//         href: "/services/web-cms-development/nextjs-development",
//         title: "Next.js Development",
//         icon: <FaReact />,
//       },
//       {
//         href: "/services/web-cms-development/nodejs-development",
//         title: "Node.js Development",
//         icon: <FaServer />,
//       },
//       {
//         href: "/services/web-cms-development/wordpress-development",
//         title: "WordPress Development",
//         icon: <FaWordpress />,
//       },
//     ],
//   },
//   {
//     id: "Ecommercetab",
//     icon: <FaShoppingCart />,
//     heading: "eCommerce Development",
//     pageHref: "/services/ecommerce-development",
//     title: "Top eCommerce Development Company",
//     description:
//       "Building robust eCommerce platforms that convert visitors into loyal customers and drive recurring revenue.",
//     links: [
//       {
//         href: "/services/ecommerce-development/shopify-development",
//         title: "Shopify Development",
//         icon: <FaShopify />,
//       },
//       {
//         href: "/services/ecommerce-development/woocommerce-development",
//         title: "WooCommerce Development",
//         icon: <FaShoppingCart />,
//       },
//       {
//         href: "/services/ecommerce-development/magento-development",
//         title: "Magento Development",
//         icon: <FaShoppingCart />,
//       },
//       {
//         href: "/services/ecommerce-development/custom-ecommerce-development",
//         title: "Custom eCommerce Solutions",
//         icon: <FaRegFileCode />,
//       },
//     ],
//   },
//   {
//     id: "Blockchaintab",
//     icon: <FaBitcoin />,
//     heading: "Blockchain Development",
//     pageHref: "/services/blockchain-development",
//     title: "Top Blockchain Development Company",
//     description:
//       "From smart contracts to NFT platforms, we build secure, transparent blockchain solutions for modern businesses.",
//     links: [
//       {
//         href: "/services/blockchain-development/crypto-wallet-development",
//         title: "Crypto Wallet Development",
//         icon: <FaBitcoin />,
//       },
//       {
//         href: "/services/blockchain-development/crypto-exchange-development",
//         title: "Crypto Exchange Development",
//         icon: <FaBitcoin />,
//       },
//       {
//         href: "/services/blockchain-development/smart-contract-development",
//         title: "Smart Contracts",
//         icon: <FaRegFileCode />,
//       },
//       {
//         href: "/services/blockchain-development/nft-marketplace-development",
//         title: "NFT Marketplace",
//         icon: <FaEye />,
//       },
//     ],
//   },
//   {
//     id: "Digitalmarketingtab",
//     icon: <FaSalesforce />,
//     heading: "Digital & CRM Solutions",
//     pageHref: "/services/digital-crm-solutions",
//     title: "Digital Marketing & CRM Solutions",
//     description:
//       "End‑to‑end digital marketing & CRM implementations to help you attract, nurture and retain high‑value customers.",
//     links: [
//       {
//         href: "/services/digital-crm-solutions/seo-organic-growth",
//         title: "SEO & Organic Growth",
//         icon: <FaSearch />,
//       },
//       {
//         href: "/services/digital-crm-solutions/performance-marketing",
//         title: "Performance Marketing",
//         icon: <FaBullseye />,
//       },
//       {
//         href: "/services/digital-crm-solutions/crm-implementation",
//         title: "CRM Implementation",
//         icon: <FaSalesforce />,
//       },
//       {
//         href: "/services/digital-crm-solutions/marketing-automation",
//         title: "Marketing Automation",
//         icon: <FaMailBulk />,
//       },
//     ],
//   },
//   {
//     id: "Aimltab",
//     icon: <FaRobot />,
//     heading: "AI & ML Solutions",
//     pageHref: "/services/ai-ml-solutions",
//     title: "Top AI & ML Development Company",
//     description:
//       "Use Artificial Intelligence and Machine Learning to automate decisions, personalize experiences and unlock insights from your data.",
//     links: [
//       {
//         href: "/services/ai-ml-solutions/ai-chatbots-assistants",
//         title: "AI Chatbots & Assistants",
//         icon: <FaComments />,
//       },
//       {
//         href: "/services/ai-ml-solutions/recommendation-engines",
//         title: "Recommendation Engines",
//         icon: <FaBrain />,
//       },
//       {
//         href: "/services/ai-ml-solutions/computer-vision",
//         title: "Computer Vision",
//         icon: <FaCamera />,
//       },
//       {
//         href: "/services/ai-ml-solutions/nlp-text-processing",
//         title: "NLP & Text Processing",
//         icon: <FaRegFileCode />,
//       },
//     ],
//   },
//   {
//     id: "iottab",
//     icon: <FaMicrochip />,
//     heading: "IoT & Embedded",
//     pageHref: "/services/iot-embedded-development",
//     title: "Top IoT & Embedded Development Company",
//     description:
//       "Connecting physical devices with secure cloud platforms to create smart, data‑driven products and experiences.",
//     links: [
//       {
//         href: "/services/iot-embedded-development/iot-app-development",
//         title: "IoT App Development",
//         icon: <FaMobileAlt />,
//       },
//       {
//         href: "/services/iot-embedded-development/embedded-software",
//         title: "Embedded Software",
//         icon: <FaChip />,
//       },
//       {
//         href: "/services/iot-embedded-development/iot-hardware-prototyping",
//         title: "IoT Hardware Prototyping",
//         icon: <FaTools />,
//       },
//       {
//         href: "/services/iot-embedded-development/iot-dashboards-analytics",
//         title: "IoT Dashboards & Analytics",
//         icon: <FaChartLine />,
//       },
//     ],
//   },
//   {
//     id: "DevOpstab",
//     icon: <FaCogs />,
//     heading: "DevOps & Cloud",
//     pageHref: "/services/devops-cloud-engineering",
//     title: "Top DevOps & Cloud Engineering Company",
//     description:
//       "Automate deployment pipelines, improve reliability and ship faster with our DevOps & cloud engineering team.",
//     links: [
//       {
//         href: "/services/devops-cloud-engineering/ci-cd-pipelines",
//         title: "CI/CD Pipelines",
//         icon: <FaCogs />,
//       },
//       {
//         href: "/services/devops-cloud-engineering/cloud-migration",
//         title: "Cloud Migration",
//         icon: <FaCloud />,
//       },
//       {
//         href: "/services/devops-cloud-engineering/monitoring-observability",
//         title: "Monitoring & Observability",
//         icon: <FaEye />,
//       },
//     ],
//   },
// ];

const servicesData = [
  {
    id: "Mobileapptab",
    icon: <FaMobileAlt />,
    heading: "Mobile App Development",
    pageHref: "/services/mobile-app-development",
    title: "Top Mobile App Development Company",
    description:
      "Turning your app ideas into immersive mobile experiences. Our future‑ready mobile apps move and react along with your users.",
    links: [
      {
        href: "/services/android-app-development",
        title: "Android App Development",
        icon: <FaAndroid />,
      },
      {
        href: "/services/ios-app-development",
        title: "iOS App Development",
        icon: <FaApple />,
      },
      {
        href: "/services/hybrid-app-development",
        title: "Hybrid App Development",
        icon: <FaMobileAlt />,
      },
      {
        href: "/services/react-native-app-development",
        title: "React Native App Development",
        icon: <FaReact />,
      },
      {
        href: "/services/flutter-native-app-development",
        title: "Flutter App Development",
        icon: <FaReact />,
      },
      {
        href: "/services/app-ui-ux-design",
        title: "App UI/UX Design",
        icon: <FaRegFileCode />,
      },
    ],
  },
  {
    id: "Webdevtab",
    icon: <FaDesktop />,
    heading: "Web & CMS Development",
    pageHref: "/services/web-development",
    title: "Top Web & CMS Development Company",
    description:
      "Empowering businesses with fast, secure websites and CMS solutions that are easy to manage and scale.",
    links: [
      {
        href: "/services/custom-website-development",
        title: "Custom Website Development",
        icon: <FaRegFileCode />,
      },
      {
        href: "/services/cms-development",
        title: "CMS Development",
        icon: <FaWordpress />,
      },
      {
        href: "/services/web-application-development",
        title: "Web Application Development",
        icon: <FaReact />,
      },
      {
        href: "/services/enterprise-web-development",
        title: "Enterprise Web Development",
        icon: <FaReact />,
      },
      {
        href: "/services/website-redesign",
        title: "Website Redesign",
        icon: <FaRegFileCode />,
      },
      {
        href: "/services/website-maintenance",
        title: "Website Maintenance",
        icon: <FaServer />,
      },
    ],
  },
  {
    id: "Ecommercetab",
    icon: <FaShoppingCart />,
    heading: "eCommerce Development",
    pageHref: "/services/ecommerce-development",
    title: "Top eCommerce Development Company",
    description:
      "Building robust eCommerce platforms that convert visitors into loyal customers and drive recurring revenue.",
    links: [
      {
        href: "/services/shopify-development",
        title: "Shopify Development",
        icon: <FaShopify />,
      },
      {
        href: "/services/woocommerce-development",
        title: "WooCommerce Development",
        icon: <FaShoppingCart />,
      },
      {
        href: "/services/magento-development",
        title: "Magento Development",
        icon: <FaShoppingCart />,
      },
      {
        href: "/services/custom-ecommerce-development",
        title: "Custom eCommerce Development",
        icon: <FaRegFileCode />,
      },
      {
        href: "/services/multivendor-ecommerce-development",
        title: "Multi-Vendor Marketplace",
        icon: <FaShoppingCart />,
      },
      {
        href: "/services/ecommerce-app-development",
        title: "eCommerce App Development",
        icon: <FaMobileAlt />,
      },
    ],
  },
  {
    id: "Blockchaintab",
    icon: <FaBitcoin />,
    heading: "Blockchain Development",
    pageHref: "/services/blockchain-development",
    title: "Top Blockchain Development Company",
    description:
      "From smart contracts to NFT platforms, we build secure, transparent blockchain solutions for modern businesses.",
    links: [
      {
        href: "/services/crypto-wallet-development",
        title: "Crypto Wallet Development",
        icon: <FaBitcoin />,
      },
      {
        href: "/services/smart-contract-development",
        title: "Smart Contract Development",
        icon: <FaRegFileCode />,
      },
      {
        href: "/services/nft-marketplace-development",
        title: "NFT Marketplace Development",
        icon: <FaEye />,
      },
      {
        href: "/services/dapp-development",
        title: "DApp Development",
        icon: <FaRegFileCode />,
      },
      {
        href: "/services/defi-development",
        title: "DeFi Development",
        icon: <FaBitcoin />,
      },
      {
        href: "/services/token-development",
        title: "Token Development",
        icon: <FaBitcoin />,
      },
    ],
  },
  {
    id: "Aimltab",
    icon: <FaRobot />,
    heading: "AI & ML Services",
    pageHref: "/services/ai-ml",
    title: "Top AI & ML Development Company",
    description:
      "Use Artificial Intelligence and Machine Learning to automate decisions, personalize experiences and unlock insights from your data.",
    links: [
      {
        href: "/services/ai-development",
        title: "AI Development",
        icon: <FaRobot />,
      },
      {
        href: "/services/machine-learning-development",
        title: "Machine Learning Development",
        icon: <FaBrain />,
      },
      {
        href: "/services/chatbot-development",
        title: "Chatbot Development",
        icon: <FaComments />,
      },
      {
        href: "/services/predictive-analytics",
        title: "Predictive Analytics",
        icon: <FaChartLine />,
      },
      {
        href: "/services/computer-vision",
        title: "Computer Vision",
        icon: <FaCamera />,
      },
      {
        href: "/services/recommendation-engine-development",
        title: "Recommendation Engine Development",
        icon: <FaBrain />,
      },
    ],
  },
  {
    id: "iottab",
    icon: <FaMicrochip />,
    heading: "IoT & Embedded",
    pageHref: "/services/iot-embedded",
    title: "Top IoT & Embedded Development Company",
    description:
      "Connecting physical devices with secure cloud platforms to create smart, data‑driven products and experiences.",
    links: [
      {
        href: "/services/iot-app-development",
        title: "IoT App Development",
        icon: <FaMobileAlt />,
      },
      {
        href: "/services/embedded-software-development",
        title: "Embedded Software Development",
        icon: <FaChip />,
      },
      {
        href: "/services/iiot",
        title: "Industrial IoT (IIoT)",
        icon: <FaMicrochip />,
      },
      {
        href: "/services/device-integration",
        title: "Device Integration",
        icon: <FaTools />,
      },
      {
        href: "/services/home-automation",
        title: "Home Automation",
        icon: <FaRegFileCode />,
      },
      {
        href: "/services/aiot-app-development",
        title: "AIoT App Development",
        icon: <FaRobot />,
      },
    ],
  },
  {
    id: "DevOpstab",
    icon: <FaCogs />,
    heading: "DevOps & Cloud",
    pageHref: "/services/devops-cloud",
    title: "Top DevOps & Cloud Engineering Company",
    description:
      "Automate deployment pipelines, improve reliability and ship faster with our DevOps & cloud engineering team.",
    links: [
      {
        href: "/services/cloud-migration",
        title: "Cloud Migration",
        icon: <FaCloud />,
      },
      {
        href: "/services/devops-automation",
        title: "DevOps Automation",
        icon: <FaCogs />,
      },
      {
        href: "/services/ci-cd-pipeline",
        title: "CI/CD Pipeline",
        icon: <FaCogs />,
      },
      {
        href: "/services/cloud-management",
        title: "Cloud Management",
        icon: <FaCloud />,
      },
      {
        href: "/services/containerization",
        title: "Containerization",
        icon: <FaRegFileCode />,
      },
      {
        href: "/services/server-security-optimization",
        title: "Server Security Optimization",
        icon: <FaServer />,
      },
    ],
  },
   {
    id: "digital",
    icon: <FaCogs />,
    heading: "Digital Marketing",
    pageHref: "/services/digital-marketing",
    title: "Top Digital Marketing Company",
    description:
      "Automate deployment pipelines, improve reliability and ship faster with our DevOps & cloud engineering team.",
    links: [
      {
        href: "/services/seo-services",
        title: "Seo Services",
        icon: <FaMobileAlt />,
      },
      {
        href: "/services/paid-marketing",
        title: "Paid Marketing",
        icon: <FaCogs />,
      },
      {
        href: "/services/online-reputation-management",
        title: "Online Reputation Management",
        icon: <FaCogs />,
      },
      {
        href: "/services/app-marketing",
        title: "App Marketing",
        icon: <FaCloud />,
      },
      {
        href: "/services/content-marketing",
        title: "Content-Marketing",
        icon: <FaRegFileCode />,
      },
      {
        href: "/services/social-media-marketing",
        title: "Social Media Marketing",
        icon: <FaServer />,
      },
    ],
  },
];

const ServicesMenu = () => {
  const [activeTab, setActiveTab] = useState("Mobileapptab");
  const [activeSubTab, setActiveSubTab] = useState(null);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleTabChange = (title) => setActiveSubTab(title);

  const currentService =
    servicesData.find((s) => s.id === activeTab) || servicesData[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 mt-16">
      <div className="absolute inset-0 max-w-7xl mx-auto px-4">
        <div className="relative bg-white max-w-[90rem] w-full h-[80vh] max-h-[40rem] rounded-b-2xl shadow-md overflow-hidden z-10">
          <div className="w-full h-full flex">
            {/* Left Section */}
            <div className="flex-[1.5] bg-[#fcfcfc] text-left p-8 border-r border-sky-200">
              {servicesData.map((service) => (
                <div key={service.id} className="cursor-pointer mb-1">
                  <h3
                    onMouseEnter={() => handleTabClick(service.id)}
                    className={`flex justify-between items-center rounded px-3 py-2 text-sm transition 
                      ${activeTab === service.id
                        ? "text-sky-600 bg-sky-50 font-semibold"
                        : "text-slate-800 hover:bg-sky-50"
                      }`}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <span className="header_menu_tab_ic text-sky-600">
                        {service.icon}
                      </span>
                      <span>{service.heading}</span>
                    </div>
                    <span
                      className={`text-[0.85rem] ${activeTab === service.id ? "text-sky-500" : "hidden"
                        }`}
                    >
                      <FaArrowRight />
                    </span>
                  </h3>
                </div>
              ))}
            </div>

            {/* Middle Section */}
            <div className="flex-[3] flex flex-col justify-between h-full w-2/4 overflow-hidden">
              <div className="text-left mt-8 md:mt-0 m-5 p-8 max_height">
                {/* Active service detail */}
                <div className="flex items-center gap-2 mb-4 group">
                  <Link
                    href={currentService.pageHref}
                    className="text-xl md:text-2xl font-semibold text-sky-800 group-hover:text-sky-600 transition-colors"
                  >
                    {currentService.title}
                  </Link>
                  <FaArrowRight className="text-sky-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </div>

                <p className="text-[15px] leading-[28px] text-sky-900 mt-1 mb-4">
                  {currentService.description}
                </p>

                {/* Sub services as cards with icon to fill space nicely */}

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentService.links.map((link, index) => (
                    <div 
                      key={index}
                      href={link.href}
                      className="group flex items-center gap-3 p-3 rounded-xl border border-sky-100 bg-white hover:bg-sky-50 hover:border-sky-200 transition shadow-lg hover:shadow-md flex-col"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-600/90 text-white text-sm shadow-sm">
                        {link.icon ?? <FaRegFileCode />}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-[12px] text-sky-900 group-hover:text-sky-700">
                          <ResourceItem
                            {...link}
                            activeTab={activeSubTab}
                            handleTabChange={handleTabChange}
                            className="text-[8px]"
                          />
                        </span>
                        <span className="text-[9px] text-slate-500">
                          Sub‑service under {currentService.heading}
                        </span>
                      </div>
                    </div>
                  ))}

                 
                </div>
              </div>

              {/* Bottom CTA stripe (optional) */}
              <div className="h-[7rem] w-full hidden" />
            </div>

            {/* Right Ebook Section – light Softkingo style */}
            <div className="hidden xl:block w-1/4 h-full bg-white">
              <div className="h-full w-full border-l border-sky-100 bg-gradient-to-b from-sky-50 via-sky-100 to-sky-200 px-6 py-8 flex items-center">
     <LatestEbookPromoCardClient />

                {/* <div className="bg-white/90 border border-sky-100 rounded-3xl p-5 flex flex-col justify-between h-full max-h-[500px] w-full shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                  <div>
                    <p className="text-[11px] tracking-[0.24em] uppercase text-sky-500">
                      Ebook
                    </p>

                    <div className="bg-gradient-to-tl from-sky-600 via-sky-700 to-sky-900 rounded-2xl my-5 mr-10 flex items-center justify-center">
                      <img src="/images/black book.png" className="p-6" alt="PSA Guide" />
                    </div>

                    <h2 className="text-xs text-sky-600 font-semibold">
                      Resource Guide
                    </h2>
                    <h1 className="text-sm text-slate-900 font-semibold mt-1">
                      The Ultimate Guide: What is PSA Software?
                    </h1>
                    <p className="mt-1 text-[9px] text-slate-500">
                      July 22, 2025 · 18 min read
                    </p>
                    <p className="mt-3 text-[10px] text-slate-700 leading-relaxed">
                      Learn how Professional Services Automation (PSA) software helps you
                      manage projects, resources, billing and profitability in one place.
                    </p>
                  </div>

                  <Link
                    href="/ebooks/psa-software-guide"
                    className="mt-4 px-4 md:px-6 py-2 rounded-full bg-sky-600 text-white text-xs md:text-sm font-semibold shadow-[0_10px_24px_rgba(15,23,42,0.18)] hover:bg-sky-500 transition-colors flex items-center gap-2 w-fit"
                  >
                    Download Now
                    <FaArrowRight className="text-[0.75rem]" />
                  </Link>
                </div> */}

              </div>
            </div>

          </div>
        </div>
      </div>
            <style>{`.header_menu_tab_ic {
    border-radius: 8px;
    background: linear-gradient(180deg, #cedbdf 0%, #f0f4f4 100%), #d9d9d9;
    flex: 0 0 45px;
    height: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    /* color: rgb(95, 162, 188); */
}
.max_height{
    height: calc(100% - 7rem);
    max-height: calc(100% - 7rem);
}

.bg_gradent_l
{
    background: linear-gradient(305deg, #c6e7f3ed, transparent);
}`}</style>
    </div>
  );
};

export default ServicesMenu;
