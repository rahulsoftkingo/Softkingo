// src/app/api/admin/users/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { canEditUsers, canChangeRoles } from '@/lib/rbac.server';

// helper: safe int from async params
async function getIdFromParams(paramsPromise) {
  const p = await paramsPromise; // Next 15: params is a Promise
  const id = Number(p.id);
  if (!id || Number.isNaN(id)) return null;
  return id;
}

// GET /api/admin/users/[id]
export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = await getIdFromParams(params);
  if (!id) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id },
    include: { roles: { include: { role: true } } },
  });

  if (!user) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}

// PATCH /api/admin/users/[id]
export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !canEditUsers(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = await getIdFromParams(params);
  if (!id) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  const body = await request.json();
  const {
    name,
    email,
    username,
    status,
    password,
    roleIds,
    profileImage,
    phone,
    whatsapp,
    department,
    title,
    bio,
  } = body;

  const data = {
    name,
    email,
    username,
    status,
    profileImage: profileImage ?? undefined,
    phone: phone ?? undefined,
    whatsapp: whatsapp ?? undefined,
    department: department ?? undefined,
    title: title ?? undefined,
    bio: bio ?? undefined,
  };

  if (password) {
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }
    data.passwordHash = await bcrypt.hash(password, 10);
  }

  let roleUpdate = undefined;
  if (Array.isArray(roleIds) && canChangeRoles(session)) {
    roleUpdate = {
      deleteMany: {},
      create: roleIds.map((roleId) => ({
        role: { connect: { id: roleId } },
      })),
    };
  }

  const user = await prisma.user.update({
    where: { id },
    data: {
      ...data,
      ...(roleUpdate && { roles: roleUpdate }),
    },
    include: { roles: { include: { role: true } } },
  });

  return NextResponse.json(user);
}

// DELETE /api/admin/users/[id]
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !canEditUsers(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = await getIdFromParams(params);
  if (!id) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  await prisma.user.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
