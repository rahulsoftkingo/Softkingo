import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const memberId = Number(id);
  if (!memberId || Number.isNaN(memberId)) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  const member = await prisma.teamMember.findUnique({
    where: { id: memberId },
  });

  if (!member) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(member);
}

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const memberId = Number(id);
  if (!memberId || Number.isNaN(memberId)) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  const body = await request.json();
  const { name, title, department, category, photo, bio, linkedinUrl, status, order, featured } =
    body;

  const member = await prisma.teamMember.update({
    where: { id: memberId },
    data: {
      name,
      title,
      department,
      category,
      photo,
      bio,
      linkedinUrl,
      status,
      order: order ? parseInt(order) : 0,
      featured,
    },
  });

  return NextResponse.json(member);
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const memberId = Number(id);
  if (!memberId || Number.isNaN(memberId)) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  await prisma.teamMember.delete({ where: { id: memberId } });

  return NextResponse.json({ ok: true });
}
