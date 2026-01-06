// src/app/api/admin/blog/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function canEdit(session) {
  const roles = session?.user?.roles || [];
  return roles.some((r) => ['admin', 'manager', 'writer'].includes(r));
}

function parseOptionalInt(v) {
  if (v === undefined) return undefined; // "not provided"
  if (v === null || v === '') return null;
  const n = Number(v);
  if (!Number.isInteger(n)) return NaN;
  return n;
}

function parseOptionalNumber(v) {
  if (v === undefined) return undefined;
  if (v === null || v === '') return null;
  const n = Number(v);
  if (!Number.isFinite(n)) return NaN;
  return n;
}

function parseOptionalDate(v) {
  if (v === undefined) return undefined; // not provided
  if (v === null || v === '') return undefined; // don’t allow null for createdAt typically
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return NaN;
  return d;
}

// GET /api/admin/blog?q=&status=&type=&page=&limit=
export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const status = searchParams.get('status') || 'all';
  const type = searchParams.get('type') || 'all';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const where = {
    ...(q
      ? {
          OR: [
            { title: { contains: q } },
            { slug: { contains: q } },
            { excerpt: { contains: q } },
          ],
        }
      : {}),
    ...(status !== 'all' ? { status } : {}),
    ...(type !== 'all' ? { type } : {}),
  };

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: true,
        tags: { include: { tag: true } },
        author: true,
      },
    }),
    prisma.blogPost.count({ where }),
  ]);

  // ✅ optional: placements parsed for list also (so UI consistent)
  const postsData = posts.map((p) => ({
    ...p,
    placements: p.placements ? safeJsonParseArray(p.placements) : [],
  }));

  return NextResponse.json({
    posts: postsData,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
}

function safeJsonParseArray(str) {
  try {
    const v = JSON.parse(str);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

// POST /api/admin/blog
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session || !canEdit(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // ✅ FIX: ensure authorId is Int (Prisma expects Int, session often provides string)
  const authorId = Number(session?.user?.id);
  if (!Number.isInteger(authorId)) {
    return NextResponse.json(
      { message: 'Invalid session user id (authorId must be an integer).' },
      { status: 400 },
    );
  }

  try {
    const body = await request.json();

    const {
      type = 'blog',
      title,
      slug,
      excerpt,
      contentJson,
      status = 'draft',
      featured = false,
      pinned = false,
      placements = [],
      thumbnail,
      thumbnailType,
      heroImage,
      readTimeMinutes,
      seoTitle,
      seoDescription,
      seoImage,
      categoryId,
      tagIds = [],
      createdAt, // ✅ NEW (admin override)
    } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { message: 'Title and slug are required.' },
        { status: 400 },
      );
    }

    const placementsJson = Array.isArray(placements)
      ? JSON.stringify(placements)
      : null;

    const categoryIdInt = parseOptionalInt(categoryId);
    if (Number.isNaN(categoryIdInt)) {
      return NextResponse.json(
        { message: 'categoryId must be an integer or null.' },
        { status: 400 },
      );
    }

    const readTimeNum = parseOptionalNumber(readTimeMinutes);
    if (Number.isNaN(readTimeNum)) {
      return NextResponse.json(
        { message: 'readTimeMinutes must be a number or null.' },
        { status: 400 },
      );
    }

    const createdAtDate = parseOptionalDate(createdAt);
    if (Number.isNaN(createdAtDate)) {
      return NextResponse.json({ message: 'Invalid createdAt.' }, { status: 400 });
    }

    const tagIdsInt = Array.isArray(tagIds)
      ? tagIds
          .map((x) => Number(x))
          .filter((x) => Number.isInteger(x))
      : [];
const thumbnailData = thumbnail ? Buffer.from(thumbnail, 'base64') : null;
const thumbnailTypeData = thumbnailType || 'image/jpeg';

    const post = await prisma.blogPost.create({
      data: {
        type,
        title,
        slug,
        placements: placementsJson,
        excerpt: excerpt || null,
        contentJson: contentJson || null,
        status,
        featured,
        pinned,
        // thumbnail: thumbnail || null,
        thumbnail: thumbnailData,
        thumbnailType: thumbnailTypeData,
        heroImage: heroImage || null,
        readTimeMinutes: readTimeNum ?? null,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        seoImage: seoImage || null,
        categoryId: categoryIdInt ?? null,

        // ✅ fixed
        authorId,

        // ✅ createdAt override (optional)
        ...(createdAtDate ? { createdAt: createdAtDate } : {}),

        tags: {
          create: tagIdsInt.map((tagId) => ({
            tag: { connect: { id: tagId } },
          })),
        },
      },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });

    const postData = {
      ...post,
      placements: post.placements ? safeJsonParseArray(post.placements) : [],
    };

    return NextResponse.json(postData, { status: 201 });
  } catch (err) {
    if (err?.code === 'P2002' && err?.meta?.target?.includes('slug')) {
      return NextResponse.json(
        { message: 'Slug already exists. Please choose a different slug.' },
        { status: 400 },
      );
    }

    console.error('Blog create error', err);
    return NextResponse.json(
      { message: 'Failed to create post.' },
      { status: 500 },
    );
  }
}