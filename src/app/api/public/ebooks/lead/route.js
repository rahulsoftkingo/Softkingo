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
  const ebookId = body.ebookId || body.guideId;
  const ebookSlug = body.ebookSlug || body.guideSlug;

  if (!name || !email || !ebookId) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  const ebook = await prisma.ebook.findFirst({
    where: {
      OR: [
        { id: Number.isNaN(Number(ebookId)) ? -1 : Number(ebookId) },
        { slug: ebookSlug || "" },
      ],
    },
  });

  await prisma.lead.create({
    data: {
      name,
      email,
      message: `Ebook download: ${ebook?.title || ebookSlug || ebookId}`,
      status: "new",
      source: "ebook",
      campaign: "ebook-download",
      formType: "ebook",
      formKey: "ebook-download",
      tags: "ebook,download",
    },
  });

  if (ebook) {
    await prisma.ebook.update({
      where: { id: ebook.id },
      data: { downloadCount: { increment: 1 } },
    });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
