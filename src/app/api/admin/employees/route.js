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

  const employees = await prisma.employeeDirectoryItem.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q } },
            { title: { contains: q } },
            { department: { contains: q } },
            { email: { contains: q } },
          ],
        }
      : undefined,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(employees);
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { name, title, department, photo, email, phone } = body;

  if (!name) {
    return NextResponse.json(
      { message: 'Name is required.' },
      { status: 400 }
    );
  }

  const employee = await prisma.employeeDirectoryItem.create({
    data: {
      name,
      title,
      department,
      photo,
      email,
      phone,
    },
  });

  return NextResponse.json(employee, { status: 201 });
}
