import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const industries = await prisma.page.findMany({
            where: {
                type: 'industry',
            },
            select: {
                id: true,
                title: true,
                slug: true,
                contentJson: true
            },
            orderBy: { title: 'asc' },
        });

        return NextResponse.json(industries);
    } catch (error) {
        console.error('Error fetching industries:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
