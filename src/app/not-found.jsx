// app/not-found.jsx

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4">
      <div className="relative max-w-xl w-full text-center">
        {/* subtle theme gradient glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center">
          <div className="h-44 w-44 sm:h-60 sm:w-60 rounded-full bg-sky-100 blur-3xl" />
        </div>

        {/* big 404 in slate, accent subheading in sky */}
        <p className="text-5xl sm:text-6xl font-semibold text-slate-900 mb-1">
          404
        </p>

        <p className="text-[11px] sm:text-xs tracking-[0.24em] uppercase text-sky-600 mb-2">
          Page not found
        </p>

        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">
          The page you&apos;re looking for isn&apos;t available.
        </h1>

        <p className="text-sm sm:text-base text-slate-600 mb-5">
          It may have been moved, removed, or the URL is slightly off. Use the
          links below to get back to the main sections of the website.
        </p>

        {/* primary theme buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-sky-600 hover:bg-sky-500 text-xs sm:text-sm font-semibold text-white"
          >
            Go to home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-sky-500/70 bg-white text-xs sm:text-sm font-semibold text-sky-800 hover:bg-sky-50"
          >
            View blog
          </Link>
        </div>

        {/* extra quick links in light theme */}
        <div className="space-y-1.5 text-[12px] sm:text-[13px] text-slate-600">
          <p className="font-semibold text-slate-900">
            Quick links you might need:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/services"
              className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200 transition-colors"
            >
              Services
            </Link>
            <Link
              href="/case-studies"
              className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200 transition-colors"
            >
              Case studies
            </Link>
            <Link
              href="/about"
              className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200 transition-colors"
            >
              About Softkingo
            </Link>
            <Link
              href="/contact"
              className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
