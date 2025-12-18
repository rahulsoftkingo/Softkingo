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

  return NextResponse.json(post);
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
    thumbnail,
    heroImage,
    readTimeMinutes,
    seoTitle,
    seoDescription,
    seoImage,
    categoryId,
    tagIds,
  } = body;

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...(type !== undefined && { type }),
      ...(title !== undefined && { title }),
      ...(slug !== undefined && { slug }),
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
              deleteMany: {}, // remove existing mappings
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

  return NextResponse.json(post);
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
