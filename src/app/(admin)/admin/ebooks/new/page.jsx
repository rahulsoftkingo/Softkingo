// src/app/(admin)/e-guides/new/page.jsx
import EbookForm from "../shared/EbookForm";

export const dynamic = "force-dynamic";

export default function NewEbooksPage() {
  return <EbookForm mode="create" />;
}
