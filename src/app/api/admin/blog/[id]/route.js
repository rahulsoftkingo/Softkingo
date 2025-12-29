// src/app/api/admin/blog/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function canEdit(session) {
  const roles = session?.user?.roles || [];
  return roles.some((r) => ['admin', 'manager', 'writer'].includes(r));
}

async function getId(paramsPromise) {
  const params = await paramsPromise;
  const id = Number(params.id);
  if (!id || Number.isNaN(id)) return null;
  return id;
}

function safeJsonParseArray(str) {
  try {
    const v = JSON.parse(str);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function parseOptionalInt(v) {
  if (v === undefined) return undefined;
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
  if (v === undefined) return undefined;
  if (v === null || v === '') return undefined;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return NaN;
  return d;
}

// GET /api/admin/blog/[id]
export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = await getId(params);
  if (!id) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  const post = await prisma.blogPost.findUnique({
    where: { id },
    include: {
      category: true,
      tags: { include: { tag: true } },
      author: true,
    },
  });

  if (!post) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  const postData = {
    ...post,
    placements: post.placements ? safeJsonParseArray(post.placements) : [],
  };

  return NextResponse.json(postData);
}

// PATCH /api/admin/blog/[id]
export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !canEdit(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = await getId(params);
  if (!id) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const {
      type,
      title,
      slug,
      excerpt,
      contentJson,
      status,
      featured,
      pinned,
      placements,
      thumbnail,
      heroImage,
      readTimeMinutes,
      seoTitle,
      seoDescription,
      seoImage,
      categoryId,
      tagIds,
      createdAt, // ✅ NEW (admin override)
    } = body;

    const placementsJson =
      placements !== undefined
        ? Array.isArray(placements)
          ? JSON.stringify(placements)
          : null
        : undefined;

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

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(type !== undefined && { type }),
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(placementsJson !== undefined && { placements: placementsJson }),

        excerpt: excerpt === undefined ? undefined : excerpt || null,
        contentJson: contentJson === undefined ? undefined : contentJson || null,

        ...(status !== undefined && { status }),
        ...(featured !== undefined && { featured }),
        ...(pinned !== undefined && { pinned }),

        thumbnail: thumbnail === undefined ? undefined : thumbnail || null,
        heroImage: heroImage === undefined ? undefined : heroImage || null,

        readTimeMinutes: readTimeNum === undefined ? undefined : readTimeNum,
        seoTitle: seoTitle === undefined ? undefined : seoTitle || null,
        seoDescription:
          seoDescription === undefined ? undefined : seoDescription || null,
        seoImage: seoImage === undefined ? undefined : seoImage || null,
        categoryId: categoryIdInt === undefined ? undefined : categoryIdInt,

        ...(createdAtDate ? { createdAt: createdAtDate } : {}),

        ...(Array.isArray(tagIds)
          ? {
              tags: {
                deleteMany: {},
                create: tagIds
                  .map((x) => Number(x))
                  .filter((x) => Number.isInteger(x))
                  .map((tagId) => ({
                    tag: { connect: { id: tagId } },
                  })),
              },
            }
          : {}),
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

    return NextResponse.json(postData);
  } catch (err) {
    if (err?.code === 'P2002' && err?.meta?.target?.includes('slug')) {
      return NextResponse.json(
        { message: 'Slug already exists. Please choose a different slug.' },
        { status: 400 },
      );
    }

    console.error('Blog update error', err);
    return NextResponse.json(
      { message: 'Failed to update post.' },
      { status: 500 },
    );
  }
}

// DELETE /api/admin/blog/[id]
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !canEdit(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = await getId(params);
  if (!id) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  await prisma.blogPostTag.deleteMany({ where: { postId: id } });
  await prisma.blogPost.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
