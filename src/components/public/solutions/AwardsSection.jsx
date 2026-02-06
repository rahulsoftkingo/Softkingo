"use client";
import React from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import Image from 'next/image';

export default function AwardsSection() {
  return (
    <section className="bg-white py-16 lg:py-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center gap-2 mb-12">
          <CommonTitle
            align="center"
            pill={false}
            title='Our'
            gradientText='Awards & Recognitions'
            subtitle='These recognitions reflect our commitment to quality, innovation, and long‑term partnerships with our clients.'
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-500">
          <div className="flex justify-center"><Image src="/images/award/Black And Gold Modern Award Ceremony Instagram Post (1).png" alt="Award 1" width={140} height={140} className="object-contain hover:scale-110 transition-transform" /></div>
          <div className="flex justify-center"><Image src="/images/award/Black And Gold Modern Award Ceremony Instagram Post (2).png" alt="Award 2" width={140} height={140} className="object-contain hover:scale-110 transition-transform" /></div>
          <div className="flex justify-center"><Image src="/images/award/Black And Gold Modern Award Ceremony Instagram Post (4).png" alt="Award 3" width={140} height={140} className="object-contain hover:scale-110 transition-transform" /></div>
          <div className="flex justify-center"><Image src="/images/award/Goodfirms award-softkingo.png" alt="GoodFirms" width={160} height={160} className="object-contain hover:scale-110 transition-transform" /></div>
          <div className="flex justify-center"><Image src="/images/award/techbeheb.png" alt="TechBehemoths" width={160} height={160} className="object-contain hover:scale-110 transition-transform" /></div>
        </div>
      </div>
    </section>
  );
}