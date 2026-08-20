// src/app/api/admin/portfolio-ppc/[id]/route.js
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
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = parseId(params.id);
  if (id === null) {
    return NextResponse.json({ message: 'Invalid id.' }, { status: 400 });
  }

  const row = await prisma.portfolioPpc.findUnique({ where: { id } });
  if (!row) {
    return NextResponse.json({ message: 'Not found.' }, { status: 404 });
  }

  return NextResponse.json(row);
}

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !isAdminOrManager(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = parseId(params.id);
  if (id === null) {
    return NextResponse.json({ message: 'Invalid id.' }, { status: 400 });
  }

  const existing = await prisma.portfolioPpc.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ message: 'Not found.' }, { status: 404 });
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
    adPlatformsJson,
    toolsJson,
    performanceJson,
    achievementsJson,
    campaignsJson,
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

  if (slug !== existing.slug) {
    const slugTaken = await prisma.portfolioPpc.findUnique({ where: { slug } });
    if (slugTaken) {
      return NextResponse.json(
        { message: 'A PPC case study with this slug already exists.' },
        { status: 409 },
      );
    }
  }

  const row = await prisma.portfolioPpc.update({
    where: { id },
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
      adPlatformsJson: adPlatformsJson || null,
      toolsJson: toolsJson || null,
      performanceJson: performanceJson || null,
      achievementsJson: achievementsJson || null,
      campaignsJson: campaignsJson || null,
      testimonialJson: testimonialJson || null,
      ctaBannerJson: ctaBannerJson || null,
      portfolioCardContent: portfolioCardContent || null,

      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
    },
  });

  return NextResponse.json(row);
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !isAdminOrManager(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = parseId(params.id);
  if (id === null) {
    return NextResponse.json({ message: 'Invalid id.' }, { status: 400 });
  }

  const existing = await prisma.portfolioPpc.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ message: 'Not found.' }, { status: 404 });
  }

  await prisma.portfolioPpc.delete({ where: { id } });

  return NextResponse.json({ message: 'Deleted.' });
}