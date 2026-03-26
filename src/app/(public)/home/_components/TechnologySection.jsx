"use client"
import CommonTitle from "@/components/ui/CommonTitle";
import { useState } from "react";
import {
    SiAngular, SiBootstrap, SiCss3, SiFlutter, SiGraphql, SiHtml5,
    SiJavascript, SiLaravel, SiNodedotjs, SiNuxtdotjs, SiReact, SiVuedotjs,
    SiExpress, SiDjango, SiSpring, SiRubyonrails, SiPhp, SiPython, SiFastapi,
    SiMongodb, SiPostgresql, SiMysql, SiRedis, SiFirebase, SiSupabase,
    SiAmazon, SiVercel, SiNetlify, SiDocker, SiKubernetes, SiHeroku,

    SiWordpress, SiStrapi, SiContentful, SiSanity,
    SiGoogleanalytics, SiMailchimp, SiHubspot,
    SiArduino, SiRaspberrypi,
    SiJest, SiCypress, SiSelenium
} from "react-icons/si";


const technologiesData = {
    Frontend: [
        { name: 'React', icon: SiReact, color: '#61DAFB' },
        { name: 'Angular', icon: SiAngular, color: '#DD0031' },
        { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
        { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
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
    Databases: [
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
        { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
        { name: 'Redis', icon: SiRedis, color: '#DC382D' },
        { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
        { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' }
    ],
    Deployments: [
        { name: 'AWS', icon: SiAmazon, color: '#FF9900' },

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
    'Marketing Tools': [
        { name: 'Google Analytics', icon: SiGoogleanalytics, color: '#E37400' },
        { name: 'Mailchimp', icon: SiMailchimp, color: '#FFE01B' },
        { name: 'HubSpot', icon: SiHubspot, color: '#FF7A59' }
    ],
    IoT: [
        { name: 'Arduino', icon: SiArduino, color: '#00979D' },
        { name: 'Raspberry Pi', icon: SiRaspberrypi, color: '#A22846' }
    ],
    Testing: [
        { name: 'Jest', icon: SiJest, color: '#C21325' },
        { name: 'Cypress', icon: SiCypress, color: '#17202C' },
        { name: 'Selenium', icon: SiSelenium, color: '#43B02A' }
    ]
};

const sidebarItems = [
    'Frontend',
    'Backend',
    'Databases',
    'Deployments',
    'CMS',
    'Marketing Tools',
    'IoT',
    'Testing'
];

export default function TechView() {
    const [selectedTech, setSelectedTech] = useState('Frontend');

    return (
        <section className="bg-gradient-to-br from-white via-sky-50 to-sky-100 py-12 md:py-16 px-4 md:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 md:mb-12 text-center max-w-2xl mx-auto">

                    <CommonTitle
                        align="center"
                        pill={false}
                        title="Our "
                        gradientText="Technology"
                        subtitle="A practical, production-focused stack used across mobile, web, cloud, AI, blockchain and IoT."
                    />
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                    {/* Sidebar / Top Navigation */}
                    <aside className="w-full lg:w-64 bg-gradient-to-tl from-sky-300 via-sky-600 to-sky-400 rounded-xl p-2 md:p-4 lg:p-6 lg:sticky lg:top-4 h-fit">
                        <ul className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 lg:gap-1 lg:space-y-1 pb-2 lg:pb-0 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {sidebarItems.map((item) => (
                                <li
                                    key={item}
                                    onMouseEnter={() => setSelectedTech(item)} // Hover lag gaya yahan!
                                    onClick={() => setSelectedTech(item)}
                                    className={`px-4 py-3 rounded-lg cursor-pointer transition-all text-sm md:text-base whitespace-nowrap flex-shrink-0 snap-start ${selectedTech === item
                                            ? 'bg-white shadow-md font-semibold text-sky-800'
                                            : 'text-sky-50 hover:bg-white/20'
                                        }`}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Tech Grid */}
                    <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold pb-4 md:py-5 text-gray-800">{selectedTech}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 animate-fadeIn">
                            {technologiesData[selectedTech]?.map((tech, index) => (
                                <div
                                    key={index}
                                    className="bg-white hover:bg-sky-50 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1 border border-slate-100"
                                >
                                    <tech.icon
                                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-3 transition-transform group-hover:scale-110 duration-300"
                                        style={{ color: tech.color }}
                                    />
                                    <span className="text-xs md:text-sm font-medium text-gray-700 text-center line-clamp-1">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}