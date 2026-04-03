import Link from "next/link";
import TestimonialCarousel from "@/components/public/TestimonialCarousel";
import { testimonials } from "@/data/testimonials";

export const metadata = {
  title: "Client Testimonials - Client Reviews",
  description:
    "What our clients say about Softkingo across Clutch, DesignRush, and more.",
  alternates: { canonical: "/testimonials" }
};

export default function TestimonialsPage() {
  return (
    <main className="bg-[#f6f9ff]">
      {/* HERO (enhanced like your Terms hero) */}
      <section
        className="relative h-[260px] md:h-[320px] lg:h-[380px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/terms-hero.png')" }}
      >
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 via-slate-950/70 to-slate-950/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_85%_25%,rgba(34,211,238,0.12),transparent_50%)]" />
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.65)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.65)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30 [mask-image:radial-gradient(ellipse_80%_55%_at_50%_45%,black,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-[#001322]/45 to-white/10" />

        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
          <div className="w-full">
            <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-200/70 mb-3">
              <Link href="/" className="hover:text-cyan-300 transition-colors">
                Home
              </Link>
              <span>›</span>
              <span className="text-cyan-300 font-medium">Testimonials</span>
            </nav>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              Client Testimonials
            </h1>

            <p className="mt-2 max-w-2xl text-xs md:text-sm lg:text-base text-slate-100/90">
              Real feedback from clients across industries and countries.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs md:text-sm text-white border border-white/10 backdrop-blur">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Verified reviews
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs md:text-sm text-white border border-white/10 backdrop-blur">
                <span className="inline-block w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                Global clients
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs md:text-sm text-white border border-white/10 backdrop-blur">
                <span className="inline-block w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                5.0 rating focus
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        {/* Carousel Card */}
        {/* <div className="bg-white rounded-3xl shadow-[0_14px_40px_rgba(2,6,23,0.08)] p-6 md:p-10 border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                What people say
              </h2>
              <p className="text-slate-600 mt-1">
                Swipe through reviews from Clutch, DesignRush, Trustpilot & more.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <div className="rounded-2xl bg-slate-50 border border-slate-100 px-4 py-2">
                <p className="text-xs text-slate-500">Total reviews</p>
                <p className="text-lg font-bold text-slate-900">
                  {testimonials.length}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-100 px-4 py-2">
                <p className="text-xs text-slate-500">Avg rating</p>
                <p className="text-lg font-bold text-slate-900">5.0</p>
              </div>
            </div>
          </div> */}

        <TestimonialCarousel
          testimonials={testimonials}
          autoPlay={true}
          interval={5000}
          columns="auto"
        />
        {/* </div> */}

        {/* List View (enhanced UI) */}
        <div className="mt-14">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">
              All testimonials
            </h2>
            <p className="text-sm text-slate-600">
              Browse every review in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <article
                key={i}
                className="group bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-[0_14px_40px_rgba(2,6,23,0.10)] transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 items-center">
                    <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0 shadow-md border-2 border-white bg-slate-100">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="text-base md:text-lg font-bold text-slate-900 leading-normal">
                        {t.name}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-600">
                        {t.title}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] md:text-xs font-semibold text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                    {t.source}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-slate-700 leading-relaxed">
                    {t.review}
                    <span className="text-orange-500 text-xl ml-1">❞</span>
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-orange-500">
                    <span className="text-sm">★</span>
                    <span className="text-sm">★</span>
                    <span className="text-sm">★</span>
                    <span className="text-sm">★</span>
                    <span className="text-sm">★</span>
                    <span className="text-xs text-slate-500 ml-2">5.0</span>
                  </div>

                  <span className="text-xs text-slate-400 group-hover:text-slate-500 transition-colors">
                    Verified feedback
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/15 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sky-500/15 blur-3xl rounded-full" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-extrabold">Want similar results?</h3>
              <p className="text-slate-200 mt-2 max-w-xl">
                Let’s discuss your project and build a high-quality product with
                clear timelines and ownership.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/contact"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-sky-400 hover:bg-cyan-400 text-slate-50 font-bold transition-colors"
              >
                Contact us
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 font-semibold transition-colors"
              >
                Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
