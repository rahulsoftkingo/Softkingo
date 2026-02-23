import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function isAdminOrManager(session) {
  const roles = session?.user?.roles || [];
  return roles.includes('admin') || roles.includes('manager');
}

async function getId(paramsPromise) {
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

  const id = await getId(params);
  if (!id) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  const row = await prisma.caseStudy.findUnique({
    where: { id },
  });

  if (!row) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(row);
}

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !isAdminOrManager(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = await getId(params);
  if (!id) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  const body = await request.json();

  const row = await prisma.caseStudy.update({
    where: { id },
    data: {
      slug: body.slug,
      title: body.title,
      subtitle: body.subtitle || null,
      logo: body.logo || null,
      heroBgImage: body.heroBgImage || null,
      heroCircle: body.heroCircle || null,
      heroMockups: body.heroMockups || null,
      brandingJson:
        body.brandingJson === undefined ? undefined : body.brandingJson || null,
      teamJson:
        body.teamJson === undefined ? undefined : body.teamJson || null,
      clientJson:
        body.clientJson === undefined ? undefined : body.clientJson || null,
      technologiesJson:
        body.technologiesJson === undefined
          ? undefined
          : body.technologiesJson || null,
      overviewJson:
        body.overviewJson === undefined ? undefined : body.overviewJson || null,
      requirementsJson:
        body.requirementsJson === undefined
          ? undefined
          : body.requirementsJson || null,
      goalsJson:
        body.goalsJson === undefined ? undefined : body.goalsJson || null,
      challengesJson:
        body.challengesJson === undefined
          ? undefined
          : body.challengesJson || null,
      appScreensJson:
        body.appScreensJson === undefined
          ? undefined
          : body.appScreensJson || null,
      resultsJson:
        body.resultsJson === undefined ? undefined : body.resultsJson || null,
      findYourAppJson:
        body.findYourAppJson === undefined
          ? undefined
          : body.findYourAppJson || null,
      seoTitle: body.seoTitle || null,
      seoDescription: body.seoDescription || null,
      seoImage: body.seoImage || null,
    },
  });

  return NextResponse.json(row);
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !isAdminOrManager(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = await getId(params);
  if (!id) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  await prisma.caseStudy.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
