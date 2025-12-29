import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";

export const runtime = "nodejs";

const SCAN_DIRS = ["app", "src"];
const SCAN_EXTS = new Set([".js", ".jsx", ".ts", ".tsx", ".md", ".mdx", ".json"]);

async function listProjectTextFiles(projectRoot) {
  const results = [];

  async function walk(abs, depth) {
    if (depth > 25) return;

    let entries = [];
    try {
      entries = await fs.readdir(abs, { withFileTypes: true });
    } catch {
      return;
    }

    for (const e of entries) {
      if (e.name.startsWith(".")) continue;
      if (e.name === "node_modules" || e.name === ".next" || e.name === ".git") continue;

      const childAbs = path.join(abs, e.name);

      if (e.isDirectory()) {
        await walk(childAbs, depth + 1);
      } else {
        const ext = path.extname(e.name).toLowerCase();
        if (SCAN_EXTS.has(ext)) results.push(childAbs);
      }
    }
  }

  for (const d of SCAN_DIRS) {
    await walk(path.join(projectRoot, d), 0);
  }

  return results;
}

function countOccurrences(text, needle) {
  let idx = 0;
  let c = 0;
  while (true) {
    idx = text.indexOf(needle, idx);
    if (idx === -1) break;
    c += 1;
    idx += needle.length;
  }
  return c;
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url"); // e.g. /images/a.png

    if (!url) {
      return NextResponse.json({ ok: false, error: "url is required" }, { status: 400 });
    }

    const projectRoot = process.cwd();
    const files = await listProjectTextFiles(projectRoot);

    const out = [];
    let totalCount = 0;

    for (const fileAbs of files) {
      let content = "";
      try {
        content = await fs.readFile(fileAbs, "utf8");
      } catch {
        continue;
      }

      const count = countOccurrences(content, url);
      if (count > 0) {
        totalCount += count;
        out.push({ file: path.relative(projectRoot, fileAbs), count });
      }
    }

    out.sort((a, b) => b.count - a.count);

    return NextResponse.json({
      ok: true,
      url,
      scannedDirs: SCAN_DIRS,
      scannedFiles: files.length,
      totalCount,
      files: out,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e?.message || "usage failed" },
      { status: 500 }
    );
  }
}
