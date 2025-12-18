import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function isAdminOrManager(session) {
  const roles = session?.user?.roles || [];
  return roles.includes('admin') || roles.includes('manager');
}

// Next 15: params is Promise
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

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      owner: { select: { id: true, name: true, username: true, email: true } },
      requester: {
        select: { id: true, name: true, username: true, email: true },
      },
      lead: { select: { id: true, name: true, email: true } },
      comments: {
        include: {
          createdBy: {
            select: { id: true, name: true, username: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!ticket) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(ticket);
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
    title,
    description,
    status,
    priority,
    channel,
    tags,
    leadId,
    requesterId,
    ownerId,
    dueDate,
    resolvedAt,
  } = body;

  const ticket = await prisma.ticket.update({
    where: { id },
    data: {
      title,
      description,
      status,
      priority,
      channel,
      tags,
      leadId,
      requesterId,
      ownerId,
      dueDate: dueDate === undefined ? undefined : dueDate ? new Date(dueDate) : null,
      resolvedAt:
        resolvedAt === undefined ? undefined : resolvedAt ? new Date(resolvedAt) : null,
    },
    include: {
      owner: { select: { id: true, name: true, username: true, email: true } },
      requester: {
        select: { id: true, name: true, username: true, email: true },
      },
    },
  });

  return NextResponse.json(ticket);
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

  await prisma.ticketComment.deleteMany({ where: { ticketId: id } });
  await prisma.ticket.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
