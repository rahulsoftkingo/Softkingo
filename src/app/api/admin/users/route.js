import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  canCreateUsers,
  isAdmin,
} from '@/lib/rbac.server';

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session || !canCreateUsers(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const status = searchParams.get('status') || 'all';
  const roleFilter = searchParams.get('role') || 'all';

  const where = {
    OR: [
      { name: { contains: q } },
      { email: { contains: q } },
      { username: { contains: q } },
    ],
  };

  if (status !== 'all') where.status = status;
  if (roleFilter !== 'all') {
    where.roles = {
      some: {
        role: { name: roleFilter },
      },
    };
  }

  const users = await prisma.user.findMany({
    where,
    include: {
      roles: {
        include: { role: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(users);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || !canCreateUsers(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const {
    name,
    email,
    username,
    password,
    status,
    roleIds = [],
    profileImage,
    phone,
    department,
    title,
  } = body;

  if (!password || password.length < 6) {
    return NextResponse.json(
      { message: 'Password must be at least 6 characters.' },
      { status: 400 }
    );
  }

  let safeRoleIds = roleIds;
  if (!isAdmin(session) && safeRoleIds.length) {
    const rolesToAttach = await prisma.role.findMany({
      where: { id: { in: safeRoleIds } },
    });
    const hasAdminRole = rolesToAttach.some((r) => r.name === 'admin');
    if (hasAdminRole) {
      return NextResponse.json(
        { message: 'Only admin can assign admin role.' },
        { status: 403 }
      );
    }
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      username,
      passwordHash,
      status: status || 'active',
      profileImage: profileImage || null,
      phone: phone || null,
      department: department || null,
      title: title || null,
      roles: safeRoleIds.length
        ? {
            create: safeRoleIds.map((roleId) => ({
              role: { connect: { id: roleId } },
            })),
          }
        : undefined,
    },
    include: {
      roles: { include: { role: true } },
    },
  });

  return NextResponse.json(user, { status: 201 });
}
