import path from "node:path";
import { promises as fs } from "node:fs";

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"]);

function isImageFileName(name) {
  return IMAGE_EXTS.has(path.extname(name).toLowerCase());
}

export async function buildFolderTreeAnalytics(params) {
  const {
    rootAbs,           // absolute path of scan root
    rootLabel = "project",
    excludeNames = ["node_modules", ".git", ".next", ".turbo"],
    maxDepth = 4,      // IMPORTANT: limit for speed
    maxFolders = 5000, // safety
  } = params;

  const exclude = new Set(excludeNames);
  let folderCount = 0;

  async function walk(dirAbs, depth) {
    folderCount += 1;
    if (folderCount > maxFolders) {
      return {
        name: path.basename(dirAbs),
        path: dirAbs,
        bytes: 0,
        imageCount: 0,
        imageBytes: 0,
        truncated: true,
        children: [],
      };
    }

    let entries;
    try {
      entries = await fs.readdir(dirAbs, { withFileTypes: true });
    } catch {
      return {
        name: path.basename(dirAbs),
        path: dirAbs,
        bytes: 0,
        imageCount: 0,
        imageBytes: 0,
        children: [],
      };
    }

    let bytes = 0;
    let imageCount = 0;
    let imageBytes = 0;

    let children = [];

    // files
    for (const e of entries) {
      if (e.isFile()) {
        try {
          const st = await fs.lstat(path.join(dirAbs, e.name));
          bytes += st.size;

          if (isImageFileName(e.name)) {
            imageCount += 1;
            imageBytes += st.size;
          }
        } catch {}
      }
    }

    // folders
    if (depth < maxDepth) {
      const dirs = entries.filter((e) => e.isDirectory() && !exclude.has(e.name));

      children = await Promise.all(
        dirs.map(async (d) => {
          const childAbs = path.join(dirAbs, d.name);
          const child = await walk(childAbs, depth + 1);

          // include child totals into parent totals (so parent is total of subtree)
          bytes += child.bytes;
          imageCount += child.imageCount;
          imageBytes += child.imageBytes;

          return child;
        })
      );

      // sort biggest first
      children.sort((a, b) => b.bytes - a.bytes);
    }

    return {
      name: depth === 0 ? rootLabel : path.basename(dirAbs),
      path: dirAbs,
      bytes,
      imageCount,
      imageBytes,
      children,
    };
  }

  return walk(rootAbs, 0);
}
