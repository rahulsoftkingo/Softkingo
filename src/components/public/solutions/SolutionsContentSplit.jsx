import React from 'react';
import Image from 'next/image';
import CommonTitle from '@/components/ui/CommonTitle';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import LeadForm from '../LeadForm';

export default function SolutionsContentSplit({ data, reverse = false }) {
    // Props: title, subtitle, image, listItems[], buttonText
    if (!data) return null;

    return (
        <section className="pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3  gap-16 items-center">

                {/* Text Side */}
                <div className={`col-span-2 space-y-8 ${reverse ? 'lg:order-2' : ''}`}>
                    <div className="text-left">
                        <CommonTitle
                            align="left"
                            title={data.title}
                            subtitle={data.description}
                        />
                    </div>

                    {data.listItems && (
                        <ul className="space-y-4">
                            {data.listItems.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="mt-1 p-1 bg-sky-100 rounded-full text-sky-600">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <span className="text-slate-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}


                </div>

                {/* form Side */}
                <div className={`relative ${reverse ? 'lg:order-1' : ''}`}>


                    <div className="w-full">
                        <LeadForm
                            formType="solutions"
                            formKey="solutions"
                            serviceName="Solutions"
                            title={data.title}
                            subtitle="Get matched with top talent in 24 Hours! "
                            variant="solid"
                            showLogo={true}
                            showCompany={false}
                            showBudget={false}
                            showAttachment={false}
                            showNDA={false}
                        />
                    </div>

                    {/* Decor blob */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sky-100 rounded-full -z-10"></div>
                </div>

            </div>
        </section>
    );
}