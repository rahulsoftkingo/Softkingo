"use client"
import { useState } from "react"
import { FaArrowRight } from "react-icons/fa"
import { FaDotCircle } from "react-icons/fa"

export default function Industries() {


  const [industries, setIndustries] = useState([
  {
    title: "Healthcare",
    points: {
      1: "Real‑time patient monitoring",
      2: "Appointment scheduling & reminders",
      3: "Electronic health records access",
      4: "Telemedicine & virtual consultations",
      5: "Prescription management",
      6: "Emergency alerts & notifications",
    },
    logo: "images/hospitality.png",
    image:"images/industries/healthcare.jpg",
  },
  {
    title: "Finance",
    points: {
      1: "Secure transactions & encryption",
      2: "Real‑time market data feeds",
      3: "Portfolio management dashboard",
      4: "Automated investment recommendations",
      5: "Budgeting & expense tracking",
      6: "Integrated customer support chat",
    },
    logo: "images/finance.png",
    image:"images/industries/finance.avif",
  },
  {
    title: "Retail",
    points: {
      1: "Product catalog management",
      2: "Shopping cart & checkout",
      3: "Order tracking & history",
      4: "Customer reviews & ratings",
      5: "Promotions & discount engine",
      6: "Loyalty programs & rewards",
    },
    logo: "images/retail.png",
    image:"images/industries/retail.jpg",
  },
  {
    title: "Education",
    points: {
      1: "Course creation & management",
      2: "Student enrollment & profiles",
      3: "Assignments submission & grading",
      4: "Discussion forums & chat",
      5: "Resource library & sharing",
      6: "Progress tracking & analytics",
    },
    logo: "images/education.png",
    image:"images/industries/education.webp",
  },
  {
    title: "Travel",
    points: {
      1: "Flight & hotel booking",
      2: "Itinerary planning tools",
      3: "Real‑time flight status updates",
      4: "Multicity trip management",
      5: "Travel insurance integration",
      6: "Local experiences & tours",
    },
    logo: "images/travel.png",
    image:"images/industries/travel.webp",
  },
  // {
  //   title: "Logistics",
  //   points: {
  //     1: "Fleet tracking & telematics",
  //     2: "Route optimization algorithms",
  //     3: "Shipment scheduling & alerts",
  //     4: "Warehouse inventory management",
  //     5: "Proof of delivery capture",
  //     6: "Carrier performance analytics",
  //   },
  //   logo: "images/logistics.png",
  // },
  {
    title: "Entertainment",
    points: {
      1: "Content catalog & recommendations",
      2: "Ticket booking & e‑tickets",
      3: "Live streaming integration",
      4: "User ratings & reviews",
      5: "Event scheduling & reminders",
      6: "Social sharing & community features",
    },
    logo: "images/entertainment.png",
    image:"images/industries/entertainment.avif",
  },
  {
    title: "Real Estate",
    points: {
      1: "Property listings & search filters",
      2: "Virtual tours & 3D walkthroughs",
      3: "Agent contact & scheduling",
      4: "Mortgage calculator tools",
      5: "Document management & e‑sign",
      6: "Market insights & trends",
    },
    logo: "images/realestate.png",
    image:"images/industries/realestate.avif",
  },
  // {
  //   title: "Hospitality",
  //   points: {
  //     1: "Room booking & availability",
  //     2: "Check‑in/out automation",
  //     3: "Housekeeping request management",
  //     4: "Loyalty & rewards programs",
  //     5: "Guest feedback & surveys",
  //     6: "In‑app concierge services",
  //   },
  //   logo: "images/hospitality.png",
  // },
  {
    title: "Manufacturing",
    points: {
      1: "Production line monitoring",
      2: "Inventory & supply chain tracking",
      3: "Quality control workflows",
      4: "Predictive maintenance alerts",
      5: "Order fulfillment dashboards",
      6: "Equipment utilization analytics",
    },
    logo: "images/manufacturing.png",
    image:"images/industries/manufacturing.jpg",
  },
]);

  const [current, setCurrent] = useState("Healthcare")

  return (

    <div className="bg-gradient-to-br from-white via-sky-100 to-sky-200 w-full h-auto py-16 ">
      <div className="flex justify-center items-center">
        <div className="h-full  container mx-auto px-4 sm:px-8 md:px-16 lg:px-28 ">
          {/* <div className=" flex flex-col justify-center gap-4 text-center items-center">
            <div className="text-4xl md:text-4xl lg:text-[50px] pt-[30px] flex text-black">
              <span>Industries</span>
              <span className="font-bold text-[#28AFDF] ml-3">We Serve</span>
            </div>
            <p>lorem lorem lorem koo jmo kmmo imom jmo knos kins kns kinsn </p>
          </div> */}
          <div className=" flex flex-col justify-center gap-4 text-center items-center">
  <div className="text-4xl md:text-4xl lg:text-[50px] pt-[30px] flex text-black">
    <span>Industries</span>
    <span className="font-bold text-[#28AFDF] ml-3">We Serve</span>
  </div>
  <p className="max-w-2xl mx-auto text-gray-700 text-xs md:text-sm">
    From healthcare and finance to e‑commerce, manufacturing, and education, we empower organizations across diverse sectors with custom software solutions that drive efficiency, innovation, and growth. 
  </p>
</div>

          <div className="grid grid-rows-1  md:grid-cols-3 mt-16 bg-white md:bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 p-1 md:p-4 rounded-3xl lg:h-[463px]">
            <div className="  
       whitespace-nowrap   
          w-full 
    
    md:w-full md:h-full
    flex flex-row
    md:flex-col
    gap-4
    overflow-x-auto md:overflow-x-hidden  
    overflow-y-hidden md:overflow-y-auto
     md:scrollbar-none md:hide-scrollbar 
    scrollbar-none hide-scrollbar
    text-white p-4 md:p-6
      
      col-span-1">
              {industries.map((industry) => {
                const isActive = industry.title === current
                return (
                  <div
                    key={industry.title}
                    // onClick={() => setCurrent(industry.title)}
                    onMouseEnter={() => setCurrent(industry.title)}
                    className={`text-sm md:text-[20px] cursor-pointer flex items-center transition-all duration-300 ease-in-out ${isActive ? "px-6 py-2  rounded-full font-medium transition-all  bg-gradient-to-l from-sky-400 via-primary to-sky-600 text-white shadow-lg shadow-sky-200 text-sm md:text-sky-800  md:bg-gradient-to-l md:from-white md:via-white md:to-sky-50  md:rounded-xl  md:py-3 md:shadow-none": "text-primary border border-primary bg-white px-6 rounded-full md:bg-transparent md:py-3 md:text-white md:border-0 md:rounded-xl hover:bg-sky-50 hover:bg-opacity-25 hover:text-sky-100 md:hover:py-3 hover:px-6 md:hover:rounded-xl  "
                      }`}
                  >
                 <span
                      className={`transition-all duration-300 ease-in-out  items-center ${isActive ? "w-[20px] opacity-100 mr-2" : "w-0 opacity-0 mr-0"
                        }`}
                    >
                      <FaArrowRight />
                    </span>


                    <span
                      className={`transition-all duration-300 ease-in-out  `}
                    >
                      {industry.title}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="col-span-2 p-[10px] lg:w-full lg:h-full borderborderprimary rounded-3xl overflow-hidden bg-white">

              <div className="h-full ">
                {industries.map((industry) => {
                  if (industry.title === current) {
                    return (
                      <div key={industry.title} className="text-black grid grid-cols-1 lg:grid-cols-4 h-full ">
                        <div className="col-span-2">
                          <div className="flex items-center gap-2 md:gap-[20px]">
                            <div className="bg-white w-[60px] [fit-content] lg:w-[60px] lg:h-[60px] p-[6px] rounded-[20px] justify-center items-center flex"><img  src={industry.logo} alt="" /></div>
                            <p className="font-semibold text-xl md:text-[30px] md:mt-4 text-sky-900">{industry.title}</p></div>
                          <div className="md:flex flex-col ml-2 mt-[20px] gap-[14px] hidden ">
                            {Object.values(industry.points).map((point, index) => (
                              <div key={index} className="flex items-center">
                                <div>
                                  <img width="16" height="16" src="images/dot.png" alt="full-stop--v2" className="text-sm" />
                                  
                                </div>
                                <p className="text-[20px] font-light ml-[18px]">{point}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="col-span-2 h-full max-h-[24rem] p-[10px]">
                      {/* <img src="images/ind.png" alt="" className="  object-cover h-full w-full  rounded-[20px] " /> */}
                      <img src={industry.image}  alt={industry.title}  className="  object-cover h-full w-full  rounded-[20px] " />
                        </div>

                      </div>

                    )
                  }
                  return null
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )

}