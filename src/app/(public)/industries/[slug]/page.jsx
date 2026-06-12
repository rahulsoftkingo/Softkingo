import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { commonSchemas } from "@/lib/commonSchema2";

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
import IndustryProcess from '@/components/public/industries/IndustryProcess';
import BlogSection from '@/components/common/BlogSection';
import TestimonialsCarousel from '@/components/public/TestimonialCarousel2';
import FooterForm from "@/components/footer/InquirySection";
// --- 1. FETCH DATA HELPER ---
async function getIndustryPage(slug) {
    try {
        const page = await prisma.page.findUnique({
            where: { slug: slug },
        });

        if (!page) return null;

        const jsonContent = page.contentJson ? JSON.parse(page.contentJson) : {};

        // ✅ Image extraction
        function extractAllImages(obj) {
            const images = [];
            function traverse(value) {
                if (typeof value === "string" && value.match(/\.(png|jpg|jpeg|webp|svg|gif)$/i)) {
                    images.push(value);
                } else if (Array.isArray(value)) {
                    value.forEach(traverse);
                } else if (typeof value === "object" && value !== null) {
                    Object.values(value).forEach(traverse);
                }
            }
            traverse(obj);
            return [...new Set(images)];
        }

        const pageImageUrls = extractAllImages(jsonContent);

        // ✅ ImageObject array
        const imageObjects = [
            ...(page.seoImage
                ? [{ "@type": "ImageObject", "url": `https://www.softkingo.com${page.seoImage}`, "width": 1200, "height": 630 }]
                : []
            ),
            ...pageImageUrls.map(img => ({
                "@type": "ImageObject",
                "url": `https://www.softkingo.com${img}`,
                "width": 937,
                "height": 937,
            }))
        ];

        return {
            ...page,
            activeSections: jsonContent.activeSections || [],
            sections: jsonContent.content || {},
            imageObjects, // ✅ return mein add
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

    const title = page.seoTitle || page.title;
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

    // ADD THIS ↓
    const faqSchema = show('faq') && faq?.items?.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq.items.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": (item.a || '').replace(/<[^>]*>?/gm, '')
            }
        }))
    } : null;

    return (
        <main className="min-h-screen bg-white">

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        ...commonSchemas,
                        {
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "@id": "https://www.softkingo.com/#breadcrumb",
                            "itemListElement": [
                                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.softkingo.com" },
                                { "@type": "ListItem", "position": 2, "name": "Industries", "item": "https://www.softkingo.com/industries" },
                                { "@type": "ListItem", "position": 3, "name": data?.title ?? params.slug, "item": `https://www.softkingo.com/industries/${params.slug}` }
                            ]
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "Service",
                            "@id": `https://www.softkingo.com/industries/${params.slug}/#service`,
                            "name": data?.seoTitle || data?.title,
                            "description": data?.seoDescription || "",
                            // ✅ ImageObject array
                            "image": data.imageObjects,
                            "url": `https://www.softkingo.com/industries/${params.slug}`,
                        }
                    ])
                }}
            />


            {/* ADD THIS RIGHT BELOW ↓ */}
            {show('faq') && faq?.items?.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": faq.items.map(item => ({
                                "@type": "Question",
                                "name": item.q,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": (item.a || '').replace(/<[^>]*>?/gm, '')
                                }
                            }))
                        })
                    }}
                />
            )}

            {/* 1. HERO SECTION (Reusing SolutionsHero for consistency) */}
            {show('hero') && (
                <section className='bg-sky-50/30'>
                    <IndustriesHero data={hero} />
                </section>
            )}

            {/* 2. CHALLENGES WE SOLVE (Updated Design) */}
            {show('challenges') && (
                <section className="py-8 md:py-16 px-6 overflow-visible">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">

                            {/* Left Side: Content & List */}
                            <div className="order-2 lg:order-1">
                                <div className="mb-0">
                                    <CommonTitle
                                        align="left"
                                        title={challenges?.title || "Challenges We Solve"}
                                        subtitle={challenges?.subtitle || "We address the most critical hurdles in your industry with precision engineering."}
                                        pill={true}
                                        gradientText={challenges?.gradientText || "Expertise"}
                                    />
                                </div>

                                <ul className="space-y-4">
                                    {challenges?.items?.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 group">
                                            <div className="mt-1 p-1 bg-sky-100 rounded-full text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                                                <CheckCircle2 size={16} strokeWidth={2.5} />
                                            </div>
                                            <span className="text-slate-700 font-medium text-lg">{item.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right Side: Image & Floating Stats */}
                            <div className="order-1 lg:order-2 relative">
                                <div className="relative z-10 -mt-[5%] overflow-hidden shadow-2xl rounded-2xl">
                                    <div className="relative aspect-[4/3] w-full bg-slate-200">
                                        <Image src={challenges?.image || "/images/industry-challenge.jpg"} alt="Challenge" fill className="object-cover" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full bg-white p-6 z-20 flex justify-between items-center text-center border-t border-slate-100 rounded-b-2xl">
                                    <div className="px-2 w-1/3 border-r"><div className="text-2xl font-bold text-sky-600">{challenges?.stats?.[0]?.value}</div><div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{challenges?.stats?.[0]?.label}</div></div>
                                    <div className="px-2 w-1/3 border-r"><div className="text-2xl font-bold text-sky-600">{challenges?.stats?.[1]?.value}</div><div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{challenges?.stats?.[1]?.label}</div></div>
                                    <div className="px-2 w-1/3"><div className="text-2xl font-bold text-[#E67E22]">{challenges?.stats?.[2]?.value}</div><div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{challenges?.stats?.[2]?.label}</div></div>
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
                        description={technologies?.subtitle || "We leverage cutting-edge tech stacks to build robust solutions."}
                        items={technologies?.items}
                        gradientText={technologies?.gradientText || "Tech"}
                        detailedDescription={technologies?.description}
                    />
                )}
            </div>
            {/* 5. PORTFOLIO (Dynamic Card) */}
            {show('portfolio') && (
                <DynamicPortfolioCard
                    category={portfolio?.category || ""}
                    portfolioType="app"
                    title={portfolio?.title || "Industry Showcase"}
                    subtitle={portfolio?.subtitle || "Recent projects that highlight our domain mastery."}
                    gradientText={portfolio?.gradientText || "Portfolio"}
                />
            )}


            {/* 6. OTHER INDUSTRIES (Fixed Alignment) */}
            {show('otherIndustries') && (
                <section className="py-8 md:py-16 bg-slate-50 px-6 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto relative z-10">

                        {/* Common Title */}
                        <CommonTitle
                            title={otherIndustries?.title || "Industries We Serve"}
                            subtitle={otherIndustries?.subtitle || "Explore our expertise across diverse sectors."}
                            pill={true}
                            gradientText={otherIndustries?.gradientText || "Sectors"}
                        />

                        {/* 3-Column Layout */}
                        <div className="grid lg:grid-cols-3 gap-12 items-center mt-16">

                            {/* LEFT COLUMN (Items 0-2) - Align Right */}
                            <div className="space-y-12">
                                {otherIndustries?.items?.slice(0, 3).map((item, i) => (
                                    <div key={i} className="flex items-start justify-end group gap-6 cursor-pointer">

                                        {/* Text Content (Aligned Right) */}
                                        <div className="flex-1 flex flex-col items-end text-right">
                                            <h4 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-sky-600 transition-colors duration-300">{item.title}</h4>
                                            {item.description && (
                                                <p className="text-sm text-slate-500 mb-3 line-clamp-2 max-w-[250px]">{item.description}</p>
                                            )}
                                            {/* Advanced Line Hover */}
                                            <div className="relative h-[2px] w-20 bg-slate-200 overflow-hidden rounded-full">
                                                <div className="absolute top-0 right-0 h-full w-0 bg-sky-500 group-hover:w-full transition-all duration-500 origin-right"></div>
                                            </div>
                                        </div>

                                        {/* Icon (With Premium Container) */}
                                        <div className="w-16 h-16 flex items-center justify-center flex-shrink-0 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 group-hover:shadow-[0_8px_30px_rgb(14,165,233,0.15)] group-hover:border-sky-200 group-hover:-translate-y-1 transition-all duration-300 mt-1">
                                            {item.icon && item.icon.includes('/') ? (
                                                <Image src={item.icon} alt="icon" width={32} height={32} className="object-contain group-hover:scale-110 transition-transform duration-300" />
                                            ) : (
                                                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{item.icon || "🏢"}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CENTER COLUMN (Image with Premium Frame) */}
                            <div className="relative flex justify-center py-10 lg:py-0 col-span-1 min-h-[400px] items-center">
                                {/* Decorative Pulsing Rings */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square border border-sky-200/50 rounded-full animate-pulse"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] aspect-square border border-dashed border-slate-200 rounded-full animate-spin-slow opacity-40"></div>

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square bg-gradient-to-br from-sky-400/10 to-transparent rounded-full blur-3xl -z-10 animate-pulse"></div>

                                <div className="relative w-full max-w-[340px] flex items-center justify-center group">
                                    <Image
                                        src={otherIndustries?.image || "/images/industry-center.jpg"}
                                        alt="Industries Center"
                                        width={400}
                                        height={600}
                                        className="w-full h-auto object-contain max-h-[500px]  relative z-10 transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* RIGHT COLUMN (Items 3-5) - Align Left */}
                            <div className="space-y-12">
                                {otherIndustries?.items?.slice(3, 6).map((item, i) => (
                                    <div key={i} className="flex items-start justify-start group gap-6 cursor-pointer">

                                        {/* Icon (With Premium Container) */}
                                        <div className="w-16 h-16 flex items-center justify-center flex-shrink-0 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 group-hover:shadow-[0_8px_30_rgb(14,165,233,0.15)] group-hover:border-sky-200 group-hover:-translate-y-1 transition-all duration-300 mt-1">
                                            {item.icon && item.icon.includes('/') ? (
                                                <Image src={item.icon} alt="icon" width={32} height={32} className="object-contain group-hover:scale-110 transition-transform duration-300" />
                                            ) : (
                                                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{item.icon || "🚀"}</span>
                                            )}
                                        </div>

                                        {/* Text Content (Aligned Left) */}
                                        <div className="flex-1 flex flex-col items-start text-left">
                                            <h4 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-sky-600 transition-colors duration-300">{item.title}</h4>
                                            {item.description && (
                                                <p className="text-sm text-slate-500 mb-3 line-clamp-2 max-w-[250px]">{item.description}</p>
                                            )}
                                            {/* Advanced Line Hover */}
                                            <div className="relative h-[2px] w-20 bg-slate-200 overflow-hidden rounded-full">
                                                <div className="absolute top-0 left-0 h-full w-0 bg-sky-500 group-hover:w-full transition-all duration-500 origin-left"></div>
                                            </div>
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
                <section className="py-8 md:py-16 bg-slate-50 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">

                        {/* Common Title */}
                        <CommonTitle
                            title={whyChoose?.title || "Why Partner With Softkingo?"}
                            subtitle={whyChoose?.subtitle || "We combine domain expertise with technical excellence to deliver solutions that drive real growth."}
                            pill={true}
                            gradientText={whyChoose?.gradientText || "Partnership"}
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
                <IndustryProcess data={process} />
            )}

            {/* 9. FAQ */}
            {show('faq') && <FAQAccordion data={faq} />}

            {/* 10. TESTIMONIALS */}
            {show('testimonials') && (
                <section className="py-8 md:py-16 bg-white px-6">
                    <div className="max-w-7xl mx-auto">
                        <CommonTitle
                            title={testimonials?.title || "What Our Clients Say"}
                            subtitle={testimonials?.subtitle || "Success stories from industry leaders who trust our expertise."}
                            pill={true}
                            gradientText={testimonials?.gradientText || "Feedback"}
                        />
                        <div className="mt-16">
                            <TestimonialsCarousel data={testimonials?.items || []} />
                        </div>
                    </div>
                </section>
            )}

            {/* 11. Call To Action */}
            {show('consultation') && (
                <ConsultationCTA
                    title={data.sections.consultation?.title || "Ready to Transform Your Business?"}
                    subtitle={data.sections.consultation?.subtitle || "Let's build a solution tailored to your industry needs."}
                    buttonLabel={data.sections.consultation?.buttonLabel || "Get a Free Consultation"}
                    href={data.sections.consultation?.href || "/contact"}
                    theme="white"
                />
            )}
            {/* 11. BLOG SECTION */}
            {show('blogs') && (
                <BlogSection
                    category={data.sections.blogCategory || ""}
                    title={data.sections.blogTitle || "Our Latest Blogs"}
                    subtitle={data.sections.blogSubtitle || "Explore our latest insights, product lessons, and engineering best practices."}
                    gradientText={data.sections.blogGradientText || "Insights"}
                />
            )}

            {/* 12. INQUIRY SECTION */}
            {show('inquiry') && (
                <FooterForm
                    tagline={data.sections.inquiry?.tagline}
                    title={data.sections.inquiry?.title}
                    subtitle={data.sections.inquiry?.subtitle}
                    titlePrefix={data.sections.inquiry?.titlePrefix}
                />
            )}

        </main>
    );
}