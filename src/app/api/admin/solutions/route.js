import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";
import { getBaseAbs, toUrl, trackPageInDB, untrackPageFromDB } from "./_utils";

async function exists(p) {
    try { await fs.access(p); return true; } catch { return false; }
}

/**
 * ENGINE: 10-SECTION PROFESSIONAL GENERATOR
 * Generates high-fidelity code based on Softkingo's premium portfolio standards.
 */
function generatePageCode(data) {
    const { content, type, slug, section } = data;
    const jsonContent = JSON.stringify(content);
    
    return `
"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  FaCheckCircle, FaRocket, FaShieldAlt, FaUsers, FaArrowRight, 
  FaQuoteLeft, FaChartLine, FaCog, FaMobileAlt, FaChevronDown,
  FaGlobe, FaLock, FaSync, FaLightbulb, FaBriefcase, FaArrowUp,
  FaGooglePlay, FaApple, FaLaptop
} from 'react-icons/fa';
import InquirySection from '@/components/footer/InquirySection';

export default function GeneratedPage() {
    const [activeFaq, setActiveFaq] = useState(0);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    
    const content = ${jsonContent};
    const type = "${type}";

    // Theme Engine: Sharp & Professional (Non-childish)
    const theme = useMemo(() => {
        const styles = {
            clone: { 
                gradient: "from-orange-600 via-red-600 to-amber-600", 
                accent: "text-orange-600", 
                bg: "bg-[#fffaf5]", 
                radius: "rounded-xl",
                btn: "bg-orange-600 hover:bg-orange-700" 
            },
            industry: { 
                gradient: "from-blue-800 via-indigo-700 to-blue-600", 
                accent: "text-indigo-600", 
                bg: "bg-[#f8faff]", 
                radius: "rounded-lg",
                btn: "bg-indigo-700 hover:bg-indigo-800" 
            },
            solution: { 
                gradient: "from-sky-600 via-blue-600 to-cyan-500", 
                accent: "text-sky-600", 
                bg: "bg-[#fcfdfe]", 
                radius: "rounded-2xl",
                btn: "bg-slate-900 hover:bg-sky-600" 
            }
        };
        return styles[type] || styles.solution;
    }, [type]);

    return (
        <main className="bg-white text-slate-900 selection:bg-sky-100 overflow-x-hidden font-sans">
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-sky-500 z-[100] origin-left" style={{ scaleX }} />

            {/* SECTION 1: PROFESSIONAL HERO (PORTFOLIO STYLE) */}
            <section className={\`relative min-h-[90vh] flex items-center pt-20 overflow-hidden \${theme.bg}\`}>
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.03] -z-10" />
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-sm">
                           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                           {content.hero.tag || "Enterprise Grade"}
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-slate-900">
                            {content.hero.title} <br/>
                            <span className={\`text-transparent bg-clip-text bg-gradient-to-r \${theme.gradient}\`}>
                                Digital Innovation.
                            </span>
                        </h1>
                        <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-xl font-normal">
                            {content.hero.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/contact" className={\`group \${theme.btn} text-white px-8 py-4 \${theme.radius} font-bold transition-all flex items-center gap-3 shadow-xl shadow-slate-200\`}>
                                GET A FREE QUOTE <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
                            </Link>
                            {type === 'clone' && (
                                <div className="flex gap-4 items-center ml-2">
                                    <FaGooglePlay className="text-slate-300 text-xl" />
                                    <FaApple className="text-slate-300 text-xl" />
                                    <FaLaptop className="text-slate-300 text-xl" />
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* HERO MOCKUP: SHARP DESIGN */}
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
                        <div className={\`relative z-10 p-2 bg-white rounded-2xl border border-slate-200 shadow-2xl\`}>
                             <div className={\`relative h-[550px] w-full \${theme.radius} overflow-hidden bg-slate-100\`}>
                                <Image src={content.hero.image || "/images/hero-placeholder.png"} alt="Preview" fill className="object-cover" priority />
                             </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2: STATS (MINIMALIST) */}
            <div className="bg-white py-16 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {content.stats?.map((s, i) => (
                        <div key={i} className="text-left border-l-2 border-slate-100 pl-8">
                            <div className={\`text-4xl font-bold \${theme.accent} mb-1\`}>{s.value}</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SECTION 3: SERVICES GRID (SHARP CARDS) */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Comprehensive <span className={\`italic \${theme.accent}\`}>Modules.</span></h2>
                    <p className="text-slate-500 text-lg">We deliver a full-stack ecosystem tailored to your operational needs.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {content.services?.map((s, i) => (
                        <div key={i} className={\`p-8 \${theme.radius} border border-slate-200 bg-white hover:border-sky-500 hover:shadow-2xl transition-all group\`}>
                            <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 text-slate-900 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                                <FaCog size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 tracking-tight">{s.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">Advanced {s.title} integration with secure API layers and real-time data sync.</p>
                            <Link href="/contact" className="text-xs font-bold flex items-center gap-2 text-sky-600">LEARN MORE <FaArrowRight size={10}/></Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 4: CASE STUDY (POTAFO DARK STYLE) */}
            <section className="py-24 px-6 bg-slate-950 rounded-[2rem] mx-4 mb-24">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <div className="text-sky-500 font-bold uppercase tracking-[0.3em] text-[10px]">Real-World Success</div>
                        <h3 className="text-4xl md:text-6xl font-bold text-white leading-tight">{content.caseStudy.title}</h3>
                        <p className="text-slate-400 text-lg leading-relaxed">{content.caseStudy.description}</p>
                        <div className="flex gap-4">
                            <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-bold">
                                TECH: {content.caseStudy.tech}
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[450px] rounded-2xl overflow-hidden border-8 border-white/5 shadow-2xl">
                        <Image src={content.caseStudy.image || "/images/case-placeholder.png"} alt="Case" fill className="object-cover" />
                    </div>
                </div>
            </section>

            {/* SECTION 5: METHODOLOGY (BLUEPRINT) */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-center text-4xl font-bold mb-20 tracking-tight">Our <span className="text-sky-600 italic">Execution</span> Strategy</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {content.methodology?.map((m, i) => (
                            <div key={i} className="space-y-4 border-t-4 border-slate-50 pt-8 hover:border-sky-500 transition-colors">
                                <div className="text-4xl font-black text-slate-100 group-hover:text-sky-100 transition-colors">0{i+1}</div>
                                <h4 className="text-lg font-bold text-slate-900">{m.title}</h4>
                                <p className="text-slate-500 text-xs leading-relaxed">{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 6: TECH TRUST BAR */}
            <section className="py-12 bg-slate-50 overflow-hidden border-y border-slate-100">
                <div className="flex gap-20 items-center whitespace-nowrap animate-scroll opacity-20 hover:opacity-50 transition-opacity">
                    {[1,2,3,4,5,6].map(i => (
                        <span key={i} className="text-2xl font-black text-slate-900 tracking-tighter">SOFTKINGO TECH SYSTEM</span>
                    ))}
                </div>
            </section>

            {/* SECTION 7: INTERACTIVE FAQ (ACCORDION) */}
            <section className="py-32 max-w-4xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
                <div className="space-y-3">
                    {content.benefits?.map((b, i) => (
                        <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                            <button 
                                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-800 hover:bg-slate-50"
                            >
                                <span>{b.title}</span>
                                <FaChevronDown className={\`transition-transform \${activeFaq === i ? 'rotate-180' : ''}\`} />
                            </button>
                            {activeFaq === i && (
                                <motion.div initial={{height:0}} animate={{height:'auto'}} className="px-6 pb-6 text-slate-500 text-sm leading-relaxed">{b.desc}</motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 8: WHY SOFTKINGO (BENEFITS) */}
            <section className="py-24 bg-slate-900 rounded-[2rem] mx-4 text-white">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
                   {[
                       {t:"ISO Certified", d:"Industry standard security protocols.", i:<FaShieldAlt/>},
                       {t:"99% Uptime", d:"Reliable infrastructure on AWS/Azure.", i:<FaSync/>},
                       {t:"Global Reach", d:"Deploy across multiple regions.", i:<FaGlobe/>}
                   ].map((f, i) => (
                       <div key={i} className="text-center space-y-4">
                           <div className="text-4xl text-sky-500 flex justify-center">{f.i}</div>
                           <h4 className="text-xl font-bold">{f.t}</h4>
                           <p className="text-slate-400 text-sm">{f.d}</p>
                       </div>
                   ))}
                </div>
            </section>

            {/* SECTION 9: CTA (CONVERSION) */}
            <section className="py-32 text-center px-6">
                <div className={\`max-w-5xl mx-auto py-24 px-8 rounded-3xl bg-gradient-to-br \${theme.gradient} text-white shadow-2xl relative overflow-hidden\`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full" />
                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Scale Your Digital <br/> Footprint Today.</h2>
                    <Link href="/contact" className="bg-white text-slate-900 px-12 py-5 rounded-lg font-black text-lg hover:scale-110 transition-transform inline-block">LET'S START</Link>
                </div>
            </section>

            {/* SECTION 10: INQUIRY */}
            <InquirySection />

            <style jsx>{\`
                @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
                .animate-scroll { animation: scroll 20s linear infinite; }
            \`}</style>
        </main>
    );
}
`.trim();
}

// ========== API ROUTES (GET, POST, DELETE) ==========
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
    } catch (e) {
        return NextResponse.json({ ok: false, error: e.message });
    }
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
                    meta = { ...meta, title: parsed.content?.hero?.title, type: parsed.type };
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