import React from 'react';
import { TrendingUp, DollarSign, Users, Clock, Award, Target } from 'lucide-react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function CloneWhyBuild({ data }) {
    const defaultItems = [
        {
            icon: <TrendingUp className="text-sky-500" size={32} />,
            title: "Proven Market Success",
            description: "Leverage business models that have already achieved market validation and user adoption."
        },
        {
            icon: <DollarSign className="text-sky-500" size={32} />,
            title: "Multiple Revenue Streams",
            description: "Built-in monetization options including subscriptions, commissions, and premium features."
        },
        {
            icon: <Users className="text-sky-500" size={32} />,
            title: "Ready User Base",
            description: "Tap into existing user behaviors and preferences with familiar interfaces."
        },
        {
            icon: <Clock className="text-sky-500" size={32} />,
            title: "Faster Time to Market",
            description: "Launch your platform in weeks instead of months with our proven development approach."
        },
        {
            icon: <Award className="text-sky-500" size={32} />,
            title: "Competitive Advantage",
            description: "Stand out with enhanced features and improvements over the original platform."
        },
        {
            icon: <Target className="text-sky-500" size={32} />,
            title: "Lower Development Risk",
            description: "Reduced uncertainty with a roadmap that's already been tested and validated."
        }
    ];

    const reasons = data?.items?.length > 0 ? data.items : defaultItems;

    return (
        <section className="py-8 md:py-16 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <CommonTitle
                    title={data?.title || "Why Build a Clone App?"}
                    subtitle={data?.subtitle || "Clone apps offer a strategic advantage by combining proven success with customization opportunities"}
                    pill={true}
                />

                {/* Reasons Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reasons.map((reason, i) => (
                        <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-sky-200 transition-all duration-300 group">

                            {/* Icon */}
                            <div className="w-16 h-16 bg-sky-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sky-100 transition-colors">
                                {reason.icon || (
                                    <div className="w-8 h-8 bg-sky-500 rounded-lg"></div>
                                )}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors">
                                {reason.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {reason.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center gap-3 bg-sky-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-sky-500/30 transition-all hover:scale-105">
                        <Target size={20} />
                        Start Your Clone Project
                    </div>
                    <p className="mt-4 text-slate-600">
                        Ready to capitalize on a proven business model?
                    </p>
                </div>
            </div>
        </section>
    );
}
