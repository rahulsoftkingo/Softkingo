import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { toAbsPublic, sanitizeRel, toPublicUrl } from "../_utils";

export const runtime = 'nodejs'; // Ensure Node runtime for FS

export async function POST(req) {
  try {
    const form = await req.formData();

    const file = form.get("file");
    let rawFolder = form.get("folder") || "";
    const overwrite = form.get("overwrite") === "true";
    const customName = form.get("name")?.toString().trim() || "";

    if (!file) return NextResponse.json({ error: "File required" }, { status: 400 });

    // ✅ FIXED: Duplication Logic
    // Agar frontend se "uploads/solutions" aa raha hai, to "uploads/" hata do taaki double na ho jaye
    rawFolder = rawFolder.replace(/^uploads[\/\\]?/, "").replace(/^[\/\\]+/, "");
    
    // Ab clean folder (e.g., "solutions") ko sanitize karo
    const folder = sanitizeRel(rawFolder);

    // Final path always starts with one "uploads/"
    const uploadFolder = path.join("uploads", folder);
    
    // Directory create karo
    await fs.mkdir(toAbsPublic(uploadFolder), { recursive: true });

    // File name processing
    const original = file.name || "file";
    const ext = path.extname(original);
    const base = path.basename(original, ext);

    const safeBase = (customName || base)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 100);

    const finalName = overwrite
      ? `${safeBase}${ext}`
      : `${safeBase}-${Date.now()}${ext}`;

    // Final path construction
    const rel = path.join(uploadFolder, finalName);
    const abs = toAbsPublic(rel);

    // Write file
    const bytes = await file.arrayBuffer();
    await fs.writeFile(abs, Buffer.from(bytes));

    return NextResponse.json({
      ok: true,
      file: { 
        name: finalName, 
        // Windows backslashes ko forward slash me badalna zaroori hai URL ke liye
        path: rel.replace(/\\/g, '/'), 
        url: toPublicUrl(rel),
        size: bytes.byteLength 
      },
    });

  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: `Upload failed: ${e.message}` }, { status: 500 });
  }
}