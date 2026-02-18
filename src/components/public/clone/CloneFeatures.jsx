import React from 'react';
import { Smartphone, Users, Settings, Zap, Shield, Globe } from 'lucide-react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function CloneFeatures({ data }) {
  const { user, vendor, admin } = data || {};

  const renderFeatureList = (features, title, icon, bgColor) => (
    <div className={`${bgColor} p-8 rounded-2xl border border-slate-200`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {features?.items?.map((feature, i) => (
          <div key={i} className="flex items-start gap-3 group">
            <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">
                {feature.title}
              </h4>
            </div>
          </div>
        )) || (
          <p className="text-slate-500 italic">No features added yet</p>
        )}
      </div>
    </div>
  );

  return (
    <section className="py-20 lg:py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <CommonTitle 
            title={data?.title || "Comprehensive Clone Features"}
            subtitle={data?.subtitle || "Complete platform with features for all user types and administrators"}
            pill={true}
        />

        {/* Features Grid */}
        <div className="space-y-8">
          
          {/* User Features */}
          {user && renderFeatureList(
            user,
            "User Features",
            <Smartphone className="text-sky-500" size={24} />,
            "bg-slate-50"
          )}

          {/* Vendor/Partner Features */}
          {vendor && renderFeatureList(
            vendor,
            "Vendor/Partner Features",
            <Users className="text-sky-500" size={24} />,
            "bg-sky-50"
          )}

          {/* Admin Features */}
          {admin && renderFeatureList(
            admin,
            "Admin Dashboard",
            <Settings className="text-sky-500" size={24} />,
            "bg-slate-50"
          )}
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 bg-gradient-to-r from-sky-50 to-slate-50 rounded-2xl p-8 border border-sky-100">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="text-white" size={32} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Lightning Fast</h4>
              <p className="text-slate-600 text-sm">Optimized performance for smooth user experience</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" size={32} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Secure & Reliable</h4>
              <p className="text-slate-600 text-sm">Enterprise-grade security and data protection</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="text-white" size={32} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Scalable</h4>
              <p className="text-slate-600 text-sm">Built to grow with your business needs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
