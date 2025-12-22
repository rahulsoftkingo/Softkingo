// app/api/media/_utils.js
import path from "path";

export const PUBLIC_DIR = path.join(process.cwd(), "public");

export function sanitizeRel(p = "") {
  return String(p)
    .replace(/\\/g, "/")
    .replace(/^\//, "")
    .replace(/\.\./g, "")
    .replace(/\/+/g, "/")
    .trim();
}

export function toAbsPublic(rel) {
  return path.join(PUBLIC_DIR, sanitizeRel(rel));
}

export function toPublicUrl(rel) {
  return "/" + sanitizeRel(rel);
}
