import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req, { params }) {
  const id = Number((await params).id);
  if (!id || Number.isNaN(id)) {
    return NextResponse.json(
      { error: "Invalid ID" },
      { status: 400 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const {
    title,
    slug,
    authorName,
    authorRole,
    coverImage,
    category,
    description,
    readTimeText,
    summary,
    sectionsJson,
    pdfUrl,
    status,
    publishedAt,
  } = body;

  if (!title || !slug) {
    return NextResponse.json(
      { error: "Title and slug are required" },
      { status: 400 }
    );
  }

  let parsedPublishedAt = null;
  if (publishedAt) {
    const d = new Date(publishedAt);
    if (!isNaN(d.getTime())) parsedPublishedAt = d;
  }

  await prisma.ebook.update({
    where: { id },
    data: {
      title,
      slug,
      authorName: authorName || null,
      authorRole: authorRole || null,
      coverImage: coverImage || null,
      category: category || null,
      description: description || null,
      readTimeText: readTimeText || null,
      summary: summary || null,
      sectionsJson: sectionsJson || null,
      pdfUrl: pdfUrl || null,
      status: status || "draft",
      publishedAt: parsedPublishedAt,
    },
  });

  return NextResponse.json({ success: true });
}
