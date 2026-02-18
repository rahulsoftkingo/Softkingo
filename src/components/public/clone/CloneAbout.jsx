import React from 'react';
import Image from 'next/image';
import { CheckCircle2, Target, Zap, Shield } from 'lucide-react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function CloneAbout({ data }) {
  return (
    <section className="py-20 lg:py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
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
                  description: "Tailor the clone to match your unique business requirements"
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
                  <div className="flex-shrink-0 w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src={data?.image || "/images/clone-about.jpg"} 
                alt="About Clone Development" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent"></div>
            </div>
            
            {/* Stats Overlay */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <div className="text-3xl font-black text-sky-500">500+</div>
              <div className="text-sm font-medium text-slate-600">Clone Solutions Delivered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
