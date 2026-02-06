import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    // Sanitize folder path
    const folder = (searchParams.get('folder') || '').replace(/\\/g, '/');
    const safeFolder = folder.replace(/^\//, '').replace(/\.\./g, '');
    const targetDir = path.join(PUBLIC_DIR, safeFolder);

    // 1. Check if directory exists
    try {
      await fs.access(targetDir);
    } catch {
      // If directory doesn't exist, try creating it (if it's a subfolder of uploads)
      if (safeFolder.startsWith('uploads')) {
        try {
          await fs.mkdir(targetDir, { recursive: true });
        } catch (mkErr) {
          console.error("Failed to create directory:", mkErr);
          // If creation fails, return empty list instead of crashing
          return NextResponse.json({ files: [] });
        }
      } else {
         // If path is invalid or non-existent and we won't create it
         return NextResponse.json({ files: [] });
      }
    }

    let files = [];
    try {
      const entries = await fs.readdir(targetDir, { withFileTypes: true });
      
      // ✅ Parallel stat calls for performance
      const filePromises = entries.map(async (e) => {
        const fullPath = path.join(targetDir, e.name);
        let size = 0;
        
        if (!e.isDirectory()) {
          try {
            const stat = await fs.stat(fullPath);
            size = stat.size;
          } catch {
            size = 0;
          }
        }

        return {
          name: e.name,
          isDir: e.isDirectory(),
          // Ensure forward slashes for URLs
          path: `/${path.join(safeFolder, e.name).replace(/\\/g, '/')}`,
          size,
        };
      });

      files = await Promise.all(filePromises);
    } catch (err) {
      console.error('List files error:', err);
      files = [];
    }

    return NextResponse.json({ files });
  } catch (error) {
    console.error('List API error:', error);
    return NextResponse.json({ files: [], error: error.message }, { status: 500 });
  }
}