// import React from "react";
// import { useState } from "react"

// const dummyData = Array.from({ length: 30 }, (_, i) => ` ${i + 1}`);

// function Strengths_Scroll({scrollRef}) {
//     const [strengths, setStrengths] = useState([
//   {
//     title: "Healthcare",
//     points: {
//       1: "Real‑time patient monitoring",
//       2: "Appointment scheduling & reminders",
//       3: "Electronic health records access",
//       4: "Telemedicine & virtual consultations",
//       5: "Prescription management",
//       6: "Emergency alerts & notifications",
//     },
//     logo: "images/healthcare.png",
//   },
//   {
//     title: "Finance",
//     points: {
//       1: "Secure transactions & encryption",
//       2: "Real‑time market data feeds",
//       3: "Portfolio management dashboard",
//       4: "Automated investment recommendations",
//       5: "Budgeting & expense tracking",
//       6: "Integrated customer support chat",
//     },
//     logo: "images/finance.png",
//   },
//   {
//     title: "Retail",
//     points: {
//       1: "Product catalog management",
//       2: "Shopping cart & checkout",
//       3: "Order tracking & history",
//       4: "Customer reviews & ratings",
//       5: "Promotions & discount engine",
//       6: "Loyalty programs & rewards",
//     },
//     logo: "images/retail.png",
//   },
//   {
//     title: "Education",
//     points: {
//       1: "Course creation & management",
//       2: "Student enrollment & profiles",
//       3: "Assignments submission & grading",
//       4: "Discussion forums & chat",
//       5: "Resource library & sharing",
//       6: "Progress tracking & analytics",
//     },
//     logo: "images/education.png",
//   },
//   {
//     title: "Travel",
//     points: {
//       1: "Flight & hotel booking",
//       2: "Itinerary planning tools",
//       3: "Real‑time flight status updates",
//       4: "Multicity trip management",
//       5: "Travel insurance integration",
//       6: "Local experiences & tours",
//     },
//     logo: "images/travel.png",
//   },
//   {
//     title: "Logistics",
//     points: {
//       1: "Fleet tracking & telematics",
//       2: "Route optimization algorithms",
//       3: "Shipment scheduling & alerts",
//       4: "Warehouse inventory management",
//       5: "Proof of delivery capture",
//       6: "Carrier performance analytics",
//     },
//     logo: "images/logistics.png",
//   },
//   {
//     title: "Entertainment",
//     points: {
//       1: "Content catalog & recommendations",
//       2: "Ticket booking & e‑tickets",
//       3: "Live streaming integration",
//       4: "User ratings & reviews",
//       5: "Event scheduling & reminders",
//       6: "Social sharing & community features",
//     },
//     logo: "images/entertainment.png",
//   },
//   {
//     title: "Real Estate",
//     points: {
//       1: "Property listings & search filters",
//       2: "Virtual tours & 3D walkthroughs",
//       3: "Agent contact & scheduling",
//       4: "Mortgage calculator tools",
//       5: "Document management & e‑sign",
//       6: "Market insights & trends",
//     },
//     logo: "images/realestate.png",
//   },
//   {
//     title: "Hospitality",
//     points: {
//       1: "Room booking & availability",
//       2: "Check‑in/out automation",
//       3: "Housekeeping request management",
//       4: "Loyalty & rewards programs",
//       5: "Guest feedback & surveys",
//       6: "In‑app concierge services",
//     },
//     logo: "images/hospitality.png",
//   },
//   {
//     title: "Manufacturing",
//     points: {
//       1: "Production line monitoring",
//       2: "Inventory & supply chain tracking",
//       3: "Quality control workflows",
//       4: "Predictive maintenance alerts",
//       5: "Order fulfillment dashboards",
//       6: "Equipment utilization analytics",
//     },
//     logo: "images/manufacturing.png",
//   },
// ]);
//   return (
//     <div ref={scrollRef} className=" w-full   ">
//       <div className=" h-full justify-between scrollbar-hidden grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 sm:px-8 md:px-16 lg:px-28">
//         <div className="col-span-1   sticky top-8 bg-white md:h-[500px] pb-4 flex  flex-col items-center md:items-start ">
//           <div className="lg:ml-[50px] mt-[73px] text-3xl md:text-4xl lg:text-[50px] flex gap-[10px]">
//             <p className="text-black">Our </p>
//             <p className="text-[#28AFDF] font-bold">Strenghts</p>
//           </div>
//           <p className="mt-[30px] font-light text-sm md:text-lg lg:text-[20px] md:ml-[50px] lg:w-[475px]  text-center md:text-start">
//             Explore our recent projects showcasing our expertise across
//             different industries and technologies{" "}
//           </p>
//         </div>

//         <div className="mr-[63px] mt-[73px]">

//          {strengths.map((strengths,item, index, points) => (
                
//                     <div key={index} className="bg-white p-4 ">
//               <h3 className="text-xl font-semibold">{item}</h3>
//               <p className="text-gray-700 mt-2">{points}
//               </p>
//             </div>
//           ))},
                  
//           {dummyData.map((item, index) => (
//             <div key={index} className="bg-white p-4 ">
//               <h3 className="text-xl font-semibold">{item}</h3>
//               <p className="text-gray-700 mt-2">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 Quaerat, laborum?
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

'use client'
// export default Strengths_Scroll;
import React, { useState } from "react";
import {
  FaUserCheck,      // Client Centric Development
  FaProjectDiagram, // Agile Development
  FaUsersCog,       // A Dedicated Development Team
  FaHeadset,        // Smart Support
  FaDatabase,       // Data Backups
  FaShieldAlt,      // Data Protection
  FaCheckCircle,    // Quality Control
  FaChartLine       // Improvement
} from "react-icons/fa";


const dummyData = Array.from({ length: 30 }, (_, i) =>` ${i + 1}`);

function Strengths_Scroll({ scrollRef }) {
  const [strengths] = useState([
    {
      no :<FaUserCheck/>,
      title: "Client Centric Development",
      points:
        "We deliver the best web, mobile, and blockchain solutions to clients as needed."
      ,
      logo: "images/healthcare.png",
    },
    {
      no :<FaProjectDiagram/>,
      title: "Agile Development",
      points: "We follow an agile development process that helps us deliver the project with tangible products of the highest quality.",
      logo: "images/finance.png",
    },
    {
      no :<FaUsersCog/>,
      title: "A Dedicated Development Team ",
      points: "We provide a dedicated and profitable team for all our projects that not only guarantee quality but also provide excellent support and satisfaction to our valued clients. ",
      logo: "images/retail.png",
    },
    {
      no :<FaHeadset/>,
      title: "Smart Support",
      points: "We are always here to assist our clients in any way possible at every stage of the project. Our technical team works hard to ensure the final product meets customers' expectations.",
      logo: "images/education.png",
    },
    {
      no :<FaDatabase/>,
      title: "Data Backups",
      points: "Regular backups helped us survive the most extreme conditions. We carefully keep backup copies of client projects to deal with unfortunate situations.",
      logo: "images/travel.png",
    },
    {
      no :<FaShieldAlt/>,
      title: "Data Protection",
      points: "By signing a NDA, our company guarantees maximum security of all your personal data.",
      logo: "images/logistics.png",
    },
    {
      no :<FaCheckCircle/>,
      title: "Quality Control",
      points: "We believe in providing high-quality products to our clients, and we guarantee all specifications of their projects at the most competitive price in the industry.",
      logo: "images/entertainment.png",
    },
    {
      no :<FaChartLine/>,
      title: "Improvement",
      points: "We believe in providing high-quality products to our clients, and we guarantee all specifications of their projects at the most competitive price in the industry.",
      logo: "images/realestate.png",
    },
 
  ]);

  return (
    <div ref={scrollRef} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 sm:px-8 md:px-16 lg:px-28">
        {/* Sidebar */}
        <div className="col-span-1 sticky top-8 bg-white md--[500px] lg:h-[40rem] pb-4 flex flex-col items-center md:items-start">
          <div className="lg:ml[50px] mt-[73px] text-3xl md:text-4xl lg:text-[50px] flex gap-[10px]">
            <p className="text-black">Our</p>
            <p className="text-[#28AFDF] font-bold">Strengths</p>
          </div>
          <p className="mt-[30px] font-light text-sm md:text-lg lg:text-[20px] md:ml[50px] lg:w[475px] text-center md:text-start">
            Explore our recent projects showcasing our expertise across different industries and
            technologies
          </p>
          <div className="rounded-xl py-16 lg:pr-6 hidden md:block">
           <img src="/images/blog1.png" className="rounded-lg" />
          </div>
         
          {/* Optionally list titles for quick navigation */}
          {/* <ul className="mt-6 space-y-2 hidden md:block">
            {strengths.map((str, idx) => (
              <li key={idx} className="text-gray-600 hover:text-[#28AFDF] cursor-pointer">
                {str.title}
              </li>
            ))}
          </ul> */}
        </div>

        {/* Content */}
        <div className="md:mr-[63px] mt-[73px] space-y-6 mb-24">
          {strengths.map((str, index) => (
            <div key={index} className="bg-white p-4 rounded-lg lg:shado">
              <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:justify-start gap-4 text-primary ">
                {/* <img src={str.logo} alt={str.title} className="w-12 h-12" /> */}
                <h1 className="text-2xl font-semibold">{str.no}</h1>
                <h3 className="text-xl font-semibold text-center md:text-start">{str.title}</h3>
              </div>
              <p className="text-gray-700 mt-2 text-center md:text-start">
                {str.points}
              </p>
              {/* <ul className="mt-4 list-disc list-inside space-y-1">
                {Object.values(str.points).map((pt, idx) => (
                  <li key={idx} className="text-gray-700">
                    {pt}
                  </li>
                ))}
              </ul> */}
            </div>
          ))}

          {/* Dummy placeholder items */}
          {/* {dummyData.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Placeholder {item}</h3>
              <p className="text-gray-700 mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, laborum?
              </p>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Strengths_Scroll;








































