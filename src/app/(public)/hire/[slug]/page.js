


// // src/app/(public)/hire/[slug]/page.js

// import { notFound } from 'next/navigation';
// import prisma from '@/lib/prisma';
// import Image from 'next/image';
// import Link from 'next/link';

// import LeadForm from '@/components/public/LeadForm';
// import FooterForm from '@/components/footer/InquirySection';

// import HireDevelopersPage from './SelectDeveloper';
// import TechStack from './TechStack';

// import { BsCheckCircle, BsTransparency, BsFileEarmarkBarGraph } from 'react-icons/bs';
// import { GiBullseye } from 'react-icons/gi';
// import { CiClock1, CiTimer } from 'react-icons/ci';
// import { TbCalendarClock } from 'react-icons/tb';
// import {
//   FaComments,
//   FaLightbulb,
//   FaRocket,
//   FaSearch,
//   FaThumbsUp,
//   FaUser,
//   FaUsers,
// } from 'react-icons/fa';

// function parseJsonSafe(str) {
//   if (!str) return {};
//   try {
//     return JSON.parse(str);
//   } catch {
//     return {};
//   }
// }

// function getFeatureIcon(iconKey) {
//   const map = {
//     FaUser: <FaUser />,
//     FaUsers: <FaUsers />,
//     FaRocket: <FaRocket />,
//     FaLightbulb: <FaLightbulb />,
//     FaComments: <FaComments />,
//     FaSearch: <FaSearch />,
//   };
//   return map[iconKey] || <FaUser />;
// }

// function getServiceIcon(iconKey, size = 64) {
//   const map = {
//     BsTransparency: <BsTransparency size={size} />,
//     BsFileEarmarkBarGraph: <BsFileEarmarkBarGraph size={size} />,
//     GiBullseye: <GiBullseye size={size} />,
//   };
//   return map[iconKey] || <BsTransparency size={size} />;
// }

// function getModelIcon(iconKey) {
//   const map = {
//     CiClock1: <CiClock1 className="w-10 h-10 text-sky-300" />,
//     TbCalendarClock: <TbCalendarClock className="w-10 h-10 text-sky-200" />,
//     CiTimer: <CiTimer className="w-10 h-10 text-slate-200" />,
//   };
//   return map[iconKey] || <CiClock1 className="w-10 h-10 text-sky-300" />;
// }

// function normalizeHireContent(page) {
//   const c = parseJsonSafe(page?.contentJson);

//   // ---------- basics ----------
//   const heroBg = c.heroBg || '/images/hire/hire1.png';
//   const heroTitle = c.heroTitle || page?.title || 'Hire Developers';
//   const heroSubtitle =
//     c.heroSubtitle ||
//     page?.excerpt ||
//     'Build your dream team with top 1% tech talent perfectly aligned to your business needs.';
//   const badgeText = c.badgeText || 'Hire Page';
//   const metrics = {
//     avgTime: c.metrics?.avgTime || '48 Hours',
//     network: c.metrics?.network || '100+ Experts',
//     rating: c.metrics?.rating || '4.9/5',
//   };

//   // ---------- sections: about/features/benefits/steps ----------
//   const aboutTitle = c.aboutTitle || page?.title || heroTitle;
//   const aboutSubtitle =
//     c.aboutSubtitle ||
//     page?.excerpt ||
//     'Softkingo provides experienced developers to build highly interactive web and mobile apps with modern UI/UX.';
//   const features = Array.isArray(c.features) ? c.features : [];
//   const benefits = Array.isArray(c.benefits) ? c.benefits : [];
//   const steps = Array.isArray(c.steps) ? c.steps : [];

//   // ---------- services cards ----------
//   const services = Array.isArray(c.services)
//     ? c.services
//     : [
//         {
//           title: 'Transparent',
//           iconKey: 'BsTransparency',
//           description:
//             'Set the rules for your journey by negotiating with us directly. Transparency with clients is our motto.',
//           bg: 'from-sky-500 to-sky-600',
//           textDark: false,
//         },
//         {
//           title: 'Productive',
//           iconKey: 'BsFileEarmarkBarGraph',
//           description:
//             'Enhance your team with distractions-spared developers and bring strong waves of productivity.',
//           bg: 'from-emerald-500 to-emerald-600',
//           textDark: false,
//         },
//         {
//           title: 'To the point',
//           iconKey: 'GiBullseye',
//           description:
//             'Find the perfect remote developers for the busy market. Just tailored services to your needs.',
//           bg: 'from-slate-100 to-slate-200',
//           textDark: true,
//         },
//       ];

//   // ---------- services provided ----------
//   const moreServices = Array.isArray(c.moreServices)
//     ? c.moreServices
//     : [
//         {
//           title: 'Front-end web development',
//           icon: '💻',
//           description:
//             'Our front-end developers can swear by user-friendly and seamless navigation throughout the website. A complete understanding of the web technologies like HTML, CSS and Javascript can craft such websites.',
//         },
//       ];

//   // ---------- detailed profile section ----------
//   const profileSection = c.profileSection || {};
//   const profileFeatures = Array.isArray(profileSection.profileFeatures)
//     ? profileSection.profileFeatures
//     : ['Professional Summary', 'Major Projects', 'Work History', 'Intro Video', 'Verified Profile'];

//   const profileImages = {
//     leftTop: profileSection.images?.leftTop || '/images/hire/h7.png',
//     rightTop: profileSection.images?.rightTop || '/images/hire/h6.png',
//     rightBottom: profileSection.images?.rightBottom || '/images/hire/h5.png',
//   };

//   // ---------- CTA banner ----------
//   const ctaBanner = c.ctaBanner || {
//     enabled: true,
//     title: 'Book A FREE Consultation With Us',
//     subtitle:
//       "Share your project idea and we'll provide a free consultation on how we can turn it into a reality and build an amazing digital product.",
//     buttonText: 'Book a Free Demo',
//     buttonHref: '#lead-form',
//     image: '/images/consultant.png',
//   };

//   // ---------- comparison table ----------
//   const comparisonSection = c.comparisonSection || {};
//   const comparisonTitle =
//     comparisonSection.title || 'Why Softkingo is the better choice for Tech companies';
//   const comparisonColumns = comparisonSection.columns || [
//     { key: 'softkingo', label: 'Softkingo', headerClass: 'text-blue-600 font-bold' },
//     { key: 'recruiting', label: 'Recruiting Agencies', headerClass: 'text-gray-600 font-semibold' },
//     { key: 'outsourcing', label: 'Outsourcing', headerClass: 'text-gray-600 font-semibold' },
//   ];

//   const comparisonRows = Array.isArray(comparisonSection.rows)
//     ? comparisonSection.rows
//     : [
//         {
//           category: 'Top Talents',
//           softkingo: { icon: '✅', text: 'Startup-experienced, vetted', highlight: true },
//           recruiting: { icon: '❌', text: 'No vetting' },
//           outsourcing: { icon: '⚠️', text: 'Generalist, mixed expertise' },
//         },
//       ];

//   // ---------- working models ----------
//   const modelsSection = c.modelsSection || {};
//   const modelsTitle = modelsSection.title || 'Our Flexible Working Model';
//   const modelsSubtitle =
//     modelsSection.subtitle ||
//     'We make hiring dedicated developers easy with flexible models tailored to your needs.';
//   const models = Array.isArray(modelsSection.models)
//     ? modelsSection.models
//     : [
//         {
//           title: 'Full-time',
//           iconKey: 'CiClock1',
//           description:
//             'Hire dedicated developers to work exclusively on your project. Ideal for long-term and large-scale development needs.',
//           features: ['8 hrs/day', 'Monthly billing', 'Team integration'],
//           buttonText: 'Hire Now',
//         },
//       ];

//   // ---------- why hire (benefits grid) ----------
//   const whyHireSection = c.whyHireSection || {};
//   const whyHireTitle =
//     whyHireSection.title || 'Why You Should Hire Dedicated Developers From Softkingo';
//   const whyHireItems = Array.isArray(whyHireSection.items)
//     ? whyHireSection.items
//     : [
//         {
//           title: 'Experienced & Skilled Resources',
//           desc: 'You can hire a team of experienced professionals who have great domain expertise.',
//         },
//       ];

//   // ---------- business types section ----------
//   const businessTypesSection = c.businessTypesSection || {};
//   const businessTypesTitle =
//     businessTypesSection.title ||
//     'Hire Front-end Developers Who Are Passionate to Turn Business Idea into A Reality';
//   const businessTypesSubtitle =
//     businessTypesSection.subtitle ||
//     'Hire Futuristic Front-end Developers to Access Our Technical Proficiency.';
//   const businessTypes = Array.isArray(businessTypesSection.items)
//     ? businessTypesSection.items
//     : [];

//   // ---------- pricing plans ----------
//   const pricingSection = c.pricingSection || {};
//   const pricingTitle = pricingSection.title || 'Pricing Plans';
//   const pricingSubtitle =
//     pricingSection.subtitle || 'Our pricing plans, along with a free trial of 2 weeks';
//   const pricingPlans = Array.isArray(pricingSection.plans) ? pricingSection.plans : [];

//   // ---------- footer form ----------
//   const footerFormSection = c.footerFormSection || { enabled: true };

//   return {
//     heroBg,
//     heroTitle,
//     heroSubtitle,
//     badgeText,
//     metrics,

//     aboutTitle,
//     aboutSubtitle,
//     features,
//     benefits,
//     steps,

//     services,
//     moreServices,

//     profileSection: {
//       enabled: profileSection.enabled ?? true,
//       title:
//         profileSection.title ||
//         'Detailed profile for Confident Hiring Decisions',
//       subtitle:
//         profileSection.subtitle ||
//         'Each candidate profile includes comprehensive details to ensure you make the right choice.',
//       profileFeatures,
//       images: profileImages,
//     },

//     ctaBanner,
//     comparisonSection: {
//       enabled: comparisonSection.enabled ?? true,
//       title: comparisonTitle,
//       columns: comparisonColumns,
//       rows: comparisonRows,
//     },

//     modelsSection: {
//       enabled: modelsSection.enabled ?? true,
//       title: modelsTitle,
//       subtitle: modelsSubtitle,
//       models,
//     },

//     whyHireSection: {
//       enabled: whyHireSection.enabled ?? true,
//       title: whyHireTitle,
//       items: whyHireItems,
//     },

//     businessTypesSection: {
//       enabled: businessTypesSection.enabled ?? true,
//       title: businessTypesTitle,
//       subtitle: businessTypesSubtitle,
//       items: businessTypes,
//     },

//     pricingSection: {
//       enabled: pricingSection.enabled ?? true,
//       title: pricingTitle,
//       subtitle: pricingSubtitle,
//       plans: pricingPlans,
//     },

//     footerFormSection,
//   };
// }

// // SEO metadata
// export async function generateMetadata({ params }) {
//   const { slug } = await params; // Next 15+ safe [file:171]

//   const page = await prisma.page.findFirst({
//     where: { slug, status: 'published', type: 'hire' },
//   });

//   if (!page) return { title: 'Hire Developers' };

//   return {
//     title: page.seoTitle || page.title,
//     description: page.seoDescription || page.excerpt || undefined,
//     openGraph: {
//       title: page.seoTitle || page.title,
//       description: page.seoDescription || page.excerpt || undefined,
//       images: page.seoImage ? [page.seoImage] : [],
//     },
//      alternates: {
//       canonical: `/hire/${slug}`,
//     },
//   };
// }

// export default async function HireSlugPage({ params }) {
//   const { slug } = await params; // Next 15+ safe [file:171]

//   const page = await prisma.page.findFirst({
//     where: { slug, status: 'published', type: 'hire' },
//   });

//   if (!page) notFound();

//   const content = normalizeHireContent(page);

//   return (
//     <main className="relative bg-white overflow-x-hidden">
//       {/* HERO */}
//       <section
//         className="relative h-[260px] md:h-[320px] lg:h-[380px] bg-cover bg-center"
//         style={{ backgroundImage: `url('${content.heroBg}')` }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-[#001322]/45 to-white/10" />
//         <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
//           <div>
//             <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-200/70 mb-3">
//               <Link href="/" className="hover:text-cyan-400 transition-colors">
//                 Home
//               </Link>
//               <span>›</span>
//               <Link href="/hire" className="hover:text-cyan-400 transition-colors">
//                 Hire
//               </Link>
//               <span>›</span>
//               <span className="text-cyan-400 font-medium">{content.heroTitle}</span>
//             </nav>

//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
//               {content.heroTitle}
//             </h1>

//             <p className="mt-3 max-w-xl text-xs md:text-sm lg:text-base text-slate-100/90">
//               {content.heroSubtitle}
//             </p>

//             <div className="mt-5 flex flex-wrap gap-4 text-xs md:text-sm text-slate-100/80 hidden">
//               <p className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 px-4 py-1.5 rounded-full border border-sky-400">
//                 <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
//                 {content.badgeText}
//               </p>

//               <p className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
//                 Avg Hiring: <span className="text-white font-semibold">{content.metrics.avgTime}</span>
//               </p>

//               <p className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
//                 Network: <span className="text-white font-semibold">{content.metrics.network}</span>
//               </p>

//               <p className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
//                 Rating:{' '}
//                 <span className="text-white font-semibold flex items-center gap-1">
//                   {content.metrics.rating} <FaThumbsUp className="text-emerald-400" />
//                 </span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

// {/* FEATURES */}
// {!!content.features?.length && (
//   <section className="w-full">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-10 relative z-10">
//       <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden">
//         {content.features.map((f, i) => (
//           <div
//             key={i}
//             className="flex gap-3 p-5 border-t md:border-t-0 md:border-r last:border-r-0 border-slate-100/70 hover:bg-sky-50/60 transition-colors"
//           >
//             <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-xl text-sky-600">
//               {getFeatureIcon(f.iconKey)}
//             </div>
//             <div>
//               <h3 className="text-sm font-semibold text-slate-900">{f.title}</h3>
//               <p className="text-xs text-slate-600 mt-1 leading-relaxed">
//                 {f.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// )}

//       {/* ABOUT + BENEFITS + FORM */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="lead-form">
//         <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_minmax(320px,380px)] gap-10 items-start">
//           <div>
//             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
//               {content.aboutTitle}
//             </h2>
//             <p className="text-slate-600 mb-4 text-sm md:text-base leading-relaxed">
//               {content.aboutSubtitle}
//             </p>

//             {!!content.benefits?.length && (
//               <div className="space-y-3">
//                 {content.benefits.map((b, i) => (
//                   <div key={i} className="flex items-start gap-3">
//                     <span className="flex-shrink-0 mt-0.5">
//                       <BsCheckCircle className="w-4 h-4 text-sky-600" />
//                     </span>
//                     <span className="text-slate-700 text-sm">{b}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="w-full">
//             <LeadForm
//               formType="hire"
//               formKey="hire"
//               serviceName="Hire Developers"
//               title={content.heroTitle}
//               subtitle="Get matched with top talent in 24 Hours! "
//               variant="solid"
//               showLogo={true}
//               showCompany={false}
//               showBudget={false}
//               showAttachment={false}
//               showNDA={false}
//             />
//           </div>
//         </div>
//       </section>

// {/* STEPS */}
// {!!content.steps?.length && (
//   <section className="bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-500">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
//       <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-10">
//         How To Hire From Softkingo
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
//         {content.steps.map((step, index) => (
//           <div
//             key={index}
//             className={`px-4 py-6 text-center ${
//               index < content.steps.length - 1 ? 'md:border-r border-white/30' : ''
//             }`}
//           >
//             <div className="flex items-center justify-center mb-3">
//               <span className="text-5xl font-bold text-white/90 mr-2">
//                 {step.number ?? index + 1}
//               </span>
//               <Image
//                 alt={step.title || `Step ${index + 1}`}
//                 src={step.icon || '/images/hire/h1.png'}
//                 width={50}
//                 height={50}
//                 className="drop-shadow-md"
//               />
//             </div>
//             <h3 className="text-white text-base md:text-lg font-semibold mb-2">
//               {step.title}
//             </h3>
//             <p className="text-white/90 text-xs md:text-sm leading-relaxed">
//               {step.description}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// )}

//       {/* SERVICES CARDS */}
//       {!!content.services?.length && (
//         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="border-2 border-dashed border-sky-300 rounded-2xl p-6 md:p-10 bg-sky-50/40">
//             <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">
//               Developers As A Service
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {content.services.map((s, i) => (
//                 <div
//                   key={i}
//                   className={`rounded-2xl p-7 flex flex-col items-center text-center shadow-lg bg-gradient-to-br ${s.bg} ${
//                     s.textDark ? 'text-slate-900' : 'text-white'
//                   }`}
//                 >
//                   <h3 className="text-xl font-bold mb-4">{s.title}</h3>
//                   <div className="mb-5 flex items-center justify-center">
//                     <div className="w-24 h-24 rounded-full flex items-center justify-center bg-white/15">
//                       {getServiceIcon(s.iconKey, 64)}
//                     </div>
//                   </div>
//                   <p className={`text-sm leading-relaxed ${s.textDark ? 'text-slate-700' : 'text-white/90'}`}>
//                     {s.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Industry component (keep as is) */}
//       <HireDevelopersPage />

//       {/* SERVICES PROVIDED */}
//       {!!content.moreServices?.length && (
//         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 md:p-10 bg-white">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//               <div>
//                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
//                   Services Provided
//                 </h2>
//                 <p className="text-slate-600 mb-6 text-sm">
//                   Services that our resource will provide to your business
//                 </p>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {content.moreServices.map((s, i) => (
//                     <div key={i} className="flex items-start gap-2">
//                       <span className="text-sky-500 mt-0.5">▶</span>
//                       <span className="text-slate-700 text-sm">{s.title}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="space-y-4 h-[420px] overflow-y-auto pr-1">
//                 {content.moreServices.map((s, i) => (
//                   <div
//                     key={i}
//                     className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow"
//                   >
//                     <div className="flex items-start gap-4">
//                       <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-xl">
//                         {s.icon || '✨'}
//                       </div>
//                       <div>
//                         <h3 className="text-base font-semibold text-slate-900 mb-1">
//                           {s.title}
//                         </h3>
//                         <p className="text-slate-600 text-xs leading-relaxed">
//                           {s.description}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//             </div>
//           </div>
//         </section>
//       )}

//       {/* DETAILED PROFILE SECTION */}
//       {content.profileSection.enabled && (
//         <section className="bg-gradient-to-r from-sky-400 to-sky-300">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//             <div className="mb-12">
//               <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
//                 {content.profileSection.title}
//               </h2>
//               <p className="text-white/90 text-base md:text-lg mb-8 max-w-3xl">
//                 {content.profileSection.subtitle}
//               </p>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="col-span-1">
//                     <div className="overflow-hidden rounded-lg">
//                       <Image
//                         src={content.profileSection.images.leftTop}
//                         width={1000}
//                         height={1000}
//                         alt="Profile Preview"
//                         className="object-cover"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-span-1 flex flex-col gap-4">
//                     <div className="overflow-hidden rounded-lg flex-1">
//                       <Image
//                         src={content.profileSection.images.rightTop}
//                         width={1000}
//                         height={1000}
//                         alt="Chart Preview"
//                         className="object-cover"
//                       />
//                     </div>
//                     <div className="flex-1 rounded-lg overflow-hidden">
//                       <Image
//                         src={content.profileSection.images.rightBottom}
//                         width={1000}
//                         height={1000}
//                         alt="Professional Summary"
//                         className="object-cover"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8">
//                   <div className="space-y-4">
//                     {(content.profileSection.profileFeatures || []).map((feature, index) => (
//                       <div
//                         key={index}
//                         className="bg-white/20 hover:bg-white/30 transition-all duration-300 rounded-lg p-4 cursor-pointer"
//                       >
//                         <h3 className="text-white text-base md:text-lg font-semibold">
//                           {feature}
//                         </h3>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* CTA BANNER */}
//       {content.ctaBanner?.enabled && (
//         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
//             <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
//               <div className="text-white z-10">
//                 <h2 className="text-2xl md:text-3xl font-bold mb-4">
//                   {content.ctaBanner.title}
//                 </h2>
//                 <p className="text-white/90 mb-6 max-w-2xl">
//                   {content.ctaBanner.subtitle}
//                 </p>

//                 <Link
//                   href={content.ctaBanner.buttonHref || '#lead-form'}
//                   className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
//                 >
//                   {content.ctaBanner.buttonText || 'Book a Free Demo'}
//                 </Link>
//               </div>

//               {!!content.ctaBanner.image && (
//                 <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto md:mx-0 hidden md:block">
//                   <Image
//                     src={content.ctaBanner.image}
//                     alt="Consultant"
//                     fill
//                     className="object-contain"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* COMPARISON TABLE */}
//       {content.comparisonSection.enabled && (
//         <section className="bg-gradient-to-r from-sky-200 to-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
//               {content.comparisonSection.title}
//             </h2>

//             <div className="bg-white overflow-x-auto">
//               <div className="min-w-[800px]">
//                 <div className="grid grid-cols-4 gap-4 bg-gray-50 p-6 border-b-2 border-gray-200">
//                   <div className="font-semibold text-gray-700">Category</div>
//                   <div className="text-center font-bold text-blue-600">
//                     {content.comparisonSection.columns?.[0]?.label || 'Softkingo'}
//                   </div>
//                   <div className="text-center font-semibold text-gray-600">
//                     {content.comparisonSection.columns?.[1]?.label || 'Recruiting Agencies'}
//                   </div>
//                   <div className="text-center font-semibold text-gray-600">
//                     {content.comparisonSection.columns?.[2]?.label || 'Outsourcing'}
//                   </div>
//                 </div>

//                 {content.comparisonSection.rows.map((row, index) => (
//                   <div
//                     key={index}
//                     className={`grid grid-cols-4 gap-4 p-4 items-center ${
//                       index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
//                     } hover:bg-blue-50 transition-colors`}
//                   >
//                     <div className="font-medium text-gray-700 text-sm md:text-base">
//                       {row.category}
//                     </div>

//                     <div className={`text-center p-2 rounded-lg ${
//                       row.softkingo?.highlight ? 'bg-blue-50 border-2 border-blue-200' : ''
//                     }`}>
//                       <div className="flex flex-col md:flex-row items-center justify-center gap-2">
//                         {row.softkingo?.icon && (
//                           <span className="text-xl text-green-500">{row.softkingo.icon}</span>
//                         )}
//                         <span className="text-sm md:text-base text-gray-800 font-medium">
//                           {row.softkingo?.text}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="text-center p-4">
//                       <div className="flex flex-col md:flex-row items-center justify-center gap-2">
//                         {row.recruiting?.icon && (
//                           <span className="text-xl text-red-500">{row.recruiting.icon}</span>
//                         )}
//                         <span className="text-sm md:text-base text-gray-600">
//                           {row.recruiting?.text}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="text-center p-4">
//                       <div className="flex flex-col md:flex-row items-center justify-center gap-2">
//                         {row.outsourcing?.icon && (
//                           <span className="text-xl">{row.outsourcing.icon}</span>
//                         )}
//                         <span className="text-sm md:text-base text-gray-600">
//                           {row.outsourcing?.text}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//               </div>
//             </div>

//           </div>
//         </section>
//       )}

//       {/* TECH STACK (component) */}
//       <TechStack />

//       {/* WORKING MODELS */}
//       {content.modelsSection.enabled && (
//         <section className="bg-gradient-to-b from-sky-50 via-white to-sky-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//             <div className="text-center mb-12 max-w-2xl mx-auto">
//               <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
//                 {content.modelsSection.title}
//               </h2>
//               <p className="text-slate-600 text-sm md:text-base">
//                 {content.modelsSection.subtitle}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {(content.modelsSection.models || []).map((m, i) => (
//                 <div
//                   key={i}
//                   className="bg-slate-900 rounded-3xl p-7 flex flex-col text-white shadow-xl"
//                 >
//                   <div className="flex items-center gap-4 mb-5">
//                     <div className="bg-white/10 p-3 rounded-full">
//                       {getModelIcon(m.iconKey)}
//                     </div>
//                     <h3 className="text-xl font-bold">{m.title}</h3>
//                   </div>

//                   <p className="text-slate-300 text-xs mb-6 border-b border-slate-700 pb-4 leading-relaxed">
//                     {m.description}
//                   </p>

//                   <ul className="space-y-2 mb-6">
//                     {(m.features || []).map((f, idx) => (
//                       <li key={idx} className="flex items-center gap-2 text-xs">
//                         <div className="bg-white rounded-full p-0.5">
//                           <BsCheckCircle className="w-3 h-3 text-slate-900" />
//                         </div>
//                         <span className="text-slate-100">{f}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   <button className="mt-auto w-full py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold">
//                     {m.buttonText || 'Hire Now'}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* WHY HIRE */}
//       {content.whyHireSection.enabled && (
//         <section className="relative bg-sky-500 py-16">
//           <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10">
//               <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center md:text-left">
//                 {content.whyHireSection.title}
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//                 {(content.whyHireSection.items || []).map((item, idx) => (
//                   <div key={idx} className="flex gap-3 items-start">
//                     <BsCheckCircle className="w-5 h-5 text-sky-500 mt-1" />
//                     <div>
//                       <h4 className="font-semibold text-slate-800 text-sm mb-1">
//                         {item.title}
//                       </h4>
//                       <p className="text-slate-600 text-xs leading-relaxed">
//                         {item.desc}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//             </div>
//           </div>
//         </section>
//       )}

//       {/* BUSINESS TYPES */}
//       {content.businessTypesSection.enabled && (
//         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
//           <div className="mb-12 max-w-5xl mx-auto text-center md:text-left">
//             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
//               {content.businessTypesSection.title}
//             </h2>
//             <p className="text-slate-600 text-lg md:text-xl">
//               {content.businessTypesSection.subtitle}
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {(content.businessTypesSection.items || []).map((type, idx) => (
//               <div
//                 key={idx}
//                 className="group flex flex-col relative bg-slate-50 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
//               >
//                 <div className="relative h-96">
//                   <div className="absolute top-0 left-0 w-full p-8 z-20 text-white">
//                     <h3 className="text-2xl font-bold mb-4">{type.title}</h3>
//                     <p className="text-slate-200 text-sm leading-relaxed">
//                       {type.description}
//                     </p>
//                   </div>
//                   <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10" />
//                   <Image
//                     src={type.image}
//                     alt={type.title}
//                     fill
//                     className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* PRICING PLANS */}
//       {content.pricingSection.enabled && (
//         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-slate-900 mb-4">
//               {content.pricingSection.title}
//             </h2>
//             <p className="text-slate-600 text-lg">
//               {content.pricingSection.subtitle}
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
//             {(content.pricingSection.plans || []).map((plan, idx) => (
//               <div
//                 key={idx}
//                 className={`${plan.cardClass || 'bg-slate-900'} rounded-3xl p-4 md:p-8 text-white text-center flex flex-col h-full shadow-xl hover:scale-105 transition-transform duration-300 ${
//                   plan.featured ? 'md:scale-105 z-10 border-4 border-white/20 relative overflow-hidden' : ''
//                 }`}
//               >
//                 {plan.featured && (
//                   <div className="absolute top-6 left-12 -translate-x-12 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-2 text-sm font-medium">
//                     Recommended <FaThumbsUp size={16} />
//                   </div>
//                 )}

//                 <div className={plan.featured ? 'mt-12' : ''}>
//                   <h3 className="text-3xl font-bold mb-2 leading-tight">
//                     {plan.title}
//                   </h3>
//                   <p className="text-white/90 text-sm mb-8 leading-relaxed px-2">
//                     {plan.subtitle}
//                   </p>

//                   <div className="mb-8">
//                     <span className="text-5xl font-bold">{plan.price}</span>
//                     <span className="block text-white/80 mt-1 text-sm">{plan.priceNote}</span>
//                   </div>

//                   <div className="bg-black/10 rounded-2xl p-4 md:p-6 text-left space-y-3 mb-8 flex-grow text-sm">
//                     {(plan.features || []).map((f, i) => (
//                       <p key={i}>{f}</p>
//                     ))}
//                   </div>

//                   <button className="w-full py-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white font-semibold transition-colors">
//                     {plan.buttonText || 'Hire Now'}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* FOOTER FORM */}
//       {content.footerFormSection?.enabled !== false && <FooterForm />}
//     </main>
//   );
// }










import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

// --- COMPONENTS ---
import LeadForm from '@/components/public/LeadForm';
import FooterForm from '@/components/footer/InquirySection';
import HireDevelopersPage from './SelectDeveloper';
import TechStack from './TechStack';
import CommonTitle from '@/components/ui/CommonTitle';

// --- ICONS ---
import { BsCheckCircle, BsTransparency, BsFileEarmarkBarGraph } from 'react-icons/bs';
import { GiBullseye } from 'react-icons/gi';
import { CiClock1, CiTimer } from 'react-icons/ci';
import { TbCalendarClock } from 'react-icons/tb';
import {
  FaComments, FaLightbulb, FaRocket, FaSearch, FaThumbsUp, FaUser, FaUsers, FaLaptopCode, FaCogs, FaBug, FaCheckCircle, FaTimesCircle, FaExclamationTriangle
} from 'react-icons/fa';
import ConsultationCTA from '@/components/common/Consultation-Cta';
import { ThumbsUp } from 'lucide-react';

// --- HELPERS ---
function parseJsonSafe(str) {
  if (!str) return {};
  try { return JSON.parse(str); } catch { return {}; }
}

function getIcon(key, size = 24, className = "") {
  const map = {
    // Feature Icons
    FaUser: <FaUser size={size} className={className} />,
    FaUsers: <FaUsers size={size} className={className} />,
    FaRocket: <FaRocket size={size} className={className} />,
    FaLightbulb: <FaLightbulb size={size} className={className} />,
    FaComments: <FaComments size={size} className={className} />,
    FaSearch: <FaSearch size={size} className={className} />,
    // Service Icons
    BsTransparency: <BsTransparency size={size} className={className} />,
    BsFileEarmarkBarGraph: <BsFileEarmarkBarGraph size={size} className={className} />,
    GiBullseye: <GiBullseye size={size} className={className} />,
    // Model Icons
    CiClock1: <CiClock1 size={size} className={className} />,
    TbCalendarClock: <TbCalendarClock size={size} className={className} />,
    CiTimer: <CiTimer size={size} className={className} />,
    // Tech Icons
    FaLaptopCode: <FaLaptopCode size={size} className={className} />,
    FaCogs: <FaCogs size={size} className={className} />,
    FaBug: <FaBug size={size} className={className} />,
    // Status Icons
    FaCheckCircle: <FaCheckCircle size={size} className={className} />,
    FaTimesCircle: <FaTimesCircle size={size} className={className} />,
    FaExclamationTriangle: <FaExclamationTriangle size={size} className={className} />
  };
  return map[key] || <FaUser size={size} className={className} />;
}

// --- DATA NORMALIZER ---
function normalizeHireContent(page) {
  const c = parseJsonSafe(page?.contentJson);

  return {
    heroBg: c.heroBg || '/images/hire/hire1.png',
    heroTitle: c.heroTitle || page?.title || 'Hire Developers',
    heroSubtitle: c.heroSubtitle || 'Build your dream team with top 1% tech talent perfectly aligned to your business needs.',
    badgeText: c.badgeText || 'Hire Page',
    metrics: {
      avgTime: c.metrics?.avgTime || '48 Hours',
      network: c.metrics?.network || '100+ Experts',
      rating: c.metrics?.rating || '4.9/5',
    },

    aboutTitle: c.aboutTitle || 'Front-End Developers by Softkingo',
    aboutSubtitle: c.aboutSubtitle || 'Softkingo has a pool of top Front-end developers who can deliver an extraordinary user experience.',
    features: Array.isArray(c.features) ? c.features : [],
    benefits: Array.isArray(c.benefits) ? c.benefits : [],
    steps: Array.isArray(c.steps) ? c.steps : [],
    services: Array.isArray(c.services) ? c.services : [],
    moreServices: Array.isArray(c.moreServices) ? c.moreServices : [],

    profileSection: {
      enabled: c.profileSection?.enabled ?? true,
      title: c.profileSection?.title || 'Detailed profile for Confident Hiring Decisions',
      subtitle: c.profileSection?.subtitle || 'Each candidate profile includes comprehensive details to ensure you make the right choice.',
      profileFeatures: c.profileSection?.profileFeatures || [],
      images: c.profileSection?.images || {
        leftTop: '/images/hire/h7.png',
        rightTop: '/images/hire/h6.png',
        rightBottom: '/images/hire/h5.png',
      },
    },

    ctaBanner: {
      enabled: c.ctaBanner?.enabled ?? true,
      title: c.ctaBanner?.title || 'Book A FREE Consultation With Us',
      subtitle: c.ctaBanner?.subtitle || "Share your project idea and we'll provide a free consultation.",
      buttonText: c.ctaBanner?.buttonText || 'Book a Free Demo',
      buttonHref: c.ctaBanner?.buttonHref || '#lead-form',
      image: c.ctaBanner?.image || '/images/consultant.png',
    },
    comparisonSection: {
      enabled: c.comparisonSection?.enabled ?? true,
      title: c.comparisonSection?.title || 'Why Softkingo is the better choice for Tech companies',
      columns: c.comparisonSection?.columns || [
        { label: 'Softkingo' }, { label: 'Recruiting Agencies' }, { label: 'Outsourcing' }
      ],
      rows: c.comparisonSection?.rows || []
    },
    modelsSection: {
      enabled: c.modelsSection?.enabled ?? true,
      title: c.modelsSection?.title || 'Our Flexible Working Model',
      subtitle: c.modelsSection?.subtitle || 'We make hiring dedicated developers easy with flexible models tailored to your needs.',
      models: c.modelsSection?.models || []
    },
    whyHireSection: {
      enabled: c.whyHireSection?.enabled ?? true,
      title: c.whyHireSection?.title || 'Why You Should Hire From Us',
      items: c.whyHireSection?.items || []
    },
    businessTypesSection: {
      enabled: c.businessTypesSection?.enabled ?? true,
      title: c.businessTypesSection?.title || 'Hire Developers For Any Business',
      subtitle: c.businessTypesSection?.subtitle || 'Access Our Technical Proficiency.',
      items: c.businessTypesSection?.items || []
    },
    pricingSection: {
      enabled: c.pricingSection?.enabled ?? true,
      title: c.pricingSection?.title || 'Pricing Plans',
      subtitle: c.pricingSection?.subtitle || 'Our pricing plans, along with a free trial of 2 weeks',
      plans: c.pricingSection?.plans || []
    },
    footerFormSection: c.footerFormSection || { enabled: true },
  };
}

// --- SEO ---
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await prisma.page.findFirst({ where: { slug, status: 'published', type: 'hire' } });
  if (!page) return { title: 'Hire Developers' };
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.excerpt,
    openGraph: {
      images: page.seoImage ? [page.seoImage] : []
    }
  };
}

// --- MAIN PAGE ---
export default async function HireSlugPage({ params }) {
  const { slug } = await params;
  const page = await prisma.page.findFirst({ where: { slug, status: 'published', type: 'hire' } });

  if (!page) notFound();

  const content = normalizeHireContent(page);

  return (
    <main className="relative bg-white overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative h-[450px] lg:h-[550px] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={content.heroBg}
            alt="Hero Background"
            fill
            className="object-cover opacity-70"
            priority
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/40 opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl animate-in slide-in-from-left-10 duration-700 fade-in">
            <nav className="flex items-center gap-2 text-xs md:text-sm text-sky-200/80 mb-6 font-medium tracking-wide ">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/hire" className="hover:text-white transition-colors">Hire</Link>
              <span>/</span>
              <span className="text-white border-b border-sky-500 pb-0.5">{content.heroTitle}</span>
            </nav>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 drop-shadow-lg">
              {content.heroTitle}
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed font-light">
              {content.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4 items-center ">
              <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-bold text-white tracking-wide">{content.badgeText}</span>
              </div>

              <div className="hidden md:flex gap-6 text-sm text-slate-300 border-l border-white/20 pl-6 ml-2 ">
                <div>
                  <span className="block font-bold text-white text-lg">{content.metrics.avgTime}</span>
                  <span className="text-xs uppercase tracking-wider">Avg Hiring</span>
                </div>
                <div>
                  <span className="block font-bold text-white text-lg">{content.metrics.network}</span>
                  <span className="text-xs uppercase tracking-wider">Talent Pool</span>
                </div>
                <div>
                  <span className="block font-bold text-white text-lg flex flex-row items-center ">{content.metrics.rating} <ThumbsUp className='text-[9px] ml-2' /></span>
                  <span className="text-xs uppercase tracking-wider">Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES GRID (Floating) */}
      {/* {content.features.length > 0 && (
        <section className="relative z-20 -mt-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.features.map((f, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:-translate-y-2 transition-transform duration-300 group">
                        <div className="w-14 h-14 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                            {getIcon(f.iconKey, 28)}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{f.description}</p>
                    </div>
                ))}
            </div>
        </section>
      )} */}
      {/* FEATURES */}
      {!!content.features?.length && (
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-10 relative z-10">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden">
              {content.features.map((f, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-5 border-t md:border-t-0 md:border-r last:border-r-0 border-slate-100/70 hover:bg-sky-50/60 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-xl text-sky-600">
                    {/* {getFeatureIcon(f.iconKey)} */}
                    {getIcon(f.iconKey, 28)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{f.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* 3. ABOUT + FORM */}
      <section className="py-24 px-6 max-w-7xl mx-auto" id="lead-form">
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          <div className="space-y-8 col-span-3">
            <CommonTitle
              align="left"
              title={content.aboutTitle}
              subtitle={content.aboutSubtitle}
            />

            <div className="space-y-4">
              {content.benefits.map((b, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <BsCheckCircle className="text-emerald-600 w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-700 font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden sticky top-24 col-span-2">
            {/* <div className="bg-sky-600 p-4 text-center">
                    <p className="text-white font-bold text-sm uppercase tracking-widest">Quick Inquiry</p>
                </div> */}
            <LeadForm
              formType="hire"
              formKey="hire"
              serviceName="Hire Developers"
              title={content.heroTitle}
              subtitle="Get matched with top talent in 24 Hours!"
              variant="solid"
              showLogo={true}
            />
          </div>
        </div>
      </section>

      {/* 4. HIRING STEPS */}
      {content.steps.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-white via-sky-50 to-sky-200 relative overflow-hidden hidden">
          {/* Abstract BG Shape */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-300 rounded-full blur-[100px] opacity-20 -z-10"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <CommonTitle
              title="How To Hire From Softkingo"
              subtitle="Simple 4-step process to onboard your dream team."
              gradientText="Hire Process"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {content.steps.map((step, i) => (
                <div key={i} className="relative group text-center bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-all">
                  {/* Connector Line (Desktop) */}
                  {i !== content.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-1 border-t-2 border-dashed border-sky-200 z-0"></div>
                  )}

                  <div className="w-20 h-20 mx-auto bg-sky-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform z-10 relative border-4 border-white shadow-md">
                    <span className="text-3xl font-black text-sky-500">{step.number || i + 1}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* STEPS */}
      {!!content.steps?.length && (
        <section className="py-24 bg-gradient-to-br from-white via-sky-50 to-sky-200 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <CommonTitle
              title="How To Hire From Softkingo"
              subtitle="Simple 4-step process to onboard your dream team."
              gradientText="Hire Process"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {content.steps.map((step, index) => (
                <div
                  key={index}
                  className={`px-4 py-6 text-center ${index < content.steps.length - 1 ? 'md:border-r text-sky-900/30' : ''
                    }`}
                >
                  <div className="flex items-center justify-center mb-3">
                    <span className="text-5xl font-bold text-slate-900/90 mr-2">
                      {step.number ?? index + 1}
                    </span>
                    <Image
                      alt={step.title || `Step ${index + 1}`}
                      src={step.icon || '/images/hire/h1.png'}
                      width={50}
                      height={50}
                      className="drop-shadow-lg"
                    />
                  </div>
                  <h3 className="text-slate-900 text-base md:text-lg font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-900/90 text-xs md:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. SERVICES CARDS */}
      {content.services.length > 0 && (
        <section className="py-24 px-6 max-w-7xl mx-auto bg-white">
          <CommonTitle
            title="Developers As A Service"
            subtitle="Flexible engagement models for every need."
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {content.services.map((s, i) => (
              <div key={i} className={`p-8 rounded-3xl text-white shadow-xl relative overflow-hidden bg-gradient-to-br ${s.bg || 'from-sky-500 to-blue-600'} hover:scale-105 transition-transform duration-300`}>
                {/* Abstract Circle */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

                <div className="mb-6 bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                  {getIcon(s.iconKey, 32, "text-white")}
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${s.textDark ? 'text-slate-800' : 'text-white'}`}>{s.title}</h3>
                <p className={`text-sm leading-relaxed opacity-90 ${s.textDark ? 'text-slate-800' : 'text-white'}`}>
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. SELECT DEVELOPER COMPONENT (Already built) */}
      <HireDevelopersPage />

     {/* 7. MORE SERVICES (Stacking Cards + Sticky Right Content) */}
      {content.moreServices.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-white via-sky-50 to-sky-200 px-6">
            <div className="max-w-7xl mx-auto">
                
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    
                    {/* LEFT SIDE: SCROLLABLE STACKING CARDS */}
                    <div className="w-full lg:w-1/2">
                        <div className="mb-12">
                             <CommonTitle 
                                align="left"
                                title="Services Provided" 
                                subtitle="Comprehensive tech solutions for your business growth."
                            />
                        </div>

                        <div className="flex flex-col pb-24 max-h-[90vh] overflow-auto">
                            {content.moreServices.map((s, i) => (
                                <div 
                                    key={i} 
                                    // STICKY MAGIC: Har card thoda niche stick hoga
                                    className="sticky bg-white rounded-3xl p-8 border border-slate-200 mb-6 transition-all"
                                    style={{ 
                                        top: `${100 + (i * 20)}px`, // 100px base + 20px increment per card
                                        zIndex: i + 1 
                                    }} 
                                >
                                    <div className="flex gap-6 items-start">
                                        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                                            {getIcon(s.iconKey, 30)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-3 text-xl">{s.title}</h4>
                                            <p className="text-slate-600 leading-relaxed text-base">
                                                {s.description}
                                            </p>
                                            
                                            {/* Optional: Add small tags or bullet points if available in data */}
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                <span className="text-[10px] uppercase font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                                                    Professional
                                                </span>
                                                <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                                    Reliable
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE: STATIC CONTENT (Sticky) */}
                    <div className="hidden lg:block w-1/2 sticky top-32 h-fit">
                        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden border border-slate-800">
                             {/* Decorative Background */}
                             <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500 rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
                             <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500 rounded-full blur-[60px] opacity-10 pointer-events-none"></div>

                             <div className="relative z-10">
                                 <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                                     <BsFileEarmarkBarGraph className="w-8 h-8 text-sky-400" />
                                 </div>

                                 <h3 className="text-3xl font-bold mb-6 leading-tight">
                                     Why Choose Our <br/> <span className="text-sky-400">Development Services?</span>
                                 </h3>

                                 <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                                     We don't just write code; we build future-proof solutions. Our experts ensure every deliverable meets the highest standards of quality, security, and performance.
                                 </p>

                                 <div className="space-y-4">
                                     <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                                         <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                         <span className="font-medium">100% Source Code Ownership</span>
                                     </div>
                                     <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                                         <div className="w-2 h-2 rounded-full bg-sky-400"></div>
                                         <span className="font-medium">Agile Methodology</span>
                                     </div>
                                     <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                                         <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                                         <span className="font-medium">Dedicated Support Team</span>
                                     </div>
                                 </div>

                                 <div className="mt-10 pt-8 border-t border-white/10">
                                     <p className="text-sm text-slate-400 mb-2">Need a custom package?</p>
                                     <Link href="/contact" className="inline-flex items-center gap-2 text-sky-400 font-bold hover:text-sky-300 transition-colors">
                                         Talk to an Expert <span>→</span>
                                     </Link>
                                 </div>
                             </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
      )}
      {/* 8. PROFILE SECTION */}
      {content.profileSection.enabled && (
        <section className="py-24 bg-white text-slate-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <CommonTitle
                  align="left"
                  title={content.profileSection.title}
                  subtitle={content.profileSection.subtitle}
                />

                <div className="space-y-4 mt-8">
                  {content.profileSection.profileFeatures.map((f, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all">
                      <BsCheckCircle className="text-sky-500 w-6 h-6 flex-shrink-0" />
                      <span className="font-bold text-lg text-slate-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                {/* Image Collage Logic */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 pt-12">
                    <Image src={content.profileSection.images.leftTop || "/images/placeholder.jpg"} width={300} height={400} className="rounded-2xl shadow-xl border-4 border-white object-cover w-full h-64" alt="Profile 1" />
                  </div>
                  <div className="space-y-4">
                    <Image src={content.profileSection.images.rightTop || "/images/placeholder.jpg"} width={300} height={250} className="rounded-2xl shadow-xl border-4 border-white object-cover w-full h-48" alt="Profile 2" />
                    <Image src={content.profileSection.images.rightBottom || "/images/placeholder.jpg"} width={300} height={300} className="rounded-2xl shadow-xl border-4 border-white object-cover w-full h-56" alt="Profile 3" />
                  </div>
                </div>
                {/* Decorative Circle */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-sky-100 to-transparent rounded-full opacity-50 blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 9. TECH STACK */}
      <TechStack />

      {/* 10. WORKING MODELS */}
      {content.modelsSection.enabled && (
        <section className="py-24 px-6 bg-gradient-to-br from-white via-sky-50 to-sky-200">
          <div className="max-w-7xl mx-auto">
            <CommonTitle
              title={content.modelsSection.title}
              subtitle={content.modelsSection.subtitle}
            />

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {content.modelsSection.models.map((m, i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden ">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>

                  <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors relative z-10">
                    {getIcon(m.iconKey, 32)}
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">{m.title}</h3>
                  <p className="text-sm text-slate-600 mb-8 min-h-[60px] relative z-10 leading-relaxed">{m.description}</p>

                  <ul className="space-y-4 mb-8 relative z-10">
                    {(m.features || []).map((f, fi) => (
                      <li key={fi} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact" className="block w-full py-4 text-center bg-slate-900 text-white rounded-xl font-bold hover:bg-sky-600 transition-colors relative z-10">
                    {m.buttonText || "Select Model"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. PRICING PLANS */}
      {content.pricingSection.enabled && (
        <section className="py-24 bg-white px-6">
          <div className="max-w-7xl mx-auto">
            <CommonTitle
              title={content.pricingSection.title}
              subtitle={content.pricingSection.subtitle}
            />

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {content.pricingSection.plans.map((plan, i) => (
                <div key={i} className={`relative p-8 rounded-3xl border flex flex-col transition-all duration-300 ${plan.featured ? 'bg-slate-900 text-white shadow-2xl scale-105 border-slate-900' : 'bg-white text-slate-900 border-slate-200 hover:border-sky-300 hover:shadow-xl'}`}>
                  {plan.featured && (
                    <div className="absolute top-0 right-0 bg-sky-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-xl">MOST POPULAR</div>
                  )}
                  <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                  <p className={`text-xs mb-8 ${plan.featured ? 'text-slate-400' : 'text-slate-500'}`}>{plan.subtitle}</p>

                  <div className="mb-8 pb-8 border-b border-white/10">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className={`text-sm ml-2 ${plan.featured ? 'text-slate-400' : 'text-slate-500'}`}>/{plan.priceNote}</span>
                  </div>

                  <div className="space-y-4 mb-10 flex-1">
                    {plan.features?.map((f, fi) => (
                      <div key={fi} className="flex gap-3 text-sm items-start">
                        <BsCheckCircle className={`flex-shrink-0 w-5 h-5 mt-0.5 ${plan.featured ? 'text-sky-400' : 'text-sky-600'}`} />
                        <span className={plan.featured ? 'text-slate-300' : 'text-slate-700'}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/contact" className={`block w-full py-4 rounded-xl text-center font-bold transition-all shadow-lg ${plan.featured ? 'bg-sky-500 text-white hover:bg-sky-600' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                    {plan.buttonText || "Get Started"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12. COMPARISON TABLE */}
      {content.comparisonSection.enabled && (
        <section className="py-24 px-6 bg-gradient-to-br from-white via-sky-50 to-sky-200">
          <div className="max-w-6xl mx-auto overflow-x-auto">
            <CommonTitle title={content.comparisonSection.title} />

            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mt-12">
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr>
                    <th className="p-6 text-left text-slate-500 font-medium border-b border-slate-100 bg-slate-50/50">Features</th>
                    <th className="p-6 text-center text-sky-700 font-black border-b border-sky-100 bg-sky-50 text-xl w-1/4">Softkingo</th>
                    <th className="p-6 text-center text-slate-600 font-bold border-b border-slate-100 w-1/4">Freelancers</th>
                    <th className="p-6 text-center text-slate-600 font-bold border-b border-slate-100 w-1/4">Agencies</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {content.comparisonSection.rows.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-5 font-bold text-slate-800 pl-8">{row.category}</td>
                      <td className="p-5 text-center bg-sky-50/30 border-x border-sky-100">
                        <div className="flex items-center justify-center gap-2 font-bold text-slate-900">
                          {getIcon(row.softkingo?.iconKey, 20, "text-emerald-500")}
                          {row.softkingo?.text}
                        </div>
                      </td>
                      <td className="p-5 text-center text-slate-500">
                        <div className="flex items-center justify-center gap-2">
                          {getIcon(row.recruiting?.iconKey, 18, "text-rose-400")}
                          {row.recruiting?.text}
                        </div>
                      </td>
                      <td className="p-5 text-center text-slate-500">
                        <div className="flex items-center justify-center gap-2">
                          {getIcon(row.outsourcing?.iconKey, 18, "text-amber-400")}
                          {row.outsourcing?.text}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 13. FOOTER CTA */}
      {content.footerFormSection.enabled && (
        <ConsultationCTA
          title="Ready to Build Your Team?"
          subtitle="Let's discuss your project requirements and find the perfect match."
          href="/contact"
        />
      )}

      {/* 14. FOOTER FORM */}
      <FooterForm />

    </main>
  );
}