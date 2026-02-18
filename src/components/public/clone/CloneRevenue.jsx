import React from 'react';
import { DollarSign, TrendingUp, CreditCard, Users, ShoppingCart, Target } from 'lucide-react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function CloneRevenue({ data }) {
  const defaultModels = [
    {
      icon: <CreditCard className="text-sky-500" size={32} />,
      title: "Subscription Plans",
      description: "Recurring revenue through monthly and annual subscription tiers with different feature sets"
    },
    {
      icon: <ShoppingCart className="text-sky-500" size={32} />,
      title: "Commission-Based",
      description: "Earn percentage from transactions between users on your platform"
    },
    {
      icon: <Users className="text-sky-500" size={32} />,
      title: "Premium Listings",
      description: "Charge for enhanced visibility and featured placement for vendors or service providers"
    },
    {
      icon: <Target className="text-sky-500" size={32} />,
      title: "Advertising Revenue",
      description: "Display targeted ads to users based on their behavior and preferences"
    },
    {
      icon: <DollarSign className="text-sky-500" size={32} />,
      title: "Transaction Fees",
      description: "Small fees on each transaction or booking processed through the platform"
    },
    {
      icon: <TrendingUp className="text-sky-500" size={32} />,
      title: "Data Analytics",
      description: "Monetize insights and analytics data for business intelligence"
    }
  ];

  const models = data?.items?.length > 0 ? data.items : defaultModels;

  return (
    <section className="py-20 lg:py-28 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <CommonTitle 
            title={data?.title || "Revenue & Monetization Models"}
            subtitle={data?.subtitle || "Multiple revenue streams to ensure sustainable profitability and growth"}
            pill={true}
        />

        {/* Revenue Models Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {models.map((model, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-sky-200 transition-all duration-300 group">
              
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-sky-50 to-sky-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {model.icon || (
                  <div className="w-8 h-8 bg-sky-500 rounded-lg"></div>
                )}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors">
                {model.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {model.description}
              </p>
            </div>
          ))}
        </div>

        {/* Revenue Calculator */}
        <div className="bg-gradient-to-r from-sky-600 to-slate-800 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Revenue Potential Calculator</h3>
              <p className="text-sky-100 leading-relaxed mb-6">
                Estimate your potential earnings based on different monetization strategies
              </p>
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sky-100">Monthly Active Users</span>
                    <span className="font-bold">10,000</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sky-100">Conversion Rate</span>
                    <span className="font-bold">5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sky-100">Avg. Revenue/User</span>
                    <span className="font-bold">$25</span>
                  </div>
                </div>
                <div className="bg-sky-500 rounded-lg p-4 text-center">
                  <div className="text-3xl font-black">$12,500</div>
                  <div className="text-sky-100">Estimated Monthly Revenue</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="aspect-square bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center mb-6">
                <DollarSign className="text-sky-300" size={80} />
              </div>
              <div className="space-y-3">
                {[
                  "Multiple Revenue Streams",
                  "Scalable Business Model", 
                  "Quick ROI",
                  "Market-Tested Strategies"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 justify-center">
                    <div className="w-2 h-2 bg-sky-300 rounded-full"></div>
                    <span className="text-sky-100">{benefit}</span>
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
