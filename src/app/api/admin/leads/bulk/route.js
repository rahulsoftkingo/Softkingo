import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function isAdminOrManager(session) {
  const roles = session?.user?.roles || [];
  return roles.includes('admin') || roles.includes('manager');
}

export async function PATCH(request) {
  const session = await getServerSession(authOptions);
  if (!session || !isAdminOrManager(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { ids, ownerId, status, action } = body; // 'assign' | 'status' | 'delete'

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json(
      { message: 'No ids provided.' },
      { status: 400 }
    );
  }

  const idList = ids.map((x) => Number(x)).filter(Boolean);

  if (action === 'assign') {
    await prisma.lead.updateMany({
      where: { id: { in: idList } },
      data: { ownerId: ownerId ? Number(ownerId) : null },
    });
  } else if (action === 'status') {
    await prisma.lead.updateMany({
      where: { id: { in: idList } },
      data: { status },
    });
  } else if (action === 'delete') {
    await prisma.lead.deleteMany({
      where: { id: { in: idList } },
    });
  } else {
    return NextResponse.json(
      { message: 'Invalid action.' },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true });
}
