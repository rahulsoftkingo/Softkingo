// "use client";

// import { useState } from "react";

// export default function EGuideDownloadModal({
//   guideId,
//   guideSlug,
//   pdfUrl,
//   smallButton = false,
//   boxMode = false,
// }) {
//   const [open, setOpen] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [status, setStatus] = useState("idle"); // idle | loading | success | error
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const onChange = (e) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.name || !form.email || !form.message) {
//       setStatus("error");
//       return;
//     }

//     setStatus("loading");
//     try {
//       const res = await fetch("/api/public/e-guides/lead", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           guideId,
//           guideSlug,
//           ...form,
//         }),
//       });

//       if (!res.ok) throw new Error("Request failed");

//       setSubmitted(true);
//       setStatus("success");
//     } catch (err) {
//       setStatus("error");
//     }
//   };

//   const canDownload = submitted && pdfUrl;

//   const FormContent = () => (
//     <>
//       <div className="flex flex-col text-center items-center gap-2 mb-3">
//         <div className="h-10 w-10 rounded-full bg-sky-600 flex items-center justify-center text-white text-xs font-bold">
//           SK
//         </div>
//         <div>
//           <p className="text-sm font-semibold text-slate-50">
//             Get this E‑Guide
//           </p>
//           {status === "success" && (
//             <p className="text-[10px] text-emerald-400 mt-1">
//               Thanks! Details submitted. Download is unlocked below.
//             </p>
//           )}
//           {status === "error" && (
//             <p className="text-[10px] text-rose-400 mt-1">
//               Name, email and message are required or something went wrong.
//             </p>
//           )}
//           {status === "idle" && (
//             <p className="text-[10px] text-slate-300 mt-1">
//               Share a few details and instantly access the PDF.
//             </p>
//           )}
//         </div>
//       </div>

//       {!submitted && (
//         <form className="space-y-3" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full name"
//             value={form.name}
//             onChange={onChange}
//             className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-[13px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Work email"
//             value={form.email}
//             onChange={onChange}
//             className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-[13px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
//           />
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone (optional)"
//             value={form.phone}
//             onChange={onChange}
//             className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-[13px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
//           />
//           <textarea
//             name="message"
//             rows={2}
//             placeholder="Tell us briefly about your app or idea"
//             value={form.message}
//             onChange={onChange}
//             className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-[13px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
//           />
//           <button
//             type="submit"
//             disabled={status === "loading"}
//             className="w-full rounded-full bg-[#00B7FF] hover:bg-[#0096d4] text-white text-[13px] font-semibold py-2.5 shadow-[0_10px_24px_rgba(8,47,73,0.7)] transition-colors disabled:opacity-70"
//           >
//             {status === "loading" ? "Submitting..." : "Submit & unlock PDF"}
//           </button>
//         </form>
//       )}

//       {submitted && (
//         <div className="mt-4 space-y-3">
//           {canDownload ? (
//             <a
//               href={pdfUrl}
//               target="_blank"
//               rel="noreferrer"
//               className="inline-flex items-center justify-center w-full rounded-full bg-emerald-500 text-xs sm:text-sm font-semibold py-2.5 text-white shadow-[0_10px_24px_rgba(6,95,70,0.7)] hover:bg-emerald-400 transition-colors"
//             >
//               Download PDF
//             </a>
//           ) : (
//             <p className="text-[11px] text-slate-400">
//               PDF URL is not configured for this guide.
//             </p>
//           )}
//           <p className="text-[10px] text-slate-400 text-center">
//             You may receive similar resources and updates on your email.
//           </p>
//         </div>
//       )}
//     </>
//   );

//   if (boxMode) {
//     return (
//       <div className="bg-slate-900/80 border border-sky-900/70 rounded-3xl p-5 sm:p-6 lg:p-7 shadow-[0_20px_50px_rgba(15,23,42,0.95)] space-y-4">
//         <FormContent />
//       </div>
//     );
//   }

//   const Trigger = () => (
//     <button
//       type="button"
//       onClick={() => setOpen(true)}
//       className={`rounded-full border border-sky-300/60 text-sky-100 font-semibold hover:bg-sky-500/20 transition-colors ${
//         smallButton
//           ? "px-3 py-1.5 text-[11px] sm:text-xs"
//           : "px-4 py-2 text-xs sm:text-sm"
//       }`}
//     >
//       Download PDF
//     </button>
//   );

//   return (
//     <>
//       <Trigger />

//       {open && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
//           <button
//             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//             onClick={() => setOpen(false)}
//             aria-label="Close"
//           />
//           <div className="relative w-full max-w-md bg-slate-950/95 border border-sky-900/60 rounded-3xl shadow-[0_18px_50px_rgba(15,23,42,0.9)] p-5 sm:p-6 lg:p-7 z-[61]">
//             <div className="flex items-start justify-between gap-3 mb-3">
//               <div />
//               <button
//                 onClick={() => setOpen(false)}
//                 className="w-7 h-7 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center hover:bg-slate-700 transition-colors"
//                 aria-label="Close"
//               >
//                 ✕
//               </button>
//             </div>
//             <FormContent />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }






// src/app/(public)/e-guides/[slug]/DownloadModal.jsx
"use client";

import { useState } from "react";

export default function EGuideDownloadModal({
  guideId,
  guideSlug,
  pdfUrl,
  smallButton = false,
  boxMode = false,
}) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const onChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/public/e-guides/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guideId,
          guideSlug,
          ...form,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setSubmitted(true);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  const canDownload = submitted && pdfUrl;

  const FormContent = () => (
    <>
      <div className="flex flex-col text-center items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-sky-50 rounded-2xl flex items-center justify-center text-white font-bold transform hover:scale-110 transition-transform duration-300">
          <img src='/images/logo.png' />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-1">
            Get this E‑Guide
          </h3>
          {status === "success" && (
            <p className="text-sm text-emerald-400">
              Thanks! Your download is ready.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-rose-400">
              Please fill all required fields.
            </p>
          )}
          {status === "idle" && (
            <p className="text-sm text-slate-400">
              Share a few details and get instant access to the PDF.
            </p>
          )}
        </div>
      </div>

      {!submitted && (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Full name *"
              value={form.name}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Work email *"
              value={form.email}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
            />
            <textarea
              name="message"
              rows={3}
              placeholder="Tell us briefly about your project or interest *"
              value={form.message}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 resize-none"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 text-white font-semibold py-3.5 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Submit & Unlock PDF
              </>
            )}
          </button>
        </form>
      )}

      {submitted && (
        <div className="space-y-4">
          {canDownload ? (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-3.5 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF Guide
            </a>
          ) : (
            <div className="text-center p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <p className="text-sm text-amber-300">
                PDF download will be available soon.
              </p>
            </div>
          )}
          <p className="text-xs text-slate-400 text-center">
            You may receive relevant resources and updates via email.
          </p>
        </div>
      )}
    </>
  );

  if (boxMode) {
    return (
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 hover:border-cyan-500/30 transition-all duration-300">
        <FormContent />
      </div>
    );
  }

  const Trigger = () => (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={`rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white font-semibold border border-slate-700 hover:border-slate-600 transition-all duration-200 flex items-center gap-2 ${
        smallButton
          ? "px-4 py-2 text-sm"
          : "px-6 py-3 text-base"
      }`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Download PDF
    </button>
  );

  return (
    <>
      <Trigger />

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setOpen(false)}
          />
          
          {/* Modal */}
          <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-3xl shadow-2xl p-6 z-50 transform animate-in fade-in-90 zoom-in-95 duration-300">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-slate-800 text-slate-200 flex items-center justify-center hover:bg-slate-700 transition-colors duration-200"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <FormContent />
          </div>
        </div>
      )}
    </>
  );
}