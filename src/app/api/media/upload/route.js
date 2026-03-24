import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { validateAndProcessUpload } from "@/lib/secure-upload";

export const runtime = 'nodejs'; // Ensure Node runtime for FS

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file");
    let rawFolder = (form.get("folder") || "uncategorized").toString();

    // Clean folder name
    const subFolder = rawFolder.replace(/^uploads[\/\\]?/, "").replace(/^[\/\\]+/, "").replace(/^public[\/\\]?/, "");

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