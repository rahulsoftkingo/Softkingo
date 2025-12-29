// // src/app/(public)/blog/page.jsx

// import Link from "next/link";
// import Image from "next/image";
// import { FaSearch } from "react-icons/fa";
// import prisma from "@/lib/prisma";
// // import BlogCard from "@/components/blog/BlogCard";
// import BlogCard from "@/app/(public)/blog/BlogCard";

// const heroBg = "/images/career/r1.png";

// export const dynamic = "force-dynamic";

// export default async function BlogPage( props ) {
//    const searchParams = await props.searchParams;
//   const q = (searchParams?.q || "").toString().trim();
//   const category = (searchParams?.category || "").toString().trim();

  
// const posts = await prisma.blogPost.findMany({
//   where: {
//     status: 'published',
//     type: 'blog',
//     ...(q
//       ? {
//           OR: [
//             { title: { contains: q } },
//             { excerpt: { contains: q } },
//           ],
//         }
//       : {}),
//     ...(category
//       ? {
//           category: {
//             slug: category,
//           },
//         }
//       : {}),
//   },
//   orderBy: {
//     publishedAt: 'desc',
//   },
//   include: {
//     category: true,
//     tags: {
//       include: { tag: true },
//     },
//   },
// });

//   const latest = [...posts];
//   const featured = latest[0] || null;
//   const mostRead = latest.slice(0, 3);

//   // Unique category topics
//   const topicsSet = new Set(
//     posts.map((p) => p.category?.name).filter(Boolean)
//   );
//   const topics = Array.from(topicsSet);

//   // Normalize posts for BlogCard
//   const normalizedPosts = posts.map((p) => ({
//     slug: p.slug,
//     title: p.title,
//     excerpt: p.excerpt || "",
//     category: p.category?.name || "Insights",
//     tags: p.tags.map((t) => t.tag.name),
//     thumbnail: p.thumbnail || "/images/insights/launch-thumb.png",
//     publishedAt: p.publishedAt?.toISOString() || "",
//     readingTime: p.readTimeMinutes || 8,
//   }));

//   const normalizedFeatured =
//     featured &&
//     normalizedPosts.find((p) => p.slug === featured.slug);

//   const normalizedMostRead = mostRead
//     .map((m) => normalizedPosts.find((p) => p.slug === m.slug))
//     .filter(Boolean);

//   const totalCount = posts.length;

//   // Helper to build URL with search + category
//   const buildUrl = (nextQ, nextCategory) => {
//     const params = new URLSearchParams();
//     if (nextQ) params.set("q", nextQ);
//     if (nextCategory) params.set("category", nextCategory);
//     const query = params.toString();
//     return query ? `/blog?${query}` : "/blog";
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* HERO */}
//       <header className="relative border-b border-slate-200">
//         <div className="absolute inset-0 overflow-hidden">
//           <Image
//             src={heroBg}
//             alt="Softkingo Blog"
//             fill
//             priority
//             className="object-cover opacity-70"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-slate-900/60 to-slate-900/10" />
//         </div>

//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 sm:pt-8 sm:pb-14 text-slate-50">
//           <nav
//             className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-200 mb-4"
//             aria-label="Breadcrumb"
//           >
//             <Link href="/" className="hover:text-sky-300">
//               Home
//             </Link>
//             <span>/</span>
//             <span className="text-sky-300 font-medium">Blog</span>
//           </nav>

//           <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)] gap-8 items-start">
//             {/* Left: hero copy + search + topics */}
//             <div className="space-y-4 sm:space-y-5">
//               <p className="text-[11px] sm:text-xs tracking-[0.24em] uppercase text-sky-300">
//                 Softkingo blog
//               </p>
//               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
//                 Ideas, insights & launch playbooks
//               </h1>
//               <p className="text-sm sm:text-base text-slate-100/90 max-w-xl">
//                 Product, design and engineering stories to help you plan, ship
//                 and scale better mobile and web apps.
//               </p>

//               {/* Search form (server-side filter) */}
//               <form action="/blog" className="max-w-md">
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
//                     <FaSearch className="h-3.5 w-3.5 text-slate-500" />
//                   </div>
//                   <input
//                     type="search"
//                     name="q"
//                     defaultValue={q}
//                     placeholder="Search by title or topic..."
//                     className="w-full pl-9 pr-3 py-2.5 rounded-full bg-slate-900/70 border border-slate-500 text-sm text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
//                   />
//                   {category && (
//                     <input type="hidden" name="category" value={category} />
//                   )}
//                 </div>
//               </form>

//               {/* Category pills */}
//               <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs">
//                 <span className="text-slate-200">Browse by topic:</span>
//                 <Link
//                   href={buildUrl(q, "")}
//                   className={`px-3 py-1 rounded-full border ${
//                     !category
//                       ? "bg-sky-500 text-slate-900 border-sky-300"
//                       : "bg-slate-900/60 text-slate-100 border-slate-500 hover:bg-slate-800"
//                   } text-[11px] font-medium transition-colors`}
//                 >
//                   All
//                 </Link>
//                 {topics.map((t) => (
//                   <Link
//                     key={t}
//                     href={buildUrl(q, t)}
//                     className={`px-3 py-1 rounded-full border ${
//                       category === t
//                         ? "bg-sky-500 text-slate-900 border-sky-300"
//                         : "bg-slate-900/60 text-slate-100 border-slate-500 hover:bg-slate-800"
//                     } text-[11px] font-medium transition-colors`}
//                   >
//                     {t}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Right: featured card */}
//             {normalizedFeatured && (
//               <Link
//                 href={`/blog/${normalizedFeatured.slug}`}
//                 className="bg-slate-100/90 border border-sky-200 rounded-2xl shadow-[0_18px_45px_rgba(15,23,42,0.4)] overflow-hidden flex flex-col hover:border-sky-400 hover:bg-white transition-all backdrop-blur"
//               >
//                 <div className="relative h-44 sm:h-48 lg:h-60 bg-slate-200">
//                   <Image
//                     src={normalizedFeatured.thumbnail}
//                     alt={normalizedFeatured.title}
//                     fill
//                     className="object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
//                   <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-sky-500 text-slate-200 shadow-sm">
//                      {normalizedFeatured.category}
//                   </span>
//                 </div>
//                 <div className="p-5 sm:p-6 space-y-2.5">
//                   <p className="text-[11px] text-slate-500 flex items-center gap-2">
//                     {/* <span className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
//                       {normalizedFeatured.category}
//                     </span> */}
//                     <span>
//                       {normalizedFeatured.publishedAt
//                         ? new Date(
//                             normalizedFeatured.publishedAt
//                           ).toLocaleDateString("en-US", {
//                             month: "short",
//                             day: "numeric",
//                             year: "numeric",
//                           })
//                         : ""}
//                     </span>
//                   </p>
//                   <h2 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
//                     {normalizedFeatured.title}
//                   </h2>
//                   {/* <p className="text-[12px] sm:text-[13px] text-slate-700 line-clamp-3">
//                     {normalizedFeatured.excerpt}
//                   </p> */}
//                   <p className="text-[11px] text-sky-700 font-medium">
//                     Read article →
//                   </p>
//                 </div>
//               </Link>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* MAIN */}
//       <main className="bg-slate-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
//           <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,260px)] gap-6 lg:gap-8 items-start">
//             {/* CENTER: cards grid */}
//             <section>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-sm sm:text-base font-semibold text-slate-800">
//                   All blog posts
//                 </h2>
//                 <p className="text-[11px] text-slate-500">
//                   {totalCount} article{totalCount !== 1 ? "s" : ""}
//                   {q && <> matching “{q}”</>}
//                   {category && <> in {category}</>}
//                 </p>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {normalizedPosts.map((post) => (
//                   <BlogCard key={post.slug} post={post} variant="grid" />
//                 ))}
//               </div>
//             </section>

//             {/* RIGHT: most read + e‑guide */}
//             <aside className="hidden md:flex flex-col gap-4 sticky top-24">
//               {normalizedMostRead.length > 0 && (
//                 <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
//                   <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.18em] mb-3">
//                     Most read
//                   </p>
//                   <div className="space-y-2.5">
//                     {normalizedMostRead.map((p) => (
//                       <BlogCard
//                         key={p.slug}
//                         post={p}
//                         variant="compact"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <EGuideCard />
//             </aside>
//           </section>

//           {/* Newsletter strip same as pehle */}
//           <section className="mt-10 sm:mt-12">
//             <div className="rounded-3xl border border-sky-200 bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-400 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 shadow-[0_20px_60px_rgba(8,47,73,0.5)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//               <div className="space-y-1.5">
//                 <p className="text-[11px] tracking-[0.24em] uppercase text-sky-100/90">
//                   Newsletter
//                 </p>
//                 <h2 className="text-base sm:text-lg font-semibold text-white">
//                   Get one practical app growth idea every two weeks.
//                 </h2>
//                 <p className="text-[12px] sm:text-[13px] text-sky-50/90 max-w-xl">
//                   No spam, no generic “inspiration”. Just crisp product, UX and
//                   engineering ideas from apps we&apos;ve actually shipped.
//                 </p>
//               </div>
//               <form className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
//                 <input
//                   type="email"
//                   placeholder="Your work email"
//                   className="w-full sm:w-72 rounded-full bg-white/95 px-4 py-2 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
//                 />
//                 <button
//                   type="submit"
//                   className="shrink-0 rounded-full bg-slate-950/90 hover:bg-slate-900 text-white text-[13px] font-semibold px-4 py-2 shadow-[0_16px_40px_rgba(15,23,42,0.8)] transition-colors"
//                 >
//                   Subscribe
//                 </button>
//               </form>
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }

// function EGuideCard() {
//   return (
//     <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50 border border-sky-100 rounded-2xl p-4 sm:p-5 shadow-sm">
//       <p className="text-[11px] tracking-[0.24em] uppercase text-sky-500 mb-1">
//         E‑Guide
//       </p>
//       <h3 className="text-sm font-semibold text-slate-900">
//         Resource Guide: Launching PSA‑style Apps
//       </h3>
//       <p className="text-[12px] text-slate-600 mt-1 mb-3">
//         A 15‑page practical guide on planning, building and launching
//         Professional Services Automation apps.
//       </p>
//       <div className="relative h-24 rounded-xl overflow-hidden bg-gradient-to-tr from-sky-600 via-sky-700 to-slate-900 mb-3">
//         <Image
//           src="/images/black book.png"
//           alt="Guide cover"
//           fill
//           className="object-contain p-4"
//         />
//       </div>
//       <button className="w-full inline-flex items-center justify-center px-3 py-2 rounded-full bg-sky-600 hover:bg-sky-500 text-[13px] font-semibold text-white shadow-[0_10px_25px_rgba(56,189,248,0.45)] transition-colors">
//         Download e‑guide
//       </button>
//       <p className="mt-1 text-[10px] text-slate-400 text-center">
//         PDF · Sent instantly to your inbox
//       </p>
//     </div>
//   );
// }
// src/app/(public)/blog/page.jsx
import SectionPage from "@/app/(public)/blog/SectionPage";

export const dynamic = "force-dynamic";

export default async function BlogPage(props) {
  const searchParams = await props.searchParams;
  return <SectionPage sectionKey="blog" searchParams={searchParams} />;
}

