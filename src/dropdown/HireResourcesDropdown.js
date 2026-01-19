import Link from "next/link";
import { useState } from "react";

import RecoAward from "./RecognitionSection";

import {
  FaMobileAlt,
  FaReact,
  FaServer,
  FaShoppingCart,
  FaUserTie,
  FaArrowRight,
  FaRegIdCard,
  FaAndroid,
  FaApple,
  FaLaravel,
  FaNodeJs,
  FaPython,
  FaPhp,
  FaAngular,
  FaVuejs,
  FaDesktop,
  FaShopify,
  FaWordpress,
  FaDatabase,
  FaCloud,
  FaUserCog,
  FaBullseye,
  FaDatabase as FaDb,
  FaRobot,
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
        className={`font-semibold text-[12px] ${
          activeTab === title ? "text-sky-700" : "text-sky-900"
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

const tabs = [
  // 1) App developers
  {
    id: "hireapptab",
    icon: <FaMobileAlt className="inline-block text-sky-600" />,
    title: "Hire App Developers",
    href: "/hire/app-developer",
    description:
      "On the lookout for a coding wizard? Hire mobile app developers to build high‑performance Android, iOS and cross‑platform apps.",
    links: [
      {
        href: "/hire/android-developer",
        title: "Hire Android Developers",
        icon: <FaAndroid />,
      },
      {
        href: "/hire/ios-developer",
        title: "Hire iOS Developers",
        icon: <FaApple />,
      },
      {
        href: "/hire/iphone-app-developer",
        title: "Hire iPhone App Developers",
        icon: <FaApple />,
      },
      {
        href: "/hire/ipad-developer",
        title: "Hire iPad Developers",
        icon: <FaApple />,
      },
      {
        href: "/hire/flutter-developer",
        title: "Hire Flutter Developers",
        icon: <FaReact />,
      },
      {
        href: "/hire/react-native-developer",
        title: "Hire React Native Developers",
        icon: <FaReact />,
      },
    ],
  },

  // 2) Frontend
  {
    id: "hirefronttab",
    icon: <FaDesktop className="inline-block text-sky-600" />,
    title: "Hire Frontend Developers",
    href: "/hire/frontend-developer",
    description:
      "Curate pixel‑perfect experiences with frontend engineers who ship fast, responsive and accessible UIs.",
    links: [
      {
        href: "/hire/angular-developer",
        title: "Hire Angular Developers",
        icon: <FaAngular />,
      },
      {
        href: "/hire/reactjs-developer",
        title: "Hire ReactJS Developers",
        icon: <FaReact />,
      },
      {
        href: "/hire/vuejs-developer",
        title: "Hire Vue.js Developers",
        icon: <FaVuejs />,
      },
      {
        href: "/hire/web-app-developer",
        title: "Hire Web App Developers",
        icon: <FaDesktop />,
      },
    ],
  },

  // 3) Backend
  {
    id: "hirebackendtab",
    icon: <FaServer className="inline-block text-sky-600" />,
    title: "Hire Backend Developers",
    href: "/hire/backend-developer",
    description:
      "Hire backend developers who design reliable APIs, data models and cloud architectures for scale.",
    links: [
      {
        href: "/hire/java-developer",
        title: "Hire Java Developers",
        icon: <FaServer />,
      },
    
      {
        href: "/hire/nodejs-developer",
        title: "Hire Node.js Developers",
        icon: <FaNodeJs />,
      },
      {
        href: "/hire/python-developer",
        title: "Hire Python Developers",
        icon: <FaPython />,
      },
      {
        href: "/hire/php-developer",
        title: "Hire PHP Developers",
        icon: <FaPhp />,
      },
        {
        href: "/hire/laravel-developer",
        title: "Hire Laravel Developers",
        icon: <FaLaravel />,
      },
        {
        href: "/hire/Django-developer",
        title: "Hire Django Developers",
        icon: <FaPython />,
      },
    ],
  },

  // 4) Full‑Stack
  {
    id: "hirefullstacktab",
    icon: <FaReact className="inline-block text-sky-600" />,
    title: "Hire Full‑Stack Developers",
    href: "/hire/full-stack-developer",
    description:
      "Ship end‑to‑end features faster with full‑stack developers who can own frontend, backend and integrations.",
    links: [
      {
        href: "/hire/mern-developer",
        title: "Hire MERN Stack Developers",
        icon: <FaReact />,
      },
      {
        href: "/hire/mean-developer",
        title: "Hire NextJs Developers",
        icon: <FaAngular />,
      },
      {
        href: "/hire/laravel-vue-developer",
        title: "Hire Laravel + Vue Developers",
        icon: <FaLaravel />,
      },
      {
        href: "/hire/react-node-developer",
        title: "Hire React + Django Developers",
        icon: <FaPython />,
      },
    ],
  },

  // 5) eCommerce
  {
    id: "hireecommercetab",
    icon: <FaShoppingCart className="inline-block text-sky-600" />,
    title: "Hire eCommerce Developers",
    href: "/hire/ecommerce-developer",
    description:
      "Hire eCommerce experts to build conversion‑focused, secure and scalable online stores.",
    links: [
      {
        href: "/hire/magento-developer",
        title: "Hire Magento Developers",
        icon: <FaShoppingCart />,
      },
      {
        href: "/hire/wordpress-developer",
        title: "Hire WordPress Developers",
        icon: <FaWordpress />,
      },
      {
        href: "/hire/woocommerce-developer",
        title: "Hire WooCommerce Developers",
        icon: <FaShoppingCart />,
      },
      {
        href: "/hire/shopify-developer",
        title: "Hire Shopify Developers",
        icon: <FaShopify />,
      },
    ],
  },

  // 6) Dedicated / Specialist pod
  {
    id: "hireothertab",
    icon: <FaUserTie className="inline-block text-sky-600" />,
    title: "Hire Dedicated Experts",
    href: "/hire/dedicated-developer",
    description:
      "Build a long‑term pod of dedicated experts across architecture, cloud, data, QA and product.",
    links: [
      {
        href: "/hire/solution-architects",
        title: "Hire Solution Architects",
        icon: <FaUserCog />,
      },
      {
        href: "/hire/devops-engineers",
        title: "Hire DevOps Engineers",
        icon: <FaCloud />,
      },
      // {
      //   href: "/hire/dedicated-developer/database-engineers",
      //   title: "Hire Database Engineers",
      //   icon: <FaDb />,
      // },
      {
        href: "/hire/qa-testers",
        title: "Hire QA & Testers",
        icon: <FaBullseye />,
      },
      {
        href: "/hire/ml-engineers",
        title: "Hire AI & ML Engineers",
        icon: <FaRobot />,
      },
      {
        href: "/hire/software-developer",
        title: "Hire Software Developers",
        icon: <FaRegIdCard />,
      },
      {
        href: "/hire/ui-ux-designers",
        title: "Hire UI/UX Designers",
        icon: <FaUserTie />,
      },
    ],
  },
];

const HireResourcesDropdown = () => {
  const [activeTab, setActiveTab] = useState("hireapptab");
  const [activeSubTab, setActiveSubTab] = useState(null);

  const activeTabData = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  const handleTabChange = (tabId) => setActiveTab(tabId);
  const handleSubTabChange = (title) => setActiveSubTab(title);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 mt-16">
      <div className="absolute inset-0 max-w-7xl mx-auto px-4">
        <div className="relative bg-white max-w-[90rem] w-full h-[80vh] max-h-[40rem] rounded-b-2xl shadow-md overflow-hidden z-10">
          <div className="w-full h-full flex">
            {/* Left Sidebar – same style as Services */}
            <div className="flex-[1.5] bg-[#fcfcfc] border-r border-sky-200 text-left p-6 space-y-2">
              {tabs.map((tab) => (
                <div key={tab.id} className="cursor-pointer mb-1">
                  <h3
                    onMouseEnter={() => handleTabChange(tab.id)}
                    className={`m-1 px-3 py-2 rounded flex items-center justify-between text-sm transition
                      ${
                        activeTab === tab.id
                          ? "text-sky-600 bg-sky-50 font-semibold"
                          : "text-slate-800 hover:bg-sky-50"
                      }`}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <span className="header_menu_tab_ic">{tab.icon}</span>
                      <span>{tab.title}</span>
                    </div>
                    <span
                      className={`text-[0.85rem] ${
                        activeTab === tab.id ? "text-sky-500" : "hidden"
                      }`}
                    >
                      <FaArrowRight />
                    </span>
                  </h3>
                </div>
              ))}
            </div>

            {/* Center Content – title as hover link with arrow */}
            <div className="flex-[3] flex flex-col justify-between h-full w-2/4 overflow-hidden">
              <div className="text-left mt-8 md:mt-0 m-5 p-8 max_height">
                {/* Heading link + hover arrow similar to Services */}
                <div className="flex items-center gap-2 mb-3 group">
                  <Link
                    href={activeTabData.href}
                    className="text-xl md:text-2xl font-semibold text-sky-900 group-hover:text-sky-700 transition-colors"
                  >
                    {activeTabData.title}
                  </Link>
                  <FaArrowRight className="text-sky-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-sm" />
                </div>

                <p className="text-[15px] leading-[28px] text-sky-900 mt-1 mb-4">
                  {activeTabData.description}
                </p>

                {/* Sub‑services grid */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeTabData.links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="group flex items-center gap-3 p-3 rounded-xl border border-sky-100 bg-white hover:bg-sky-50 hover:border-sky-200 transition shadow-lg hover:shadow-md flex-col  "
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-600 text-white text-xs shadow-sm">
                        {link.icon ?? <FaRegIdCard />}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-[13px] text-sky-900 group-hover:text-sky-700">
                          <ResourceItem
                            {...link}
                            activeTab={activeSubTab}
                            handleTabChange={handleSubTabChange}
                          />
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Dedicated{" "}
                          {link.title.replace("Hire ", "").toLowerCase()}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="h-[7rem] w-full hidden" />
            </div>

            {/* Right Sidebar – improved “hire” card */}
            <div className="hidden xl:block w-1/4 h-full bg-white">
              <div className="h-full w-full border-l border-sky-100 bg-gradient-to-b from-sky-50 via-sky-100 to-sky-200 px-6 py-8 flex items-center">
                <div className="bg-white/90 border border-sky-100 rounded-3xl p-5 flex flex-col justify-between h-full max-h-[500px] w-full shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                  <div>
                    <p className="text-[11px] tracking-[0.24em] uppercase text-sky-500">
                      Hire Talent
                    </p>

                    {/* top image + badge */}
                    <div className="my-4">
                    <div className="mb-4 px-3 py-1 rounded-full bg-sky-100 text-[10px] font-semibold text-sky-800 shadow-sm">
                          48 hrs – profiles on your desk
                        </div>
                      <div className="border border-sky-100 rounded-xl overflow-hidden">
                        <img
                          src="/images/hire/hire.png"
                          alt="Hire Dedicated Talent"
                          className="w-full object-cover"
                        />
                       
                      </div>
                       
                    </div>

                    <h2 className="text-sm text-slate-900 font-semibold">
                      Talk to our hiring expert
                    </h2>
                    <p className="mt-2 text-[12px] text-slate-700 leading-relaxed">
                      Share your stack, budget and timelines. We match you with
                      pre‑vetted engineers within a couple of business days.
                    </p>

                    <ul className="mt-3 space-y-1.5 text-[12px] text-slate-700">
                      <li>• Handpicked profiles aligned with your stack</li>
                      <li>• Flexible models: full‑time, part‑time or squads</li>
                      <li>• Simple contracts and smooth onboarding</li>
                    </ul>
                  </div>

                  <Link
                    href="/contact/hire-developer"
                    className="mt-4 px-4 md:px-6 py-2 rounded-full bg-sky-600 text-white text-[11px] font-semibold shadow-[0_10px_24px_rgba(15,23,42,0.18)] hover:bg-sky-500 transition-colors flex items-center justify-center gap-2 w-full"
                  >
                    Discuss Your Requirements
                    <FaArrowRight className="text-sx" />
                  </Link>
                </div>
              </div>
            </div>
            {/* Right sidebar end */}
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

export default HireResourcesDropdown;
