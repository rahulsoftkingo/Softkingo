import { NextResponse } from "next/server";
import path from "node:path";
import { buildFolderTreeAnalytics } from "@/lib/admin/folderTreeAnalytics";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    // base folder (project root relative). default = "." (whole project)
    const relBase = searchParams.get("base") || ".";

    // depth control from UI
    const depth = Number(searchParams.get("depth") || "4");

    const projectRoot = process.cwd();
    const baseAbs = path.resolve(projectRoot, relBase);

    // security: only allow inside project
    if (!baseAbs.startsWith(projectRoot)) {
      return NextResponse.json({ ok: false, error: "Invalid base path" }, { status: 400 });
    }

    const tree = await buildFolderTreeAnalytics({
      rootAbs: baseAbs,
      rootLabel: relBase === "." ? "project" : relBase,
      excludeNames: ["node_modules", ".git", ".next", ".turbo"],
      maxDepth: Number.isFinite(depth) ? Math.max(1, Math.min(depth, 10)) : 4,
    });

    // make paths relative for UI
    function toRel(node) {
      const rel = path.relative(projectRoot, node.path) || ".";
      return {
        name: node.name,
        path: rel,
        bytes: node.bytes,
        imageCount: node.imageCount,
        imageBytes: node.imageBytes,
        truncated: node.truncated || false,
        children: (node.children || []).map(toRel),
      };
    }

    return NextResponse.json({ ok: true, projectRoot, tree: toRel(tree) });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "project tree failed" },
      { status: 500 }
    );
  }
}
