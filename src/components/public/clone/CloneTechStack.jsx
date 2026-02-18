import React from 'react';
import Image from 'next/image';
import { Code, Database, Cloud, Shield, Zap, Globe } from 'lucide-react';
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

  const technologies = data?.items?.length > 0 ? data.items : defaultTech;

  return (
    <section className="py-20 lg:py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <CommonTitle 
            title={data?.title || "Technology Stack We Use"}
            subtitle={data?.subtitle || "Cutting-edge technologies to build scalable, secure, and high-performance clone applications"}
            pill={true}
        />

        {/* Tech Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {technologies.map((tech, i) => (
            <div key={i} className="group">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-sky-200 hover:bg-sky-50 transition-all duration-300 group-hover:scale-105">
                <div className="aspect-square relative mb-4">
                  {tech.image ? (
                    <Image 
                      src={tech.image} 
                      alt={tech.name} 
                      fill 
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-sky-100 rounded-xl flex items-center justify-center">
                      <Code className="text-sky-500" size={32} />
                    </div>
                  )}
                </div>
                <h4 className="text-center font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {tech.name}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Overview */}
        <div className="bg-gradient-to-r from-slate-50 to-sky-50 rounded-2xl p-8 border border-slate-200">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Database className="text-sky-500" size={28} />
                Robust Architecture
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: <Cloud className="text-sky-500" size={20} />,
                    title: "Cloud-Native",
                    description: "Built for scalability and reliability"
                  },
                  {
                    icon: <Shield className="text-sky-500" size={20} />,
                    title: "Enterprise Security",
                    description: "Multi-layer security architecture"
                  },
                  {
                    icon: <Zap className="text-sky-500" size={20} />,
                    title: "High Performance",
                    description: "Optimized for speed and efficiency"
                  },
                  {
                    icon: <Globe className="text-sky-500" size={20} />,
                    title: "Global CDN",
                    description: "Fast content delivery worldwide"
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-4">Development Stack</h4>
              <div className="space-y-3">
                {[
                  "Frontend: React Native, React.js",
                  "Backend: Node.js, Express.js",
                  "Database: MongoDB, PostgreSQL",
                  "Cloud: AWS, Google Cloud",
                  "DevOps: Docker, Kubernetes",
                  "Monitoring: New Relic, Sentry"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
