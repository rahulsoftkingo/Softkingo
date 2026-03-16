// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// function getParsedSections(sectionsJson) {
//   if (!sectionsJson?.trim()) return [];
//   try {
//     const arr = JSON.parse(sectionsJson);
//     return Array.isArray(arr) ? arr : [];
//   } catch {
//     return [];
//   }
// }

// export default function EGuideForm({ mode, guide }) {
//   const router = useRouter();
//   const isEdit = mode === "edit";

//   const [autoSlug, setAutoSlug] = useState(!isEdit);

//   const initialSections = getParsedSections(guide?.sectionsJson || "");

//   const [form, setForm] = useState({
//     title: guide?.title || "",
//     slug: guide?.slug || "",
//     authorName: guide?.authorName || "",
//     authorRole: guide?.authorRole || "",
//     coverImage: guide?.coverImage || "",
//     category: guide?.category || "",
//     description: guide?.description || "",
//     readTimeText: guide?.readTimeText || "",
//     summary: guide?.summary || "",
//     sectionsJson: guide?.sectionsJson || "",
//     pdfUrl: guide?.pdfUrl || "",
//     status: guide?.status || "draft",
//     publishedAt: guide?.publishedAt
//       ? new Date(guide.publishedAt).toISOString().slice(0, 16)
//       : "",
//   });

//   const [sections, setSections] = useState(initialSections);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [jsonError, setJsonError] = useState("");
//   const [uploadingCover, setUploadingCover] = useState(false);
//   const [uploadingPdf, setUploadingPdf] = useState(false);

//   const syncSectionsJson = (nextSections) => {
//     setSections(nextSections);
//     try {
//       const json = JSON.stringify(nextSections, null, 2);
//       setForm((prev) => ({
//         ...prev,
//         sectionsJson: json,
//       }));
//       setJsonError("");
//     } catch {
//       setJsonError("Failed to serialise sections.");
//     }
//   };

//   const onChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => {
//       const next = { ...prev, [name]: value };
//       if (name === "title" && autoSlug && !isEdit) {
//         next.slug = value
//           .toLowerCase()
//           .trim()
//           .replace(/[^\w\s-]/g, "")
//           .replace(/\s+/g, "-");
//       }
//       return next;
//     });
//   };

//   async function uploadFile(file) {
//     const fd = new FormData();
//     fd.append("file", file);

//     const res = await fetch("/api/admin/media/upload", {
//       method: "POST",
//       body: fd,
//     });

//     if (!res.ok) {
//       let msg = "Upload failed";
//       try {
//         const data = await res.json();
//         msg = data.message || msg;
//       } catch {}
//       throw new Error(msg);
//     }

//     let data;
//     try {
//       data = await res.json();
//     } catch {
//       throw new Error("Upload response invalid");
//     }

//     if (!data?.url) {
//       throw new Error("Upload succeeded but URL missing");
//     }

//     return data.url;
//   }

//   const handleCoverUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploadingCover(true);
//     setError("");
//     try {
//       const url = await uploadFile(file);
//       setForm((prev) => ({
//         ...prev,
//         coverImage: url,
//       }));
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setUploadingCover(false);
//     }
//   };

//   const handlePdfUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploadingPdf(true);
//     setError("");
//     try {
//       const url = await uploadFile(file);
//       setForm((prev) => ({
//         ...prev,
//         pdfUrl: url,
//       }));
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setUploadingPdf(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     setError("");

//     try {
//       const res = await fetch(
//         isEdit
//           ? `/api/admin/e-guides/${guide.id}`
//           : "/api/admin/e-guides",
//         {
//           method: isEdit ? "PUT" : "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(form),
//         }
//       );

//       if (!res.ok) {
//         const data = await res.json().catch(() => ({}));
//         throw new Error(data.error || "Failed to save");
//       }

//       router.push("/admin/e-guides");
//       router.refresh();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const addSection = () => {
//     const next = [
//       ...sections,
//       { heading: "New section", body: "" },
//     ];
//     syncSectionsJson(next);
//   };

//   const updateSection = (index, field, value) => {
//     const next = sections.map((sec, i) =>
//       i === index ? { ...sec, [field]: value } : sec
//     );
//     syncSectionsJson(next);
//   };

//   const removeSection = (index) => {
//     const next = sections.filter((_, i) => i !== index);
//     syncSectionsJson(next);
//   };

//   const moveSection = (index, dir) => {
//     const newIndex = index + dir;
//     if (newIndex < 0 || newIndex >= sections.length) return;
//     const next = [...sections];
//     const temp = next[index];
//     next[index] = next[newIndex];
//     next[newIndex] = temp;
//     syncSectionsJson(next);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <header className="border-b bg-white">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
//           <div>
//             <h1 className="text-lg font-semibold text-slate-900">
//               {isEdit ? "Edit E‑Guide" : "New E‑Guide"}
//             </h1>
//             <p className="text-xs text-slate-500">
//               Manage title, metadata, content sections and download PDF.
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={() => router.push("/admin/e-guides")}
//             className="text-xs text-slate-500 hover:text-slate-700"
//           >
//             Back to list
//           </button>
//         </div>
//       </header>

//       <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
//         <form
//           onSubmit={handleSubmit}
//           className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)]"
//         >
//           {/* LEFT */}
//           <div className="space-y-5">
//             <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
//               {error && (
//                 <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-md px-3 py-2 mb-2">
//                   {error}
//                 </p>
//               )}

//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-slate-700">
//                   Title *
//                 </label>
//                 <input
//                   name="title"
//                   value={form.title}
//                   onChange={onChange}
//                   required
//                   className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
//                 />
//               </div>

//               <div className="grid gap-3 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-end">
//                 <div className="space-y-1.5">
//                   <label className="text-xs font-medium text-slate-700">
//                     Slug *
//                   </label>
//                   <input
//                     name="slug"
//                     value={form.slug}
//                     onChange={onChange}
//                     required
//                     className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
//                     placeholder="mobile-app-guide-2025"
//                   />
//                 </div>
//                 <label className="inline-flex items-center gap-2 text-[11px] text-slate-600">
//                   <input
//                     type="checkbox"
//                     checked={autoSlug}
//                     onChange={() => setAutoSlug((v) => !v)}
//                     className="h-3.5 w-3.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
//                   />
//                   Auto-generate slug from title
//                 </label>
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-slate-700">
//                   Short description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={form.description}
//                   onChange={onChange}
//                   rows={3}
//                   className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-slate-700">
//                   Summary (What you will learn)
//                 </label>
//                 <textarea
//                   name="summary"
//                   value={form.summary}
//                   onChange={onChange}
//                   rows={3}
//                   className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
//                 />
//               </div>
//             </div>

//             {/* Sections editor */}
//             <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
//                   Sections
//                 </h2>
//                 {jsonError && (
//                   <span className="text-[11px] text-rose-600">
//                     {jsonError}
//                   </span>
//                 )}
//               </div>

//               <div className="space-y-3 max-h-72 overflow-auto pr-1">
//                 {sections.map((sec, index) => (
//                   <div
//                     key={index}
//                     className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 space-y-2"
//                   >
//                     <div className="flex items-center justify-between gap-2">
//                       <input
//                         value={sec.heading || ""}
//                         onChange={(e) =>
//                           updateSection(index, "heading", e.target.value)
//                         }
//                         placeholder={`Section ${index + 1} heading`}
//                         className="flex-1 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500"
//                       />
//                       <div className="flex items-center gap-1">
//                         <button
//                           type="button"
//                           onClick={() => moveSection(index, -1)}
//                           className="px-2 py-1 text-[10px] rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100"
//                         >
//                           ↑
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => moveSection(index, 1)}
//                           className="px-2 py-1 text-[10px] rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100"
//                         >
//                           ↓
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => removeSection(index)}
//                           className="px-2 py-1 text-[10px] rounded-md border border-rose-200 text-rose-600 hover:bg-rose-50"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                     <textarea
//                       value={sec.body || ""}
//                       onChange={(e) =>
//                         updateSection(index, "body", e.target.value)
//                       }
//                       rows={3}
//                       placeholder="Section body (plain text or markdown-style)"
//                       className="w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500"
//                     />
//                   </div>
//                 ))}
//                 {!sections.length && (
//                   <p className="text-[11px] text-slate-500">
//                     No sections yet. Add your first section below.
//                   </p>
//                 )}
//               </div>

//               <button
//                 type="button"
//                 onClick={addSection}
//                 className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
//               >
//                 + Add section
//               </button>
//             </div>
//           </div>

//           {/* RIGHT */}
//           <div className="space-y-5">
//             <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
//               <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
//                 Meta
//               </h2>

//               <div className="grid gap-3 sm:grid-cols-2">
//                 <div className="space-y-1.5">
//                   <label className="text-xs font-medium text-slate-700">
//                     Status
//                   </label>
//                   <select
//                     name="status"
//                     value={form.status}
//                     onChange={onChange}
//                     className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
//                   >
//                     <option value="draft">draft</option>
//                     <option value="published">published</option>
//                   </select>
//                 </div>

//                 <div className="space-y-1.5">
//                   <label className="text-xs font-medium text-slate-700">
//                     Published at
//                   </label>
//                   <input
//                     type="datetime-local"
//                     name="publishedAt"
//                     value={form.publishedAt}
//                     onChange={onChange}
//                     className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-slate-700">
//                   Author name
//                 </label>
//                 <input
//                   name="authorName"
//                   value={form.authorName}
//                   onChange={onChange}
//                   className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-slate-700">
//                   Author role
//                 </label>
//                 <input
//                   name="authorRole"
//                   value={form.authorRole}
//                   onChange={onChange}
//                   className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-slate-700">
//                   Category
//                 </label>
//                 <input
//                   name="category"
//                   value={form.category}
//                   onChange={onChange}
//                   className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
//                   placeholder="Mobile Apps, Healthcare..."
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-slate-700">
//                   Read time text
//                 </label>
//                 <input
//                   name="readTimeText"
//                   value={form.readTimeText}
//                   onChange={onChange}
//                   className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
//                   placeholder="28 min read"
//                 />
//               </div>
//             </div>

//             <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
//               <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
//                 Cover image
//               </h2>

//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-slate-700">
//                   Cover URL
//                 </label>
//                 <input
//                   name="coverImage"
//                   value={form.coverImage}
//                   onChange={onChange}
//                   className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
//                   placeholder="/images/eguides/monetization.png"
//                 />
//                 <p className="text-[11px] text-slate-500">
//                   Paste a URL or upload a file below.
//                 </p>
//               </div>

//               <div className="space-y-1.5">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleCoverUpload}
//                   disabled={uploadingCover}
//                   className="block w-full text-[11px] text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-800 hover:file:bg-slate-200"
//                 />
//                 {uploadingCover && (
//                   <p className="text-[11px] text-slate-500">
//                     Uploading cover...
//                   </p>
//                 )}
//                 {form.coverImage && (
//                   <div className="mt-1 flex items-center gap-2">
//                     <span className="text-[11px] text-slate-500">
//                       Preview:
//                     </span>
//                     <img
//                       src={form.coverImage}
//                       alt="Cover preview"
//                       className="h-10 w-8 rounded border border-slate-200 object-cover"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
//               <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
//                 Download PDF
//               </h2>

//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-slate-700">
//                   PDF URL
//                 </label>
//                 <input
//                   name="pdfUrl"
//                   value={form.pdfUrl}
//                   onChange={onChange}
//                   className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
//                   placeholder="/pdf/e-guides/app-monetization.pdf"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <input
//                   type="file"
//                   accept="application/pdf"
//                   onChange={handlePdfUpload}
//                   disabled={uploadingPdf}
//                   className="block w-full text-[11px] text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-800 hover:file:bg-slate-200"
//                 />
//                 {uploadingPdf && (
//                   <p className="text-[11px] text-slate-500">
//                     Uploading PDF...
//                   </p>
//                 )}
//                 {form.pdfUrl && (
//                   <p className="text-[11px] text-slate-500 truncate">
//                     Current: {form.pdfUrl}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="flex justify-end gap-2 pt-1">
//               <button
//                 type="button"
//                 onClick={() => router.push("/admin/e-guides")}
//                 className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={saving}
//                 className="rounded-md bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-sky-500 disabled:opacity-60"
//               >
//                 {saving
//                   ? "Saving..."
//                   : isEdit
//                   ? "Save changes"
//                   : "Create E‑Guide"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </main>
//     </div>
//   );
// }














"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function getParsedSections(sectionsJson) {
  if (!sectionsJson?.trim()) return [];
  try {
    const arr = JSON.parse(sectionsJson);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export default function EGuideForm({ mode, guide }) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [autoSlug, setAutoSlug] = useState(!isEdit);

  const initialSections = getParsedSections(guide?.sectionsJson || "");

  const [form, setForm] = useState({
    title: guide?.title || "",
    slug: guide?.slug || "",
    authorName: guide?.authorName || "",
    authorRole: guide?.authorRole || "",
    coverImage: guide?.coverImage || "",
    category: guide?.category || "",
    description: guide?.description || "",
    readTimeText: guide?.readTimeText || "",
    summary: guide?.summary || "",
    sectionsJson: guide?.sectionsJson || "",
    pdfUrl: guide?.pdfUrl || "",
    status: guide?.status || "draft",
    publishedAt: guide?.publishedAt
      ? new Date(guide.publishedAt).toISOString().slice(0, 16)
      : "",
  });

  const [sections, setSections] = useState(initialSections);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);

  const syncSectionsJson = (nextSections) => {
    setSections(nextSections);
    try {
      const json = JSON.stringify(nextSections, null, 2);
      setForm((prev) => ({
        ...prev,
        sectionsJson: json,
      }));
      setJsonError("");
    } catch {
      setJsonError("Failed to serialise sections.");
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "title" && autoSlug && !isEdit) {
        next.slug = value
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
      }
      return next;
    });
  };

  async function uploadFile(file) {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/admin/media/upload", {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      let msg = "Upload failed";
      try {
        const data = await res.json();
        msg = data.message || msg;
      } catch {}
      throw new Error(msg);
    }

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error("Upload response invalid");
    }

    if (!data?.url) {
      throw new Error("Upload succeeded but URL missing");
    }

    return data.url;
  }

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    setError("");
    try {
      const url = await uploadFile(file);
      setForm((prev) => ({
        ...prev,
        coverImage: url,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingCover(false);
    }
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPdf(true);
    setError("");
    try {
      const url = await uploadFile(file);
      setForm((prev) => ({
        ...prev,
        pdfUrl: url,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(
        isEdit
          ? `/api/admin/ebooks/${guide.id}`
          : "/api/admin/ebooks",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save");
      }

      router.push("/admin/e-guides");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const addSection = () => {
    const next = [
      ...sections,
      { heading: "New section", body: "" },
    ];
    syncSectionsJson(next);
  };

  const updateSection = (index, field, value) => {
    const next = sections.map((sec, i) =>
      i === index ? { ...sec, [field]: value } : sec
    );
    syncSectionsJson(next);
  };

  const removeSection = (index) => {
    const next = sections.filter((_, i) => i !== index);
    syncSectionsJson(next);
  };

  const moveSection = (index, dir) => {
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= sections.length) return;
    const next = [...sections];
    const temp = next[index];
    next[index] = next[newIndex];
    next[newIndex] = temp;
    syncSectionsJson(next);
  };

  // Test content for sections
  const addSampleContent = () => {
    const sampleSections = [
      {
        heading: "Introduction",
        body: "This guide provides comprehensive insights into modern development practices. Whether you're a beginner or an experienced developer, you'll find valuable information to enhance your skills."
      },
      {
        heading: "Key Concepts",
        body: "Understanding the fundamental concepts is crucial for success. We'll cover the core principles that form the foundation of modern development approaches."
      },
      {
        heading: "Best Practices",
        body: "Learn industry-standard best practices that will help you write cleaner, more maintainable code and avoid common pitfalls."
      },
      {
        heading: "Advanced Techniques",
        body: "Take your skills to the next level with advanced techniques and patterns used by senior developers in production environments."
      }
    ];
    syncSectionsJson(sampleSections);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/admin/e-guides")}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {isEdit ? "Edit E‑book" : "Create New E‑book"}
                </h1>
                <p className="text-slate-600 mt-1">
                  {isEdit 
                    ? "Update your guide content and metadata" 
                    : "Create a new expert guide for your audience"
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={addSampleContent}
                className="px-4 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-700 hover:bg-slate-50 transition-colors duration-200"
              >
                Add Sample Content
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Basic Information</h2>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Guide Title *
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    required
                    placeholder="Enter a compelling title for your guide"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Slug *
                    </label>
                    <input
                      name="slug"
                      value={form.slug}
                      onChange={onChange}
                      required
                      placeholder="unique-guide-slug"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        checked={autoSlug}
                        onChange={() => setAutoSlug((v) => !v)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-600">Auto-generate from title</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={onChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Short Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={onChange}
                    rows={3}
                    placeholder="Brief description that appears in listings and search results"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Summary (What readers will learn)
                  </label>
                  <textarea
                    name="summary"
                    value={form.summary}
                    onChange={onChange}
                    rows={3}
                    placeholder="Key takeaways and learning objectives for your readers"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Sections Editor Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900">Content Sections</h2>
                </div>
                {jsonError && (
                  <span className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-lg">{jsonError}</span>
                )}
              </div>

              <div className="space-y-4 max-h-96 overflow-auto pr-2">
                {sections.map((sec, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <input
                        value={sec.heading || ""}
                        onChange={(e) => updateSection(index, "heading", e.target.value)}
                        placeholder={`Section ${index + 1} heading`}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => moveSection(index, -1)}
                          disabled={index === 0}
                          className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSection(index, 1)}
                          disabled={index === sections.length - 1}
                          className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          onClick={() => removeSection(index)}
                          className="p-2 text-red-600 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={sec.body || ""}
                      onChange={(e) => updateSection(index, "body", e.target.value)}
                      rows={4}
                      placeholder="Section content (supports markdown formatting)"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                    />
                  </div>
                ))}
                
                {sections.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-slate-300 rounded-xl">
                    <svg className="w-12 h-12 text-slate-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-slate-600 mb-2">No sections added yet</p>
                    <p className="text-sm text-slate-500">Start by adding your first section or use sample content</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={addSection}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Section
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Meta Information Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Meta Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Published Date
                  </label>
                  <input
                    type="datetime-local"
                    name="publishedAt"
                    value={form.publishedAt}
                    onChange={onChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Author Name
                    </label>
                    <input
                      name="authorName"
                      value={form.authorName}
                      onChange={onChange}
                      placeholder="Hardev Singh"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Author Role
                    </label>
                    <input
                      name="authorRole"
                      value={form.authorRole}
                      onChange={onChange}
                      placeholder="Product Lead"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <input
                    name="category"
                    value={form.category}
                    onChange={onChange}
                    placeholder="Mobile Apps, Healthcare, AI & ML..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Read Time
                  </label>
                  <input
                    name="readTimeText"
                    value={form.readTimeText}
                    onChange={onChange}
                    placeholder="28 min read"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Cover Image Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Cover Image</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Cover Image URL
                  </label>
                  <input
                    name="coverImage"
                    value={form.coverImage}
                    onChange={onChange}
                    placeholder="/images/ebooks/guide-cover.png"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload Cover Image
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-slate-400 transition-colors duration-200">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      disabled={uploadingCover}
                      className="hidden"
                      id="cover-upload"
                    />
                    <label
                      htmlFor="cover-upload"
                      className="cursor-pointer block"
                    >
                      <svg className="w-8 h-8 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span className="text-sm text-slate-600">
                        {uploadingCover ? "Uploading..." : "Click to upload cover image"}
                      </span>
                    </label>
                  </div>
                </div>

                {form.coverImage && (
                  <div className="border border-slate-200 rounded-xl p-4">
                    <p className="text-sm font-medium text-slate-700 mb-2">Preview</p>
                    <div className="w-32 h-48 mx-auto border border-slate-300 rounded-lg overflow-hidden bg-slate-100">
                      <img
                        src={form.coverImage}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* PDF Download Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-slate-900">PDF Download</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    PDF URL
                  </label>
                  <input
                    name="pdfUrl"
                    value={form.pdfUrl}
                    onChange={onChange}
                    placeholder="/pdf/ebooks/guide-name.pdf"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload PDF File
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-slate-400 transition-colors duration-200">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfUpload}
                      disabled={uploadingPdf}
                      className="hidden"
                      id="pdf-upload"
                    />
                    <label
                      htmlFor="pdf-upload"
                      className="cursor-pointer block"
                    >
                      <svg className="w-8 h-8 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm text-slate-600">
                        {uploadingPdf ? "Uploading..." : "Click to upload PDF file"}
                      </span>
                    </label>
                  </div>
                </div>

                {form.pdfUrl && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                    <p className="text-sm text-green-700">
                      PDF file is ready for download
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/admin/ebooks")}
                  className="flex-1 px-6 py-3 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </div>
                  ) : isEdit ? (
                    "Update Guide"
                  ) : (
                    "Create Guide"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}