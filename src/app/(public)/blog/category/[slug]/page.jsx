import SectionPage from "@/app/(public)/[sectionKey]/SectionPage";
import { BLOG_SECTIONS } from "@/app/(public)/[sectionKey]/sectionConfig";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await prisma.blogCategory.findUnique({
    where: { slug },
    select: { name: true }
  });
  
  const title = category ? `${category.name} | Insights` : "Insights Category";
  
  return {
    title: `${title}`,
    description: `Explore our latest insights and articles under the ${category?.name || 'various'} category.`,
  };
}

export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  
  // Merge slug into searchParams for SectionPage to consume as 'category'
  const resolvedSearchParams = await searchParams;
  const mergedParams = {
    ...resolvedSearchParams,
    category: slug
  };

  return (<>
      <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "softkingo", "item": "https://www.softkingo.com" },
              { "@type": "ListItem", "position": 2, "name": category?.name ?? slug, "item": `https://www.softkingo.com/${slug}` }
            ]
          })
        }}
      />
      <SectionPage sectionKey="blog" searchParams={mergedParams} />
    </>
  <SectionPage sectionKey="blog" searchParams={mergedParams} />
  </>);
}
