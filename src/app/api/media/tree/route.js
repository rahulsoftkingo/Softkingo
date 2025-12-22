// app/api/media/tree/route.js
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { PUBLIC_DIR, sanitizeRel } from "../_utils";

async function walk(dirAbs, dirRel) {
  let entries = [];
  try {
    entries = await fs.readdir(dirAbs, { withFileTypes: true });
  } catch {
    return { name: path.basename(dirAbs), path: dirRel, folders: [], files: [] };
  }

  const folders = [];
  const files = [];

  for (const e of entries) {
    // hide dot files/folders
    if (e.name.startsWith(".")) continue;

    const childRel = sanitizeRel(path.join(dirRel, e.name));
    const childAbs = path.join(dirAbs, e.name);

    if (e.isDirectory()) {
      folders.push(await walk(childAbs, childRel));
    } else {
      let stat = null;
      try {
        stat = await fs.stat(childAbs);
      } catch {}
      files.push({
        name: e.name,
        path: childRel, // relative path inside public
        url: "/" + childRel,
        size: stat?.size ?? 0,
        updatedAt: stat?.mtime ? stat.mtime.toISOString() : null,
      });
    }
  }

  // sort
  folders.sort((a, b) => a.name.localeCompare(b.name));
  files.sort((a, b) => a.name.localeCompare(b.name));

  return { name: path.basename(dirAbs), path: dirRel, folders, files };
}

export async function GET() {
  const root = await walk(PUBLIC_DIR, "");
  return NextResponse.json({ root });
}
