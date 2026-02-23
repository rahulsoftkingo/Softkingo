import React from 'react';
import { DollarSign, TrendingUp, Target, Zap, ArrowRight } from 'lucide-react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function CloneRevenue({ data }) {
  const defaultRevenue = [
    {
      icon: <DollarSign className="text-sky-500" size={32} />,
      title: "Commission-Based",
      description: "Earn percentage from every transaction or service booking through your platform"
    },
    {
      icon: <TrendingUp className="text-sky-500" size={32} />,
      title: "Subscription Plans",
      description: "Recurring revenue through monthly or annual premium membership tiers"
    },
    {
      icon: <Target className="text-sky-500" size={32} />,
      title: "Premium Features",
      description: "One-time payments for advanced features and enhanced functionality"
    },
    {
      icon: <Zap className="text-sky-500" size={32} />,
      title: "Advertisement Revenue",
      description: "Generate income through targeted ads and promotional partnerships"
    }
  ];

  // Safe render function to handle malformed data
  const safeRenderRevenue = (model) => {
    if (typeof model === 'string') return { title: model, description: '', icon: <DollarSign className="text-sky-500" size={32} /> };
    if (typeof model === 'object' && model !== null) {
      return {
        title: typeof model.title === 'string' ? model.title : 
              typeof model.name === 'string' ? model.name : 'Revenue Model',
        description: typeof model.description === 'string' ? model.description : 
                    typeof model.desc === 'string' ? model.desc : 'Monetization strategy',
        icon: model.icon || <DollarSign className="text-sky-500" size={32} />
      };
    }
    return { title: 'Revenue Model', description: 'Monetization strategy', icon: <DollarSign className="text-sky-500" size={32} /> };
  };

  const revenueModels = data?.items?.length > 0 ? data.items : defaultRevenue;

  return (
    <section className="py-20 lg:py-28 px-6 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <CommonTitle 
          title={data?.title || "Revenue & Monetization Models"}
          subtitle={data?.subtitle || "Multiple revenue streams to ensure sustainable business growth and profitability"}
          pill={true}
          align="center"
        />

        {/* Revenue Models Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {(Array.isArray(revenueModels) ? revenueModels : []).map((model, i) => {
            const safeModel = safeRenderRevenue(model);
            return (
              <div key={i} className="group">
                <div className="bg-gradient-to-b from-white to-sky-50 rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className="w-20 h-20 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-sky-100 group-hover:scale-110 transition-all duration-300">
                    {safeModel.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 text-center mb-4 group-hover:text-sky-600 transition-colors">
                    {safeModel.title}
                  </h3>
                  
                  <p className="text-slate-600 text-center leading-relaxed">
                    {safeModel.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Revenue Calculator */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-3xl p-8 text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-sky-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Estimate Your Revenue Potential
              </h3>
              <p className="text-sky-100 mb-6 text-lg">
                See how quickly your clone app can generate returns with our proven monetization strategies
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-white text-sky-600 px-6 py-3 rounded-xl font-semibold hover:bg-sky-50 hover:-translate-y-1 transition-all duration-300"
              >
                Get Revenue Projection <ArrowRight size={18} />
              </a>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { metric: "$50K+", label: "Avg. Monthly Revenue" },
                { metric: "6 Months", label: "ROI Timeline" },
                { metric: "4x", label: "Revenue Multiple" },
                { metric: "90%", label: "Profit Margin" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-2xl font-bold mb-1">{stat.metric}</div>
                  <div className="text-sm text-sky-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-slate-900 mb-8">
            Monetization Features Comparison
          </h3>
          
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-sky-50 border-b border-slate-200">
                  <th className="text-left p-4 font-semibold text-slate-900">Feature</th>
                  <th className="text-center p-4 font-semibold text-slate-900">Basic</th>
                  <th className="text-center p-4 font-semibold text-slate-900">Premium</th>
                  <th className="text-center p-4 font-semibold text-sky-600">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Commission Rate", basic: "5%", premium: "3%", enterprise: "2%" },
                  { feature: "Payment Gateway", basic: "Standard", premium: "Multiple", enterprise: "Custom" },
                  { feature: "Analytics", basic: "Basic", premium: "Advanced", enterprise: "Real-time" },
                  { feature: "Support", basic: "Email", premium: "24/7 Chat", enterprise: "Dedicated" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-sky-50/50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{row.feature}</td>
                    <td className="p-4 text-center text-slate-600">{row.basic}</td>
                    <td className="p-4 text-center text-slate-600">{row.premium}</td>
                    <td className="p-4 text-center font-semibold text-sky-600">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
