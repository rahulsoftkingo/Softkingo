import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendWhatsAppText } from '@/lib/whatsapp';

// POST /api/admin/whatsapp/campaigns/:id/send
export async function POST(req, { params }) {
  try {
    const id = Number(params.id);
    const campaign = await prisma.emailCampaign.findUnique({
      where: { id },
      include: {
        list: {
          include: {
            subscribers: true,
          },
        },
      },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }

    const subs = campaign.list?.subscribers || [];

    // WARNING: for production do this via background job, not direct loop
    for (const sub of subs) {
      if (!sub.whatsapp) continue;
      try {
        await sendWhatsAppText({
          to: sub.whatsapp,
          text: campaign.contentText || '',
        });
      } catch (e) {
        console.error('WA campaign send error for', sub.email, e);
      }
    }

    await prisma.emailCampaign.update({
      where: { id },
      data: {
        status: 'sent',
        sentAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('WA campaign send error:', error);
    return NextResponse.json(
      { error: 'Failed to send campaign' },
      { status: 500 }
    );
  }
}
