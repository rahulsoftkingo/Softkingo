import Link from "next/link";
import { teamMembers } from "@/data/team";
import CommonTitle from "@/components/ui/CommonTitle";

export const metadata = {
  title: "Our Team | Softkingo",
  description: "Meet the developers, designers, and engineers at Softkingo.",
  alternates: { canonical: "https://www.softkingo.com/our-team" }
};

// Leader Card (Premium Gold + Glassmorphism)
function LeaderCard({ member }) {
  return (
    <div className="group relative rounded-3xl shadow-2xl overflow-hidden border-2 border-white/20 backdrop-blur-xl bg-gradient-to-br from-amber-500/10 via-yellow-400/5 to-orange-500/10 hover:shadow-3xl hover:-translate-y-4 transition-all duration-700">
      {/* Top-right logo */}
      <div className="absolute right-4 top-4 z-20 w-14 h-14 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 flex items-center justify-center">
        <img src="/images/logo.png" alt="Softkingo" className="w-9 h-9 object-contain" />
      </div>

      {/* Massive Image (full container) */}
      <div className="relative w-full h-96 md:h-[450px] rounded-3xl overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Glass overlay - Name & Role (ALWAYS VISIBLE) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent py-2 flex flex-col justify-end left-0">
          <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-r-3xl p-2 md:p-4 max-w-full ">
            <h3 className="text-md md:text-lg font-black text-white mb-3 leading-tight drop-shadow-2xl">
              {member.name}
            </h3>
            <p className="text-xs md:text-sm font-bold text-yellow-300 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg px-6 py-2 rounded-2xl border-2 border-yellow-300/50">
              {member.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Team Card (Clean minimal - same overlay style)
function TeamCard({ member }) {
  return (
    <div className="group relative rounded-3xl shadow-xl overflow-hidden border border-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white/70 backdrop-blur-sm">
      {/* Top-right logo */}
      <div className="absolute right-4 top-4 z-20 w-12 h-12 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 flex items-center justify-center">
        <img src="/images/logo.png" alt="Softkingo" className="w-7 h-7 object-contain" />
      </div>

      {/* Massive Image */}
      <div className="relative w-full h-80 md:h-[380px] rounded-3xl overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay - Name & Role (ALWAYS VISIBLE) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent p-8 flex flex-col justify-end left-0">
          <div className="backdrop-blur-xl bg-white/30 border border-white/40 rounded-xl  md:p-8 max-w-xl mx-auto">
            <h3 className="text-md md:text-lg font-bold text-white mb-2 leading-tight drop-shadow-xl">
              {member.name}
            </h3>
            <p className="text-sm md:text-md font-semibold text-sky-300 bg-sky-500/30 px-5 py-2 rounded-2xl border border-sky-400/50 backdrop-blur-sm">
              {member.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const leaders = teamMembers.filter((m) => m.isLeader);
  const team = teamMembers.filter((m) => !m.isLeader);

  return (
    <main className="bg-gradient-to-br from-[#f6f9ff] to-slate-50 min-h-screen">
      {/* HERO */}
      <section className="relative h-[280px] md:h-[360px] lg:h-[420px] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-900/60 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
          <div className="w-full">
            <nav className="flex items-center gap-2 text-sm text-slate-200/90 mb-4">
              <Link href="/" className="hover:text-cyan-300 transition-colors">
                Home
              </Link>
              <span className="text-slate-400">›</span>
              <span className="text-cyan-300 font-bold">Our Team</span>
            </nav>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 drop-shadow-2xl">
              Our Team
            </h1>

            <p className="max-w-2xl text-xl md:text-2xl text-slate-200 drop-shadow-lg">
              Developers, designers, and engineers building your success.
            </p>
          </div>
        </div>
      </section>

      {/* LEADERS */}
      <section className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="text-center mb-24">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
            Leadership
          </h2>
          <p className="text-lg md:text-xl text-slate-700 font-semibold max-w-4xl mx-auto leading-relaxed">
            Core team driving strategy, delivery, and excellence.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {leaders.slice(0, 3).map((member, i) => (
            <LeaderCard key={i} member={member} />
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="max-w-7xl mx-auto px-6 py-24 lg:py-32 -mt-16">
        <div className="text-center mb-14 ">
          
           <CommonTitle
                        align="center"
                        pill={false}
                        title="Our"
                        gradientText="Team"
                        subtitle="Engineers and designers shipping fast, stable products."
                      />
          
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {team.map((member, i) => (
            <TeamCard key={i} member={member} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-24 lg:py-32">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rounded-4xl p-16 lg:p-20 text-white text-center relative overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.2),transparent_50%)]" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight drop-shadow-2xl">
              Ready to work with us?
            </h2>
            <p className="text-2xl md:text-3xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Let's discuss your project with our expert team.
            </p>
            <Link
              href="/contact"
              className="inline-flex px-12 py-7 lg:px-16 lg:py-8 rounded-3xl bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-600 hover:from-cyan-400 hover:to-sky-400 text-white font-black text-xl lg:text-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 backdrop-blur-xl border border-white/20"
            >
              Start project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
