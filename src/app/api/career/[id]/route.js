import { NextRequest, NextResponse } from 'next/server';

let prisma;

try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch (error) {
  console.error('Prisma Client initialization error:', error);
}

export async function GET(request, { params }) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 500 }
      );
    }

    const { id } = params;
    
    const application = await prisma.careerApplication.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ application });
    
  } catch (error) {
    console.error('Get career application error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch application' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 500 }
      );
    }

    const { id } = params;
    const body = await request.json();
    
    const { status } = body;
    
    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }
    
    const application = await prisma.careerApplication.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Application status updated successfully',
      application,
    });
    
  } catch (error) {
    console.error('Update career application error:', error);
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 500 }
      );
    }

    const { id } = params;
    
    await prisma.careerApplication.delete({
      where: { id: parseInt(id) },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Application deleted successfully',
    });
    
  } catch (error) {
    console.error('Delete career application error:', error);
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    );
  }
}
