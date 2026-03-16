import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  const body = await request.json();

  const {
    // common
    name,
    email,
    phone,
    whatsapp,
    message,

    // optional business fields
    company,
    campaign,
    source,

    // form routing
    formType,   // 'inquiry' | 'service' | 'ebook' | 'hire' | ...
    formKey,    // e.g. 'home-inquiry', 'service-web-dev', 'eguide-ai'

    // marketing
    utmSource,
    utmMedium,
    utmCampaign,

    // extra
    budgetLabel,
    attachmentName,
    ndaAccepted,
    tags,
  } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: 'Name, email and message are required.' },
      { status: 400 }
    );
  }

  const mergedTags = [
    tags || null,
    company ? `company:${company}` : null,
  ]
    .filter(Boolean)
    .join(',');

  const lead = await prisma.lead.create({
    data: {
      name,
      email,
      phone,
      whatsapp,
      message,
      source: source || 'website',
      campaign: campaign || budgetLabel || company || null,
      status: 'new',

      formType: formType || 'inquiry',
      formKey: formKey || null,

      utmSource,
      utmMedium,
      utmCampaign,

      budgetLabel: budgetLabel || null,
      attachmentName: attachmentName || null,
      ndaAccepted: typeof ndaAccepted === 'boolean' ? ndaAccepted : null,

      tags: mergedTags || null,
    },
  });

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}
