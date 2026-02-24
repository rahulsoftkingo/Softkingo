import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/jobs
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        const where = {};
        if (status && status !== 'all') where.status = status;

        const jobs = await prisma.jobOpening.findMany({
            where,
            orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
        });

        return NextResponse.json({ jobs });
    } catch (error) {
        console.error('Admin GET /api/admin/jobs error:', error);
        return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
    }
}

// POST /api/admin/jobs
export async function POST(request) {
    try {
        const body = await request.json();
        const { title, department, location, experience, type, salary, description, requirements, status, featured, order } = body;

        if (!title || !department || !location || !experience) {
            return NextResponse.json({ error: 'title, department, location, and experience are required' }, { status: 400 });
        }

        const job = await prisma.jobOpening.create({
            data: {
                title: title.trim(),
                department: department.trim(),
                location: location.trim(),
                experience: experience.trim(),
                type: type || 'Full Time',
                salary: salary?.trim() || null,
                description: description?.trim() || null,
                requirements: requirements?.trim() || null,
                status: status || 'active',
                featured: !!featured,
                order: order || 0,
            },
        });

        return NextResponse.json({ job }, { status: 201 });
    } catch (error) {
        console.error('Admin POST /api/admin/jobs error:', error);
        return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
    }
}
