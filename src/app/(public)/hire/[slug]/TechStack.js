'use client';
import { useState } from 'react';
import {
    SiAngular, SiBootstrap, SiCss3, SiFlutter, SiGraphql, SiHtml5,
    SiJavascript, SiLaravel, SiNodedotjs, SiNuxtdotjs, SiReact, SiVuedotjs,
    SiExpress, SiDjango, SiSpring, SiRubyonrails, SiPhp, SiPython, SiFastapi,
    SiMongodb, SiPostgresql, SiMysql, SiRedis, SiFirebase, SiSupabase,
    SiVercel, SiNetlify, SiDocker, SiKubernetes, SiHeroku,
    SiWordpress, SiStrapi, SiContentful, SiSanity,
    SiKotlin, SiSwift, SiIonic,
    SiDotnet,
    SiTensorflow, SiPytorch, SiOpencv, SiScikitlearn,
    SiStackshare
} from "react-icons/si";
import { FaApple, FaAndroid, FaJava } from 'react-icons/fa';
import { BsAmazon } from 'react-icons/bs';
import { VscAzureDevops } from "react-icons/vsc";

// Full Tech Data
const technologiesData = {
    'Mobile App': [
        { name: 'iOS', icon: FaApple, color: '#000000' },
        { name: 'Android', icon: FaAndroid, color: '#3DDC84' },
        { name: 'React Native', icon: SiReact, color: '#61DAFB' },
        { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
        { name: 'Ionic', icon: SiIonic, color: '#3880FF' },
        { name: 'Swift', icon: SiSwift, color: '#F05138' },
        { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF' },
        { name: 'Java', icon: FaJava, color: '#007396' }
    ],
    Frontend: [
        { name: 'React', icon: SiReact, color: '#61DAFB' },
        { name: 'Angular', icon: SiAngular, color: '#DD0031' },
        { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
        { name: 'Next.js', icon: SiReact, color: '#000000' },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
        { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
        { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
        { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
        { name: 'Nuxt.js', icon: SiNuxtdotjs, color: '#00DC82' }
    ],
    Backend: [
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
        { name: 'Express.js', icon: SiExpress, color: '#000000' },
        { name: 'Django', icon: SiDjango, color: '#092E20' },
        { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
        { name: 'Spring Boot', icon: SiSpring, color: '#6DB33F' },
        { name: 'Ruby on Rails', icon: SiRubyonrails, color: '#CC0000' },
        { name: 'PHP', icon: SiPhp, color: '#777BB4' },
        { name: 'Python', icon: SiPython, color: '#3776AB' },
        { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
        { name: 'GraphQL', icon: SiGraphql, color: '#E10098' }
    ],
    Database: [
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
        { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
        { name: 'Redis', icon: SiRedis, color: '#DC382D' },
        { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
        { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' }
    ],
    DevOps: [
        { name: 'AWS', icon: BsAmazon, color: '#FF9900' },
        { name: 'Vercel', icon: SiVercel, color: '#000000' },
        { name: 'Netlify', icon: SiNetlify, color: '#00C7B7' },
        { name: 'Docker', icon: SiDocker, color: '#2496ED' },
        { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
        { name: 'Heroku', icon: SiHeroku, color: '#430098' }
    ],
    CMS: [
        { name: 'WordPress', icon: SiWordpress, color: '#21759B' },
        { name: 'Strapi', icon: SiStrapi, color: '#2F2E8B' },
        { name: 'Contentful', icon: SiContentful, color: '#2478CC' },
        { name: 'Sanity', icon: SiSanity, color: '#F03E2F' }
    ],
    AI: [
        { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
        { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
        { name: 'OpenCV', icon: SiOpencv, color: '#5C3EE8' },
        { name: 'Scikit-learn', icon: SiScikitlearn, color: '#F7931E' },
        { name: 'Python', icon: SiPython, color: '#3776AB' }
    ],
    Microsoft: [
        { name: '.NET', icon: SiDotnet, color: '#512BD4' },
        { name: 'Azure', icon: VscAzureDevops, color: '#0078D4' },
        { name: 'SQL Server', icon: SiMysql, color: '#CC2927' }
    ]
};

// Categories derived from object keys
const categories = Object.keys(technologiesData);

export default function TechStack() {
    const [activeTab, setActiveTab] = useState('Mobile App');

    return (
        <section className="w-full bg-gradient-to-r from-sky-500 via-sky-400 to-sky-300  ">
            <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                
                {/* Title */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-12">
                    Technology Stack
                </h2>

                {/* Category Tabs - Scrollable on Mobile */}
                <div className="flex overflow-x-auto md:flex-wrap justify-start md:justify-center gap-3 mb-10 pb-4 px-2 md:pb-0 hide-scrollbar snap-x">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveTab(category)}
                            className={`whitespace-nowrap px-10 py-2.5 rounded-full border border-white/40 transition-all duration-300 text-sm sm:text-base font-medium snap-start
                                ${activeTab === category
                                    ? 'bg-white text-black font-bold shadow-lg scale-105 ring-2 ring-white/50'
                                    : 'text-white hover:bg-white/10'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Tech Grid - Responsive Columns */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {technologiesData[activeTab]?.map((tech, index) => (
                        <TechCard key={index} tech={tech} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// Separate Tech Card Component
function TechCard({ tech }) {
    const Icon = tech.icon;

    return (
        <div className="bg-white rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center gap-3 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group border border-slate-100">
            {/* Icon with dynamic color on hover */}
            <div
                className="text-gray-400 group-hover:text-current group-hover:scale-110 transition-transform duration-300"
                style={{ color: 'inherit' }}
            >
                {Icon && (
                    <Icon 
                        size={40} 
                        className="transition-colors duration-300" 
                        style={{ color: tech.color }} // Apply color directly or via group-hover logic
                    />
                )}
            </div>

            {/* Name */}
            <span className="text-sm sm:text-base font-semibold text-slate-700 text-center">
                {tech.name}
            </span>
        </div>
    );
}










