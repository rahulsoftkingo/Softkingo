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

  // const body = await request.json();
  // const {
  //   key,
  //   type,
  //   title,
  //   category,
  //   description,
  //   techStack,
  //   platforms,
  //   country,
  //   bgImage,
  //   bgColor,
  //   icon,
  //   phoneMockup,
  //   badges,
  //   caseStudyId,
  // } = body;

  // const project = await prisma.portfolioProject.update({
  //   where: { id },
  //   data: {
  //     key,
  //     type,
  //     title,
  //     category,
  //     description,
  //     techStack,
  //     platforms,
  //     country,
  //     bgImage,
  //     bgColor,
  //     icon,
  //     phoneMockup,
  //     badgesJson: badges === undefined ? undefined : badges ? JSON.stringify(badges) : null,
  //     caseStudyId: caseStudyId === undefined ? undefined : caseStudyId || null,
  //   },
  // });

    // SAFETY TRUNCATE - Prevent Prisma P2000 errors
  const body = await request.json();
  const safeData = {
    key: body.key || null,
    type: body.type || null,
    title: body.title ? String(body.title).slice(0, 500) : null,           // Max 500 chars
    category: body.category || null,
   description: body.description ? String(body.description).slice(0, 500) : null,  // ← 500 MAX
    techStack: body.techStack ? String(body.techStack).slice(0, 1000) : null,       // Max 1K chars
    platforms: body.platforms ? String(body.platforms).slice(0, 500) : null,        // Max 500 chars
    country: body.country ? String(body.country).slice(0, 255) : null,             // Max 255 chars
    bgImage: body.bgImage || null,
    bgColor: body.bgColor ? String(body.bgColor).slice(0, 500) : null,             // Max 500 chars
    icon: body.icon || null,
    phoneMockup: body.phoneMockup || null,
    badgesJson: body.badges === undefined ? undefined : body.badges ? JSON.stringify(body.badges) : null,
    caseStudyId: body.caseStudyId === undefined ? undefined : body.caseStudyId || null,
  };


   try {
    const project = await prisma.portfolioProject.update({
      where: { id },
      data: safeData,
    });
    return NextResponse.json({ 
      success: true, 
      project 
    });
  } catch (error) {
    console.error('Portfolio update error:', error);
    
   
    return NextResponse.json({ 
      message: 'Failed to update project: ' + (error.message || 'Database error'),
      error: error.code || 'UNKNOWN'
    }, { status: 500 });
  }
}

//   // Update with safe data
//   const project = await prisma.portfolioProject.update({
//     where: { id },
//     data: safeData,
//   });
//   return NextResponse.json(project);
// }

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
