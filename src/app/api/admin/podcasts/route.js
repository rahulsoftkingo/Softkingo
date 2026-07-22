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

  const {
    title,
    slug,
    episodeNumber,
    hostName,
    hostRole,
    guestName,
    coverImage,
    category,
    description,
    durationText,
    summary,
    segmentsJson,
    audioUrl,
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

  let parsedEpisodeNumber = null;
  if (episodeNumber !== undefined && episodeNumber !== null && episodeNumber !== "") {
    const n = parseInt(episodeNumber, 10);
    if (!isNaN(n)) parsedEpisodeNumber = n;
  }

  try {
    await prisma.podcast.create({
      data: {
        title,
        slug,
        episodeNumber: parsedEpisodeNumber,
        hostName: hostName || null,
        hostRole: hostRole || null,
        guestName: guestName || null,
        coverImage: coverImage || null,
        category: category || null,
        description: description || null,
        durationText: durationText || null,
        summary: summary || null,
        segmentsJson: segmentsJson || null,
        audioUrl: audioUrl || null,
        status: status || "draft",
        publishedAt: parsedPublishedAt,
      },
    });
  } catch (err) {
    console.error("POST /api/admin/podcasts error:", err);

    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Slug already in use, please choose a different one" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong while creating the episode" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}