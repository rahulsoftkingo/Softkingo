import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const company = body.company?.trim() || null;
  const guideId = body.guideId;
  const guideSlug = body.guideSlug;

  if (!name || !email || !guideId) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  const eguide = await prisma.eGuide.findFirst({
    where: {
      OR: [
        { id: Number.isNaN(Number(guideId)) ? -1 : Number(guideId) },
        { slug: guideSlug || "" },
      ],
    },
  });

  await prisma.lead.create({
    data: {
      name,
      email,
      message: `E‑Guide download: ${eguide?.title || guideSlug || guideId}`,
      status: "new",
      source: "eguide",
      campaign: "eguide-download",
      formType: "eguide",
      formKey: "eguide-download",
      tags: "eguide,download",
    },
  });

  if (eguide) {
    await prisma.eGuide.update({
      where: { id: eguide.id },
      data: { downloadCount: { increment: 1 } },
    });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
