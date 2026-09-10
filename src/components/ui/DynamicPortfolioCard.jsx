// // components/ui/DynamicPortfolioCard.jsx
// import { headers } from "next/headers";
// import CommonTitle from "./CommonTitle";
// import PortfolioActions from "./PortfolioActions";
// import PortfolioCards from "./PortfolioCards";

// const DEFAULT_TITLE = "Our Portfolio";
// const DEFAULT_SUBTITLE =
//   "At Softkingo, we consistently stay ahead of the competition by using the latest tools and technologies in mobile app development.";

// async function getBaseUrl() {
//   // Prefer env var — avoids the headers() call and keeps caching intact
//   if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
//   const h = await headers();
//   const host = h.get("host");
//   const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
//   return `${protocol}://${host}`;
// }

// async function fetchPortfolio(params, baseUrl) {
//   try {
//     const res = await fetch(`${baseUrl}/api/public/portfolio?${params}`, {
//       next: { revalidate: 3600 }, // ISR: re-fetch at most once per hour, tune as needed
//     });
//     if (!res.ok) return [];
//     const data = await res.json();
//     return Array.isArray(data.projects) ? data.projects : [];
//   } catch (error) {
//     console.error("Portfolio fetch error:", error);
//     return [];
//   }
// }

// async function getProjects(portfolioType, category) {
//   const baseUrl = await getBaseUrl();
//   const take = category ? 10 : 7;
//   const params = new URLSearchParams({ type: portfolioType || "app", take: String(take) });
//   if (category) params.set("category", category);

//   let found = await fetchPortfolio(params, baseUrl);

//   // FALLBACK: no results with category → show top 7 without filter
//   if (found.length === 0 && category) {
//     const fallbackParams = new URLSearchParams({ type: portfolioType || "app", take: "7" });
//     found = await fetchPortfolio(fallbackParams, baseUrl);
//   }

//   return found;
// }

// export default async function DynamicPortfolioCard({
//   category = "",
//   portfolioType = "app",
//   title,
//   subtitle,
//   gradientText,
//   className = "",
// }) {
//   const projects = await getProjects(portfolioType, category);

//   if (projects.length === 0) return null;

//   const displayTitle = title || DEFAULT_TITLE;
//   const displaySubtitle = subtitle || DEFAULT_SUBTITLE;

//   return (
//     <section className={`py-8 md:py-16 bg-white ${className}`}>
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex flex-col lg:flex-row gap-12 items-start">

//           {/* ── LEFT: sticky ── */}
//           <div className="w-full lg:w-[30%] lg:sticky lg:top-28 space-y-6">
//             <CommonTitle
//               align="left"
//               title={displayTitle}
//               subtitle={displaySubtitle}
//               gradientText={gradientText}
//             />
//             <PortfolioActions />
//           </div>

//           {/* ── RIGHT: sticky stacking cards ── */}
//           <div className="w-full lg:w-[70%] space-y-4">
//             <PortfolioCards projects={projects} />
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }


// components/ui/DynamicPortfolioCard.jsx
import CommonTitle from "./CommonTitle";
import PortfolioActions from "./PortfolioActions";
import PortfolioCards from "./PortfolioCards";

const DEFAULT_TITLE = "Our Portfolio";
const DEFAULT_SUBTITLE =
  "At Softkingo, we consistently stay ahead of the competition by using the latest tools and technologies in mobile app development.";

function getBaseUrl() {
  // Env var read karo, agar nahi mile toh fallback client/server handle kar lega
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (typeof window !== "undefined") return window.location.origin;
  return "http://localhost:3000"; // Local fallback
}

async function fetchPortfolio(params, baseUrl) {
  try {
    const res = await fetch(`${baseUrl}/api/public/portfolio?${params}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.projects) ? data.projects : [];
  } catch (error) {
    console.error("Portfolio fetch error:", error);
    return [];
  }
}

async function getProjects(portfolioType, category) {
  const baseUrl = getBaseUrl();
  const take = category ? 10 : 7;
  const params = new URLSearchParams({ type: portfolioType || "app", take: String(take) });
  if (category) params.set("category", category);

  let found = await fetchPortfolio(params, baseUrl);

  if (found.length === 0 && category) {
    const fallbackParams = new URLSearchParams({ type: portfolioType || "app", take: "7" });
    found = await fetchPortfolio(fallbackParams, baseUrl);
  }

  return found;
}

export default async function DynamicPortfolioCard({
  category = "",
  portfolioType = "app",
  title,
  subtitle,
  gradientText,
  className = "",
}) {
  const projects = await getProjects(portfolioType, category);

  if (projects.length === 0) return null;

  const displayTitle = title || DEFAULT_TITLE;
  const displaySubtitle = subtitle || DEFAULT_SUBTITLE;

  return (
    <section className={`py-8 md:py-16 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-[30%] lg:sticky lg:top-28 space-y-6">
            <CommonTitle
              align="left"
              title={displayTitle}
              subtitle={displaySubtitle}
              gradientText={gradientText}
            />
            <PortfolioActions />
          </div>

          <div className="w-full lg:w-[70%] space-y-4">
            <PortfolioCards projects={projects} />
          </div>
        </div>
      </div>
    </section>
  );
}