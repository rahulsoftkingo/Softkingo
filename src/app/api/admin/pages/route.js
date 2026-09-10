import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/pages?status=all|draft|published&type=hire|service|...
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const type = searchParams.get('type') || undefined;

    const where = {};
    if (status !== 'all') where.status = status;
    if (type) where.type = type;

    const pages = await prisma.page.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ pages });
  } catch (error) {
    console.error('Admin pages GET error:', error);
    return NextResponse.json({ error: 'Failed to load pages' }, { status: 500 });
  }
}

// POST /api/admin/pages
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      title,
      slug,
      key,
      excerpt,
      status,
      type,
      featured,
      seoTitle,
      seoDescription,
      seoImage,
      contentJson,
    } = body;

    if (!title || !slug || !key || !type) {
      return NextResponse.json(
        { error: 'title, slug, key, type are required' },
        { status: 400 }
      );
    }

    const page = await prisma.page.create({
      data: {
        title,
        slug,
        key,
        excerpt: excerpt || '',
        status: status || 'published',
        type,
        featured: !!featured,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        seoImage: seoImage || null,
        contentJson: contentJson || null,
      },
    });

    return NextResponse.json({ page }, { status: 201 });
  } catch (error) {
    console.error('Admin pages POST error:', error);
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}
