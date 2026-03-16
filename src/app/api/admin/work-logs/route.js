import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function isAdminOrManager(session) {
  const roles = session?.user?.roles || [];
  return roles.includes('admin') || roles.includes('manager');
}

function calculateDuration(start, end) {
  if (!start || !end) return 0;
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  
  if (isNaN(sh) || isNaN(sm) || isNaN(eh) || isNaN(em)) return 0;
  
  let diff = (eh * 60 + em) - (sh * 60 + sm);
  if (diff < 0) diff += 1440; // Handle cross-midnight logs
  return diff;
}

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userIdParam = searchParams.get('userId');
  const dateParam = searchParams.get('date'); // YYYY-MM-DD (legacy/simple)
  const startDateParam = searchParams.get('startDate'); // YYYY-MM-DD
  const endDateParam = searchParams.get('endDate'); // YYYY-MM-DD
  const ticketId = searchParams.get('ticketId');

  const currentUserId = parseInt(session.user.id, 10);
  const isPrivileged = isAdminOrManager(session);

  const where = {};

  // Strict RBAC: Regular users can only see their own logs
  if (!isPrivileged) {
    where.userId = currentUserId;
  } else if (userIdParam && userIdParam !== 'all') {
    where.userId = parseInt(userIdParam, 10);
  }

  // Date Filtering logic
  if (startDateParam && endDateParam) {
    // Range filter
    const start = new Date(startDateParam);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDateParam);
    end.setHours(23, 59, 59, 999);
    
    where.date = {
      gte: start,
      lte: end,
    };
  } else if (dateParam) {
    // Single day filter
    where.date = new Date(dateParam);
  }

  if (ticketId) {
    where.ticketId = parseInt(ticketId, 10);
  }

  try {
    const logs = await prisma.workLog.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, username: true } },
        ticket: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(logs);
  } catch (err) {
    console.error('WorkLog GET error:', err);
    return NextResponse.json({ message: 'Failed to fetch work logs' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { description, startTime, endTime, date, ticketId } = body;

    if (!description || !date) {
      return NextResponse.json({ message: 'Description and Date are required' }, { status: 400 });
    }

    const currentUserId = parseInt(session.user.id, 10);
    const duration = calculateDuration(startTime, endTime);

    const log = await prisma.workLog.create({
      data: {
        userId: currentUserId,
        ticketId: ticketId ? parseInt(ticketId, 10) : null,
        description,
        startTime,
        endTime,
        duration,
        date: new Date(date),
      },
      include: {
        user: { select: { id: true, name: true, username: true } },
        ticket: { select: { id: true, title: true } },
      },
    });

    return NextResponse.json(log, { status: 201 });
  } catch (err) {
    console.error('WorkLog POST error:', err);
    return NextResponse.json({ message: 'Failed to create work log' }, { status: 500 });
  }
}
