import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const where = status && status !== 'all' ? { type: 'service', status } : { type: 'service' };

    const services = await prisma.page.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            name: true,
            profileImage: true,
          },
        },
      },
    });

    return NextResponse.json({ services });
  } catch (error) {
    console.error('Get services error:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, slug, excerpt, status, featured, seoTitle, seoDescription, seoImage, activeSections, content } = body;

    // Generate unique key from slug
    const key = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const contentDataString = JSON.stringify({
      activeSections: activeSections || [],
      content: content || {}
    });

    const service = await prisma.page.create({
      data: {
        title: title,
        slug: slug,
        key: key,
        type: 'service',
        excerpt: excerpt || null,
        contentJson: contentDataString,
        status: status || 'draft',
        featured: featured || false,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt || null,
        seoImage: seoImage || null,
      },
    });

    return NextResponse.json({ service });
  } catch (error) {
    console.error('Create service error:', error);
    return NextResponse.json({
      error: 'Failed to create service',
      details: error.message
    }, { status: 500 });
  }
}
