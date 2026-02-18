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
  const category = searchParams.get('category') || 'all';
  const status = searchParams.get('status') || 'all';

  const whereClause = {};
  
  // Search filter
  if (q) {
    whereClause.OR = [
      { name: { contains: q } },
      { title: { contains: q } },
      { department: { contains: q } },
    ];
  }
  
  // Category filter
  if (category !== 'all') {
    whereClause.category = category;
  }
  
  // Status filter
  if (status !== 'all') {
    whereClause.status = status;
  }

  const members = await prisma.teamMember.findMany({
    where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
    orderBy: [
      { featured: 'desc' },
      { order: 'asc' },
      { createdAt: 'desc' },
    ],
    select: {
      id: true,
      name: true,
      title: true,
      department: true,
      category: true,
      photo: true,
      bio: true,
      linkedinUrl: true,
      status: true,
      order: true,
      featured: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  return NextResponse.json(members);
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { name, title, department, category, photo, bio, linkedinUrl, status, order, featured } =
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
      category: category || 'employee',
      photo,
      bio,
      linkedinUrl,
      status: status || 'active',
      order: parseInt(order) || 0,
      featured: !!featured,
    },
  });

  return NextResponse.json(member, { status: 201 });
}
