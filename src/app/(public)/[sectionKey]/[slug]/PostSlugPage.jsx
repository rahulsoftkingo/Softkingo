// src/app/(public)/blog/PostSlugPage.jsx
import prisma from "@/lib/prisma";
import { BLOG_SECTIONS } from "@/app/(public)/[sectionKey]/sectionConfig";
import TocAndContentClient from "@/app/(public)/[sectionKey]/[slug]/TocAndContentClient";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import PostSocialBar from "@/app/(public)/blog/PostSocialBar";
import InquirySection from "@/components/footer/InquirySection";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }) {
  const { sectionKey, slug } = await params;
  const config = BLOG_SECTIONS[sectionKey];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.softkingo.com';
  // Post fetch karo metadata ke liye
  const post = await prisma.blogPost.findFirst({
    where: {
      slug,
      status: "published",
    },
    select: {
      title: true,
      seoTitle: true,
      seoDescription: true,
      excerpt: true,
      thumbnail: true,
      publishedAt: true,
      author: { select: { name: true } }
    }
  });

  if (!post) return { title: "Post Not Found" };

  const finalTitle = post.seoTitle || post.title;
  const finalDesc = post.seoDescription || post.excerpt || "";
  const finalImage = post.thumbnail || config?.heroBg || "/og-default.jpg";

  return {
    title: finalTitle,
    description: finalDesc,
    alternates: {
      canonical: `${baseUrl}/${sectionKey}/${slug}`,
    },
    openGraph: {
      title: finalTitle,
      description: finalDesc,
      url: `${baseUrl}/${sectionKey}/${slug}`,
      siteName: 'Softkingo',
      images: [{ url: finalImage, width: 1200, height: 630 }],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author?.name || 'Softkingo'],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDesc,
      images: [finalImage],
    },
  };
}
function safeImg(src, fallback = "/images/insights/hero-default.png") {
  const s = (src || "").toString().trim();
  if (!s) return fallback;
  if (s.startsWith("/")) return s;
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  return fallback;
}

// (same mapTipTapToSections as you already have)
function mapTipTapToSections(rawJson, fallbackTitle, fallbackExcerpt) {
  let doc;
  try {
    doc = typeof rawJson === "string" ? JSON.parse(rawJson) : rawJson;
  } catch {
    return [];
  }
  if (!doc || doc.type !== "doc" || !Array.isArray(doc.content)) return [];

  const sections = [];
  let sectionIndex = 1;
  let subIndex = 0;

  let currentSection = { id: "section-1", title: fallbackTitle || "Overview", blocks: [] };

  const pushCurrent = () => {
    if (currentSection.blocks.length) sections.push(currentSection);
  };

  for (const node of doc.content) {
    if (node.type === "heading") {
      const level = node.attrs?.level || 2;
      const text = node.content?.map((c) => c.text).join("").trim();

      if (level === 2) {
        pushCurrent();
        sectionIndex += 1;
        currentSection = {
          id:
            text
              ?.toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "") || `section-${sectionIndex}`,
          title: text || `Section ${sectionIndex}`,
          blocks: [],
        };
        subIndex = 0;
        continue;
      }

      if (level === 3) {
        subIndex += 1;
        currentSection.blocks.push({ type: "h3", text: text || `Subheading ${sectionIndex}.${subIndex}` });
        continue;
      }
    }

    if (node.type === "paragraph") {
      const text = node.content?.map((c) => c.text).join("").trim();
      if (!text) continue;
      currentSection.blocks.push({ type: "p", text });
      continue;
    }

    if (node.type === "bulletList") {
      const items = [];
      node.content?.forEach((li) => {
        const liText = li.content
          ?.flatMap((p) => p.content || [])
          .map((c) => c.text)
          .join("")
          .trim();
        if (liText) items.push(liText);
      });
      if (items.length) currentSection.blocks.push({ type: "ul", items });
      continue;
    }

    if (node.type === "orderedList") {
      const items = [];
      node.content?.forEach((li) => {
        const liText = li.content
          ?.flatMap((p) => p.content || [])
          .map((c) => c.text)
          .join("")
          .trim();
        if (liText) items.push(liText);
      });
      if (items.length) currentSection.blocks.push({ type: "ol", items });
      continue;
    }

    if (node.type === "table") {
      const headers = [];
      const rows = [];
      node.content?.forEach((rowNode, rowIdx) => {
        const cells =
          rowNode.content?.map((cell) => {
            const text = cell.content
              ?.map((p) => (p.content || []).map((c) => c.text).join(""))
              .join("")
              .trim();
            return text;
          }) || [];
        if (rowIdx === 0) headers.push(...cells);
        else rows.push(cells);
      });
      if (headers.length && rows.length) currentSection.blocks.push({ type: "table", headers, rows });
      continue;
    }

    if (node.type === "summaryBlock") {
      const text = node.content?.map((c) => c.text).join("").trim();
      if (text) currentSection.blocks.push({ type: "summary", text });
      continue;
    }

    if (node.type === "blogCTA") {
      currentSection.blocks.push({
        type: "cta",
        title: node.attrs?.title,
        description: node.attrs?.description,
        buttonText: node.attrs?.buttonText,
        buttonLink: node.attrs?.buttonLink,
        image: node.attrs?.image,
        variant: node.attrs?.variant,
      });
      continue;
    }
  }

  pushCurrent();

  if (!sections.length) {
    return [
      {
        id: "content",
        title: fallbackTitle || "Overview",
        blocks: fallbackExcerpt ? [{ type: "p", text: fallbackExcerpt }] : [],
      },
    ];
  }

  return sections;
}

export default async function PostSlugPage({ sectionKey, slug }) {
  const config = BLOG_SECTIONS[sectionKey];

  if (!config) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-sm text-slate-600">Section not found.</p>
      </div>
    );
  }

  const placementNeedle = `"${sectionKey}"`;
  const typeNeedles = config.types?.length ? config.types.map((t) => `"${t}"`) : [];

  const post = await prisma.blogPost.findFirst({
    where: {
      slug,
      status: "published",
      OR: [
        { placements: { contains: placementNeedle } },
        ...typeNeedles.map((needle) => ({ placements: { contains: needle } })),
        ...(config.types?.length ? [{ placements: null, type: { in: config.types } }] : []),
      ],
    },
    include: { category: true, author: true, tags: { include: { tag: true } } },
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-sm text-slate-600">Article not found.</p>
      </div>
    );
  }

  const related = await prisma.blogPost.findMany({
    where: {
      status: "published",
      id: { not: post.id },
      ...(post.categoryId ? { categoryId: post.categoryId } : {}),
      OR: [
        { placements: { contains: placementNeedle } },
        ...typeNeedles.map((needle) => ({ placements: { contains: needle } })),
        ...(config.types?.length ? [{ placements: null, type: { in: config.types } }] : []),
      ],
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: { category: true, tags: { include: { tag: true } } },
  });

  const sections = mapTipTapToSections(post.contentJson, post.title, post.excerpt || "");
  const heroImage = safeImg(post.thumbnail, "/images/insights/hero-default.png");

  const fullPost = {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    category: post.category?.name || config.title,
    tags: post.tags.map((t) => t.tag.name),
    thumbnail: safeImg(post.thumbnail, "/images/insights/hero-default.png"),
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : new Date().toISOString(),
    readingTime: post.readTimeMinutes || 8,
    sections,
    likeCount: post.likeCount || 0,
    shareCount: post.shareCount || 0,
    viewCount: post.viewCount || 0,
    author: post.author
      ? {
        name: post.author.name || "",
        role: post.author.title || "",
        bio: post.author.bio || "",
        avatar: safeImg(post.author.profileImage, "/images/insights/hero-default.png"),
      }
      : null,
  };

  const relatedNormalized = related.map((p) => ({
    href: `${config.slugBase}/${p.slug}`,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    category: p.category?.name || config.title,
    tags: p.tags.map((t) => t.tag.name),
    thumbnail: safeImg(p.thumbnail, "/images/insights/hero-default.png"),
    publishedAt: p.publishedAt?.toISOString() || "",
    readingTime: p.readTimeMinutes || 8,
  }));

  const formattedDate = fullPost.publishedAt
    ? new Date(fullPost.publishedAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    : "";

  const listMeta = config.newsletterList || {
    name: "Blog Newsletter",
    slug: "blog-newsletter",
    description: "Main blog newsletter list",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="relative border-b border-slate-200">
        <div className="absolute inset-0 overflow-hidden">
          <Image src={config.heroBg} alt={fullPost.title} fill priority className="object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-slate-900/60 to-slate-900/10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 sm:pt-8 sm:pb-14">
          {/* ✅ FIXED breadcrumb (slug/title no longer missing) */}
          <div className="flex items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
            <div className="space-y-2">
              <Link
                href={config.slugBase}
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-200 hover:text-sky-300"
              >
                <FaArrowLeft className="h-3 w-3" />
                Back to {config.title.toLowerCase()}
              </Link>

              <nav className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-slate-200">
                <Link href="/" className="hover:text-sky-300">Home</Link>
                <span>/</span>
                <Link href={config.slugBase} className="hover:text-sky-300">
                  {config.title}
                </Link>
                <span>/</span>
                <span className="text-sky-300 font-medium line-clamp-1">
                  {fullPost.title}
                </span>
              </nav>
            </div>

            {formattedDate ? (
              <span className="text-[11px] sm:text-xs text-slate-300 whitespace-nowrap">
                Updated {formattedDate}
              </span>
            ) : null}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1.1fr)] gap-6 lg:gap-10 items-center">
            <div className="space-y-3 sm:space-y-4">
              <span className="inline-flex items-center rounded-full bg-sky-500/15 px-3 py-1 text-[11px] font-semibold text-sky-100 border border-sky-400/50">
                {fullPost.category}
              </span>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight">
                {fullPost.title}
              </h1>

              {fullPost.excerpt ? (
                <p className="text-sm sm:text-base text-slate-100/90 max-w-xl">
                  {fullPost.excerpt}
                </p>
              ) : null}

              {/* ✅ subtitle ke niche left counts + like button */}
              <PostSocialBar
                slug={fullPost.slug}
                initialViewCount={fullPost.viewCount}
                initialLikeCount={fullPost.likeCount}
                initialShareCount={fullPost.shareCount}
              />
            </div>

            <div className="relative h-40 sm:h-52 md:h-60 lg:h-60 rounded-2xl overflow-hidden shadow-xl bg-slate-900/40 border border-slate-800/60">
              <Image src={heroImage} alt={fullPost.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 via-transparent to-sky-500/20" />
            </div>
          </div>
        </div>
      </header>

      <TocAndContentClient
        post={fullPost}
        related={relatedNormalized}
        sectionKey={sectionKey}
        newsletterList={listMeta}
      />
      <InquirySection />
    </div>
  );
}
