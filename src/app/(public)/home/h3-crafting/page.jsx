'use client';

import PopupQuoteModal from '@/components/PopupQuoteModal';
import React, { useState } from 'react';
import { FaArrowRight } from "react-icons/fa"
const craftings = [
  {
    name: "6+",
    featurs:
      "6+ Years of Experience ",
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
   const [showModal, setShowModal] = useState(false);
  
  return (
    <div className="bg-gradient-to-br from-white via-sky-50 to-sky-200 text-black  lg:h- flex justify-center  py-10 sm:py-12 px-4 sm:px-6">
      {/* <div className='m-[60px] pt-[60px]  w-[1315px] max-h-[749px] '> */}
      <div className='max-w-7xl mx-auto '>
        <h2 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-[700px] mb-1 leading-normal pt-8 text-center lg:hidden text-sky-900">
          Crafting  
          Digital <span className='bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500 font-bold'>
            Experience
          </span>

          , <br/>At Scale 
        </h2>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12  items-center py-4 lg:py-8 ">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-[700px] mt-4 leading-normal pb-4 text-start hidden lg:block text-sky-900">
          Crafting  
          Digital <span className='bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500 font-bold'>
            Experience
          </span>

          , At Scale 
        </h2>
          <p className="text-gray-600 md:text-sky-800 mt- text-xs md:text-xl lg:text-[12px] max-w-3xl leading-normal text-center md:text-start ">
            From <b>450+ mobile apps</b> to 500+ web solutions, our certified experts bring innovation, precision, and impact trusted by millions, rated 5.0 on clutch.
          </p>
        </div>


          {craftings.map((craftings, i) => (
            <div key={i} className='borde border-primary rounded-2xl p-2 m- md:max-w-[25rem] md:h-[10rem] hover:shadow-lg md:flex md:flex-row justify-between bg-white flex-col-reverse hidden'>
              <div className='col-span-2 flex flex-col items-start text-center justify-end p-2 w-[15rem]'>
                <h1 className='font-bold text-3xl 2xl:text-4xl text-sky-800 mb-2 border- w-full text-start border-primary'>{craftings.name}</h1>
                <p className='text-gray-600 text-sm '>{craftings.featurs}</p>
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
                <h1 className='font-bold text-3xl 2xl:text-4xl text-sky-800 mb-2 text-start border-primary'>{craftings.name}</h1>
                <p className='text-gray-600 text-[0.6rem] '>{craftings.featurs}</p>
              </div>
              <div className='col-span-1 hidden'>
                <img src={craftings.image} className='h-full w-full fit'></img>
              </div>
            </div>
          ))}
          </div>
          <section>
            <div className='gap-4 flex  flex-col items-center text-center justify-evenly -sky-500 p-6 rounded-2xl shadow-md bg-gradient-to-br from-sky-50 via-sky-200 to-sky-100 lg:max-w-[25rem] h-[9rem] lg:h-[10rem]'>
              <h1 className=' text-xl 2xl:text-2xl text-sky-700 font-semibold'>
                Want To Start A Project?
              </h1>
 <button
                  onClick={() => setShowModal(true)}
                  className="px-4 md:px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300 cursor-pointer inline-flex items-center "
                  // className="px-4 md:px-6 py-2 rounded-full bg-white  text-sky-400 border border-sky-400 bg-gradient-to-rfrom-sky-600via-sky-500to-sky-400 hover:text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 hover:shadow-lg shadow-sky-900/30 transition-all duration-300 cursor-pointer inline-flex items-center"
                >
                  Get Estimation <FaArrowRight className="ml-2" />
                </button>
         
            </div>
          </section>

        </div>


      </div>
       <PopupQuoteModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default Crafting;
