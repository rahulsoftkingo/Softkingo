


import path from "node:path";

export const BASES = {
  solutions: "src/app/(public)/solutions",
  industries: "src/app/(public)/industries",
};

export function slugify(input = "") {
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getBaseAbs(section) {
  const rel = BASES[section];
  if (!rel) return null;
  return path.join(process.cwd(), rel);
}

export function isInside(parentAbs, childAbs) {
  const rel = path.relative(parentAbs, childAbs);
  return rel !== "" && !rel.startsWith("..") && !path.isAbsolute(rel);
}

export function toUrl(section, slug) {
  return `/${section}/${slug}`;
}

export function titleFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");
}

// NEW: DB Page tracking
export async function trackPageInDB(section, slug) {
  const { prisma } = await import("@/lib/prisma"); // dynamic import
  const title = titleFromSlug(slug);
  
  try {
    // Upsert: create if not exists, update if exists
    await prisma.page.upsert({
      where: { slug },
      update: {
        key: `${section}-${slug}`,
        title,
        type: section === "solutions" ? "solution" : "industry",
        status: "published",
      },
      create: {
        key: `${section}-${slug}`,
        title,
        slug,
        type: section === "solutions" ? "solution" : "industry",
        excerpt: "",
        contentJson: JSON.stringify({
          type: "hero",
          data: {
            heading: title,
            subheading: `Placeholder hero for ${title}. Edit contentJson in DB or replace page.jsx`,
          }
        }),
        status: "published",
        featured: false,
      },
    });
  } catch (e) {
    console.error("DB tracking failed:", e);
    // Don't fail FS operations if DB fails
  }
}

export async function untrackPageFromDB(slug) {
  const { prisma } = await import("@/lib/prisma");
  try {
    await prisma.page.deleteMany({
      where: { slug }
    });
  } catch (e) {
    console.error("DB untrack failed:", e);
  }
}
