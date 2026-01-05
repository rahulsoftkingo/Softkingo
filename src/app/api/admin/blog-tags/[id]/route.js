// src/app/api/admin/blog-tags/[id]/route.js - CORRECTED
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function canManage(session) {
  return (session?.user?.roles || []).some(r => ['admin', 'manager', 'writer'].includes(r));
}

async function getId(paramsPromise) {
  const params = await paramsPromise;
  const id = Number(params?.id);  // ✅ ?.id safe access
  if (!id || Number.isNaN(id)) return null;
  return id;
}

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !canManage(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = await getId(params);
  if (!id) return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });

  // ✅ blogTag NOT blogCategory
  const tag = await prisma.blogTag.findUnique({ where: { id } });
  if (!tag) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(tag);
}

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !canManage(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = await getId(params);
  if (!id) return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });

  try {
    // ✅ Check blogTag exists
    const tag = await prisma.blogTag.findUnique({ where: { id } });
    if (!tag) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    const { name, slug } = await req.json();
    const updated = await prisma.blogTag.update({
      where: { id },
      data: { name: name?.trim(), slug: slug?.trim() },
    });
    return NextResponse.json(updated);
  } catch (err) {
    if (err.code === 'P2002') return NextResponse.json({ message: 'Slug exists' }, { status: 400 });
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !canManage(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = await getId(params);
  if (!id) return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });

  try {
    // ✅ Check blogTag exists
    const tag = await prisma.blogTag.findUnique({ where: { id } });
    if (!tag) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    // ✅ Count posts using this tag
    const postCount = await prisma.blogPostTag.count({ where: { tagId: id } });
    if (postCount > 0) {
      return NextResponse.json({ message: `${postCount} posts use this tag` }, { status: 400 });
    }

    await prisma.blogTag.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ message: 'Delete failed' }, { status: 500 });
  }
}
