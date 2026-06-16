import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import sharp from 'sharp';
import nodePath from 'path';
import fs from 'fs';

// ─── Helper: dimensions nikalo ───────────────────────────────────────────────
async function getImageDimensions(src) {
  try {
    if (!src || typeof src !== 'string') return { width: null, height: null };

    console.log(`📸 Getting dimensions for: ${src}`);

    let buffer;

    if (src.startsWith('http://') || src.startsWith('https://')) {
      const urlObj = new URL(src);
      const localPath = nodePath.join(process.cwd(), 'public', urlObj.pathname);
      console.log(`📂 Trying local file: ${localPath}`);

      if (fs.existsSync(localPath)) {
        buffer = fs.readFileSync(localPath);
      } else {
        console.log(`🌐 Fetching from network: ${src}`);
        const response = await fetch(src);
        if (!response.ok) {
          console.warn(`⚠️ Fetch failed: ${src} | Status: ${response.status}`);
          return { width: null, height: null };
        }
        buffer = Buffer.from(await response.arrayBuffer());
      }
    } else if (src.startsWith('/')) {
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

async function processContentImages(obj, currentPath = 'root') {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return Promise.all(obj.map((item, i) => processContentImages(item, `${currentPath}[${i}]`)));
  }

  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const fieldPath = `${currentPath}.${key}`;

    if (
      IMAGE_KEYS.includes(key) &&
      typeof value === 'string' &&
      (value.startsWith('http') || value.startsWith('/'))
    ) {
      console.log(`🔍 Image field found at: ${fieldPath} → ${value}`);
      const { width, height } = await getImageDimensions(value);
      result[key] = { src: value, width, height };
      console.log(`📐 Saved → ${fieldPath}: { src: ${value}, width: ${width}, height: ${height} }`);
    }
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

    const where = status && status !== 'all' ? { type: 'digital', status } : { type: 'digital' };

    const digitals = await prisma.page.findMany({
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

    return NextResponse.json({ digitals });
  } catch (error) {
    console.error('Get digitals error:', error);
    return NextResponse.json({ error: 'Failed to fetch digitals' }, { status: 500 });
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

    console.log('\n🚀 ─── POST /digital ───────────────────────────────');
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

    const digital = await prisma.page.create({
      data: {
        title,
        slug: finalSlug,
        key: finalSlug,
        type: 'digital',
        excerpt: excerpt || null,
        contentJson: contentDataString,
        status: status || 'published',
        featured: featured || false,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt || null,
        seoImage: seoImageData,
      },
    });

    console.log('\n✅ Digital page created | ID:', digital.id);
    console.log('────────────────────────────────────────────────────\n');

    return NextResponse.json({ digital });

  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Slug already exists. Please use a different slug.' },
        { status: 409 }
      );
    }
    console.error('\n❌ Create digital error:', error);
    return NextResponse.json({
      error: 'Failed to create digital page',
      details: error.message,
    }, { status: 500 });
  }
}