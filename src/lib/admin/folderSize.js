import path from "node:path";
import { promises as fs } from "node:fs";

export async function getFolderSizeBytes(rootPath, opts = {}) {
  const exclude = new Set(opts.excludeNames || []);
  const maxDepth = opts.maxDepth ?? 20;

  async function walk(p, depth) {
    if (depth > maxDepth) return 0;

    let st;
    try {
      st = await fs.lstat(p);
    } catch {
      return 0;
    }

    if (st.isSymbolicLink()) return 0;
    if (st.isFile()) return st.size;
    if (!st.isDirectory()) return 0;

    const base = path.basename(p);
    if (exclude.has(base)) return 0;

    let entries;
    try {
      entries = await fs.readdir(p, { withFileTypes: true });
    } catch {
      return 0;
    }

    const sizes = await Promise.all(
      entries.map((e) => walk(path.join(p, e.name), depth + 1))
    );
    return sizes.reduce((a, b) => a + b, 0);
  }

  return walk(rootPath, 0);
}

export async function getTopLevelFoldersUsage({ projectRoot, folders, excludeNames }) {
  const items = await Promise.all(
    folders.map(async (name) => {
      const abs = path.join(projectRoot, name);
      const bytes = await getFolderSizeBytes(abs, { excludeNames });
      return { name, path: abs, bytes };
    })
  );

  const totalBytes = items.reduce((a, b) => a + b.bytes, 0);
  items.sort((a, b) => b.bytes - a.bytes);

  return { totalBytes, items };
}
