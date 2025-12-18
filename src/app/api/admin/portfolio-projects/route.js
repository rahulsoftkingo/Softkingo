import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function isAdminOrManager(session) {
  const roles = session?.user?.roles || [];
  return roles.includes('admin') || roles.includes('manager');
}

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';
  const type = searchParams.get('type') || 'all';

  const where = q
    ? {
        OR: [
          { title: { contains: q } },
          { description: { contains: q } },
          { techStack: { contains: q } },
          { category: { contains: q } },
        ],
      }
    : {};

  if (category !== 'all') where.category = category;
  if (type !== 'all') where.type = type;

  const projects = await prisma.portfolioProject.findMany({
    where,
    include: {
      caseStudy: {
        select: { id: true, slug: true, title: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(projects);
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session || !isAdminOrManager(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const {
    key,
    type,
    title,
    category,
    description,
    techStack,
    platforms,
    country,
    bgImage,
    bgColor,
    icon,
    phoneMockup,
    badges, // object that will be serialized to JSON
    caseStudyId,
  } = body;

  if (!key || !title || !type) {
    return NextResponse.json(
      { message: 'Key, title and type are required.' },
      { status: 400 }
    );
  }

  const project = await prisma.portfolioProject.create({
    data: {
      key,
      type,
      title,
      category,
      description,
      techStack,
      platforms,
      country,
      bgImage,
      bgColor,
      icon,
      phoneMockup,
    //   badgesJson: badges ? JSON.stringify(badges) : null,
    badgesJson:
  badges === undefined ? undefined : badges ? JSON.stringify(badges) : null,

      caseStudyId: caseStudyId || null,
    },
  });

  return NextResponse.json(project, { status: 201 });
}
