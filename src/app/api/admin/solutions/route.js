// import { NextResponse } from 'next/server';
// import prisma from '@/lib/db';
// import fs from 'fs/promises';
// import path from 'path';

// // --- Helper: Scan Folders ---
// async function getFilePages(section) {
//   const baseDir = path.join(process.cwd(), `src/app/(public)/${section}`);
//   try {
//     const entries = await fs.readdir(baseDir, { withFileTypes: true });
//     // Filter directories that contain page.jsx/tsx/js
//     const pages = [];
//     for (const entry of entries) {
//       if (entry.isDirectory()) {
//         const hasPage = await fs.access(path.join(baseDir, entry.name, 'page.jsx'))
//           .then(() => true)
//           .catch(() => false);
        
//         if (hasPage) {
//           pages.push(entry.name); // slug is folder name
//         }
//       }
//     }
//     return pages;
//   } catch (e) {
//     // If folder doesn't exist, return empty
//     return [];
//   }
// }

// // =========================================================
// // GET: Fetch Pages (List or Single)
// // =========================================================
// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');
//     const slug = searchParams.get('slug');
//     const section = searchParams.get('section'); // 'solutions', 'industries', 'clones', 'all'

//     // --- CASE A: FETCH SINGLE PAGE (For Editor) ---
//     if (id || slug) {
//       // (Existing Single Page Logic Remains Same)
//       const whereClause = id ? { id: parseInt(id) } : { slug: slug };
//       const page = await prisma.page.findUnique({ where: whereClause });

//       if (!page) {
//         return NextResponse.json({ success: false, message: "Page not found" }, { status: 404 });
//       }

//       let parsedContent = {};
//       try {
//         if (typeof page.contentJson === 'string') {
//           parsedContent = JSON.parse(page.contentJson);
//         } else if (typeof page.contentJson === 'object') {
//           parsedContent = page.contentJson;
//         }
//       } catch (e) {
//         console.error("JSON Parse Error:", e);
//         parsedContent = {}; 
//       }

//       return NextResponse.json({
//         success: true,
//         data: {
//           id: page.id,
//           title: page.title,
//           slug: page.slug,
//           type: page.type,
//           status: page.status,
//           activeSections: parsedContent.activeSections || [],
//           content: parsedContent.content || {} 
//         }
//       });
//     }

//     // --- CASE B: FETCH LIST (Merged DB + File System) ---
    
//     // 1. Fetch DB Pages
//     let typeFilter = {};
//     if (section === 'solutions') typeFilter = { type: 'solution' };
//     else if (section === 'industries') typeFilter = { type: 'industry' };
//     else if (section === 'clones') typeFilter = { type: 'clone' };
//     if (!section || section === 'all') {
//         typeFilter = { type: { in: ['solution', 'industry', 'clone'] } };
//     }

//     const dbPages = await prisma.page.findMany({
//       where: typeFilter,
//       select: {
//         id: true, title: true, slug: true, type: true, status: true, updatedAt: true,
//       },
//       orderBy: { updatedAt: 'desc' }
//     });

//     // 2. Fetch File System Pages
//     const fileSolutions = await getFilePages('solutions');
//     const fileIndustries = await getFilePages('industries');

//     // 3. Merge Logic
//     // We want a list where we know if a page exists in DB, File, or Both.
    
//     const mergePages = (dbList, fileList, defaultType) => {
//         const map = new Map();

//         // Add DB pages first
//         dbList.forEach(p => {
//             map.set(p.slug, { 
//                 ...p, 
//                 source: 'db' // Mark as DB
//             });
//         });

//         // Add/Update with File pages
//         fileList.forEach(slug => {
//             if (map.has(slug)) {
//                 // If exists in DB, mark as 'both'
//                 const existing = map.get(slug);
//                 map.set(slug, { ...existing, source: 'both' });
//             } else {
//                 // If only in File
//                 map.set(slug, {
//                     id: `file-${slug}`, // Fake ID for key
//                     title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Auto title
//                     slug: slug,
//                     type: defaultType,
//                     status: 'published', // Files are always live
//                     updatedAt: new Date(),
//                     source: 'file' // Mark as File
//                 });
//             }
//         });

//         return Array.from(map.values());
//     };

//     // Filter DB lists by type
//     const dbSolutions = dbPages.filter(p => p.type === 'solution');
//     const dbIndustries = dbPages.filter(p => p.type === 'industry');
//     const dbClones = dbPages.filter(p => p.type === 'clone'); // Clones usually live in /solutions folder too

//     // Merge Lists
//     // Note: Clones might be mixed in solutions folder, logic here assumes standard structure
//     const finalSolutions = mergePages(dbSolutions, fileSolutions, 'solution');
//     const finalIndustries = mergePages(dbIndustries, fileIndustries, 'industry');
    
//     // For clones, we only have DB data usually, unless you have a specific /clones folder. 
//     // Assuming clones are just db entries for now or subset of solutions.
//     const finalClones = dbClones.map(p => ({ ...p, source: 'db' })); 

//     const responseData = {
//       solutions: finalSolutions,
//       industries: finalIndustries,
//       clones: finalClones,
//     };

//     return NextResponse.json({ ok: true, data: responseData });

//   } catch (error) {
//     console.error("API GET Error:", error);
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// }

// // ... (POST and DELETE functions remain exactly the same as previous correct version)
// // Just ensure you keep the POST and DELETE exports from the previous working code block.
// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { id, slug, title, type, status, activeSections, content } = body;

//     // 1. Validation
//     if (!slug || !title) {
//       return NextResponse.json({ success: false, message: "Title and Slug are required." }, { status: 400 });
//     }

//     // Clean Slug
//     const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');

//     // 2. Check for Duplicate Slug
//     const existing = await prisma.page.findUnique({
//       where: { slug: cleanSlug }
//     });

//     if (existing && (!id || existing.id !== parseInt(id))) {
//       return NextResponse.json({ success: false, message: "Slug already exists. Please choose another." }, { status: 409 });
//     }

//     const contentDataString = JSON.stringify({
//       activeSections: activeSections || [],
//       content: content || {}
//     });

//     let savedPage;

//     if (id) {
//       savedPage = await prisma.page.update({
//         where: { id: parseInt(id) },
//         data: { title, slug: cleanSlug, key: cleanSlug, type, status: status || 'draft', contentJson: contentDataString, updatedAt: new Date() }
//       });
//     } else {
//       savedPage = await prisma.page.create({
//         data: { title, slug: cleanSlug, key: cleanSlug, type: type || 'solution', status: status || 'draft', contentJson: contentDataString, seoTitle: title }
//       });
//     }

//     return NextResponse.json({ success: true, message: "Saved successfully", data: savedPage });

//   } catch (error) {
//     console.error("API POST Error:", error);
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// }

// export async function DELETE(request) {
//   try {
//     const body = await request.json();
//     const { slug, id } = body; 

//     let whereClause = {};
//     if (id) whereClause = { id: parseInt(id) };
//     else if (slug) whereClause = { slug: slug };
//     else return NextResponse.json({ success: false, message: "Slug or ID required" }, { status: 400 });

//     await prisma.page.delete({ where: whereClause });

//     return NextResponse.json({ success: true, message: "Deleted successfully" });
//   } catch (error) {
//     console.error("API DELETE Error:", error);
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';

// --- Helper: Scan Folders ---
async function getFilePages(section) {
  const baseDir = path.join(process.cwd(), `src/app/(public)/${section}`);
  try {
    const entries = await fs.readdir(baseDir, { withFileTypes: true });
    const pages = [];
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const hasPage = await fs.access(path.join(baseDir, entry.name, 'page.jsx'))
          .then(() => true)
          .catch(() => false);
        
        if (hasPage) {
          pages.push(entry.name); 
        }
      }
    }
    return pages;
  } catch (e) {
    return [];
  }
}

// =========================================================
// GET: Fetch Pages (Merged List)
// =========================================================
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const section = searchParams.get('section'); 

    // --- CASE A: FETCH SINGLE PAGE (For Editor) ---
    if (id || slug) {
      const whereClause = id ? { id: parseInt(id) } : { slug: slug };
      const page = await prisma.page.findUnique({ where: whereClause });

      if (!page) {
        // If not in DB, maybe it's a file? (Optional: Handle file-only editing later)
        return NextResponse.json({ success: false, message: "Page not found in DB" }, { status: 404 });
      }

      let parsedContent = {};
      try {
        if (typeof page.contentJson === 'string') parsedContent = JSON.parse(page.contentJson);
        else if (typeof page.contentJson === 'object') parsedContent = page.contentJson;
      } catch (e) { parsedContent = {}; }

      return NextResponse.json({
        success: true,
        data: {
          id: page.id,
          title: page.title,
          slug: page.slug,
          type: page.type,
          status: page.status,
          activeSections: parsedContent.activeSections || [],
          content: parsedContent.content || {} 
        }
      });
    }

    // --- CASE B: FETCH LIST ---
    let typeFilter = {};
    if (section === 'solutions') typeFilter = { type: 'solution' };
    else if (section === 'industries') typeFilter = { type: 'industry' };
    else if (section === 'clones') typeFilter = { type: 'clone' };
    if (!section || section === 'all') typeFilter = { type: { in: ['solution', 'industry', 'clone'] } };

    const dbPages = await prisma.page.findMany({
      where: typeFilter,
      select: { id: true, title: true, slug: true, type: true, status: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' }
    });

    const fileSolutions = await getFilePages('solutions');
    const fileIndustries = await getFilePages('industries');

    const mergePages = (dbList, fileList, defaultType) => {
        const map = new Map();
        // Add DB pages
        dbList.forEach(p => map.set(p.slug, { ...p, source: 'db' }));
        // Add/Merge File pages
        fileList.forEach(slug => {
            if (map.has(slug)) {
                const existing = map.get(slug);
                map.set(slug, { ...existing, source: 'both' }); // Exists in both
            } else {
                map.set(slug, {
                    id: `file-${slug}`, 
                    title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    slug: slug,
                    type: defaultType,
                    status: 'static',
                    updatedAt: new Date(),
                    source: 'file' 
                });
            }
        });
        return Array.from(map.values());
    };

    const dbSolutions = dbPages.filter(p => p.type === 'solution');
    const dbIndustries = dbPages.filter(p => p.type === 'industry');
    const dbClones = dbPages.filter(p => p.type === 'clone');

    const responseData = {
      solutions: mergePages(dbSolutions, fileSolutions, 'solution'),
      industries: mergePages(dbIndustries, fileIndustries, 'industry'),
      clones: dbClones.map(p => ({ ...p, source: 'db' })), // Clones typically DB only or mixed in solutions
    };

    return NextResponse.json({ ok: true, data: responseData });

  } catch (error) {
    console.error("API GET Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// =========================================================
// POST: Create or Update Page
// =========================================================
export async function POST(request) {
  try {
    const body = await request.json();
    const { id, slug, title, type, status, activeSections, content } = body;

    if (!slug || !title) return NextResponse.json({ success: false, message: "Title and Slug required." }, { status: 400 });

    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');

    // 1. Check DB Duplicate
    const existingDB = await prisma.page.findUnique({ where: { slug: cleanSlug } });
    if (existingDB && (!id || existingDB.id !== parseInt(id))) {
      return NextResponse.json({ success: false, message: "Slug already exists in Database." }, { status: 409 });
    }

    // 2. Check File Duplicate (Optional Warning, but allow DB creation to 'claim' it)
    // Note: Creating a DB entry for an existing File page effectively "links" them in our Admin logic (source: 'both')
    
    const contentDataString = JSON.stringify({
      activeSections: activeSections || [],
      content: content || {}
    });

    let savedPage;
    if (id) {
      savedPage = await prisma.page.update({
        where: { id: parseInt(id) },
        data: { title, slug: cleanSlug, key: cleanSlug, type, status: status || 'draft', contentJson: contentDataString, updatedAt: new Date() }
      });
    } else {
      savedPage = await prisma.page.create({
        data: { title, slug: cleanSlug, key: cleanSlug, type: type || 'solution', status: status || 'draft', contentJson: contentDataString, seoTitle: title }
      });
    }

    return NextResponse.json({ success: true, message: "Saved successfully", data: savedPage });

  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// =========================================================
// DELETE: Handle DB or File Deletion
// =========================================================
export async function DELETE(request) {
  try {
    const body = await request.json();
    const { slug, id, action, section } = body; // action: 'delete_db' | 'delete_file'

    if (!slug) return NextResponse.json({ success: false, message: "Slug required" }, { status: 400 });

    // --- OPTION A: DELETE FROM DATABASE ---
    if (action === 'delete_db') {
        if (!id && !slug) return NextResponse.json({ success: false, message: "ID or Slug required for DB delete" }, { status: 400 });
        
        // Use ID if available for precision
        const whereClause = id && typeof id === 'number' ? { id: parseInt(id) } : { slug: slug };
        
        await prisma.page.deleteMany({ where: whereClause });
        return NextResponse.json({ success: true, message: "Deleted from Database" });
    }

    // --- OPTION B: DELETE FROM FILE SYSTEM ---
    if (action === 'delete_file') {
        if (!section) return NextResponse.json({ success: false, message: "Section required to locate file" }, { status: 400 });
        
        const folderName = section === 'industries' ? 'industries' : 'solutions';
        const dirPath = path.join(process.cwd(), `src/app/(public)/${folderName}/${slug}`);

        try {
            await fs.rm(dirPath, { recursive: true, force: true });
            return NextResponse.json({ success: true, message: "Folder Deleted Successfully" });
        } catch (err) {
            console.error("Folder Delete Error:", err);
            return NextResponse.json({ success: false, message: "Failed to delete folder. Check permissions." }, { status: 500 });
        }
    }

    return NextResponse.json({ success: false, message: "Invalid action specified" }, { status: 400 });

  } catch (error) {
    console.error("API DELETE Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}