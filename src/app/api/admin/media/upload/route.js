// src/app/api/admin/media/upload/route.js
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { validateAndProcessUpload } from '@/lib/secure-upload';

const UPLOAD_ROOT = path.join(process.cwd(), 'public', 'uploads');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch { }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const folder = (formData.get('folder') || 'general').toString();

    // ✅ Use centralized secure utility
    const result = await validateAndProcessUpload(file, {
      maxSize: 10 * 1024 * 1024,
      subFolder: `admin/${folder.replace(/^admin\//, '')}` // Ensure it's in admin subfolder
    });

    return NextResponse.json(
      {
        url: result.url,
        name: file.name,
        savedAs: result.fileName,
        size: result.size,
        type: result.mimeType,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error('Upload error', err);
    return NextResponse.json(
      { message: err.message || 'Upload failed.' },
      { status: err.message.includes('No file') ? 400 : 500 },
    );
  }
}
