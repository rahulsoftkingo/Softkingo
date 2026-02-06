// "use client";
// import React from 'react';
// import CommonTitle from '@/components/ui/CommonTitle';
// import { TrendingUp, Users, Shield, Zap } from 'lucide-react';

// export default function SolutionsWhyNeed({ data }) {
//   if (!data) return null;

//   const icons = { TrendingUp, Users, Shield, Zap };

//   return (
//     <section className="py-20 bg-slate-50">
//       <div className="container mx-auto px-6 lg:px-12">
//         <CommonTitle 
//             align="center"
//             title={data.title}
//             subtitle={data.subtitle}
//         />
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
//             {data.items?.map((item, idx) => {
//                 const Icon = icons[item.icon] || Zap;
//                 return (
//                     <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//                         <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 mb-6">
//                             <Icon size={28} />
//                         </div>
//                         <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
//                         <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
//                     </div>
//                 )
//             })}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
import React from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import * as LucideIcons from 'lucide-react'; // Dynamic Icons for flexibility

export default function SolutionsWhyNeed({ data }) {
  if (!data) return null;

  // Helper to render dynamic icon
  const renderIcon = (iconName) => {
    const IconComponent = LucideIcons[iconName] || LucideIcons.Zap;
    return <IconComponent size={40} />; // Thoda bada icon square card ke liye
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        <CommonTitle 
            align="center"
            title={data.title}
            subtitle={data.subtitle}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {data.items?.map((item, idx) => (
                // 1. Perspective Container (Depth effect ke liye)
                <div key={idx} className="group perspective-1000 h-full">
                    
                    {/* 2. The Card (Jo Rotate karega) */}
                    <div className="relative w-full aspect-square transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
                        
                        {/* --- FRONT SIDE (Icon + Title) --- */}
                        <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center p-6">
                            <div className="w-20 h-20 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 mb-6 group-hover:scale-110 transition-transform duration-500">
                                {renderIcon(item.icon)}
                            </div>
                            <h4 className="text-xl font-bold text-slate-900">{item.title}</h4>
                            <p className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-wider">Hover to learn more</p>
                        </div>

                        {/* --- BACK SIDE (Description) --- */}
                        {/* Note: rotateY(180deg) zaroori h taaki ye flip hone ke baad seedha dikhe */}
                        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-sky-600 to-blue-700 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center p-8">
                            <h4 className="text-xl font-bold text-white mb-4">{item.title}</h4>
                            <div className="w-12 h-1 bg-white/30 rounded-full mb-4"></div>
                            <p className="text-white/90 text-base leading-relaxed font-medium">
                                {item.description}
                            </p>
                        </div>

                    </div>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
}