"use client";

import { useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

// --- ALL TECH (auto-built from your CSV list) ---
const TECH = [
  { name: "Kotlin", image: "/images/tech/kotlin.png", tag: "Mobile" },
  { name: "Java", image: "/images/tech/java.png", tag: "Mobile" },
  { name: "Jetpack Compose", image: "/images/tech/jetpack-compose.png", tag: "Mobile" },
  { name: "Android Studio", image: "/images/tech/android-studio.png", tag: "Mobile" },
  { name: "Material Design", image: "/images/tech/material-design.png", tag: "Design" },

  { name: "Swift", image: "/images/tech/swift.png", tag: "Mobile" },
  { name: "SwiftUI", image: "/images/tech/swiftui.png", tag: "Mobile" },
  { name: "Xcode", image: "/images/tech/xcode.png", tag: "Mobile" },
  { name: "UIKit", image: "/images/tech/uikit.png", tag: "Mobile" },
  { name: "Core Data", image: "/images/tech/core-data.png", tag: "Mobile" },

  { name: "React Native", image: "/images/tech/react-native.png", tag: "Mobile" },
  { name: "JavaScript", image: "/images/tech/javascript.png", tag: "Web" },
  { name: "TypeScript", image: "/images/tech/typescript.png", tag: "Web" },
  { name: "Expo", image: "/images/tech/expo.png", tag: "Mobile" },
  { name: "Native Modules", image: "/images/tech/native-modules.png", tag: "Mobile" },

  { name: "Ionic", image: "/images/tech/ionic.png", tag: "Mobile" },
  { name: "Cordova", image: "/images/tech/cordova.png", tag: "Mobile" },
  { name: "Capacitor", image: "/images/tech/capacitor.png", tag: "Mobile" },
  { name: "Angular", image: "/images/tech/angular.png", tag: "Web" },
  { name: "Vue.js", image: "/images/tech/vue.png", tag: "Web" },

  { name: "Flutter", image: "/images/tech/flutter.png", tag: "Mobile" },
  { name: "Dart", image: "/images/tech/dart.png", tag: "Mobile" },
  { name: "Firebase", image: "/images/tech/firebase.png", tag: "Cloud" },
  { name: "Riverpod", image: "/images/tech/riverpod.png", tag: "Mobile" },
  { name: "BLoC", image: "/images/tech/bloc.png", tag: "Mobile" },

  { name: "Figma", image: "/images/tech/figma.png", tag: "Design" },
  { name: "Sketch", image: "/images/tech/sketch.png", tag: "Design" },
  { name: "Adobe XD", image: "/images/tech/adobe-xd.png", tag: "Design" },
  { name: "Prototyping", image: "/images/tech/prototyping.png", tag: "Design" },
  { name: "User Testing", image: "/images/tech/user-testing.png", tag: "Design" },

  { name: "React", image: "/images/tech/react.png", tag: "Web" },
  { name: "Next.js", image: "/images/tech/nextjs.png", tag: "Web" },
  { name: "Node.js", image: "/images/tech/nodejs.png", tag: "Backend" },
  { name: "Tailwind CSS", image: "/images/tech/tailwind.png", tag: "Web" },
  { name: "WordPress", image: "/images/tech/wordpress.png", tag: "CMS" },
  { name: "Strapi", image: "/images/tech/strapi.png", tag: "CMS" },
  { name: "Sanity", image: "/images/tech/sanity.png", tag: "CMS" },
  { name: "Contentful", image: "/images/tech/contentful.png", tag: "CMS" },
  { name: "Headless CMS", image: "/images/tech/headless-cms.png", tag: "CMS" },

  { name: "MongoDB", image: "/images/tech/mongodb.png", tag: "Database" },
  { name: "Express", image: "/images/tech/express.png", tag: "Backend" },
  { name: "API Development", image: "/images/tech/api.png", tag: "Backend" },

  { name: "Docker", image: "/images/tech/docker.png", tag: "DevOps" },
  { name: "Kubernetes", image: "/images/tech/kubernetes.png", tag: "DevOps" },
  { name: "AWS", image: "/images/tech/aws.png", tag: "Cloud" },
  { name: "Microservices", image: "/images/tech/microservices.png", tag: "Backend" },
  { name: "Scalability", image: "/images/tech/scalability.png", tag: "Backend" },

  { name: "Shopify", image: "/images/tech/shopify.png", tag: "eCommerce" },
  { name: "Liquid", image: "/images/tech/liquid.png", tag: "eCommerce" },
  { name: "Shopify Apps", image: "/images/tech/shopify-apps.png", tag: "eCommerce" },
  { name: "Payment Gateways", image: "/images/tech/payment-gateway.png", tag: "eCommerce" },
  { name: "WooCommerce", image: "/images/tech/woocommerce.png", tag: "eCommerce" },
  { name: "Stripe", image: "/images/tech/stripe.png", tag: "eCommerce" },
  { name: "PayPal", image: "/images/tech/paypal.png", tag: "eCommerce" },
  { name: "Magento", image: "/images/tech/magento.png", tag: "eCommerce" },
  { name: "Adobe Commerce", image: "/images/tech/adobe-commerce.png", tag: "eCommerce" },
  { name: "PWA", image: "/images/tech/pwa.png", tag: "Web" },
  { name: "Headless Commerce", image: "/images/tech/headless-commerce.png", tag: "eCommerce" },
  { name: "Vendor Management", image: "/images/tech/vendor-management.png", tag: "eCommerce" },
  { name: "Commission System", image: "/images/tech/commission.png", tag: "eCommerce" },
  { name: "Multi-store", image: "/images/tech/multi-store.png", tag: "eCommerce" },

  { name: "Solidity", image: "/images/tech/solidity.png", tag: "Blockchain" },
  { name: "Hardhat", image: "/images/tech/hardhat.png", tag: "Blockchain" },
  { name: "Truffle", image: "/images/tech/truffle.png", tag: "Blockchain" },
  { name: "Remix", image: "/images/tech/remix.png", tag: "Blockchain" },
  { name: "Rust", image: "/images/tech/rust.png", tag: "Blockchain" },
  { name: "Web3.js", image: "/images/tech/web3js.png", tag: "Blockchain" },
  { name: "Ethers.js", image: "/images/tech/ethers.png", tag: "Blockchain" },
  { name: "MetaMask", image: "/images/tech/metamask.png", tag: "Blockchain" },
  { name: "WalletConnect", image: "/images/tech/walletconnect.png", tag: "Blockchain" },
  { name: "IPFS", image: "/images/tech/ipfs.png", tag: "Blockchain" },
  { name: "ERC-721", image: "/images/tech/erc-721.png", tag: "Blockchain" },
  { name: "ERC-1155", image: "/images/tech/erc-1155.png", tag: "Blockchain" },
  { name: "Marketplace", image: "/images/tech/marketplace.png", tag: "Blockchain" },
  { name: "Web3", image: "/images/tech/web3.png", tag: "Blockchain" },
  { name: "Moralis", image: "/images/tech/moralis.png", tag: "Blockchain" },
  { name: "The Graph", image: "/images/tech/the-graph.png", tag: "Blockchain" },

  { name: "TensorFlow", image: "/images/tech/tensorflow.png", tag: "AI/ML" },
  { name: "PyTorch", image: "/images/tech/pytorch.png", tag: "AI/ML" },
  { name: "OpenAI", image: "/images/tech/openai.png", tag: "AI/ML" },
  { name: "LangChain", image: "/images/tech/langchain.png", tag: "AI/ML" },
  { name: "Dialogflow", image: "/images/tech/dialogflow.png", tag: "AI/ML" },
  { name: "Rasa", image: "/images/tech/rasa.png", tag: "AI/ML" },
  { name: "GPT Models", image: "/images/tech/gpt.png", tag: "AI/ML" },
  { name: "NLP", image: "/images/tech/nlp.png", tag: "AI/ML" },
  { name: "Scikit-learn", image: "/images/tech/scikit-learn.png", tag: "AI/ML" },
  { name: "XGBoost", image: "/images/tech/xgboost.png", tag: "AI/ML" },
  { name: "MLflow", image: "/images/tech/mlflow.png", tag: "AI/ML" },
  { name: "Data Pipelines", image: "/images/tech/data-pipeline.png", tag: "AI/ML" },

  { name: "Azure", image: "/images/tech/azure.png", tag: "Cloud" },
  { name: "Google Cloud", image: "/images/tech/gcp.png", tag: "Cloud" },
  { name: "Terraform", image: "/images/tech/terraform.png", tag: "DevOps" },
  { name: "GitHub Actions", image: "/images/tech/github-actions.png", tag: "DevOps" },
  { name: "Jenkins", image: "/images/tech/jenkins.png", tag: "DevOps" },
  { name: "GitLab CI", image: "/images/tech/gitlab-ci.png", tag: "DevOps" },

  { name: "Firewall", image: "/images/tech/firewall.png", tag: "Security" },
  { name: "SSL/TLS", image: "/images/tech/ssl.png", tag: "Security" },
  { name: "WAF", image: "/images/tech/waf.png", tag: "Security" },
  { name: "Security Scanning", image: "/images/tech/security-scanning.png", tag: "Security" },

  { name: "MQTT", image: "/images/tech/mqtt.png", tag: "IoT" },
  { name: "AWS IoT", image: "/images/tech/aws-iot.png", tag: "IoT" },
  { name: "C/C++", image: "/images/tech/cpp.png", tag: "IoT" },
  { name: "RTOS", image: "/images/tech/rtos.png", tag: "IoT" },
  { name: "ESP32", image: "/images/tech/esp32.png", tag: "IoT" },
  { name: "Raspberry Pi", image: "/images/tech/raspberry-pi.png", tag: "IoT" },
];

const TAGS = ["All", "Web", "Backend", "Mobile", "Design", "CMS", "Database", "DevOps", "Cloud", "Security", "AI/ML", "Blockchain", "eCommerce", "IoT"];

const fallback = "/images/logo.png";

function chunkIntoTwoRows(list) {
  const mid = Math.ceil(list.length / 2);
  return [list.slice(0, mid), list.slice(mid)];
}

/** Bigger, cleaner card (no heavy tilt to keep speed smooth) */
function TechCard({ tech }) {
  const [imgSrc, setImgSrc] = useState(tech.image);

  useEffect(() => {
    setImgSrc(tech.image);
  }, [tech.image]);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative w-[240px] sm:w-[260px]"
    >
      {/* gradient border shell */}
      <div className="rounded-2xl p-[1px] bg-gradient-to-r from-sky-200 via-sky-100 to-indigo-200">
        <div className="relative rounded-2xl bg-white/85 backdrop-blur-xl border border-white/60 px-5 py-4 shadow-sm group-hover:shadow-[0_22px_55px_-25px_rgba(2,132,199,0.65)] transition-shadow">
          {/* subtle glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-sky-500/10" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center overflow-hidden">
              {/* <Image
                src={tech.image ||fallback}
                alt={tech.name}
                width={44}
                height={44}
                className="h-10 w-10 object-contain"
                      onError={() => setImgSrc(fallback)}

              /> */}
               <Image
      src={imgSrc || fallback}
      alt={tech.name}
      width={44}
      height={44}
      className="h-10 w-10 object-contain"
      onError={() => setImgSrc(fallback)}
    />
            </div>

            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-slate-900 truncate">
                {tech.name}
              </p>
              <p className="text-[12px] text-slate-500 truncate">{tech.tag}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Smooth marquee row (constant speed + low CPU) */
function MarqueeRow({ items, duration = 120, reverse = false }) {
  const [paused, setPaused] = useState(false);
  const loop = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

      <motion.div
        className="flex gap-5 w-max py-2"
        animate={paused ? {} : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={paused ? {} : { duration, ease: "linear", repeat: Infinity }}
      >
        {loop.map((t, idx) => (
          <TechCard tech={t} key={`${t.name}-${idx}`} />
        ))}
      </motion.div>
    </div>
  );
}


export default function H10TechnologyAdvanced() {
  const reduce = useReducedMotion();
  const [activeTag, setActiveTag] = useState("All");

  const filtered = useMemo(() => {
    if (activeTag === "All") return TECH;
    return TECH.filter((t) => t.tag === activeTag);
  }, [activeTag]);

  const [rowA, rowB] = useMemo(() => chunkIntoTwoRows(filtered), [filtered]);

  return (
    <section className="bg-gradient-to-br from-white via-50 to-sky-100 py-10 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header: portfolio same feel */}
        <div className="text-center mb-8 sm:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: -18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-sky-900"
          >
            Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500">
              Technology
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
          >
            A practical, production-focused stack used across mobile, web, cloud, AI, blockchain and IoT.
          </motion.p>
        </div>

        {/* Tabs (clean, compact) */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all
                ${
                  activeTag === tag
                    ? "bg-gradient-to-r from-sky-600 to-sky-500 text-white border-transparent shadow-md shadow-sky-200"
                    : "bg-white text-sky-700 border-sky-200 hover:bg-sky-50"
                }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* BIG container (the main “holder card”) */}
        <div className="rounded-[28px] border border-sky-100 bg-white/75 backdrop-blur-xl shadow-[0_18px_55px_-30px_rgba(2,132,199,0.35)] p-5 sm:p-7">
          {/* small top strip (nice representation) */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-slate-500">Stack preview</p>
              <p className="text-sm font-semibold text-slate-900">
                {activeTag === "All" ? "All technologies" : activeTag}
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-500">In active use</span>
            </div>
          </div>

          {reduce ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filtered.map((t) => (
                <TechCard key={t.name} tech={t} />
              ))}
            </div>
          ) : (
            <>
              {/* keep speed stable: fixed durations */}
              <MarqueeRow items={rowA} duration={90} reverse={false} />
              <div className="my-5 h-px bg-gradient-to-r from-transparent via-sky-100 to-transparent" />
              <MarqueeRow items={rowB} duration={105} reverse />
            </>
          )}
        </div>
      </div>
    </section>
  );
}