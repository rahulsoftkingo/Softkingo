import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/jobs - Public endpoint to fetch active job openings
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('department');
        const location = searchParams.get('location');
        const search = searchParams.get('search');

        const where = { status: 'active' };
        if (department) where.department = department;
        if (location) where.location = { contains: location };
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { department: { contains: search } },
                { location: { contains: search } },
            ];
            delete where.status; // Allow status filter alongside search
            where.AND = [{ status: 'active' }];
        }

        const jobs = await prisma.jobOpening.findMany({
            where,
            orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
            select: {
                id: true,
                title: true,
                department: true,
                location: true,
                experience: true,
                type: true,
                salary: true,
                description: true,
                featured: true,
            },
        });

        return NextResponse.json({ jobs });
    } catch (error) {
        console.error('GET /api/jobs error:', error);
        return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
    }
}
