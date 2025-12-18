import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/mail';

// POST /api/admin/email-campaigns/[id]/send
export async function POST(request, { params }) {
  // ⬇️ yahan params ko await karna hai
  const { id: rawId } = await params;
  const id = Number(rawId);

  if (!id || Number.isNaN(id)) {
    return NextResponse.json(
      { error: 'Invalid campaign id' },
      { status: 400 }
    );
  }

  try {
    const campaign = await prisma.emailCampaign.findUnique({
      where: { id },
      include: {
        list: {
          include: {
            subscribers: {
              where: { status: 'active' },
            },
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

    const subscribers = campaign.list?.subscribers || [];
    if (subscribers.length === 0) {
      return NextResponse.json(
        { error: 'No active subscribers in this list' },
        { status: 400 }
      );
    }

    for (const sub of subscribers) {
      const vars = {
        name: sub.name || '',
        email: sub.email,
      };

      const subject = replaceVars(campaign.subject, vars);
      const text = replaceVars(campaign.contentText || '', vars);
      const html = campaign.contentHtml
        ? replaceVars(campaign.contentHtml, vars)
        : undefined;

      try {
        await sendEmail({
          to: sub.email,
          subject,
          text: text || undefined,
          html,
        });

        await prisma.emailDeliveryLog.create({
          data: {
            email: sub.email,
            event: 'sent',
            providerId: 'smtp',
            metaJson: JSON.stringify({
              subscriptionId: sub.id,
              campaignId: campaign.id,
            }),
            campaignId: campaign.id,
          },
        });
      } catch (err) {
        console.error('Send error for', sub.email, err);
        await prisma.emailDeliveryLog.create({
          data: {
            email: sub.email,
            event: 'error',
            providerId: 'smtp',
            metaJson: JSON.stringify({
              subscriptionId: sub.id,
              campaignId: campaign.id,
              error: String(err),
            }),
            campaignId: campaign.id,
          },
        });
      }
    }

    await prisma.emailCampaign.update({
      where: { id: campaign.id },
      data: {
        status: 'sent',
        sentAt: new Date(),
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Campaign send error:', error);
    return NextResponse.json(
      { error: 'Failed to send campaign' },
      { status: 500 }
    );
  }
}

function replaceVars(template = '', vars = {}) {
  let out = template;
  Object.keys(vars).forEach((key) => {
    const re = new RegExp(`\\{${key}\\}`, 'g');
    out = out.replace(re, vars[key] ?? '');
  });
  return out;
}
