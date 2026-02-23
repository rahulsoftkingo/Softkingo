import React from 'react';
import Image from 'next/image';
import { CheckCircle2, Target, Zap, Shield, ArrowRight } from 'lucide-react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function CloneAbout({ data }) {
  return (
    <section className="py-20 lg:py-28 px-6 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <CommonTitle 
                title={data?.title || "About Our Clone Development"}
                subtitle={data?.description || "We specialize in creating high-quality clone applications that replicate success of proven business models while adding unique features and improvements to help you stand out in market."}
                align="left"
                pill={true}
            />

            {/* Key Benefits */}
            <div className="space-y-6">
              {(data?.benefits || [
                {
                  icon: <CheckCircle2 className="text-sky-500" size={24} />,
                  title: "Proven Business Model",
                  description: "Leverage successful platforms with built-in market validation"
                },
                {
                  icon: <Target className="text-sky-500" size={24} />,
                  title: "Customizable Features",
                  description: "Tailor clone to match your unique business requirements"
                },
                {
                  icon: <Zap className="text-sky-500" size={24} />,
                  title: "Fast Development",
                  description: "Launch your platform quickly with our streamlined development process"
                },
                {
                  icon: <Shield className="text-sky-500" size={24} />,
                  title: "Scalable Architecture",
                  description: "Built to grow with your business from startup to enterprise"
                }
              ]).map((benefit, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="flex-shrink-0 w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center group-hover:bg-sky-100 group-hover:scale-110 transition-all duration-300 shadow-sm">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">{benefit.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold rounded-xl hover:from-sky-600 hover:to-sky-700 hover:-translate-y-1 hover:shadow-xl shadow-sky-500/25 transition-all duration-300"
              >
                Discuss Your Project <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image 
                src={data?.image || "/images/clone/about-clone.jpg"} 
                alt="About Clone Development" 
                width={600} 
                height={400}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-sky-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="text-white" size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">500+</div>
                  <div className="text-xs text-slate-500">Projects Delivered</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-sky-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
                  <Zap className="text-white" size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">24/7</div>
                  <div className="text-xs text-slate-500">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
