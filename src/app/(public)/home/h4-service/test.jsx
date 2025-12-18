"use client";
// import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import {
  FaMobileAlt,       // Mobile App Development
  FaDesktop,         // Web and CMS Development
  FaShoppingCart,    // eCommerce Development
  FaBlockchain,      // Blockchain Development
  FaGamepad,         // Game Development
  FaSalesforce,      // Salesforce Solution
  FaRobot,           // AI & ML
  FaMicrochip,       // IoT & Embedded
  FaCogs,             // DevOps
  FaDatabase,
} from "react-icons/fa";




const data = [
  {
    title: "App Development",
    icon: <FaMobileAlt/>,
    description: "We build high‑performance native and cross‑platform apps.",
    tabs: ["Android", "iOS"],
    icons: {
      Android: [
        "/images/tech/kotlin.png",          // Kotlin
        "/images/tech/java.png",            // Java
        "/images/tech/jetpack-compose.png", // Jetpack Compose
        "/images/tech/flutter.png",         // Flutter (cross‑platform)
        "/images/tech/react-native.png",    // React Native (cross‑platform)
      ],
      iOS: [
        "/images/tech/swift.png",           // Swift
        "/images/tech/objective-c.png",     // Objective‑C
        "/images/tech/swiftui.png",         // SwiftUI
        "/images/tech/flutter.png",         // Flutter (cross‑platform)
        "/images/tech/react-native.png",    // React Native (cross‑platform)
      ],
    },
  },
  {
    title: "Web Development",
    icon: <FaDesktop/>,
    description: "Creating fast, responsive, and beautiful web apps.",
    tabs: ["Frontend", "Backend"],
    icons: {
      Frontend: [
        "/images/tech/html5.png",         // HTML5
        "/images/tech/css3.png",          // CSS3
        "/images/tech/javascript.png",    // JavaScript
        "/images/tech/typescript.png",    // TypeScript
        "/images/tech/react.png",         // React
        "/images/tech/vue.png",           // Vue.js
        "/images/tech/angular.png",       // Angular
        "/images/tech/svelte.png",        // Svelte
        "/images/tech/nextjs.png",        // Next.js
        "/images/tech/gatsby.png",        // Gatsby
      ],
      Backend: [
        "/images/tech/node.png",          // Node.js
        "/images/tech/express.png",       // Express.js
        "/images/tech/laravel.png",       // Laravel
        "/images/tech/django.png",        // Django
        "/images/tech/flask.png",         // Flask
        "/images/tech/rails.png",         // Ruby on Rails
        "/images/tech/spring-boot.png",   // Spring Boot
        "/images/tech/net.png",           // .NET Core
        "/images/tech/golang.png",        // Go
        "/images/tech/php.png",           // PHP
      ],
    },
  },
  {
    title: "Digital Marketing",
    icon: <FaSalesforce/>,
    description: "SEO, SEM, social media, and content strategies.",
    tabs: ["SEO", "PPC"],
    icons: {
      SEO: [
        "/images/tech/seo.png",
        "/images/tech/seo.png",
        "/images/tech/seo.png",
      ],
      PPC: [
        "/images/tech/ppc.png",
        "/images/tech/ppc.png",
        "/images/tech/ppc.png",
      ],
    },
  },

    {
    title: "Database Development",
    icon: <FaDatabase/>, // use a database icon component
    description: "Designing and managing relational & NoSQL databases.",
    tabs: ["SQL", "NoSQL", "Tools"],
    icons: {
      SQL: [
        "/images/tech/mysql.png",       // MySQL
        "/images/tech/postgresql.png",  // PostgreSQL
        "/images/tech/sqlite.png",      // SQLite
        "/images/tech/azure-sql.png",   // Azure SQL Database
      ],
      NoSQL: [
        "/images/tech/mongodb.png",     // MongoDB
        "/images/tech/redis.png",       // Redis
        "/images/tech/cassandra.png",   // Apache Cassandra
        "/images/tech/cosmosdb.png",    // Azure Cosmos DB
      ],
      Tools: [
        "/images/tech/dbeaver.png",     // DBeaver
        "/images/tech/sql-developer.png", // Oracle SQL Developer
      ],
    },
  },
];



// import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";



export default function Tech_Slider() {

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      autoRaf: true,
    });

    // Listen for the scroll event and log the event data
    lenis.on("scroll", (e) => {
      console.log(e);
    });
  }, []);



  return (
    <div
      className="   "
    // style={{
    //   background:
    //     "linear-gradient(90deg,rgba(40, 175, 223, 1) 0%, rgba(211, 238, 248, 1) 0%, rgba(255, 255, 255, 1) 100%, rgba(230, 230, 230, 1) 0%)",
    // }}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-28">


        <div className=" pt-[69px] text-3xl md:text-4xl lg:text-[50px] flex justify-center gap-[10px] ">
          <p className="text-black ">Technologies</p>
          <p className="text-[#28AFDF] font-semibold">We Work On</p>
        </div>
        <div className="flex justify-center">
          <div className=" w-full max-w-[1265px] mb-[200px] mt-[80px] ">
            {data.map((item, i) => (
              <Card key={i} item={item} i={i} dataLenght={data.length} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


function Card({ item, i, dataLength }) {
  const [selectedTab, setSelectedTab] = useState(item.tabs[0]); 
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });
  const scaleMotion = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const scale = i === dataLength - 1 ? 1 : scaleMotion;

  return (
    <div
      ref={ref}
      className="sticky top-[80px] z-10"
      style={{ zIndex: dataLength + i }}
    >
      <motion.div
        style={{ scale }}
        className="
          w-auto h-[401px] mb-10 bg-white rounded-3xl 
          flex flex-col pt-[40px] pl-[40px] border-2 border-primary shadow-top-2 shadow-md
        "
      >
        <h3 className="text-3xl font-bold mb-4 text-primary flex flex-row gap-2"><span>{item.icon}</span>{item.title}</h3>
        <p className="text-sky-800 text-lg">{item.description}</p>

        {/* 1️⃣ Tab buttons */}
        <div className="flex gap-4 mt-6">
          {item.tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`
                px-6 py-1 rounded-lg mt-2
                border
                ${selectedTab === tab ? "bg-primary text-white" : "border-primary text-primary"}
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 2️⃣ Icon carousel (manual scroll on small screens) */}
        <div className="
            mt-[3rem] flex items-center space-x-8 pb-4 
            overflow-x-auto whitespace-nowrap hide-scrollbar
            lgoverflow-x-visible
          "
        >
          {item.icons[selectedTab].map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={selectedTab + " icon " + idx}
              className="flex-shrink-0 h-20 w-auto"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}


