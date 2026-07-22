// src/app/(admin)/podcasts/[id]/page.jsx
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import PodcastForm from "../PodcastForm";

export const dynamic = "force-dynamic";

export default async function PodcastFormPage({ params }) {
  const { id } = params;
  // If you're on Next.js 15+, change the line above to:
  // const { id } = await params;

  // "new" -> create form, no DB lookup needed
  if (id === "new") {
    return <PodcastForm mode="create" />;
  }

  // any other id -> fetch and show edit form
  const podcast = await prisma.podcast.findUnique({
    where: { id },
  });

  if (!podcast) {
    notFound();
  }

  return <PodcastForm mode="edit" podcast={podcast} />;
}