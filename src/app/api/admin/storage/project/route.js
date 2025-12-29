import { NextResponse } from "next/server";
import path from "node:path";
import { getTopLevelFoldersUsage } from "@/lib/admin/folderSize";

export const runtime = "nodejs";

export async function GET() {
  try {
    const projectRoot = process.cwd();

    // Tum apne hisaab se folders add/remove kar sakte ho
    const foldersToScan = ["app", "public", "prisma", "src", "uploads", "logs"];

    const { totalBytes, items } = await getTopLevelFoldersUsage({
      projectRoot,
      folders: foldersToScan,
      excludeNames: ["node_modules", ".git", ".next", ".turbo"],
    });

    const out = items
      .filter((x) => x.bytes > 0)
      .map((x) => ({
        folder: x.path.startsWith(projectRoot) ? path.relative(projectRoot, x.path) : x.path,
        bytes: x.bytes,
      }));

    return NextResponse.json({
      ok: true,
      projectRoot,
      totalBytes,
      folders: out,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Project usage failed" },
      { status: 500 }
    );
  }
}
