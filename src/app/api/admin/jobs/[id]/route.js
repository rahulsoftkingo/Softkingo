import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/jobs/[id]
export async function GET(request, { params }) {
    try {
        const job = await prisma.jobOpening.findUnique({ where: { id: parseInt(params.id) } });
        if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        return NextResponse.json({ job });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
    }
}

// PUT /api/admin/jobs/[id]
export async function PUT(request, { params }) {
    try {
        const body = await request.json();
        const { title, department, location, experience, type, salary, description, requirements, status, featured, order } = body;

        const job = await prisma.jobOpening.update({
            where: { id: parseInt(params.id) },
            data: {
                title: title?.trim(),
                department: department?.trim(),
                location: location?.trim(),
                experience: experience?.trim(),
                type: type || 'Full Time',
                salary: salary?.trim() || null,
                description: description?.trim() || null,
                requirements: requirements?.trim() || null,
                status: status || 'active',
                featured: !!featured,
                order: order ?? 0,
            },
        });

        return NextResponse.json({ job });
    } catch (error) {
        console.error('Admin PUT /api/admin/jobs/[id] error:', error);
        return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
    }
}

// DELETE /api/admin/jobs/[id]
export async function DELETE(request, { params }) {
    try {
        await prisma.jobOpening.delete({ where: { id: parseInt(params.id) } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
    }
}
