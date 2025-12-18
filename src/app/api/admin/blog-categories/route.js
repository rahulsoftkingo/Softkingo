import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function canManage(session) {
  const roles = session?.user?.roles || [];
  return roles.some((r) => ['admin', 'manager', 'writer'].includes(r));
}

export async function GET() {
  const cats = await prisma.blogCategory.findMany({
    orderBy: { name: 'asc' },
  });
  return NextResponse.json(cats);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || !canManage(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { name, slug } = body;
  if (!name || !slug) {
    return NextResponse.json(
      { message: 'Name and slug required.' },
      { status: 400 },
    );
  }

  const cat = await prisma.blogCategory.create({
    data: { name, slug },
  });

  return NextResponse.json(cat, { status: 201 });
}
