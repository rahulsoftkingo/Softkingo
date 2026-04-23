"use client";

import React, { useState, useEffect, useRef } from "react";
import CommonTitle from "@/components/ui/CommonTitle";
import { motion, useScroll, useSpring } from "framer-motion";

const UserGuide = ({ data }) => {
    // Debug logging to see what data is coming in
    useEffect(() => {
        console.log("UserGuide Data:", data);
    }, [data]);

    const isRich = data?.mode === 'rich';
    const richContent = data?.richContent || data?.contentJson;

    // Helper to extract text for ToC and IDs
    const extractRawText = (content) => {
        if (!content) return "";
        if (typeof content === 'string') return content;
        if (Array.isArray(content)) return content.map(extractRawText).join("");
        if (content.type === 'text') return content.text || "";
        if (content.content) return extractRawText(content.content);
        return "";
    };

    // Refactored Helper to extract ToC and Blocks as separate entities
    const parseRichContent = (rawJson) => {
        let doc;
        try {
            doc = typeof rawJson === "string" ? JSON.parse(rawJson) : rawJson;
        } catch { return { toc: [], blocks: [] }; }
        if (!doc || doc.type !== "doc" || !Array.isArray(doc.content)) return { toc: [], blocks: [] };

        const toc = [];
        const blocks = [];
        let headingCounter = 0;

        doc.content.forEach((node) => {
            if (node.type === 'heading') {
                const level = node.attrs?.level || 2;
                // Capture only H2 in ToC to keep it concise
                if (level === 2) {
                    const text = extractRawText(node.content).trim();
                    const id = `${text?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || 'h'}-${++headingCounter}`;
                    toc.push({ id, title: text, level });
                    blocks.push({ ...node, id });
                } else if (level > 2 && level <= 5) {
                    // For H3-H5, we still need IDs for scroll tracking/anchors if needed, 
                    // but we won't put them in the TOC.
                    const text = extractRawText(node.content).trim();
                    const id = `${text?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || 'h'}-${++headingCounter}`;
                    blocks.push({ ...node, id });
                } else {
                    blocks.push(node);
                }
            } else {
                blocks.push(node);
            }
        });

        return { toc, blocks };
    };

    const { toc, blocks } = isRich && richContent ? parseRichContent(richContent) : { toc: [], blocks: [] };
    const [activeTab, setActiveTab] = useState("");
    const [isTocOpen, setIsTocOpen] = useState(false);
    const contentScrollRef = useRef(null);

    // Intersection Observer for ToC - now using the content container as root
    useEffect(() => {
        if (!contentScrollRef.current) return;

        const observerOptions = {
            root: contentScrollRef.current,
            rootMargin: '-5% 0px -80% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveTab(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all headings that have IDs (these are the ToC items)
        blocks.filter(b => b.type === 'heading' && b.id).forEach(b => {
            const el = document.getElementById(b.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [blocks, isRich]);

    const scrollToId = (id) => {
        const el = document.getElementById(id);
        if (el && contentScrollRef.current) {
            const container = contentScrollRef.current;
            const elementPosition = el.offsetTop - 20; // Offset for spacing

            container.scrollTo({
                top: elementPosition,
                behavior: "smooth"
            });
            setActiveTab(id);
            setIsTocOpen(false); // Close mobile drawer on click
        }
    };

    const skipGuide = () => {
        const nextSection = document.getElementById('user-guide').nextElementSibling;
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: document.getElementById('user-guide').offsetTop + document.getElementById('user-guide').offsetHeight, behavior: 'smooth' });
        }
    };

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    if (isRich && blocks.length === 0) {
        return (
            <section className="bg-white py-8 md:py-16 px-6">
                <div className="max-w-4xl mx-auto text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-slate-400 italic">No guide content has been added yet.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-white relative overflow-hidden" id="user-guide">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-sky-500 origin-left z-[100]"
                style={{ scaleX }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16 relative">
                {/* Skip Guide Button (Desktop) */}
                <button
                    onClick={skipGuide}
                    className="hidden lg:flex absolute top-4 right-6 z-20 px-6 py-2 rounded-full border border-slate-200 text-slate-400 text-xs font-black uppercase tracking-widest hover:bg-slate-50 hover:text-sky-500 hover:border-sky-100 transition-all duration-300 items-center gap-2 group"
                >
                    Skip Guide
                    <svg className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </button>

                <CommonTitle
                    align="center"
                    pill={false}
                    title={data?.title}
                    gradientText={data?.subtitle}
                    subtitle={data?.subtitle}
                />

                {/* Mobile Sticky ToC Bar */}
                <div className="lg:hidden sticky top-4 z-40 mt-8 mb-4">
                    <div className="bg-white/90 backdrop-blur-xl border border-slate-100 rounded-2xl p-4 shadow-xl flex items-center justify-between">
                        <button
                            onClick={() => setIsTocOpen(true)}
                            className="flex items-center gap-3 text-slate-900 font-black text-sm"
                        >
                            <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </div>
                            Table of Contents
                        </button>
                        <button
                            onClick={skipGuide}
                            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-sky-500 flex items-center gap-1"
                        >
                            Skip
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile ToC Drawer */}
                {isTocOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[100] lg:hidden"
                    >
                        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsTocOpen(false)} />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-2xl p-8 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Navigation</h4>
                                <button onClick={() => setIsTocOpen(false)} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <nav className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
                                {toc.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToId(item.id)}
                                        className={`w-full text-left p-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-sky-50 text-sky-600 font-black' : 'text-slate-500 font-bold'}`}
                                    >
                                        {item.title}
                                    </button>
                                ))}
                            </nav>
                        </motion.div>
                    </motion.div>
                )}

                <div className="mt-8 lg:mt-12 flex flex-col lg:flex-row gap-8 lg:gap-16">
                    {/* Table of Contents (Desktop Sticky) */}
                    <aside className="hidden lg:block lg:w-1/3 xl:w-1/4">
                        <div className="sticky top-32 h-fit">
                            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.05)] relative overflow-hidden group/toc h-full max-h-[calc(100vh-180px)] flex flex-col">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 transition-opacity" />

                                <div className="relative z-10 flex flex-col h-full overflow-hidden">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2 shrink-0">
                                        <span className="w-4 h-[1px] bg-slate-200"></span>
                                        On this page
                                    </h4>
                                    <nav className="space-y-1 relative overflow-y-auto pr-2 custom-scrollbar">
                                        {toc.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => scrollToId(item.id)}
                                                className={`w-full text-left transition-all duration-300 flex items-center gap-2 py-2 px-3 rounded-xl hover:bg-sky-50/50 group/item ${activeTab === item.id
                                                    ? "bg-sky-50 text-sky-600 font-extrabold"
                                                    : "text-slate-500 font-bold hover:text-sky-600"
                                                    }`}
                                            >
                                                {/* Bullet indicator */}
                                                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-500 shrink-0 ${activeTab === item.id ? 'bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]' : 'bg-slate-200 group-hover/item:bg-sky-300'}`} />
                                                <span className="line-clamp-2 leading-normal">{item.title}</span>
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Single Document Flow Container */}
                    <main className="lg:w-2/3 xl:w-3/4">
                        <div
                            ref={contentScrollRef}
                            className="bg-gradient-to-br from-white to-sky-50/10 rounded-2xl p-6 md:p-16 border border-slate-100 shadow-2xl shadow-sky-100/5 max-h-[80vh] lg:max-h-[85vh] overflow-y-auto scrollbar-hide lg:scrollbar-default custom-scrollbar scroll-smooth relative"
                        >
                            {isRich ? (
                                <div className="prose prose-sky prose-lg max-w-none 
                                    prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tighter
                                    prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium
                                    prose-strong:text-slate-900 prose-strong:font-black
                                    prose-ul:list-none prose-ol:list-none
                                    prose-hr:my-16 prose-hr:border-slate-100
                                ">
                                    {blocks.map((block, idx) => (
                                        <BlockRenderer key={idx} block={block} />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-12">
                                    {(data?.sections || []).map((section, idx) => (
                                        <div key={idx} className="space-y-6">
                                            {section.title && <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter" id={`section-${idx}`}>{section.title}</h3>}
                                            {section.description && <div className="text-slate-600 text-lg leading-relaxed font-medium rich-text" dangerouslySetInnerHTML={{ __html: section.description }} />}
                                            <div className="grid md:grid-cols-2 gap-6">
                                                {section.subSections?.map((sub, sIdx) => (
                                                    <div key={sIdx} className="p-6 bg-white border border-slate-100 rounded-xl shadow-sm">
                                                        <h4 className="font-bold text-slate-800 mb-3">{sub.title}</h4>
                                                        <ul className="space-y-2">
                                                            {sub.bullets?.map((b, bIdx) => (
                                                                <li key={bIdx} className="text-sm text-slate-600 flex gap-2">
                                                                    <span className="text-sky-500 font-black">✓</span> {b}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </section>
    );
};

// --- HELPER COMPONENTS FOR RICH RENDERING ---

const InlineRenderer = ({ content }) => {
    if (!content) return null;
    if (typeof content === 'string') return content;
    if (!Array.isArray(content)) return null;

    return content.map((node, i) => {
        if (node.type === 'text') {
            let text = node.text;
            if (node.marks) {
                // Apply marks in order
                node.marks.forEach(mark => {
                    switch (mark.type) {
                        case 'bold': text = <strong key={i}>{text}</strong>; break;
                        case 'italic': text = <em key={i}>{text}</em>; break;
                        case 'underline': text = <u key={i} style={{ textDecoration: 'underline' }}>{text}</u>; break;
                        case 'strike': text = <s key={i}>{text}</s>; break;
                        case 'code': text = <code key={i} className="bg-slate-100 px-1.5 py-0.5 rounded text-sm text-pink-600 font-mono">{text}</code>; break;
                        case 'subscript': text = <sub key={i}>{text}</sub>; break;
                        case 'superscript': text = <sup key={i}>{text}</sup>; break;
                        case 'link': text = <a key={i} href={mark.attrs?.href} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">{text}</a>; break;
                        case 'textStyle':
                            if (mark.attrs?.color) text = <span key={i} style={{ color: mark.attrs.color }}>{text}</span>;
                            if (mark.attrs?.fontFamily) text = <span key={i} style={{ fontFamily: mark.attrs.fontFamily }}>{text}</span>;
                            break;
                        case 'highlight': text = <mark key={i} className="bg-yellow-200 px-1 rounded">{text}</mark>; break;
                        default: break;
                    }
                });
            }
            return <React.Fragment key={i}>{text}</React.Fragment>;
        }
        if (node.type === 'hardBreak') return <br key={i} />;
        return null;
    });
};

const BlockRenderer = ({ block }) => {
    if (!block) return null;
    const { type, attrs, content } = block;

    // Helper to handle nested content that might be blocks or text
    const renderContent = (nodes) => {
        if (!nodes) return null;
        if (!Array.isArray(nodes)) return <InlineRenderer content={nodes} />;

        // Check if these are block-level nodes
        const blockTypes = ['paragraph', 'blockquote', 'bulletList', 'orderedList', 'heading', 'codeBlock', 'table', 'taskList', 'image', 'horizontalRule', 'summaryBlock', 'blogCTA'];
        if (nodes.length > 0 && blockTypes.includes(nodes[0].type)) {
            return nodes.map((n, i) => <BlockRenderer key={i} block={n} />);
        }

        return <InlineRenderer content={nodes} />;
    };

    switch (type) {
        case 'paragraph':
        case 'p':
            return <p className="mb-6 whitespace-pre-wrap"><InlineRenderer content={content || block.content} /></p>;

        case 'heading':
            const level = attrs?.level || 2;
            const headingClasses = "scroll-mt-32 " + (
                level === 1 ? "text-4xl" :
                    level === 2 ? "text-3xl mt-12 mb-6" :
                        level === 3 ? "text-2xl mt-10 mb-4 border-l-4 border-sky-400 pl-4" :
                            level === 4 ? "text-xl mt-8 mb-3" :
                                "text-lg mt-6 mb-2"
            );
            const Tag = `h${level}`;
            return <Tag id={block.id} className={headingClasses}><InlineRenderer content={content} /></Tag>;

        case 'bulletList':
            return (
                <ul className="space-y-4 pl-2 py-4 mb-6 list-none">
                    {content?.map((li, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                            <div className="flex-1 overflow-hidden">{renderContent(li.content)}</div>
                        </li>
                    ))}
                </ul>
            );

        case 'orderedList':
            return (
                <ol className="space-y-4 pl-2 py-4 mb-6 list-none">
                    {content?.map((li, i) => (
                        <li key={i} className="flex items-start gap-4">
                            <span className="text-sky-500 font-black shrink-0">{String(i + 1).padStart(2, '0')}.</span>
                            <div className="flex-1 overflow-hidden">{renderContent(li.content)}</div>
                        </li>
                    ))}
                </ol>
            );

        case 'taskList':
            return (
                <ul className="space-y-3 mb-6 list-none">
                    {content?.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <div className={`mt-1 w-5 h-5 rounded border shrink-0 ${item.attrs?.checked ? 'bg-sky-500 border-sky-500 flex items-center justify-center' : 'border-slate-300 bg-white'}`}>
                                {item.attrs?.checked && <span className="text-white text-[10px]">✓</span>}
                            </div>
                            <div className={`flex-1 overflow-hidden ${item.attrs?.checked ? 'line-through text-slate-400' : ''}`}>
                                {renderContent(item.content)}
                            </div>
                        </li>
                    ))}
                </ul>
            );

        case 'blockquote':
            return (
                <blockquote className="border-l-4 border-slate-200 bg-slate-50/50 p-6 my-10 italic text-slate-500 text-lg leading-relaxed rounded-r-2xl not-italic">
                    {renderContent(content)}
                </blockquote>
            );

        case 'codeBlock':
            return (
                <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-sm font-mono text-sm bg-slate-900 group">
                    <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-slate-400 border-b border-slate-700">
                        <span className="text-[10px] uppercase tracking-widest font-bold">{attrs?.language || 'code'}</span>
                    </div>
                    <pre className="p-6 overflow-x-auto m-0 text-sky-100 leading-relaxed">
                        <code>{renderContent(content)}</code>
                    </pre>
                </div>
            );

        case 'horizontalRule':
            return <hr className="my-16 border-t border-slate-100" />;

        case 'image':
            return (
                <div className="my-10 rounded-2xl overflow-hidden border border-slate-100 shadow-2xl group/img relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={attrs?.src} alt={attrs?.alt || 'Manual image'} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                    {attrs?.alt && <div className="absolute bottom-0 inset-x-0 p-6 bg-slate-900/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover/img:opacity-100 transition-opacity text-center">{attrs.alt}</div>}
                </div>
            );

        case 'table':
            return (
                <div className="my-10 overflow-x-auto rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                    <table className="w-full border-collapse bg-white m-0">
                        <tbody className="divide-y divide-slate-100">
                            {content?.map((row, ri) => (
                                <tr key={ri} className={ri === 0 ? "bg-slate-50/50" : "hover:bg-slate-50/30 transition-colors"}>
                                    {row.content?.map((cell, ci) => {
                                        const CellTag = cell.type === 'tableHeader' ? 'th' : 'td';
                                        return (
                                            <CellTag key={ci} className="p-5 text-left text-sm font-medium border-x border-slate-50">
                                                {renderContent(cell.content)}
                                            </CellTag>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );

        case 'summaryBlock':
            return (
                <div className="my-10 bg-gradient-to-br from-sky-50 to-white border border-sky-100 rounded-2xl p-10 relative overflow-hidden group/summary">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-sky-200/20 rounded-full blur-[100px] -mr-24 -mt-24 group-hover/summary:scale-150 transition-transform duration-1000" />
                    <div className="relative z-10 flex gap-6 italic">
                        <span className="text-6xl font-black text-sky-200 -mt-2 leading-none">"</span>
                        <div className="text-xl font-bold leading-relaxed text-slate-700">
                            {renderContent(content)}
                        </div>
                    </div>
                </div>
            );

        case 'blogCTA':
            return (
                <div className={`my-12 p-10 rounded-2xl border flex flex-col md:flex-row items-center gap-10 ${attrs?.variant === 'minimalist' ? 'bg-slate-50 border-slate-200' : 'bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 text-white border-transparent shadow-[0_30px_70px_rgba(15,23,42,0.3)]'}`}>
                    <div className="w-28 h-28 rounded-3xl bg-white/10 flex items-center justify-center p-6 relative overflow-hidden shrink-0 shadow-inner">
                        <div className="absolute inset-0 bg-white/5 blur-xl group-hover:scale-150 transition-transform" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={attrs?.image || '/images/logo.png'} alt="CTA" className="w-full h-auto object-contain relative z-10" />
                    </div>
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <h4 className="text-2xl font-black tracking-tight">{attrs?.title}</h4>
                        <p className={`text-lg ${attrs?.variant === 'minimalist' ? 'text-slate-500' : 'text-sky-100/70'}`}>{attrs?.description}</p>
                    </div>
                    <a href={attrs?.buttonLink} target="_blank" rel="noopener noreferrer" className="px-10 py-4 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-black text-sm transition-all transform hover:-translate-y-1 shadow-[0_15px_40px_rgba(14,165,233,0.4)] hover:shadow-[0_20px_50px_rgba(14,165,233,0.5)] active:scale-95">
                        {attrs?.buttonText}
                    </a>
                </div>
            );

        default:
            // EXHAUSTIVE FALLBACK: If node type is unknown, render its children/content
            // This ensures 1000+ custom tags still show content
            if (content) {
                console.warn(`Unmapped TipTap node type: "${type}". Falling back to recursive content rendering.`);
                return <div className="unknown-node mb-4">{renderContent(content)}</div>;
            }
            return null;
    }
};

export default UserGuide;
