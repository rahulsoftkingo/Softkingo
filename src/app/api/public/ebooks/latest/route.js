import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const latest = await prisma.ebook.findFirst({
      where: {
        status: "published",
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    return NextResponse.json({ latest });
  } catch (error) {
    console.error("Error fetching latest ebook:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
