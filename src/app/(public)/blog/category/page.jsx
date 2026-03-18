// // src/app/(public)/blog/catogary/page
"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * Blog listing client page
 * - Fetches from GET /api/blogs (you should provide an API that returns JSON array of posts)
 * - Supports search, category filter and "Load more"
 * - Uses Tailwind classes (assumes Tailwind is setup in the project)
 *
 * Expected API shape per post:
 * {
 *   id, title, slug, excerpt, featured_image, created_at, category: { name, slug }
 * }
 */

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [pageSize] = useState(6);
  const [page, setPage] = useState(1);
  const scrollRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        // Replace this endpoint if your API is different
        const res = await fetch("/api/blogs/public");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        if (!mounted) return;
        setPosts(data || []);
        setFiltered(data || []);

        // build categories list
        const cats = Array.from(new Map((data || []).map((p) => [p.category?.slug || "__none__", p.category || { name: "Uncategorized", slug: "" }])).values());
        setCategories(cats.filter((c) => c && c.name));
      } catch (err) {
        console.error(err);
        setPosts([]);
        setFiltered([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    // Apply search + category filter
    let out = posts.slice();

    if (activeCategory) {
      out = out.filter((p) => (p.category?.slug || "") === activeCategory);
    }

    if (search && search.trim().length > 0) {
      const q = search.trim().toLowerCase();
      out = out.filter(
        (p) =>
          (p.title || "").toLowerCase().includes(q) ||
          (p.excerpt || "").toLowerCase().includes(q) ||
          (p.category?.name || "").toLowerCase().includes(q)
      );
    }

    setFiltered(out);
    setPage(1); // reset paginator when filters change
  }, [posts, search, activeCategory]);

  const visiblePosts = filtered.slice(0, page * pageSize);

  const onLoadMore = () => {
    setPage((p) => p + 1);
    // scroll to newly loaded section
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <header className="bg-gradient-to-r from-sky-600 to-sky-400 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">Insights</h1>
          <p className="mt-2 text-sky-100 max-w-2xl">Latest articles, tutorials and updates from our team.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search posts, categories or excerpts..."
                className="w-full md:w-96 px-4 py-2 rounded-lg border border-gray-200 shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto py-1">
            <button
              onClick={() => setActiveCategory("")}
              className={`px-3 py-1 rounded-full text-sm font-medium ${activeCategory === "" ? "bg-sky-600 text-white" : "bg-gray-100 text-gray-800"}`}
            >
              All
            </button>

            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActiveCategory(c.slug)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${activeCategory === c.slug ? "bg-sky-600 text-white" : "bg-gray-100 text-gray-800"}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Posts grid */}
        <div ref={scrollRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-2xl shadow p-4 h-64" />
          ))}

          {!loading && visiblePosts.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-20">
              No posts found.
            </div>
          )}

          {!loading && visiblePosts.map((post) => {
            const img = post.featured_image ? (post.featured_image.startsWith("http") ? post.featured_image : `/${post.featured_image}`) : null;
            const date = post.created_at ? new Date(post.created_at).toLocaleDateString() : "";

            return (
              <article key={post.id} className="bg-white rounded-2xl shadow hover:shadow-xl transition-shadow overflow-hidden">
                <div className="h-48 relative bg-gray-100">
                  {img ? (
                    <Image src={img} alt={post.title} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">No image</div>
                  )}
                </div>

                <div className="p-6">
                  <Link href={`/blog/${post.slug}`} className="text-lg font-semibold text-gray-900 hover:text-sky-600">
                    {post.title}
                  </Link>

                  <p className="mt-3 text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>

                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">{post.category?.name || "Uncategorized"}</span>
                      <span>{date}</span>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="text-sky-600 font-medium">Read</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Load more */}
        <div className="mt-8 flex justify-center">
          {visiblePosts.length < filtered.length && (
            <button onClick={onLoadMore} className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700">Load more</button>
          )}
        </div>
      </main>

    
    </div>
  );
}
