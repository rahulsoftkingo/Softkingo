import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  let body = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const name = body.name?.trim();
  let slug = body.slug?.trim() || null;
  const description = body.description?.trim() || null;

  if (!name) {
    return NextResponse.json(
      { error: "Name is required" },
      { status: 400 }
    );
  }

  if (!slug) {
    slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  try {
    const list = await prisma.newsletterList.create({
      data: {
        name,
        slug,
        description,
      },
    });

    return NextResponse.json(
      { id: list.id, slug: list.slug },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create newsletter list failed:", error);
    return NextResponse.json(
      { error: "Failed to create list" },
      { status: 500 }
    );
  }
}
