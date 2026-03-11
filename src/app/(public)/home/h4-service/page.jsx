// src/app/(public)/home/h4-service/page.jsx
"use client";

import { useState, useRef, useEffect } from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaMobileAlt,
  FaDesktop,
  FaBullhorn,
  FaApple,
  FaAndroid,
  FaCode,
  FaShoppingCart,
  FaWordpress,
  FaPaintBrush,
  FaBitcoin,
  FaRobot,
  FaMicrochip,
  FaCogs,
  FaShieldAlt,
} from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

export default function ServicesSection() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-white py-10 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header (same style as Portfolio) */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-sky-900"
          >
            Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500">
              Services
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Comprehensive digital solutions tailored to your business needs. From mobile apps to IT infrastructure, we&apos;ve got you covered.
          </motion.p>
        </div>

        <div className="space-y-8">
          {/* Mobile App Development */}
          <ServiceCategory
            title="Mobile App Development"
            categoryLink="/services/mobile-app-development"
            icon={<FaMobileAlt className="text-sky-500" />}
            description="Turning your app ideas into immersive mobile experiences. Our future‑ready mobile apps move and react along with your users."
            color="bg-sky-500"
            services={[
              {
                title: "Android App Development",
                description: "Native Android apps using modern development practices.",
                icon: <FaAndroid />,
                link: "/services/android-app-development",
                technologies: [
                  { name: "Kotlin", image: "/images/tech/Kotlin.png" },
                  { name: "Java", image: "/images/tech/Java.png" },
                  { name: "Jetpack Compose", image: "/images/tech/jetpack-compose.png" },
                  { name: "Android Studio", image: "/images/tech/Android-Studio.png" },
                  { name: "Material Design", image: "/images/tech/Material-UI.png" },
                ],
              },
              {
                title: "iOS App Development",
                description: "Native iOS apps for iPhones and iPads with Swift expertise.",
                icon: <FaApple />,
                link: "/services/ios-app-development",
                technologies: [
                  { name: "Swift", image: "/images/tech/Swift.png" },
                  { name: "SwiftUI", image: "/images/tech/swiftui.png" },
                  { name: "Xcode", image: "/images/tech/Xcode.png" },
                  { name: "UIKit", image: "/images/tech/uikit.png" },
                  { name: "Core Data", image: "/images/tech/core-data.png" },
                ],
              },
              {
                title: "React Native App Development",
                description: "Cross-platform apps with native performance using React Native.",
                icon: <FaCode />,
                link: "/services/react-native-app-development",
                technologies: [
                  { name: "React Native", image: "/images/tech/react-native.png" },
                  { name: "JavaScript", image: "/images/tech/JavaScript.png" },
                  { name: "TypeScript", image: "/images/tech/TypeScript.png" },
                  { name: "Expo", image: "/images/tech/expo.png" },
                  { name: "Native Modules", image: "/images/tech/native-modules.png" },
                ],
              },
              {
                title: "Hybrid App Development",
                description: "Cost-effective apps that work across multiple platforms.",
                icon: <FaMobileAlt />,
                link: "/services/hybrid-app-development",
                technologies: [
                  { name: "Ionic", image: "/images/tech/Ionic.png" },
                  { name: "Cordova", image: "/images/tech/cordova.png" },
                  { name: "Capacitor", image: "/images/tech/Capacitor.png" },
                  { name: "Angular", image: "/images/tech/Angular.png" },
                  { name: "Vue.js", image: "/images/tech/Vue.js.png" },
                ],
              },
              {
                title: "Flutter App Development",
                description: "Beautiful, fast apps built with Flutter and Dart.",
                icon: <FaCode />,
                link: "/services/flutter-native-app-development",
                technologies: [
                  { name: "Flutter", image: "/images/tech/Flutter.png" },
                  { name: "Dart", image: "/images/tech/Dart.png" },
                  { name: "Firebase", image: "/images/tech/Firebase.png" },
                  { name: "Riverpod", image: "/images/tech/riverpod.png" },
                  { name: "BLoC", image: "/images/tech/bloc.png" },
                ],
              },
              {
                title: "App UI/UX Design",
                description: "Intuitive and engaging mobile app interfaces.",
                icon: <FaPaintBrush />,
                link: "/services/app-ui-ux-design",
                technologies: [
                  { name: "Figma", image: "/images/tech/Figma.png" },
                  { name: "Sketch", image: "/images/tech/Sketch.png" },
                  { name: "Adobe XD", image: "/images/tech/Adobe-XD.png" },
                  { name: "Prototyping", image: "/images/tech/prototyping.png" },
                  { name: "User Testing", image: "/images/tech/user-testing.png" },
                ],
              },
            ]}
          />

          {/* Web & CMS Development */}
          <ServiceCategory
            title="Web & CMS Development"
            categoryLink="/services/web-development"
            icon={<FaDesktop className="text-sky-500" />}
            description="Empowering businesses with fast, secure websites and CMS solutions that are easy to manage and scale."
            color="bg-sky-500"
            services={[
              {
                title: "Custom Website Development",
                description: "Tailored websites built from scratch for your business.",
                icon: <FaCode />,
                link: "/services/custom-website-development",
                technologies: [
                  { name: "React", image: "/images/tech/React.png" },
                  { name: "Next.js", image: "/images/tech/Next.js.png" },
                  { name: "Node.js", image: "/images/tech/nodejs.png" },
                  { name: "Tailwind CSS", image: "/images/tech/Tailwind-CSS.png" },
                  { name: "TypeScript", image: "/images/tech/TypeScript.png" },
                ],
              },
              {
                title: "CMS Development",
                description: "Content management systems for easy website management.",
                icon: <FaWordpress />,
                link: "/services/cms-development",
                technologies: [
                  { name: "WordPress", image: "/images/tech/WordPress.png" },
                  { name: "Strapi", image: "/images/tech/strapi.png" },
                  { name: "Sanity", image: "/images/tech/Sanity.png" },
                  { name: "Contentful", image: "/images/tech/Contentful.png" },
                  { name: "Headless CMS", image: "/images/tech/headless-cms.png" },
                ],
              },
              {
                title: "Web Application Development",
                description: "Dynamic web applications with full-stack capabilities.",
                icon: <FaCode />,
                link: "/services/web-application-development",
                technologies: [
                  { name: "Next.js", image: "/images/tech/Next.js.png" },
                  { name: "Node.js", image: "/images/tech/nodejs.png" },
                  { name: "MongoDB", image: "/images/tech/MongoDB.png" },
                  { name: "Express", image: "/images/tech/Express.png" },
                  { name: "API Development", image: "/images/tech/api.png" },
                ],
              },
              {
                title: "Enterprise Web Development",
                description: "Scalable web solutions for large enterprises.",
                icon: <FaDesktop />,
                link: "/services/enterprise-web-development",
                technologies: [
                  { name: "Docker", image: "/images/tech/Docker.png" },
                  { name: "Kubernetes", image: "/images/tech/Kubernetes.png" },
                  { name: "AWS", image: "/images/tech/AWS.png" },
                  { name: "Microservices", image: "/images/tech/microservices.png" },
                  { name: "Scalability", image: "/images/tech/scalability.png" },
                ],
              },
            ]}
          />

          {/* eCommerce Development */}
          <ServiceCategory
            title="eCommerce Development"
            categoryLink="/services/ecommerce-development"
            icon={<FaShoppingCart className="text-sky-500" />}
            description="Building robust eCommerce platforms that convert visitors into loyal customers."
            color="bg-sky-500"
            services={[
              {
                title: "Shopify Development",
                description: "Custom Shopify stores with advanced features.",
                icon: <FaShoppingCart />,
                link: "/services/shopify-development",
                technologies: [
                  { name: "Shopify", image: "/images/tech/WooCommerce.png" },
                  { name: "Liquid", image: "/images/tech/Vite.png" },
                  { name: "Shopify Apps", image: "/images/tech/Shopware.png" },
                  { name: "Payment Gateways", image: "/images/tech/WooCommerce.png" },
                ],
              },
              {
                title: "WooCommerce Development",
                description: "WordPress-powered eCommerce solutions.",
                icon: <FaWordpress />,
                link: "/services/woocommerce-development",
                technologies: [
                  { name: "WooCommerce", image: "/images/tech/WooCommerce.png" },
                  { name: "WordPress", image: "/images/tech/WordPress.png" },
                  { name: "Stripe", image: "/images/tech/WooCommerce.png" },
                  { name: "PayPal", image: "/images/tech/WooCommerce.png" },
                ],
              },
              {
                title: "Magento Development",
                description: "Enterprise-grade eCommerce platforms.",
                icon: <FaShoppingCart />,
                link: "/services/magento-development",
                technologies: [
                  { name: "Magento 2", image: "/images/tech/Adobe-Commerce-(Magneto).png" },
                  { name: "Adobe Commerce", image: "/images/tech/Adobe-Commerce-(Magneto).png" },
                  { name: "PWA", image: "/images/tech/pwa.png" },
                  { name: "Headless Commerce", image: "/images/tech/headless-commerce.png" },
                ],
              },
              {
                title: "Multi-Vendor Marketplace",
                description: "Marketplace platforms like Amazon or Etsy.",
                icon: <FaShoppingCart />,
                link: "/services/multivendor-ecommerce-development",
                technologies: [
                  { name: "Vendor Management", image: "/images/tech/vendor-management.png" },
                  { name: "Commission System", image: "/images/tech/commission.png" },
                  { name: "Multi-store", image: "/images/tech/multi-store.png" },
                ],
              },
            ]}
          />

          {/* Blockchain Development */}
          <ServiceCategory
            title="Blockchain Development"
            categoryLink="/services/blockchain-development"
            icon={<FaBitcoin className="text-sky-500" />}
            description="Secure, transparent blockchain solutions for modern businesses."
            color="bg-sky-500"
            services={[
              {
                title: "Smart Contract Development",
                description: "Secure smart contracts on Ethereum, Polygon, and more.",
                icon: <FaCode />,
                link: "/services/smart-contract-development",
                technologies: [
                  { name: "Solidity", image: "/images/tech/Solidity.png" },
                  { name: "Hardhat", image: "/images/tech/Hardhat.png" },
                  { name: "Truffle", image: "/images/tech/Hardhat.png" },
                  { name: "Remix", image: "/images/tech/Next.js.png" },
                  { name: "Rust", image: "/images/tech/Rust.png" },
                ],
              },
              {
                title: "Crypto Wallet Development",
                description: "Secure cryptocurrency wallets for Web3.",
                icon: <FaBitcoin />,
                link: "/services/crypto-wallet-development",
                technologies: [
                  { name: "Web3.js", image: "/images/tech/Web3js.png" },
                  { name: "Ethers.js", image: "/images/tech/Ethers.png" },
                  { name: "MetaMask", image: "/images/tech/MetaMask.png" },
                  { name: "WalletConnect", image: "/images/tech/WalletConnect.png" },
                ],
              },
              {
                title: "NFT Marketplace Development",
                description: "Complete NFT marketplace platforms.",
                icon: <FaBitcoin />,
                link: "/services/nft-marketplace-development",
                technologies: [
                  { name: "IPFS", image: "/images/tech/IPFS.png" },
                  { name: "ERC-721", image: "/images/tech/ERC-721.png" },
                  { name: "ERC-1155", image: "/images/tech/ERC-1155.png" },
                  { name: "Marketplace", image: "/images/tech/marketplace.png" },
                ],
              },
              {
                title: "DApp Development",
                description: "Decentralized applications on blockchain.",
                icon: <FaCode />,
                link: "/services/dapp-development",
                technologies: [
                  { name: "React", image: "/images/tech/React.png" },
                  { name: "Web3", image: "/images/tech/Web3.png" },
                  { name: "Moralis", image: "/images/tech/moralis.png" },
                  { name: "The Graph", image: "/images/tech/The-Graph.png" },
                ],
              },
            ]}
          />

          {/* AI & ML Services */}
          <ServiceCategory
            title="AI & ML Services"
            categoryLink="/services/ai-ml"
            icon={<FaRobot className="text-sky-500" />}
            description="AI and ML solutions to automate decisions and unlock insights."
            color="bg-sky-500"
            services={[
              {
                title: "AI Development",
                description: "Custom AI solutions for business automation.",
                icon: <FaRobot />,
                link: "/services/ai-development",
                technologies: [
                  { name: "TensorFlow", image: "/images/tech/TensorFlow.png" },
                  { name: "PyTorch", image: "/images/tech/PyTorch.png" },
                  { name: "OpenAI", image: "/images/tech/PyTorch.png" },
                  { name: "LangChain", image: "/images/tech/Python.png" },
                ],
              },
              {
                title: "Chatbot Development",
                description: "Intelligent conversational AI chatbots.",
                icon: <FaBullhorn />,
                link: "/services/chatbot-development",
                technologies: [
                  { name: "Dialogflow", image: "/images/tech/dialogflow.png" },
                  { name: "Rasa", image: "/images/tech/rasa.png" },
                  { name: "GPT Models", image: "/images/tech/gpt.png" },
                  { name: "NLP", image: "/images/tech/nlp.png" },
                ],
              },
              {
                title: "Machine Learning Development",
                description: "Predictive models and ML pipelines.",
                icon: <FaCode />,
                link: "/services/machine-learning-development",
                technologies: [
                  { name: "Scikit-learn", image: "/images/tech/scikit-learn.png" },
                  { name: "XGBoost", image: "/images/tech/xgboost.png" },
                  { name: "MLflow", image: "/images/tech/mlflow.png" },
                  { name: "Data Pipelines", image: "/images/tech/data-pipeline.png" },
                ],
              },
            ]}
          />

          {/* DevOps & Cloud */}
          <ServiceCategory
            title="DevOps & Cloud"
            categoryLink="/services/devops-cloud"
            icon={<FaCogs className="text-sky-500" />}
            description="Automate deployment pipelines and improve reliability."
            color="bg-sky-500"
            services={[
              {
                title: "Cloud Migration",
                description: "Seamless migration to cloud infrastructure.",
                icon: <FaCogs />,
                link: "/services/cloud-migration",
                technologies: [
                  { name: "AWS", image: "/images/tech/AWS.png" },
                  { name: "Azure", image: "/images/tech/Azure.png" },
                  { name: "Google Cloud", image: "/images/tech/Google-Cloud.png" },
                  { name: "Terraform", image: "/images/tech/HashiCorp-Terraform.png" },
                ],
              },
              {
                title: "CI/CD Pipeline",
                description: "Automated deployment pipelines for faster releases.",
                icon: <FaCogs />,
                link: "/services/ci-cd-pipeline",
                technologies: [
                  { name: "GitHub Actions", image: "/images/tech/GitHub-Actions.png" },
                  { name: "Jenkins", image: "/images/tech/Jenkins.png" },
                  { name: "GitLab CI", image: "/images/tech/GitLab.png" },
                  { name: "Docker", image: "/images/tech/Docker.png" },
                ],
              },
              {
                title: "Server Security Optimization",
                description: "Secure your servers against modern threats.",
                icon: <FaShieldAlt />,
                link: "/services/server-security-optimization",
                technologies: [
                  { name: "Firewall", image: "/images/tech/firewall.png" },
                  { name: "SSL/TLS", image: "/images/tech/ssl.png" },
                  { name: "WAF", image: "/images/tech/waf.png" },
                  { name: "Security Scanning", image: "/images/tech/security-scanning.png" },
                ],
              },
            ]}
          />

          {/* IoT & Embedded (added) */}
          <ServiceCategory
            title="IoT & Embedded"
            categoryLink="/services/iot-embedded"
            icon={<FaMicrochip className="text-sky-500" />}
            description="Smart devices, sensors, and embedded systems that connect seamlessly with your platforms."
            color="bg-sky-500"
            services={[
              {
                title: "IoT App Development",
                description: "IoT dashboards, device control apps, and real-time monitoring.",
                icon: <FaMicrochip />,
                link: "/services/iot-app-development",
                technologies: [
                  { name: "MQTT", image: "/images/tech/Arduino.png" },
                  { name: "Node.js", image: "/images/tech/node.png" },
                  { name: "AWS IoT", image: "/images/tech/AWS.png" },
                  { name: "Firebase", image: "/images/tech/Firebase.png" },
                ],
              },
              {
                title: "Embedded Development",
                description: "Firmware development for boards and custom hardware.",
                icon: <FaCogs />,
                link: "/services/embedded-development",
                technologies: [
                  { name: "C/C++", image: "/images/tech/C++-(CPlusPlus).png" },
                  { name: "RTOS", image: "/images/tech/rtos.png" },
                  { name: "ESP32", image: "/images/tech/esp32.png" },
                  { name: "Raspberry Pi", image: "/images/tech/Raspberry-Pi.png" },
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
const fallback = "/images/logo.png";

function TechIcon({ src, alt }) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => setImgSrc(src), [src]);

  return (
    <Image
      src={imgSrc || fallback}
      alt={alt}
      width={48}
      height={48}
      className="h-12 w-12 mb-1 object-contain"
      onError={() => {
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
    />
  );
}


function ServiceCategory({ title, categoryLink, icon, description, services }) {
  const [activeService, setActiveService] = useState(0);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.8, 1], [0.95, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "2%"]);

  const active = services?.[activeService];



  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, y }}
      className="sticky top-24 bg-white rounded-3xl border border-primary shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <div className="flex items-start gap-4 mb-8">
          <div className="p-3 bg-sky-50 rounded-xl text-sky-600">{icon}</div>

          <div>
            <h3 className="text-lg md:text-2xl font-bold text-sky-900">
              {categoryLink ? (
                <Link href={categoryLink} className="hover:text-primary transition-colors">
                  {title}
                </Link>
              ) : (
                title
              )}
            </h3>
            <p className="text-sky-600 mt-1 hidden lg:block">{description}</p>
          </div>
        </div>

        <div className="flex flex-row gap-4 mb-8 pb-4 overflow-x-scroll hide-scrollbar">
          {services.map((service, index) => (
            <button
              key={service.title}
              onClick={() => setActiveService(index)}
              className={`px-5 py-2 rounded-full font-medium transition-all ${activeService === index
                ? "bg-gradient-to-l from-sky-400 via-primary to-sky-600 text-white shadow-lg shadow-sky-200 text-sm lg:text-md whitespace-nowrap"
                : "bg-white text-sky-600 hover:bg-gray-50 border border-primary whitespace-nowrap text-sm"
                }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
          {/* Left card */}
          <Link href={active?.link || "/services"} className="group flex flex-col items-center justify-center">
            <div className="flex flex-col items-center cursor-pointer">
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
                  {active?.icon}
                </i>
              </div>

              <h4
                className="
                  text-xl font-bold text-sky-900 mb-2 text-center
                  transition-colors duration-500 ease-in-out
                  group-hover:text-primary
                "
              >
                {active?.title}
              </h4>
            </div>

            <p className="text-gray-600 text-center flex flex-col items-center text-md md:text-md">
              {active?.description}...
              <span className="flex flex-row items-center gap-2 group-hover:text-primary group-hover:gap-4">
                view more <FaArrowRight />
              </span>
            </p>
          </Link>

          {/* Right tech chips */}
          <div>
            <h4 className="text-md md:text-lg font-semibold text-sky-900 mb-4 text-center md:text-start">
              Technologies & Tools
            </h4>

            <div className="flex flex-row gap-3 overflow-x-auto hide-scrollbar whitespace-nowrap px-2">
              {(active?.technologies || []).map((tech) => (
                <div
                  key={tech.name}
                  className="
                    inline-flex flex-col items-center
                    px-4 py-2
                    bg-sky50 text-sky-700
                    rounded-full font-medium
                    whitespace-nowrap
                  "
                >
                  <TechIcon src={tech.image} alt={tech.name} />

                  <span className="text-xs">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}






























// Required images (public/images/tech)
// kotlin.png

// java.png

// jetpack-compose.png

// android-studio.png

// material-design.png

// swift.png

// swiftui.png

// xcode.png

// uikit.png

// core-data.png

// react-native.png

// javascript.png

// typescript.png

// expo.png

// native-modules.png

// ionic.png

// cordova.png

// capacitor.png

// angular.png

// vue.png

// flutter.png

// dart.png

// firebase.png

// riverpod.png

// bloc.png

// figma.png

// sketch.png

// adobe-xd.png

// prototyping.png

// user-testing.png

// react.png

// nextjs.png

// nodejs.png

// tailwind.png

// wordpress.png

// strapi.png

// sanity.png

// contentful.png

// headless-cms.png

// mongodb.png

// express.png

// api.png

// docker.png

// kubernetes.png

// aws.png

// microservices.png

// scalability.png

// shopify.png

// liquid.png

// shopify-apps.png

// payment-gateway.png

// woocommerce.png

// stripe.png

// paypal.png

// magento.png

// adobe-commerce.png

// pwa.png

// headless-commerce.png

// vendor-management.png

// commission.png

// multi-store.png

// solidity.png

// hardhat.png

// truffle.png

// remix.png

// rust.png

// web3js.png

// ethers.png

// metamask.png

// walletconnect.png

// ipfs.png

// erc-721.png

// erc-1155.png

// marketplace.png

// web3.png

// moralis.png

// the-graph.png

// tensorflow.png

// pytorch.png

// openai.png

// langchain.png

// dialogflow.png

// rasa.png

// gpt.png

// nlp.png

// scikit-learn.png

// xgboost.png

// mlflow.png

// data-pipeline.png

// azure.png

// gcp.png

// terraform.png

// github-actions.png

// jenkins.png

// gitlab-ci.png

// firewall.png

// ssl.png

// waf.png

// security-scanning.png

// mqtt.png

// aws-iot.png

// cpp.png

// rtos.png

// esp32.png

// raspberry-pi.png