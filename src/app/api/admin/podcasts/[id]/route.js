// src/app/api/admin/podcasts/[id]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function normalizePayload(body) {
  const parseRating = () => {
    if (body.rating === "" || body.rating === null || body.rating === undefined) return null;
    const n = parseFloat(body.rating);
    return isNaN(n) ? null : n;
  };

  const parseIntOrZero = (val) => {
    const n = parseInt(val, 10);
    return isNaN(n) ? 0 : n;
  };

  return {
    title: body.title?.trim() || "",
    slug: body.slug?.trim() || "",
    coverImage: body.coverImage || null,
    category: body.category || null,
    language: body.language || "English",
    frequency: body.frequency || null,

    hostName: body.hostName || null,
    hostRole: body.hostRole || null,
    hostAvatar: body.hostAvatar || null,

    rating: parseRating(),
    followersCount: parseIntOrZero(body.followersCount),
    episodeCount: parseIntOrZero(body.episodeCount),

    latestEpisodeTitle: body.latestEpisodeTitle || null,
    latestEpisodeAudioUrl: body.latestEpisodeAudioUrl || null,
    latestEpisodeDuration: body.latestEpisodeDuration || null,

    description: body.description || null,
    summary: body.summary || null,
    aboutText: body.aboutText || null,
    quoteText: body.quoteText || null,
    quoteAuthor: body.quoteAuthor || null,
    whatItsAbout: body.whatItsAbout || null,
    whoShouldListen: body.whoShouldListen || null,

    topicsJson: body.topicsJson || null,
    socialLinksJson: body.socialLinksJson || null,
    platformLinksJson: body.platformLinksJson || null,

    status: body.status || "draft",
    publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
  };
}

// GET /api/admin/podcasts/[id] -> fetch a single podcast
export async function GET(request, context) {
  try {
    const { id } = await context.params;
    const podcast = await prisma.podcast.findUnique({ where: { id } });

    if (!podcast) {
      return NextResponse.json({ error: "Podcast not found" }, { status: 404 });
    }

    return NextResponse.json(podcast);
  } catch (err) {
    console.error("GET /api/admin/podcasts/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch podcast" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/podcasts/[id] -> update a podcast
export async function PUT(request, context) {
  try {
    const { id } = await context.params;
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

    const podcast = await prisma.podcast.update({
      where: { id },
      data,
    });

    return NextResponse.json(podcast);
  } catch (err) {
    console.error("PUT /api/admin/podcasts/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to update podcast" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/podcasts/[id] -> delete a podcast
export async function DELETE(request, context) {
  try {
    const { id } = await context.params;
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