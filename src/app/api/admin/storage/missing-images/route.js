// src/app/api/admin/storage/missing-images/route.js


import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

const IMAGE_FIELDS = [
  { model: "blogPost", table: "blogpost", id: "id", fields: ["thumbnail", "heroImage", "seoImage"] },
  { model: "contentItem", table: "contentitem", id: "id", fields: ["thumbnail", "heroImage"] },
  { model: "teamMember", table: "teammember", id: "id", fields: ["photo"] },
  { model: "employeeDirectoryItem", table: "employeedirectoryitem", id: "id", fields: ["photo"] },
  { model: "mediaItem", table: "mediaitem", id: "id", fields: ["filePath", "thumbnail"] },
  { model: "siteEvent", table: "siteevent", id: "id", fields: ["imageUrl"] },
  { model: "chatMessage", table: "chatmessage", id: "id", fields: ["fileUrl"] },
  { model: "page", table: "page", id: "id", fields: ["seoImage"] },
  { model: "ebook", table: "ebook", id: "id", fields: ["coverImage"] },
];

function normalizeToPublicRel(value) {
  if (value == null) return null;

  // If someone stored JSON/array accidentally, skip (or you can enhance later)
  if (typeof value === "object") return null;

  let v = String(value).trim();
  if (!v) return null;

  try {
    if (v.startsWith("http://") || v.startsWith("https://")) v = new URL(v).pathname;
  } catch {}

  v = v.replace(/^public\//, "/");
  if (!v.startsWith("/")) v = `/${v}`;

  // Only treat these as public assets (adjust as needed)
  if (!(v.startsWith("/images/") || v.startsWith("/uploads/") || v.startsWith("/favicon"))) {
    // If you want: return v anyway
    return v;
  }

  return v;
}

function publicAbsFromRel(rel) {
  const safe = rel.replace(/^\/+/, "");
  return path.join(process.cwd(), "public", safe);
}

async function fetchAllRowsPaged(model, select, pageSize = 500) {
  const all = [];
  let skip = 0;

  while (true) {
    const rows = await prisma[model].findMany({
      select,
      take: pageSize,
      skip,
      orderBy: { id: "asc" }, // works if id exists; if not, remove orderBy
    });

    all.push(...rows);
    if (rows.length < pageSize) break;
    skip += pageSize;
  }

  return all;
}

export async function GET() {
  try {
    const missing = [];
    let checked = 0;

    for (const item of IMAGE_FIELDS) {
      const select = { [item.id]: true };
      for (const f of item.fields) select[f] = true;

      // IMPORTANT: no where clause => no prisma "not" validation issues
      const rows = await prisma[item.model].findMany({ select });

      for (const r of rows) {
        for (const field of item.fields) {
          const raw = r[field];
          const rel = normalizeToPublicRel(raw);
          if (!rel) continue;

          checked += 1;

          // only check filesystem for /images or /uploads (public)
          if (rel.startsWith("/images/") || rel.startsWith("/uploads/")) {
            const abs = publicAbsFromRel(rel);
            if (!fs.existsSync(abs)) {
              missing.push({
                url: rel,
                abs,
                table: item.table,
                model: item.model,
                rowId: r[item.id],
                field,
                value: raw,
              });
            }
          }
        }
      }
    }

    return NextResponse.json({
      ok: true,
      stats: { checked, missingCount: missing.length },
      missing,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Missing scan failed" },
      { status: 500 }
    );
  }
}
