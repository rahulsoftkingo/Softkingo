import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const status = searchParams.get('status') || 'all';
  const source = searchParams.get('source') || 'all';
  const formType = searchParams.get('formType') || 'all';
  const ownerId = searchParams.get('ownerId') || 'all';
  const scope = searchParams.get('scope') || 'mine';

  const where = q
    ? {
        OR: [
          { name: { contains: q } },
          { email: { contains: q } },
          { phone: { contains: q } },
          { whatsapp: { contains: q } },
          { campaign: { contains: q } },
          { message: { contains: q } },
        ],
      }
    : {};

  if (status !== 'all') where.status = status;
  if (source !== 'all') where.source = source;
  if (formType !== 'all') where.formType = formType;
  if (ownerId !== 'all') where.ownerId = Number(ownerId);

  if (scope === 'mine') {
    const userId = session.user?.id;
    if (userId) {
      where.OR = (where.OR || []).concat([
        { ownerId: userId },
        { ownerId: null },
      ]);
    }
  }

  const leads = await prisma.lead.findMany({
    where,
    include: {
      owner: { select: { name: true, username: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const header = [
    'id',
    'name',
    'email',
    'phone',
    'whatsapp',
    'source',
    'campaign',
    'status',
    'formType',
    'formKey',
    'budgetLabel',
    'ndaAccepted',
    'attachmentName',
    'owner',
    'createdAt',
  ];

  const rows = leads.map((l) => [
    l.id,
    l.name,
    l.email,
    l.phone || '',
    l.whatsapp || '',
    l.source || '',
    l.campaign || '',
    l.status || '',
    l.formType || '',
    l.formKey || '',
    l.budgetLabel || '',
    l.ndaAccepted == null ? '' : l.ndaAccepted ? 'yes' : 'no',
    l.attachmentName || '',
    l.owner ? l.owner.name || l.owner.username || '' : '',
    l.createdAt.toISOString(),
  ]);

  const csv =
    header.join(',') +
    '\n' +
    rows
      .map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(','))
      .join('\n');

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="leads.csv"',
    },
  });
}
