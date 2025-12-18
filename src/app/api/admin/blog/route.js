import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function canEdit(session) {
  const roles = session?.user?.roles || [];
  return roles.some((r) => ['admin', 'manager', 'writer'].includes(r));
}

// GET /api/admin/blog?q=&status=&type=
export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const status = searchParams.get('status') || 'all';
  const type = searchParams.get('type') || 'all';

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

  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      tags: { include: { tag: true } },
      author: true,
    },
  });

  return NextResponse.json(posts);
}

// POST /api/admin/blog
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session || !canEdit(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

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

  const post = await prisma.blogPost.create({
    data: {
      type,
      title,
      slug,
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
      authorId: session.user.id, // ensure session.user.id set in next-auth
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
}
