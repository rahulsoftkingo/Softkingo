// src/app/api/admin/blog-tags/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function canManage(session) {
  const roles = session?.user?.roles || [];
  return roles.some((r) => ['admin', 'manager', 'writer'].includes(r));
}

// GET /api/admin/blog-tags
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !canManage(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const tags = await prisma.blogTag.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(tags);
  } catch (err) {
    console.error('Get tags error:', err);
    return NextResponse.json({ message: 'Failed to fetch tags' }, { status: 500 });
  }
}

// POST /api/admin/blog-tags
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || !canManage(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, slug } = await req.json();

    if (!name || !slug) {
      return NextResponse.json(
        { message: 'Name and slug required' },
        { status: 400 }
      );
    }

    const tag = await prisma.blogTag.create({
      data: { name, slug },
    });

    return NextResponse.json(tag, { status: 201 });
  } catch (err) {
    if (err.code === 'P2002') {
      return NextResponse.json(
        { message: 'Slug already exists' },
        { status: 400 }
      );
    }
    console.error('Create tag error:', err);
    return NextResponse.json(
      { message: 'Failed to create tag' },
      { status: 500 }
    );
  }
}
