import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

async function getIdFromParams(paramsPromise) {
  const p = await paramsPromise;
  const id = Number(p.id);
  if (!id || Number.isNaN(id)) return null;
  return id;
}

export async function POST(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const ticketId = await getIdFromParams(params);
  if (!ticketId) {
    return NextResponse.json({ message: 'Invalid ticket id' }, { status: 400 });
  }

  const userId = session.user?.id || null;
  const body = await request.json();
  const { type, visibility, content } = body;

  if (!content?.trim()) {
    return NextResponse.json(
      { message: 'Content is required.' },
      { status: 400 }
    );
  }

  const comment = await prisma.ticketComment.create({
    data: {
      ticketId,
      type: type || 'note',
      visibility: visibility || 'internal',
      content,
      createdById: userId,
    },
    include: {
      createdBy: { select: { id: true, name: true, username: true } },
    },
  });

  return NextResponse.json(comment, { status: 201 });
}
