import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET current user profile
export async function GET(req) {
  try {
    // TODO: Get user ID from session/auth
    const userId = 1; // Replace with actual auth

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        phone: true,
        whatsapp: true,
        title: true,
        department: true,
        bio: true,
        profileImage: true,
        status: true,
        lastLoginAt: true,
        createdAt: true,
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

// PUT update profile
export async function PUT(req) {
  try {
    // TODO: Get user ID from session/auth
    const userId = 1; // Replace with actual auth

    const body = await req.json();

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: body.name,
        email: body.email,
        username: body.username,
        phone: body.phone || null,
        whatsapp: body.whatsapp || null,
        title: body.title || null,
        department: body.department || null,
        bio: body.bio || null,
        profileImage: body.profileImage || null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        phone: true,
        whatsapp: true,
        title: true,
        department: true,
        bio: true,
        profileImage: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
