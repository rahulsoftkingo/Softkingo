import React from 'react';
import { CheckCircle2, ArrowRight, Clock, Users, Code, Rocket } from 'lucide-react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function CloneProcess({ data }) {
  const defaultSteps = [
    {
      title: "Discovery & Planning",
      description: "We analyze your requirements and create a detailed roadmap for your clone development project."
    },
    {
      title: "UI/UX Design",
      description: "Create intuitive and attractive interfaces that match modern design standards and user expectations."
    },
    {
      title: "Core Development",
      description: "Build the essential features and functionality that make your clone platform operational."
    },
    {
      title: "Advanced Features",
      description: "Implement AI capabilities, analytics, and custom features to differentiate your platform."
    },
    {
      title: "Testing & QA",
      description: "Rigorous testing to ensure your platform is bug-free and performs optimally."
    },
    {
      title: "Launch & Support",
      description: "Deploy your clone platform and provide ongoing maintenance and support."
    }
  ];

  const steps = data?.items?.length > 0 ? data.items : defaultSteps;

  return (
    <section className="py-20 lg:py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <CommonTitle 
            title={data?.title || "Our Clone Development Process"}
            subtitle={data?.subtitle || "Streamlined methodology to deliver high-quality clone applications efficiently"}
            pill={true}
        />

        {/* Process Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 to-slate-300 hidden md:block"></div>
          
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="relative flex gap-8 items-center">
                
                {/* Step Number */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 bg-sky-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">
                    {i + 1}
                  </div>
                  <div className="absolute inset-0 bg-sky-500 rounded-full animate-ping opacity-20"></div>
                </div>

                {/* Step Content */}
                <div className="flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-sky-200 hover:bg-white transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                      <CheckCircle2 className="text-sky-500" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Benefits */}
        <div className="mt-16 bg-gradient-to-r from-sky-50 to-slate-50 rounded-2xl p-8 border border-sky-100">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="text-white" size={32} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Fast Delivery</h4>
              <p className="text-slate-600 text-sm">Launch in weeks, not months</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Expert Team</h4>
              <p className="text-slate-600 text-sm">Experienced clone developers</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Rocket className="text-white" size={32} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Quality Assured</h4>
              <p className="text-slate-600 text-sm">Rigorous testing & QA process</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-sky-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-sky-500/30 transition-all hover:scale-105">
            <Code size={20} />
            Start Your Clone Project
          </div>
          <p className="mt-4 text-slate-600">
            Ready to build your successful clone platform?
          </p>
        </div>
      </div>
    </section>
  );
}
