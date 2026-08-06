"use client";

import { useId } from "react";
import { Lightbulb, Gem, Zap, Home } from "lucide-react";

// Fallback data used when no `data` prop (or an empty one) is passed in
const defaultData = {
  titleLead: "Our",
  titleAccent: "Process",
  description:
    "The on-demand economy is getting bigger and better with each passing day. Check out the laws that we follow to build and scale successful on-demand apps.",
  cardTitle: "What's inside?",
  bullets: [
    "What do you need to set up a business in the on-demand economy?",
    "How our digital flywheel can help you scale a business",
    "4 laws that we follow to drive success for mobile app startups",
  ],
  ctaLabel: "Download now!",
  ctaHref: "#",
  // style: "filled" (solid accent segment, light label) or "light" (pale
  // segment, dark label).
  // badge: how the icon is presented —
  //   "none"    -> icon floats directly in the segment (Innovate)
  //   "accent"  -> icon sits in a solid accent-colored circle on the seam (Be Agile)
  //   "white"   -> icon sits in a solid white circle on the seam (Build Your Brand)
  //   "outline" -> icon sits in an outlined, transparent circle (Provide value)
  segments: [
    { title: "Innovate", icon: "innovate", style: "filled", badge: "none" },
    { title: "Provide\nvalue", icon: "value", style: "light", badge: "outline" },
    { title: "Be Agile", icon: "agile", style: "filled", badge: "accent" },
    { title: "Build Your\nBrand", icon: "brand", style: "light", badge: "white" },
  ],
};

// Maps each segment's `icon` key to a lucide-react component.
const iconComponents = {
  innovate: Lightbulb,
  value: Gem,
  agile: Zap,
  brand: Home,
};

function toXY(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

// Draws one ring (donut) segment as a plain SVG path between two radii/angles.
function ringSegment(cx, cy, rOuter, rInner, startAngle, endAngle) {
  const [x1, y1] = toXY(cx, cy, rOuter, startAngle);
  const [x2, y2] = toXY(cx, cy, rOuter, endAngle);
  const [x3, y3] = toXY(cx, cy, rInner, endAngle);
  const [x4, y4] = toXY(cx, cy, rInner, startAngle);

  return [
    `M ${x1} ${y1}`,
    `A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${rInner} ${rInner} 0 0 0 ${x4} ${y4}`,
    "Z",
  ].join(" ");
}

function midpoint(cx, cy, r, startAngle, endAngle) {
  return toXY(cx, cy, r, (startAngle + endAngle) / 2);
}

export default function OurProcessRadial({ data }) {
  const uid = useId().replace(/[:]/g, "");
  const source =
    data && Array.isArray(data.segments) && data.segments.length > 0
      ? data
      : defaultData;

  const segments = (source.segments || []).slice(0, 4);
  const bullets = source.bullets || [];

  const size = 420;
  const cx = size / 2;
  const cy = size / 2;

  const rOuter = 178; // outer edge of the alternating quadrants
  const rQuadInner = 122; // inner edge of the alternating quadrants
  const rGap = 114; // white seam ring
  const rAccent = 100; // solid accent ring
  const rWhite = 74; // inner white ring
  const rDot = 30; // center dot

  const gap = 3; // degree gap between quadrants
  const step = 360 / segments.length;
  const rotationOffset = -90; // put segment 0 in the top-left
  const iconSize = 22;

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-slate-800">
          {source.titleLead}{" "}
          <span className="text-sky-500">{source.titleAccent}</span>
        </h2>

        <div className="mt-10 sm:mt-12 flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          {/* Left: copy + info card + CTA */}
          <div className="flex-1 min-w-0 w-full">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
              {source.description}
            </p>

            <div className="mt-6 rounded-xl bg-slate-100 p-5 sm:p-6 max-w-xl">
              <h4 className="font-bold text-slate-800">{source.cardTitle}</h4>
              <ul className="mt-3 space-y-3">
                {bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                    <span className="text-sm text-slate-600 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {source.ctaLabel && (
              <a
                href={source.ctaHref || "#"}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-sky-600"
              >
                {source.ctaLabel}
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </a>
            )}
          </div>

          {/* Right: radial process diagram */}
          <div className="shrink-0 w-full max-w-md lg:w-[26rem]">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full h-auto overflow-visible"
              role="img"
              aria-label={segments
                .map((s) => s.title.replace("\n", " "))
                .join(", ")}
            >
              {/* alternating quadrants */}
              {segments.map((seg, i) => {
                const start = rotationOffset + i * step + gap / 2;
                const end = rotationOffset + (i + 1) * step - gap / 2;
                const filled = seg.style !== "light";

                return (
                  <path
                    key={i}
                    d={ringSegment(cx, cy, rOuter, rQuadInner, start, end)}
                    fill={filled ? "#38bdf8" : "#e5e7eb"}
                  />
                );
              })}

              {/* concentric seam / accent / hub rings */}
              <circle cx={cx} cy={cy} r={rGap} fill="#ffffff" />
              <circle cx={cx} cy={cy} r={rAccent} fill="#38bdf8" />
              <circle cx={cx} cy={cy} r={rWhite} fill="#ffffff" />
              <circle cx={cx} cy={cy} r={rDot} fill="#0f172a" />

              {/* icons + labels */}
              {segments.map((seg, i) => {
                const start = rotationOffset + i * step + gap / 2;
                const end = rotationOffset + (i + 1) * step - gap / 2;
                const filled = seg.style !== "light";
                const lines = seg.title.split("\n");
                const Icon = iconComponents[seg.icon] || Lightbulb;

                if (seg.badge === "none") {
                  // icon floats directly in the segment (e.g. Innovate)
                  const [ix, iy] = midpoint(cx, cy, (rOuter + rQuadInner) / 2 + 18, start, end);
                  const [lx, ly] = midpoint(cx, cy, (rOuter + rQuadInner) / 2 - 16, start, end);

                  return (
                    <g key={i}>
                      <foreignObject x={ix - iconSize / 2} y={iy - iconSize / 2} width={iconSize} height={iconSize}>
                        <Icon color="#ffffff" size={iconSize} strokeWidth={1.8} />
                      </foreignObject>
                      <text
                        x={lx}
                        y={ly}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{ fontSize: 15, fontWeight: 700, fill: filled ? "#ffffff" : "#1e293b" }}
                      >
                        {lines.map((line, li) => (
                          <tspan key={li} x={lx} dy={li === 0 ? 0 : 17}>
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  );
                }

                // badge variants: "accent", "white", "outline" -- icon sits in
                // a circle placed right on the outer seam of the segment
                const [lx, ly] = midpoint(cx, cy, (rOuter + rQuadInner) / 2, start, end);
                const [bx, by] = midpoint(cx, cy, rOuter + 6, start, end);

                const badgeFill =
                  seg.badge === "accent" ? "#38bdf8" : seg.badge === "white" ? "#ffffff" : "none";
                const badgeStroke = seg.badge === "outline" ? "#0f172a" : "none";
                const iconColor = seg.badge === "accent" ? "#ffffff" : "#0f172a";

                return (
                  <g key={i}>
                    <text
                      x={lx}
                      y={ly + (seg.badge === "outline" ? 18 : 0)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{ fontSize: 15, fontWeight: 700, fill: filled ? "#ffffff" : "#1e293b" }}
                    >
                      {lines.map((line, li) => (
                        <tspan key={li} x={lx} dy={li === 0 ? 0 : 17}>
                          {line}
                        </tspan>
                      ))}
                    </text>
                    <circle
                      cx={bx}
                      cy={by}
                      r={22}
                      fill={badgeFill}
                      stroke={badgeStroke}
                      strokeWidth={badgeStroke !== "none" ? 1.6 : 0}
                    />
                    <foreignObject x={bx - iconSize / 2} y={by - iconSize / 2} width={iconSize} height={iconSize}>
                      <Icon color={iconColor} size={iconSize} strokeWidth={1.8} />
                    </foreignObject>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}