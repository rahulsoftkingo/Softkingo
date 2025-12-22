import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function canManage(session) {
  const roles = session?.user?.roles || [];
  return roles.some((r) => ['admin', 'manager', 'writer'].includes(r));
}

// PATCH /api/admin/blog-categories/[id]
export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !canManage(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  const body = await req.json();
  const { name, slug } = body;

  if (!name || !slug) {
    return NextResponse.json(
      { message: 'Name and slug required.' },
      { status: 400 },
    );
  }

  try {
    const cat = await prisma.blogCategory.update({
      where: { id: parseInt(id) },
      data: { name, slug },
    });
    return NextResponse.json(cat);
  } catch (err) {
    if (err.code === 'P2002') {
      return NextResponse.json(
        { message: 'Slug already exists.' },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: 'Failed to update category.' },
      { status: 500 },
    );
  }
}

// DELETE /api/admin/blog-categories/[id]
export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !canManage(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;

  try {
    await prisma.blogCategory.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Category deleted.' });
  } catch (err) {
    console.error('Delete category error:', err);
    return NextResponse.json(
      { message: 'Failed to delete category. It may be in use.' },
      { status: 500 },
    );
  }
}
