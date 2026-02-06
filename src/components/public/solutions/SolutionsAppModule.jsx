"use client";
import React from 'react';
import Image from 'next/image';
import CommonTitle from '@/components/ui/CommonTitle';
import { Check } from 'lucide-react';

export default function SolutionsAppModule({ data, reverse = false, bg = "white" }) {
  if (!data) return null;

  return (
    <section className={`py-20 overflow-hidden ${bg === 'gray' ? 'bg-slate-50' : 'bg-white'}`}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className={`flex flex-col lg:flex-row items-center gap-16 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Content Side */}
            <div className="flex-1 space-y-8">
                <div className="inline-block px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                    {data.tag}
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                    {data.title}
                </h2>
                <p className="text-slate-600 text-lg">{data.description}</p>
                
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                    {data.features?.map((feat, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                <Check size={14} strokeWidth={3} />
                            </div>
                            <span className="font-semibold text-slate-700 text-sm">{feat}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Image Side */}
            <div className="flex-1 relative">
                <div className={`relative z-10   ${data.isWeb ? 'aspect-video' : 'max-w-sm mx-auto  aspect-[3/4]'}`}>
                    <Image 
                        src={data.image || "/images/placeholder.png"} 
                        alt={data.title} 
                        fill 
                        className="objectcover"
                    />
                </div>
                {/* Decorative Elements */}
                <div className={`absolute top-1/2 ${reverse ? 'left-0' : 'right-0'} -translate-y-1/2 w-96 h-96 bg-sky-200/50 rounded-full blur-3xl -z-0`}></div>
            </div>

        </div>
      </div>
    </section>
  );
}