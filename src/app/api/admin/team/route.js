import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';

  const members = await prisma.teamMember.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q } },
            { title: { contains: q } },
            { department: { contains: q } },
          ],
        }
      : undefined,
    orderBy: [
      { featured: 'desc' },
      { order: 'asc' },
      { createdAt: 'desc' },
    ],
  });

  return NextResponse.json(members);
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { name, title, department, photo, bio, linkedinUrl, order, featured } =
    body;

  if (!name) {
    return NextResponse.json(
      { message: 'Name is required.' },
      { status: 400 }
    );
  }

  const member = await prisma.teamMember.create({
    data: {
      name,
      title,
      department,
      photo,
      bio,
      linkedinUrl,
      order: order ?? 0,
      featured: !!featured,
    },
  });

  return NextResponse.json(member, { status: 201 });
}
