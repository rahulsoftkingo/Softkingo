// app/(public)/gallery/page.jsx

import prisma from '@/lib/prisma';
import GalleryClient from './GalleryClient';
import InquirySection from '@/components/footer/InquirySection';

export const dynamic = 'force-dynamic';

// Section definitions + tag mapping
const SECTION_DEFS = [
  {
    id: 'office',
    label: 'Office & Workspace',
    description:
      'Where product, design and engineering teams collaborate to build exceptional digital products.',
    pill: 'Workspace',
    tag: 'gallery-office',
  },
  {
    id: 'teams',
    label: 'Team in Action',
    description:
      'Product reviews, design critiques and engineering deep‑work sessions that drive innovation.',
    pill: 'Teamwork',
    tag: 'gallery-team',
  },
  {
    id: 'clients',
    label: 'Client Collaborations',
    description:
      'Strategic workshops, roadmap alignment and launch‑day sessions with our valued partners.',
    pill: 'Partnerships',
    tag: 'gallery-client',
  },
  {
    id: 'culture',
    label: 'Events & Culture',
    description:
      'Hackathons, team offsites and the moments that shape our collaborative culture at Softkingo.',
    pill: 'Culture',
    tag: 'gallery-culture',
  },
];

function normalizeFilePath(filePath) {
  if (!filePath) return '';
  if (filePath.startsWith('http')) return filePath;
  if (filePath.startsWith('/')) return filePath;
  return `/uploads/${filePath}`;
}

export default async function GalleryPage() {
  // Cloud Build time par DB socket available nahi hota,
  // isliye build phase me DB calls avoid kar rahe hain.
  if (process.env.SKIP_SSG_DB === 'true') {
    const sections = SECTION_DEFS.map((s) => ({ ...s, images: [] }));
    return <GalleryClient sections={sections} />;
  }

  const media = await prisma.mediaItem.findMany({
    where: {
      type: 'image',
      OR: SECTION_DEFS.map((s) => ({
        tags: { contains: s.tag },
      })),
    },
    orderBy: { createdAt: 'desc' },
  });

  const sections = SECTION_DEFS.map((sec) => {
    const images = media
      .filter((m) => (m.tags || '').includes(sec.tag))
      .map((m) => ({
        src: normalizeFilePath(m.filePath),
        alt: m.title || sec.label,
      }));

    return { ...sec, images };
  });

  return (
<>   
  <GalleryClient sections={sections} />
     <InquirySection />
</>
  );
}
