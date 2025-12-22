// src/app/api/admin/blog/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function canEdit(session) {
  const roles = session?.user?.roles || [];
  return roles.some((r) => ['admin', 'manager', 'writer'].includes(r));
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
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

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

  return NextResponse.json({
    posts,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
}

// POST remains same as before...
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session || !canEdit(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
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
      heroImage,
      readTimeMinutes,
      seoTitle,
      seoDescription,
      seoImage,
      categoryId,
      tagIds = [],
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
        thumbnail: thumbnail || null,
        heroImage: heroImage || null,
        readTimeMinutes: readTimeMinutes || null,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        seoImage: seoImage || null,
        categoryId: categoryId || null,
        authorId: session.user.id,
        tags: {
          create: tagIds.map((tagId) => ({
            tag: { connect: { id: tagId } },
          })),
        },
      },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    if (err.code === 'P2002' && err.meta?.target?.includes('slug')) {
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
