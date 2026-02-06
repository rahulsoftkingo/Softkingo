import { NextResponse } from 'next/server';
import prisma from '@/lib/db'; // Ensure this points to your existing prisma client instance

// =========================================================
// GET: Fetch Pages (List or Single)
// =========================================================
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const section = searchParams.get('section'); // 'solutions', 'industries', 'clones', 'all'

    // --- CASE A: FETCH SINGLE PAGE (For Editor) ---
    if (id || slug) {
      const whereClause = id ? { id: parseInt(id) } : { slug: slug };
      const page = await prisma.page.findUnique({ where: whereClause });

      if (!page) {
        return NextResponse.json({ success: false, message: "Page not found" }, { status: 404 });
      }

      // ✅ FIX: Robust JSON Parsing
      let parsedContent = {};
      try {
        if (typeof page.contentJson === 'string') {
          parsedContent = JSON.parse(page.contentJson);
        } else if (typeof page.contentJson === 'object') {
          parsedContent = page.contentJson; // Already an object (some DBs handle JSON types differently)
        }
      } catch (e) {
        console.error("JSON Parse Error:", e);
        parsedContent = {}; // Fallback
      }

      return NextResponse.json({
        success: true, // Use 'success' consistently
        data: {
          id: page.id,
          title: page.title,
          slug: page.slug,
          type: page.type,
          status: page.status,
          // Unpack JSON for the editor state
          activeSections: parsedContent.activeSections || [],
          content: parsedContent.content || {} 
        }
      });
    }

    // --- CASE B: FETCH LIST (For Admin Table) ---
    let typeFilter = {};
    
    // Map admin section to DB types
    if (section === 'solutions') typeFilter = { type: 'solution' };
    else if (section === 'industries') typeFilter = { type: 'industry' };
    else if (section === 'clones') typeFilter = { type: 'clone' };
    
    // If section is 'all', fetch specific types to exclude unrelated pages (like blog)
    if (!section || section === 'all') {
        typeFilter = { type: { in: ['solution', 'industry', 'clone'] } };
    }

    const pages = await prisma.page.findMany({
      where: typeFilter,
      select: {
        id: true,
        title: true,
        slug: true,
        type: true,
        status: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' }
    });

    // Grouping data for the Admin Dashboard
    const responseData = {
      solutions: pages.filter(p => p.type === 'solution'),
      industries: pages.filter(p => p.type === 'industry'),
      clones: pages.filter(p => p.type === 'clone'),
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

    // 1. Validation
    if (!slug || !title) {
      return NextResponse.json({ success: false, message: "Title and Slug are required." }, { status: 400 });
    }

    // Clean Slug
    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');

    // 2. Check for Duplicate Slug
    const existing = await prisma.page.findUnique({
      where: { slug: cleanSlug }
    });

    // If ID exists (Update mode), ensure we aren't colliding with ANOTHER page's slug
    if (existing && (!id || existing.id !== parseInt(id))) {
      return NextResponse.json({ success: false, message: "Slug already exists. Please choose another." }, { status: 409 });
    }

    // 3. Prepare JSON String (Fix for MySQL Text type)
    const contentDataString = JSON.stringify({
      activeSections: activeSections || [],
      content: content || {}
    });

    let savedPage;

    if (id) {
      // --- UPDATE ---
      savedPage = await prisma.page.update({
        where: { id: parseInt(id) },
        data: {
          title,
          slug: cleanSlug,
          key: cleanSlug, 
          type,
          status: status || 'draft',
          contentJson: contentDataString, // Pass String, not Object
          updatedAt: new Date()
        }
      });
    } else {
      // --- CREATE ---
      savedPage = await prisma.page.create({
        data: {
          title,
          slug: cleanSlug,
          key: cleanSlug, // FIX: Added required 'key' field
          type: type || 'solution',
          status: status || 'draft',
          contentJson: contentDataString, // Pass String, not Object
          seoTitle: title, // Optional default
        }
      });
    }

    return NextResponse.json({ success: true, message: "Saved successfully", data: savedPage });

  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// =========================================================
// DELETE: Remove Page
// =========================================================
export async function DELETE(request) {
  try {
    const body = await request.json();
    const { slug, id } = body; 

    // Handle deletion by ID (preferred) or Slug
    let whereClause = {};
    if (id) whereClause = { id: parseInt(id) };
    else if (slug) whereClause = { slug: slug };
    else return NextResponse.json({ success: false, message: "Slug or ID required" }, { status: 400 });

    await prisma.page.delete({
      where: whereClause
    });

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("API DELETE Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}