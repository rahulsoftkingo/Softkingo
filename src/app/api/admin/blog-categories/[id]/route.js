// src/app/api/admin/blog-categories/[id]/route.js

// GET single + PATCH + DELETE
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function canManage(session) {
  return (session?.user?.roles || []).some(r => ['admin', 'manager', 'writer'].includes(r));
}

async function getId(paramsPromise) {
  const params = await paramsPromise;
  const id = Number(params?.id);
  return Number.isInteger(id) ? id : null;
}

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !canManage(session)) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const id = await getId(params);
  if (!id) return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });

  const category = await prisma.blogCategory.findUnique({ where: { id } });
  if (!category) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(category);
}

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !canManage(session)) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const id = await getId(params);
  if (!id) return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });

  try {
    const category = await prisma.blogCategory.findUnique({ where: { id } });
    if (!category) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    const data = await req.json();
    const updated = await prisma.blogCategory.update({
      where: { id },
      data: {
        name: data.name?.trim(),
        slug: data.slug?.trim(),
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        seoImage: data.seoImage || null,
      },
    });
    return NextResponse.json(updated);
  } catch (err) {
    if (err.code === 'P2002') return NextResponse.json({ message: 'Slug exists' }, { status: 400 });
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !canManage(session)) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const id = await getId(params);
  if (!id) return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });

  try {
    const category = await prisma.blogCategory.findUnique({ where: { id } });
    if (!category) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    const postCount = await prisma.blogPost.count({ where: { categoryId: id } });
    if (postCount > 0) return NextResponse.json({ message: `${postCount} posts use this` }, { status: 400 });

    await prisma.blogCategory.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ message: 'Delete failed' }, { status: 500 });
  }
}
