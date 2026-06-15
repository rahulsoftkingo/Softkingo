import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import sharp from 'sharp';
import nodePath from 'path';   // ✅ 'path' module ko alag naam diya
import fs from 'fs';

// ─── Helper: dimensions nikalo ───────────────────────────────────────────────
async function getImageDimensions(src) {
  try {
    if (!src || typeof src !== 'string') return { width: null, height: null };

    console.log(`📸 Getting dimensions for: ${src}`);

    let buffer;

    if (src.startsWith('http://') || src.startsWith('https://')) {
      // HTTP URL → pehle local file try karo
      const urlObj = new URL(src);
      const localPath = nodePath.join(process.cwd(), 'public', urlObj.pathname);
      console.log(`📂 Trying local file: ${localPath}`);

      if (fs.existsSync(localPath)) {
        buffer = fs.readFileSync(localPath);
      } else {
        // Fallback: network fetch
        console.log(`🌐 Fetching from network: ${src}`);
        const response = await fetch(src);
        if (!response.ok) {
          console.warn(`⚠️ Fetch failed: ${src} | Status: ${response.status}`);
          return { width: null, height: null };
        }
        buffer = Buffer.from(await response.arrayBuffer());
      }
    } else if (src.startsWith('/')) {
      // ✅ Relative path → public folder
      const localPath = nodePath.join(process.cwd(), 'public', src);
      console.log(`📂 Reading relative path: ${localPath}`);
      if (!fs.existsSync(localPath)) {
        console.warn(`⚠️ File not found: ${localPath}`);
        return { width: null, height: null };
      }
      buffer = fs.readFileSync(localPath);
    } else {
      console.warn(`⚠️ Unknown src format: ${src}`);
      return { width: null, height: null };
    }

    const metadata = await sharp(buffer).metadata();
    console.log(`✅ Got → width: ${metadata.width}, height: ${metadata.height} | ${src}`);
    return { width: metadata.width || null, height: metadata.height || null };

  } catch (err) {
    console.error(`❌ getImageDimensions error for "${src}": ${err.message}`);
    return { width: null, height: null };
  }
}

// ─── Helper: Content images recursively process karo ─────────────────────────
const IMAGE_KEYS = ['image', 'src', 'photo', 'thumbnail', 'backgroundImage', 'cover', 'imageSrc', 'heroBg'];

async function processContentImages(obj, currentPath = 'root') {  // ✅ 'path' → 'currentPath'
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return Promise.all(obj.map((item, i) => processContentImages(item, `${currentPath}[${i}]`)));
  }

  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const fieldPath = `${currentPath}.${key}`;

    // ✅ String image — http URL ya relative path dono handle karo
    if (
      IMAGE_KEYS.includes(key) &&
      typeof value === 'string' &&
      (value.startsWith('http') || value.startsWith('/'))  // ✅ '/' bhi check karo
    ) {
      console.log(`🔍 Image field found at: ${fieldPath} → ${value}`);
      const { width, height } = await getImageDimensions(value);
      result[key] = { src: value, width, height };  // ✅ Object mein save karo
      console.log(`📐 Saved → ${fieldPath}: { src: ${value}, width: ${width}, height: ${height} }`);
    }
    // ✅ Already object hai { url/src, width, height } — dimensions missing hain
    else if (
      value && typeof value === 'object' && !Array.isArray(value) &&
      (value.url || value.src) &&
      !value.width && !value.height
    ) {
      const imgSrc = value.url || value.src;
      console.log(`🔍 Image object found at: ${fieldPath} → ${imgSrc}`);
      const { width, height } = await getImageDimensions(imgSrc);
      result[key] = { ...value, width, height };
      console.log(`📐 Saved → ${fieldPath}: { src: ${imgSrc}, width: ${width}, height: ${height} }`);
    }
    // Recursively process karo
    else {
      result[key] = await processContentImages(value, fieldPath);
    }
  }

  return result;
}

// ─── GET ─────────────────────────────────────────────────────────────────────
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const where = status && status !== 'all' ? { type: 'service', status } : { type: 'service' };

    const services = await prisma.page.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            name: true,
            profileImage: true,
          },
        },
      },
    });

    return NextResponse.json({ services });
  } catch (error) {
    console.error('Get services error:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

// ─── POST ────────────────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      excerpt,
      status,
      featured,
      seoTitle,
      seoDescription,
      seoImage,
      activeSections,
      content,
    } = body;

    console.log('\n🚀 ─── POST /services ───────────────────────────────');
    console.log('📝 Title:', title);
    console.log('🔗 Slug:', slug);
    console.log('🖼️  seoImage:', seoImage);
    console.log('📄 content keys:', content ? Object.keys(content) : 'none');

    // ─── Slug unique check ────────────────────────────────────────────────
    let finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = await prisma.page.findUnique({ where: { slug: finalSlug } });
    if (existing) {
      return NextResponse.json(
        { error: `Slug "${finalSlug}" already exists. Please use a different slug.` },
        { status: 409 }
      );
    }

    // ─── seoImage dimensions ──────────────────────────────────────────────
    let seoImageData = null;
    if (seoImage && typeof seoImage === 'string') {
      console.log('\n── seoImage processing ──');
      const { width, height } = await getImageDimensions(seoImage);
      seoImageData = JSON.stringify({ url: seoImage, width, height });
      console.log('💾 seoImage final:', seoImageData);
    }

    // ─── Content images dimensions ────────────────────────────────────────
    console.log('\n── Content images processing ──');
    const processedContent = await processContentImages(content || {});
    console.log('✅ Content processing done');

    const contentDataString = JSON.stringify({
      activeSections: activeSections || [],
      content: processedContent,
    });

    const service = await prisma.page.create({
      data: {
        title,
        slug: finalSlug,
        key: finalSlug,
        type: 'service',
        excerpt: excerpt || null,
        contentJson: contentDataString,
        status: status || 'draft',
        featured: featured || false,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt || null,
        seoImage: seoImageData,
      },
    });

    console.log('\n✅ Service created | ID:', service.id);
    console.log('────────────────────────────────────────────────────\n');

    return NextResponse.json({ service });

  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Slug already exists. Please use a different slug.' },
        { status: 409 }
      );
    }
    console.error('\n❌ Create service error:', error);
    return NextResponse.json({
      error: 'Failed to create service',
      details: error.message,
    }, { status: 500 });
  }
}