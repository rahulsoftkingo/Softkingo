// src/app/api/admin/blog-categories/route.js
// GET all + POST new
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function canManage(session) {
  return (session?.user?.roles || []).some(r => ['admin', 'manager', 'writer'].includes(r));
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !canManage(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json({ categories });
  } catch (err) {
    return NextResponse.json({ message: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || !canManage(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, slug } = await req.json();
    if (!name?.trim() || !slug?.trim()) {
      return NextResponse.json({ message: 'Name and slug required' }, { status: 400 });
    }

    const category = await prisma.blogCategory.create({
      data: { 
        name: name.trim(), 
        slug: slug.trim() 
      },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    if (err.code === 'P2002') {
      return NextResponse.json({ message: 'Slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to create category' }, { status: 500 });
  }
}
