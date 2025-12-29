import path from "node:path";
import { promises as fs } from "node:fs";

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"]);

function isImageFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return IMAGE_EXTS.has(ext);
}

export async function scanFolderAnalytics(rootPath, opts = {}) {
  const exclude = new Set(opts.excludeNames || []);
  const maxDepth = opts.maxDepth ?? 25;

  const stats = {
    totalBytes: 0,

    imageCount: 0,
    imageBytes: 0,
    largestImage: null, // { path, bytes }
  };

  async function walk(p, depth) {
    if (depth > maxDepth) return;

    let st;
    try {
      st = await fs.lstat(p);
    } catch {
      return;
    }

    if (st.isSymbolicLink()) return;

    if (st.isFile()) {
      stats.totalBytes += st.size;

      if (isImageFile(p)) {
        stats.imageCount += 1;
        stats.imageBytes += st.size;

        if (!stats.largestImage || st.size > stats.largestImage.bytes) {
          stats.largestImage = { path: p, bytes: st.size };
        }
      }
      return;
    }

    if (!st.isDirectory()) return;

    const base = path.basename(p);
    if (exclude.has(base)) return;

    let entries;
    try {
      entries = await fs.readdir(p, { withFileTypes: true });
    } catch {
      return;
    }

    await Promise.all(entries.map((e) => walk(path.join(p, e.name), depth + 1)));
  }

  await walk(rootPath, 0);

  const avgImageBytes = stats.imageCount ? Math.round(stats.imageBytes / stats.imageCount) : 0;

  return {
    rootPath,
    totalBytes: stats.totalBytes,
    imageCount: stats.imageCount,
    imageBytes: stats.imageBytes,
    avgImageBytes,
    largestImage: stats.largestImage,
  };
}
