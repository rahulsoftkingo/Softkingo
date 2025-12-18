import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req, ctx) {
  // In Next 15, ctx.params is a Promise
  const { params } = ctx;
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json(
      { error: "Missing slug" },
      { status: 400 }
    );
  }

  try {
    await prisma.blogPost.update({
      where: { slug },
      data: {
        viewCount: { increment: 1 },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Increment viewCount failed:", error);
    return NextResponse.json(
      { error: "Failed to increment views" },
      { status: 500 }
    );
  }
}
