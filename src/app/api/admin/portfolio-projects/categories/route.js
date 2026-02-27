import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const projects = await prisma.portfolioProject.findMany({
            select: { category: true },
            where: {
                category: {
                    not: null,
                    not: '',
                },
            },
            distinct: ['category'],
        });

        const categories = projects.map((p) => p.category).sort();

        return NextResponse.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
