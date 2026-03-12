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

    // Fetch existing user to preserve values if needed
    const currentUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // ✅ Handle Profile Image
    // If base64 is provided (from some previous/other implementation), use it
    // Otherwise use body.profileImage (which is a URL uploaded via media API)
    let profileImageValue = body.profileImage;
    let profileImageType = currentUser.profileImageType;

    if (body.profileImageBase64) {
      const base64Data = body.profileImageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
      profileImageValue = base64Data; // Store as base64 string or whatever is expected
      profileImageType = body.profileImageType || 'image/jpeg';
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: body.name !== undefined ? body.name : currentUser.name,
        email: body.email !== undefined ? body.email : currentUser.email,
        username: body.username !== undefined ? body.username : currentUser.username,
        phone: body.phone !== undefined ? body.phone : currentUser.phone,
        whatsapp: body.whatsapp !== undefined ? body.whatsapp : currentUser.whatsapp,
        title: body.title !== undefined ? body.title : currentUser.title,
        department: body.department !== undefined ? body.department : currentUser.department,
        bio: body.bio !== undefined ? body.bio : currentUser.bio,
        profileImage: profileImageValue,
        profileImageType: profileImageType,
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
