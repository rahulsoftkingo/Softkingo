"use client";
import React from 'react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function SolutionsProcess({ data }) {
  if (!data) return null;

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 1. Heading */}
        <CommonTitle 
            align="center" 
            title="Development Process" 
            subtitle="From concept to launch, we follow a proven agile methodology." 
        />
        
        <div className="relative mt-20">
            {/* Desktop Connecting Line (Dashed Gradient) */}
            <div className="hidden lg:block absolute top-0 left-0 w-full h-0.5 border-t-[3px] border-dashed border-sky-200 z-0 transform translate-y-8"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative z-10">
                {data.steps?.map((step, idx) => (
                    <div key={idx} className="group relative">
                        
                        {/* 2. Floating Number Badge */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white border-4 border-sky-100 rounded-full flex items-center justify-center z-20 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-sky-500 group-hover:bg-sky-600">
                            <span className="text-xl font-black text-sky-500 group-hover:text-white transition-colors duration-300">
                                0{idx + 1}
                            </span>
                        </div>

                        {/* 3. The Card */}
                        <div className="h-full bg-white pt-14 pb-8 px-6 rounded-3xl shadow-sm border border-slate-100 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-sky-100">
                            
                            {/* Decorative small dot below number */}
                            <div className="w-1.5 h-1.5 rounded-full bg-sky-200 mx-auto mb-4 group-hover:bg-sky-500 transition-colors"></div>

                            <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-sky-700 transition-colors">
                                {step.title}
                            </h4>
                            <div 
                                className="text-slate-600 text-lg leading-relaxed max-w-2xl"
                                dangerouslySetInnerHTML={{ __html: step.description }}
                            />
                        </div>

                        {/* Mobile Vertical Line (Connector) */}
                        {idx !== (data.steps?.length - 1) && (
                            <div className="lg:hidden absolute bottom-[-32px] left-1/2 -translate-x-1/2 w-0.5 h-8 bg-sky-200 border-l border-dashed border-slate-300"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}