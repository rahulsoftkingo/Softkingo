// src/app/(admin)/e-guides/new/page.jsx
import EGuideForm from "../shared/EGuideForm";

export const dynamic = "force-dynamic";

export default function NewEGuidesPage() {
  return <EGuideForm mode="create" />;
}
