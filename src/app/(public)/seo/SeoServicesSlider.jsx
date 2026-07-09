"use client";

import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Star Cinemas",
    category: "Digital and Social Marketing",
    image:
      "https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=1200&auto=format&fit=crop",
    link: "/portfolio/star-cinemas",
  },
  {
    title: "SHRM",
    category: "Digital and Social Marketing",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
    link: "/portfolio/shrm",
  },
  {
    title: "Leela Hotels",
    category: "Public Relations",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    link: "/portfolio/leela-hotels",
  },
  {
    title: "AMP Motors",
    category: "Public Relations",
    image:
      "https://images.unsplash.com/photo-1562911791-c7a97b729ec5?q=80&w=1200&auto=format&fit=crop",
    link: "/portfolio/amp-motors",
  },
  {
    title: "Nestasia",
    category: "Public Relations",
    image:
      "https://images.unsplash.com/photo-1616627561950-9f746e330187?q=80&w=1200&auto=format&fit=crop",
    link: "/portfolio/nestasia",
  },
  {
    title: "LCR Capital Partners",
    category: "Public Relations",
    image:
      "https://images.unsplash.com/photo-1501466044931-62695578f174?q=80&w=1200&auto=format&fit=crop",
    link: "/portfolio/lcr-capital-partners",
  },
];

export default function WorkShowcase() {
  return (
    <section className="bg-white py-8 lg:py-18 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold leading-normal text-slate-900">
          Work that speaks, <span className="text-sky-500">before we do</span>
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-3xl text-center text-md leading-relaxed text-gray-500">
          Every campaign we deliver is built to capture attention, drive engagement, and leave a
          lasting impression. Through bold visual design and strategic storytelling, our work
          balances creativity and purpose. Explore the projects that exemplify our results-driven
          approach and measurable impact.
        </p>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.link}
              className="group relative block h-[260px] overflow-hidden rounded-2xl bg-slate-100 shadow-xl"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <span className="absolute left-4 top-4 text-xs font-medium text-white/80">
                {project.category}
              </span>

              <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                {project.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="mt-6 flex justify-end">
          <Link
            href="/portfolio"
            className="text-md font-medium text-slate-900 underline underline-offset-4 hover:text-sky-500"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}