// src/app/api/admin/media/upload/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { validateAndProcessUpload } from '@/lib/secure-upload';

function isAdminOrManager(session) {
  const roles = session?.user?.roles || [];
  return roles.includes('admin') || roles.includes('manager');
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || !isAdminOrManager(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const folder = (formData.get('folder') || 'uncategorized').toString();

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
