import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { validateAndProcessUpload } from '@/lib/secure-upload';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

function isAdminOrManager(session) {
  const roles = session?.user?.roles || [];
  return roles.includes('admin') || roles.includes('manager');
}

// ─── Image dimensions nikalo saved file se ───────────────────────────────────
async function getImageDimensionsFromFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ File not found: ${filePath}`);
      return { width: null, height: null };
    }
    const metadata = await sharp(filePath).metadata();
    console.log(`📐 Dimensions → width: ${metadata.width}, height: ${metadata.height} | ${filePath}`);
    return {
      width: metadata.width || null,
      height: metadata.height || null,
    };
  } catch (err) {
    console.warn(`⚠️ Could not read dimensions: ${err.message}`);
    return { width: null, height: null };
  }
}

const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || !isAdminOrManager(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const folder = (formData.get('folder') || 'uncategorized').toString();

    const result = await validateAndProcessUpload(file, {
      maxSize: 10 * 1024 * 1024,
      subFolder: `admin/${folder.replace(/^admin\//, '')}`,
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'audio/mpeg', 'audio/mp3'],
    });

    console.log(`\n📁 Upload result:`, result);

    // ─── Agar image hai to dimensions nikalo ─────────────────────────────
    let width = null;
    let height = null;

    const isImage = IMAGE_MIME_TYPES.includes(result.mimeType);

    if (isImage) {
      // result.url = "/uploads/admin/folder/filename.jpg"
      // Local path = public/uploads/admin/folder/filename.jpg
      const localPath = path.join(process.cwd(), 'public', result.url);
      console.log(`🔍 Reading dimensions from: ${localPath}`);
      ({ width, height } = await getImageDimensionsFromFile(localPath));
    }

    return NextResponse.json(
      {
        url: result.url,
        name: file.name,
        savedAs: result.fileName,
        size: result.size,
        type: result.mimeType,
        // ✅ Width/height ab response mein aa rahe hain
        width,
        height,
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