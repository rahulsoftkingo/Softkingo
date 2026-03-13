import React from 'react';
import { Button } from '@/components/ui/button';

export default function SolutionsCTA({ data }) {
  // Props: title, subtitle, btnText, bgImage
  if (!data) return null;

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto bg-gradient-to-r from-sky-500 to-blue-600 rounded-[2.5rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-sky-200">

        {/* Background Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-black leading-normal">
            {data.title}
          </h2>
          <p className="text-lg text-sky-100">
            {data.subtitle}
          </p>
          <div className="pt-4">
            <Button className="bg-white text-sky-600 hover:bg-sky-50 shadow-lg px-10 py-4 text-lg">
              {data.btnText || "Get Started Now"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}