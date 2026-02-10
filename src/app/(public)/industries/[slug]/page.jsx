import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db'; 
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

// --- SHARED COMPONENTS (Reuse existing ones where possible) ---
// import SolutionsHero from '@/components/public/solutions/SolutionsHero'; 
import DynamicPortfolioCard from '@/components/ui/DynamicPortfolioCard';
import FAQAccordion from '@/components/common/Faqaccordion';
import ConsultationCTA from '@/components/common/Consultation-Cta';
import IndustriesHero from '@/components/public/industries/IndustriesHero';
import CommonTitle from '@/components/ui/CommonTitle';
import IndustryTechCarousel from '@/components/public/industries/IndustryTechCarousel';
import IndustryCoversTabs from '@/components/public/industries/IndustryCoversTabs';
// --- 1. FETCH DATA HELPER ---
async function getIndustryPage(slug) {
    try {
        const page = await prisma.page.findUnique({
            where: { slug: slug },
        });

        if (!page) return null;

        const jsonContent = page.contentJson ? JSON.parse(page.contentJson) : {};
        return { 
            ...page, 
            activeSections: jsonContent.activeSections || [], 
            sections: jsonContent.content || {} 
        };
    } catch (error) {
        console.error("Error fetching page:", error);
        return null;
    }
}

// --- 2. SEO METADATA ---
export async function generateMetadata(props) {
    const params = await props.params;
    const page = await getIndustryPage(params.slug);
    if (!page) return { title: 'Page Not Found' };
    return { 
        title: page.seoTitle || `${page.title} | Softkingo`, 
        description: page.sections.hero?.description || page.title 
    };
}

// --- 3. MAIN COMPONENT ---
export default async function IndustryPage(props) {
    const params = await props.params;
    const data = await getIndustryPage(params.slug);

    if (!data) return notFound();

    // Destructure specific Industry fields
    const { 
        hero, challenges, covers, technologies, 
        portfolio, otherIndustries, whyChoose, 
        process, faq, testimonials 
    } = data.sections;

    const show = (id) => data.activeSections.includes(id);

    return (
        <main className="min-h-screen bg-white">
            
            {/* 1. HERO SECTION (Reusing SolutionsHero for consistency) */}
            {show('hero') && (
                <section className='bg-emerald-50/30'>
                    <IndustriesHero data={hero} />
                </section>
            )}

{/* 2. CHALLENGES WE SOLVE (Updated Design) */}
            {show('challenges') && (
                <section className="py-20 lg:py-28 px-6 overflow-visible">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            
                            {/* Left Side: Content & List */}
                            <div className="order-2 lg:order-1">
                                <div className="mb-8">
                                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                                        {challenges?.title || "Challenges We Solve"}
                                    </h2>
                                    {/* ✅ FIX 1: whitespace-pre-line added for line breaks */}
                                    <p className="text-lg text-slate-600 leading-relaxed mb-8 whitespace-pre-line">
                                        {challenges?.subtitle || "We address the most critical hurdles in your industry with precision engineering."}
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {challenges?.items?.map((item, i) => (
                                        <div key={i} className="flex gap-4 items-start group">
                                            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                                <CheckCircle2 size={20} strokeWidth={2.5} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                                                <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: Image & Floating Stats */}
                           
<div className="order-1 lg:order-2 relative">
                                <div className="relative z-10 -mt-[5%] overflow-hidden shadow-2xl"> 
                                    <div className="relative aspect-[4/3] w-full bg-slate-200">
                                        <Image src={challenges?.image || "/images/industry-challenge.jpg"} alt="Challenge" fill className="object-cover" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full bg-white p-6 z-20 flex justify-between items-center text-center border-t border-slate-100">
                                    <div className="px-2 w-1/3 border-r"><div className="text-2xl font-black text-emerald-600">{challenges?.stats?.[0]?.value}</div><div className="text-[10px] font-bold text-slate-400">{challenges?.stats?.[0]?.label}</div></div>
                                    <div className="px-2 w-1/3 border-r"><div className="text-2xl font-black text-sky-600">{challenges?.stats?.[1]?.value}</div><div className="text-[10px] font-bold text-slate-400">{challenges?.stats?.[1]?.label}</div></div>
                                    <div className="px-2 w-1/3"><div className="text-2xl font-black text-orange-500">{challenges?.stats?.[2]?.value}</div><div className="text-[10px] font-bold text-slate-400">{challenges?.stats?.[2]?.label}</div></div>
                                </div>
                            </div>
                      
                        </div>
                    </div>
                </section>
            )}

{/*  3. WHAT WE COVER (Redesigned) */}
         
            {show('covers') && (
                <IndustryCoversTabs data={covers} />
            )}

            {/* 4. ADVANCED TECHNOLOGIES */}
           {show('technologies') && (
                <IndustryTechCarousel 
                    title={technologies?.title || "Advanced Technologies We Use"} 
                    description="We leverage cutting-edge tech stacks to build robust solutions."
                    items={technologies?.items} 
                />
            )}

            {/* 5. PORTFOLIO (Dynamic Card) */}
            {show('portfolio') && (
                <DynamicPortfolioCard 
                    category={portfolio?.category || data.slug} // Fallback to slug if category not set
                    portfolioType="" 
                    title="Our Success Stories" 
                    subtitle="Explore how we've transformed businesses in this sector."
                />
            )}

            {/* 6. OTHER INDUSTRIES (Simple Link Grid) */}
            {show('otherIndustries') && (
                <section className="py-20 bg-slate-50 px-6">
                    <div className="max-w-7xl mx-auto text-center">
                        <h3 className="text-2xl font-bold mb-8 text-slate-900">Explore Other Industries</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {['Healthcare', 'Fintech', 'Education', 'Real Estate', 'E-Commerce', 'Logistics'].map((ind) => (
                                <Link key={ind} href={`/industries/${ind.toLowerCase().replace(/ /g, '-')}`} className="px-6 py-3 bg-white rounded-full text-sm font-medium text-slate-600 shadow-sm hover:text-emerald-600 hover:shadow-md transition-all">
                                    {ind}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 7. WHY CHOOSE */}
            {show('whyChoose') && (
                <section className="py-20 px-6 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
                        <div className='space-y-6'>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                                Why Partner With <span className="text-emerald-600">Softkingo?</span>
                            </h2>
                            <p className="text-slate-600 text-lg">
                                We combine domain expertise with technical excellence to deliver solutions that drive real growth.
                            </p>
                            <Link href="/contact" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all">
                                Get a Quote <ArrowRight size={18}/>
                            </Link>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {whyChoose?.items?.map((item, i) => (
                                <div key={i} className="p-6 bg-emerald-50/50 rounded-xl border border-emerald-100 hover:bg-emerald-50 transition-colors">
                                    <h4 className="font-bold text-emerald-900 mb-2 text-lg">{item.title}</h4>
                                    <p className="text-sm text-emerald-800/80 leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 8. PROCESS */}
            {show('process') && (
                <section className="py-20 px-6 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold mb-16 text-center">Our Development Process</h2>
                    <div className="space-y-8 relative before:absolute before:left-4 md:before:left-1/2 before:top-0 before:h-full before:w-0.5 before:bg-slate-200">
                        {process?.steps?.map((step, i) => (
                            <div key={i} className={`relative flex flex-col md:flex-row gap-8 items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="flex-1 md:text-right p-6 bg-white rounded-xl border border-slate-200 shadow-sm w-full z-10">
                                    <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                                    <p className="text-slate-500 text-sm">{step.description}</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 z-20 border-4 border-white shadow-md">
                                    {i+1}
                                </div>
                                <div className="flex-1 hidden md:block"></div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 9. FAQ */}
            {show('faq') && <FAQAccordion data={faq} />}

            {/* 10. TESTIMONIALS */}
            {show('testimonials') && (
                <section className="py-24 bg-slate-50 px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">Trusted by Industry Leaders</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {testimonials?.items?.map((t, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
                                <div className="mb-6">
                                    {[1,2,3,4,5].map(star => <span key={star} className="text-amber-400">★</span>)}
                                </div>
                                <p className="text-slate-600 italic mb-8 flex-1">"{t.feedback}"</p>
                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 relative">
                                        {t.image ? (
                                            <Image src={t.image} alt={t.name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-300 text-slate-500 font-bold text-xs">
                                                {t.name?.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-sm text-slate-900">{t.name}</div>
                                        <div className="text-xs text-slate-500">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Call To Action */}
            <ConsultationCTA 
                title="Ready to Transform Your Business?" 
                subtitle="Let's build a solution tailored to your industry needs."
                buttonLabel="Get a Free Consultation"
                href="/contact" 
            />
        </main>
    );
}