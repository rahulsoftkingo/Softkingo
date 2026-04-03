// app/(public)/contact/page.jsx
import Link from "next/link";
import Image from "next/image";
import Ouroffices from "@/components/common/Our-offices";
import Faqaccordion from "@/components/common/Faqaccordion";
import CTA from "@/components/common/Consultation-Cta";
import InquiryForm from "@/components/public/InquiryForm";
import TechAheadSection from "@/components/public/TechAheadSection";
import CommonTitle from "@/components/ui/CommonTitle";
import AwardsSection from "@/components/common/AwardsSection";
export const metadata = {
  title: "Contact Softkingo - Get a Free Quote for Your Digital Project",
  description: "Have a project idea? Contact Softkingo for expert consultation on mobile apps, web development, and digital marketing. We reply within 2 hours!",
  alternates: { canonical: "/contact" }
}
export default function ContactPage() {
  return (
    <main className="min-h-screen  text-slate-900">
      {/* HERO */}
      <section
        className="relative h-[260px] md:h-[320px] lg:h-[380px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/contact-hero.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-[#001322]/45 to-white/10" />
        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
          <div>
            <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-200/70 mb-3">
              <Link href="/" className="hover:text-cyan-400 transition-colors">
                Home
              </Link>
              <span>›</span>
              <span className="text-cyan-400 font-medium">Contact</span>
            </nav>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Reach your digital goals with us
            </h1>
            <p className="mt-3 max-w-xl text-xs md:text-sm lg:text-base text-slate-100/90">
              Let&apos;s explore the opportunities that can elevate your
              business to new heights. Share your idea, product, or challenge
              and we&apos;ll get back with clear next steps.
            </p>

            <div className="mt-5 flex flex-wrap gap-4 text-xs md:text-sm text-slate-100/80">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Average response time: under 2 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTACT AREA */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-revers lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
          {/* LEFT COLUMN */}
          <div className="space-y-8 order-2 lg:order-1">

            <TechAheadSection />
          </div>

          {/* RIGHT COLUMN: REUSABLE FORM */}
          <div className="flex justify-end order-1 lg:order-2">
            <InquiryForm
              title="Share your project details"
              subtitle="Share your idea and we’ll get back within one business day."
              tagline="Contact"
              submitLabel="Request a Call"
              primaryColor="sky"
            />
          </div>
        </div>
      </section>

      {/* ONE-STOP DIGITAL ENGINEERING PARTNER */}
      {/* <OneStopPartnerSection /> */}

      {/* JOIN OUR TEAM + CONTACT CARDS */}
      {/* <JoinTeamSection /> */}

      {/* AWARDS */}
      <AwardsSection />

      <Ouroffices />
      <Faqaccordion />
      <CTA />
    </main>
  );
}

/* THEMED SUB‑SECTIONS */

function OneStopPartnerSection() {
  return (
    <section className="relative overflow-hidden bg-white py-14 lg:py-18">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-white/40 blur-3xl opacity-40" />
        <div className="absolute -bottom-40 -left-20 w-[420px] h-[420px] rounded-full bg-[#00B7FF]/25 blur-3xl opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1 text-[11px] font-semibold tracking-wide text-[#0B3250] shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            End‑to‑End Delivery · From idea to launch
          </span>

          <h3 className="text-2xl md:text-3xl font-extrabold text-[#0B3250]">
            We&apos;re Your One‑Stop Digital Engineering Partner
          </h3>

          <p className="mt-1 text-sm md:text-base text-slate-700 max-w-3xl mx-auto">
            As your dedicated solution partner, we manage everything from
            discovery to ongoing support — so you always have a single, reliable
            team to lean on.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <SolutionStepCard
            icon="eye"
            step="01"
            title="Tell Us Your Vision"
            desc="Fill out the contact form with your goals, use‑cases, and expectations. We can sign an NDA up‑front if needed."
          />
          <SolutionStepCard
            icon="phone"
            step="02"
            title="Get A Free Consultation"
            desc="An expert dives deeper into your requirements, shares ideas, and helps shape the best technical approach."
          />
          <SolutionStepCard
            icon="doc"
            step="03"
            title="Receive A Detailed Proposal"
            desc="You get a clear, no‑obligation proposal with scope, roadmap, timelines, and investment estimate."
          />
        </div>
      </div>
    </section>
  );
}

function JoinTeamSection() {
  return (
    <section className="relative bg-gradient-to-b from-sky-100 via-sky-50 to-white py-14 lg:py-18">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)] gap-10 items-start">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#0B3250]">
              Join Our Team
            </h3>
            <p className="text-base md:text-lg text-slate-900">
              Be a part of a high‑impact product team delivering solutions for
              global brands.
            </p>
            <p className="text-sm md:text-base text-slate-700 max-w-2xl">
              We&apos;re always looking for developers, designers, QA engineers,
              and product thinkers who love turning complex problems into simple
              digital experiences. Share your profile with us or explore our
              current openings.
            </p>

          </div>
          <div className="flex flex-wrap gap-3 pt-2 hidden">
            <button className="px-5 py-2 rounded-full border border-[#0B3250] text-sm text-[#0B3250] bg-white/90 hover:bg-white transition-colors shadow-[0_8px_18px_rgba(0,0,0,0.04)]">
              Drop an Email
            </button>
            <button className="px-5 py-2 rounded-full bg-[#00B7FF] text-white text-sm font-semibold hover:bg-[#0096d4] transition-colors shadow-[0_10px_22px_rgba(0,0,0,0.15)]">
              See All Careers
            </button>
          </div>
          <div className="rounded-[22px] bg-white/80 border border-white shadow-[0_18px_45px_rgba(0,0,0,0.08)] px-6 py-5 ">
            <p className="text-xs font-semibold tracking-wide text-sky-600 uppercase">
              Why work with us
            </p>
            <ul className="mt-3 space-y-2.5 text-xs md:text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>
                  Exposure to global‑scale products and complex problem‑solving.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>
                  Collaborative culture focused on learning, ownership, and
                  impact.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>
                  Hybrid work options, performance‑driven rewards, and
                  mentorship.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#86DFFF] to-transparent" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ContactInfoCard
            label="Our Location"
            value="New Noida Office (First Floor, B‑148, Block B, Sector 63, Noida - 201301)"
          />
          <ContactInfoCard label="Call us" value="+91‑7428750870" />
          <ContactInfoCard label="Drop a Mail" value="info@softkingo.com" />
        </div>
      </div>
    </section>
  );
}

// AwardsSection removed from here, using the imported component

/* SMALL BUILDING BLOCKS */

function SolutionStepCard({ icon, step, title, desc }) {
  const Icon = () => {
    if (icon === "eye") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-[#00B7FF]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      );
    }
    if (icon === "phone") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-[#00B7FF]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m6 4v6a2 2 0 01-2 2H7l-4 4V7a4 4 0 014-4h8"
          />
        </svg>
      );
    }
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-[#00B7FF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6M7 7h8l2 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z"
        />
      </svg>
    );
  };

  return (
    <div className="relative rounded-[22px] border border-white/65 bg-white/30 backdrop-blur-lg px-6 py-7 shadow-[0_22px_50px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center border border-[#00B7FF]/25">
            <Icon />
          </div>
          <h4 className="text-base md:text-lg font-semibold text-[#0B3250]">
            {title}
          </h4>
        </div>
        {step && (
          <span className="text-[11px] font-semibold tracking-wide text-[#00B7FF]">
            {step}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-700 leading-relaxed">{desc}</p>
    </div>
  );
}

function ContactInfoCard({ label, value }) {
  return (
    <div className="rounded-[18px] bg-white/95 border border-[#A9E9FF] px-5 py-4 text-center shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
      <p className="text-[11px] uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-[#0B3250]">{value}</p>
    </div>
  );
}

function ContactChip({ label, value, href }) {
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      href={href}
      className={`block rounded-[18px] bg-white/90 border border-[#C7EAF7] px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.06)] text-xs md:text-sm ${href ? "hover:bg-white cursor-pointer" : ""
        }`}
    >
      <p className="text-[11px] uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 font-medium text-[#0B3250]">{value}</p>
    </Wrapper>
  );
}
