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
import IndustryWhyChooseCarousel from '@/components/public/industries/IndustryWhyChooseCarousel';
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

    const title = page.seoTitle || `${page.title} | Softkingo`;
    const description = page.seoDescription || page.sections.hero?.description || `Solutions for the ${page.title} industry by Softkingo.`;
    const image = page.seoImage || "/og-image.png";

    return {
        title,
        description,
        alternates: { canonical: `/industries/${params.slug}` },
        openGraph: {
            title,
            description,
            url: `https://www.softkingo.com/industries/${params.slug}`,
            images: [{ url: image }],
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        }
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
                <section className='bg-sky-50/30'>
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
                                        <div key={i} className="flex gap-4 items-center group">
                                            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                                <CheckCircle2 size={20} strokeWidth={2.5} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>

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
                                    <div className="px-2 w-1/3 border-r"><div className="text-2xl font-black text-sky-600">{challenges?.stats?.[0]?.value}</div><div className="text-[10px] font-bold text-slate-400">{challenges?.stats?.[0]?.label}</div></div>
                                    <div className="px-2 w-1/3 border-r"><div className="text-2xl font-black text-sky-600">{challenges?.stats?.[1]?.value}</div><div className="text-[10px] font-bold text-slate-400">{challenges?.stats?.[1]?.label}</div></div>
                                    <div className="px-2 w-1/3"><div className="text-2xl font-black text-orange-500">{challenges?.stats?.[2]?.value}</div><div className="text-[10px] font-bold text-slate-400">{challenges?.stats?.[2]?.label}</div></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            )}
            <div className="bg-slate-50" >
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
            </div>
            {/* 5. PORTFOLIO (Dynamic Card) */}
            {show('portfolio') && (
                <DynamicPortfolioCard
                    category={portfolio?.category || data.slug}
                    portfolioType=""
                    title={portfolio?.title}
                    subtitle={portfolio?.subtitle}
                />
            )}


            {/* 6. OTHER INDUSTRIES (Fixed Alignment) */}
            {show('otherIndustries') && (
                <section className="py-24 bg-slate-50 px-6 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto relative z-10">

                        {/* Common Title */}
                        <CommonTitle
                            title={otherIndustries?.title || "Industries We Serve"}
                            subtitle={otherIndustries?.subtitle || "Explore our expertise across diverse sectors."}
                            pill={true}
                            gradientText="Sectors"
                        />

                        {/* 3-Column Layout */}
                        <div className="grid lg:grid-cols-5 gap-12 items-center mt-16">

                            {/* LEFT COLUMN (Items 0-2) - Align Right */}
                            <div className="space-y-12">
                                {otherIndustries?.items?.slice(0, 3).map((item, i) => (
                                    <div key={i} className="flex items-center justify-end group gap-6">

                                        {/* Text Content (Aligned Right) */}
                                        <div className="flex-1 flex flex-col items-end text-right">
                                            <h4 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h4>
                                            {/* Line starts from right and grows to left */}
                                            <div className="h-0.5 w-24 bg-slate-200 group-hover:bg-sky-500 transition-all duration-500 origin-right group-hover:w-full"></div>
                                        </div>

                                        {/* Icon (Fixed Size) */}
                                        <div className="w-16 h-16 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            {item.icon && item.icon.includes('/') ? (
                                                <Image src={item.icon} alt="icon" width={32} height={32} className="object-contain" />
                                            ) : (
                                                <span className="text-3xl">{item.icon || "🏢"}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CENTER COLUMN (Image) */}
                            <div className="relative flex justify-center py-10 lg:py-0 col-span-3">
                                {/* Decorative Ring */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square border border-dashed border-slate-300 rounded-full animate-spin-slow opacity-30"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square bg-sky-100/50 rounded-full blur-3xl -z-10"></div>

                                <div className="relative w-full max-w-[350px] aspect-[3/4] overflow-hidden ">
                                    <Image
                                        src={otherIndustries?.image || "/images/industry-center.jpg"}
                                        alt="Industries Center"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>

                            {/* RIGHT COLUMN (Items 3-5) - Align Left */}
                            <div className="space-y-12">
                                {otherIndustries?.items?.slice(3, 6).map((item, i) => (
                                    <div key={i} className="flex items-center justify-start group gap-6">

                                        {/* Icon (Fixed Size) */}
                                        <div className="w-16 h-16 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            {item.icon && item.icon.includes('/') ? (
                                                <Image src={item.icon} alt="icon" width={32} height={32} className="object-contain" />
                                            ) : (
                                                <span className="text-3xl">{item.icon || "🚀"}</span>
                                            )}
                                        </div>

                                        {/* Text Content (Aligned Left) */}
                                        <div className="flex-1 flex flex-col items-start text-left">
                                            <h4 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h4>
                                            {/* Line starts from left and grows to right */}
                                            <div className="h-0.5 w-24 bg-slate-200 group-hover:bg-sky-500 transition-all duration-500 origin-left group-hover:w-full"></div>
                                        </div>

                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </section>
            )}

            {/* 7. WHY CHOOSE */}

            {show('whyChoose') && (
                <section className="py-24 bg-slate-50 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">

                        {/* Common Title */}
                        <CommonTitle
                            title={whyChoose?.title || "Why Partner With Softkingo?"}
                            subtitle="We combine domain expertise with technical excellence to deliver solutions that drive real growth."
                            pill={true}

                        />

                        {/* Carousel Component */}
                        <div className="mt-12">
                            <IndustryWhyChooseCarousel items={whyChoose?.items} />
                        </div>

                        {/* Bottom CTA (Optional within section) */}
                        <div className="text-center mt-8">
                            <Link href="/contact" className="inline-flex items-center gap-2 text-sky-600 font-bold hover:gap-3 transition-all">
                                Get a Quote <ArrowRight size={18} />
                            </Link>
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
                                <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 z-20 border-4 border-white shadow-md">
                                    {i + 1}
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
            {/* {show('testimonials') && (
                <section className="py-24 bg-slate-50 px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">Trusted by Industry Leaders</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {testimonials?.items?.map((t, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
                                <div className="mb-6">
                                    {[1, 2, 3, 4, 5].map(star => <span key={star} className="text-amber-400">★</span>)}
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
            )} */}

            {/* Call To Action */}
            <ConsultationCTA
                title="Ready to Transform Your Business?"
                subtitle="Let's build a solution tailored to your industry needs."
                buttonLabel="Get a Free Consultation"
                href="/contact"
                theme="white"
            />
        </main>
    );
}