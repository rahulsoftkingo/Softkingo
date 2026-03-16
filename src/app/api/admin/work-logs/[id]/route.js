import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function isAdminOrManager(session) {
  const roles = session?.user?.roles || [];
  return roles.includes('admin') || roles.includes('manager');
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  const currentUserId = parseInt(session.user.id, 10);
  const isPrivileged = isAdminOrManager(session);

  try {
    const log = await prisma.workLog.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!log) {
      return NextResponse.json({ message: 'Log not found' }, { status: 404 });
    }

    // Strict RBAC: Can only delete own logs unless privileged
    if (!isPrivileged && log.userId !== currentUserId) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await prisma.workLog.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ message: 'Log deleted successfully' });
  } catch (err) {
    console.error('WorkLog DELETE error:', err);
    return NextResponse.json({ message: 'Failed to delete work log' }, { status: 500 });
  }
}
