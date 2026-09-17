// src/app/api/admin/portfolio-social-media/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function isAdminOrManager(session) {
  const roles = session?.user?.roles || [];
  return roles.includes('admin') || roles.includes('manager');
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const status = searchParams.get('status') || '';

    const where = {
      ...(q
        ? {
          OR: [
            { title: { contains: q } },
            { subtitle: { contains: q } },
            { slug: { contains: q } },
            { category: { contains: q } },
          ],
        }
        : {}),
      ...(status ? { status } : {}),
    };

    const rows = await prisma.portfolioSocialMedia.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(rows);
  } catch (error) {
    console.error('GET /portfolio-social-media error:', error);
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
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
      status,
      publishedAt,

      heroBgImage,
      seoImage,
      companyLogo,
      companyDescription,

      heroJson,
      projectOverviewJson,
      challengeJson,
      solutionJson,
      platformsJson,
      toolsJson,
      performanceJson,
      achievementsJson,
      topContentJson,
      testimonialJson,
      ctaBannerJson,
      portfolioCardContent,

      seoTitle,
      seoDescription,
    } = body;

    if (!slug || !title) {
      return NextResponse.json(
        { message: 'Slug and title are required.' },
        { status: 400 },
      );
    }

    const existing = await prisma.portfolioSocialMedia.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { message: 'A social media case study with this slug already exists.' },
        { status: 409 },
      );
    }

    const row = await prisma.portfolioSocialMedia.create({
      data: {
        slug,
        title,
        subtitle: subtitle || null,
        category: category || null,
        status: status || 'draft',
        publishedAt: publishedAt ? new Date(publishedAt) : null,

        heroBgImage: heroBgImage || null,
        seoImage: seoImage || null,
        companyLogo: companyLogo || null,
        companyDescription: companyDescription || null,

        heroJson: heroJson || null,
        projectOverviewJson: projectOverviewJson || null,
        challengeJson: challengeJson || null,
        solutionJson: solutionJson || null,
        platformsJson: platformsJson || null,
        toolsJson: toolsJson || null,
        performanceJson: performanceJson || null,
        achievementsJson: achievementsJson || null,
        topContentJson: topContentJson || null,
        testimonialJson: testimonialJson || null,
        ctaBannerJson: ctaBannerJson || null,
        portfolioCardContent: portfolioCardContent || null,

        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
      },
    });

    return NextResponse.json(row, { status: 201 });
  } catch (error) {
    console.error('POST /portfolio-social-media error:', error);
    return NextResponse.json(
      {
        message: 'Failed to create portfolio social media case study.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 },
    );
  }
}