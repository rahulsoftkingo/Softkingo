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

    // Generate unique key from slug
    const key = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const service = await prisma.page.create({
      data: {
        title: body.title,
        slug: body.slug,
        key: key,
        type: 'service',
        excerpt: body.excerpt || null,
        // Remove content field - it doesn't exist in schema
        contentJson: body.contentJson,
        status: body.status || 'draft',
        featured: body.featured || false,
        seoTitle: body.seoTitle || body.title,
        seoDescription: body.seoDescription || body.excerpt || null,
        seoImage: body.seoImage || null,
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
