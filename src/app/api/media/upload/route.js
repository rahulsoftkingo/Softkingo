// src/app/api/media/upload/route.js (FINAL VERSION)
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { toAbsPublic, sanitizeRel, toPublicUrl } from "../_utils";

export async function POST(req) {
  try {
    const form = await req.formData();

    const file = form.get("file");
    const folder = sanitizeRel(form.get("folder") || "");
    const overwrite = form.get("overwrite") === "true";
    const customName = form.get("name")?.toString().trim() || "";

    if (!file) return NextResponse.json({ error: "File required" }, { status: 400 });

    // ✅ FIXED: Always use uploads/ prefix
    const uploadFolder = `uploads/${folder}`;
    await fs.mkdir(toAbsPublic(uploadFolder), { recursive: true });

    const original = file.name || "file";
    const ext = path.extname(original);
    const base = path.basename(original, ext);

    const safeBase = (customName || base)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 100); // ✅ Max length

    const finalName = overwrite
      ? `${safeBase}${ext}`
      : `${safeBase}-${Date.now()}${ext}`;

    const rel = sanitizeRel(path.join(uploadFolder, finalName)); // ✅ uploads/ included
    const abs = toAbsPublic(rel);

    const bytes = await file.arrayBuffer();
    await fs.writeFile(abs, Buffer.from(bytes));

    return NextResponse.json({
      ok: true,
      file: { 
        name: finalName, 
        path: rel, 
        url: toPublicUrl(rel),
        size: bytes.byteLength // ✅ Size added
      },
    });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: `Upload failed: ${e.message}` }, { status: 500 });
  }
}
