import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req, ctx) {
  const { params } = ctx;
  const { id } = await params;
  const listId = Number(id);

  let body = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const name = body.name?.trim();
  const subject = body.subject?.trim();
  const preheader = body.preheader?.trim() || null;
  const contentHtml = body.contentHtml || "";
  const status = body.status || "draft";

  if (!name || !subject) {
    return NextResponse.json(
      { error: "Name and subject are required" },
      { status: 400 }
    );
  }

  try {
    const list = await prisma.newsletterList.findUnique({
      where: { id: listId },
    });

    if (!list) {
      return NextResponse.json(
        { error: "List not found" },
        { status: 404 }
      );
    }

    const slugBase = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const slug = `${slugBase}-${Date.now()}`;

    await prisma.emailCampaign.create({
      data: {
        name,
        subject,
        preheader,
        slug,
        status, // 'draft' | 'scheduled' | 'sent'
        contentHtml,
        listId: list.id,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Create campaign failed:", error);
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 }
    );
  }
}
