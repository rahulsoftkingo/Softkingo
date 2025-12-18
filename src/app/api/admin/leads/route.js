import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function isAdminOrManager(session) {
  const roles = session?.user?.roles || [];
  return roles.includes('admin') || roles.includes('manager');
}

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const status = searchParams.get('status') || 'all';
  const source = searchParams.get('source') || 'all';
  const formType = searchParams.get('formType') || 'all';
  const ownerId = searchParams.get('ownerId') || 'all';
  const scope = searchParams.get('scope') || 'mine'; // 'mine' | 'team'

  const where = q
    ? {
        OR: [
          { name: { contains: q } },
          { email: { contains: q } },
          { phone: { contains: q } },
          { whatsapp: { contains: q } },
          { campaign: { contains: q } },
          { message: { contains: q } },
        ],
      }
    : {};

  if (status !== 'all') where.status = status;
  if (source !== 'all') where.source = source;
  if (formType !== 'all') where.formType = formType;
  if (ownerId !== 'all') where.ownerId = Number(ownerId);

  // Scope: MY leads by default
  if (scope === 'mine') {
    const userId = session.user?.id;
    if (userId) {
      where.OR = (where.OR || []).concat([
        { ownerId: userId },
        { ownerId: null },
      ]);
    }
  } else {
    // Team scope only for admin/manager
    if (!isAdminOrManager(session)) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  const leads = await prisma.lead.findMany({
    where,
    include: {
      owner: {
        select: { id: true, name: true, email: true, username: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(leads);
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session || !isAdminOrManager(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const {
    name,
    email,
    phone,
    whatsapp,
    source,
    campaign,
    message,
    status,
    tags,
    formType,
    formKey,
    utmSource,
    utmMedium,
    utmCampaign,
    budgetLabel,
    attachmentName,
    ndaAccepted,
    ownerId,
  } = body;

  if (!name || !email) {
    return NextResponse.json(
      { message: 'Name and email are required.' },
      { status: 400 }
    );
  }

  const lead = await prisma.lead.create({
    data: {
      name,
      email,
      phone,
      whatsapp,
      source,
      campaign,
      message,
      status: status || 'new',
      tags,
      formType,
      formKey,
      utmSource,
      utmMedium,
      utmCampaign,
      budgetLabel,
      attachmentName,
      ndaAccepted:
        typeof ndaAccepted === 'boolean' ? ndaAccepted : null,
      ownerId: ownerId ? Number(ownerId) : null,
    },
  });

  return NextResponse.json(lead, { status: 201 });
}
