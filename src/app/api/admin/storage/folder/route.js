import { NextResponse } from "next/server";
import path from "node:path";
import { scanFolderAnalytics } from "@/lib/admin/folderAnalytics";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const rel = searchParams.get("path") || "public";

    const projectRoot = process.cwd();

    // Security: only allow inside project root
    const targetAbs = path.resolve(projectRoot, rel);
    if (!targetAbs.startsWith(projectRoot)) {
      return NextResponse.json({ ok: false, error: "Invalid path" }, { status: 400 });
    }

    const data = await scanFolderAnalytics(targetAbs, {
      excludeNames: ["node_modules", ".git", ".next", ".turbo"],
      maxDepth: 30,
    });

    // Make largestImage path relative (clean)
    if (data.largestImage?.path) {
      data.largestImage.path = path.relative(projectRoot, data.largestImage.path);
    }

    return NextResponse.json({ ok: true, ...data, projectRoot });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Folder analytics failed" },
      { status: 500 }
    );
  }
}
