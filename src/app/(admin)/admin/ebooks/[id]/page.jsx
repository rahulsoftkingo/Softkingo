// src/app/(admin)/e-guides/[id]/page.jsx
import prisma from "@/lib/prisma";
import EbookForm from "../shared/EbookForm";

export const dynamic = "force-dynamic";

export default async function EditEbooksPage(props) {
  const params = await props.params;
  const id = Number(params.id);
  if (!id || Number.isNaN(id)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-slate-600">
        Invalid E‑book ID.
      </div>
    );
  }

  const guide = await prisma.ebook.findUnique({
    where: { id },
  });

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-slate-600">
        E‑book not found.
      </div>
    );
  }

  return <EbookForm mode="edit" guide={guide} />;
}
