import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

let prisma;

try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch (error) {
  console.error('Prisma Client initialization error:', error);
}

export async function POST(request) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    
    // Extract form fields
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const position = formData.get('position');
    const experience = formData.get('experience');
    const currentJob = formData.get('currentJob');
    const education = formData.get('education');
    const linkedinUrl = formData.get('linkedinUrl');
    const portfolioUrl = formData.get('portfolioUrl');
    const coverLetter = formData.get('coverLetter');
    const source = formData.get('source');
    
    // Handle resume file upload
    const resume = formData.get('resume');
    let resumeUrl = null;
    let resumeName = null;
    
    if (resume && resume.size > 0) {
      const bytes = await resume.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Create unique filename
      const timestamp = Date.now();
      const originalName = resume.name;
      const extension = path.extname(originalName);
      const filename = `resume_${timestamp}${extension}`;
      
      // Save to public/uploads/resumes
      const uploadPath = path.join(process.cwd(), 'public', 'uploads', 'resumes');
      const filePath = path.join(uploadPath, filename);
      
      await writeFile(filePath, buffer);
      
      resumeUrl = `/uploads/resumes/${filename}`;
      resumeName = originalName;
    }
    
    // Validate required fields
    if (!firstName || !lastName || !email || !position) {
      return NextResponse.json(
        { error: 'First name, last name, email, and position are required' },
        { status: 400 }
      );
    }
    
    // Create career application
    const application = await prisma.careerApplication.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        position: position.trim(),
        experience: experience?.trim() || null,
        currentJob: currentJob?.trim() || null,
        education: education?.trim() || null,
        linkedinUrl: linkedinUrl?.trim() || null,
        portfolioUrl: portfolioUrl?.trim() || null,
        coverLetter: coverLetter?.trim() || null,
        resumeUrl,
        resumeName,
        source: source?.trim() || null,
      },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      application: {
        id: application.id,
        firstName: application.firstName,
        lastName: application.lastName,
        email: application.email,
        position: application.position,
        status: application.status,
        createdAt: application.createdAt,
      },
    });
    
  } catch (error) {
    console.error('Career application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;
    
    const where = status ? { status } : {};
    
    const [applications, total] = await Promise.all([
      prisma.careerApplication.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          position: true,
          experience: true,
          currentJob: true,
          education: true,
          linkedinUrl: true,
          portfolioUrl: true,
          coverLetter: true,
          resumeUrl: true,
          resumeName: true,
          status: true,
          source: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.careerApplication.count({ where }),
    ]);
    
    return NextResponse.json({
      applications,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
    
  } catch (error) {
    console.error('Get career applications error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
