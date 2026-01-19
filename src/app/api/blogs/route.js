// app/api/blogs/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type') || 'blog';
    const featured = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit')) || 6;

    const whereClause = {
        status: "published",
        type: type
    };

    if (category) whereClause.category = { slug: category };
    if (featured) whereClause.featured = true;

    try {
        const blogs = await prisma.blogPost.findMany({
            where: whereClause,
            orderBy: { publishedAt: "desc" },
            take: limit,
            select: {
                id: true, title: true, slug: true, excerpt: true, thumbnail: true,
                publishedAt: true, readTimeMinutes: true,
                category: { select: { name: true, slug: true } },
                author: { select: { name: true } }
            }
        });
        const transformedBlogs = blogs.map(blog => ({
            ...blog,
            category: blog.category?.name || 'General',  // ✅ String bana do
            date: blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                year: "numeric", month: "short", day: "numeric"
            }) : "Recently",
            readTime: blog.readTimeMinutes ? `${blog.readTimeMinutes} min read` : "5 min read"
        }));


        return NextResponse.json(blogs);
    } catch (error) {
        return NextResponse.json([], { status: 500 });
    }
}
