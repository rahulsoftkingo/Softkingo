import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/whatsapp/campaigns
// Returns WhatsApp campaigns (reusing EmailCampaign table with a type flag)
export async function GET() {
  try {
    const campaigns = await prisma.emailCampaign.findMany({
      where: {
        // Example: use providerId to mark WhatsApp campaigns
        providerId: 'whatsapp',
      },
      orderBy: { createdAt: 'desc' },
      include: {
        list: true,
      },
    });

    return NextResponse.json({ campaigns });
  } catch (error) {
    console.error('WA campaigns GET error:', error);
    return NextResponse.json(
      { error: 'Failed to load campaigns' },
      { status: 500 }
    );
  }
}

// POST /api/admin/whatsapp/campaigns
// Creates a new WhatsApp campaign (only meta, sending logic will be separate)
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      subject,       // internal title
      listId,        // NewsletterList id to target audience
      contentText,   // actual WhatsApp message body
      scheduledFor,  // optional schedule date
    } = body;

    if (!name || !listId || !contentText) {
      return NextResponse.json(
        { error: 'name, listId and contentText are required' },
        { status: 400 }
      );
    }

    const campaign = await prisma.emailCampaign.create({
      data: {
        name,
        subject: subject || name,
        preheader: null,
        slug: `${Date.now()}-wa`,
        status: 'draft',
        contentHtml: null,
        contentText,
        providerId: 'whatsapp',
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        listId,
      },
    });

    return NextResponse.json({ campaign }, { status: 201 });
  } catch (error) {
    console.error('WA campaigns POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    );
  }
}
