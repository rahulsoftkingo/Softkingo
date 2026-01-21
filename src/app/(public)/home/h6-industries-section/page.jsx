"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function Industries() {
  const [industries] = useState([
    {
      title: "Healthcare",
      href: "/industries/healthcare",
      points: {
        1: "Real‑time patient monitoring",
        2: "Appointment scheduling & reminders",
        3: "Electronic health records access",
        4: "Telemedicine & virtual consultations",
        5: "Prescription management",
        6: "Emergency alerts & notifications",
      },
      logo: "images/industries/logo/hospitality.png",
      image: "images/industries/healthcare.jpg",
    },
    {
      title: "Education / E-Learning",
      href: "/industries/elearning",
      points: {
        1: "Course creation & management",
        2: "Student enrollment & profiles",
        3: "Assignments submission & grading",
        4: "Discussion forums & chat",
        5: "Resource library & sharing",
        6: "Progress tracking & analytics",
      },
      logo: "images/industries/logo/education.png",
      image: "images/industries/education.webp",
    },
    {
      title: "Real Estate",
      href: "/industries/real-estate",
      points: {
        1: "Property listings & search filters",
        2: "Virtual tours & 3D walkthroughs",
        3: "Agent contact & scheduling",
        4: "Mortgage calculator tools",
        5: "Document management & e‑sign",
        6: "Market insights & trends",
      },
      logo: "images/industries/logo/realestate.png",
      image: "images/industries/realestate.avif",
    },
    {
      title: "Travel & Tourism",
      href: "/industries/travel",
      points: {
        1: "Flight & hotel booking",
        2: "Itinerary planning tools",
        3: "Real‑time flight status updates",
        4: "Multicity trip management",
        5: "Travel insurance integration",
        6: "Local experiences & tours",
      },
      logo: "images/industries/logo/travel.png",
      image: "images/industries/travel.webp",
    },
    {
      title: "Food & Restaurant",
      href: "/industries/food-delivery",
      points: {
        1: "Menu & catalog management",
        2: "Order scheduling and tracking",
        3: "Live delivery tracking",
        4: "Offers & coupon management",
        5: "Ratings & reviews",
        6: "Payment gateway integrations",
      },
      logo: "images/industries/logo/entertainment.png",
      image: "images/industries/entertainment.avif",
    },
    {
      title: "Fitness & Wellness",
      href: "/industries/fitness",
      points: {
        1: "Workout plans & schedules",
        2: "Nutrition tracking",
        3: "Trainer booking & sessions",
        4: "Progress tracking",
        5: "Push notifications",
        6: "Subscriptions & memberships",
      },
      logo: "images/industries/logo/finance.png",
      image: "images/industries/finance.avif",
    },
    {
      title: "Retail & E-Commerce",
      href: "/industries/ecommerce",
      points: {
        1: "Product catalog management",
        2: "Shopping cart & checkout",
        3: "Order tracking & history",
        4: "Customer reviews & ratings",
        5: "Promotions & discount engine",
        6: "Loyalty programs & rewards",
      },
      logo: "images/industries/logo/retail.png",
      image: "images/industries/retail.jpg",
    },
    {
      title: "Logistics & Transportation",
      href: "/industries/logistics",
      points: {
        1: "Fleet tracking & telematics",
        2: "Route optimization",
        3: "Shipment scheduling & alerts",
        4: "Warehouse visibility",
        5: "Proof of delivery capture",
        6: "Performance analytics",
      },
      logo: "images/industries/logo/manufacturing.png",
      image: "images/industries/manufacturing.jpg",
    },
    {
      title: "Media & Entertainment",
      href: "/industries",
      points: {
        1: "Content catalog & recommendations",
        2: "Subscriptions & monetization",
        3: "Live streaming integration",
        4: "User ratings & reviews",
        5: "Event scheduling & reminders",
        6: "Community features",
      },
      logo: "images/industries/logo/entertainment.png",
      image: "images/industries/entertainment.avif",
    },
    {
      title: "Social Networking",
      href: "/industries/social-media",
      points: {
        1: "User profiles & feeds",
        2: "Messaging & chat",
        3: "Groups & communities",
        4: "Notifications",
        5: "Content moderation tools",
        6: "Analytics & engagement tracking",
      },
      logo: "images/industries/logo/education.png",
      image: "images/industries/education.webp",
    },
    {
      title: "Finance / FinTech",
      href: "/industries/fintech-software-development",
      points: {
        1: "Secure transactions & encryption",
        2: "KYC & onboarding flows",
        3: "Payments & wallets",
        4: "Dashboards & analytics",
        5: "Fraud prevention",
        6: "Support & ticketing",
      },
      logo: "images/industries/logo/finance.png",
      image: "images/industries/finance.avif",
    },
    {
      title: "Automotive",
      href: "/industries/automotive",
      points: {
        1: "Vehicle tracking",
        2: "Service scheduling",
        3: "Spare parts inventory",
        4: "Dealer management",
        5: "Customer apps",
        6: "Reports & analytics",
      },
      logo: "images/industries/logo/travel.png",
      image: "images/industries/travel.webp",
    },
    {
      title: "Construction",
      href: "/industries/construction-management-software-development",
      points: {
        1: "Project planning",
        2: "Site monitoring",
        3: "Resource allocation",
        4: "Document workflows",
        5: "Task management",
        6: "Compliance tracking",
      },
      logo: "images/industries/logo/realestate.png",
      image: "images/industries/realestate.avif",
    },
    {
      title: "Manufacturing",
      href: "/industries/manufacturing",
      points: {
        1: "Production monitoring",
        2: "Inventory tracking",
        3: "Quality workflows",
        4: "Predictive maintenance",
        5: "Order dashboards",
        6: "Utilization analytics",
      },
      logo: "images/industries/logo/manufacturing.png",
      image: "images/industries/manufacturing.jpg",
    },
    {
      title: "Event Management",
      href: "/industries/event-management-software-development",
      points: {
        1: "Ticketing & passes",
        2: "Attendee check-in",
        3: "Schedules & agendas",
        4: "Payments & invoicing",
        5: "Notifications",
        6: "Analytics & reports",
      },
      logo: "images/industries/logo/retail.png",
      image: "images/industries/retail.jpg",
    },
    // {
    //   title: "AR/VR",
    //   href: "/industries/ar-vr",
    //   points: {
    //     1: "Immersive product demos",
    //     2: "Training simulations",
    //     3: "3D experiences",
    //     4: "AR overlays",
    //     5: "VR walkthroughs",
    //     6: "Device integrations",
    //   },
    //   logo: "images/industries/logo/education.png",
    //   image: "images/industries/education.webp",
    // },
  ]);

  const [current, setCurrent] = useState("Healthcare");
  const activeIndustry = industries.find((i) => i.title === current) || industries[0];
const leftSidebarWidth = "w-full md:w-[300px]"; 
// const rightContentWidth = "flex-1 md:min-w-[calc(100%-300px)]";
  return (
    <div className="bg-gradient-to-br from-white to-white w-full h-auto py-16 px-4 sm:px-6">
      <div className="flex justify-center items-center max-w-7xl mx-auto">
        <div className="h-full w-full max-w-7xl">
          {/* ✅ Header same like Portfolio */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-sky-900"
            >
              Industries{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500">
                We Serve
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
            >
              From healthcare and finance to e‑commerce, manufacturing, and education, we build custom software that drives efficiency and growth.
            </motion.p>
          </div>

          <div className="grid grid-rows-1 md:grid-cols-3 mt-10 md:mt-16 bg-white md:bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 p-1 md:p-4 rounded-3xl lg:h-[463px]">
            {/* Left list */}
            <div
              className="
                whitespace-nowrap w-full md:w-full md:h-full
                flex flex-row md:flex-col gap-4
                overflow-x-auto md:overflow-x-hidden
                overflow-y-hidden md:overflow-y-auto
                scrollbar-none hide-scrollbar
                text-white p-4 md:p-6 col-span-1
              "
            >
              {industries.map((industry) => {
                const isActive = industry.title === current;
                return (
                  <div
                    key={industry.title}
                    onMouseEnter={() => setCurrent(industry.title)}
                    className={`text-sm md:text-[20px] cursor-pointer flex items-center transition-all duration-300 ease-in-out text-sky-500 ${
                      isActive
                        ? "px-6 py-2 rounded-full font-medium bg-gradient-to-l from-sky-400 via-primary to-sky-600 text-white shadow-lg shadow-sky-200 md:text-sky-800 md:bg-gradient-to-l md:from-white md:via-white md:to-sky-50 md:rounded-xl md:py-3 md:shadow-none"
                        : "text-primary border border-primary bg-white px-6 rounded-full md:bg-transparent md:py-3 md:text-white md:border-0 md:rounded-xl hover:bg-sky-50 hover:bg-opacity-25 hover:text-sky-100"
                    }`}
                  >
                    <span
                      className={`transition-all duration-300 ease-in-out items-center ${
                        isActive ? "w-[20px] opacity-100 mr-2" : "w-0 opacity-0 mr-0"
                      }`}
                    >
                      <FaArrowRight />
                    </span>
                    <span className="transition-all duration-300 ease-in-out">{industry.title}</span>
                  </div>
                );
              })}
            </div>

            {/* Right details */}
            <div className="col-span-2 p-[10px] lg:w-full lg:h-full rounded-3xl overflow-hidden bg-white">
              <div className="h-full">
                <div className="text-black grid grid-cols-1 lg:grid-cols-4 h-full">
                  <div className="col-span-2">
                    <div className="flex items-center gap-2 md:gap-[20px]">
                      <div className="bg-white w-[60px] lg:w-[60px] lg:h-[60px] p-[6px] rounded-[20px] justify-center items-center flex">
                        <img src={activeIndustry.logo} alt="" />
                      </div>
                      <p className="font-semibold text-xl md:text-2xl md:mt-4 text-sky-900">
                        {activeIndustry.title}
                      </p>
                    </div>

                    <div className="md:flex flex-col ml-2 mt-[20px] gap-[14px] hidden">
                      {Object.values(activeIndustry.points).map((point, index) => (
                        <div key={index} className="flex items-center">
                          <div>
                            <img
                              width="16"
                              height="16"
                              src="images/dot.png"
                              alt="dot"
                              className="text-sm"
                            />
                          </div>
                          <p className="text-[20px] font-light ml-[18px]">{point}</p>
                        </div>
                      ))}
                    </div>

                    {/* ✅ NEW: button link under points */}
                    <div className="hidden md:flex mt-6 ml-2">
                      <Link
                        href={activeIndustry.href}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-600 text-white text-sm font-semibold hover:bg-sky-500 transition"
                      >
                        View More
                        <FaArrowRight className="text-[0.8rem]" />
                      </Link>
                    </div>
                  </div>

                  <div className="col-span-2 h-full max-h-96 p-2.5">
                    <img
                      src={activeIndustry.image}
                      alt={activeIndustry.title}
                      className="object-cover h-full w-full rounded-[20px]"
                    />
                  </div>

                  {/* ✅ Mobile button (optional, so CTA visible on mobile too) */}
                  <div className="md:hidden px-2 pb-3">
                    <Link
                      href={activeIndustry.href}
                      className="w-full inline-flex justify-center items-center gap-2 px-5 py-2 rounded-full bg-sky-600 text-white text-sm font-semibold hover:bg-sky-500 transition"
                    >
                      View More
                      <FaArrowRight className="text-[0.8rem]" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Right details */}
          </div>
        </div>
      </div>
    </div>
  );
}
