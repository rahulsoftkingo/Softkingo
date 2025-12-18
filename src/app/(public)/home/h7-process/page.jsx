// "use client";
// import { useState } from "react";
// import "./process.css";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// import Lottie from "lottie-react";
// import arrowAnimation from "@/components/logo/wired-outline-221-arrow-10-hover-streach.json";
// function Process() {
//   // const [current, setCurrent] = useState("");
//     // current holds the id of hovered card, null means no hover
//   const [current, setCurrent] = useState(1);

//   const [process, setProcess] = useState([
//     {
//       id: 1,
//       title: "Discovery & Strategy",
//       description:
//         "We start by diving deep into your business needs and objectives. This phase includes comprehensive research, market analysis, and strategic planning to create a roadmap aligned with your goals.",
//       image:
//         "/images/black.jpg", // team meeting
//     },
//     {
//       id: 2,
//       title: "Design & Development",
//       description:
//         "Transforming ideas into practical designs and scalable, high-performance digital solutions.",
//       image:
//         "/images/black.jpg", // team coding
//     },
//     {
//       id: 3,
//       title: "Testing & Quality Assurance",
//       description:
//         "Ensuring every feature works flawlessly through rigorous testing and validation processes.",
//       image:
//         "/images/black.jpg", // testing/QA team
//     },
//     {
//       id: 4,
//       title: "Launch & Deployment",
//       description:
//         "Deploying the solution securely and efficiently, ensuring a smooth rollout with minimal downtime.",
//       image:
//         "/images/black.jpg", // tech setup
//     },
//     {
//       id: 5,
//       title: "Continuous Support & Optimization",
//       description:
//         "Providing ongoing support and enhancements to keep your solution fast, secure, and effective.",
//       image:
//         "/images/black.jpg", // support desk
//     },
//   ]);


  
//   return (
           
//     <div
//       className="h-full  bg-gradient-to-br from-white via-sky-100 to-sky-200  py-16"
//       // style={{
//       //   background: "#dbf1ff",
//       //   background:
//       //     "linear-gradient(174deg, rgba(219, 241, 255, 1) 0%, rgba(255, 255, 255, 1) 49%, rgba(255, 255, 255, 1) 90%, rgba(255, 255, 255, 1) 100%, rgba(255, 255, 255, 1) 100%, rgba(255, 255, 255, 1) 100%, rgba(230, 230, 230, 1) 100%)",
//       // }}
//     >
//     <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-28">
//       <div className="pt-[35px] text-3xl md:text-4xl lg:text-[50px] flex justify-center gap-1 ">
//         <p>Our </p>
//         <span> </span> <p className="text-[#28AFDF] font-bold"> Process</p>
//       </div>
//       <div className="mt-[30px] text-black flex flex-col justify-center mb-[41px] ">
//         <p className="text-xs md:text-lg lg:text-[20px] text-center ">
//           Explore our recent projects showcasing our expertise across different
//           industries and technologies
//         </p>{" "}
//         <p className="text-xs md:text-lg lg:text-[20px] text-center">technologies</p>{" "}
//       </div>
//       <div className="flex justify-center">
//         <div className="flex justify-between w-[1265px] h-[619px] bg-transparent">


          
//           {process.map((item, i) => {
//             // Determine if this card is active: hovered or default first
//             {/* const isActive = current === item.id || (current === null && item.id === 1); */}
//             const isActive = current === item.id;

            
//             return (
//               <div
//                 // key={i}
//                   key={item.id}
//                   onMouseEnter={() => setCurrent(item.id)}
//                   onMouseLeave={() => setCurrent(1)}
//                 // className="group h-[600px] -[155px] border-4 border-white cards overflow-x-hidden relative"
//                   className={
//                     `relative overflow-hidden border-4 border-white transition-all duration-500 flex ${
//                       isActive ? 'flex-[3]' : 'flex-[1]'
//                     }`
//                   }
//                 on
//               >
//                 {/* <div className={` absolute inset-0 hover:opacity-0 group-hover:opacity-0 z-10 flex justify-center
//                 ${
//                         isActive ? 'opacity-0' : 'opacity-100'
//                       }`
//                     }> */}
//                     <div 
//                     className={
//                       `absolute inset-0 flex items-center justify-center transition-opacity duration-500 z-10 ${
//                         isActive ? 'opacity-0' : 'opacity-100'
//                       }`
//                     }
//                   >
//                     {/* // Before (hover-based)
// className="absolute ... opacity-0 ... group-hover:opacity-100 ... group-hover:translate-x-0"

// // After (state-based)
// className={`absolute ... ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"}`} */}
//                   <div className=" flex gap-1 text-[#28AFDF] justify-center">
//                     <Lottie
//                       animationData={arrowAnimation}
//                       loop={true}
//                       style={{
//                         width: 100,
//                         height: 100,
//                         filter: "brightness(0) invert(1)",
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <p className="-rotate-90 font-bold text-white text-[20px] absolute left-1/2 top-1/2 whitespace-nowrap -translate-x-1/2 -translate-y-1/2  group-hover:translate-x-full group-hover:opacity-0 transform transition-all duration-700 ease-in-out z-10">
//                     {item.title}{" "}
//                     <p className="lg:opacity-0 md:opacity-100">md size</p>{" "}
//                   </p>
//                 </div>
//                 <div className="absolute flex z-10 flex-col bottom-0 left-0  opacity-0  group-hover:opacity-100 p-5 transform transition-all duration-500 ease-in-out text-white -translate-x-[100%] group-hover:translate-x-0 whitespace-normal w-[400px]">
//                   <p className="font-semibold   text-[30px]">{item.title}</p>

//                   <p className=" text-[20px] font-light mt-3 ">
//                     {item.description}
//                   </p>
//                 </div>
//                 <img src={item.image} alt="" className="brightness-50 z-0" />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default Process;



// isme first card ko chhor ke baki jitne card h wo wese hi rahenge  ui sahi h ui ko mat chherna bass mai chata hu ki first card open rahe jub secon ya third ya baki koi card ko hover kiya jaye tub first card close ho or ji card pe hover kiya ja raha h wo open ho nahi to defoult me first card ko open rakho 




// "use client";
// import { useState } from "react";
// import "./process.css";
// import Lottie from "lottie-react";
// import arrowAnimation from "@/components/logo/wired-outline-221-arrow-10-hover-streach.json";

// function Process() {
//   // Track active card; default to 1
//   const [current, setCurrent] = useState(1);

//   const process = [
//     { id: 1, title: "Discovery & Strategy", description: "We start by diving deep into your business needs and objectives. This phase includes comprehensive research, market analysis, and strategic planning to create a roadmap aligned with your goals.", image: "/images/black.jpg" },
//     { id: 2, title: "Design & Development", description: "Transforming ideas into practical designs and scalable, high-performance digital solutions.", image: "/images/black.jpg" },
//     { id: 3, title: "Testing & Quality Assurance", description: "Ensuring every feature works flawlessly through rigorous testing and validation processes.", image: "/images/black.jpg" },
//     { id: 4, title: "Launch & Deployment", description: "Deploying the solution securely and efficiently, ensuring a smooth rollout with minimal downtime.", image: "/images/black.jpg" },
//     { id: 5, title: "Continuous Support & Optimization", description: "Providing ongoing support and enhancements to keep your solution fast, secure, and effective.", image: "/images/black.jpg" }
//   ];

//   return (
//     <div className="h-full bg-gradient-to-br from-white via-sky-100 to-sky-200 py-16">
//       <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-28">
//         <div className="pt-[35px] text-3xl md:text-4xl lg:text-[50px] flex justify-center gap-1">
//           <p>Our</p>
//           <p className="text-[#28AFDF] font-bold">Process</p>
//         </div>
//         <div className="mt-[30px] text-center text-black mb-[41px]">
//           <p className="text-xs md:text-lg lg:text-[20px]">
//             Explore our recent projects showcasing our expertise across different industries and technologies
//           </p>
//         </div>
//         <div className="flex  justify-center">
//           <div className="flex w-full max-w-[1265px] h-[619px] space-x-4 transition-all duration-500">
//             {process.map((item) => {
//               const isActive = current === item.id;
//               return (
//                 <div
//                   key={item.id}
//                   onMouseEnter={() => setCurrent(item.id)}
//                   onMouseLeave={() => setCurrent(1)}
//                   className={
//                     `relative overflow-hidden border-4 border-white transition-all duration-500 flex ${
//                       isActive ? 'flex-[3]' : 'flex-[1]'
//                     }`
//                   }
//                 >
//                   {/* Arrow overlay: show only if NOT active */}
//                   <div
//                     className={
//                       `absolute inset-0 flex items-start justify-center transition-opacity duration-500 z-10 ${
//                         isActive ? 'opacity-0' : 'opacity-100'
//                       }`
//                     }
//                   >
//                     <Lottie
//                       animationData={arrowAnimation}
//                       loop
//                       style={{ width: 100, height: 100, filter: 'brightness(0) invert(1)' }}
//                     />
//                   </div>

//                   {/* Rotated title: hide when active */}
//                   <p
//                     className={
//                       `-rotate-90 font-bold text-white text-[20px] absolute left-1/2 top-1/2 transform transition-all duration-700 ease-in-out z-10 whitespace-nowrap ${
//                         isActive ? 'opacity-0 translate-x-full' : '-translate-x-1/2 -translate-y-1/2 opacity-100'
//                       }`
//                     }
//                   >
//                     {item.title}
//                   </p>

//                   {/* Detail panel: show when active */}
//                   <div
//                     className={
//                       `absolute bottom-0 left-0 p-5 transform transition-all duration-500 ease-in-out text-white whitespace-normal z-10 ${
//                         isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
//                       }`
//                     }
//                     style={{ width: '400px' }}
//                   >
//                     <p className="font-semibold text-[30px]">{item.title}</p>
//                     <p className="text-[20px] font-light mt-3">{item.description}</p>
//                   </div>

//                   {/* Background image */}
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="absolute inset-0 w-full h-full object-cover brightness-50 z-0"
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Process;





"use client";
import { useState, useEffect } from "react";
import "./process.css";
import Lottie from "lottie-react";
import arrowAnimation from "@/components/logo/wired-outline-221-arrow-10-hover-streach.json";
import { FaArrowRight } from "react-icons/fa";

function Process() {
  const [current, setCurrent] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const process = [
    { id: 1, title: "Discovery & Strategy", description: "We start by diving deep into your business needs and objectives. This phase includes comprehensive research, market analysis, and strategic planning to create a roadmap aligned with your goals.", image: "/images/process/Rectangle 10.png" },
    { id: 2, title: "Design & Development", description: "Transforming ideas into practical designs and scalable, high-performance digital solutions.", image: "/images/black.jpg" },
    { id: 3, title: "Testing & Quality Assurance", description: "Ensuring every feature works flawlessly through rigorous testing and validation processes.", image: "/images/black.jpg" },
    { id: 4, title: "Launch & Deployment", description: "Deploying the solution securely and efficiently, ensuring a smooth rollout with minimal downtime.", image: "/images/black.jpg" },
    { id: 5, title: "Continuous Support & Optimization", description: "Providing ongoing support and enhancements to keep your solution fast, secure, and effective.", image: "/images/black.jpg" }
  ];

  const handleCardInteraction = (id) => {
    if (isMobile) {
      // Toggle on mobile: close if already open, else open
      setCurrent(current === id ? 1 : id);
    } else {
      // Hover effect on desktop
      setCurrent(id);
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-white via-sky-100 to-sky-200 py-16">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-28">
        <div className="pt-[35px] text-3xl md:text-4xl lg:text-[50px] flex justify-center gap-1">
          <p>Our</p>
          <p className="text-[#28AFDF] font-bold">Process</p>
        </div>
        <div className="mt-[30px] text-center text-black mb-[41px]">
          <p className="text-xs md:text-lg lg:text-[20px]">
            Explore our recent projects showcasing our expertise across different industries and technologies
          </p>
        </div>
        
        {/* Desktop Layout (Row) */}
        <div className="hidden md:flex justify-center">
          <div className="flex w-full max-w-[1265px] h-[619px] space-x-1 transition-all duration-500">
            {process.map((item) => {
              const isActive = current === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setCurrent(item.id)}
                  onMouseLeave={() => setCurrent(1)}
                  className={`relative overflow-hidden border-4border-white transition-all duration-500 flex ${
                    isActive ? 'flex-[3]' : 'flex-[1]'
                  }`}
                >
                  {/* Arrow overlay: show only if NOT active */}
                  <div
                    className={`absolute inset-0 flex items-start justify-center transition-opacity duration-500 z-10 ${
                      isActive ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <Lottie
                      animationData={arrowAnimation}
                      loop
                      style={{ width: 100, height: 100, filter: 'brightness(0) invert(1)' }}
                    />
                  </div>

                  {/* Rotated title: hide when active */}
                  <p
                    className={`-rotate-90 font-bold text-white text-[20px] absolute left-1/2 top-1/2 transform transition-all duration-700 ease-in-out z-10 whitespace-nowrap ${
                      isActive ? 'opacity-0 translate-x-full' : '-translate-x-1/2 -translate-y-1/2 opacity-100'
                    }`}
                  >
                    {item.title}
                  </p>

                  {/* Detail panel: show when active */}
                  {/* <div
                    className={`absolute bottom-4 left-4 p- transform transition-all duration-500 ease-in-out text-white whitespace-normal z-10   ${
                      isActive ? 'opacity-100 translate-x-0  ' : 'opacity-0 -translate-x-full'
                    }`}
                    style={{ width: '400px' }}
                  >
                    <p className="font-semibold text-[30px]">{item.title}</p>
                    <p className="text-[16px] font-light mt-3">{item.description}</p>
                    <span className="flex flex-row items-center gap-2 mt-4">view more <FaArrowRight/></span>
                  </div> */}
                  <div
  className={`
    absolute bottom-4 left-4 p-6
    transform transition-all duration-500 ease-in-out
    text-white whitespace-normal z-10
    rounded2xl

    bg-white/20 backdrop-blur-md
    borderborder-white/30
group inline-block
    ${isActive 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-full'
    }
  `}
  style={{ width: '400px' }}
>
  <p className=" font-semibold text-2xl
      transform origin-left
      transition-transform duration-500 ease-out
      group-hover:scale-x-110">{item.title}</p>
  <p className="text-[16px] font-light mt-3">{item.description}</p>
  {/* <span className="flex flex-row items-center gap-2 mt-4">
    view more <FaArrowRight />
  </span> */}
</div>


                  {/* Background image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover brightness-50 z-0"
                  />
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Mobile Layout (Column) */}
        <div className="md:hidden flex flex-col items-center space-y-2">
          {process.map((item) => {
            const isActive = current === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleCardInteraction(item.id)}
                className={`relative overflow-hidden border-4border-white transition-all duration-500 w-full ${
                  isActive ? 'h-[300px]' : 'h-[80px]'
                }`}
              >
                {/* Arrow overlay: show only if NOT active */}
                <div
                  className={`absolute inset-0 flex items-start justify-end transition-opacity duration-500 z-10 ${
                    isActive ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <Lottie
                    animationData={arrowAnimation}
                    loop
                    style={{ 
                      width: 60, 
                      height: 60, 
                      filter: 'brightness(0) invert(1)',
                      transform: 'rotate(90deg)' // Rotate arrow for vertical layout
                    }}
                  />
                </div>

                {/* Title always visible */}
                <p className="font-bold text-white text-[18px] absolute top-4 left-4 z-10">
                  {item.title}
                </p>

                {/* Detail panel: show when active */}
                <div
                  className={`   absolute bottom-4 left-4 right-4 p-4

    rounded2xl
    bg-white/20 backdrop-blur-md
    borderborder-white/30 w- transform transition-all duration-500 ease-in-out text-white whitespace-normal z-10 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
                  }`}
                >
                  <p className="text-[12px] font-light mt-3">{item.description}</p>
                    <span className="flex flex-row items-center gap-2 mt-4 text-xs">
    view more <FaArrowRight />
  </span>
                </div>

                {/* Background image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover brightness-50 z-0"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Process;





























// "use client";
// import { useState, useEffect } from "react";
// import "./process.css";
// import Lottie from "lottie-react";
// import arrowAnimation from "@/components/logo/wired-outline-221-arrow-10-hover-streach.json";

// function Process() {
//   const [current, setCurrent] = useState(1);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 1024);
//     };
    
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const process = [
//     { id: 1, title: "Discovery & Strategy", description: "We start by diving deep into your business needs and objectives. This phase includes comprehensive research, market analysis, and strategic planning to create a roadmap aligned with your goals.", image: "/images/black.jpg" },
//     { id: 2, title: "Design & Development", description: "Transforming ideas into practical designs and scalable, high-performance digital solutions.", image: "/images/black.jpg" },
//     { id: 3, title: "Testing & Quality Assurance", description: "Ensuring every feature works flawlessly through rigorous testing and validation processes.", image: "/images/black.jpg" },
//     { id: 4, title: "Launch & Deployment", description: "Deploying the solution securely and efficiently, ensuring a smooth rollout with minimal downtime.", image: "/images/black.jpg" },
//     { id: 5, title: "Continuous Support & Optimization", description: "Providing ongoing support and enhancements to keep your solution fast, secure, and effective.", image: "/images/black.jpg" }
//   ];

//   return (
//     <div className="h-full bg-gradient-to-br from-white via-sky-100 to-sky-200 py-8 md:py-16">
//       <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-28">
//         <div className="pt-6 md:pt-[35px] text-2xl md:text-4xl lg:text-[50px] flex justify-center gap-1">
//           <p>Our</p>
//           <p className="text-[#28AFDF] font-bold">Process</p>
//         </div>
//         <div className="mt-4 md:mt-[30px] text-center text-black mb-6 md:mb-[41px]">
//           <p className="text-sm md:text-lg lg:text-[20px]">
//             Explore our recent projects showcasing our expertise across different industries and technologies
//           </p>
//         </div>
        
//         {/* Mobile Accordion View */}
//         {isMobile ? (
//           <div className="w-full max-w-3xl mx-auto">
//             {process.map((item) => (
//               <div 
//                 key={item.id}
//                 className="mb-4 rounded-lg overflow-hidden shadow-md"
//               >
//                 <div 
//                   className="bg-gray-800 p-4 flex justify-between items-center cursor-pointer"
//                   onClick={() => setCurrent(current === item.id ? 0 : item.id)}
//                 >
//                   <h3 className="text-white font-bold text-lg">{item.title}</h3>
//                   <div className="text-white transform transition-transform">
//                     {current === item.id ? (
//                       <span className="text-2xl">−</span>
//                     ) : (
//                       <span className="text-2xl">+</span>
//                     )}
//                   </div>
//                 </div>
                
//                 {current === item.id && (
//                   <div className="bg-gray-700 p-4">
//                     <p className="text-white text-base">{item.description}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           /* Desktop Horizontal View */
//           <div className="flex justify-center">
//             <div className="flex w-full max-w-[1265px] h-[619px] space-x-4 transition-all duration-500">
//               {process.map((item) => {
//                 const isActive = current === item.id;
//                 return (
//                   <div
//                     key={item.id}
//                     onMouseEnter={() => setCurrent(item.id)}
//                     onMouseLeave={() => setCurrent(1)}
//                     className={
//                       `relative overflow-hidden border-4 border-white transition-all duration-500 flex ${
//                         isActive ? 'flex-[3]' : 'flex-[1]'
//                       }`
//                     }
//                   >
//                     <div
//                       className={
//                         `absolute inset-0 flex items-start justify-center transition-opacity duration-500 z-10 ${
//                           isActive ? 'opacity-0' : 'opacity-100'
//                         }`
//                       }
//                     >
//                       <Lottie
//                         animationData={arrowAnimation}
//                         loop
//                         style={{ width: 100, height: 100, filter: 'brightness(0) invert(1)' }}
//                       />
//                     </div>

//                     <p
//                       className={
//                         `-rotate-90 font-bold text-white text-[20px] absolute left-1/2 top-1/2 transform transition-all duration-700 ease-in-out z-10 whitespace-nowrap ${
//                           isActive ? 'opacity-0 translate-x-full' : '-translate-x-1/2 -translate-y-1/2 opacity-100'
//                         }`
//                       }
//                     >
//                       {item.title}
//                     </p>

//                     <div
//                       className={
//                         `absolute bottom-0 left-0 p-5 transform transition-all duration-500 ease-in-out text-white whitespace-normal z-10 ${
//                           isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
//                         }`
//                       }
//                       style={{ width: '400px' }}
//                     >
//                       <p className="font-semibold text-[30px]">{item.title}</p>
//                       <p className="text-[20px] font-light mt-3">{item.description}</p>
//                     </div>

//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="absolute inset-0 w-full h-full object-cover brightness-50 z-0"
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Process;

// nami@gmail.com
// nami@12345





