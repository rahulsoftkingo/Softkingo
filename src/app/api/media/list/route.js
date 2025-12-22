// app/api/media/list/route.js
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const folder = (searchParams.get('folder') || '').replace(/\\/g, '/');
    const safeFolder = folder.replace(/^\//, '').replace(/\.\./g, '');
    const targetDir = path.join(PUBLIC_DIR, safeFolder);

    let files = [];
    try {
      const entries = await fs.readdir(targetDir, { withFileTypes: true });
      
      // ✅ Fixed: Parallel stat calls with Promise.all
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
