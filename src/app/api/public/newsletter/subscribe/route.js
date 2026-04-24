// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function POST(req) {
//   let body = {};
//   try {
//     body = await req.json();
//   } catch {
//     return NextResponse.json(
//       { error: "Invalid JSON body" },
//       { status: 400 }
//     );
//   }

//   const email = body.email?.trim();
//   const name = body.name?.trim() || null;
//   const source = body.source?.trim() || "blog-newsletter";

//   if (!email) {
//     return NextResponse.json(
//       { error: "Email is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Ensure a default list exists
//     let list = await prisma.newsletterList.findUnique({
//       where: { slug: "blog-newsletter" },
//     });

//     if (!list) {
//       list = await prisma.newsletterList.create({
//         data: {
//           name: "Blog Newsletter",
//           slug: "blog-newsletter",
//           description: "Main blog newsletter list",
//         },
//       });
//     }

//     // Simple create: no composite unique
//     await prisma.newsletterSubscription.create({
//       data: {
//         email,
//         name,
//         status: "active",
//         source,
//         listId: list.id,
//       },
//     });

//     return NextResponse.json({ success: true }, { status: 201 });
//   } catch (error) {
//     console.error("Newsletter subscribe failed:", error);
//     return NextResponse.json(
//       { error: "Failed to subscribe" },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  let body = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const email = body.email?.trim();
  const name = body.name?.trim() || null;
  const source = body.source?.trim() || null;

  // new: list meta from caller
  const listSlug =
    body.listSlug?.trim() || "blog-newsletter";
  const listName =
    body.listName?.trim() || "Blog Newsletter";
  const listDescription =
    body.listDescription?.trim() ||
    "Main blog newsletter list";

  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  try {
    // Find or create list based on slug from page
    let list = await prisma.newsletterList.findUnique({
      where: { slug: listSlug },
    });

    if (!list) {
      list = await prisma.newsletterList.create({
        data: {
          name: listName,
          slug: listSlug,
          description: listDescription,
        },
      });
    }

    // Upsert subscription: if already exists, just update source/status if needed, else create
    await prisma.newsletterSubscription.upsert({
      where: {
        email_listId: {
          email,
          listId: list.id,
        },
      },
      update: {
        status: "active", // Reactivate if was inactive
        source: source || listSlug,
      },
      create: {
        email,
        name,
        status: "active",
        source: source || listSlug,
        listId: list.id,
      },
    });

    return NextResponse.json({ success: true, message: "Subscribed successfully" }, { status: 200 });
  } catch (error) {
    console.error("Newsletter subscribe failed:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
