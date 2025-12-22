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

  // ✅ Parse placements from JSON
  const postData = {
    ...post,
    placements: post.placements ? JSON.parse(post.placements) : [],
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
      placements, // ✅ NEW
      thumbnail,
      heroImage,
      readTimeMinutes,
      seoTitle,
      seoDescription,
      seoImage,
      categoryId,
      tagIds,
    } = body;

    // ✅ Convert placements to JSON string
    const placementsJson = placements !== undefined
      ? (Array.isArray(placements) ? JSON.stringify(placements) : null)
      : undefined;

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(type !== undefined && { type }),
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(placementsJson !== undefined && { placements: placementsJson }), // ✅ NEW
        excerpt: excerpt === undefined ? undefined : excerpt || null,
        contentJson:
          contentJson === undefined ? undefined : contentJson || null,
        ...(status !== undefined && { status }),
        ...(featured !== undefined && { featured }),
        ...(pinned !== undefined && { pinned }),
        thumbnail: thumbnail === undefined ? undefined : thumbnail || null,
        heroImage: heroImage === undefined ? undefined : heroImage || null,
        readTimeMinutes:
          readTimeMinutes === undefined ? undefined : readTimeMinutes || null,
        seoTitle: seoTitle === undefined ? undefined : seoTitle || null,
        seoDescription:
          seoDescription === undefined ? undefined : seoDescription || null,
        seoImage: seoImage === undefined ? undefined : seoImage || null,
        categoryId:
          categoryId === undefined ? undefined : categoryId || null,
        ...(Array.isArray(tagIds)
          ? {
              tags: {
                deleteMany: {},
                create: tagIds.map((tagId) => ({
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

    // ✅ Parse placements for response
    const postData = {
      ...post,
      placements: post.placements ? JSON.parse(post.placements) : [],
    };

    return NextResponse.json(postData);
  } catch (err) {
    // ✅ Handle duplicate slug
    if (err.code === 'P2002' && err.meta?.target?.includes('slug')) {
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
