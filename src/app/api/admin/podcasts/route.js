// src/app/api/admin/podcasts/route.js
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
    coverImage,
    category,
    language,
    frequency,

    hostName,
    hostRole,
    hostAvatar,

    rating,
    followersCount,
    episodeCount,

    latestEpisodeTitle,
    latestEpisodeAudioUrl,
    latestEpisodeDuration,

    description,
    summary,
    aboutText,
    quoteText,
    quoteAuthor,
    whatItsAbout,
    whoShouldListen,

    topicsJson,
    socialLinksJson,
    platformLinksJson,

    status,
    publishedAt,
  } = body;

  // ---------------------------------------
  // Validation
  // ---------------------------------------

  if (!title?.trim() || !slug?.trim()) {
    return NextResponse.json(
      { error: "Title and slug are required" },
      { status: 400 }
    );
  }

  // ---------------------------------------
  // Date Parser
  // ---------------------------------------

  let parsedPublishedAt = null;

  if (publishedAt) {
    const d = new Date(publishedAt);

    if (!isNaN(d.getTime())) {
      parsedPublishedAt = d;
    }
  }

  // ---------------------------------------
  // Rating Parser
  // ---------------------------------------

  let parsedRating = null;

  if (
    rating !== undefined &&
    rating !== null &&
    rating !== ""
  ) {
    const n = parseFloat(rating);

    if (!isNaN(n)) {
      parsedRating = n;
    }
  }

  // ---------------------------------------
  // Number Parsers
  // ---------------------------------------

  const parsedFollowersCount =
    Number.isFinite(Number(followersCount))
      ? Math.max(0, parseInt(followersCount, 10))
      : 0;

  const parsedEpisodeCount =
    Number.isFinite(Number(episodeCount))
      ? Math.max(0, parseInt(episodeCount, 10))
      : 0;

  // ---------------------------------------
  // JSON/String Parser
  //
  // Your Prisma fields appear to be String?
  // Therefore arrays/objects are converted
  // into JSON strings before saving.
  // ---------------------------------------

  const sanitizeJson = (value) => {
    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return null;
    }

    // Already a string
    if (typeof value === "string") {
      // Check if it is valid JSON.
      try {
        JSON.parse(value);
        return value;
      } catch {
        // If normal text was provided,
        // store it as-is.
        return value;
      }
    }

    // Array or Object
    if (typeof value === "object") {
      try {
        return JSON.stringify(value);
      } catch {
        return null;
      }
    }

    return null;
  };

  // ---------------------------------------
  // Create Podcast
  // ---------------------------------------

  try {
    const newPodcast = await prisma.podcast.create({
      data: {
        title: title.trim(),
        slug: slug.trim().toLowerCase(),

        coverImage: coverImage || null,
        category: category || null,
        language: language || "English",
        frequency: frequency || null,

        hostName: hostName || null,
        hostRole: hostRole || null,
        hostAvatar: hostAvatar || null,

        rating: parsedRating,
        followersCount: parsedFollowersCount,
        episodeCount: parsedEpisodeCount,

        latestEpisodeTitle:
          latestEpisodeTitle || null,

        latestEpisodeAudioUrl:
          latestEpisodeAudioUrl || null,

        latestEpisodeDuration:
          latestEpisodeDuration || null,

        description: description || null,
        summary: summary || null,
        aboutText: aboutText || null,

        quoteText: quoteText || null,
        quoteAuthor: quoteAuthor || null,

        whatItsAbout:
          whatItsAbout || null,

        whoShouldListen:
          whoShouldListen || null,

        // IMPORTANT:
        // Convert arrays/objects to strings
        topicsJson: sanitizeJson(topicsJson),

        socialLinksJson:
          sanitizeJson(socialLinksJson),

        platformLinksJson:
          sanitizeJson(platformLinksJson),

        status: status || "draft",
        publishedAt: parsedPublishedAt,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newPodcast,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(
      "POST /api/admin/podcasts error:",
      err
    );

    // ---------------------------------------
    // Duplicate slug
    // ---------------------------------------

    if (err.code === "P2002") {
      return NextResponse.json(
        {
          error:
            "Slug already in use, please choose a different one",
        },
        { status: 409 }
      );
    }

    // ---------------------------------------
    // Prisma validation / invalid data
    // ---------------------------------------

    if (
      err.code === "P2009" ||
      err.code === "P2006"
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid data format provided for database fields",
        },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        error:
          "Something went wrong while creating the podcast",
      },
      { status: 500 }
    );
  }
}
