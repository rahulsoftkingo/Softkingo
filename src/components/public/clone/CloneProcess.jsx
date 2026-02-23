import React from 'react';
import { CheckCircle2, ArrowRight, Clock, Users, Code, Rocket, CheckCircle } from 'lucide-react';
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

  // Safe render function to handle malformed data
  const safeRenderStep = (step) => {
    if (typeof step === 'string') return { title: step, description: '', icon: <CheckCircle className="text-sky-500" size={32} /> };
    if (typeof step === 'object' && step !== null) {
      return {
        title: typeof step.title === 'string' ? step.title : 
              typeof step.name === 'string' ? step.name : 'Process Step',
        description: typeof step.description === 'string' ? step.description : 
                    typeof step.desc === 'string' ? step.desc : 'Development phase',
        icon: step.icon || <CheckCircle className="text-sky-500" size={32} />
      };
    }
    return { title: 'Process Step', description: 'Development phase', icon: <CheckCircle className="text-sky-500" size={32} /> };
  };

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
        <div className="relative mt-16">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-200 via-sky-400 to-sky-200 transform -translate-x-1/2 hidden lg:block"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(Array.isArray(steps) ? steps : []).map((step, i) => {
              const safeStep = safeRenderStep(step);
              return (
                <div key={i} className="relative group">
                  {/* Step Card */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {i + 1}
                    </div>

                    {/* Icon */}
                    <div className="w-20 h-20 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-sky-100 group-hover:scale-110 transition-all duration-300">
                      {safeStep.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-900 text-center mb-4 group-hover:text-sky-600 transition-colors">
                      {safeStep.title}
                    </h3>
                    
                    <p className="text-slate-600 text-center leading-relaxed">
                      {safeStep.description}
                    </p>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full w-4 h-4 bg-sky-400 rounded-full border-4 border-white shadow-md hidden lg:block"></div>
                </div>
              );
            })}
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
