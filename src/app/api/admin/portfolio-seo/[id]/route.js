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

// Fields that are stored as JSON-text blobs on the model. For PATCH we only
// touch a key if the client actually sent it (undefined = "leave column
// alone"), so a partial payload never wipes out other sections.
const JSON_FIELDS = [
  'heroStatsJson',
  'clientOverviewJson',
  'strategyJson',
  'resultsJson',
  'performanceDashboardJson',
  'technicalSeoJson',
  'businessImpactJson',
  'toolsJson',
  'portfolioCardContent',
];

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const id = await getId(params);
    if (!id) {
      return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
    }

    const row = await prisma.portfolioSeo.findUnique({
      where: { id },
    });

    if (!row) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(row);
  } catch (err) {
    console.error('GET /api/admin/portfolio-seo/[id] failed:', err);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !isAdminOrManager(session)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const id = await getId(params);
    if (!id) {
      return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
    }

    const body = await request.json();

    // slug/title are required at the DB level (non-nullable) — if the
    // client sent them, make sure they're not blank.
    if (body.slug !== undefined && !String(body.slug).trim()) {
      return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
    }
    if (body.title !== undefined && !String(body.title).trim()) {
      return NextResponse.json({ message: 'Title is required' }, { status: 400 });
    }

    const data = {
      ...(body.slug !== undefined && { slug: body.slug }),
      ...(body.title !== undefined && { title: body.title }),
      ...(body.subtitle !== undefined && { subtitle: body.subtitle || null }),
      ...(body.category !== undefined && { category: body.category || null }),
      ...(body.companyLogo !== undefined && { companyLogo: body.companyLogo || null }),
      ...(body.companyDescription !== undefined && { companyDescription: body.companyDescription || null }),
      ...(body.heroBgImage !== undefined && { heroBgImage: body.heroBgImage || null }),
      ...(body.seoImage !== undefined && { seoImage: body.seoImage || null }),
      ...(body.seoTitle !== undefined && { seoTitle: body.seoTitle || null }),
      ...(body.seoDescription !== undefined && { seoDescription: body.seoDescription || null }),
    };

    // JSON blob columns — same "undefined means untouched" convention as
    // the scalar fields above, applied generically across all 9 sections.
    for (const field of JSON_FIELDS) {
      if (body[field] !== undefined) {
        data[field] = body[field] || null;
      }
    }

    const row = await prisma.portfolioSeo.update({
      where: { id },
      data,
    });

    return NextResponse.json(row);
  } catch (err) {
    if (err.code === 'P2002') {
      return NextResponse.json(
        { message: 'A case study with that slug already exists' },
        { status: 409 }
      );
    }
    if (err.code === 'P2025') {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    console.error('PATCH /api/admin/portfolio-seo/[id] failed:', err);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !isAdminOrManager(session)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const id = await getId(params);
    if (!id) {
      return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
    }

    await prisma.portfolioSeo.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err.code === 'P2025') {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    console.error('DELETE /api/admin/portfolio-seo/[id] failed:', err);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}