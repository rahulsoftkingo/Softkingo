import React from 'react';
import Image from 'next/image';
import { Code, Database, Cloud, Shield, Zap, Globe, ArrowRight } from 'lucide-react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function CloneTechStack({ data }) {
  const defaultTech = [
    { name: "React Native", image: "/images/tech/react-native.png" },
    { name: "Node.js", image: "/images/tech/nodejs.png" },
    { name: "MongoDB", image: "/images/tech/mongodb.png" },
    { name: "AWS", image: "/images/tech/aws.png" },
    { name: "Docker", image: "/images/tech/docker.png" },
    { name: "Redis", image: "/images/tech/redis.png" }
  ];

  // Safe render function to handle malformed data
  const safeRenderTech = (tech) => {
    if (typeof tech === 'string') return { name: tech, image: '/images/tech/default.png' };
    if (typeof tech === 'object' && tech !== null) {
      return {
        name: typeof tech.name === 'string' ? tech.name : 
              typeof tech.title === 'string' ? tech.title : 'Technology',
        image: typeof tech.image === 'string' ? tech.image : '/images/tech/default.png'
      };
    }
    return { name: 'Technology', image: '/images/tech/default.png' };
  };

  const technologies = data?.items?.length > 0 ? data.items : defaultTech;

  return (
    <section className="py-20 lg:py-28 px-6 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/circuit.svg')] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <CommonTitle 
          title={data?.title || "Technology Stack We Use"}
          subtitle={data?.subtitle || "Cutting-edge technologies to build scalable, secure, and high-performance clone applications"}
          pill={true}
          align="center"
        />

        {/* Tech Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {(Array.isArray(technologies) ? technologies : []).map((tech, i) => {
            const safeTech = safeRenderTech(tech);
            return (
              <div key={i} className="group">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col items-center justify-center">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <Image 
                      src={safeTech.image} 
                      alt={safeTech.name}
                      width={60}
                      height={60}
                      className="relative z-10 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-700 text-center group-hover:text-sky-600 transition-colors">
                    {safeTech.name}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Code className="text-sky-500" size={32} />,
              title: "Frontend Development",
              description: "Modern, responsive user interfaces with React Native and Flutter",
              tech: ["React Native", "Flutter", "TypeScript"]
            },
            {
              icon: <Database className="text-sky-500" size={32} />,
              title: "Backend & Database",
              description: "Scalable server architecture with Node.js and MongoDB",
              tech: ["Node.js", "MongoDB", "PostgreSQL"]
            },
            {
              icon: <Cloud className="text-sky-500" size={32} />,
              title: "Cloud & DevOps",
              description: "Enterprise-grade deployment with AWS and containerization",
              tech: ["AWS", "Docker", "Kubernetes"]
            }
          ].map((category, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center group-hover:bg-sky-100 group-hover:scale-110 transition-all duration-300">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {category.title}
                  </h3>
                </div>
              </div>
              
              <p className="text-slate-600 mb-6 leading-relaxed">
                {category.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {category.tech.map((item, j) => (
                  <span key={j} className="px-3 py-1 bg-sky-50 text-sky-700 text-xs font-semibold rounded-full border border-sky-200 hover:bg-sky-100 transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-8 text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-sky-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                Need Custom Technology Solutions?
              </h3>
              <p className="text-sky-100 mb-6 max-w-2xl mx-auto">
                We can integrate any specific technology stack your business requires
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-white text-sky-600 px-6 py-3 rounded-xl font-semibold hover:bg-sky-50 hover:-translate-y-1 transition-all duration-300"
              >
                Discuss Tech Requirements <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
