// src/app/(admin)/e-guides/[id]/page.jsx
import prisma from "@/lib/prisma";
import EGuideForm from "../shared/EGuideForm";

export const dynamic = "force-dynamic";

export default async function EditEGuidesPage(props) {
  const params = await props.params;
  const id = Number(params.id);
  if (!id || Number.isNaN(id)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-slate-600">
        Invalid E‑Guide ID.
      </div>
    );
  }

  const guide = await prisma.eGuide.findUnique({
    where: { id },
  });

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-slate-600">
        E‑Guide not found.
      </div>
    );
  }

  return <EGuideForm mode="edit" guide={guide} />;
}
