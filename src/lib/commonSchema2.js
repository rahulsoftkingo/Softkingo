// lib/commonSchema.js
// Common schemas shared across ALL pages

export const commonSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://softkingo.com/#organization",
    "name": "Softkingo",
    "url": "https://softkingo.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.softkingo.com/_next/static/media/softkingo-logo.d4fc7414.png",
      "width": 200,
      "height": 60
    },
    "description":
      "Softkingo is a global IT services company specializing in mobile app development, web development, AI solutions, and digital transformation services.",
    "telephone": "+91-7428750870",
    "email": "sales@softkingo.com",
    "foundingDate": "2020",
    "areaServed": "Worldwide",
    "sameAs": [
      "https://www.facebook.com/softkingo/",
      "https://in.linkedin.com/company/softkingo",
      "https://www.instagram.com/softkingotechnologies"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "telephone": "+91-7428750870",
        "email": "sales@softkingo.com",
        "availableLanguage": ["English", "Hindi"],
        "areaServed": "Worldwide"
      }
    ],
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "B-148, Block B, Sector 63",
        "addressLocality": "Noida",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "201301",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "A-179, Block ED, New Ashok Nagar",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110096",
        "addressCountry": "IN"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "name": "Outstanding Mobile App Development",
        "author": { "@type": "Person", "name": "James Carter" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "datePublished": "2024-11-10",
        "reviewBody": "Softkingo delivered our mobile app on time and exceeded our expectations. Highly recommend!"
      }
    ]
  },
  {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SiteNavigationElement",
      "name": "Main Navigation",
      "hasPart": [
        { "@type": "SiteNavigationElement", "name": "About Us", "url": "https://www.softkingo.com/about" },
        { "@type": "SiteNavigationElement", "name": "Services", "url": "https://www.softkingo.com/services" },
        { "@type": "SiteNavigationElement", "name": "Hire Resources", "url": "https://www.softkingo.com/hire" },
        { "@type": "SiteNavigationElement", "name": "Solutions", "url": "https://www.softkingo.com/solutions" },
        { "@type": "SiteNavigationElement", "name": "Industries", "url": "https://www.softkingo.com/industries" },
        { "@type": "SiteNavigationElement", "name": "Insights", "url": "https://www.softkingo.com/blog" },
        { "@type": "SiteNavigationElement", "name": "Portfolio", "url": "https://www.softkingo.com/portfolio" },
        { "@type": "SiteNavigationElement", "name": "Contact Us", "url": "https://www.softkingo.com/portfolio" }
      ]
    },

    {
      "@type": "SiteNavigationElement",
      "name": "About Us",
      "url": "https://www.softkingo.com/about",
      "hasPart": [
        { "@type": "SiteNavigationElement", "name": "About Us", "url": "https://www.softkingo.com/about" },
        { "@type": "SiteNavigationElement", "name": "Our Team", "url": "https://www.softkingo.com/our-team" },
        { "@type": "SiteNavigationElement", "name": "Testimonials", "url": "https://www.softkingo.com/testimonials" },
        { "@type": "SiteNavigationElement", "name": "Career", "url": "https://www.softkingo.com/careers" },
        { "@type": "SiteNavigationElement", "name": "Insights", "url": "https://www.softkingo.com/blog" },
        { "@type": "SiteNavigationElement", "name": "Portfolio", "url": "https://www.softkingo.com/portfolio" },
        { "@type": "SiteNavigationElement", "name": "Gallery", "url": "https://www.softkingo.com/gallery" }
      ]
    },

    {
      "@type": "SiteNavigationElement",
      "name": "Services",
      "url": "https://www.softkingo.com/services",
      "hasPart": [
        {
          "@type": "SiteNavigationElement",
          "name": "Mobile App Development",
          "url": "https://www.softkingo.com/services/mobile-app-development",
          "hasPart": [
            { "@type": "SiteNavigationElement", "name": "Android App Development", "url": "https://www.softkingo.com/services/android-app-development" },
            { "@type": "SiteNavigationElement", "name": "iOS App Development", "url": "https://www.softkingo.com/services/ios-app-development" },
            { "@type": "SiteNavigationElement", "name": "Hybrid App Development", "url": "https://www.softkingo.com/services/hybrid-app-development" },
            { "@type": "SiteNavigationElement", "name": "React Native App Development", "url": "https://www.softkingo.com/services/react-native-app-development" },
            { "@type": "SiteNavigationElement", "name": "Flutter App Development", "url": "https://www.softkingo.com/services/flutter-app-development" },
            { "@type": "SiteNavigationElement", "name": "App UI/UX Design", "url": "https://www.softkingo.com/services/app-ui-ux-design" }
          ]
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Web & CMS Development",
          "url": "https://www.softkingo.com/services/web-development",
          "hasPart": [
            { "@type": "SiteNavigationElement", "name": "Custom Website Development", "url": "https://www.softkingo.com/services/custom-website-development" },
            { "@type": "SiteNavigationElement", "name": "CMS Development", "url": "https://www.softkingo.com/services/cms-development" },
            { "@type": "SiteNavigationElement", "name": "Web Application Development", "url": "https://www.softkingo.com/services/web-application-development" },
            { "@type": "SiteNavigationElement", "name": "Enterprise Web Development", "url": "https://www.softkingo.com/services/enterprise-web-development" },
            { "@type": "SiteNavigationElement", "name": "Website Redesign", "url": "https://www.softkingo.com/services/website-redesign" },
            { "@type": "SiteNavigationElement", "name": "Website Maintenance", "url": "https://www.softkingo.com/services/website-maintenance" }
          ]
        },
        {
          "@type": "SiteNavigationElement",
          "name": "eCommerce Development",
          "url": "https://www.softkingo.com/services/ecommerce-development",
          "hasPart": [
            { "@type": "SiteNavigationElement", "name": "Shopify Development", "url": "https://www.softkingo.com/services/shopify-development" },
            { "@type": "SiteNavigationElement", "name": "WooCommerce Development", "url": "https://www.softkingo.com/services/woocommerce-development" },
            { "@type": "SiteNavigationElement", "name": "Magento Development", "url": "https://www.softkingo.com/services/magento-development" },
            { "@type": "SiteNavigationElement", "name": "Custom eCommerce Development", "url": "https://www.softkingo.com/services/custom-ecommerce-development" },
            { "@type": "SiteNavigationElement", "name": "Multi-Vendor Marketplace", "url": "https://www.softkingo.com/services/multivendor-ecommerce-development" },
            { "@type": "SiteNavigationElement", "name": "eCommerce App Development", "url": "https://www.softkingo.com/services/ecommerce-app-development" }
          ]
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Blockchain Development",
          "url": "https://www.softkingo.com/services/blockchain-development",
          "hasPart": [
            { "@type": "SiteNavigationElement", "name": "Crypto Wallet Development", "url": "https://www.softkingo.com/services/crypto-wallet-development" },
            { "@type": "SiteNavigationElement", "name": "Smart Contract Development", "url": "https://www.softkingo.com/services/smart-contract-development" },
            { "@type": "SiteNavigationElement", "name": "NFT Marketplace Development", "url": "https://www.softkingo.com/services/nft-marketplace-development" },
            { "@type": "SiteNavigationElement", "name": "DApp Development", "url": "https://www.softkingo.com/services/dapp-development" },
            { "@type": "SiteNavigationElement", "name": "DeFi Development", "url": "https://www.softkingo.com/services/defi-development" },
            { "@type": "SiteNavigationElement", "name": "Token Development", "url": "https://www.softkingo.com/services/token-development" }
          ]
        },
        {
          "@type": "SiteNavigationElement",
          "name": "AI & ML Services",
          "url": "https://www.softkingo.com/services/ai-ml",
          "hasPart": [
            { "@type": "SiteNavigationElement", "name": "AI Development", "url": "https://www.softkingo.com/services/ai-development" },
            { "@type": "SiteNavigationElement", "name": "Machine Learning Development", "url": "https://www.softkingo.com/services/machine-learning-development" },
            { "@type": "SiteNavigationElement", "name": "Chatbot Development", "url": "https://www.softkingo.com/services/chatbot-development" },
            { "@type": "SiteNavigationElement", "name": "Predictive Analytics", "url": "https://www.softkingo.com/services/predictive-analytics" },
            { "@type": "SiteNavigationElement", "name": "Computer Vision", "url": "https://www.softkingo.com/services/computer-vision" },
            { "@type": "SiteNavigationElement", "name": "Recommendation Engine Development", "url": "https://www.softkingo.com/services/recommendation-engine-development" }
          ]
        },
        {
          "@type": "SiteNavigationElement",
          "name": "IoT & Embedded",
          "url": "https://www.softkingo.com/services/iot-embedded",
          "hasPart": [
            { "@type": "SiteNavigationElement", "name": "IoT App Development", "url": "https://www.softkingo.com/services/iot-app-development" },
            { "@type": "SiteNavigationElement", "name": "Embedded Software Development", "url": "https://www.softkingo.com/services/embedded-software-development" },
            { "@type": "SiteNavigationElement", "name": "Industrial IoT (IIoT)", "url": "https://www.softkingo.com/services/iiot" },
            { "@type": "SiteNavigationElement", "name": "Device Integration", "url": "https://www.softkingo.com/services/device-integration" },
            { "@type": "SiteNavigationElement", "name": "Home Automation", "url": "https://www.softkingo.com/services/home-automation" },
            { "@type": "SiteNavigationElement", "name": "AIoT App Development", "url": "https://www.softkingo.com/services/aiot-app-development" }
          ]
        },
        {
          "@type": "SiteNavigationElement",
          "name": "DevOps & Cloud",
          "url": "https://www.softkingo.com/services/devops-cloud",
          "hasPart": [
            { "@type": "SiteNavigationElement", "name": "Cloud Migration", "url": "https://www.softkingo.com/services/cloud-migration" },
            { "@type": "SiteNavigationElement", "name": "DevOps Automation", "url": "https://www.softkingo.com/services/devops-automation" },
            { "@type": "SiteNavigationElement", "name": "CI/CD Pipeline", "url": "https://www.softkingo.com/services/ci-cd-pipeline" },
            { "@type": "SiteNavigationElement", "name": "Cloud Management", "url": "https://www.softkingo.com/services/cloud-management" },
            { "@type": "SiteNavigationElement", "name": "Containerization", "url": "https://www.softkingo.com/services/containerization" },
            { "@type": "SiteNavigationElement", "name": "Server Security Optimization", "url": "https://www.softkingo.com/services/server-security-optimization" }
          ]
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Digital Marketing",
          "url": "https://www.softkingo.com/services/digital-marketing",
          "hasPart": [
            { "@type": "SiteNavigationElement", "name": "SEO Services", "url": "https://www.softkingo.com/services/seo" },
            { "@type": "SiteNavigationElement", "name": "Paid Marketing", "url": "https://www.softkingo.com/services/paid-marketing" },
            { "@type": "SiteNavigationElement", "name": "Online Reputation Management", "url": "https://www.softkingo.com/services/online-reputation-management" },
            { "@type": "SiteNavigationElement", "name": "App Marketing", "url": "https://www.softkingo.com/services/app-marketing" },
            { "@type": "SiteNavigationElement", "name": "Content Marketing", "url": "https://www.softkingo.com/services/content-marketing" },
            { "@type": "SiteNavigationElement", "name": "Social Media Marketing", "url": "https://www.softkingo.com/services/social-media-marketing" }
          ]
        }
      ]
    },

    {
      "@type": "SiteNavigationElement",
      "name": "Hire Resources",
      "url": "https://www.softkingo.com/hire/dedicated-developers",
      "hasPart": [
        {
          "@type": "SiteNavigationElement",
          "name": "Hire App Developers",
          "url": "https://www.softkingo.com/hire/app-developers",
          "hasPart": [
            { "@type": "SiteNavigationElement", "name": "Hire Android Developers", "url": "https://www.softkingo.com/hire/android-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire iOS Developers", "url": "https://www.softkingo.com/hire/ios-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire iPhone App Developers", "url": "https://www.softkingo.com/hire/iphone-app-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire iPad Developers", "url": "https://www.softkingo.com/hire/ipad-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire Flutter Developers", "url": "https://www.softkingo.com/hire/flutter-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire React Native Developers", "url": "https://www.softkingo.com/hire/react-native-developers" }
          ]
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Hire Frontend Developers",
          "url": "https://www.softkingo.com/hire/frontend-developers",
          "hasPart": [
            { "@type": "SiteNavigationElement", "name": "Hire Angular Developers", "url": "https://www.softkingo.com/hire/angular-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire ReactJS Developers", "url": "https://www.softkingo.com/hire/reactjs-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire Vue.js Developers", "url": "https://www.softkingo.com/hire/vuejs-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire Web App Developers", "url": "https://www.softkingo.com/hire/web-app-developers" }
          ]
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Hire Backend Developers",
          "url": "https://www.softkingo.com/hire/backend-developers",
          "hasPart": [
            { "@type": "SiteNavigationElement", "name": "Hire Java Developers", "url": "https://www.softkingo.com/hire/java-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire Node.js Developers", "url": "https://www.softkingo.com/hire/nodejs-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire Python Developers", "url": "https://www.softkingo.com/hire/python-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire PHP Developers", "url": "https://www.softkingo.com/hire/php-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire Laravel Developers", "url": "https://www.softkingo.com/hire/laravel-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire Django Developers", "url": "https://www.softkingo.com/hire/Django-developers" }
          ]
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Hire Full-Stack Developers",
          "url": "https://www.softkingo.com/hire/full-stack-developers",
          "hasPart": [
            { "@type": "SiteNavigationElement", "name": "Hire MERN Stack Developers", "url": "https://www.softkingo.com/hire/mern-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire NextJs Developers", "url": "https://www.softkingo.com/hire/mean-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire Laravel + Vue Developers", "url": "https://www.softkingo.com/hire/laravel-vue-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire React + Django Developers", "url": "https://www.softkingo.com/hire/react-node-developers" }
          ]
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Hire eCommerce Developers",
          "url": "https://www.softkingo.com/hire/ecommerce-developers",
          "hasPart": [
            { "@type": "SiteNavigationElement", "name": "Hire Magento Developers", "url": "https://www.softkingo.com/hire/magento-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire WordPress Developers", "url": "https://www.softkingo.com/hire/wordpress-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire WooCommerce Developers", "url": "https://www.softkingo.com/hire/woocommerce-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire Shopify Developers", "url": "https://www.softkingo.com/hire/shopify-developers" }
          ]
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Hire Dedicated Experts",
          "url": "https://www.softkingo.com/hire/dedicated-developers",
          "hasPart": [
            { "@type": "SiteNavigationElement", "name": "Hire Solution Architects", "url": "https://www.softkingo.com/hire/solution-architects" },
            { "@type": "SiteNavigationElement", "name": "Hire DevOps Engineers", "url": "https://www.softkingo.com/hire/devops-engineers" },
            { "@type": "SiteNavigationElement", "name": "Hire QA & Testers", "url": "https://www.softkingo.com/hire/qa-testers" },
            { "@type": "SiteNavigationElement", "name": "Hire AI & ML Engineers", "url": "https://www.softkingo.com/hire/ml-engineers" },
            { "@type": "SiteNavigationElement", "name": "Hire Software Developers", "url": "https://www.softkingo.com/hire/software-developers" },
            { "@type": "SiteNavigationElement", "name": "Hire UI/UX Designers", "url": "https://www.softkingo.com/hire/ui-ux-designers" }
          ]
        }
      ]
    },

    {
      "@type": "SiteNavigationElement",
      "name": "Solutions",
      "url": "https://www.softkingo.com/solutions",
      "hasPart": [
        {
          "@type": "SiteNavigationElement",
          "name": "Industry-Specific Solutions",
          "url": "https://www.softkingo.com/industries",
          "hasPart": [
            { "@type": "SiteNavigationElement", "name": "Healthcare", "url": "https://www.softkingo.com/solutions/healthcare-app-development" },
            { "@type": "SiteNavigationElement", "name": "Education / E-Learning", "url": "https://www.softkingo.com/solutions/elearning-app-development" },
            { "@type": "SiteNavigationElement", "name": "Real Estate", "url": "https://www.softkingo.com/solutions/real-estate-app-development" },
            { "@type": "SiteNavigationElement", "name": "Travel & Tourism", "url": "https://www.softkingo.com/solutions/travel-app-development" },
            { "@type": "SiteNavigationElement", "name": "Food & Restaurant", "url": "https://www.softkingo.com/solutions/restaurant-app-development" },
            { "@type": "SiteNavigationElement", "name": "Fitness & Wellness", "url": "https://www.softkingo.com/solutions/fitness-app-development" },
            { "@type": "SiteNavigationElement", "name": "Retail & E-Commerce", "url": "https://www.softkingo.com/solutions/ecommerce-app-development" },
            { "@type": "SiteNavigationElement", "name": "Logistics/Transportation", "url": "https://www.softkingo.com/solutions/logistics-app-development" },
            { "@type": "SiteNavigationElement", "name": "Media & Entertainment", "url": "https://www.softkingo.com/solutions/media-app-development" },
            { "@type": "SiteNavigationElement", "name": "Social Networking", "url": "https://www.softkingo.com/solutions/social-media-app-development" },
            { "@type": "SiteNavigationElement", "name": "Finance / FinTech", "url": "https://www.softkingo.com/solutions/fintech-app-development" },
            { "@type": "SiteNavigationElement", "name": "Automotive", "url": "https://www.softkingo.com/solutions/automotive-app-development" },
            { "@type": "SiteNavigationElement", "name": "Construction", "url": "https://www.softkingo.com/solutions/construction-management-app-development" },
            { "@type": "SiteNavigationElement", "name": "Manufacturing", "url": "https://www.softkingo.com/solutions/manufacturing-app-development" },
            { "@type": "SiteNavigationElement", "name": "Event Management", "url": "https://www.softkingo.com/solutions/event-management-app-development" },
            { "@type": "SiteNavigationElement", "name": "Dating App", "url": "https://www.softkingo.com/solutions/dating-app-development" },
            { "@type": "SiteNavigationElement", "name": "Astrology App", "url": "https://www.softkingo.com/solutions/astrology-app-development" },
            { "@type": "SiteNavigationElement", "name": "Legal App", "url": "https://www.softkingo.com/solutions/legal-app-development" }
          ]
        },
        {
          "@type": "SiteNavigationElement",
          "name": "On-Demand Solutions",
          "url": "https://www.softkingo.com/solutions",
          "hasPart": [
            { "@type": "SiteNavigationElement", "name": "Food Delivery", "url": "https://www.softkingo.com/solutions/food-delivery-app-development" },
            { "@type": "SiteNavigationElement", "name": "Grocery Delivery", "url": "https://www.softkingo.com/solutions/grocery-delivery-app-development" },
            { "@type": "SiteNavigationElement", "name": "Pickup & Delivery", "url": "https://www.softkingo.com/solutions/pickup-delivery-app-development" },
            { "@type": "SiteNavigationElement", "name": "Taxi Booking", "url": "https://www.softkingo.com/solutions/taxi-app-development" },
            { "@type": "SiteNavigationElement", "name": "Fitness Trainer App", "url": "https://www.softkingo.com/solutions/fitness-trainer-app-development" },
            { "@type": "SiteNavigationElement", "name": "Home Services", "url": "https://www.softkingo.com/solutions/on-demand-home-service-app-development" },
            { "@type": "SiteNavigationElement", "name": "Beauty & Salon Booking", "url": "https://www.softkingo.com/solutions/salon-app-development" },
            { "@type": "SiteNavigationElement", "name": "Doctor & Medical App", "url": "https://www.softkingo.com/solutions/ice-cream-delivery-app-development" },
            { "@type": "SiteNavigationElement", "name": "Laundry Service", "url": "https://www.softkingo.com/solutions/laundry-app-development" },
            { "@type": "SiteNavigationElement", "name": "Restaurant Management", "url": "https://www.softkingo.com/solutions/restaurant-app-development" },
            { "@type": "SiteNavigationElement", "name": "Pet Care App", "url": "https://www.softkingo.com/solutions/pet-care-app-development" },
            { "@type": "SiteNavigationElement", "name": "Carpooling Apps", "url": "https://www.softkingo.com/solutions/ride-sharing-app-development" },
            { "@type": "SiteNavigationElement", "name": "Tutor App", "url": "https://www.softkingo.com/solutions/tutor-app-development" },
            { "@type": "SiteNavigationElement", "name": "Mechanics & Repair App", "url": "https://www.softkingo.com/solutions/mechanic-app-development" },
            { "@type": "SiteNavigationElement", "name": "Car Wash App", "url": "https://www.softkingo.com/solutions/car-wash-app-development" }
          ]
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Clone App Solutions",
          "url": "https://www.softkingo.com/solutions",
          "hasPart": [
            { "@type": "SiteNavigationElement", "name": "Amazon Clone", "url": "https://www.softkingo.com/solutions/amazon-clone-app-development" },
            { "@type": "SiteNavigationElement", "name": "Zomato Clone", "url": "https://www.softkingo.com/solutions/zomato-clone-app-development" },
            { "@type": "SiteNavigationElement", "name": "Uber Clone", "url": "https://www.softkingo.com/solutions/uber-clone-app-development" },
            { "@type": "SiteNavigationElement", "name": "Naukri Clone", "url": "https://www.softkingo.com/solutions/naukri-clone-app-development" },
            { "@type": "SiteNavigationElement", "name": "Udemy Clone", "url": "https://www.softkingo.com/solutions/udemy-clone-app-development" },
            { "@type": "SiteNavigationElement", "name": "Oyo Clone", "url": "https://www.softkingo.com/solutions/oyo-clone-app-development" },
            { "@type": "SiteNavigationElement", "name": "Bigbasket Clone", "url": "https://www.softkingo.com/solutions/bigbasket-clone-app-development" },
            { "@type": "SiteNavigationElement", "name": "Urban Company Clone", "url": "https://www.softkingo.com/solutions/urban-company-clone-app-development" },
            { "@type": "SiteNavigationElement", "name": "Tinder Clone", "url": "https://www.softkingo.com/solutions/tinder-clone-app-development" },
            { "@type": "SiteNavigationElement", "name": "Instagram Clone", "url": "https://www.softkingo.com/solutions/instagram-clone-app-development" },
            { "@type": "SiteNavigationElement", "name": "Quora Clone", "url": "https://www.softkingo.com/solutions/quora-clone-app-development" },
            { "@type": "SiteNavigationElement", "name": "Soundcloud Clone", "url": "https://www.softkingo.com/solutions/soundcloud-clone-app-development" },
            { "@type": "SiteNavigationElement", "name": "Spotify Clone", "url": "https://www.softkingo.com/solutions/spotify-clone-app-development" },
            { "@type": "SiteNavigationElement", "name": "Ghost Lens Clone", "url": "https://www.softkingo.com/solutions/ghost-lens-clone-app-development" },
            { "@type": "SiteNavigationElement", "name": "Olx/Airbnb Clone", "url": "https://www.softkingo.com/solutions/olx-clone-app-development" }
          ]
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Business-Model Solutions",
          "url": "https://www.softkingo.com/solutions",
          "hasPart": [
            { "@type": "SiteNavigationElement", "name": "Marketplace App", "url": "https://www.softkingo.com/solutions/marketplace-app-development" },
            { "@type": "SiteNavigationElement", "name": "Subscription Software", "url": "https://www.softkingo.com/solutions/subscription-platform-development" },
            { "@type": "SiteNavigationElement", "name": "B2B Commerce", "url": "https://www.softkingo.com/solutions/b2b-ecommerce-development" },
            { "@type": "SiteNavigationElement", "name": "SaaS Product Development", "url": "https://www.softkingo.com/solutions/saas-product-development" },
            { "@type": "SiteNavigationElement", "name": "CRM Software", "url": "https://www.softkingo.com/solutions/crm-software-development" },
            { "@type": "SiteNavigationElement", "name": "ERP Software", "url": "https://www.softkingo.com/solutions/erp-software-development" },
            { "@type": "SiteNavigationElement", "name": "Booking System", "url": "https://www.softkingo.com/solutions/online-booking-system-development" },
            { "@type": "SiteNavigationElement", "name": "Membership / Loyalty", "url": "https://www.softkingo.com/solutions/loyalty-membership-platform-development" },
            { "@type": "SiteNavigationElement", "name": "HR Management", "url": "https://www.softkingo.com/solutions/hr-software-development" },
            { "@type": "SiteNavigationElement", "name": "Inventory Management", "url": "https://www.softkingo.com/solutions/inventory-management-software-development" }
          ]
        }
      ]
    },

    {
      "@type": "SiteNavigationElement",
      "name": "Industries",
      "url": "https://www.softkingo.com/industries",
      "hasPart": [
        { "@type": "SiteNavigationElement", "name": "Healthcare", "url": "https://www.softkingo.com/industries/healthcare" },
        { "@type": "SiteNavigationElement", "name": "Education / E-Learning", "url": "https://www.softkingo.com/industries/education" },
        { "@type": "SiteNavigationElement", "name": "Real Estate", "url": "https://www.softkingo.com/industries/real-estate" },
        { "@type": "SiteNavigationElement", "name": "Travel & Tourism", "url": "https://www.softkingo.com/industries/travel" },
        { "@type": "SiteNavigationElement", "name": "Food & Restaurant", "url": "https://www.softkingo.com/industries/restaurant" },
        { "@type": "SiteNavigationElement", "name": "Fitness & Wellness", "url": "https://www.softkingo.com/industries/fitness" },
        { "@type": "SiteNavigationElement", "name": "Retail & E-Commerce", "url": "https://www.softkingo.com/industries/retail" },
        { "@type": "SiteNavigationElement", "name": "Logistics/Transportation", "url": "https://www.softkingo.com/industries/logistics" },
        { "@type": "SiteNavigationElement", "name": "Media & Entertainment", "url": "https://www.softkingo.com/industries/entertainment" },
        { "@type": "SiteNavigationElement", "name": "Social Networking", "url": "https://www.softkingo.com/industries/social-media" },
        { "@type": "SiteNavigationElement", "name": "Finance / FinTech", "url": "https://www.softkingo.com/industries/fintech" },
        { "@type": "SiteNavigationElement", "name": "Automotive", "url": "https://www.softkingo.com/industries/automotive" },
        { "@type": "SiteNavigationElement", "name": "Construction", "url": "https://www.softkingo.com/industries/construction" },
        { "@type": "SiteNavigationElement", "name": "Manufacturing", "url": "https://www.softkingo.com/industries/manufacturing" },
        { "@type": "SiteNavigationElement", "name": "Sports", "url": "https://www.softkingo.com/industries/sports" }
      ]
    },

    {
      "@type": "SiteNavigationElement",
      "name": "Insights",
      "url": "https://www.softkingo.com/blog",
      "hasPart": [
        { "@type": "SiteNavigationElement", "name": "Latest Blogs", "url": "https://www.softkingo.com/blog" },
        { "@type": "SiteNavigationElement", "name": "Featured Blog", "url": "https://www.softkingo.com/featured" },
        { "@type": "SiteNavigationElement", "name": "Ebooks", "url": "https://www.softkingo.com/ebooks" },
        { "@type": "SiteNavigationElement", "name": "Press Releases", "url": "https://www.softkingo.com/press-releases" },
        { "@type": "SiteNavigationElement", "name": "Product Guides", "url": "https://www.softkingo.com/guides" },
        { "@type": "SiteNavigationElement", "name": "Media Coverage", "url": "https://www.softkingo.com/media-coverage" },
        { "@type": "SiteNavigationElement", "name": "Articles", "url": "https://www.softkingo.com/articles" },
        { "@type": "SiteNavigationElement", "name": "Whitepapers", "url": "https://www.softkingo.com/whitepapers" },
        { "@type": "SiteNavigationElement", "name": "Podcasts", "url": "https://www.softkingo.com/podcast" }
      ]
    }
  ]
}
];

