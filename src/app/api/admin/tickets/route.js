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
  const priority = searchParams.get('priority') || 'all';
  const channel = searchParams.get('channel') || 'all';
  const ownerId = searchParams.get('ownerId') || 'all';
  const scope = searchParams.get('scope') || 'mine'; // 'mine' | 'team'

  const where = q
    ? {
        OR: [
          { title: { contains: q } },
          { description: { contains: q } },
          { tags: { contains: q } },
        ],
      }
    : {};

  if (status !== 'all') where.status = status;
  if (priority !== 'all') where.priority = priority;
  if (channel !== 'all') where.channel = channel;
  if (ownerId !== 'all') where.ownerId = Number(ownerId);

  if (scope === 'mine') {
    const userId = session.user?.id;
    if (userId) {
      where.OR = (where.OR || []).concat([
        { ownerId: userId },
        { requesterId: userId },
      ]);
    }
  } else {
    if (!isAdminOrManager(session)) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  const tickets = await prisma.ticket.findMany({
    where,
    include: {
      owner: { select: { id: true, name: true, username: true, email: true } },
      requester: {
        select: { id: true, name: true, username: true, email: true },
      },
      lead: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(tickets);
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
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
  } = body;

  if (!title) {
    return NextResponse.json(
      { message: 'Title is required.' },
      { status: 400 }
    );
  }

  const ticket = await prisma.ticket.create({
    data: {
      title,
      description,
      status: status || 'open',
      priority: priority || 'medium',
      channel: channel || 'internal',
      tags,
      leadId: leadId || null,
      requesterId: requesterId || session.user?.id || null,
      ownerId: ownerId || null,
      dueDate: dueDate ? new Date(dueDate) : null,
    },
  });

  return NextResponse.json(ticket, { status: 201 });
}
