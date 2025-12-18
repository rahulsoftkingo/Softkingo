import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

  let body = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const rating = Number(body.rating);
  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Rating must be between 1 and 5" },
      { status: 400 }
    );
  }

  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    await prisma.blogFeedback.create({
      data: {
        postId: post.id,
        rating,
        comment: body.comment || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save feedback failed:", error);
    return NextResponse.json(
      { error: "Failed to save feedback" },
      { status: 500 }
    );
  }
}
