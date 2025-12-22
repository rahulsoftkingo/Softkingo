// app/api/media/mkdir/route.js
import { NextResponse } from "next/server";
import fs from "fs/promises";
import { toAbsPublic, sanitizeRel } from "../_utils";

export async function POST(req) {
  try {
    const { folder } = await req.json();
    const safe = sanitizeRel(folder);
    if (!safe) return NextResponse.json({ error: "folder required" }, { status: 400 });

    await fs.mkdir(toAbsPublic(safe), { recursive: true }); // recursive mkdir [web:1454]
    return NextResponse.json({ ok: true, folder: safe });
  } catch (e) {
    return NextResponse.json({ error: "mkdir failed" }, { status: 500 });
  }
}
