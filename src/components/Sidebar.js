import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Slogo from "../../public/images/softkingo-logo.png";
import { MdArrowBackIos } from "react-icons/md";
import { FaChevronRight, FaIndustry } from "react-icons/fa";
import { FaFacebook, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { TbBeta } from "react-icons/tb";

// Single Fa Icons import - ALL unique icons
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
  FaUserTie,
  FaArrowRight,
  FaRegIdCard,
  FaNodeJs,
  FaPython,
  FaPhp,
  FaAngular,
  FaVuejs,
  FaUserCog,
  FaDb,

} from "react-icons/fa";
import {
  FaDumbbell,
  FaFilm,

  FaUsers,
  FaHammer,
  FaCalendarAlt,
  FaVrCardboard,
  FaShoppingBag,
  FaTaxi,
  FaHome,
  FaSpa,
  FaUserGraduate,
  FaWrench,
  FaCarSide,
  FaIndustry as FaFactory,
  FaCoins,

  FaCube,
} from "react-icons/fa";
import {
  FaHeartbeat,
  FaGraduationCap,
  FaDollarSign,
  FaStore,
  FaBuilding,
  FaPlane,
  FaUtensils,
  FaTruck,
  FaCar,
  // NEW Clone App Icons
  FaCopy,
 
  FaBriefcase,
  FaBed,
  FaHeart,
  
  FaQuestionCircle,
  FaMusic,
  FaSpotify,
  FaCameraRetro,
} from "react-icons/fa";

const SideBar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [subMenuOpen, setSubMenuOpen] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
    setSubMenuOpen(null);
  };

  const toggleSubMenu = (subMenu, menu) => {
    setSubMenuOpen((prev) => (prev === subMenu ? null : subMenu));
    setOpenMenu(menu);
  };
  // ...................
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
      heading: "Degital Marketing",
      pageHref: "/services/degital-marketing",
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
  const ServicesMenuItems = [
    { heading: "Mobile App Development", id: "mobileApp", pageHref: "/services/mobile-app-development", links: servicesData[0].links },
    { heading: "Web & CMS Development", id: "webCMS", pageHref: "/services/web-development", links: servicesData[1].links },
    { heading: "eCommerce Development", id: "ecommerce", pageHref: "/services/ecommerce-development", links: servicesData[2].links },
    { heading: "Blockchain Development", id: "blockchain", pageHref: "/services/blockchain-development", links: servicesData[3].links },
    { heading: "AI & ML Services", id: "aiML", pageHref: "/services/ai-ml", links: servicesData[4].links },
    { heading: "IoT & Embedded", id: "iot", pageHref: "/services/iot-embedded", links: servicesData[5].links },
    { heading: "DevOps & Cloud", id: "devops", pageHref: "/services/devops-cloud", links: servicesData[6].links },
    { heading: "Digital Marketing", id: "digital", pageHref: "/services/degital-marketing", links: servicesData[7].links }
  ];







  const tabs = [
    // 1) App developers
    {
      id: "hireapptab",
      icon: <FaMobileAlt className="inline-block text-sky-600" />,
      title: "Hire App Developers",
      href: "/hire/app-developers",
      description:
        "On the lookout for a coding wizard? Hire mobile app developers to build high‑performance Android, iOS and cross‑platform apps.",
      links: [
        {
          href: "/hire/android-developers",
          title: "Hire Android Developers",
          icon: <FaAndroid />,
        },
        {
          href: "/hire/ios-developers",
          title: "Hire iOS Developers",
          icon: <FaApple />,
        },
        {
          href: "/hire/iphone-app-developers",
          title: "Hire iPhone App Developers",
          icon: <FaApple />,
        },
        {
          href: "/hire/ipad-developers",
          title: "Hire iPad Developers",
          icon: <FaApple />,
        },
        {
          href: "/hire/flutter-developers",
          title: "Hire Flutter Developers",
          icon: <FaReact />,
        },
        {
          href: "/hire/react-native-developers",
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
      href: "/hire/frontend-developers",
      description:
        "Curate pixel‑perfect experiences with frontend engineers who ship fast, responsive and accessible UIs.",
      links: [
        {
          href: "/hire/angular-developers",
          title: "Hire Angular Developers",
          icon: <FaAngular />,
        },
        {
          href: "/hire/reactjs-developers",
          title: "Hire ReactJS Developers",
          icon: <FaReact />,
        },
        {
          href: "/hire/vuejs-developers",
          title: "Hire Vue.js Developers",
          icon: <FaVuejs />,
        },
        {
          href: "/hire/web-app-developers",
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
      href: "/hire/backend-developers",
      description:
        "Hire backend developers who design reliable APIs, data models and cloud architectures for scale.",
      links: [
        {
          href: "/hire/java-developers",
          title: "Hire Java Developers",
          icon: <FaServer />,
        },

        {
          href: "/hire/nodejs-developers",
          title: "Hire Node.js Developers",
          icon: <FaNodeJs />,
        },
        {
          href: "/hire/python-developers",
          title: "Hire Python Developers",
          icon: <FaPython />,
        },
        {
          href: "/hire/php-developers",
          title: "Hire PHP Developers",
          icon: <FaPhp />,
        },
        {
          href: "/hire/laravel-developers",
          title: "Hire Laravel Developers",
          icon: <FaLaravel />,
        },
        {
          href: "/hire/Django-developers",
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
      href: "/hire/full-stack-developers",
      description:
        "Ship end‑to‑end features faster with full‑stack developers who can own frontend, backend and integrations.",
      links: [
        {
          href: "/hire/mern-developers",
          title: "Hire MERN Stack Developers",
          icon: <FaReact />,
        },
        {
          href: "/hire/mean-developers",
          title: "Hire NextJs Developers",
          icon: <FaAngular />,
        },
        {
          href: "/hire/laravel-vue-developers",
          title: "Hire Laravel + Vue Developers",
          icon: <FaLaravel />,
        },
        {
          href: "/hire/react-node-developers",
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
      href: "/hire/ecommerce-developers",
      description:
        "Hire eCommerce experts to build conversion‑focused, secure and scalable online stores.",
      links: [
        {
          href: "/hire/magento-developers",
          title: "Hire Magento Developers",
          icon: <FaShoppingCart />,
        },
        {
          href: "/hire/wordpress-developers",
          title: "Hire WordPress Developers",
          icon: <FaWordpress />,
        },
        {
          href: "/hire/woocommerce-developers",
          title: "Hire WooCommerce Developers",
          icon: <FaShoppingCart />,
        },
        {
          href: "/hire/shopify-developers",
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
      href: "/hire/dedicated-developers",
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
        //   href: "/hire/dedicated-developers/database-engineers",
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
          href: "/hire/software-developers",
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

  // Hire Menu Items Array (from your tabs data)
  const HireMenuItems = [
    { id: "hireApp", title: "Hire App Developers", href: "/hire/app-developers", links: tabs[0].links },
    { id: "hireFrontend", title: "Hire Frontend Developers", href: "/hire/frontend-developers", links: tabs[1].links },
    { id: "hireBackend", title: "Hire Backend Developers", href: "/hire/backend-developers", links: tabs[2].links },
    { id: "hireFullstack", title: "Hire Full-Stack Developers", href: "/hire/full-stack-developers", links: tabs[3].links },
    { id: "hireEcommerce", title: "Hire eCommerce Developers", href: "/hire/ecommerce-developers", links: tabs[4].links },
    { id: "hireDedicated", title: "Hire Dedicated Experts", href: "/hire/dedicated-developers", links: tabs[5].links }
  ];

  const industriestabs = [
    // ✅ INDUSTRIES (main link: /industries)
     {
           id: "industry",
           title: "Industry",
           heading: "Industry‑Specific Solutions",
           icon: <FaIndustry className="inline-block text-sky-600" />,
     
           href: "/industries",
           description:
             "We build tailored digital products for high‑impact industries like education, healthcare, finance and retail, aligned with domain workflows.",
           items: [
             { title: "Healthcare", href: "/industries/healthcare", icon: <FaHeartbeat /> },
             { title: "Education / E-Learning", href: "/industries/education", icon: <FaGraduationCap /> },
             { title: "Real Estate", href: "/industries/real-estate", icon: <FaBuilding /> },
             { title: "Travel & Tourism", href: "/industries/travel", icon: <FaPlane /> },
             { title: "Food & Restaurant", href: "/industries/restaurant", icon: <FaUtensils /> },
             { title: "Fitness & Wellness", href: "/industries/fitness", icon: <FaDumbbell /> },
             { title: "Retail & E-Commerce", href: "/industries/retail", icon: <FaStore /> },
     
             { title: "Logistics/Transportation", href: "/industries/logistics", icon: <FaTruck /> },
     
             // URL missing in your list -> fallback
             { title: "Media & Entertainment", href: "/industries/entertainment", icon: <FaFilm /> },
     
             { title: "Social Networking", href: "/industries/social-media", icon: <FaUsers /> },
             { title: "Finance / FinTech", href: "/industries/fintech", icon: <FaDollarSign /> },
             { title: "Automotive", href: "/industries/automotive", icon: <FaCar /> },
             { title: "Construction", href: "/industries/construction", icon: <FaHammer /> },
             { title: "Manufacturing", href: "/industries/manufacturing", icon: <FaFactory /> },
             { title: "Sports", href: "/industries/sports", icon: <FaCalendarAlt /> },
            
           ],
         },
    

  ];
  const solutionsArray = [
     // ✅ INDUSTRIES (main link: /industries)
         {
              id: "industry",
              title: "Industry‑Specific Solutions",
          heading: "Industry‑Specific Solutions",
              icon: <FaIndustry className="inline-block text-sky-600" />,
        
              href: "/industries",
               description:
                "We build tailored digital products for high‑impact industries like education, healthcare, finance and retail, aligned with domain workflows.",
              items: [
                { title: "Healthcare", href: "/solutions/healthcare-app-development", icon: <FaHeartbeat /> },
                { title: "Education / E-Learning", href: "/solutions/elearning-app-development", icon: <FaGraduationCap /> },
                { title: "Real Estate", href: "/solutions/real-estate-app-development", icon: <FaBuilding /> },
                { title: "Travel & Tourism", href: "/solutions/travel-app-development", icon: <FaPlane /> },
                { title: "Food & Restaurant", href: "/solutions/food-delivery-app-development", icon: <FaUtensils /> },
                { title: "Fitness & Wellness", href: "/solutions/fitness-app-development", icon: <FaDumbbell /> },
                { title: "Retail & E-Commerce", href: "/solutions/ecommerce-app-development", icon: <FaStore /> },
        
                { title: "Logistics/Transportation", href: "/solutions/logistics-app-development", icon: <FaTruck /> },
        
                // URL missing in your list -> fallback
                { title: "Media & Entertainment", href: "/solutions/media", icon: <FaFilm /> },
        
                { title: "Social Networking", href: "/solutions/social-media-app-development", icon: <FaUsers /> },
                { title: "Finance / FinTech", href: "/solutions/fintech-app-development", icon: <FaDollarSign /> },
                { title: "Automotive", href: "/solutions/automotive-app-development", icon: <FaCar /> },
                { title: "Construction", href: "/solutions/construction-management-app-development", icon: <FaHammer /> },
                { title: "Manufacturing", href: "/solutions/manufacturing-app-development", icon: <FaFactory /> },
                { title: "Event Management", href: "/solutions/event-management-app-development", icon: <FaCalendarAlt /> },
                // { title: "AR/VR", href: "/solutions/ar-vr-app-development", icon: <FaVrCardboard /> },
                { title: "Dating App", href: "/solutions/dating-app-development", icon: <FaUsers /> },
                { title: "Astrology App", href: "/solutions/astrology-app-development", icon: <FaUsers /> },
                { title: "Legal App", href: "/solutions/legal-app-development", icon: <FaUsers /> },
              ],
            },
        
    // ✅ ON DEMAND (main link: /solutions)
    {
      id: "ondemand",
      title: "On‑Demand Solutions",
      icon: <FaTruck className="inline-block text-sky-600" />,
      heading: "On‑Demand & Real‑Time Solutions",
      href: "/solutions",
      description:
        "Design on‑demand platforms for delivery, mobility and home services with real‑time tracking and optimized dispatch.",
      items: [
        { title: "Food Delivery", href: "/solutions/food-delivery-app-development", icon: <FaUtensils /> },
        { title: "Grocery Delivery", href: "/solutions/grocery-delivery-app-development", icon: <FaShoppingBag /> },
        { title: "Pickup & Delivery", href: "/solutions/pickup-and-delivery-service-app-development", icon: <FaTruck /> },
        { title: "Taxi Booking", href: "/solutions/taxi-app-development-services", icon: <FaTaxi /> },
        { title: "Fitness Trainer App", href: "/solutions/fitness-trainer-app-development", icon: <FaDumbbell /> },
        { title: "Home Services", href: "/solutions/on-demand-home-service-app-development", icon: <FaHome /> },
        { title: "Beauty & Salon Booking", href: "/solutions/salon-app-development", icon: <FaSpa /> },
        { title: "Doctor & Medical App", href: "/solutions/ice-cream-delivery-app-development", icon: <FaHeartbeat /> },
        { title: "Laundry Service", href: "/solutions/laundry-app-development", icon: <FaShoppingBag /> },
        { title: "Restaurant management", href: "/solutions/restaurant-app-development", icon: <FaUtensils /> },
         { title: "Pet Care App", href: "/solutions/pet-care-app-development", icon: <FaUsers /> },
        { title: "Carpooling Apps", href: "/solutions/ride-sharing-app-development", icon: <FaCarSide /> },
        { title: "Tutor App", href: "/solutions/tutor-app-development", icon: <FaUserGraduate /> },
        { title: "Mechanics & Repair App", href: "/solutions/mechanic-app-development", icon: <FaWrench /> },
        { title: "Car Wash App", href: "/solutions/car-wash-app-development", icon: <FaCarSide /> },
      ],
    },

      // CLONE APPS (NEW)
      {
        id: "cloneapps",
        title: "Clone App Solutions",
        icon: <FaCopy className="inline-block text-sky-600" />,
        heading: "Ready-made Clone App Solutions",
        href: "/solutions",
        description: "Proven clone app solutions for rapid market entry - Zomato, Uber, Airbnb clones with full source code, admin panels and multi-platform deployment.",
        items: [
          { title: "Amazon Clone", href: "/solutions/amazon-clone-app-development", icon: <FaShoppingCart /> },
          { title: "Zomato Clone", href: "/solutions/zomato-clone-app-development", icon: <FaUtensils /> },
          { title: "Uber Clone", href: "/solutions/uber-clone-app-development", icon: <FaCar /> },
          { title: "Naukri Clone", href: "/solutions/naukri-clone-app-development", icon: <FaBriefcase /> },
          { title: "Udemy Clone", href: "/solutions/udemy-clone-app-development", icon: <FaGraduationCap /> },
          { title: "Oyo Clone", href: "/solutions/oyo-clone-app-development", icon: <FaBed /> },
          { title: "Bigbasket Clone", href: "/solutions/bigbasket-clone-app-development", icon: <FaShoppingBag /> },
          { title: "Urban Company", href: "/solutions/urban-company-clone-app-development", icon: <FaHome /> },
          { title: "Tinder Clone", href: "/solutions/tinder-clone-app-development", icon: <FaHeart /> },
          { title: "Instagram Clone", href: "/solutions/instagram-clone-app-development", icon: <FaCamera /> },
          { title: "Quora Clone", href: "/solutions/quora-clone-app-development", icon: <FaQuestionCircle /> },
          { title: "Soundcloud Clone", href: "/solutions/soundcloud-clone-app-development", icon: <FaMusic /> },
          { title: "Spotify Clone", href: "/solutions/spotify-clone-app-development", icon: <FaSpotify /> },
          { title: "Ghost Lens Clone", href: "/solutions/ghost-lens-clone-app-development", icon: <FaCameraRetro /> },
          { title: "Olx/Airbnb Clone", href: "/solutions/olx-clone-app-development", icon: <FaHome /> },
        ],
      },
    // ✅ BUSINESS MODEL (main link: /solutions)
    {
      id: "businessmodel",
      title: "Business‑Model Solutions",
      icon: <FaProjectDiagram className="inline-block text-sky-600" />,
      heading: "Business‑Model Based Solutions",
      href: "/solutions",
      description:
        "Launch subscription, freemium, on‑demand or marketplace products with billing, entitlements and reporting built‑in.",
      items: [
        { title: "Marketplace App", href: "/solutions/marketplace-app-development", icon: <FaStore /> },
        { title: "Subscription Software", href: "/solutions/subscription-platform-development", icon: <FaCoins /> },
        { title: "B2B Commerce", href: "/solutions/b2b-ecommerce-development", icon: <FaStore /> },
        { title: "SaaS Product Development", href: "/solutions/saas-product-development", icon: <FaCloud /> },
        { title: "CRM Software", href: "/solutions/crm-software-development", icon: <FaProjectDiagram /> },
        { title: "ERP Software", href: "/solutions/erp-software-development", icon: <FaProjectDiagram /> },
        { title: "Booking System", href: "/solutions/online-booking-system-development", icon: <FaCalendarAlt /> },
        { title: "Membership / Loyalty", href: "/solutions/loyalty-membership-platform", icon: <FaCoins /> },
        { title: "HR Management", href: "/solutions/hr-software-development", icon: <FaUsers /> },
        { title: "Inventory Management", href: "/solutions/inventory-management-software", icon: <FaStore /> },
      ],
    },

    // ✅ TECHNOLOGY (main link: /solutions)
    // {
    //   id: "technology",
    //   title: "Technology‑Based Solutions",
    //   icon: <FaMicrochip className="inline-block text-sky-600" />,
    //   heading: "Technology‑Based Solutions",
    //   href: "/solutions",
    //   description: "Cutting-edge technology solutions including AI/ML, blockchain, IoT and AR/VR for innovative products.",
    //   items: [
    //     { title: "AI/ML Solutions", href: "/solutions/ai-ml-development", icon: <FaRobot /> },
    //     { title: "Chatbot Development", href: "/solutions/chatbot-development", icon: <FaComments /> },
    //     { title: "IoT App Development", href: "/solutions/iot-app-development", icon: <FaMicrochip /> },
    //     { title: "Blockchain Solutions", href: "/solutions/blockchain-development", icon: <FaCube /> },
    //     { title: "Cloud & DevOps", href: "/solutions/cloud-devops-services", icon: <FaCloud /> },
    //     { title: "AR/VR", href: "/solutions/ar-vr-app-development", icon: <FaVrCardboard /> },
    //   ],
    // },
   
    
    
  ];

  const SolutionsMenuItems = [
    {
      id: "industry",
      title: "Industry‑Specific Solutions",
      href: "/solutions",
      items: solutionsArray[0].items
    },
    
    {
      id: "ondemand",
      title: "On-Demand Solutions",
      href: "/solutions",
      items: solutionsArray[1].items
    },
    {
      id: "cloneapps",
      title: "Clone App Solutions",
      href: "/solutions",
      items: solutionsArray[2].items
    },
    {
      id: "businessmodel",
      title: "Business-Model Solutions",
      href: "/solutions",
      items: solutionsArray[3].items
    },
    {
      id: "technology",
      title: "Technology-Based Solutions",
      href: "/solutions",
      items: solutionsArray[4].items
    },
     
     
  ];

  const insightItems = [
    {
      key: "blogs",
      href: "/blog",
      title: "Latest Blogs",
      description:
        "Unpack the latest tech trends, opinions best practices from our experts.",
      meta: "Weekly updates · Product, design & engineering",
    },
    {
      key: "featured",
      href: "/featured",
      title: "Featured Blog",
      description:
        "Handpicked stories that go deep into product strategy, UX and complex builds.",
      meta: "Curated picks · Long reads",
    },
    {
      key: "eguides",
      href: "/e-guides",
      title: "E‑Guides",
      description:
        "Step‑by‑step playbooks to plan, build and scale web and mobile products.",
      meta: "Downloadable PDFs · Frameworks & checklists",
    },
    {
      key: "pressrelease",
      href: "/press-releases",
      title: "Press Releases",
      description:
        "Stay updated with our latest launches, partnerships and milestones.",
      meta: "Company news · Launches",
    },
    {
      key: "guides",
      href: "/guides",
      title: "Product Guides",
      description:
        "Feature breakdowns and how‑to guides for stakeholders across product and tech.",
      meta: "Visual walkthroughs · 5–8 min reads",
    },
    {
      key: "media",
      href: "/media-coverage",
      title: "Media Coverage",
      description:
        "Read what global media and industry platforms are saying about our work.",
      meta: "Interviews · Feature stories",
    },
    {
      key: "articles",
      href: "/articles",
      title: "Articles",
      description:
        "In‑depth articles on cloud, AI, app architecture, performance and more.",
      meta: "Technical & business · 6–10 min reads",
    },
    {
      key: "whitepapers",
      href: "/whitepapers",
      title: "Whitepapers",
      description:
        "Research‑backed documents on emerging tech and enterprise adoption.",
      meta: "Downloadable · Data‑driven insights",
    },
    {
      key: "podcast",
      href: "/podcasts",
      title: "Podcasts",
      description:
        "Conversations with founders, CTOs and leaders on building and scaling products.",
      meta: "Audio · On‑the‑go learning",
    },
  ];

  // ..............



  return (
    <nav className="sidebar z-50 ">
      <ul className="sidebar-menu">
        {/* About Us Section */}
        <li
          className={`left ${openMenu === "about" ||
              openMenu === "services" ||
              openMenu === "hireResources" ||
              openMenu === "solutions" ||
              openMenu === "industries" ||
              openMenu === "resources"
              ? "active"
              : ""
            }`}
        >
 {/* logo */}
              <li className="menu-item flex items-center space-x-4">
                <Link href="/" className="menu-link ">
                  <Image
                    alt="Softkingo"
                    src={Slogo.src}
                    height={58}
                    width={161}
                    className="w-[8rem] md:w-[9rem] lg:w-[14rem]"
                  />
                </Link>
              </li>
          {/* Updated About Us Section - Sidebar */}
          <li className="menu-item">
            <div
              style={{ display: "flex" }}
              className="menu-link items-center justify-between w-full cursor-pointer"
              onClick={() => toggleMenu("about")}
            >
              <p>About Us</p>
              <FaChevronRight />
            </div>
            <ul className={`submenu ${openMenu === "about" ? "active" : ""}`}>
              <li className="submenu-item cursor-pointer" onClick={() => toggleMenu("")}>
                <span className="flex items-center">
                  <MdArrowBackIos />
                  <span className="ml-2">Back</span>
                </span>
              </li>
              <li className="submenu-item">
                <Link href="/about">About Us</Link>
              </li>
              <li className="submenu-item">
                <Link href="/our-team">Our Team</Link>
              </li>
              <li className="submenu-item">
                <Link href="/testimonials">Testimonials</Link>
              </li>
              <li className="submenu-item">
                <Link href="/careers">Career</Link>
              </li>
              <li className="submenu-item">
                <Link href="/insights">Insights</Link>
              </li>
              <li className="submenu-item">
                <Link href="/portfolio">Portfolio</Link>
              </li>
              <li className="submenu-item">
                <Link href="/gallery">Gallery</Link>
              </li>
            </ul>
          </li>


          {/* Services Section */}
          {/*  */}

          {/* Services Section */}

          <li className="menu-item">
            <div
              className="menu-link items-center justify-between w-full cursor-pointer flex"
              style={{ display: "flex" }}
              onClick={() => toggleMenu("services")}
            >
              <p className="flex-1">Services</p>
              <FaChevronRight className="ml-2 flex-shrink-0" />
            </div>
            <ul className={`submenu ${openMenu === "services" ? "active" : ""}`}>
              <li className="submenu-item cursor-pointer" onClick={() => toggleMenu("")}>
                <span className="flex items-center">
                  <MdArrowBackIos className="mr-2" />
                  <span>Back</span>
                </span>
              </li>

              {ServicesMenuItems.map((service, serviceIndex) => (
                <li key={serviceIndex} className="submenu-item">
                  <span
                    className="menu-link items-center justify-between w-full cursor-pointer flex"
                    style={{ display: "flex" }}
                    onClick={() => toggleSubMenu(service.id, null)}
                  >
                    <p className="flex-1">{service.heading}</p>
                    <FaChevronRight className="ml-2 flex-shrink-0" />
                  </span>
                  <ul className={`nested-submenu ${subMenuOpen === service.id ? "active" : ""}`}>
                    <li className="submenu-item cursor-pointer" onClick={() => toggleSubMenu(service.id, "services")}>
                      <span className="flex items-center">
                        <MdArrowBackIos className="mr-2" />
                        <span>Back</span>
                      </span>
                    </li>
                    <li className="submenu-item">
                      <Link href={service.pageHref}>
                        <b>{service.heading}</b>
                      </Link>
                    </li>
                    {service.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="submenu-item cursor-pointer">
                        <Link href={link.href}>{link.title}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>

          {/* Hire Resources Section */}
          {/* Fixed Hire Resources Section - Perfect Arrow Alignment */}
          <li className="menu-item">
            <div
              className="menu-link items-center justify-between w-full cursor-pointer flex"
              style={{ display: "flex" }}
              onClick={() => toggleMenu("hireResources")}
            >
              <p className="flex-1">Hire Resources</p>
              <FaChevronRight className="ml-2 flex-shrink-0" />
            </div>
            <ul className={`submenu ${openMenu === "hireResources" ? "active" : ""}`}>
              <li className="submenu-item cursor-pointer" onClick={() => toggleMenu("")}>
                <span className="flex items-center">
                  <MdArrowBackIos className="mr-2" />
                  <span>Back</span>
                </span>
              </li>

              {HireMenuItems.map((hireSection, index) => (
                <li key={index} className="submenu-item">
                  <span
                    className="menu-link items-center justify-between w-full cursor-pointer flex"
                    style={{ display: "flex" }}
                    onClick={() => toggleSubMenu(hireSection.id, null)}
                  >
                    <p className="flex-1">{hireSection.title}</p>
                    <FaChevronRight className="ml-2 flex-shrink-0" />
                  </span>
                  <ul className={`nested-submenu ${subMenuOpen === hireSection.id ? "active" : ""}`}>
                    <li className="submenu-item cursor-pointer" onClick={() => toggleSubMenu(hireSection.id, "hireResources")}>
                      <span className="flex items-center">
                        <MdArrowBackIos className="mr-2" />
                        <span>Back</span>
                      </span>
                    </li>
                    <li className="submenu-item">
                      <Link href={hireSection.href}>
                        <b>{hireSection.title}</b>
                      </Link>
                    </li>
                    {hireSection.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="submenu-item cursor-pointer">
                        <Link href={link.href}>{link.title}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>


{/* Solutions Section - Perfect 3-Level Structure */}
          <li className="menu-item">
            <div
              className="menu-link items-center justify-between w-full cursor-pointer flex"
              style={{ display: "flex" }}
              onClick={() => toggleMenu("solutions")}
            >
              <p className="flex-1">Solutions</p>
              <FaChevronRight className="ml-2 flex-shrink-0" />
            </div>
            <ul className={`submenu ${openMenu === "solutions" ? "active" : ""}`}>
              <li className="submenu-item cursor-pointer" onClick={() => toggleMenu("")}>
                <span className="flex items-center">
                  <MdArrowBackIos className="mr-2" />
                  <span>Back</span>
                </span>
              </li>

              {SolutionsMenuItems.map((solutionCategory, catIndex) => (
                <li key={catIndex} className="submenu-item">
                  <span
                    className="menu-link items-center justify-between w-full cursor-pointer flex"
                    style={{ display: "flex" }}
                    onClick={() => toggleSubMenu(solutionCategory.id, null)}
                  >
                    <p className="flex-1">{solutionCategory.title}</p>
                    <FaChevronRight className="ml-2 flex-shrink-0" />
                  </span>
                  <ul className={`nested-submenu ${subMenuOpen === solutionCategory.id ? "active" : ""}`}>
                    <li className="submenu-item cursor-pointer" onClick={() => toggleSubMenu(solutionCategory.id, "solutions")}>
                      <span className="flex items-center">
                        <MdArrowBackIos className="mr-2" />
                        <span>Back</span>
                      </span>
                    </li>
                    {solutionCategory.items.map((solution, solIndex) => (
                      <li key={solIndex} className="submenu-item cursor-pointer">
                        <Link href={solution.href}>{solution.title}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>

          {/* Industries Section */}

          <li className="menu-item">
            <div
              className="menu-link items-center justify-between w-full cursor-pointer flex"
              style={{ display: "flex" }}
              onClick={() => toggleMenu("industries")}
            >
              <p className="flex-1">Industries</p>
              <FaChevronRight className="ml-2 flex-shrink-0" />
            </div>
            <ul className={`submenu ${openMenu === "industries" ? "active" : ""}`}>
              <li className="submenu-item cursor-pointer" onClick={() => toggleMenu("")}>
                <span className="flex items-center">
                  <MdArrowBackIos className="mr-2" />
                  <span>Back</span>
                </span>
              </li>

              {industriestabs[0].items.map((industry, index) => (
                <li key={index} className="submenu-item cursor-pointer">
                  <Link href={industry.href}>{industry.title}</Link>
                </li>
              ))}
            </ul>
          </li>

          

          {/* FIXED Insights Section - Proper toggleMenu("resources") */}
          <li className="menu-item">
            <div
              className="menu-link items-center justify-between w-full cursor-pointer flex"
              style={{ display: "flex" }}
              onClick={() => toggleMenu("resources")}
            >
              <p className="flex-1">Insights</p>
              <FaChevronRight className="ml-2 flex-shrink-0" />
            </div>
            {/* ✅ FIXED: Changed "insights" → "resources" */}
            <ul className={`submenu ${openMenu === "resources" ? "active" : ""}`}>
              <li className="submenu-item cursor-pointer" onClick={() => toggleMenu("")}>
                <span className="flex items-center">
                  <MdArrowBackIos className="mr-2" />
                  <span>Back</span>
                </span>
              </li>

              {insightItems.map((insight, index) => (
                <li key={insight.key} className="submenu-item cursor-pointer">
                  <Link href={insight.href}>{insight.title}</Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Case Study Section */}
          <li className="menu-item">
            <span
              className="menu-link"
              onClick={() => (window.location.href = "/portfolio")}
            >
              Portfolio
            </span>
          </li>

          {/* Contact Us Section */}
          <li className="menu-item">
            <span
              className="menu-link"
              onClick={() => (window.location.href = "/contact")}
            >
              Contact Us
            </span>
          </li>
        </li>

        {/* Contact Numbers */}


        <li className="contact-list pt-0 w-full">
         {/* Compact Social Icons */}
          <div className="flex items-center justify-center py-2 px-0 gap-2 border-t border-gray-200">
            <a href="https://www.facebook.com/softkingo" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:scale-110 transition-transform">
              <FaFacebook className="w-4 h-4 text-gray-700 hover:text-blue-600" />
            </a>
            <a href="https://www.linkedin.com/company/softkingo" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:scale-110 transition-transform">
              <FaLinkedin className="w-4 h-4 text-gray-700 hover:text-blue-700" />
            </a>
            <a href="https://x.com/softkingo" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:scale-110 transition-transform">
              <FaXTwitter className="w-4 h-4 text-gray-700 hover:text-black" />
            </a>
            <a href="https://www.youtube.com/@softkingo" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:scale-110 transition-transform">
              <FaYoutube className="w-4 h-4 text-gray-700 hover:text-red-600" />
            </a>
            <a href="https://www.instagram.com/softkingo" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:scale-110 transition-transform">
              <IoLogoInstagram className="w-4 h-4 text-gray-700 hover:text-pink-600" />
            </a>
            <a href="https://clutch.co/profile/softkingo" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:scale-110 transition-transform">
              <TbBeta className="w-4 h-4 text-gray-700 hover:text-orange-600" />
            </a>
          </div>
          {/* Compact 6 Offices */}
          {/* { flag: "/images/flags/uae.png", country: "UAE - Dubai", phone: "+971 4 321 8520" }, */}
          {/* { flag: "/images/flags/canada.png", country: "Canada - Toronto", phone: "+1 647-793-9201" } */},
          {[
            { flag: "/images/flags/india.png", country: "India - New Delhi", phone: "+91-7428750870" },
           
            { flag: "/images/flags/usa.png", country: "USA - Los Angeles", phone: "+1 323-908-3492" },
             { flag: "/images/flags/india.png", country: "India - Noida", phone: "+91-120-636-7890" },
            { flag: "/images/flags/uk.png", country: "UK - London", phone: "+44 (0)20-7993-2188" },
          

          ].map((office, index) => (
            <a
              key={index}
              href={`tel:${office.phone.replace(/[\s\-\(\)]/g, '')}`}
              className="hidden py-2 px-4 w-full flex items-center gap-2 border-b border-gray-200 hover:bg-gray-50 text-sm"
            >
              <img alt={office.country} src={office.flag} className="w-4 h-3 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="font-medium text-gray-900 truncate">{office.country}</div>
                <div className="text-gray-600 text-xs mt-0">{office.phone}</div>
              </div>
            </a>
          ))}

         
        </li>



      </ul>
    </nav>
  );
};

export default SideBar;
