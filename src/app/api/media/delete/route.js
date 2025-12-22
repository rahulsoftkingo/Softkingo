// app/api/media/delete/route.js
import { NextResponse } from "next/server";
import fs from "fs/promises";
import { toAbsPublic, sanitizeRel } from "../_utils";

export async function DELETE(req) {
  try {
    const { targetPath, type } = await req.json(); // type: "file" | "folder"
    const rel = sanitizeRel(targetPath);
    if (!rel) return NextResponse.json({ error: "targetPath required" }, { status: 400 });

    const abs = toAbsPublic(rel);

    if (type === "folder") {
      await fs.rm(abs, { recursive: true, force: true });
    } else {
      await fs.rm(abs, { force: true });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "delete failed" }, { status: 500 });
  }
}
