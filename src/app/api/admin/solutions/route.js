import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";
import {
  BASES,
  slugify,
  getBaseAbs,
  isInside,
  toUrl,
  titleFromSlug,
} from "./_utils";

export const runtime = "nodejs";

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function safeReaddir(absDir) {
  try {
    return await fs.readdir(absDir, { withFileTypes: true });
  } catch {
    return [];
  }
}

async function listRoutes(section) {
  const baseAbs = getBaseAbs(section);
  if (!baseAbs) return [];

  const entries = await safeReaddir(baseAbs);

  const dirs = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith("."))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b));

  const items = await Promise.all(
    dirs.map(async (slug) => {
      const folderAbs = path.join(baseAbs, slug);
      const pageJsx = path.join(folderAbs, "page.jsx");
      const pageJs = path.join(folderAbs, "page.js");

      const hasPageJsx = await exists(pageJsx);
      const hasPageJs = await exists(pageJs);
      const hasPage = hasPageJsx || hasPageJs;

      let updatedAt = null;
      try {
        const stat = await fs.stat(hasPageJsx ? pageJsx : pageJs);
        updatedAt = stat?.mtime ? stat.mtime.toISOString() : null;
      } catch {}

      return {
        slug,
        url: toUrl(section, slug),
        hasPage,
        pageFile: hasPageJsx ? "page.jsx" : hasPageJs ? "page.js" : null,
        updatedAt,
      };
    })
  );

  return items;
}

function pageTemplate({ section, slug }) {
  const title = titleFromSlug(slug);

  // Placeholder static page + dynamic metadata (basic)
  return `export const dynamic = "force-static";

export async function generateMetadata() {
  return {
    title: "${title}",
    description: "${title} - ${section} page",
  };
}

export default function Page() {
  return (
    <div style={{ padding: 24 }}>
      <h1>${title}</h1>
      <p>Auto-created placeholder for <b>/${section}/${slug}</b></p>
      <p>Edit this file: <code>src/app/(public)/${section}/${slug}/page.jsx</code></p>
    </div>
  );
}
`;
}

// GET /api/admin/solutions?section=solutions|industries|all
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const section = (searchParams.get("section") || "all").toLowerCase();

    const sections =
      section === "all" ? Object.keys(BASES) : [section].filter((s) => BASES[s]);

    if (sections.length === 0) {
      return NextResponse.json({ ok: false, error: "Invalid section" }, { status: 400 });
    }

    const data = {};
    for (const s of sections) {
      const baseAbs = getBaseAbs(s);

      // ensure base exists (create if missing)
      if (!(await exists(baseAbs))) {
        await fs.mkdir(baseAbs, { recursive: true });
      }

      data[s] = {
        basePath: BASES[s],
        items: await listRoutes(s),
      };
    }

    return NextResponse.json({ ok: true, data });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e?.message || "list failed" }, { status: 500 });
  }
}

// POST /api/admin/solutions  { section, slug, createPage=true }
export async function POST(req) {
  try {
    const body = await req.json();
    const section = String(body?.section || "").toLowerCase();
    const rawSlug = body?.slug;

    const createPage = body?.createPage !== false; // default true

    if (!BASES[section]) {
      return NextResponse.json({ ok: false, error: "Invalid section" }, { status: 400 });
    }

    const slug = slugify(rawSlug);
    if (!slug) {
      return NextResponse.json({ ok: false, error: "slug required" }, { status: 400 });
    }

    const baseAbs = getBaseAbs(section);
    if (!(await exists(baseAbs))) await fs.mkdir(baseAbs, { recursive: true });

    const folderAbs = path.join(baseAbs, slug);

    // safety
    if (!isInside(baseAbs, folderAbs)) {
      return NextResponse.json({ ok: false, error: "Invalid path" }, { status: 400 });
    }

    if (await exists(folderAbs)) {
      return NextResponse.json({ ok: false, error: "Slug already exists" }, { status: 409 });
    }

    await fs.mkdir(folderAbs, { recursive: true }); // recursive mkdir [web:121]

    let pagePath = null;
    if (createPage) {
      pagePath = path.join(folderAbs, "page.jsx");
      await fs.writeFile(pagePath, pageTemplate({ section, slug }), "utf8");
    }

    return NextResponse.json({
      ok: true,
      created: {
        section,
        slug,
        url: toUrl(section, slug),
        folder: path.relative(process.cwd(), folderAbs),
        page: pagePath ? path.relative(process.cwd(), pagePath) : null,
      },
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e?.message || "create failed" }, { status: 500 });
  }
}

// DELETE /api/admin/solutions  { section, slug }
export async function DELETE(req) {
  try {
    const body = await req.json();
    const section = String(body?.section || "").toLowerCase();
    const slug = slugify(body?.slug);

    if (!BASES[section]) {
      return NextResponse.json({ ok: false, error: "Invalid section" }, { status: 400 });
    }
    if (!slug) {
      return NextResponse.json({ ok: false, error: "slug required" }, { status: 400 });
    }

    const baseAbs = getBaseAbs(section);
    const folderAbs = path.join(baseAbs, slug);

    if (!isInside(baseAbs, folderAbs)) {
      return NextResponse.json({ ok: false, error: "Invalid path" }, { status: 400 });
    }

    if (!(await exists(folderAbs))) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    // delete recursively
    await fs.rm(folderAbs, { recursive: true, force: true }); // rm recursive [web:121]

    return NextResponse.json({ ok: true, deleted: { section, slug } });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e?.message || "delete failed" }, { status: 500 });
  }
}
