import Link from "next/link";
import { FaThumbsUp } from "react-icons/fa";

export const dynamic = "force-static";

export async function generateMetadata() {
  return {
    title: "Healthcare - Industry | SoftKingo",
    description: "Custom industry development services - tailored digital solutions for healthcare with modern tech stack.",
  };
}

export default function Page() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative h-[260px] md:h-[320px] lg:h-[380px] bg-gradient-to-br from-slate-900 via-blue-900/20 to-indigo-900/40 border-b border-white/5"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 80%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #10b981 0%, transparent 50%)"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-slate-900/60 to-black/70" />
        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-300/70 mb-4">
              <Link href="/" className="hover:text-cyan-400 transition-all duration-200">
                Home
              </Link>
              <span className="text-slate-400">›</span>
              <Link href="/industries" className="hover:text-cyan-400 transition-all duration-200">
                Industrys
              </Link>
              <span className="text-cyan-400 font-medium text-sm ml-1">Healthcare</span>
            </nav>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-4">
              Healthcare
            </h1>

            <p className="mt-3 max-w-xl text-lg md:text-xl text-slate-200/90 leading-relaxed mb-6">
              Tailored industry solution with real-time features, scalable architecture and modern UI/UX design.
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4 text-sm md:text-base">
              <div className="inline-flex items-center gap-2 text-sm font-semibold bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-cyan-400/50 hover:border-cyan-300/80 transition-all duration-200">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-500/25" />
                Ready to Deploy
              </div>

              <div className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20 hover:border-white/30 transition-all duration-200">
                <span className="text-cyan-300 font-semibold">Avg: 4-6 weeks</span>
              </div>

              <div className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20 hover:border-white/30 transition-all duration-200">
                <span className="text-cyan-300 font-semibold">4.9⭐</span>
                <FaThumbsUp className="text-emerald-400 text-sm" />
              </div>

              <div className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20 hover:border-white/30 transition-all duration-200">
                Network: <span className="text-white font-semibold">500+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-6">
              Key Features
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Production-ready industry with battle-tested architecture and enterprise-grade features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl border border-slate-100/50 hover:border-blue-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 bg-white/70 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                Real-time Updates
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Live tracking, notifications & instant sync across all devices.
              </p>
            </div>

            <div className="group p-8 rounded-3xl border border-slate-100/50 hover:border-blue-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 bg-white/70 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                Cross-platform
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Native iOS, Android & Web apps with unified codebase & design.
              </p>
            </div>

            <div className="group p-8 rounded-3xl border border-slate-100/50 hover:border-blue-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 bg-white/70 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                Enterprise Security
              </h3>
              <p className="text-slate-600 leading-relaxed">
                JWT auth, end-to-end encryption & GDPR/CCPA compliant.
              </p>
            </div>

            <div className="group p-8 rounded-3xl border border-slate-100/50 hover:border-blue-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 bg-white/70 backdrop-blur-sm md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                🚧 Ready for Customization
              </h3>
              <p className="text-slate-600 leading-relaxed">
                <strong>Admin panel auto-created this page.</strong><br/>
                Edit this file to add your custom content:<br/>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs font-mono mt-3 block">
                  src/app/(public)/industries/healthcare/page.jsx
                </code>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
