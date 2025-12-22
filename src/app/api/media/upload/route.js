// app/api/media/upload/route.js
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
    const customName = (form.get("name") || "").toString().trim(); // optional: user-defined

    if (!file) return NextResponse.json({ error: "file required" }, { status: 400 });

    // ensure folder exists
    await fs.mkdir(toAbsPublic(folder), { recursive: true }); 

    const original = file.name || "file";
    const ext = path.extname(original);
    const base = path.basename(original, ext);

    const safeBase = (customName ? path.basename(customName, path.extname(customName)) : base)
      .replace(/[^a-zA-Z0-9_-]/g, "_");

    const finalName = overwrite
      ? `${safeBase}${ext || path.extname(customName) || ""}`
      : `${safeBase}-${Date.now()}${ext || path.extname(customName) || ""}`;

    const rel = sanitizeRel(path.join(folder, finalName));
    const abs = toAbsPublic(rel);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(abs, buffer);

    return NextResponse.json({
      ok: true,
      file: { name: finalName, path: rel, url: toPublicUrl(rel) },
    });
  } catch (e) {
    console.error("upload error", e);
    return NextResponse.json({ error: "upload failed" }, { status: 500 });
  }
}
