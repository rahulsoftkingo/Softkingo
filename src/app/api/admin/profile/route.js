// src/app/api/admin/profile/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = Number(session.user.id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true, name: true, email: true, username: true, phone: true,
        whatsapp: true, title: true, department: true, bio: true,
        profileImage: true, profileImageType: true, // ✅ Bytes + Type
        status: true, lastLoginAt: true, createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = Number(session.user.id);
    const body = await req.json();

    // ✅ Bytes handling - Base64 to Buffer
    let profileImageData = null;
    let profileImageType = null;

    if (body.profileImageBase64) {
      const base64Data = body.profileImageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
      profileImageData = Buffer.from(base64Data, 'base64');
      profileImageType = body.profileImageType || 'image/jpeg';
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: body.name || null,
        email: body.email || null,
        username: body.username || null,
        phone: body.phone || null,
        whatsapp: body.whatsapp || null,
        title: body.title || null,
        department: body.department || null,
        bio: body.bio || null,
        profileImage: profileImageData,     // ✅ Prisma Bytes
        profileImageType: profileImageType, // ✅ MIME type
      },
      select: {
        id: true, name: true, email: true, username: true, phone: true,
        whatsapp: true, title: true, department: true, bio: true,
        profileImage: true, profileImageType: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
