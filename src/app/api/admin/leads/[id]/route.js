import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function isAdminOrManager(session) {
  const roles = session?.user?.roles || [];
  return roles.includes('admin') || roles.includes('manager');
}

// Next 15: params is Promise, unwrap helper
async function getIdFromParams(paramsPromise) {
  const p = await paramsPromise;
  const id = Number(p.id);
  if (!id || Number.isNaN(id)) return null;
  return id;
}

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = await getIdFromParams(params);
  if (!id) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      owner: {
        select: { id: true, name: true, email: true, username: true },
      },
      activities: {
        include: {
          createdBy: { select: { id: true, name: true, username: true } },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!lead) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(lead);
}

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = await getIdFromParams(params);
  if (!id) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
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
    ownerId,
    budgetLabel,
    ndaAccepted,
    attachmentName,
  } = body;

  const lead = await prisma.lead.update({
    where: { id },
    data: {
      name,
      email,
      phone,
      whatsapp,
      source,
      campaign,
      message,
      status,
      tags,
      ownerId: ownerId ? Number(ownerId) : null,
      budgetLabel,
      ndaAccepted:
        typeof ndaAccepted === 'boolean' ? ndaAccepted : undefined,
      attachmentName,
    },
    include: {
      owner: {
        select: { id: true, name: true, email: true, username: true },
      },
    },
  });

  return NextResponse.json(lead);
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !isAdminOrManager(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = await getIdFromParams(params);
  if (!id) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  await prisma.lead.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
