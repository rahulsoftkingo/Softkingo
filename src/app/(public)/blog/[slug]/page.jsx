// src/app/(public)/blog/[slug]/page.jsx

import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaCalendarAlt, FaEye, FaHeart, FaTag } from "react-icons/fa";
import TocAndContentClient from "./TocAndContentClient";
import prisma from "@/lib/prisma";

// TipTap JSON -> sections[] converter
function mapTipTapToSections(rawJson, fallbackTitle) {
  let doc;
  try {
    doc = typeof rawJson === "string" ? JSON.parse(rawJson) : rawJson;
  } catch {
    return [];
  }

  if (!doc || doc.type !== "doc" || !Array.isArray(doc.content)) return [];

  const sections = [];
  let currentSection = {
    id: "section-1",
    title: fallbackTitle || "Overview",
    blocks: [],
  };
  let sectionIndex = 1;
  let subIndex = 0;

  const pushCurrent = () => {
    if (currentSection.blocks.length) {
      sections.push(currentSection);
    }
  };

  for (const node of doc.content) {
    // H2 => new section
    if (node.type === "heading") {
      const level = node.attrs?.level || 2;
      const text =
        node.content?.map((c) => c.text || "").join(" ").trim() || "";

      if (level === 2) {
        pushCurrent();
        sectionIndex += 1;
        currentSection = {
          id: text
            ? text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
            : `section-${sectionIndex}`,
          title: text || `Section ${sectionIndex}`,
          blocks: [],
        };
        subIndex = 0;
      } else if (level === 3) {
        subIndex += 1;
        currentSection.blocks.push({
          type: "h3",
          text: text || `Subheading ${sectionIndex}.${subIndex}`,
        });
      }
      continue;
    }

    // Paragraph
    if (node.type === "paragraph") {
      const text =
        node.content?.map((c) => c.text || "").join(" ").trim() || "";
      if (!text) continue;
      currentSection.blocks.push({
        type: "p",
        text,
      });
      continue;
    }

    // Bullet list
    if (node.type === "bulletList") {
      const items = [];
      node.content?.forEach((li) => {
        const liText =
          li.content
            ?.flatMap((p) => p.content || [])
            .map((c) => c.text || "")
            .join(" ")
            .trim() || "";
        if (liText) items.push(liText);
      });
      if (items.length) {
        currentSection.blocks.push({
          type: "ul",
          items,
        });
      }
      continue;
    }

    // Ordered list
    if (node.type === "orderedList") {
      const items = [];
      node.content?.forEach((li) => {
        const liText =
          li.content
            ?.flatMap((p) => p.content || [])
            .map((c) => c.text || "")
            .join(" ")
            .trim() || "";
        if (liText) items.push(liText);
      });
      if (items.length) {
        currentSection.blocks.push({
          type: "ol",
          items,
        });
      }
      continue;
    }

    // Table
    if (node.type === "table") {
      const headers = [];
      const rows = [];

      node.content?.forEach((rowNode, rowIdx) => {
        const cells =
          rowNode.content?.map((cell) => {
            const text =
              cell.content
                ?.map((p) =>
                  p.content?.map((c) => c.text || "").join(" ")
                )
                .join(" ")
                .trim() || "";
            return text;
          }) || [];
        if (rowIdx === 0) headers.push(...cells);
        else rows.push(cells);
      });

      if (headers.length && rows.length) {
        currentSection.blocks.push({
          type: "table",
          headers,
          rows,
        });
      }
      continue;
    }
  }

  pushCurrent();
  return sections;
}


export async function generateStaticParams() {
 
  if (!process.env.DATABASE_URL) return [];

  const posts = await prisma.blogPost.findMany({
    where: { status: "published" },
    select: { slug: true },
  });

  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = true;

export default async function BlogSlugPage(props) {
  // Next 15: params is Promise
  const { params } = props;
  const { slug } = await params;

  if (!slug || typeof slug !== "string") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <h1 className="text-xl font-semibold text-slate-900">
            Invalid blog URL
          </h1>
          <p className="text-sm text-slate-500">
            The blog slug is missing or invalid.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-600 text-white text-sm font-semibold hover:bg-sky-500"
          >
            <FaArrowLeft className="h-3 w-3" />
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  // Main post
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      category: true,
      author: true,
      tags: { include: { tag: true } },
    },
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <h1 className="text-xl font-semibold text-slate-900">
            Post not found
          </h1>
          <p className="text-sm text-slate-500">
            This article is not available or has been unpublished.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-600 text-white text-sm font-semibold hover:bg-sky-500"
          >
            <FaArrowLeft className="h-3 w-3" />
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  // Related posts
  const relatedRaw = await prisma.blogPost.findMany({
    where: {
      status: "published",
      slug: { not: post.slug },
      categoryId: post.categoryId || undefined,
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: {
      category: true,
      tags: { include: { tag: true } },
    },
  });

  const related = relatedRaw.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    category: p.category?.name || "",
    publishedAt: p.publishedAt?.toISOString() || "",
    thumbnail: p.thumbnail || "/images/insights/launch-thumb.png",
    tags: p.tags.map((t) => t.tag.name),
    readingTime: p.readTimeMinutes || 8,
    viewCount: p.viewCount || 0,
    likeCount: p.likeCount || 0,
  }));

  // TipTap -> sections
  let sections = [];
  if (post.contentJson) {
    sections = mapTipTapToSections(post.contentJson, post.title);
  }

  if (!Array.isArray(sections) || !sections.length) {
    sections = [
      {
        id: "content",
        title: post.title,
        blocks: [
          {
            type: "p",
            text: post.excerpt || "",
          },
        ],
      },
    ];
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const heroImage =
    post.heroImage ||
    post.thumbnail ||
    "/images/insights/launch-thumb.png";

  const thumbnail =
    post.thumbnail || heroImage;

  const tags = post.tags.map((t) => t.tag.name);
  const readingTime = post.readTimeMinutes || 8;
  const categoryLabel = post.category?.name || "Insights";

  const fullPost = {
    slug: post.slug,
    title: post.title,
    category: categoryLabel,
    excerpt: post.excerpt || "",
    thumbnail,
    heroImage,
    publishedAt: post.publishedAt
      ? post.publishedAt.toISOString()
      : new Date().toISOString(),
    readingTime,
    tags,
    sections,
    viewCount: post.viewCount || 0,
    likeCount: post.likeCount || 0,
      shareCount: post.shareCount || 0,

    author: post.author
      ? {
          name: post.author.name || post.author.username,
          role: post.author.title || "Softkingo Team",
          avatar: post.author.profileImage || "/images/avatars/avatar-1.png",
          bio: post.author.bio || "",
        }
      : null,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <header className="relative border-b border-slate-200">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={heroImage}
            alt={post.title}
            fill
            priority
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-slate-900/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-9 sm:pt-5 sm:pb-12">
          <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-200 hover:text-sky-300"
            >
              <FaArrowLeft className="h-3 w-3" />
              Back to blog
            </Link>
            {formattedDate && (
              <span className="text-[11px] sm:text-xs text-slate-300">
                Updated · {formattedDate}
              </span>
            )}
          </div>

          <nav
            className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-300 mb-3"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-sky-300">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-sky-300">
              Blog
            </Link>
            <span>/</span>
            <span className="text-sky-400 line-clamp-1">
              {post.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1.1fr)] gap-6 lg:gap-10 items-center">
            <div className="space-y-3 sm:space-y-4">
              <span className="inline-flex items-center rounded-full bg-sky-500/15 px-3 py-1 text-[11px] font-semibold text-sky-100 border border-sky-400/50">
                {categoryLabel}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-sm sm:text-base text-slate-100/90 max-w-xl">
                  {post.excerpt}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3 text-[11px] sm:text-xs text-slate-200/90">
                {formattedDate && (
                  <span className="inline-flex items-center gap-1.5">
                    <FaCalendarAlt className="h-3 w-3" />
                    <span>{formattedDate}</span>
                  </span>
                )}
                <span>{readingTime} min read</span>

                {typeof fullPost.viewCount === "number" && (
  <span className="inline-flex items-center gap-1">
    <FaEye className="h-3 w-3 text-slate-400" />
    <span>{fullPost.viewCount}</span>
  </span>
)}
{typeof fullPost.likeCount === "number" && (
  <span className="inline-flex items-center gap-1">
    <FaHeart className="h-3 w-3 text-rose-400" />
    <span>{fullPost.likeCount}</span>
  </span>
)}

                {tags.length ? (
                  <span className="inline-flex items-center gap-1.5">
                    <FaTag className="h-3 w-3" />
                    <span className="flex flex-wrap gap-1">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-full bg-slate-900/60 text-[10px] text-sky-50 border border-sky-500/50"
                        >
                          #{t}
                        </span>
                      ))}
                    </span>
                  </span>
                ) : null}
              </div>

              {/* Search box inside hero */}
              <form
                action="/blog"
                className="pt-2 max-w-md"
              >
                <div className="relative">
                  <input
                    type="search"
                    name="q"
                    placeholder="Search other blog posts..."
                    className="w-full px-3 py-2.5 rounded-full bg-slate-900/70 border border-slate-400 text-xs sm:text-sm text-slate-50 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
                  />
                </div>
              </form>
            </div>

            <div className="relative h-40 sm:h-52 md:h-90 lg:h-60 rounded-2xl overflow-hidden shadow-xl bg-slate-900/40 border border-slate-800/60">
              <Image
                src={thumbnail}
                alt={post.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 via-transparent to-sky-500/20" />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN layout handled in client subcomponent */}
      <TocAndContentClient post={fullPost} related={related} />
    </div>
  );
}
