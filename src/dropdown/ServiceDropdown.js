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
    {/* <p className="text-slate-600 text-[13px] mt-1 leading-relaxed">
      {description}
    </p> */}
    {/* {meta && (
      <p className="text-slate-500 text-[11px] mt-2">
        {meta}
      </p>
    )} */}
  </Link>
);
const servicesData = [
  // {
  //   id: "Overviewtab",
  //   icon: <FaChartLine />,
  //   heading: "Our Services",
  //   pageHref: "/services",
  //   title: "#1 Top Software Development Company Contributing to a Smarter World",
  //   description: "Helping businesses grow with user-friendly mobile apps, visually stunning websites, and results-driven digital marketing. We create solutions that engage your audience and drive real impact.",
  //   links: [
  //     { href: "/services/mobile-app-development", title: "Mobile App Development", description: "Top mobile app solutions for all devices.", icon: <FaMobileAlt /> },
  //     { href: "/services/web-development", title: "Web & CMS Development", description: "Design fast, secure websites and CMS.", icon: <FaDesktop /> },
  //     { href: "/services/ecommerce-development", title: "eCommerce Development", description: "Robust stores built to increase sales.", icon: <FaShoppingCart /> },
  //     { href: "/services/blockchain-development", title: "Blockchain Solutions", description: "Secure crypto and smart contracts.", icon: <FaBitcoin /> },
  //     { href: "/services/ai-ml", title: "AI & ML Solutions", description: "Intelligent automation and predictions.", icon: <FaRobot /> },
  //     { href: "/services/digital-marketing", title: "Digital Marketing", description: "Grow your brand and attract customers.", icon: <FaBullseye /> },
  //   ],
  // },
  {
    id: "Mobileapptab",
    icon: <FaMobileAlt />,
    heading: "Mobile App Development",
    pageHref: "/services/mobile-app-development",
    title: "Top Mobile App Development Company",
    description: "Build fast, user-friendly apps that your customers actually enjoy, helping you grow and connect better with your audience.",
    links: [
      { href: "/services/android-app-development", title: "Android App Development", description: "Smooth apps for all Android devices.", icon: <FaAndroid /> },
      { href: "/services/ios-app-development", title: "iOS App Development", description: "Reliable apps for iPhone & iPad.", icon: <FaApple /> },
      { href: "/services/hybrid-app-development", title: "Hybrid App Development", description: "One app for Android & iOS.", icon: <FaMobileAlt /> },
      { href: "/services/react-native-app-development", title: "React Native App Development", description: "Cross-platform apps with native feel.", icon: <FaReact /> },
      { href: "/services/flutter-native-app-development", title: "Flutter App Development", description: "Beautiful apps with smooth performance.", icon: <FaReact /> },
      { href: "/services/app-ui-ux-design", title: "App UI/UX Design", description: "Intuitive designs people love.", icon: <FaRegFileCode /> },
    ],
  },
  {
    id: "Webdevtab",
    icon: <FaDesktop />,
    heading: "Web & CMS Development",
    pageHref: "/services/web-development",
    title: "Top Web & CMS Development Company",
    description: "Develop fast, secure websites and CMS solutions that are easy to manage, visually appealing, and built to grow with your business.",
    links: [
      { href: "/services/custom-website-development", title: "Custom Website Development", description: "Websites built to match your brand.", icon: <FaRegFileCode /> },
      { href: "/services/cms-development", title: "CMS Development", description: "Easily manage your content.", icon: <FaWordpress /> },
      { href: "/services/web-application-development", title: "Web Application Development", description: "Web apps that simplify work.", icon: <FaReact /> },
      { href: "/services/enterprise-web-development", title: "Enterprise Web Development", description: "Scalable solutions for big businesses.", icon: <FaReact /> },
      { href: "/services/website-redesign", title: "Website Redesign", description: "Give your site a fresh look.", icon: <FaRegFileCode /> },
      { href: "/services/website-maintenance", title: "Website Maintenance", description: "Keep your site safe and updated.", icon: <FaServer /> },
    ],
  },
  {
    id: "Ecommercetab",
    icon: <FaShoppingCart />,
    heading: "eCommerce Development",
    pageHref: "/services/ecommerce-development",
    title: "Top eCommerce Development Company",
    description: "eCommerce platforms that increase sales, engage customers, and grow with your business.",
    links: [
      { href: "/services/shopify-development", title: "Shopify Development", description: "Launch your store with Shopify ease.", icon: <FaShopify /> },
      { href: "/services/woocommerce-development", title: "WooCommerce Development", description: "Flexible solutions for any business.", icon: <FaShoppingCart /> },
      { href: "/services/magento-development", title: "Magento Development", description: "Powerful stores built to scale.", icon: <FaShoppingCart /> },
      { href: "/services/custom-ecommerce-development", title: "Custom eCommerce Development", description: "Unique online shops made for you.", icon: <FaRegFileCode /> },
      { href: "/services/multivendor-ecommerce-development", title: "Multi-Vendor Marketplace", description: "Connect multiple sellers in one place.", icon: <FaShoppingCart /> },
      { href: "/services/ecommerce-app-development", title: "eCommerce App Development", description: "Shopping apps your customers love.", icon: <FaMobileAlt /> },
    ],
  },
  {
    id: "Blockchaintab",
    icon: <FaBitcoin />,
    heading: "Blockchain Development",
    pageHref: "/services/blockchain-development",
    title: "Top Blockchain Development Company",
    description: "Secure, innovative blockchain solutions that simplify crypto, DeFi, NFTs, and digital transactions, helping your business grow and stay ahead.",
    links: [
      { href: "/services/crypto-wallet-development", title: "Crypto Wallet Development", description: "Safe, easy-to-use wallets for all users.", icon: <FaBitcoin /> },
      { href: "/services/smart-contract-development", title: "Smart Contract Development", description: "Reliable contracts that automate processes.", icon: <FaRegFileCode /> },
      { href: "/services/nft-marketplace-development", title: "NFT Marketplace Development", description: "Seamless platforms to trade digital assets.", icon: <FaEye /> },
      { href: "/services/dapp-development", title: "DApp Development", description: "Decentralized apps with smooth performance.", icon: <FaRegFileCode /> },
      { href: "/services/defi-development", title: "DeFi Development", description: "Financial solutions without intermediaries.", icon: <FaBitcoin /> },
      { href: "/services/token-development", title: "Token Development", description: "Custom tokens for your ecosystem.", icon: <FaBitcoin /> },
    ],
  },
  {
    id: "Aimltab",
    icon: <FaRobot />,
    heading: "AI & ML Development",
    pageHref: "/services/ai-ml",
    title: "Top AI & ML Development Company",
    description: "Intelligent solutions that help businesses automate, predict, and make smarter decisions.",
    links: [
      { href: "/services/ai-development", title: "AI Development", description: "Smarter systems that adapt to your needs.", icon: <FaRobot /> },
      { href: "/services/machine-learning-development", title: "Machine Learning Development", description: "Predictive models for better insights.", icon: <FaBrain /> },
      { href: "/services/chatbot-development", title: "Chatbot Development", description: "Interactive bots that improve support.", icon: <FaComments /> },
      { href: "/services/predictive-analytics", title: "Predictive Analytics", description: "Data-driven forecasts for smarter choices.", icon: <FaChartLine /> },
      { href: "/services/computer-vision", title: "Computer Vision", description: "Visual AI to understand images and videos.", icon: <FaCamera /> },
      { href: "/services/recommendation-engine-development", title: "Recommendation Engine Development", description: "Personalized suggestions your users love.", icon: <FaBrain /> },
    ],
  },
  {
    id: "iottab",
    icon: <FaMicrochip />,
    heading: "IoT & Embedded Development",
    pageHref: "/services/iot-embedded",
    title: "Top IoT & Embedded Development Company",
    description: "Smart IoT and embedded services that connect devices, simplify processes, and drive value.",
    links: [
      { href: "/services/iot-app-development", title: "IoT App Development", description: "Apps that connect devices seamlessly.", icon: <FaMobileAlt /> },
      { href: "/services/embedded-software-development", title: "Embedded Software Development", description: "Reliable software for smart devices.", icon: <FaChip /> },
      { href: "/services/iiot", title: "Industrial IoT (IIoT)", description: "Optimize industrial operations efficiently.", icon: <FaMicrochip /> },
      { href: "/services/device-integration", title: "Device Integration", description: "Connect all your devices smoothly.", icon: <FaTools /> },
      { href: "/services/home-automation", title: "Home Automation", description: "Make homes smarter and intuitive.", icon: <FaRegFileCode /> },
      { href: "/services/aiot-app-development", title: "AIoT App Development", description: "Intelligent apps combining AI & IoT.", icon: <FaRobot /> },
    ],
  },
  {
    id: "DevOpstab",
    icon: <FaCogs />,
    heading: "DevOps & Cloud Engineering",
    pageHref: "/services/devops-cloud",
    title: "Top DevOps & Cloud Engineering Company",
    description: "Reliable DevOps and cloud services that optimize operations, improve performance, and scale with your business.",
    links: [
      { href: "/services/cloud-migration", title: "Cloud Migration", description: "Move workloads smoothly to the cloud.", icon: <FaCloud /> },
      { href: "/services/devops-automation", title: "DevOps Automation", description: "Automate processes for faster delivery.", icon: <FaCogs /> },
      { href: "/services/ci-cd-pipeline", title: "CI/CD Pipeline", description: "Streamlined code delivery and updates.", icon: <FaCogs /> },
      { href: "/services/cloud-management", title: "Cloud Management", description: "Monitor and manage cloud systems easily.", icon: <FaCloud /> },
      { href: "/services/containerization", title: "Containerization", description: "Package apps for consistent deployment.", icon: <FaRegFileCode /> },
      { href: "/services/server-security-optimization", title: "Server Security Optimization", description: "Keep servers safe and high-performing.", icon: <FaServer /> },
    ],
  },
  {
    id: "digital",
    icon: <FaCogs />,
    heading: "Digital Marketing",
    pageHref: "/services/digital-marketing",
    title: "Top Digital Marketing Company",
    description: "Services that grow your brand, attract the right customers, and boost your online visibility and engagement.",
    links: [
      { href: "/services/seo-services", title: "SEO Services", description: "Get found by the right audience.", icon: <FaSearch /> },
      { href: "/services/paid-marketing", title: "Paid Marketing", description: "Ads that reach and convert customers.", icon: <FaBullseye /> },
      { href: "/services/online-reputation-management", title: "Online Reputation Management", description: "Keep your brand trusted and credible.", icon: <FaEye /> },
      { href: "/services/app-marketing", title: "App Marketing", description: "Promote apps to the right users.", icon: <FaMobileAlt /> },
      { href: "/services/content-marketing", title: "Content Marketing", description: "Engaging content that drives results.", icon: <FaRegFileCode /> },
      { href: "/services/social-media-marketing", title: "Social Media Marketing", description: "Connect with customers on every platform.", icon: <FaComments /> },
    ],
  },
];

const ServicesMenu = () => {
  const [activeTab, setActiveTab] = useState("Overviewtab");
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
                      className="group flex flex-col items-center gap-3 p-3 rounded-xl border border-sky-100 bg-white hover:bg-sky-50 hover:border-sky-200 transition shadow-lg hover:shadow-md h-full"
                    >
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-sky-600/90 text-white text-sm shadow-sm mb-1">
                        {link.icon ?? <FaRegFileCode />}
                      </div>
                      <div className="flex flex-col text-center">
                        <ResourceItem
                          {...link}
                          activeTab={activeSubTab}
                          handleTabChange={handleTabChange}
                        />
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
    </div>
  );
};

export default ServicesMenu;
