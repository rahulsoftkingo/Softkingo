import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Polyfill DOMMatrix for pdf-parse/pdfjs
if (typeof global.DOMMatrix === 'undefined') {
    global.DOMMatrix = class DOMMatrix {
        constructor() {
            this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0;
        }
    };
}

const pdf = require('pdf-parse');

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Extract text from PDF
        const data = await pdf(buffer);
        const extractedText = data.text;

        // Save to database (Upsert - we only need one policy for now)
        const existingPolicy = await prisma.botPolicy.findFirst();

        if (existingPolicy) {
            await prisma.botPolicy.update({
                where: { id: existingPolicy.id },
                data: { content: extractedText },
            });
        } else {
            await prisma.botPolicy.create({
                data: { content: extractedText },
            });
        }

        return NextResponse.json({
            success: true,
            message: 'PDF processed and policy updated',
            textPreview: extractedText.substring(0, 500) + '...'
        });
    } catch (error) {
        console.error('PDF Upload Error:', error);
        return NextResponse.json({ error: 'Failed to process PDF' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const policy = await prisma.botPolicy.findFirst({
            orderBy: { updatedAt: 'desc' }
        });
        return NextResponse.json(policy || { content: '' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch policy' }, { status: 500 });
    }
}
