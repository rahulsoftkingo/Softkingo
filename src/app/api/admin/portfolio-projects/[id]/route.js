import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function isAdminOrManager(session) {
  const roles = session?.user?.roles || [];
  return roles.includes('admin') || roles.includes('manager');
}

async function getIdFromParams(paramsPromise) {
  const p = await paramsPromise;
  const id = Number(p.id);
  if (!id || Number.isNaN(id)) return null;
  return id;
}

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = await getIdFromParams(params);
  if (!id) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  const project = await prisma.portfolioProject.findUnique({
    where: { id },
    include: {
      caseStudy: true,
    },
  });

  if (!project) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !isAdminOrManager(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = await getIdFromParams(params);
  if (!id) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
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
    badges,
    caseStudyId,
  } = body;

  const project = await prisma.portfolioProject.update({
    where: { id },
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
      badgesJson: badges === undefined ? undefined : badges ? JSON.stringify(badges) : null,
      caseStudyId: caseStudyId === undefined ? undefined : caseStudyId || null,
    },
  });

  return NextResponse.json(project);
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !isAdminOrManager(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = await getIdFromParams(params);
  if (!id) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  await prisma.portfolioProject.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
