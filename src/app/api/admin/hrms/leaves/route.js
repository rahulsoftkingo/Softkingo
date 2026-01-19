// src/app/api/admin/hrms/leaves/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const status = searchParams.get('status') || 'all';
  const type = searchParams.get('type') || '';

  const where = {
    ...(q && {
      OR: [
        { user: { name: { contains: q, mode: 'insensitive' } } },
        { user: { email: { contains: q, mode: 'insensitive' } } },
      ]
    }),
    ...(status !== 'all' && { status }),
    ...(type && { type }),
  };

  const [leaves, total] = await Promise.all([
    prisma.leaveRequest.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true, department: true } },
        approver: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.leaveRequest.count({ where })
  ]);

  return NextResponse.json({ leaves, total });
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { userId, type, startDate, endDate, duration, reason } = await request.json();
  
  const leave = await prisma.leaveRequest.create({
    data: {
      userId: Number(userId),
      type,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      duration: Number(duration),
      reason,
      status: 'pending'
    },
    include: { user: { select: { name: true } } }
  });

  return NextResponse.json(leave, { status: 201 });
}
