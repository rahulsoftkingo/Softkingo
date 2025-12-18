import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { randomBytes } from 'crypto';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

async function ensureUploadDir() {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  } catch {}
}

export async function POST(req) {
  try {
    await ensureUploadDir();

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { message: 'No file uploaded.' },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name || '') || '.bin';
    const id = randomBytes(8).toString('hex');
    const filename = `${id}${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    await fs.writeFile(filepath, buffer);

    // public URL (assuming Next serves /public as /)
    const url = `/uploads/${filename}`;

    return NextResponse.json(
      {
        url,
        name: file.name,
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
