// src/app/api/public/blog/[slug]/like/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// export async function POST(req, { params }) {
//   const slug = params?.slug;
export async function POST(req, ctx) {
  // Unwrap params Promise (Next 15)
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
        likeCount: { increment: 1 },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Increment likeCount failed:", error);
    return NextResponse.json(
      { error: "Failed to increment likes" },
      { status: 500 }
    );
  }
}
