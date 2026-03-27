import React from 'react';
import { Users, Briefcase, Settings, Smartphone, ArrowRight } from 'lucide-react';
import CommonTitle from '@/components/ui/CommonTitle';

export default function CloneFeatures({ data }) {
    const defaultFeatures = {
        user: {
            title: "User App Features",
            icon: <Users className="text-sky-500" size={32} />,
            items: [
                "Real-time GPS Tracking",
                "Secure Payment Integration",
                "Multi-language Support",
                "Push Notifications",
                "Rating & Review System"
            ]
        },
        vendor: {
            title: "Driver/Partner App Features",
            icon: <Briefcase className="text-sky-500" size={32} />,
            items: [
                "Earnings Dashboard",
                "Route Optimization",
                "Instant Notifications",
                "Document Management",
                "Performance Analytics"
            ]
        },
        admin: {
            title: "Admin Panel Features",
            icon: <Settings className="text-sky-500" size={32} />,
            items: [
                "User Management",
                "Revenue Analytics",
                "Content Management",
                "Support Ticket System",
                "Custom Reports"
            ]
        }
    };

    // Safe render function to handle malformed data
    const safeRenderItem = (item) => {
        if (typeof item === 'string') return item;
        if (typeof item === 'object' && item !== null) {
            return item.title || item.name || item.description || JSON.stringify(item);
        }
        return String(item || '');
    };

    const features = data || defaultFeatures;

    return (
        <section className="py-20 lg:py-28 px-6 bg-slate-50 relative overflow-clip">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <CommonTitle
                    title="Comprehensive App Features"
                    subtitle="Powerful functionality designed for all stakeholders in your clone ecosystem"
                    pill={true}
                    align="center"
                />

                <div className="grid md:grid-cols-3 gap-8 mt-16">
                    {Object.entries(features).map(([key, section]) => {
                        // Skip if section is malformed
                        if (!section || typeof section !== 'object') return null;

                        return (
                            <div key={key} className="group">
                                {/* Feature Card */}
                                <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full">
                                    {/* Header */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 bg-sky-50 rounded-xl flex items-center justify-center group-hover:bg-sky-100 group-hover:scale-110 transition-all duration-300">
                                            {section.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                                                {typeof section.title === 'string' ? section.title : 'Features'}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Features List */}
                                    <div className="space-y-4">
                                        {(Array.isArray(section.items) ? section.items : []).map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 group/item">
                                                <div className="w-2 h-2 bg-sky-400 rounded-full group-hover/item:bg-sky-600 group-hover/item:scale-150 transition-all duration-300"></div>
                                                <span className="text-slate-700 group-hover/item:text-sky-600 transition-colors">
                                                    {safeRenderItem(item)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-8 pt-6 border-t border-slate-100">
                                        <a
                                            href="/contact"
                                            className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700 hover:gap-3 transition-all duration-300"
                                        >
                                            Explore {key === 'user' ? 'User' : key === 'vendor' ? 'Driver' : 'Admin'} Features
                                            <ArrowRight size={16} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    }).filter(Boolean)}
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                    {[
                        { number: "50+", label: "Core Features" },
                        { number: "100%", label: "Customizable" },
                        { number: "24/7", label: "Support" },
                        { number: "99.9%", label: "Uptime" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white rounded-xl p-6 text-center shadow-md border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="text-3xl font-bold text-sky-600 mb-2">{stat.number}</div>
                            <div className="text-sm text-slate-600">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
