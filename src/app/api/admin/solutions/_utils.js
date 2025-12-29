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
  // route group (public) is not part of URL [web:274]
  return `/${section}/${slug}`;
}

export function titleFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");
}
