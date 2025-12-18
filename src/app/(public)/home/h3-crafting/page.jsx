import React from 'react';
import { FaArrowRight } from "react-icons/fa"
const craftings = [
  {
    name: "5+",
    featurs:
      "5+ Years of Experience ",
    image: "/images/crafting/Rectangle 94.png",
    postion: "CEO, Tech Innovations",
  },
  {
    name: "5.0+",
    featurs:
      "Rating on Clutch ",
    image: "/images/crafting/Rectangle 94 (1).png",
    postion: "CEO, Tech Innovations",
  },
  {
    name: "450+",
    featurs:
      "450+ Mobile Apps",
    image: "/images/crafting/Rectangle 94 (2).png",
    postion: "CEO, Tech Innovations",
  },
  {
    name: "50+",
    featurs:
      "Designers & Developers",
    image: "/images/crafting/Rectangle 94 (3).png",
    postion: "CEO, Tech Innovations",
  },
]

function Crafting() {
  return (
    <div className="bg-gradient-to-br from-white via-sky-100 to-sky-200 text-black  lg:h- flex justify-center ">
      {/* <div className='m-[60px] pt-[60px]  w-[1315px] max-h-[749px] '> */}
      <div className='py-16 container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 2xl:px-28 '>
        <h2 className="text-3xl md:text-3xl lg:text-4xl 2xl:text-5xl font-[700px] mb-18 leading-normal pt-8 text-center lg:hidden">
          Crafting  
          Digital <span className='text-primary font-bold'>
            Experience
          </span>

          {/* , <br/> <br/>At Scale  */}
        </h2>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12  items-center py-4 lg:py-8 ">
        <div>
          <h2 className="text-3xl md:text-3xl lg:text-3xl 2xl:text-4xl font-[700px] mb-18 leading-normal pb-4 text-start hidden lg:block">
          Crafting  
          Digital <span className='text-primary font-bold'>
            Experience
          </span>

          , At Scale 
        </h2>
          <p className="text-gray-700 mt- text-xs md:text-md lg:text-[15px] max-w-3xl leading-normal text-center md:text-start ">
            From <b>450+ mobile apps</b> to 500+ web solutions, our certified experts bring innovation, precision, and impact trusted by millions, rated 5.0 on clutch.
          </p>
        </div>


          {craftings.map((craftings, i) => (
            <div key={i} className='borde border-primary rounded-2xl p-2 m- md:max-w-[25rem] md:h-[10rem] hover:shadow-lg md:flex md:flex-row justify-between bg-white flex-col-reverse hidden'>
              <div className='col-span-2 flex flex-col items-start text-center justify-end p-2 w-[15rem]'>
                <h1 className='font-bold text-3xl 2xl:text-4xl text-primary mb-2 border- w-full text-start border-primary'>{craftings.name}</h1>
                <p className='text-primary text-sm '>{craftings.featurs}</p>
              </div>
              <div className='col-span-1 '>
                <img src={craftings.image} className='h-full w-full fit'></img>
              </div>
            </div>
          ))}
          <div className='grid grid-cols-2 md:hidden gap-6'>
            {craftings.map((craftings, i) => (
            <div key={i} className='borde border-primary rounded-2xl p-2 md:h-[8rem] hover:shadow-lg md:flex md:flex-row justify-between bg-white flex-col-reverse '>
              <div className='col-span-2 flex flex-col items-start text-center justify-end p-2 '>
                <h1 className='font-bold text-3xl 2xl:text-4xl text-primary mb-2 text-start border-primary'>{craftings.name}</h1>
                <p className='text-primary text-[0.6rem] '>{craftings.featurs}</p>
              </div>
              <div className='col-span-1 hidden'>
                <img src={craftings.image} className='h-full w-full fit'></img>
              </div>
            </div>
          ))}
          </div>
          <section>
            <div className='gap-4 flex  flex-col items-center text-center justify-evenly -sky-500 p-6 rounded-2xl shadow- bg-gradient-to-r from-sky-300 via-sky-200 to-sky-400 lg:max-w-[25rem] h-[8] lg:h-[10rem]'>
              <h1 className=' text-xl 2xl:text-2xl text-white font-semibold'>
                Want To Start A Project?
              </h1>

              <button className=" px-6 py-3 md:py-2  rounded-full bg-white -gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-primary font-medium hover:bg-gradient-to-l hover:from-sky-500  hover:to-sky-400 transform hover:-translate-y-1 hover:text-white shadowlg shadow-sky-900/30 transition-all duration-300 flex items-center justify-center w-[fit-content]"><div className="font-semibold text-sm lg:text-md mr-2">Get Estimation </div><FaArrowRight /></button>
            </div>
          </section>

        </div>








        {/* <div className="flex justify-between text-center lg:mt-[128px] flex-col lg:flex-row">
        <div className='flex justify-center flex-col text-center  col-span-1 w-[324px]'>
          <p className="text-[#28AFDF] text-[60px] font-semibold underline underline-offset-[10px] decoration-[3px]  ">5+</p>
          <p className="mt-4  w-[324px] p-0">
            We have <span className="text-[#28AFDF] font-semibold ">5+ Years of Experience</span><br />
            in Web & App Development
          </p>
        </div>

        <div className='flex justify-center flex-col text-center col-span-1 w-[324px]'>
          <p className="text-[#28AFDF] text-[60px] flex justify-center w-[324]px font-semibold underline underline-offset-[10px] decoration-[3px] col-span-1">450+</p>
          <p className="mt-4 w-[324px]">
            We have Already <span className="text-[#28AFDF] font-semibold inline-block  ">450+ Mobile Apps</span> Developed, and Design
          </p>
        </div>

        <div className='flex justify-center flex-col text-center  col-span-1 w-[324px]' >
          < p className="text-[#28AFDF] text-[60px] font-semibold underline underline-offset-[10px] decoration-[3px] col-span-1">50+</p>
          <p className="mt-4">
            Certified <span className="text-[#28AFDF] font-semibold">Designer, and Developers</span>, who believe in better results
          </p>
        </div>

       
      </div>
      <div className='flex justify-between text-center lg:mt-[128px] flex-col lg:flex-row'>
         <div  className='flex justify-center flex-col text-center  col-span-1 w-[324px]'>
          <p className="text-[#28AFDF] text-[60px] font-semibold underline underline-offset-[10px] decoration-[3px]">500+</p>
          <p className="mt-4">
            Web Development and Design<br />
            <span className="text-[#28AFDF] font-semibold">Already Delivered</span>
          </p>
        </div>

        <div  className='flex justify-center flex-col text-center  col-span-1 w-[324px]' >
          <p className="text-[#28AFDF] text-[60px] font-semibold underline underline-offset-[10px] decoration-[3px]">10+</p>
          <p className="mt-4">
            <span className="text-[#28AFDF] font-semibold">Million App Downloads</span> on Play Store<br />
            and App Store (iOS + Android)
          </p>
        </div>

        <div  className='flex justify-center flex-col text-center  col-span-1 w-[324px]'>
          <p className="text-[#28AFDF] text-[60px] font-semibold underline underline-offset-[10px] decoration-[3px] flex justify-center items-center gap-2">
            5.0 <p className='text-yellow-600'>★</p>
          </p>
          <p className="mt-4">
            Rating On <span className="text-[#28AFDF] font-semibold">Clutch</span> is 5.0,<br />
            Out of Top 10 Companies in India
          </p>
        </div>
      </div> */}
      </div>
    </div>
  );
}

export default Crafting;
