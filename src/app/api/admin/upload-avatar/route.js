// src/app/api/admin/upload-avatar/route.js
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const runtime = 'nodejs'; // ensure Node runtime for fs

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!file || typeof file === 'string') {
    return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'avatars');
  await fs.mkdir(uploadsDir, { recursive: true });

  const ext = file.name.split('.').pop() || 'png';
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;

  const filePath = path.join(uploadsDir, fileName);
  await fs.writeFile(filePath, buffer);

  // URL that frontend can use
  const url = `/uploads/avatars/${fileName}`;

  return NextResponse.json({ url }, { status: 201 });
}
