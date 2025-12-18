
// // app/case-studies/[slug]/page.jsx
// import Image from "next/image";
// import { Users, Clock } from "lucide-react";
// import { AppScreensCarousel } from "./AppScreensCarousel";

// // =================== DATA FETCH (replace with real API) ===================
// async function getCaseStudy(slug) {
//   // TODO: API se real data lao
//   return {
//     id: 1,
//     slug,
//     logo: "/images/case-studies/logo.png",
//     title: "LoveLocal: Grocery App",
//     subtitle: "Connecting Communities with Local Businesses",

//     hero: {
//       backgroundImage: "/images/case-studies/hero-bg.png",
//       circleImage: "/images/case-studies/hero-circle.png",
//       mockups: [
//         "/images/case-studies/screen1.png",
//         "/images/case-studies/screen2.png",
//       ],
//     },

//     downloads: {
//       googlePlay: {
//         url: "https://play.google.com/store",
//         image: "/images/badges/google-play.png",
//       },
//       appStore: {
//         url: "https://apps.apple.com",
//         image: "/images/badges/app-store.png",
//       },
//       web: {
//         url: "https://lovelocal.com",
//         image: "/images/badges/web-badge.png",
//       },
//     },

//     branding: {
//       primaryColor: "#0EA5E9", // Softkingo sky
//       secondaryColor: "#0B3250",
//       accentColor: "#22C55E",
//       primaryFont: "DM Sans",
//       colors: [
//         { name: "Sky Blue", hex: "#0EA5E9" },
//         { name: "Midnight", hex: "#0B3250" },
//         { name: "Emerald", hex: "#22C55E" },
//       ],
//     },

//     team: {
//       size: "06 People",
//       roles: "PM / TL / Devs / Designers / QA",
//       timeline: "60 Days",
//       duration: "Design + Development",
//     },

//     client: {
//       name: "Aaron Gonzales",
//       subtitle: "is an entrepreneur",
//       location: "Australia",
//       industry: "E-Commerce",
//       avatar: "/images/client-avatar.png",
//     },

//     technologies: {
//       backgroundImage: "/images/tech-bg.jpg",
//       items: [
//         { name: "React JS", icon: "/images/tech/react.png" },
//         { name: "React Native", icon: "/images/tech/react-native.png" },
//         { name: "Node JS", icon: "/images/tech/nodejs.png" },
//         { name: "MongoDB", icon: "/images/tech/mongodb.png" },
//         { name: "AWS", icon: "/images/tech/aws.png" },
//       ],
//     },

//     overview: {
//       description:
//         "LoveLocal is an app designed to support and promote local businesses by connecting them with nearby customers. The platform enables users to discover local stores, explore products, access exclusive deals and rate their experiences.",
//       mockup: "/images/case-studies/overview-phone.png",
//     },

//     requirements: {
//       items: [
//         {
//           title: "Local Business Discovery",
//           description:
//             "Enable users to easily discover and explore local businesses in their area.",
//         },
//         {
//           title: "Product & Service Listings",
//           description:
//             "Display detailed listings that help promote local products, services, and promotions.",
//         },
//         {
//           title: "User Reviews & Ratings",
//           description:
//             "Implement a system for users to leave reviews and ratings to help others decide.",
//         },
//         {
//           title: "User-Friendly Interface",
//           description:
//             "Keep the app intuitive, easy to navigate and optimized for repeat usage.",
//         },
//       ],
//       mockup: "/images/case-studies/requirements-phone.png",
//     },

//     goals: {
//       backgroundImage: "/images/case-studies/goals-bg.jpg",
//       items: [
//         "Increase visibility of local shops",
//         "Streamline ordering & delivery",
//         "Build trust with ratings & reviews",
//         "Create a sticky user experience",
//       ],
//     },

//     challenges: {
//       challenge:
//         "The main challenge was building a high‑performance marketplace that can handle thousands of products from different neighbourhood stores while keeping UX extremely simple for non‑tech users.",
//       solution:
//         "We designed a modular architecture with separate flows for discovery, ordering and delivery while using a scalable Node + Mongo stack so adding new cities and partners is frictionless.",
//     },

//     appScreens: {
//       title: "How Your Grocery App Looks When It's Ready",
//       categories: [
//         {
//           id: "customer",
//           name: "Customer App",
//           screens: [
//             { name: "Home Page", image: "/images/case-studies/screen1.png" },
//             {
//               name: "Your Account",
//               image: "/images/screens/customer/account.png",
//             },
//             {
//               name: "Refer & Earn",
//               image: "/images/screens/customer/refer.png",
//             },
//             {
//               name: "Splash Screen",
//               image: "/images/screens/customer/splash.png",
//             },
//             {
//               name: "Login & Signup",
//               image: "/images/screens/customer/login.png",
//             },
//             {
//               name: "Featured Items",
//               image: "/images/screens/customer/featured.png",
//             },
//             {
//               name: "Your Cart",
//               image: "/images/screens/customer/cart.png",
//             },
//             {
//               name: "Product Detail",
//               image: "/images/screens/customer/product.png",
//             },
//           ],
//         },
//         {
//           id: "driver",
//           name: "Driver App",
//           screens: [
//             { name: "Driver Home", image: "/images/screens/driver/home.png" },
//             { name: "Orders List", image: "/images/screens/driver/orders.png" },
//             {
//               name: "Navigation",
//               image: "/images/screens/driver/navigation.png",
//             },
//             { name: "Earnings", image: "/images/screens/driver/earnings.png" },
//           ],
//         },
//         {
//           id: "admin",
//           name: "Admin Dashboard",
//           screens: [
//             {
//               name: "Dashboard Overview",
//               image: "/images/screens/admin/dashboard.png",
//             },
//             {
//               name: "User Management",
//               image: "/images/screens/admin/users.png",
//             },
//             {
//               name: "Order Management",
//               image: "/images/screens/admin/orders.png",
//             },
//             {
//               name: "Analytics",
//               image: "/images/screens/admin/analytics.png",
//             },
//           ],
//         },
//       ],
//     },

//     results: [
//       {
//         position: "left",
//         items: [
//           "3x increase in local store visibility",
//           "Higher repeat orders from neighbourhood customers",
//           "Better discovery of offers and combos",
//         ],
//         mockup: "/images/case-studies/screen1.png",
//       },
//       {
//         position: "right",
//         items: [
//           "Boost in overall monthly GMV",
//           "Improved NPS & app store ratings",
//           "Faster onboarding for new partners",
//         ],
//         mockup: "/images/case-studies/results2-phone.png",
//       },
//     ],

//     findYourApp: {
//       title: "Want to build an app like LoveLocal?",
//       description:
//         "If you want to build a grocery, hyperlocal, or city‑specific marketplace app, our team can help you start with the right architecture, UX and scalable backend.",
//       mockup: "/images/case-studies/find-app-phone.png",
//     },
//   };
// }

// // =================== PAGE ===================
// export default async function CaseStudyPage({ params }) {
//   const data = await getCaseStudy(params.slug);
//   const { primaryColor, secondaryColor, accentColor, primaryFont } =
//     data.branding;

//   return (
//     <>
//       <style global>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');

//         * {
//           font-family: '${primaryFont}', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
//         }

//         :root {
//           --primary-color: ${primaryColor};
//           --secondary-color: ${secondaryColor};
//           --accent-color: ${accentColor};
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-12px); }
//         }

//         .animate-float { animation: float 3s ease-in-out infinite; }

//         .hover-lift {
//           transition: all .3s cubic-bezier(0.4,0,0.2,1);
//         }
//         .hover-lift:hover {
//           transform: translateY(-6px);
//           box-shadow: 0 18px 40px rgba(15,23,42,0.25);
//         }

//         .hover-scale {
//           transition: transform .25s ease;
//         }
//         .hover-scale:hover {
//           transform: scale(1.05);
//         }

//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>

//       <main className="w-full bg-white overflow-hidden">
//         <HeroSection data={data} />
//         <TeamTimeline data={data} />
//         <TechnologyStack data={data} />
//         <ProjectOverview data={data} />
//         <ProjectRequirements data={data} />
//         <GoalsObjectives data={data} />
//         <ChallengesSolutions data={data} />
//         <AppScreensShowcase data={data} />
//         <ResultsDelivered data={data} />
//         <FindYourApp data={data} />
//       </main>
//     </>
//   );
// }


// app/(public)/case-studies/[slug]/page.jsx
import Image from 'next/image';
import { Users, Clock } from 'lucide-react';
import prisma from '@/lib/prisma';
import { AppScreensCarousel } from './AppScreensCarousel';

// ---------- helpers ----------
function parseJson(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

// ========== DATA FETCH (Prisma) ==========
async function getCaseStudy(slug) {
  const row = await prisma.caseStudy.findUnique({
    where: { slug },
  });

  if (!row) return null;

  const branding = parseJson(
    row.brandingJson,
    {
      primaryColor: '#0EA5E9',
      secondaryColor: '#0B3250',
      accentColor: '#22C55E',
      primaryFont: 'DM Sans',
      colors: [
        { name: 'Sky Blue', hex: '#0EA5E9' },
        { name: 'Midnight', hex: '#0B3250' },
        { name: 'Emerald', hex: '#22C55E' },
      ],
    }
  );

  const team = parseJson(
    row.teamJson,
    {
      size: '06 People',
      roles: 'PM / TL / Devs / Designers / QA',
      timeline: '60 Days',
      duration: 'Design + Development',
    }
  );

  const client = parseJson(
    row.clientJson,
    {
      name: 'Client name',
      subtitle: 'is an entrepreneur',
      location: 'City, Country',
      industry: 'Industry',
      avatar: '/images/client-avatar.png',
    }
  );

  const technologies = parseJson(
    row.technologiesJson,
    {
      backgroundImage: '/images/tech-bg.jpg',
      items: [],
    }
  );

  const overview = parseJson(
    row.overviewJson,
    {
      description: '',
      mockup: '/images/case-studies/overview-phone.png',
    }
  );

  const requirements = parseJson(
    row.requirementsJson,
    {
      items: [],
      mockup: '/images/case-studies/requirements-phone.png',
    }
  );

  const goals = parseJson(
    row.goalsJson,
    {
      backgroundImage: '/images/case-studies/goals-bg.jpg',
      items: [],
    }
  );

  const challenges = parseJson(
    row.challengesJson,
    {
      challenge: '',
      solution: '',
    }
  );

  const appScreens = parseJson(
    row.appScreensJson,
    {
      title: 'App screens',
      categories: [],
    }
  );

  const results = parseJson(row.resultsJson, []);

  const findYourApp = parseJson(
    row.findYourAppJson,
    {
      title: 'Want to build an app like this?',
      description: '',
      mockup: '/images/case-studies/find-app-phone.png',
    }
  );

  return {
    id: row.id,
    slug: row.slug,
    logo: row.logo || '/images/case-studies/logo.png',
    title: row.title,
    subtitle: row.subtitle || '',
    hero: {
      backgroundImage:
        row.heroBgImage || '/images/case-studies/hero-bg.png',
      circleImage: row.heroCircle || '/images/case-studies/hero-circle.png',
      mockups: [
        row.heroMockups || '/images/case-studies/screen1.png',
      ],
    },
    downloads: {
      googlePlay: {
        url: '#',
        image: '/images/badges/google-play.png',
      },
      appStore: {
        url: '#',
        image: '/images/badges/app-store.png',
      },
      web: {
        url: '#',
        image: '/images/badges/web-badge.png',
      },
    },
    branding,
    team,
    client,
    technologies,
    overview,
    requirements,
    goals,
    challenges,
    appScreens,
    results,
    findYourApp,
  };
}

// =================== PAGE ===================
export default async function CaseStudyPage({ params }) {
  const { slug } = await params; // NOTE: params is a Promise in Next 15

  if (!slug || typeof slug !== 'string') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Invalid case study URL.</p>
      </main>
    );
  }

  const data = await getCaseStudy(slug);
  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Case study not found.</p>
      </main>
    );
  }

  const { primaryColor, secondaryColor, accentColor, primaryFont } =
    data.branding;

  return (
    <>
      <style global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');

        * {
          font-family: '${primaryFont}', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        }

        :root {
          --primary-color: ${primaryColor};
          --secondary-color: ${secondaryColor};
          --accent-color: ${accentColor};
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .animate-float { animation: float 3s ease-in-out infinite; }

        .hover-lift {
          transition: all .3s cubic-bezier(0.4,0,0.2,1);
        }
        .hover-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(15,23,42,0.25);
        }

        .hover-scale {
          transition: transform .25s ease;
        }
        .hover-scale:hover {
          transform: scale(1.05);
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <main className="w-full bg-white overflow-hidden">
        <HeroSection data={data} />
        <TeamTimeline data={data} />
        <TechnologyStack data={data} />
        <ProjectOverview data={data} />
        <ProjectRequirements data={data} />
        <GoalsObjectives data={data} />
        <ChallengesSolutions data={data} />
        <AppScreensShowcase data={data} />
        <ResultsDelivered data={data} />
        <FindYourApp data={data} />
      </main>
    </>
  );
}

// =================== SEO ===================
export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    return {
      title: 'Case Study',
      description: 'Case study',
    };
  }

  const data = await getCaseStudy(slug);
  if (!data) {
    return {
      title: 'Case study not found',
      description: 'This case study does not exist.',
    };
  }
  return {
    title: `${data.title} - Case Study | Softkingo`,
    description: data.subtitle,
    openGraph: {
      title: data.title,
      description: data.subtitle,
      images: [data.hero.backgroundImage],
    },
  };
}

// =================== HERO ===================
function HeroSection({ data }) {
  const { primaryColor, secondaryColor } = data.branding;

  return (
    <section
      className="relative overflow-hidden py-16 md:py-20 lg:py-24 "
      style={{
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${adjustColor(
          secondaryColor,
          -25
        )} 100%)`,
      }}
    >
      {/* BG */}
      <div className="absolute inset-0">
        <Image
          src={data.hero.backgroundImage}
          alt="Hero BG"
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>
       <div className="absolute inset-0 bg-gradient-to-r from-[#001322]/80 via-[#001322]/75 to-[#001322]/30" />

      {/* Circle */}
      {/* <div className="absolute right-[-120px] top-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[460px] md:h-[460px] opacity-10">
        <Image
          src={data.hero.circleImage}
          alt="Circle"
          fill
          className="object-contain animate-float"
        />
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left */}
          <div className="text-white space-y-6 md:space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
                <Image
                  src={data.logo}
                  alt={data.title}
                  width={80}
                  height={80}
                  className="h-auto w-auto object-contain"
                />
              </div>
              <h1 className="text-lg sm:text-xl md:text-3xl font-bold">
                {data.title}
              </h1>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
              {data.subtitle}
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-sky-100/90 max-w-xl">
              Mobile app, backend and admin panel built as a complete
              hyperlocal grocery ecosystem.
            </p>

            <div className="flex flex-wrap gap-3 pt-3">
              <a href={data.downloads.googlePlay.url} className="hover-scale">
                <Image
                  src={data.downloads.googlePlay.image}
                  alt="Google Play"
                  width={170}
                  height={54}
                  className="h-6 md:h-12 w-auto"
                />
              </a>
              <a href={data.downloads.appStore.url} className="hover-scale">
                <Image
                  src={data.downloads.appStore.image}
                  alt="App Store"
                  width={170}
                  height={54}
                  className="h-6 md:h-12 w-auto"
                />
              </a>
              <a href={data.downloads.web.url} className="hover-scale">
                <Image
                  src={data.downloads.web.image}
                  alt="Web"
                  width={160}
                  height={50}
                  className="h-6 md:h-12 w-auto"
                />
              </a>
            </div>
          </div>

          {/* Right mockups */}
          <div className="relative  justify-center gap-6 md:gap-8 mt-6 lg:mt-0 hidden md:flex">
            <div className="relative w-32 h-64 sm:w-40 sm:h-80 md:w-48 md:h-[420px] lg:w-[25rem] lg:h-[30rem] animate-float">
              <Image
                src={data.hero.mockups[0]}
                alt="Screen 1"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
            {/* <div
              className="relative w-28 h-56 sm:w-36 sm:h-72 md:w-44 md:h-[380px] lg:w-52 lg:h-[440px] hidden sm:block animate-float"
              style={{ animationDelay: "0.5s" }}
            >
              <Image
                src={data.hero.mockups[1]}
                alt="Screen 2"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

// =================== TEAM & CLIENT / COLORS ===================
function TeamTimeline({ data }) {
  const { primaryColor, primaryFont } = data.branding;

  return (
    <>
      {/* cards */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 hover-lift">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-gray-400 text-sm sm:text-base mb-2">
                  Team Size
                </p>
                <h3 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                  {data.team.size}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {data.team.roles}
                </p>
              </div>
              <Users className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-gray-600" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 hover-lift">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-gray-400 text-sm sm:text-base mb-2">
                  Timeline
                </p>
                <h3 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                  {data.team.timeline}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {data.team.duration}
                </p>
              </div>
              <Clock className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-gray-600" />
            </div>
          </div>
        </div>
      </section>

      {/* about + colors */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* client */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
            <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gray-200 rounded-full mb-2 overflow-hidden">
              {data.client.avatar && (
                <Image
                  src={data.client.avatar}
                  alt={data.client.name}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              About Client
            </h3>
            <p className="text-lg sm:text-xl">
              <span className="font-bold">{data.client.name}</span>{" "}
              {data.client.subtitle}
            </p>
            <p className="text-base sm:text-lg text-gray-600">
              from {data.client.location}
            </p>
            <div className="bg-gray-100 px-6 py-3 rounded-full mt-2">
              <span className="text-gray-700 text-sm sm:text-base">
                Industry :{" "}
                <span className="font-bold">{data.client.industry}</span>
              </span>
            </div>
          </div>

          {/* colors / font */}
          <div className="space-y-10">
            <div className="text-center mb-4">
              <div className="flex justify-center items-baseline mb-6 sm:mb-8">
                <span
                  className="font-bold leading-none text-7xl sm:text-[6rem] lg:text-[7rem]"
                  style={{ color: primaryColor, fontFamily: primaryFont }}
                >
                  A
                </span>
                <span
                  className="font-light leading-none opacity-30 text-6xl sm:text-[5rem] lg:text-[6rem]"
                  style={{ color: primaryColor, fontFamily: primaryFont }}
                >
                  a
                </span>
              </div>
              <p
                className="text-2xl sm:text-3xl lg:text-4xl font-bold"
                style={{ color: primaryColor }}
              >
                {primaryFont.toUpperCase()}
              </p>
            </div>

            <div className="bg-black rounded-3xl lg:rounded-[2.5rem] p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
                {data.branding.colors.map((color) => (
                  <div key={color.hex} className="text-center">
                    <div
                      className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-3xl shadow-2xl mb-3 mx-auto hover-scale"
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="text-white text-sm sm:text-base font-bold mb-1">
                      {color.hex}
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {color.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// =================== TECHNOLOGY ===================
function TechnologyStack({ data }) {
  const { primaryColor } = data.branding;

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Image
          src={data.technologies.backgroundImage}
          alt="Tech BG"
          fill
          className="object-cover"
        />
      </div>

      <div
        className="absolute top-0 left-0 w-[420px] h-[420px] rounded-full blur-3xl opacity-25 animate-float"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-10 sm:mb-14">
          Technology & Tools
        </h2>

        <div className="flex overflow-x-auto hide-scrollbar justify-center gap-8 sm:gap-10">
          {data.technologies.items.map((tech) => (
            <div key={tech.name} className="text-center">
              <div className="bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 hover-lift">
                <div className="w-16 h-16 sm:w-20 sm:h-20 relative mx-auto">
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-white font-semibold text-sm sm:text-base mt-3">
                {tech.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =================== OVERVIEW ===================
function ProjectOverview({ data }) {
  const { primaryColor } = data.branding;

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Project Overview
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
            {data.overview.description}
          </p>
        </div>

        <div className="relative flex justify-center mt-6 lg:mt-0">
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-30 scale-75 animate-float"
            style={{
              background: `radial-gradient(circle, ${primaryColor}60, transparent)`,
            }}
          />
          <div className="relative w-40 h-80 sm:w-52 sm:h-[380px] md:w-64 md:h-[440px] lg:w-72 lg:h-[520px]">
            <Image
              src={data.overview.mockup}
              alt="Overview"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// =================== REQUIREMENTS ===================
function ProjectRequirements({ data }) {
  const { primaryColor } = data.branding;

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="order-2 lg:order-1 relative flex justify-center">
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-30 scale-75 animate-float"
            style={{
              background: `radial-gradient(circle, ${primaryColor}60, transparent)`,
            }}
          />
          <div className="relative w-40 h-80 sm:w-52 sm:h-[380px] md:w-64 md:h-[440px] lg:w-72 lg:h-[520px]">
            <Image
              src={data.requirements.mockup}
              alt="Requirements"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Project Requirements
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              The client approached Softkingo with the following key goals:
            </p>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {data.requirements.items.map((item) => (
              <div key={item.title} className="space-y-2">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold flex items-start gap-2">
                  <span
                    className="text-xl sm:text-2xl"
                    style={{ color: primaryColor }}
                  >
                    ▸
                  </span>
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 pl-6 sm:pl-8">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =================== GOALS ===================
function GoalsObjectives({ data }) {
  const { primaryColor } = data.branding;

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative h-64 sm:h-80 md:h-[420px] lg:h-[460px] rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-2xl">
          <Image
            src={data.goals.backgroundImage}
            alt="Goals"
            fill
            className="object-cover"
          />
        </div>

        <div className="bg-white rounded-3xl lg:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-xl hover-lift">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
            Goals & Objectives
          </h2>
          <ul className="space-y-4 sm:space-y-5">
            {data.goals.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm sm:text-base lg:text-lg text-gray-700"
              >
                <span
                  className="text-xl sm:text-2xl flex-shrink-0 mt-0.5"
                  style={{ color: primaryColor }}
                >
                  ▸
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// =================== CHALLENGES ===================
function ChallengesSolutions({ data }) {
  const { primaryColor } = data.branding;

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-sky-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
        <div className="bg-white rounded-3xl lg:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-lg hover-lift">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            The Challenges
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
            {data.challenges.challenge}
          </p>
        </div>

        <div
          className="rounded-3xl lg:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-lg hover-lift"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}30)`,
          }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            The Solution
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-800 leading-relaxed">
            {data.challenges.solution}
          </p>
        </div>
      </div>
    </section>
  );
}

// =================== APP SCREENS SHOWCASE ===================
function AppScreensShowcase({ data }) {
  const { primaryColor } = data.branding;
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-0 bg-sky-50">
      <AppScreensCarousel data={data.appScreens} primaryColor={primaryColor} />
    </section>
  );
}

// =================== RESULTS ===================
function ResultsDelivered({ data }) {
  const { primaryColor } = data.branding;

  return (
    <>
      {data.results.map((result, index) => (
        <section
          key={index}
          className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-white relative overflow-hidden"
        >
          <div
            className="absolute top-0 left-0 w-[320px] h-[320px] rounded-full blur-3xl opacity-25"
            style={{ backgroundColor: `${primaryColor}40` }}
          />
          <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* image */}
            <div
              className={`relative flex justify-center ${
                result.position === "right" ? "lg:order-2" : ""
              }`}
            >
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-30 animate-float"
                style={{
                  background: `radial-gradient(circle, ${primaryColor}60, transparent)`,
                  animationDelay: `${index * 0.5}s`,
                }}
              />
              <div className="relative w-40 h-80 sm:w-52 sm:h-[380px] md:w-64 md:h-[440px] lg:w-72 lg:h-[520px]">
                <Image
                  src={result.mockup}
                  alt="Results"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* text */}
            <div
              className={`space-y-4 sm:space-y-5 lg:space-y-6 ${
                result.position === "right" ? "lg:order-1" : ""
              }`}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                Results Delivered
              </h2>
              <ul className="space-y-3 sm:space-y-4">
                {result.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm sm:text-base lg:text-lg text-gray-700"
                  >
                    <span
                      className="text-xl sm:text-2xl flex-shrink-0 mt-0.5"
                      style={{ color: primaryColor }}
                    >
                      ▸
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

// =================== FIND YOUR APP ===================
function FindYourApp({ data }) {
  const { primaryColor } = data.branding;

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-black text-white relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[360px] h-[360px] rounded-full blur-3xl opacity-25"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-5 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            {data.findYourApp.title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed">
            {data.findYourApp.description}
          </p>
        </div>

        <div className="relative flex justify-center mt-6 lg:mt-0">
          <div className="relative w-40 h-80 sm:w-52 sm:h-[380px] md:w-64 md:h-[440px] lg:w-72 lg:h-[520px] -rotate-3 hover:rotate-0 transition-transform duration-500">
            <Image
              src={data.findYourApp.mockup}
              alt="Find your app"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// =================== HELPER ===================
function adjustColor(color, amount) {
  const clamp = (n) => Math.min(255, Math.max(0, n));
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `#${clamp(r + amount)
    .toString(16)
    .padStart(2, "0")}${clamp(g + amount)
    .toString(16)
    .padStart(2, "0")}${clamp(b + amount).toString(16).padStart(2, "0")}`;
}

// =================== SEO ===================
// export async function generateMetadata({ params }) {
//   const data = await getCaseStudy(params.slug);
//   return {
//     title: `${data.title} - Case Study | Softkingo`,
//     description: data.subtitle,
//     openGraph: {
//       title: data.title,
//       description: data.subtitle,
//       images: [data.hero.backgroundImage],
//     },
//   };
// }
