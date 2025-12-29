
// src/app/(public)/home/blogs/page.jsx
import prisma from "@/lib/prisma";
import BlogSliderClient from "@/app/(public)/home/blogs/BlogSliderClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BlogSectionServer() {
  const blogs = await prisma.blogPost.findMany({
    where: {
      status: "published",
      type: "blog",
      featured: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: 6,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      thumbnail: true,
      publishedAt: true,
      readTimeMinutes: true,
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  // Helper function to transform blog data
  const transformBlog = (blog) => ({
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    description: blog.excerpt || "Discover insights and best practices...",
    image: blog.thumbnail || "/images/blog-placeholder.png", // ✅ Local fallback
    date: blog.publishedAt
      ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Recently",
    readTime: blog.readTimeMinutes
      ? `${blog.readTimeMinutes} min read`
      : "5 min read",
    category: blog.category?.name || "General",
    categorySlug: blog.category?.slug || "",
    author: blog.author?.name || "Softkingo Team",
  });

  let transformedBlogs = blogs.map(transformBlog);

  // If no featured posts, get latest 6 posts
  if (transformedBlogs.length === 0) {
    const latestBlogs = await prisma.blogPost.findMany({
      where: {
        status: "published",
        type: "blog",
      },
      orderBy: {
        publishedAt: "desc",
      },
      take: 6,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        thumbnail: true,
        publishedAt: true,
        readTimeMinutes: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    transformedBlogs = latestBlogs.map(transformBlog);
  }

  return <BlogSliderClient blogs={transformedBlogs} />;
}
