// src/app/(admin)/podcast/[id]/page.jsx
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import PodcastForm from "../shared/PodcastForm";

export const dynamic = "force-dynamic";

export default async function PodcastFormPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (id === "new") {
    return <PodcastForm mode="create" />;
  }

  if (!id) {
    notFound();
  }

  const podcast = await prisma.podcast.findUnique({
    where: { id },
  });

  if (!podcast) {
    notFound();
  }

  return <PodcastForm mode="edit" podcast={podcast} />;
}