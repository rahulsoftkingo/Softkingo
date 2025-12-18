import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/newsletters
export async function GET() {
  try {
    const lists = await prisma.newsletterList.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        subscribers: true,
        campaigns: true,
      },
    });

    const data = lists.map((l) => ({
      id: l.id,
      name: l.name,
      slug: l.slug,
      description: l.description,
      subscriberCount: l.subscribers.length,
      campaignCount: l.campaigns.length,
      createdAt: l.createdAt,
    }));

    return NextResponse.json({ lists: data });
  } catch (error) {
    console.error('Newsletters GET error:', error);
    return NextResponse.json(
      { error: 'Failed to load lists' },
      { status: 500 }
    );
  }
}
