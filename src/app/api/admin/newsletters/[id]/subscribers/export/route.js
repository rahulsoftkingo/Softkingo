import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const subscribers = await prisma.newsletterSubscription.findMany({
      where: { listId: parseInt(id) },
      orderBy: { subscribedAt: 'desc' },
      select: {
        email: true,
        name: true,
        status: true,
        source: true,
        subscribedAt: true
      }
    });

    if (!subscribers.length) {
      return NextResponse.json({ error: 'No subscribers to export' }, { status: 404 });
    }

    // Generate CSV
    const headers = ['Email', 'Name', 'Status', 'Source', 'Subscribed At'];
    const rows = subscribers.map(s => [
      s.email,
      s.name || '',
      s.status,
      s.source || '',
      s.subscribedAt.toISOString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=subscribers-list-${id}.csv`
      }
    });
  } catch (error) {
    console.error('Export failed:', error);
    return NextResponse.json({ error: 'Failed to export subscribers' }, { status: 500 });
  }
}
