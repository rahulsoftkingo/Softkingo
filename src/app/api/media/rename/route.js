// app/api/media/rename/route.js
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { toAbsPublic, sanitizeRel, toPublicUrl } from "../_utils";

export async function PATCH(req) {
  try {
    const { oldPath, newPath } = await req.json();
    const from = sanitizeRel(oldPath);
    const to = sanitizeRel(newPath);

    if (!from || !to) return NextResponse.json({ error: "oldPath & newPath required" }, { status: 400 });

    // ensure target folder exists
    await fs.mkdir(path.dirname(toAbsPublic(to)), { recursive: true });

    await fs.rename(toAbsPublic(from), toAbsPublic(to)); // rename/move [web:1456]
    return NextResponse.json({ ok: true, path: to, url: toPublicUrl(to) });
  } catch (e) {
    return NextResponse.json({ error: "rename failed" }, { status: 500 });
  }
}
