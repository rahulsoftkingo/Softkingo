import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/email-campaigns
export async function GET() {
  try {
    const campaigns = await prisma.emailCampaign.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        list: true, // NewsletterList
      },
    });

    return NextResponse.json({ campaigns });
  } catch (error) {
    console.error('EmailCampaigns GET error:', error);
    return NextResponse.json(
      { error: 'Failed to load campaigns' },
      { status: 500 }
    );
  }
}

// POST /api/admin/email-campaigns
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      subject,
      listId,
      contentHtml,
      contentText,
      scheduledFor,
    } = body;

    if (!name || !listId) {
      return NextResponse.json(
        { error: 'name and listId are required' },
        { status: 400 }
      );
    }

    const campaign = await prisma.emailCampaign.create({
      data: {
        name,
        subject: subject || name,
        preheader: null,
        slug: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        status: 'draft',
        contentHtml: contentHtml || null,
        contentText: contentText || '',
        providerId: 'email',
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        listId: Number(listId),
      },
    });

    return NextResponse.json({ campaign }, { status: 201 });
  } catch (error) {
    console.error('EmailCampaigns POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    );
  }
}
