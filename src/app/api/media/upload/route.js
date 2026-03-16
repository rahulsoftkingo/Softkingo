import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { toAbsPublic, sanitizeRel, toPublicUrl } from "../_utils";
import { validateAndProcessUpload } from "@/lib/secure-upload";

export const runtime = 'nodejs'; // Ensure Node runtime for FS

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    let rawFolder = (form.get("folder") || "general").toString();

    // Clean folder name
    const subFolder = `public/${rawFolder.replace(/^uploads[\/\\]?/, "").replace(/^[\/\\]+/, "").replace(/^public\//, "")}`;

    // ✅ Use centralized secure utility
    const result = await validateAndProcessUpload(file, {
      maxSize: 10 * 1024 * 1024,
      subFolder
    });

    return NextResponse.json({
      ok: true,
      file: { 
        name: result.fileName, 
        path: result.url, 
        url: result.url,
        size: result.size
      },
    });

  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: e.message || "Upload failed" }, { status: 400 });
  }
}