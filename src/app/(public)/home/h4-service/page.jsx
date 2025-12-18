
"use client";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaMobileAlt,
  FaDesktop,
  FaBullhorn,
  FaServer,
  FaApple,
  FaAndroid,
  FaCode,
  FaShoppingCart,
  FaWordpress,
  FaSearchDollar,
  FaAd,
  FaHashtag,
  FaEnvelope,
  FaFileAlt,
  FaShieldAlt,
  FaNetworkWired,
  FaDatabase,
  FaHeadset,
  FaLock,
  FaCloud,
  FaPaintBrush,
  FaArrowLeft
} from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

const ServicesSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our <span className="text-primary"> Services</span>
          </h1>
          <p className="text-sm lgtext-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to your business needs. From mobile apps to IT infrastructure, we've got you covered.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="space-y-8">
          <ServiceCategory
            title="Mobile App Development"
            icon={<FaMobileAlt className="text-sky-500" />}
            description="Comprehensive mobile solutions for iOS, Android and cross-platform."
            color="bg-sky-500"
            services={[
              {
                title: 'iOS App Development',
                description: 'Building native apps for iPhones and iPads using Swift or Objective-C.',
                icon: <FaApple />,
                technologies: ['Swift', 'Objective-C', 'SwiftUI', 'Xcode', 'UIKit'],


                //  technologies: [
                //     { name: 'Swift', icon: '/images/tech/swift.png' },
                //     { name: 'Objective‑C', icon: '/images/tech/objective-c.png' },
                //     { name: 'SwiftUI', icon: '/images/tech/swiftui.png' },
                //     // …
                //   ],
              },

              {
                title: 'Android App Development',
                description: 'Creating native Android apps using Kotlin or Java.',
                icon: <FaAndroid />,
                technologies: ['Kotlin', 'Java', 'Jetpack Compose', 'Android Studio', 'Material Design']
              },
              {
                title: 'Cross-Platform App Development',
                description: 'Using frameworks like Flutter or React Native to build apps for both iOS and Android.',
                icon: <FaMobileAlt />,
                technologies: ['Flutter', 'React Native', 'Dart', 'JavaScript', 'TypeScript']
              },
              {
                title: 'UI/UX Design for Mobile',
                description: 'Crafting intuitive and engaging interfaces and user experiences.',
                icon: <FaPaintBrush />,
                technologies: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Testing']
              },
              //   { 
              //     title: 'App Maintenance & Support', 
              //     description: 'Ongoing updates, bug fixes, and performance enhancements.',
              //     icon: <FaHeadset />,
              //     technologies: ['Bug Tracking', 'Performance Optimization', 'Version Updates', 'Security Patches']
              //   },
              //   { 
              //     title: 'Mobile App Testing & QA', 
              //     description: 'Manual and automated testing for functionality, performance, and security.',
              //     icon: <FaShieldAlt />,
              //     technologies: ['Jest', 'Appium', 'Selenium', 'Security Testing', 'Performance Testing']
              //   }
            ]}
          />

          <ServiceCategory
            title="Website Development"
            icon={<FaDesktop className="text-sky-500" />}
            description="Creating responsive, high-performance websites and web applications."
            color="bg-sky-500"
            services={[
              {
                title: 'Custom Website Design & Development',
                description: 'Creating tailored websites from scratch based on business needs.',
                icon: <FaCode />,
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js']
              },
              //   { 
              //     title: 'E-commerce Website Development', 
              //     description: 'Building online stores using platforms like Shopify, WooCommerce, or Magento.',
              //     icon: <FaShoppingCart />,
              //     technologies: ['Shopify', 'WooCommerce', 'Magento', 'Stripe', 'PayPal']
              //   },
              {
                title: 'CMS Development',
                description: 'Websites powered by content management systems like WordPress, Joomla, or Drupal.',
                icon: <FaWordpress />,
                technologies: ['WordPress', 'Joomla', 'Drupal', 'Headless CMS', 'Content Modeling']
              },
              {
                title: 'Web Application Development',
                description: 'Developing dynamic, interactive web apps with backend and frontend functionality.',
                icon: <FaCode />,
                technologies: ['Node.js', 'Express', 'Django', 'Ruby on Rails', 'API Integration']
              },
              {
                title: 'Responsive Web Design',
                description: 'Ensuring websites are optimized for all devices (mobile, tablet, desktop).',
                icon: <FaDesktop />,
                technologies: ['Responsive Layouts', 'Mobile-First', 'Flexbox', 'CSS Grid', 'Media Queries']
              },
              //   { 
              //     title: 'Website Maintenance & Support', 
              //     description: 'Regular updates, security patches, and content changes.',
              //     icon: <FaHeadset />,
              //     technologies: ['Security Updates', 'Content Updates', 'Performance Tuning', 'Backup Solutions']
              //   }
            ]}
          />

          <ServiceCategory
            title="Digital Marketing"
            icon={<FaBullhorn className="text-sky-500" />}
            description="Strategies to boost your online presence and drive business growth."
            color="bg-sky-500"
            services={[
              {
                title: 'Search Engine Optimization (SEO)',
                description: 'Improving website visibility and ranking in search engine results.',
                icon: <FaSearchDollar />,
                technologies: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Backlink Strategy']
              },
              {
                title: 'Pay-Per-Click Advertising (PPC)',
                description: 'Running ads on platforms like Google Ads or Bing Ads for targeted traffic.',
                icon: <FaAd />,
                technologies: ['Google Ads', 'Bing Ads', 'Facebook Ads', 'Retargeting', 'Conversion Tracking']
              },
              {
                title: 'Social Media Marketing (SMM)',
                description: 'Promoting brands through platforms like Facebook, Instagram, LinkedIn, and Twitter.',
                icon: <FaHashtag />,
                technologies: ['Content Strategy', 'Community Management', 'Influencer Marketing', 'Analytics']
              },
              {
                title: 'Email Marketing',
                description: 'Creating and managing campaigns to nurture leads and communicate with customers.',
                icon: <FaEnvelope />,
                technologies: ['Mailchimp', 'HubSpot', 'Automation', 'Segmentation', 'A/B Testing']
              },
              //   { 
              //     title: 'Content Marketing', 
              //     description: 'Producing valuable content (blogs, videos, infographics) to attract and retain audiences.',
              //     icon: <FaFileAlt />,
              //     technologies: ['Blogging', 'Video Production', 'Infographics', 'Content Strategy', 'SEO Content']
              //   },
              //   { 
              //     title: 'Online Reputation Management', 
              //     description: 'Monitoring and improving a brand’s online presence and reviews.',
              //     icon: <FaShieldAlt />,
              //     technologies: ['Review Monitoring', 'Sentiment Analysis', 'Crisis Management', 'Brand Monitoring']
              //   }
            ]}
          />

          <ServiceCategory
            title="Managed IT Services"
            icon={<FaServer className="text-sky-500" />}
            description="Comprehensive IT solutions to keep your business running smoothly."
            color="bg-sky-500"
            services={[
              {
                title: 'Network Monitoring & Management',
                description: 'Continuous monitoring of network performance, uptime, and threats.',
                icon: <FaNetworkWired />,
                technologies: ['Network Monitoring', 'Performance Optimization', 'Uptime Management', 'Alerts']
              },
              {
                title: 'Data Backup & Disaster Recovery',
                description: 'Ensuring business continuity with reliable data protection strategies.',
                icon: <FaDatabase />,
                technologies: ['Backup Solutions', 'Disaster Recovery', 'Cloud Backup', 'Data Encryption']
              },
              {
                title: 'IT Helpdesk Support',
                description: 'Providing technical support to users for hardware, software, and systems.',
                icon: <FaHeadset />,
                technologies: ['Ticketing System', 'Remote Support', 'Hardware Troubleshooting', 'Software Support']
              },
              {
                title: 'Cybersecurity Services',
                description: 'Protecting systems from malware, phishing, and other cyber threats.',
                icon: <FaLock />,
                technologies: ['Firewall', 'Endpoint Protection', 'Threat Detection', 'Security Audits']
              },
              //   { 
              //     title: 'Cloud Services Management', 
              //     description: 'Managing and optimizing services on platforms like AWS, Azure, or Google Cloud.',
              //     icon: <FaCloud />,
              //     technologies: ['AWS', 'Azure', 'Google Cloud', 'Cloud Migration', 'Cost Optimization']
              //   },
              //   { 
              //     title: 'Infrastructure Management', 
              //     description: 'Overseeing servers, storage, and IT infrastructure for performance and scalability.',
              //     icon: <FaServer />,
              //     technologies: ['Server Management', 'Virtualization', 'Storage Solutions', 'Scalability Planning']
              //   }
            ]}
          />
        </div>


      </div>
    </div>
  );
};

const ServiceCategory = ({ title, icon, description, color, services }) => {
  const [activeService, setActiveService] = useState(0);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0.7, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "2%"]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, y }}
      className="sticky top-24 backdrop-blur-lg bg-white/90 rounded-3xl border border-primary shadowxl overflow-hidden"
    >
      {/* <div className={`h-1 ${color}`}></div> */}

      <div className="p-8">
        <div className="flex items-start gap-4 mb-8">
          <div className="p-3 bg-sky-50 rounded-xl text-sky-600">
            {icon}
          </div>
          <div>
            <h3 className="text-lg md:text-2xl font-bold text-sky-900">{title}</h3>
            <p className="text-sky-600 mt-1 hidden lg:block">{description}</p>
          </div>
        </div>

        <div className="flex  flex-row gap-4 mb-8 pb-4 overflow-x-scroll hide-scrollbar">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => setActiveService(index)}
              className={`px-5 py-2 rounded-full font-medium transition-all  ${activeService === index
                ? "bg-gradient-to-l from-sky-400 via-primary to-sky-600 text-white shadow-lg shadow-sky-200 text-sm lg:text-md whitespace-nowrap"
                : "bg-white text-sky-600 hover:bg-gray-50 border border-primary whitespace-nowrap  text-sm"
                }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
          <Link href="/" className="group flex flex-col items-center justify-center">

            <div
              className=" flex flex-col items-center cursor-pointer "
            >
              <div
                className="
      bg-white p-4 rounded-2xl shadow-md
      border border-sky-900
      flex items-center justify-center
      md:w-28 md:h-28 w-20 h-20 mb-4
      transition-all duration-500 ease-in-out
      group-hover:rounded-full
      group-hover:border-primary
      group-hover:text-primary
    "
              >
                <i
                  className="
        text-6xl text-sky-900
        transition-colors duration-500 ease-in-out
        group-hover:text-primary
      "
                >
                  {services[activeService].icon}
                </i>
              </div>
              <h4
                className="
      text-xl font-bold text-sky-900 mb-2 text-center
      transition-colors duration-500 ease-in-out
      group-hover:text-primary
    "
              >
                {services[activeService].title}
              </h4>
            </div>

            <p className="text-gray-600 text-center flex flex-col items-center text-md md:text-md">
              {services[activeService].description}...<span className="flex flex-row items-center gap-2 group-hover:text-primary group-hover:gap-4 ">view more <FaArrowRight /></span>
            </p>
          </Link>

          <div>
            <h4 className="text-md md:text-lg font-semibold text-sky-900  mb-4 text-center md:text-start">Technologies & Tools</h4>
            {/* <div className="flex flex-row gap-3 overflow-x-scroll hide-scrollbar whitespace-nowrap px-2">
              {services[activeService].technologies.map((tech, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-sky50 text-sky-700 roundedfull font-medium flex flex-col items-center min-w-[fit-content] whitespace-nowrap"
                >
                  <img src="/images/tech/react.png" className="h-12 w-f" />
                 <span className="whitespace-nowrap">{tech}</span> 
                </div>
              ))}
            </div> */}

            <div className="flex flex-row gap-3 overflow-x-auto hide-scrollbar whitespace-nowrap px-2">
              {services[activeService].technologies.map((tech, index) => (
                <div
                  key={index}
                  className="
        inline-flex flex-col items-center
        px-4 py-2
        bg-sky50 text-sky-700
        rounded-full font-medium
        whitespace-nowrap
      "
                >
                  {/* <img
        src={tech.icon}          
        alt={tech.name}
        className="h-12 w-auto mb-2"
      /> */}
                  <img src="/images/tech/react.png" className="h-12 w-12" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>


            {/* <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Service Highlights</h4>
              <ul className="space-y-2">
                {services[activeService].technologies.slice(0, 4).map((tech, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${color}`}></div>
                    <span className="text-gray-600">{tech} implementation and optimization</span>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesSection;