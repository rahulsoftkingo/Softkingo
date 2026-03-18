// src/app/(public)/blog/page.jsx
import Link from "next/link";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import prisma from "@/lib/prisma";
import { BLOG_SECTIONS } from "@/app/(public)/[sectionKey]/sectionConfig";
import BlogCard from "@/app/(public)/blog/BlogCard";
import NewsletterStrip from "@/app/(public)/blog/NewsletterStrip";
import LeadForm from "@/components/public/LeadForm";
import LatestEbookPromoCardClient from "@/components/public/LatestEbookPromoCardClient";
import NewsletterSidebarCard from "@/components/public/NewsletterSidebarCard";
import InquirySection from "@/components/footer/InquirySection";

export const dynamic = "force-dynamic";

const CONFIG = BLOG_SECTIONS.blog;
const HERO_BG = CONFIG.heroBg;
const FALLBACK_THUMB = "/images/insights/hero-default.png";

function safeImg(src, fallback = FALLBACK_THUMB) {
  const s = (src || "").toString().trim();
  if (!s) return fallback;
  if (s.startsWith("/")) return s;
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  return fallback;
}

async function fetchPostsByCategory(categorySlug, take = 4) {
  return prisma.blogPost.findMany({
    where: {
      status: "published",
      category: { slug: categorySlug }
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take,
    include: { category: true, tags: { include: { tag: true } } },
  });
}

export default async function BlogListPage(props) {
  const searchParams = await props.searchParams;
  const q = (searchParams?.q || "").toString().trim();

  const [
    ebooks,
    featuredPosts,
    allLatestPosts,
    categoriesWithCounts,
    allCategories
  ] = await Promise.all([
    prisma.ebook.findMany({
      where: { status: "published" },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 6,
    }),
    prisma.blogPost.findMany({
      where: { status: "published", featured: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 4,
      include: { category: true, tags: { include: { tag: true } } },
    }),
    prisma.blogPost.findMany({
      where: { status: "published" },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 10,
      include: { category: true, tags: { include: { tag: true } } },
    }),
    prisma.blogCategory.findMany({
      include: {
        _count: {
          select: { posts: { where: { status: "published" } } }
        }
      }
    }),
    prisma.blogCategory.findMany({ take: 15 })
  ]);

  // Sort categories by post count desc
  const sortedCategories = categoriesWithCounts
    .filter(cat => cat._count.posts > 0)
    .sort((a, b) => b._count.posts - a._count.posts)
    .slice(0, 10);

  // Fetch posts for each category
  const categoriesWithPosts = await Promise.all(
    sortedCategories.map(async (cat) => {
      const posts = await prisma.blogPost.findMany({
        where: { status: "published", categoryId: cat.id },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        take: 4,
        include: { category: true }
      });
      return { ...cat, posts };
    })
  );

  const topStory = allLatestPosts[0];
  const gridPosts = allLatestPosts.slice(1, 5);

  const normalizedEbooks = ebooks.map(e => ({
    ...e,
    thumbnail: safeImg(e.coverImage),
    href: `/ebooks/${e.slug}`
  }));

  const normalizedFeatured = featuredPosts.map(p => ({
    ...p,
    thumbnail: safeImg(p.thumbnail),
    href: `/blog/${p.slug}`,
    category: p.category?.name || "Blog"
  }));

  const normalizedTopStory = topStory ? {
    ...topStory,
    thumbnail: safeImg(topStory.thumbnail),
    href: `/blog/${topStory.slug}`,
    category: topStory.category?.name || "Blog"
  } : null;

  const normalizedGridPosts = gridPosts.map(p => ({
    ...p,
    thumbnail: safeImg(p.thumbnail),
    href: `/blog/${p.slug}`,
    category: p.category?.name || "Blog",
    tags: p.tags?.map(t => t.tag.name) || []
  }));

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* HERO */}
      <header className="relative border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={safeImg(HERO_BG)} alt="Blog" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-900/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-10 sm:pt-10 sm:pb-14 text-white">
          <nav className="flex items-center gap-2 text-[11px] sm:text-xs text-white/70 mb-4">
            <Link href="/" className="hover:text-sky-300 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-sky-300 font-medium">Blog</span>
          </nav>

          <div className="max-w-2xl space-y-4">
            <p className="text-[11px] sm:text-xs tracking-[0.24em] uppercase text-sky-400 font-bold">
              {CONFIG.heroLabel}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.2]">
              {CONFIG.heroHeading}
            </h1>
            <p className="text-sm sm:text-base text-white/85 max-w-xl">
              {CONFIG.heroSub}
            </p>

            <form action="/blog" className="mt-2 flex flex-col sm:flex-row gap-2 max-w-md">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FaSearch className="h-3.5 w-3.5 text-white/60" />
                </div>
                <input
                  type="search"
                  name="q"
                  defaultValue={q}
                  placeholder="Search articles..."
                  className="w-full pl-9 pr-3 py-3 rounded-full bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 backdrop-blur-sm"
                />
              </div>
            </form>

            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
              <span className="text-[11px] text-white/60 shrink-0">Tags:</span>
              {allCategories.map(cat => (
                <Link
                  key={cat.id}
                  href={`/blog/category/${cat.slug}`}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-[10px] whitespace-nowrap transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* BODY */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">

        {/* E‑books (Top Section) */}
        <ContentRow title="E‑books" subtitle="Downloadable playbooks" viewAllHref="/ebooks">
          {normalizedEbooks.map(eb => (
            <EbookCard key={eb.id} ebook={eb} />
          ))}
        </ContentRow>

        {/* letest Posts Carousel (Section 1) */}
        <section className="space-y-4">

          <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
            {normalizedFeatured.map(post => (
              <PostSmallCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Top Story + Lead Form (Section 2) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8">
            {normalizedTopStory && (
              <Link href={normalizedTopStory.href} className="h-full flex flex-col bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden group relative">
                <div className="relative h-[400px] sm:h-[500px]">
                  <Image src={normalizedTopStory.thumbnail} alt={normalizedTopStory.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="bg-sky-600 text-white px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-lg">
                      Latest Blog
                    </span>
                    <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white leading-tight">
                      {normalizedTopStory.title}
                    </h2>
                    <p className="mt-3 text-white/80 text-base line-clamp-2 max-w-2xl">
                      {normalizedTopStory.excerpt}
                    </p>
                    <div className="mt-6 inline-flex items-center text-sky-400 font-bold text-sm group-hover:translate-x-2 transition-transform">
                      Read Full Story <FaSearch className="ml-2 h-3 w-3" />
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div className="lg:col-span-4">
            <LeadForm
              variant="solid"
              showLogo={true}
              title="Consult with Experts"
              subtitle="Get custom solutions for your business"
              formKey="blog-list-sidebar"
            />
          </div>
        </section>

        {/* Recent Grid (Section 3) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {normalizedGridPosts.map(post => (
            <BlogCard key={post.id} post={post} variant="grid" />
          ))}
        </section>


        {/* DYNAMIC CATEGORY SECTIONS */}
        {categoriesWithPosts.map((cat, index) => {
          const isHorizontalRow = index % 2 === 0;
          const isNewsletterSidebar = index % 4 === 0;

          if (isHorizontalRow) {
            return (
              <section key={cat.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-sky-50/50p-6sm:p-10rounded-[2.5rem]">
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h2 className="text-xl font-bold text-slate-900 border-l-4 border-sky-600 pl-4 uppercase tracking-tighter">{cat.name}</h2>
                    <Link href={`/blog/category/${cat.slug}`} className="text-sky-600 text-sm font-semibold hover:underline">See more articles →</Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cat.posts.slice(0, 2).map(p => (
                      <PostHorizontalCard key={p.id} post={{ ...p, thumbnail: safeImg(p.thumbnail), href: `/blog/${p.slug}`, category: cat.name }} />
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cat.posts.slice(2, 4).map(p => (
                      <PostHorizontalCard key={p.id} post={{ ...p, thumbnail: safeImg(p.thumbnail), href: `/blog/${p.slug}`, category: cat.name }} />
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-4">
                  {isNewsletterSidebar ? (
                    <NewsletterSidebarCard />
                  ) : (
                    <LatestEbookPromoCardClient />
                  )}
                </div>
              </section>
            );
          } else {
            return (
              <section key={cat.id} className="space-y-8">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h2 className="text-xl font-bold text-slate-900 border-l-4 border-rose-500 pl-4 uppercase tracking-tighter">{cat.name}</h2>
                  <Link href={`/blog/category/${cat.slug}`} className="text-sky-600 text-sm font-semibold hover:underline">See more {cat.name} articles →</Link>
                </div>
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {cat.posts.map(p => (
                    <BlogCard key={p.id} post={{ ...p, thumbnail: safeImg(p.thumbnail), href: `/blog/${p.slug}`, category: cat.name }} variant="grid" />
                  ))}
                </div> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cat.posts.slice(0, 2).map(p => (
                    <PostHorizontalCard key={p.id} post={{ ...p, thumbnail: safeImg(p.thumbnail), href: `/blog/${p.slug}`, category: cat.name }} />
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cat.posts.slice(2, 4).map(p => (
                    <PostHorizontalCard key={p.id} post={{ ...p, thumbnail: safeImg(p.thumbnail), href: `/blog/${p.slug}`, category: cat.name }} />
                  ))}
                </div>
              </section>
            );
          }
        })}

        {/* Closing Newsletter Strip (Section 8 - Constant) */}
        <section className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-slate-950">
            <Image src="/images/insights/hero-insights.jpg" alt="Newsletter" fill className="object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          </div>
          <div className="relative p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Make smart <span className="text-rose-500">decisions</span> with deep insights.
              </h2>
              <p className="text-slate-300 text-lg">Subscribe to our CEO’s Newsletter</p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input type="email" placeholder="Enter your email" className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-rose-500" />
                <button className="bg-white text-slate-950 font-bold px-8 py-3 rounded-xl hover:bg-slate-100 transition-colors uppercase text-sm">Subscribe</button>
              </form>
              <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span>✓ 200+ companies leads</span>
                <span>✓ 74% higher success</span>
                <span>✓ 2 days average</span>
              </div>
            </div>
            <div className="hidden lg:block relative h-[300px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute w-[200px] h-[300px] bg-sky-600/20 rounded-3xl blur-3xl -z-10 animate-pulse" />
                  <Image src="/images/logo.png" alt="Newsletter Visual" width={200} height={200} className="object-contain" />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <InquirySection />
    </div>
  );
}

/* ---------- Sub-components ---------- */

function PostSmallCard({ post }) {
  return (
    <Link href={post.href} className="snap-start shrink-0 w-[240px] sm:w-[280px] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative h-32 bg-slate-100">
        <Image src={post.thumbnail} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] font-bold bg-sky-600 text-white shadow-sm uppercase tracking-wide">
          {post.category}
        </span>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-sky-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-sky-600 text-[11px] font-bold">Read details →</p>
      </div>
    </Link>
  );
}

function PostHorizontalCard({ post }) {
  return (
    <Link href={post.href} className="flex gap-4 p-2 bg-white rounded-2xl border border-slate-100 hover:border-sky-200 hover:shadow-md transition-all group">
      <div className="relative w-50 h-24 sm:w-52 sm:h-28 shrink-0 rounded-xl overflow-hidden shadow-inner bg-slate-100">
        <Image src={post.thumbnail} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
      </div>
      <div className="flex flex-col justify-center gap-1.5 min-w-0">
        <span className="text-sky-600 text-[10px] font-bold uppercase tracking-wider">{post.category}</span>
        <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-sky-700">
          {post.title}
        </h3>
        {post.excerpt && <p className="text-[11px] text-slate-500 line-clamp-1">{post.excerpt}</p>}
        <p className="text-[11px] text-sky-600 font-bold mt-1">Read article →</p>
      </div>
    </Link>
  );
}

function ContentRow({ title, subtitle, viewAllHref, children }) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3 border-b border-slate-200 pb-2">
        <div className="border-l-4 border-sky-600 pl-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-sky-600 font-bold">
            {title}
          </p>
          <p className="text-base font-bold text-slate-900">
            {subtitle}
          </p>
        </div>

        <Link href={viewAllHref} className="text-[12px] font-bold text-sky-600 hover:text-sky-700 hover:underline">
          View all →
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
        {children}
      </div>
    </section>
  );
}

function EbookCard({ ebook }) {
  return (
    <Link
      href={ebook.href}
      className="snap-start shrink-0 w-[240px] sm:w-[320px] rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="p-4 flex items-start gap-4">
        <div className="relative h-32 w-20 flex-none overflow-hidden rounded-lg shadow-md">
          <Image src={ebook.thumbnail} alt={ebook.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        <div className="min-w-0 flex flex-col h-32 justify-between py-1">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200 text-[9px] font-bold uppercase tracking-wider">
                E‑book
              </span>
            </div>
            <p className="text-sm font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-sky-600">
              {ebook.title}
            </p>
            <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">
              {ebook.summary || ebook.description}
            </p>
          </div>
          <p className="text-[11px] text-sky-600 font-bold">
            Read guide →
          </p>
        </div>
      </div>
    </Link>
  );
}
