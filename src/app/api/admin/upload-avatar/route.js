// src/app/api/admin/upload-avatar/route.js
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { validateAndProcessUpload } from '@/lib/secure-upload';

export const runtime = 'nodejs'; // ensure Node runtime for fs

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    // ✅ Use centralized secure utility
    const result = await validateAndProcessUpload(file, {
      maxSize: 2 * 1024 * 1024,
      subFolder: 'admin/avatars'
    });

    return NextResponse.json({ url: result.url }, { status: 201 });
  } catch (err) {
    console.error('Avatar upload error', err);
    return NextResponse.json(
      { message: err.message || 'Upload failed.' },
      { status: 400 }
    );
  }
}
