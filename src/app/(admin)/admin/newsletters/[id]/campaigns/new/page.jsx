import prisma from "@/lib/prisma";
import CampaignEditor from "./CampaignEditor";

export default async function NewCampaignPage({ params }) {
  const { id } = await params;
  const listId = Number(id);

  const list = await prisma.newsletterList.findUnique({
    where: { id: listId },
  });

  // Latest published blog posts to pick from
  const posts = await prisma.blogPost.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
    take: 20,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
    },
  });

  if (!list) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-600">List not found.</p>
      </div>
    );
  }

  return (
    <CampaignEditor list={list} posts={posts} />
  );
}
