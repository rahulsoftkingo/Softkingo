// src/app/api/admin/podcasts/[id]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function normalizePayload(body) {
  return {
    title: body.title?.trim() || "",
    slug: body.slug?.trim() || "",
    episodeNumber:
      body.episodeNumber === "" || body.episodeNumber === null || body.episodeNumber === undefined
        ? null
        : parseInt(body.episodeNumber, 10),
    hostName: body.hostName || null,
    hostRole: body.hostRole || null,
    guestName: body.guestName || null,
    coverImage: body.coverImage || null,
    category: body.category || null,
    description: body.description || null,
    durationText: body.durationText || null,
    summary: body.summary || null,
    segmentsJson: body.segmentsJson || null,
    audioUrl: body.audioUrl || null,
    status: body.status || "draft",
    publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
  };
}

// GET /api/admin/podcasts/[id] -> fetch a single episode
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const episode = await prisma.podcast.findUnique({ where: { id } });

    if (!episode) {
      return NextResponse.json({ error: "Episode not found" }, { status: 404 });
    }

    return NextResponse.json(episode);
  } catch (err) {
    console.error("GET /api/admin/podcasts/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch podcast" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/podcasts/[id] -> update an episode
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!body.title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!body.slug?.trim()) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const data = normalizePayload(body);

    const slugOwner = await prisma.podcast.findUnique({
      where: { slug: data.slug },
    });
    if (slugOwner && slugOwner.id !== id) {
      return NextResponse.json(
        { error: "Slug already in use, please choose a different one" },
        { status: 409 }
      );
    }

    const episode = await prisma.podcast.update({
      where: { id },
      data,
    });

    return NextResponse.json(episode);
  } catch (err) {
    console.error("PUT /api/admin/podcasts/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to update podcast" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/podcasts/[id] -> delete an episode
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await prisma.podcast.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/admin/podcasts/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to delete podcast" },
      { status: 500 }
    );
  }
}