'use client';

import React from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function CloneFAQ({ data }) {
  const [openIndex, setOpenIndex] = useState(null);

  const defaultFaqs = [
    {
      q: "How long does it take to develop a clone app?",
      a: "Typically, a basic clone app takes 4-8 weeks for development, while more complex platforms with custom features can take 3-6 months. The timeline depends on the scope of features and customization required."
    },
    {
      q: "Are clone apps legal and safe to launch?",
      a: "Yes, clone apps are legal when they don't infringe on copyrights, trademarks, or patents. We ensure your clone has unique features, branding, and functionality to differentiate it from existing platforms."
    },
    {
      q: "Can I customize the clone app features?",
      a: "Absolutely! We encourage customization and can add unique features, improve existing functionality, and integrate third-party services to make your platform stand out in the market."
    },
    {
      q: "What technologies do you use for clone development?",
      a: "We use modern tech stacks including React Native for cross-platform mobile apps, Node.js for backend, MongoDB/PostgreSQL for databases, and cloud services like AWS for hosting and scalability."
    },
    {
      q: "How much does clone app development cost?",
      a: "Costs vary based on complexity and features. Basic clones start from $15,000-25,000, while enterprise-level platforms with advanced features can range from $50,000-150,000+. We provide detailed quotes after requirement analysis."
    },
    {
      q: "Do you provide post-launch support and maintenance?",
      a: "Yes, we offer comprehensive post-launch support including bug fixes, feature updates, performance optimization, and security patches. We have different maintenance packages to suit your needs."
    }
  ];

  // Safe render function to handle malformed data
  const safeRenderFAQ = (faq) => {
    if (typeof faq === 'string') return { q: faq, a: '' };
    if (typeof faq === 'object' && faq !== null) {
      return {
        q: typeof faq.q === 'string' ? faq.q :
          typeof faq.question === 'string' ? faq.question :
            typeof faq.title === 'string' ? faq.title : 'Question?',
        a: typeof faq.a === 'string' ? faq.a :
          typeof faq.answer === 'string' ? faq.answer :
            typeof faq.description === 'string' ? faq.description : 'Answer not available'
      };
    }
    return { q: 'Question?', a: 'Answer not available' };
  };

  const faqs = data?.items?.length > 0 ? data.items.map(safeRenderFAQ) : defaultFaqs.map(safeRenderFAQ);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-8 md:py-16 px-6 bg-slate-50 relative overflow-clip">
      <div className="max-w-7xl mx-auto px-6 relative overflow-clip pb-12">
        {/* Header */}
        <CommonTitle
          title={data?.title || "Frequently Asked Questions"}
          subtitle={data?.subtitle || "Everything you need to know about clone app development"}
          pill={true}
        />

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-sky-200 transition-all duration-300">
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-sky-50 transition-colors group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-200 transition-colors flex-shrink-0">
                    <HelpCircle className="text-sky-500" size={20} />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-lg group-hover:text-sky-600 transition-colors">
                    {faq.q}
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  {openIndex === i ? (
                    <ChevronUp className="text-sky-500" size={24} />
                  ) : (
                    <ChevronDown className="text-slate-400" size={24} />
                  )}
                </div>
              </button>

              {/* Answer */}
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-8 pb-6 pt-2">
                  <div className="pl-14 border-l-4 border-sky-200">
                    <p className="text-slate-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="mt-16 bg-gradient-to-r from-sky-600 to-slate-800 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">{data?.ctaTitle || "Still Have Questions?"}</h3>
          <p className="text-sky-100 mb-8 max-w-2xl mx-auto">
            {data?.ctaSubtitle || "Our team is here to help you understand every aspect of clone app development"}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-sky-600 px-6 py-3 rounded-full font-bold hover:bg-sky-50 transition-colors">
              {data?.ctaBtn1 || "Schedule a Consultation"}
            </button>
            <button className="bg-sky-500 text-white px-6 py-3 rounded-full font-bold hover:bg-sky-600 transition-colors border border-sky-400">
              {data?.ctaBtn2 || "View Portfolio"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
