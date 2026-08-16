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

  const rows = await prisma.portfolioSeo.findMany({
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
    category,
    heroBgImage,
    heroStatsJson,
    clientOverviewJson,
    strategyJson,
    resultsJson,
    performanceDashboardJson,
    technicalSeoJson,
    businessImpactJson,
    toolsJson,
    portfolioCardContent, // 👈 card preview (image, short description, featuredTag, highlights)
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

  const row = await prisma.portfolioSeo.create({
    data: {
      slug,
      title,
      subtitle: subtitle || null,
      category: category || null,
      heroBgImage: heroBgImage || null,
      heroStatsJson: heroStatsJson || null,
      clientOverviewJson: clientOverviewJson || null,
      strategyJson: strategyJson || null,
      resultsJson: resultsJson || null,
      performanceDashboardJson: performanceDashboardJson || null,
      technicalSeoJson: technicalSeoJson || null,
      businessImpactJson: businessImpactJson || null,
      toolsJson: toolsJson || null,
      portfolioCardContent: portfolioCardContent || null, // 👈 saved here
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
      seoImage: seoImage || null,
    },
  });

  return NextResponse.json(row, { status: 201 });
}