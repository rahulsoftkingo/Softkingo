import CommonTitle from '@/components/ui/CommonTitle';
import React from 'react';

const CoreValues = ({ values }) => {
    return (
        <>
              
          {/* 5. OUR VALUES (Animated Swing Layout) */}
            <section className="py-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                       <CommonTitle
                    pill="Our Culture"
                    title="Core Values"
                    subtitle="Our Culture"
                     />
                    </div>
                    
                    <div className="relative space-y-[-40px]"> {/* Negative space for overlap */}
                        
                        {/* Central Thread Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-sky-200 -translate-x-1/2 rounded-full z-0 hidden md:block"></div>

                        {values?.map((val, i) => {
                            const isEven = i % 2 === 0;
                            return (
                                <div key={i} className={`relative z-10 flex md:items-center ${isEven ? 'md:justify-start' : 'md:justify-end'} group perspective-1000`}>
                                    
                                    {/* Connection Dot on Line */}
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-sky-500 rounded-full border-4 border-white shadow-md z-20 hidden md:block"></div>

                                    {/* Swinging Card */}
                                    <div 
                                        className={`w-full md:w-[55%] p-10 rounded-[2.5rem] shadow-2xl border transition-all duration-700 ease-in-out transform-gpu
                                            ${isEven 
                                                ? 'bg-sky-500 text-white border-sky-400 md:origin-right md:-rotate-3 md:hover:rotate-0 md:hover:scale-105' 
                                                : 'bg-white text-slate-800 border-sky-100 md:origin-left md:rotate-3 md:hover:rotate-0 md:hover:scale-105'
                                            }
                                            hover:z-30 hover:shadow-[0_20px_60px_-15px_rgba(14,165,233,0.3)]
                                        `}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <h4 className={`text-2xl font-bold ${isEven ? 'text-white' : 'text-slate-900'}`}>
                                                {val.title}
                                            </h4>
                                            <div className={`text-4xl font-black opacity-20 ${isEven ? 'text-white' : 'text-sky-200'}`}>
                                                {String(i + 1).padStart(2, '0')}
                                            </div>
                                        </div>
                                        <p className={`text-lg leading-relaxed ${isEven ? 'text-sky-50' : 'text-slate-500'}`}>
                                            {val.description}
                                        </p>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        
        </>
       
    );
};

export default CoreValues;