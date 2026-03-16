import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { validateAndProcessUpload } from '@/lib/secure-upload';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    // ✅ Use centralized secure utility
    const result = await validateAndProcessUpload(file, {
      maxSize: 5 * 1024 * 1024,
      subFolder: 'public/chat'
    });

    return NextResponse.json({ url: result.url, filename: file.name });
  } catch (error) {
    console.error('Chat upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload file' },
      { status: 400 }
    );
  }
}
