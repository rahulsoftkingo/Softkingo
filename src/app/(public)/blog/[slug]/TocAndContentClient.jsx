



/* ---------- CLIENT SUBCOMPONENT (same folder) ---------- */
// src/app/(public)/blog/[slug]/TocAndContentClient.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
// import TipTapBlocks from "@/components/content/TipTapBlocks";
import EGuidePromoCard from "@/components/public/EGuidePromoCard";
import { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaTag,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaLink,
  FaStar,
  FaCode,
  FaLightbulb,
  FaRocket,
  FaChartLine,
  FaMobileAlt,
  FaShieldAlt,
  FaHeart,
} from "react-icons/fa";
import BlogCard from "@/app/(public)/blog/BlogCard";

// import { useEffect, useRef, useState } from "react";
// import BlogCard from "@/components/public/blog/BlogCard";
import ArticleRating from "@/app/(public)/blog/ArticleRating";
import NewsletterStrip from "@/app/(public)/blog/NewsletterStrip";

import { motion, AnimatePresence } from 'framer-motion';
import LatestEGuidePromoCardClient from "@/components/public/LatestEGuidePromoCardClient";



// function TocAndContentClient({ post, related }) {
function TocAndContentClient({ post, related, sectionKey, newsletterList }) {

  const [activeSection, setActiveSection] = useState(post.sections[0].id);
  const sectionRefs = useRef({});
  const tocItems = buildTocItems(post.sections);

useEffect(() => {
  if (!post.slug) return;
  fetch(`/api/public/blog/${post.slug}/view`, { method: "POST" }).catch(() => {});
}, [post.slug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] }
    );
    post.sections.forEach((sec) => {
      const el = sectionRefs.current[sec.id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [post.sections]);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 90,
        behavior: "smooth",
      });
    }
  };



  return (
    <main className="bg-slate-50 public-article">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <section className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1.9fr)_minmax(0,260px)] gap-6 lg:gap-8 items-start mb-8 ">
          {/* LEFT: TOC + socials */}
          <aside className="hidden lg:block sticky top-24 space-y-4">
          {/* <aside className="hidden lg:block sticky top-24 max-h-[70vh] overflow-auto space-y-4 pr-1"> */}

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm max-h-[70vh] overflow-auto hide-scrollbar toc-card">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.18em] mb-3">
                On this page
              </p>
              <ul className="space-y-2 text-sm">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => scrollToId(item.id)}
                      className={`flex items-start gap-2 text-left leading-snug transition-colors ${
                        activeSection === item.id
                          ? "text-sky-700 font-semibold"
                          : "text-slate-600 hover:text-sky-600"
                      } text-[13px]`}
                    >
                      <span
                        className={`mt-[5px] h-1.5 w-1.5 rounded-full ${
                          activeSection === item.id
                            ? "bg-sky-600"
                            : "bg-slate-300"
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                    {item.children?.length ? (
                      <ul className="mt-1 ml-4 border-l border-slate-200/70 pl-3 space-y-1">
                        {item.children.map((sub) => (
                          <li key={sub.id}>
                            <button
                              type="button"
                              onClick={() => scrollToId(sub.id)}
                              className={`block text-left text-[12px] leading-snug py-0.5 ${
                                activeSection === sub.id
                                  ? "text-sky-600 font-semibold"
                                  : "text-slate-500 hover:text-sky-600"
                              }`}
                            >
                              {sub.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-sky-100 rounded-2xl p-4 shadow-sm share-card">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.18em] mb-3">
                Share
              </p>
              <div className="flex flex-wrap gap-2">
                <SocialIcon icon={FaFacebookF} label="Facebook" />
                <SocialIcon icon={FaTwitter} label="X" />
                <SocialIcon icon={FaLinkedinIn} label="LinkedIn" />
                <SocialIcon icon={FaWhatsapp} label="WhatsApp" />
                <SocialIcon icon={FaLink} label="Copy link" />
              </div>
            </div>
          </aside>

          {/* CENTER: article */}
          <article className="bg-white rounded-3xl shadow-[0_18px_45px_rgba(15,23,42,0.06)] border border-slate-200 overflow-hidden prose content-card modern-prose">
            <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10">
              {post.sections.map((sec, index) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  ref={(el) => {
                    sectionRefs.current[sec.id] = el;
                  }}
                  className={`scroll-mt-28 ${
                    sec.id === "overview"
                      ? "bg-sky-50/60 border border-sky-100 rounded-2xl px-4 sm:px-5 py-5 content-section overview-section"
                      : "content-section"
                  }`}
                >
                  <h2
                    className={`section-title text-xl sm:text-2xl font-semibold mb-3 ${
                      sec.id === "overview" ? "text-sky-800" : "text-slate-900"
                    }`}
                  >
                    {sec.title}
                  </h2>
                  <div className="space-y-3 text-[13px] sm:text-[15px] text-slate-700 leading-relaxed  content-body">
                    {sec.blocks.map((block, idx) => {
                      if (block.type === "p") {
                        return (
                          <p key={idx} className="text-slate-700">
                            {block.text}
                          </p>
                        );
                      }
                      if (block.type === "h3") {
                        const subId = `${sec.id}-sub-${idx}`;
                        return (
                          <h3
                            key={idx}
                            id={subId}
                            className="sub-title text-[15px] sm:text-[16px] font-semibold text-slate-900 mt-5 border-l-4 border-sky-500 pl-3"
                          >
                            {block.text}
                          </h3>
                        );
                      }
                      if (block.type === "ul") {
                        return (
                          <ul
                            key={idx}
                            className="content-ul list-disc pl-5 space-y-1.5 marker:text-sky-500"
                          >
                            {block.items.map((it, i) => (
                              <li key={i}>{it}</li>
                            ))}
                          </ul>
                        );
                      }
                      if (block.type === "ol") {
                        return (
                          <ol
                            key={idx}
                            className="content-ol list-decimal pl-5 space-y-1.5 marker:text-sky-500"
                          >
                            {block.items.map((it, i) => (
                              <li key={i}>{it}</li>
                            ))}
                          </ol>
                        );
                      }
                      if (block.type === "table") {
                        return <EnhancedTable key={idx} table={block} />;
                      }
                      if (block.type === "code") {
                        return <CodeBlock key={idx} code={block} />;
                      }
                      if (block.type === "tip") {
                        return <TipBlock key={idx} tip={block} />;
                      }
                      if (block.type === "warning") {
                        return <WarningBlock key={idx} warning={block} />;
                      }
                      if (block.type === "stats") {
                        return <StatsBlock key={idx} stats={block} />;
                      }
                      if (block.type === "image") {
                        return <ImageBlock key={idx} image={block} />;
                      }
                      return null;
                    })}
                  </div>

      {index === post.sections.length - 1 && (
  <div className="mt-10 space-y-8">
    <EngagementBar
      slug={post.slug}
      initialLikes={post.likeCount}
      initialShares={post.shareCount}
    />
    <ArticleRating slug={post.slug} />
    {post.author && <WriterCard author={post.author} />}
    {/* <WriterCard author={post.author}/> */}
    
  </div>
)}

                </section>
              ))}
            </div>
          </article>

          {/* RIGHT: form + e-guide */}
          <aside className=" sm:grid sm:grid-cols-2 gap-8 lg:grid-cols-1 sticky top-24 space-y-4">
            <ContactSideForm />
            {/* <EGuideCard /> */}
             <LatestEGuidePromoCardClient />
          </aside>
        </section>
{/* <NewsletterStrip /> */}
<NewsletterStrip
  source={`post:${sectionKey || "blog"}:${post.slug}`}
  listSlug={newsletterList?.slug || "blog-newsletter"}
  listName={newsletterList?.name || "Blog Newsletter"}
  listDescription={
    newsletterList?.description || "Main blog newsletter list"
  }
/>

        <RelatedPosts posts={related} />
      </div>
    </main>
  );
}

// helpers inside client file
function buildTocItems(sections) {
  return sections.map((sec) => {
    const children = [];
    sec.blocks.forEach((b, idx) => {
      if (b.type === "h3") {
        children.push({
          id: `${sec.id}-sub-${idx}`,
          label: b.text,
        });
      }
    });
    return { id: sec.id, label: sec.title, children };
  });
}

function EnhancedTable({ table }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-sky-100 bg-sky-50/40 my-6 enhanced-table-wrap">
      <table className="min-w-full text-sm border-collapse enhanced-table">
        <thead className="bg-sky-600/90">
          <tr className="code-block">
            {table.headers.map((h) => (
              <th
                key={h}
                className="px-4 py-2 text-left font-semibold text-white text-[12px] uppercase tracking-wide  code-block__header"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rIdx) => (
            <tr
              key={rIdx}
              className={rIdx % 2 === 0 ? "bg-white" : "bg-sky-50/70"}
            >
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className={`px-4 py-2 align-top text-slate-800 text-[13px] ${
                    cIdx === 0 ? "font-semibold text-sky-900" : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// New Component: Code Block
function CodeBlock({ code }) {
  return (
    <div className="my-6 rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <FaCode className="h-3 w-3 text-slate-400" />
          <span className="text-xs font-mono text-slate-300">{code.language}</span>
        </div>
        <button className="text-xs text-slate-400 hover:text-slate-200 transition-colors">
          Copy
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-slate-100 font-mono leading-relaxed">
        {code.content}
      </pre>
    </div>
  );
}

// New Component: Tip Block
function TipBlock({ tip }) {
  return (
    <div className="my-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
      <div className="flex items-start gap-3">
        <FaLightbulb className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-emerald-900 text-sm mb-1">Pro Tip</h4>
          <p className="text-emerald-800 text-[13px] leading-relaxed">{tip.content}</p>
        </div>
      </div>
    </div>
  );
}

// New Component: Warning Block
function WarningBlock({ warning }) {
  return (
    <div className="my-6 rounded-2xl bg-amber-50 border border-amber-200 p-4">
      <div className="flex items-start gap-3">
        <FaShieldAlt className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-amber-900 text-sm mb-1">Important Note</h4>
          <p className="text-amber-800 text-[13px] leading-relaxed">{warning.content}</p>
        </div>
      </div>
    </div>
  );
}

// New Component: Stats Block
function StatsBlock({ stats }) {
  return (
    <div className="my-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {stats.items.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="text-2xl font-bold text-blue-900">{item.value}</div>
            <div className="text-xs text-blue-700 font-medium">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// New Component: Image Block
function ImageBlock({ image }) {
  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 image-block">
      <div className="relative h-64 bg-slate-100">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
        />
      </div>
      {image.caption && (
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200">
          <p className="text-xs text-slate-600 text-center">{image.caption}</p>
        </div>
      )}
    </div>
  );
}

function SocialIcon({ icon: Icon, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-sky-600 hover:border-sky-300 bg-slate-50 transition-colors"
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}


function ContactSideForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }

    try {
      setStatus("loading");

      const res = await fetch("/api/public/leads", {
        // agar tumhara route /api/leads/ hai to yahan "/api/leads" karo
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // required by your existing API
          name,
          email,
          phone,
          message,

          // optional fields your API supports
          whatsapp: null,
          company: null,
          campaign: "blog-side-form",
          source: "blog",

          formType: "inquiry",
          formKey: "blog-side-form",

          utmSource: null,
          utmMedium: null,
          utmCampaign: null,

          budgetLabel: null,
          attachmentName: null,
          ndaAccepted: null,
          tags: "blog,side-form",
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("Submit lead failed:", error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-white border border-sky-100 rounded-2xl p-4 sm:p-5 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
      <div className="flex flex-col text-center items-center gap-2 mb-3">
        <div className="h-11 w-11 rounded-full bg-sky-50 flex items-center justify-center text-white text-xs font-bold">
          <img src="/images/logo.png" alt="Softkingo" />
        </div>
        <div>
          <p className="text-sm font-semibold text-sky-900">
            Talk to Softkingo
          </p>
          {/* <p className="text-[11px] text-slate-500">
            Share your launch plan with the team.
          </p> */}
           {status === "success" && (
          <p className="text-[10px] text-emerald-600 mt-1">
            Thanks! Your message has been received.
          </p>
        )}
        {status === "error" && (
          <p className="text-[10px] text-rose-600 mt-1">
            Name, email and message are required or something went wrong. Please try again.
          </p>
        )}
        {status === "idle" && (
          <p className="text-[10px] text-slate-400 mt-1">
            We reply within one business day. Your details are safe with us.
          </p>
        )}
        </div>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:bg-white"
        />
        <input
          type="email"
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:bg-white"
        />
        <input
          type="tel"
          placeholder="98765 43210"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 pr-3 py-2 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:bg-white"
        />
        <textarea
          rows={2}
          placeholder="Tell us briefly about your app or idea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:bg-white resize-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-[13px] font-semibold py-2.5 shadow-sm transition-colors disabled:opacity-70"
        >
          {status === "loading" ? "Sending..." : "Send message"}
        </button>

        {/* {status === "success" && (
          <p className="text-[10px] text-emerald-600 mt-1">
            Thanks! Your message has been received.
          </p>
        )}
        {status === "error" && (
          <p className="text-[10px] text-rose-600 mt-1">
            Name, email and message are required or something went wrong. Please try again.
          </p>
        )}
        {status === "idle" && (
          <p className="text-[10px] text-slate-400 mt-1">
            We reply within one business day. Your details are safe with us.
          </p>
        )} */}
      </form>
    </div>
  );
}

function EGuideCard() {
  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50 border border-sky-100 rounded-2xl p-4 sm:p-5 shadow-sm">
      <p className="text-[11px] tracking-[0.24em] uppercase text-sky-500 mb-1">
        E‑Guide
      </p>
      <h3 className="text-sm font-semibold text-slate-900">
        Resource Guide: Launching PSA‑style Apps
      </h3>
      <p className="text-[12px] text-slate-600 mt-1 mb-3">
        A 15‑page practical guide on planning, building and launching
        Professional Services Automation apps.
      </p>
      <div className="relative h-24 rounded-xl overflow-hidden bg-gradient-to-tr from-sky-600 via-sky-700 to-slate-900 mb-3">
        <Image
          src="/images/black book.png"
          alt="Guide cover"
          fill
          className="object-contain p-4"
        />
      </div>
      <button className="w-full inline-flex items-center justify-center px-3 py-2 rounded-full bg-sky-600 hover:bg-sky-500 text-[13px] font-semibold text-white shadow-[0_10px_25px_rgba(56,189,248,0.45)] transition-colors">
        Download e‑guide
      </button>
      <p className="mt-1 text-[10px] text-slate-400 text-center">
        PDF · Sent instantly to your inbox
      </p>
    </div>
  );
}

function NewsletterCard() {
  return (
    <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-400 rounded-2xl p-4 sm:p-5 md:p-6 text-white shadow-[0_16px_40px_rgba(15,23,42,0.22)]">
      <div className="flex flex-col  items-center justify-between text-center gap-4">
        <div className="space-y-1.5">
          <p className="text-lg tracking-[0.24em] uppercase text-sky-50/90">
            Newsletter
          </p>
          <h3 className="text-base sm:text-lg font-semibold">
            Get one practical app growth idea every two weeks.
          </h3>
          <p className="text-[12px] sm:text-[13px] text-sky-50/90 max-w-md">
            No spam, no generic "inspiration". Just crisp product, UX and
            engineering ideas from apps we've actually shipped.
          </p>
        </div>
        <form className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <input
            type="email"
            placeholder="Your work email"
            className="w-full sm:w-64 rounded-full bg-white/95 px-4 py-2 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-[13px] shadow-xl font-semibold px-4 py-2"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

function WriterCard({ author }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4">
      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-slate-200 overflow-hidden relative">
        {author.profileImage && (
          <Image
            src={author.profileImage}
            alt={author.name}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-900">
          Written by {author.name}
        </p>
        <p className="text-[11px] text-slate-500">{author.role}</p>
        <p className="text-[12px] text-slate-600">{author.bio}</p>
      </div>
    </div>
  );
}


function RelatedPosts({ posts }) {
  if (!posts?.length) return null;
  return (
    <div className="border-t border-slate-200 pt-6 mt-6">
      <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-3">
        Related blog posts
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {posts.map((p) => (
          <BlogCard
            key={p.slug}
            post={p}
            variant="grid"
          />
        ))}
      </div>
    </div>
  );
}



 function ArticleSmileyRating({ onRate }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const current = faces[(hover || rating || 3) - 1]; // default = middle face

  const handleClick = async (val) => {
    setRating(val);
    if (!onRate) return;
    try {
      setSubmitting(true);
      await onRate(val);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`
        bg-gradient-to-r ${current.color} ${current.border}
        rounded-2xl p-6 sm:p-7 text-center shadow-sm
      `}
    >
      {/* Smiley row */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
        {faces.map((face) => {
          const active = face.value <= (hover || rating);
          return (
            <motion.button
              key={face.value}
              type="button"
              onMouseEnter={() => setHover(face.value)}
              onMouseLeave={() => setHover(0)}
              onClick={() => handleClick(face.value)}
              whileHover={{ scale: 1.15, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className={`
                relative flex items-center justify-center
                h-10 w-10 sm:h-11 sm:w-11 rounded-full
                transition-colors duration-200
                ${active ? 'bg-white shadow-md' : 'bg-white/70'}
              `}
            >
              <span
                className={`
                  text-lg sm:text-xl
                  ${active ? '' : 'opacity-70'}
                `}
              >
                {face.emoji}
              </span>
              {active && (
                <motion.span
                  layoutId="smiley-glow"
                  className="pointer-events-none absolute inset-0 rounded-full bg-yellow-300/20 blur-sm"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Texts */}
      <AnimatePresence mode="wait">
        <motion.h3
          key={current.label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="text-lg sm:text-xl font-semibold text-amber-900 mb-1"
        >
          Was this article helpful?
        </motion.h3>
      </AnimatePresence>

      <p className="text-amber-700 text-xs sm:text-sm mb-4">
        Current mood: <span className="font-semibold">{current.label}</span>
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          type="button"
          disabled={!rating || submitting}
          className={`
            px-4 py-2 rounded-full text-xs sm:text-sm font-semibold
            text-white bg-amber-500 hover:bg-amber-600
            disabled:bg-amber-300 disabled:cursor-not-allowed
            transition-colors
          `}
          onClick={() => rating && onRate?.(rating)}
        >
          {submitting ? 'Saving...' : rating ? `Submit ${rating}/5` : 'Pick a face to rate'}
        </button>
        {rating > 0 && (
          <button
            type="button"
            onClick={() => setRating(0)}
            className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border border-amber-300 text-amber-700 hover:bg-amber-100 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
function EngagementBar({ slug, initialLikes = 0, initialShares = 0 }) {
  const [likes, setLikes] = useState(initialLikes);
  const [shares, setShares] = useState(initialShares);
  const [likePending, setLikePending] = useState(false);
  const [sharePending, setSharePending] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (likePending || liked) return;
    try {
      setLikePending(true);
      // Hit like API
      await fetch(`/api/public/blog/${slug}/like`, {
        method: "POST",
      });
      setLikes((prev) => prev + 1);
      setLiked(true);
    } catch (error) {
      console.error("Like failed", error);
    } finally {
      setLikePending(false);
    }
  };

  const handleShare = async (type) => {
    if (sharePending) return;
    try {
      setSharePending(true);
      // Increment share counter in DB
      await fetch(`/api/public/blog/${slug}/share`, {
        method: "POST",
      });
      setShares((prev) => prev + 1);

      const url = typeof window !== "undefined" ? window.location.href : "";
      const text = encodeURIComponent(
        `Check out this article: ${url}`
      );

      if (type === "copy") {
        await navigator.clipboard.writeText(url);
      }
      if (type === "twitter") {
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
      }
      if (type === "linkedin") {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
      }
      if (type === "whatsapp") {
        window.open(`https://wa.me/?text=${text}`, "_blank");
      }
    } catch (error) {
      console.error("Share failed", error);
    } finally {
      setSharePending(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-[12px] text-slate-700">
        <button
          type="button"
          onClick={handleLike}
          disabled={likePending || liked}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border ${
            liked
              ? "bg-rose-500 text-white border-rose-500"
              : "bg-white text-slate-700 border-slate-200 hover:bg-rose-50"
          } disabled:opacity-70`}
        >
          <FaHeart
            className={`h-3.5 w-3.5 ${
              liked ? "text-white" : "text-rose-500"
            }`}
          />
          <span>{likes} like{likes !== 1 ? "s" : ""}</span>
        </button>
        <span className="text-[11px] text-slate-500">
          Thank you for supporting our content.
        </span>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-slate-600">
        <span className="text-slate-500">Share:</span>
        <button
          type="button"
          onClick={() => handleShare("copy")}
          className="h-7 w-7 rounded-full border border-slate-200 flex items-center justify-center bg-white hover:border-sky-300 hover:text-sky-600"
          title="Copy link"
        >
          <FaLink className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => handleShare("twitter")}
          className="h-7 w-7 rounded-full border border-slate-200 flex items-center justify-center bg-white hover:border-sky-300 hover:text-sky-600"
          title="Share on X"
        >
          <FaTwitter className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => handleShare("linkedin")}
          className="h-7 w-7 rounded-full border border-slate-200 flex items-center justify-center bg-white hover:border-sky-300 hover:text-sky-600"
          title="Share on LinkedIn"
        >
          <FaLinkedinIn className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => handleShare("whatsapp")}
          className="h-7 w-7 rounded-full border border-slate-200 flex items-center justify-center bg-white hover:border-sky-300 hover:text-sky-600"
          title="Share on WhatsApp"
        >
          <FaWhatsapp className="h-3.5 w-3.5" />
        </button>
        <span className="ml-1 text-[10px] text-slate-500">
          {shares} share{shares !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}

export default TocAndContentClient;