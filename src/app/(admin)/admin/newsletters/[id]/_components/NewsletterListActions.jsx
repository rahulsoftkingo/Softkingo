"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Trash2, Edit } from "lucide-react";

export default function NewsletterListActions({ listId }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleExport = () => {
    window.location.href = `/api/admin/newsletters/${listId}/subscribers/export`;
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this list? All subscribers and campaigns associated with it will be permanently removed.")) {
      return;
    }

    try {
      setDeleting(true);
      const res = await fetch(`/api/admin/newsletters/${listId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/newsletters");
        router.refresh();
      } else {
        alert("Failed to delete list.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <Download size={14} />
        Export CSV
      </button>
      
      <button
        disabled={deleting}
        onClick={handleDelete}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-rose-100 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
      >
        <Trash2 size={14} />
        {deleting ? "Deleting..." : "Delete List"}
      </button>
    </div>
  );
}
