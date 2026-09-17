// src/app/api/admin/portfolio-social-media/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function isAdminOrManager(session) {
  const roles = session?.user?.roles || [];
  return roles.includes('admin') || roles.includes('manager');
}

function parseId(idParam) {
  const id = parseInt(idParam, 10);
  return Number.isNaN(id) ? null : id;
}

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id: rawId } = await params;
    const id = parseId(rawId);

    if (id === null) {
      return NextResponse.json(
        { message: 'Invalid id.' },
        { status: 400 }
      );
    }

    const row = await prisma.portfolioSocialMedia.findUnique({
      where: { id },
    });

    if (!row) {
      return NextResponse.json(
        { message: 'Not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(row);
  } catch (error) {
    console.error('GET /portfolio-social-media/[id] error:', error);

    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !isAdminOrManager(session)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Next.js 15+: params is a Promise
    const { id: rawId } = await params;
    const id = parseId(rawId);

    if (id === null) {
      return NextResponse.json(
        { message: 'Invalid id.' },
        { status: 400 }
      );
    }

    const existing = await prisma.portfolioSocialMedia.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { message: 'Not found.' },
        { status: 404 }
      );
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
        { status: 400 }
      );
    }

    if (slug !== existing.slug) {
      const slugTaken = await prisma.portfolioSocialMedia.findUnique({
        where: { slug },
      });

      if (slugTaken) {
        return NextResponse.json(
          {
            message:
              'A social media case study with this slug already exists.',
          },
          { status: 409 }
        );
      }
    }

    const row = await prisma.portfolioSocialMedia.update({
      where: { id },
      data: {
        slug,
        title,
        subtitle: subtitle || null,
        category: category || null,
        status: status || 'draft',
        publishedAt: publishedAt
          ? new Date(publishedAt)
          : null,

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

    return NextResponse.json(row, { status: 200 });
  } catch (error) {
    console.error('PATCH portfolio social media error:', error);

    return NextResponse.json(
      {
        message: 'Failed to update portfolio social media case study.',
        error:
          process.env.NODE_ENV === 'development'
            ? error.message
            : undefined,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !isAdminOrManager(session)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Next.js 15+: params is a Promise — must be awaited.
    const { id: rawId } = await params;
    const id = parseId(rawId);
    if (id === null) {
      return NextResponse.json({ message: 'Invalid id.' }, { status: 400 });
    }

    const existing = await prisma.portfolioSocialMedia.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ message: 'Not found.' }, { status: 404 });
    }

    await prisma.portfolioSocialMedia.delete({ where: { id } });

    return NextResponse.json({ message: 'Deleted.' });
  } catch (error) {
    console.error('DELETE portfolio social media error:', error);
    return NextResponse.json(
      {
        message: 'Failed to delete portfolio social media case study.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}