// app/api/admin/storage/db-image-refs/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // (aapke project me jo prisma client file ho)
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
  { model: "ebook", table: "ebook", id: "id", fields: ["coverImage"] }, // pdfUrl optional
];

function normalizeToPublicRel(value) {
  if (!value) return null;
  let v = String(value).trim();

  // allow full URL => extract path
  // ex: https://domain.com/uploads/a.png -> /uploads/a.png
  try {
    if (v.startsWith("http://") || v.startsWith("https://")) {
      const u = new URL(v);
      v = u.pathname; // keep only path
    }
  } catch {}

  // common patterns: "public/uploads/a.png" => "/uploads/a.png"
  v = v.replace(/^public\//, "/");
  if (!v.startsWith("/")) v = `/${v}`;

  // only treat as public file if it looks like it belongs to public
  // (adjust if you use CDN paths)
  return v;
}

export async function GET() {
  try {
    const out = [];

    for (const item of IMAGE_FIELDS) {
      for (const field of item.fields) {
        const rows = await prisma[item.model].findMany({
          where: { [field]: { not: null } },
          select: { [item.id]: true, [field]: true },
        });

        for (const r of rows) {
          const raw = r[field];
          if (!raw) continue;

          // some fields might store JSON, ignore if too big (optional)
          const normalized = normalizeToPublicRel(raw);
          if (!normalized) continue;

          out.push({
            table: item.table,
            model: item.model,
            rowId: r[item.id],
            field,
            value: raw,
            normalizedUrl: normalized,
          });
        }
      }
    }

    return NextResponse.json({ ok: true, count: out.length, refs: out });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e?.message || "DB refs failed" }, { status: 500 });
  }
}
