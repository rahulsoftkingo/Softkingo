import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = Number(params.id);
  if (!id || Number.isNaN(id)) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  const member = await prisma.teamMember.findUnique({
    where: { id },
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

  const id = Number(params.id);
  if (!id || Number.isNaN(id)) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  const body = await request.json();
  const { name, title, department, photo, bio, linkedinUrl, order, featured } =
    body;

  const member = await prisma.teamMember.update({
    where: { id },
    data: {
      name,
      title,
      department,
      photo,
      bio,
      linkedinUrl,
      order,
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

  const id = Number(params.id);
  if (!id || Number.isNaN(id)) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  await prisma.teamMember.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
