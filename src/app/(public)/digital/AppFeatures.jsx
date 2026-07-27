"use client";

import {
  CheckCircle2,
  Grid3x3,
  Sparkles,
  Sun,
  Users,
  MessageCircleHeart,
  Hand,
  SmilePlus,
  Wand2,
} from "lucide-react";

// --- Original hardcoded fallback ---
const defaultLeftFeatures = [
  {
    title: "Daily Horoscopes",
    description:
      "Get accurate daily forecasts based on your zodiac sign to help you know what to expect from your day, your relationships, and your chances.",
    active: true,
  },
  {
    title: "Astrologer Chat",
    description:
      "You can also interact with professional astrologers via chat to get advice on general questions about life, relationships, or work.",
    active: false,
  },
  {
    title: "Astrology Reports",
    description:
      "For more information about your life journey, access complete birth charts, compatibility reports, and future outlook.",
    active: false,
  },
];

const defaultRightFeatures = [
  {
    title: "Live Consultations",
    description:
      "Book a consultation or have a live video session with an astrologer for individual readings and predictions.",
  },
  {
    title: "Personalized Remedies",
    description:
      "Get cures in gemstones, mantras, and other remedies according to your astrological requirements.",
  },
  {
    title: "Secure Payments",
    description:
      "It is safe to pay for consultations, reports, and other high-end services in various ways.",
  },
];

// --- Helper: data (array of { header, description }) se features merge karta hai ---
// header -> title ki jagah replace hoga, description -> description ki jagah
function buildFeatures(data) {
  const safeData = Array.isArray(data) ? data : [];

  const leftFeatures = defaultLeftFeatures.map((f, i) => {
    const item = safeData[i];
    return {
      ...f,
      title: item?.header?.trim() ? item.header : f.title,
      description: item?.description?.trim() ? item.description : f.description,
    };
  });

  const rightFeatures = defaultRightFeatures.map((f, i) => {
    const item = safeData[i + 3];
    return {
      ...f,
      title: item?.header?.trim() ? item.header : f.title,
      description: item?.description?.trim() ? item.description : f.description,
    };
  });

  return { leftFeatures, rightFeatures };
}

function FeatureCard({ title, description, active }) {
  return (
    <div
      className={[
        "rounded-2xl p-5 shadow-sm",
        active ? "bg-sky-500 text-white" : "bg-slate-800 text-white",
      ].join(" ")}
    >
      <div className="flex items-center gap-2">
        <CheckCircle2
          className={active ? "h-5 w-5 text-white" : "h-5 w-5 text-sky-400"}
          strokeWidth={2.5}
        />
        <h3 className="text-md font-bold leading-normal">{title}</h3>
      </div>
      <p
        className={[
          "mt-2 text-sm leading-relaxed",
          active ? "text-sky-50" : "text-slate-300",
        ].join(" ")}
      >
        {description}
      </p>
    </div>
  );
}

function ProgressRow({ label, value, barColor }) {
  return (
    <div className="mt-4 first:mt-0">
      <div className="flex items-center justify-between text-xs text-slate-300">
        <span>{label}</span>
        <span className="font-medium text-white">{value}%</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[260px] sm:w-[280px]">
      {/* Side buttons */}
      <div className="absolute -left-[3px] top-24 h-6 w-[3px] rounded-l bg-slate-700" />
      <div className="absolute -left-[3px] top-32 h-10 w-[3px] rounded-l bg-slate-700" />
      <div className="absolute -left-[3px] top-44 h-10 w-[3px] rounded-l bg-slate-700" />
      <div className="absolute -right-[3px] top-32 h-14 w-[3px] rounded-r bg-slate-700" />

      {/* Outer frame */}
      <div className="rounded-[3rem] border-[3px] border-slate-800 bg-slate-950 p-2.5 shadow-2xl ring-1 ring-black/20">
        {/* Screen */}
        <div className="relative h-[540px] overflow-hidden rounded-[2.25rem] bg-gradient-to-b from-[#241a4a] via-[#1a1338] to-[#120c28]">
          {/* Dynamic island */}
          <div className="absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

          {/* Status bar */}
          <div className="relative z-10 flex items-center justify-between px-5 pt-3.5 text-[10px] font-medium text-white">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-3 rounded-[1px] border border-white/70" />
              100%
            </span>
          </div>

          {/* Header */}
          <div className="mt-4 flex items-center justify-between px-4">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
              <Users className="h-3.5 w-3.5 text-white" />
            </div>
            <p className="text-sm font-bold text-white">Horoscope</p>
            <Grid3x3 className="h-4 w-4 text-white/80" />
          </div>

        {/* About me */}
        <div className="mt-4 px-4">
          <p className="text-[10px] uppercase tracking-wide text-slate-400">About Me</p>
          <div className="mt-1 flex items-start justify-between">
            <div className="space-y-1.5 text-[10px] text-slate-400">
              <p>
                Sign <span className="block text-xs font-medium text-white">Capricorn</span>
              </p>
              <p>
                Ruler <span className="block text-xs font-medium text-white">Mercury</span>
              </p>
              <p>
                Professional
                <span className="block text-xs font-medium text-white">Politician</span>
              </p>
            </div>
            <div className="relative flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-sky-400/20 blur-xl" />
              <Sparkles className="h-10 w-10 text-sky-300" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex gap-1.5 px-4">
          {["Today", "Tomorrow", "Week", "Month"].map((tab, i) => (
            <span
              key={tab}
              className={[
                "rounded-full px-2.5 py-1 text-[10px] font-medium",
                i === 0 ? "bg-white text-slate-900" : "text-slate-300",
              ].join(" ")}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* Progress bars */}
        <div className="mt-4 px-4">
          <ProgressRow label="Love" value={80} barColor="bg-pink-400" />
          <ProgressRow label="Work" value={64} barColor="bg-sky-400" />
          <ProgressRow label="Mood" value={80} barColor="bg-purple-400" />
        </div>

        {/* Description */}
        <div className="mt-4 px-4">
          <p className="text-[10px] uppercase tracking-wide text-slate-400">
            General Description
          </p>
          <div className="mt-1.5 rounded-xl bg-white/5 p-2.5">
            <p className="text-[10px] leading-relaxed text-slate-200">
              You are even more charming and attractive than usual, so you can use this great
              advantage to attract new contacts, especially with the opposite sex.
            </p>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between rounded-b-[2.25rem] border-t border-white/10 bg-[#120c28]/90 px-4 py-2.5">
          {[
            { icon: Sun, label: "Horoscope" },
            { icon: SmilePlus, label: "Compatibility" },
            { icon: Hand, label: "Palm Reader" },
            { icon: MessageCircleHeart, label: "Mood Tracker" },
            { icon: Wand2, label: "Ask AI" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <Icon className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-[7px] text-slate-500">{label}</span>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

// --- data prop: array of { header, description } ---
export default function AstrologyAppFeatures({ data }) {
  const { leftFeatures, rightFeatures } = buildFeatures(data);

  return (
    <section className="hidden lg:block bg-sky-50 py-8 lg:py-18 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold leading-normal text-slate-900">
          Impeccable Features of, <span className="text-sky-500">AI Powered</span>
          <br />
          <span className="text-sky-500">Astrology app Development</span>
        </h2>

        {/* Content */}
        <div
          className="mt-12 grid items-center gap-8"
          style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
        >
          {/* Left cards */}
          <div className="flex flex-col gap-5 order-1">
            {leftFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>

          {/* Phone */}
          <div className="order-2">
            <PhoneMockup />
          </div>

          {/* Right cards */}
          <div className="flex flex-col gap-5 order-3">
            {rightFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}