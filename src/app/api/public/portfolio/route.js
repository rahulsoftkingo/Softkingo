// src/app/api/public/portfolio/route.js


import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function normalizeType(type) {
  const t = (type || "").toLowerCase();
  if (["app", "mobile", "ios", "android"].includes(t)) return "app";
  if (["web", "website"].includes(t)) return "web";
  if (["digital", "marketing", "seo"].includes(t)) return "digital";
  return t || "app";
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = (searchParams.get("type") || "app").toLowerCase();
  const take = Number(searchParams.get("take") || 8);

  const rows = await prisma.portfolioProject.findMany({
    where: {
      type: type,
    },
    orderBy: { createdAt: "desc" },
    take: Math.min(Math.max(take, 1), 50),
    include: {
      caseStudy: {
        select: {
          id: true,
          slug: true,
          title: true,
        },
      },
    },
  });

  const projects = rows.map((p) => ({
    id: p.id,
    key: p.key,
    type: normalizeType(p.type),
    title: p.title,
    category: p.category || "",
    description: p.description || "",
    techstack: p.techStack || "",
    platforms: p.platforms || "",
    country: p.country || "",
    bgImage: p.bgImage || "/images/portfolio/bg-1.png",
    phoneMockup: p.phoneMockup || "",
    icon: p.icon || "",
    badges: safeBadges(p.badgesJson),
   techstack: p.techStack || "",  // ✅ Prisma field → frontend field
  bgColor: p.bgColor || "rgba(2, 132, 199, 0.92)",
    caseStudy: p.caseStudy
      ? {
          id: p.caseStudy.id,
          slug: p.caseStudy.slug,
          title: p.caseStudy.title,
        }
      : null,
  }));

  // ✅ Calculate comprehensive stats
  const uniqueCountries = new Set(projects.map(p => p.country).filter(Boolean));
  const uniqueCategories = new Set(projects.map(p => p.category).filter(Boolean));
  const projectsWithCaseStudy = projects.filter(p => p.caseStudy);
  
  // Get top 3 platforms used
  const platformCounts = {};
  projects.forEach(p => {
    if (p.platforms) {
      p.platforms.split(',').forEach(platform => {
        const clean = platform.trim();
        if (clean) platformCounts[clean] = (platformCounts[clean] || 0) + 1;
      });
    }
  });
  
  const topPlatforms = Object.entries(platformCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name]) => name);

  // Get top 3 tech stacks
  const techCounts = {};
  projects.forEach(p => {
    if (p.techstack) {
      p.techstack.split(',').forEach(tech => {
        const clean = tech.trim();
        if (clean) techCounts[clean] = (techCounts[clean] || 0) + 1;
      });
    }
  });
  
  const topTech = Object.entries(techCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name]) => name);

  const stats = {
    totalProjects: projects.length,
    uniqueClients: uniqueCountries.size || Math.ceil(projects.length * 0.6),
    uniqueCountries: uniqueCountries.size || Math.ceil(projects.length * 0.4),
    categories: Array.from(uniqueCategories),
    withCaseStudy: projectsWithCaseStudy.length,
    topPlatforms: topPlatforms,
    topTech: topTech,
    // Sample featured projects (top 3 with case studies)
    featured: projectsWithCaseStudy.slice(0, 3).map(p => ({
      id: p.id,
      title: p.title,
      category: p.category,
      caseStudySlug: p.caseStudy?.slug,
    })),
  };

  return NextResponse.json({ 
    ok: true, 
    projects,
    stats,
  });
}

function safeBadges(badgesJson) {
  if (!badgesJson) return null;
  try {
    return JSON.parse(badgesJson);
  } catch {
    return null;
  }
}
