// src/app/api/admin/media/upload/route.js
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

const UPLOAD_ROOT = path.join(process.cwd(), 'public', 'uploads');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {}
}

// ✅ Helper: Sanitize filename
function sanitizeFilename(filename) {
  return filename
    .replace(/\s+/g, '-') // spaces → hyphens
    .replace(/[^\w\-_.]/g, '') // remove special chars except - _ .
    .replace(/-+/g, '-') // multiple hyphens → single
    .replace(/^-+|-+$/g, '') // trim leading/trailing hyphens
    .toLowerCase(); // lowercase for consistency
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const folder = (formData.get('folder') || 'general').toString();

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { message: 'No file uploaded.' },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize folder
    const safeFolder = folder.replace(/[^a-zA-Z0-9/_-]/g, '').replace(/^\/+/, '');
    const targetDir = path.join(UPLOAD_ROOT, safeFolder);
    await ensureDir(targetDir);

    // ✅ Sanitize filename
    const originalName = file.name || 'file';
    const ext = path.extname(originalName).toLowerCase(); // .JPG → .jpg
    const baseName = path.basename(originalName, path.extname(originalName));
    const sanitizedBase = sanitizeFilename(baseName);

    // Check for duplicates
    let filename = `${sanitizedBase}${ext}`;
    let filepath = path.join(targetDir, filename);
    let counter = 1;

    while (true) {
      try {
        await fs.access(filepath);
        // File exists, increment
        filename = `${sanitizedBase}-${counter}${ext}`;
        filepath = path.join(targetDir, filename);
        counter++;
      } catch {
        // File doesn't exist, safe to use
        break;
      }
    }

    await fs.writeFile(filepath, buffer);

    // Public URL
    const url = `/uploads/${safeFolder}/${filename}`;

    return NextResponse.json(
      {
        url,
        name: originalName, // Keep original for reference
        savedAs: filename, // Show sanitized name
        size: buffer.length,
        type: file.type,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error('Upload error', err);
    return NextResponse.json(
      { message: 'Upload failed.' },
      { status: 500 },
    );
  }
}
