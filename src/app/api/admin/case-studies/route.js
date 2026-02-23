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

  const where = q
    ? {
      OR: [
        { title: { contains: q } },
        { subtitle: { contains: q } },
        { slug: { contains: q } },
      ],
    }
    : {};

  const rows = await prisma.caseStudy.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(rows);
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session || !isAdminOrManager(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const {
    slug,
    title,
    subtitle,
    logo,
    heroBgImage,
    heroCircle,
    heroMockups,
    brandingJson,
    teamJson,
    clientJson,
    technologiesJson,
    overviewJson,
    requirementsJson,
    goalsJson,
    challengesJson,
    appScreensJson,
    resultsJson,
    findYourAppJson,
    seoTitle,
    seoDescription,
    seoImage,
  } = body;

  if (!slug || !title) {
    return NextResponse.json(
      { message: 'Slug and title are required.' },
      { status: 400 },
    );
  }

  const row = await prisma.caseStudy.create({
    data: {
      slug,
      title,
      subtitle: subtitle || null,
      logo: logo || null,
      heroBgImage: heroBgImage || null,
      heroCircle: heroCircle || null,
      heroMockups: heroMockups || null,
      brandingJson: brandingJson || null,
      teamJson: teamJson || null,
      clientJson: clientJson || null,
      technologiesJson: technologiesJson || null,
      overviewJson: overviewJson || null,
      requirementsJson: requirementsJson || null,
      goalsJson: goalsJson || null,
      challengesJson: challengesJson || null,
      appScreensJson: appScreensJson || null,
      resultsJson: resultsJson || null,
      findYourAppJson: findYourAppJson || null,
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
      seoImage: seoImage || null,
    },
  });

  return NextResponse.json(row, { status: 201 });
}
