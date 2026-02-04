// // import { NextResponse } from "next/server";
// // import path from "node:path";
// // import fs from "node:fs/promises";
// // import { getBaseAbs, toUrl, trackPageInDB, untrackPageFromDB } from "./_utils";

// // async function exists(p) {
// //     try { await fs.access(p); return true; } catch { return false; }
// // }

// // /**
// //  * ENGINE: 10-SECTION PROFESSIONAL GENERATOR
// //  * Generates high-fidelity code based on Softkingo's premium portfolio standards.
// //  */
// // function generatePageCode(data) {
// //     const { content, type, slug, section } = data;
// //     const jsonContent = JSON.stringify(content);
    
// //     return `
// // "use client";
// // import React, { useState, useEffect, useMemo } from 'react';
// // import Image from 'next/image';
// // import Link from 'next/link';
// // import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
// // import { 
// //   FaCheckCircle, FaRocket, FaShieldAlt, FaUsers, FaArrowRight, 
// //   FaQuoteLeft, FaChartLine, FaCog, FaMobileAlt, FaChevronDown,
// //   FaGlobe, FaLock, FaSync, FaLightbulb, FaBriefcase, FaArrowUp,
// //   FaGooglePlay, FaApple, FaLaptop
// // } from 'react-icons/fa';
// // import InquirySection from '@/components/footer/InquirySection';

// // export default function GeneratedPage() {
// //     const [activeFaq, setActiveFaq] = useState(0);
// //     const { scrollYProgress } = useScroll();
// //     const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    
// //     const content = ${jsonContent};
// //     const type = "${type}";

// //     // Theme Engine: Sharp & Professional (Non-childish)
// //     const theme = useMemo(() => {
// //         const styles = {
// //             clone: { 
// //                 gradient: "from-orange-600 via-red-600 to-amber-600", 
// //                 accent: "text-orange-600", 
// //                 bg: "bg-[#fffaf5]", 
// //                 radius: "rounded-xl",
// //                 btn: "bg-orange-600 hover:bg-orange-700" 
// //             },
// //             industry: { 
// //                 gradient: "from-blue-800 via-indigo-700 to-blue-600", 
// //                 accent: "text-indigo-600", 
// //                 bg: "bg-[#f8faff]", 
// //                 radius: "rounded-lg",
// //                 btn: "bg-indigo-700 hover:bg-indigo-800" 
// //             },
// //             solution: { 
// //                 gradient: "from-sky-600 via-blue-600 to-cyan-500", 
// //                 accent: "text-sky-600", 
// //                 bg: "bg-[#fcfdfe]", 
// //                 radius: "rounded-2xl",
// //                 btn: "bg-slate-900 hover:bg-sky-600" 
// //             }
// //         };
// //         return styles[type] || styles.solution;
// //     }, [type]);

// //     return (
// //         <main className="bg-white text-slate-900 selection:bg-sky-100 overflow-x-hidden font-sans">
// //             <motion.div className="fixed top-0 left-0 right-0 h-1 bg-sky-500 z-[100] origin-left" style={{ scaleX }} />

// //             {/* SECTION 1: PROFESSIONAL HERO (PORTFOLIO STYLE) */}
// //             <section className={\`relative min-h-[90vh] flex items-center pt-20 overflow-hidden \${theme.bg}\`}>
// //                 <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.03] -z-10" />
// //                 <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
// //                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
// //                         <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-sm">
// //                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
// //                            {content.hero.tag || "Enterprise Grade"}
// //                         </div>
// //                         <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-slate-900">
// //                             {content.hero.title} <br/>
// //                             <span className={\`text-transparent bg-clip-text bg-gradient-to-r \${theme.gradient}\`}>
// //                                 Digital Innovation.
// //                             </span>
// //                         </h1>
// //                         <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-xl font-normal">
// //                             {content.hero.subtitle}
// //                         </p>
// //                         <div className="flex flex-wrap gap-4">
// //                             <Link href="/contact" className={\`group \${theme.btn} text-white px-8 py-4 \${theme.radius} font-bold transition-all flex items-center gap-3 shadow-xl shadow-slate-200\`}>
// //                                 GET A FREE QUOTE <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
// //                             </Link>
// //                             {type === 'clone' && (
// //                                 <div className="flex gap-4 items-center ml-2">
// //                                     <FaGooglePlay className="text-slate-300 text-xl" />
// //                                     <FaApple className="text-slate-300 text-xl" />
// //                                     <FaLaptop className="text-slate-300 text-xl" />
// //                                 </div>
// //                             )}
// //                         </div>
// //                     </motion.div>

// //                     {/* HERO MOCKUP: SHARP DESIGN */}
// //                     <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
// //                         <div className={\`relative z-10 p-2 bg-white rounded-2xl border border-slate-200 shadow-2xl\`}>
// //                              <div className={\`relative h-[550px] w-full \${theme.radius} overflow-hidden bg-slate-100\`}>
// //                                 <Image src={content.hero.image || "/images/hero-placeholder.png"} alt="Preview" fill className="object-cover" priority />
// //                              </div>
// //                         </div>
// //                     </motion.div>
// //                 </div>
// //             </section>

// //             {/* SECTION 2: STATS (MINIMALIST) */}
// //             <div className="bg-white py-16 border-b border-slate-100">
// //                 <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
// //                     {content.stats?.map((s, i) => (
// //                         <div key={i} className="text-left border-l-2 border-slate-100 pl-8">
// //                             <div className={\`text-4xl font-bold \${theme.accent} mb-1\`}>{s.value}</div>
// //                             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{s.label}</div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>

// //             {/* SECTION 3: SERVICES GRID (SHARP CARDS) */}
// //             <section className="py-24 max-w-7xl mx-auto px-6">
// //                 <div className="max-w-3xl mb-20">
// //                     <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Comprehensive <span className={\`italic \${theme.accent}\`}>Modules.</span></h2>
// //                     <p className="text-slate-500 text-lg">We deliver a full-stack ecosystem tailored to your operational needs.</p>
// //                 </div>
// //                 <div className="grid md:grid-cols-3 gap-8">
// //                     {content.services?.map((s, i) => (
// //                         <div key={i} className={\`p-8 \${theme.radius} border border-slate-200 bg-white hover:border-sky-500 hover:shadow-2xl transition-all group\`}>
// //                             <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 text-slate-900 group-hover:bg-sky-600 group-hover:text-white transition-colors">
// //                                 <FaCog size={24} />
// //                             </div>
// //                             <h3 className="text-xl font-bold mb-3 tracking-tight">{s.title}</h3>
// //                             <p className="text-slate-500 text-sm leading-relaxed mb-6">Advanced {s.title} integration with secure API layers and real-time data sync.</p>
// //                             <Link href="/contact" className="text-xs font-bold flex items-center gap-2 text-sky-600">LEARN MORE <FaArrowRight size={10}/></Link>
// //                         </div>
// //                     ))}
// //                 </div>
// //             </section>

// //             {/* SECTION 4: CASE STUDY (POTAFO DARK STYLE) */}
// //             <section className="py-24 px-6 bg-slate-950 rounded-[2rem] mx-4 mb-24">
// //                 <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
// //                     <div className="space-y-8">
// //                         <div className="text-sky-500 font-bold uppercase tracking-[0.3em] text-[10px]">Real-World Success</div>
// //                         <h3 className="text-4xl md:text-6xl font-bold text-white leading-tight">{content.caseStudy.title}</h3>
// //                         <p className="text-slate-400 text-lg leading-relaxed">{content.caseStudy.description}</p>
// //                         <div className="flex gap-4">
// //                             <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-bold">
// //                                 TECH: {content.caseStudy.tech}
// //                             </div>
// //                         </div>
// //                     </div>
// //                     <div className="relative h-[450px] rounded-2xl overflow-hidden border-8 border-white/5 shadow-2xl">
// //                         <Image src={content.caseStudy.image || "/images/case-placeholder.png"} alt="Case" fill className="object-cover" />
// //                     </div>
// //                 </div>
// //             </section>

// //             {/* SECTION 5: METHODOLOGY (BLUEPRINT) */}
// //             <section className="py-24 bg-white border-t border-slate-100">
// //                 <div className="max-w-7xl mx-auto px-6">
// //                     <h2 className="text-center text-4xl font-bold mb-20 tracking-tight">Our <span className="text-sky-600 italic">Execution</span> Strategy</h2>
// //                     <div className="grid md:grid-cols-4 gap-8">
// //                         {content.methodology?.map((m, i) => (
// //                             <div key={i} className="space-y-4 border-t-4 border-slate-50 pt-8 hover:border-sky-500 transition-colors">
// //                                 <div className="text-4xl font-black text-slate-100 group-hover:text-sky-100 transition-colors">0{i+1}</div>
// //                                 <h4 className="text-lg font-bold text-slate-900">{m.title}</h4>
// //                                 <p className="text-slate-500 text-xs leading-relaxed">{m.desc}</p>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>
// //             </section>

// //             {/* SECTION 6: TECH TRUST BAR */}
// //             <section className="py-12 bg-slate-50 overflow-hidden border-y border-slate-100">
// //                 <div className="flex gap-20 items-center whitespace-nowrap animate-scroll opacity-20 hover:opacity-50 transition-opacity">
// //                     {[1,2,3,4,5,6].map(i => (
// //                         <span key={i} className="text-2xl font-black text-slate-900 tracking-tighter">SOFTKINGO TECH SYSTEM</span>
// //                     ))}
// //                 </div>
// //             </section>

// //             {/* SECTION 7: INTERACTIVE FAQ (ACCORDION) */}
// //             <section className="py-32 max-w-4xl mx-auto px-6">
// //                 <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
// //                 <div className="space-y-3">
// //                     {content.benefits?.map((b, i) => (
// //                         <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
// //                             <button 
// //                                 onClick={() => setActiveFaq(activeFaq === i ? null : i)}
// //                                 className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-800 hover:bg-slate-50"
// //                             >
// //                                 <span>{b.title}</span>
// //                                 <FaChevronDown className={\`transition-transform \${activeFaq === i ? 'rotate-180' : ''}\`} />
// //                             </button>
// //                             {activeFaq === i && (
// //                                 <motion.div initial={{height:0}} animate={{height:'auto'}} className="px-6 pb-6 text-slate-500 text-sm leading-relaxed">{b.desc}</motion.div>
// //                             )}
// //                         </div>
// //                     ))}
// //                 </div>
// //             </section>

// //             {/* SECTION 8: WHY SOFTKINGO (BENEFITS) */}
// //             <section className="py-24 bg-slate-900 rounded-[2rem] mx-4 text-white">
// //                 <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
// //                    {[
// //                        {t:"ISO Certified", d:"Industry standard security protocols.", i:<FaShieldAlt/>},
// //                        {t:"99% Uptime", d:"Reliable infrastructure on AWS/Azure.", i:<FaSync/>},
// //                        {t:"Global Reach", d:"Deploy across multiple regions.", i:<FaGlobe/>}
// //                    ].map((f, i) => (
// //                        <div key={i} className="text-center space-y-4">
// //                            <div className="text-4xl text-sky-500 flex justify-center">{f.i}</div>
// //                            <h4 className="text-xl font-bold">{f.t}</h4>
// //                            <p className="text-slate-400 text-sm">{f.d}</p>
// //                        </div>
// //                    ))}
// //                 </div>
// //             </section>

// //             {/* SECTION 9: CTA (CONVERSION) */}
// //             <section className="py-32 text-center px-6">
// //                 <div className={\`max-w-5xl mx-auto py-24 px-8 rounded-3xl bg-gradient-to-br \${theme.gradient} text-white shadow-2xl relative overflow-hidden\`}>
// //                     <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full" />
// //                     <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Scale Your Digital <br/> Footprint Today.</h2>
// //                     <Link href="/contact" className="bg-white text-slate-900 px-12 py-5 rounded-lg font-black text-lg hover:scale-110 transition-transform inline-block">LET'S START</Link>
// //                 </div>
// //             </section>

// //             {/* SECTION 10: INQUIRY */}
// //             <InquirySection />

// //             <style jsx>{\`
// //                 @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
// //                 .animate-scroll { animation: scroll 20s linear infinite; }
// //             \`}</style>
// //         </main>
// //     );
// // }
// // `.trim();
// // }

// // // ========== API ROUTES (GET, POST, DELETE) ==========
// // export async function POST(req) {
// //     try {
// //         const body = await req.json();
// //         const { section, slug } = body;
// //         const baseAbs = getBaseAbs(section);
// //         const folderPath = path.join(baseAbs, slug);

// //         await fs.mkdir(folderPath, { recursive: true });
// //         await fs.writeFile(path.join(folderPath, "data.json"), JSON.stringify(body, null, 2));

// //         const code = generatePageCode(body);
// //         await fs.writeFile(path.join(folderPath, "page.jsx"), code);

// //         await trackPageInDB(section, slug);
// //         return NextResponse.json({ ok: true, url: toUrl(section, slug) });
// //     } catch (e) {
// //         return NextResponse.json({ ok: false, error: e.message });
// //     }
// // }

// // export async function GET(req) {
// //     try {
// //         const { searchParams } = new URL(req.url);
// //         const section = searchParams.get("section") || "all";
// //         const slug = searchParams.get("slug");

// //         if (slug && section !== "all") {
// //             const dataPath = path.join(getBaseAbs(section), slug, "data.json");
// //             if (await exists(dataPath)) {
// //                 const raw = await fs.readFile(dataPath, "utf8");
// //                 return NextResponse.json({ ok: true, data: JSON.parse(raw) });
// //             }
// //         }

// //         const sections = section === "all" ? ["solutions", "industries"] : [section];
// //         const results = {};
// //         for (const s of sections) {
// //             const baseAbs = getBaseAbs(s);
// //             if (!(await exists(baseAbs))) { results[s] = []; continue; }
// //             const entries = await fs.readdir(baseAbs, { withFileTypes: true });
// //             results[s] = await Promise.all(entries.filter(e => e.isDirectory()).map(async e => {
// //                 const dataPath = path.join(baseAbs, e.name, "data.json");
// //                 let meta = { slug: e.name, url: toUrl(s, e.name) };
// //                 if (await exists(dataPath)) {
// //                     const raw = await fs.readFile(dataPath, "utf8");
// //                     const parsed = JSON.parse(raw);
// //                     meta = { ...meta, title: parsed.content?.hero?.title, type: parsed.type };
// //                 }
// //                 return meta;
// //             }));
// //         }
// //         return NextResponse.json({ ok: true, data: results });
// //     } catch (e) { return NextResponse.json({ ok: false, error: e.message }); }
// // }

// // export async function DELETE(req) {
// //     try {
// //         const { section, slug } = await req.json();
// //         const folderAbs = path.join(getBaseAbs(section), slug);
// //         await fs.rm(folderAbs, { recursive: true, force: true });
// //         await untrackPageFromDB(slug);
// //         return NextResponse.json({ ok: true });
// //     } catch (e) { return NextResponse.json({ ok: false, error: e.message }); }
// // }




// import { NextResponse } from "next/server";
// import path from "node:path";
// import fs from "node:fs/promises";
// import { getBaseAbs, toUrl, trackPageInDB, untrackPageFromDB } from "./_utils";

// async function exists(p) {
//     try { await fs.access(p); return true; } catch { return false; }
// }

// /**
//  * 🚀 SMART PAGE GENERATOR ENGINE
//  * Dynamically assembles the page based on 'activeSections' received from Admin.
//  */
// function generatePageCode(data) {
//     const { content, type, activeSections } = data;
//     const jsonContent = JSON.stringify(content);

//     // 1. DYNAMIC IMPORTS
//     // Hum wahi imports add karenge jo sections active hain
//     let imports = `
// "use client";
// import React, { useState, useEffect, useMemo } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
// import { 
//   FaCheckCircle, FaRocket, FaShieldAlt, FaUsers, FaArrowRight, 
//   FaQuoteLeft, FaChartLine, FaCog, FaMobileAlt, FaChevronDown,
//   FaGlobe, FaLock, FaSync, FaLightbulb, FaBriefcase, FaArrowUp,
//   FaGooglePlay, FaApple, FaLaptop
// } from 'react-icons/fa';
// import InquirySection from '@/components/footer/InquirySection';
// `;

//     // Agar Industry Tabs selected hai, toh uska import add karo
//     // (Ensure you have saved the previous component at this path)
//     if (activeSections?.includes('industryTabs')) {
//         imports += `import IndustryTabsSection from '@/components/home/IndustryTabsSection';\n`;
//     }

//     // 2. SECTION GENERATORS
//     // Har section ka code ek function ya string block mein hai
    
//     const renderHero = `
//             {/* 1. HERO SECTION */}
//             <section className={\`relative min-h-[90vh] flex items-center pt-20 overflow-hidden \${theme.bg}\`}>
//                 <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.03] -z-10" />
//                 <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
//                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//                         <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-sm">
//                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//                            {content.hero.tag || "Enterprise Grade"}
//                         </div>
//                         <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-slate-900">
//                             {content.hero.title} <br/>
//                             <span className={\`text-transparent bg-clip-text bg-gradient-to-r \${theme.gradient}\`}>
//                                 Digital Innovation.
//                             </span>
//                         </h1>
//                         <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-xl font-normal">
//                             {content.hero.subtitle}
//                         </p>
//                         <div className="flex flex-wrap gap-4">
//                             <Link href="/contact" className={\`group \${theme.btn} text-white px-8 py-4 \${theme.radius} font-bold transition-all flex items-center gap-3 shadow-xl shadow-slate-200\`}>
//                                 GET A FREE QUOTE <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
//                             </Link>
//                         </div>
//                     </motion.div>
//                     <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
//                         <div className={\`relative z-10 p-2 bg-white rounded-2xl border border-slate-200 shadow-2xl\`}>
//                              <div className={\`relative h-[550px] w-full \${theme.radius} overflow-hidden bg-slate-100\`}>
//                                 <Image src={content.hero.image || "/images/hero-placeholder.png"} alt="Preview" fill className="object-cover" priority />
//                              </div>
//                         </div>
//                     </motion.div>
//                 </div>
//             </section>
//     `;

//     const renderStats = `
//             {/* 2. STATS */}
//             <div className="bg-white py-16 border-b border-slate-100">
//                 <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
//                     {content.stats?.map((s, i) => (
//                         <div key={i} className="text-left border-l-2 border-slate-100 pl-8">
//                             <div className={\`text-4xl font-bold \${theme.accent} mb-1\`}>{s.value}</div>
//                             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{s.label}</div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//     `;

//     const renderIndustryTabs = `
//             {/* 3. INDUSTRY TABS SECTION (Your Custom Component) */}
//             <IndustryTabsSection />
//     `;

//     const renderServices = `
//             {/* 4. SERVICES GRID */}
//             <section className="py-24 max-w-7xl mx-auto px-6">
//                 <div className="max-w-3xl mb-20">
//                     <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Comprehensive <span className={\`italic \${theme.accent}\`}>Modules.</span></h2>
//                     <p className="text-slate-500 text-lg">We deliver a full-stack ecosystem tailored to your operational needs.</p>
//                 </div>
//                 <div className="grid md:grid-cols-3 gap-8">
//                     {content.services?.map((s, i) => (
//                         <div key={i} className={\`p-8 \${theme.radius} border border-slate-200 bg-white hover:border-sky-500 hover:shadow-2xl transition-all group\`}>
//                             <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 text-slate-900 group-hover:bg-sky-600 group-hover:text-white transition-colors">
//                                 <FaCog size={24} />
//                             </div>
//                             <h3 className="text-xl font-bold mb-3 tracking-tight">{s.title}</h3>
//                             <p className="text-slate-500 text-sm leading-relaxed mb-6">Advanced {s.title} integration with secure API layers.</p>
//                         </div>
//                     ))}
//                 </div>
//             </section>
//     `;

//     const renderCaseStudy = `
//             {/* 5. CASE STUDY */}
//             <section className="py-24 px-6 bg-slate-950 rounded-[2rem] mx-4 mb-24">
//                 <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
//                     <div className="space-y-8">
//                         <div className="text-sky-500 font-bold uppercase tracking-[0.3em] text-[10px]">Real-World Success</div>
//                         <h3 className="text-4xl md:text-6xl font-bold text-white leading-tight">{content.caseStudy.title}</h3>
//                         <p className="text-slate-400 text-lg leading-relaxed">{content.caseStudy.description}</p>
//                         <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-bold w-fit">
//                             TECH: {content.caseStudy.tech}
//                         </div>
//                     </div>
//                     <div className="relative h-[450px] rounded-2xl overflow-hidden border-8 border-white/5 shadow-2xl">
//                         <Image src={content.caseStudy.image || "/images/case-placeholder.png"} alt="Case" fill className="object-cover" />
//                     </div>
//                 </div>
//             </section>
//     `;

//     // 3. ASSEMBLE THE PAGE
//     // Hum check karenge ki kaunse sections 'activeSections' array mein hain
    
//     let pageBody = "";
    
//     // Default sections if none provided (Fallback)
//     const defaults = ['hero', 'stats', 'services', 'caseStudy', 'cta'];
//     const sectionsToRender = activeSections && activeSections.length > 0 ? activeSections : defaults;

//     // Sequence matters! You can change order here based on logic if needed
//     if (sectionsToRender.includes('hero')) pageBody += renderHero;
//     if (sectionsToRender.includes('stats')) pageBody += renderStats;
//     if (sectionsToRender.includes('industryTabs')) pageBody += renderIndustryTabs; // The new addition
//     if (sectionsToRender.includes('services')) pageBody += renderServices;
//     if (sectionsToRender.includes('caseStudy')) pageBody += renderCaseStudy;
    
//     // Always add Footer Inquiry & Scroll bar
//     // ...

//     return `
// ${imports}

// export default function GeneratedPage() {
//     const { scrollYProgress } = useScroll();
//     const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    
//     const content = ${jsonContent};
//     const type = "${type}";

//     const theme = useMemo(() => {
//         const styles = {
//             clone: { 
//                 gradient: "from-orange-600 via-red-600 to-amber-600", 
//                 accent: "text-orange-600", 
//                 bg: "bg-[#fffaf5]", 
//                 radius: "rounded-xl",
//                 btn: "bg-orange-600 hover:bg-orange-700" 
//             },
//             industry: { 
//                 gradient: "from-blue-800 via-indigo-700 to-blue-600", 
//                 accent: "text-indigo-600", 
//                 bg: "bg-[#f8faff]", 
//                 radius: "rounded-lg",
//                 btn: "bg-indigo-700 hover:bg-indigo-800" 
//             },
//             solution: { 
//                 gradient: "from-sky-600 via-blue-600 to-cyan-500", 
//                 accent: "text-sky-600", 
//                 bg: "bg-[#fcfdfe]", 
//                 radius: "rounded-2xl",
//                 btn: "bg-slate-900 hover:bg-sky-600" 
//             }
//         };
//         return styles[type] || styles.solution;
//     }, [type]);

//     return (
//         <main className="bg-white text-slate-900 selection:bg-sky-100 overflow-x-hidden font-sans">
//             <motion.div className="fixed top-0 left-0 right-0 h-1 bg-sky-500 z-[100] origin-left" style={{ scaleX }} />

//             ${pageBody}

//             <InquirySection />
//         </main>
//     );
// }
// `.trim();
// }

// // ========== API ROUTES ==========
// export async function POST(req) {
//     try {
//         const body = await req.json();
//         // Expect 'activeSections' array in body now (e.g. ['hero', 'industryTabs', 'services'])
//         const { section, slug } = body; 
        
//         const baseAbs = getBaseAbs(section);
//         const folderPath = path.join(baseAbs, slug);

//         await fs.mkdir(folderPath, { recursive: true });
//         await fs.writeFile(path.join(folderPath, "data.json"), JSON.stringify(body, null, 2));

//         const code = generatePageCode(body);
//         await fs.writeFile(path.join(folderPath, "page.jsx"), code);

//         await trackPageInDB(section, slug);
//         return NextResponse.json({ ok: true, url: toUrl(section, slug) });
//     } catch (e) {
//         return NextResponse.json({ ok: false, error: e.message });
//     }
// }

// export async function GET(req) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const section = searchParams.get("section") || "all";
//         const slug = searchParams.get("slug");

//         if (slug && section !== "all") {
//             const dataPath = path.join(getBaseAbs(section), slug, "data.json");
//             if (await exists(dataPath)) {
//                 const raw = await fs.readFile(dataPath, "utf8");
//                 return NextResponse.json({ ok: true, data: JSON.parse(raw) });
//             }
//         }

//         const sections = section === "all" ? ["solutions", "industries"] : [section];
//         const results = {};
//         for (const s of sections) {
//             const baseAbs = getBaseAbs(s);
//             if (!(await exists(baseAbs))) { results[s] = []; continue; }
//             const entries = await fs.readdir(baseAbs, { withFileTypes: true });
//             results[s] = await Promise.all(entries.filter(e => e.isDirectory()).map(async e => {
//                 const dataPath = path.join(baseAbs, e.name, "data.json");
//                 let meta = { slug: e.name, url: toUrl(s, e.name) };
//                 if (await exists(dataPath)) {
//                     const raw = await fs.readFile(dataPath, "utf8");
//                     const parsed = JSON.parse(raw);
//                     // Return activeSections so admin knows what's enabled
//                     meta = { 
//                         ...meta, 
//                         title: parsed.content?.hero?.title, 
//                         type: parsed.type,
//                         activeSections: parsed.activeSections 
//                     };
//                 }
//                 return meta;
//             }));
//         }
//         return NextResponse.json({ ok: true, data: results });
//     } catch (e) { return NextResponse.json({ ok: false, error: e.message }); }
// }

// export async function DELETE(req) {
//     try {
//         const { section, slug } = await req.json();
//         const folderAbs = path.join(getBaseAbs(section), slug);
//         await fs.rm(folderAbs, { recursive: true, force: true });
//         await untrackPageFromDB(slug);
//         return NextResponse.json({ ok: true });
//     } catch (e) { return NextResponse.json({ ok: false, error: e.message }); }
// }

import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";
import { getBaseAbs, toUrl, trackPageInDB, untrackPageFromDB } from "./_utils";

async function exists(p) {
    try { await fs.access(p); return true; } catch { return false; }
}

function generatePageCode(data) {
    const { content, type, activeSections } = data;
    // CRITICAL FIX: Convert the content object to a JSON string for injection
    const jsonContent = JSON.stringify(content);

    // 1. IMPORTS (Corrected Paths based on your snippet)
    let imports = `
"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaCheckCircle, FaClock, FaDollarSign, FaUsers, 
  FaMobileAlt, FaLink, FaUserShield, FaSun, FaArrowRight 
} from 'react-icons/fa';
import { BsCheckCircle } from 'react-icons/bs';

// Components
import LeadForm from "@/components/public/InquiryForm"; 
import Blogs from "@/app/(public)/home/blogs/BlogSliderClient"; // Using alias for safety, or use "../../home/blogs/BlogSliderClient"
import InquirySection from "@/components/footer/InquirySection";
import CommonTitle from "@/components/ui/CommonTitle";
import DynamicPortfolioCard from "@/components/ui/DynamicPortfolioCard";
import ConsultationCTA from "@/components/common/Consultation-Cta";
import FAQAccordion from "@/components/common/Faqaccordion";
import TechView from "@/components/common/TechView";
`;

    // 2. SECTIONS GENERATION

    // --- HERO SECTION ---
    const renderHero = `
      <section className="relative overflow-hidden flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 min-h-[600px]">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={content.hero.image || "/images/services/default-bg.png"}
            alt={content.hero.title}
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-800/70 to-slate-500/60 opacity-40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 w-full">
          <div className="max-w-3xl text-white space-y-6 md:space-y-8">
            {/* Breadcrumb */}
            <nav className="mb-6 md:mb-8 animate-fadeInUp">
              <div className="flex flex-wrap items-center text-xs md:text-sm text-sky-100/80 gap-1 md:gap-2">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
                <span>›</span>
                <span className="font-semibold text-cyan-400">{content.hero.title}</span>
              </div>
            </nav>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fadeInUp animation-delay-200">
                {content.hero.title}
              </h1>
              <p className="text-sky-100 text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed animate-fadeInUp animation-delay-400">
                {content.hero.subtitle}
              </p>
            </div>

            <div className="flex gap-4 animate-fadeInUp animation-delay-600">
              <Link href="/contact" className="px-6 md:px-8 py-3.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-sm md:text-base font-bold hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300 items-center cursor-pointer inline-flex">
                Let’s Work Together <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
        
        <style>{\`
            @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
            .animation-delay-200 { animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards; }
            .animation-delay-400 { animation-delay: 0.4s; opacity: 0; animation-fill-mode: forwards; }
            .animation-delay-600 { animation-delay: 0.6s; opacity: 0; animation-fill-mode: forwards; }
        \`}</style>
      </section>
    `;

    // --- ABOUT + LEAD FORM SECTION ---
    const renderAboutWithForm = `
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="lead-form">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_minmax(320px,380px)] gap-10 items-start">
          
          {/* Left: About Text & Benefits */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {content.aboutTitle || "Transforming Ideas into Reality"}
            </h2>
            <p className="text-slate-600 mb-6 text-sm md:text-base leading-relaxed">
              {content.aboutSubtitle || "We deliver scalable, robust, and secure solutions tailored to your business goals."}
            </p>

            {content.benefits && content.benefits.length > 0 && (
              <div className="space-y-4">
                {content.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <span className="flex-shrink-0 mt-1">
                      <BsCheckCircle className="w-5 h-5 text-sky-600" />
                    </span>
                    <span className="text-slate-700 font-medium text-sm md:text-base">{b}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Lead Form */}
          <div className="w-full relative">
             <div className="absolute inset-0 bg-sky-200 blur-2xl opacity-20 rounded-full" />
             <LeadForm
               formType="service"
               formKey="${data.slug}"
               serviceName={content.hero.title}
               title="Get Your Free Quote"
               subtitle="Fast response within 24 hours"
               variant="solid"
               showLogo={true}
               showCompany={false}
               showBudget={false}
               showAttachment={false}
               showNDA={false}
             />
          </div>
        </div>
      </section>
    `;

    // --- FEATURES GRID ---
    const renderFeatures = `
      <section className="max-w-7xl mx-auto p-6 lg:px-20 py-16">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <CommonTitle pill={false}
            title="Features"
            subtitle="Explore the key features that make our solution stand out."
            gradientText="Key Capabilities"
            align="center" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {content.services?.map((service, idx) => (
            <div key={idx} className="group gap-4 transition-all duration-300 cursor-pointer">
              <div className="relative h-52 w-full bg-slate-100 overflow-hidden rounded-2xl shadow-sm group-hover:shadow-xl transition-all mb-4 border border-slate-200">
                <Image
                  src={service.image || "/images/placeholder.jpg"}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm group-hover:border-sky-200 transition-colors">
                <h3 className="text-center text-base font-bold text-slate-800 leading-snug">
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    `;

    // --- HUNGRY FOR MORE BANNER ---
    const renderBanner = `
      <section className="relative w-full mb-16 max-w-7xl mx-auto px-6">
        <div className="bg-sky-50 rounded-[3rem] w-full overflow-hidden border border-sky-100">
          <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">
                Hungry For <span className="text-sky-600">Growth?</span>
              </h2>
              <p className="text-slate-600 text-lg font-medium max-w-xl">
                Explore your app development potential with technical excellence and bring your vision to life.
              </p>
              <Link href="/contact" className="inline-block bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-sky-600 transition-colors shadow-lg shadow-slate-200">
                Get Started Today
              </Link>
            </div>
            <div className="relative w-full md:w-1/3 h-64">
               <Image
                  src="/images/food-service/i6.png"
                  alt="Illustration"
                  fill
                  className="object-contain"
               />
            </div>
          </div>
        </div>
      </section>
    `;

    // --- WHY INVEST ---
    const renderWhyInvest = `
      <section className='py-20 bg-gradient-to-br from-white to-slate-50'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className="text-center mb-16">
             <CommonTitle pill={false} title="Why" subtitle={false} gradientText="Invest In This Solution?" align="center" />
          </div>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src={content.caseStudy.image || "/images/food-service/i4.png"} 
                alt="Why Invest"
                fill
                className="object-cover"
              />
            </div>
            <div className='space-y-8'>
              {[
                { title: "Increased Efficiency & Speed", desc: "Automate workflows to save time." },
                { title: "Cost Reduction", desc: "minimize operational costs effectively." },
                { title: "Better Customer Experience", desc: "Engage users with intuitive UI." },
                { title: "Scalable Infrastructure", desc: "Grow without technical bottlenecks." }
              ].map((item, i) => (
                <div key={i} className='flex gap-5 items-start p-4 rounded-xl hover:bg-white transition-colors hover:shadow-sm'>
                  <div className="w-12 h-12 flex-shrink-0 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-bold">
                    {i+1}
                  </div>
                  <div>
                    <h4 className='text-lg font-bold text-slate-900 mb-1'>{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    `;

    const renderTech = `<TechView />`;
    
    // Dynamic Portfolio Category
    const portfolioCategory = content.portfolioCategory || "app";
    const renderPortfolio = `
      <DynamicPortfolioCard 
        category="${portfolioCategory}" 
        portfolioType="app" 
        title="Latest Projects" 
        subtitle="Explore our recent work in this domain." 
      />
    `;

    const renderAwards = `
      <section className="bg-white py-16 border-y border-slate-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <CommonTitle align="center" pill={false} title='Our' gradientText='Awards & Recognitions' subtitle='Recognized for excellence.' />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
             <Image src="/images/award/Goodfirms award-softkingo.png" alt="award" width={150} height={80} className="mx-auto"/>
             <Image src="/images/award/techbeheb.png" alt="award" width={150} height={80} className="mx-auto"/>
             <Image src="/images/award/Black And Gold Modern Award Ceremony Instagram Post (1).png" alt="award" width={150} height={80} className="mx-auto"/>
             <Image src="/images/award/Black And Gold Modern Award Ceremony Instagram Post (2).png" alt="award" width={150} height={80} className="mx-auto"/>
             <Image src="/images/award/Black And Gold Modern Award Ceremony Instagram Post (4).png" alt="award" width={150} height={80} className="mx-auto"/>
          </div>
        </div>
      </section>
    `;

    const renderConsultation = `
      <ConsultationCTA 
        imageSrc="/images/cta/cta.png" 
        href="/contact" 
        title={content.cta?.title || "Let’s Build Your Next Big App"} 
        subtitle="Collaborate with a leading development agency to turn your innovative idea into a feature-rich mobile application." 
      />
    `;

    const renderBlog = `
      <Blogs
        category=""
        featured={false}
        title="Related Insights"
        subtitle="Expert articles and guides to help you scale."
      />
    `;

    const renderFaq = `<FAQAccordion />`;

    // 3. ASSEMBLE PAGE
    let pageBody = `
        ${renderHero}
        ${renderAboutWithForm}
        ${renderFeatures}
        ${renderBanner}
        ${renderWhyInvest}
        ${renderTech}
        ${renderPortfolio}
        ${renderAwards}
        ${renderConsultation}
        ${renderBlog}
        ${renderFaq}
    `;

    return `
${imports}

export default function GeneratedPage() {
    //  CRITICAL FIX: Inject content variable here
    const content = ${jsonContent}; 

    return (
        <main className="bg-white text-slate-900 font-sans">
            ${pageBody}
            <InquirySection />
        </main>
    );
}
`.trim();
}

// ========== API ROUTES ==========
export async function POST(req) {
    try {
        const body = await req.json();
        const { section, slug } = body; 
        const baseAbs = getBaseAbs(section);
        const folderPath = path.join(baseAbs, slug);

        await fs.mkdir(folderPath, { recursive: true });
        await fs.writeFile(path.join(folderPath, "data.json"), JSON.stringify(body, null, 2));

        const code = generatePageCode(body);
        await fs.writeFile(path.join(folderPath, "page.jsx"), code);

        await trackPageInDB(section, slug);
        return NextResponse.json({ ok: true, url: toUrl(section, slug) });
    } catch (e) { return NextResponse.json({ ok: false, error: e.message }); }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const section = searchParams.get("section") || "all";
        const slug = searchParams.get("slug");

        if (slug && section !== "all") {
            const dataPath = path.join(getBaseAbs(section), slug, "data.json");
            if (await exists(dataPath)) {
                const raw = await fs.readFile(dataPath, "utf8");
                return NextResponse.json({ ok: true, data: JSON.parse(raw) });
            }
        }

        const sections = section === "all" ? ["solutions", "industries"] : [section];
        const results = {};
        for (const s of sections) {
            const baseAbs = getBaseAbs(s);
            if (!(await exists(baseAbs))) { results[s] = []; continue; }
            const entries = await fs.readdir(baseAbs, { withFileTypes: true });
            results[s] = await Promise.all(entries.filter(e => e.isDirectory()).map(async e => {
                const dataPath = path.join(baseAbs, e.name, "data.json");
                let meta = { slug: e.name, url: toUrl(s, e.name) };
                if (await exists(dataPath)) {
                    const raw = await fs.readFile(dataPath, "utf8");
                    const parsed = JSON.parse(raw);
                    meta = { 
                        ...meta, 
                        title: parsed.content?.hero?.title, 
                        type: parsed.type
                    };
                }
                return meta;
            }));
        }
        return NextResponse.json({ ok: true, data: results });
    } catch (e) { return NextResponse.json({ ok: false, error: e.message }); }
}

export async function DELETE(req) {
    try {
        const { section, slug } = await req.json();
        const folderAbs = path.join(getBaseAbs(section), slug);
        await fs.rm(folderAbs, { recursive: true, force: true });
        await untrackPageFromDB(slug);
        return NextResponse.json({ ok: true });
    } catch (e) { return NextResponse.json({ ok: false, error: e.message }); }
}