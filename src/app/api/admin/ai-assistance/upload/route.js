import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { validateAndProcessUpload } from '@/lib/secure-upload';

function isAdminOrManager(session) {
    const roles = session?.user?.roles || [];
    return roles.includes('admin') || roles.includes('manager');
}

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
    const session = await getServerSession(authOptions);
    if (!session || !isAdminOrManager(session)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file');

        // ✅ Secure Validation and Processing
        let result;
        try {
            result = await validateAndProcessUpload(file, {
                maxSize: 5 * 1024 * 1024, // 5MB limit
                subFolder: 'admin/ai-assistance'
            });

            if (result.mimeType !== 'application/pdf') {
                throw new Error('Only PDF files are allowed for AI assistance');
            }
        } catch (validationError) {
            return NextResponse.json(
                { error: validationError.message },
                { status: 400 }
            );
        }

        // Use buffer from result if needed or read it back
        const { url } = result;
        const fs = require('fs');
        const buffer = fs.readFileSync(require('path').join(process.cwd(), 'public/uploads', 'admin/ai-assistance', result.fileName));

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
