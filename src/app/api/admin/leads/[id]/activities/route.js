import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// helper: unwrap async params and get numeric id
async function getLeadIdFromParams(paramsPromise) {
  const p = await paramsPromise; // Next 15: params is a Promise
  const id = Number(p.id);
  if (!id || Number.isNaN(id)) return null;
  return id;
}

export async function POST(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const leadId = await getLeadIdFromParams(params);
  if (!leadId) {
    return NextResponse.json({ message: 'Invalid lead id' }, { status: 400 });
  }

  const userId = session.user?.id || null;

  const body = await request.json();
  const { type, content } = body;

  if (!content || !content.trim()) {
    return NextResponse.json(
      { message: 'Content is required.' },
      { status: 400 }
    );
  }

  const activity = await prisma.leadActivity.create({
    data: {
      leadId,
      type: type || 'note',
      content,
      createdById: userId,
    },
    include: {
      createdBy: { select: { id: true, name: true, username: true } },
    },
  });

  return NextResponse.json(activity, { status: 201 });
}
