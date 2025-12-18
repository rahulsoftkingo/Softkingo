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

  const employee = await prisma.employeeDirectoryItem.findUnique({
    where: { id },
  });

  if (!employee) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(employee);
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
  const { name, title, department, photo, email, phone } = body;

  const employee = await prisma.employeeDirectoryItem.update({
    where: { id },
    data: {
      name,
      title,
      department,
      photo,
      email,
      phone,
    },
  });

  return NextResponse.json(employee);
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

  await prisma.employeeDirectoryItem.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
