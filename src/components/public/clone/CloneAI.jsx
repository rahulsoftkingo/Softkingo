import React from 'react';
import { Brain, Sparkles, Bot, Zap, Target, Shield } from 'lucide-react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function CloneAI({ data }) {
  const defaultFeatures = [
    {
      icon: <Brain className="text-sky-500" size={32} />,
      title: "Smart Recommendations",
      description: "AI-powered suggestions to enhance user engagement and satisfaction"
    },
    {
      icon: <Bot className="text-sky-500" size={32} />,
      title: "Chatbot Integration",
      description: "Intelligent chat support for 24/7 customer assistance"
    },
    {
      icon: <Sparkles className="text-sky-500" size={32} />,
      title: "Predictive Analytics",
      description: "Data-driven insights to optimize business decisions"
    },
    {
      icon: <Zap className="text-sky-500" size={32} />,
      title: "Automated Workflows",
      description: "Streamline operations with intelligent automation"
    },
    {
      icon: <Target className="text-sky-500" size={32} />,
      title: "Personalization Engine",
      description: "Tailored experiences based on user behavior and preferences"
    },
    {
      icon: <Shield className="text-sky-500" size={32} />,
      title: "AI-Powered Security",
      description: "Advanced threat detection and fraud prevention"
    }
  ];

  const features = data?.items?.length > 0 ? data.items : defaultFeatures;

  return (
    <section className="py-20 lg:py-28 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <CommonTitle 
            title={data?.title || "AI-Powered Advanced Features"}
            subtitle={data?.subtitle || "Cutting-edge artificial intelligence capabilities to give your clone app a competitive edge"}
            pill={true}
        />

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-sky-200 transition-all duration-300 group">
              
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-sky-50 to-sky-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon || (
                  <div className="w-8 h-8 bg-sky-500 rounded-lg"></div>
                )}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* AI Capabilities Showcase */}
        <div className="mt-16 bg-gradient-to-r from-sky-600 to-slate-800 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Next-Generation AI Integration</h3>
              <p className="text-sky-100 leading-relaxed mb-6">
                Our clone apps come equipped with state-of-the-art AI features that automate processes, 
                enhance user experiences, and provide actionable business insights.
              </p>
              <div className="space-y-3">
                {[
                  "Machine Learning Algorithms",
                  "Natural Language Processing", 
                  "Computer Vision Capabilities",
                  "Real-time Data Processing"
                ].map((capability, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sky-300 rounded-full"></div>
                    <span className="text-sky-100">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <Brain className="text-sky-300" size={80} />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-sky-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-sky-300 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
