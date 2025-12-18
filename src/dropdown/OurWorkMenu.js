import React, { useState } from 'react';
import { ResourceItem } from './InsightsMenu';
import "./DropdownIcon.css";
import Link from "next/link";

import { FaArrowRight } from "react-icons/fa"



const WorkData = [

];

const OurWorkMenu = () => {
  const [activeTab, setActiveTab] = useState('Mobileapptab');
  const [activeSubTab, setActiveSubTab] = useState(null);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  const handleTabChange = (title) => setActiveSubTab(title);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 mt-14'>

      <div className='absolute inset-0   container mx-auto px-4 smpx-8 mdpx-12 lgpx-16 2xlpx-28 '>
        <div
          className="relative bg-white max-w-[90rem] w-full h-[80vh] max-h-[50rem] 
               rounded-b-xl shadow-md overflow-hidden z-10"
          style={{
            // top: "100%",
            // left: "12%",
            // transform: "translate(-10%, -9%)",
            // position: "fixed",
            // boxShadow: "0 3px 22px 0.3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="w-full h-full flex">
            {/* Left Section - Takes more space */}
            <div className="flex-[1.5] bg-[#fcfcfc] space-y-3 text-left p-8 border-r w-1/3 ">
             
            </div>

            {/* Middle Section - Takes remaining space */}
            <div className="flex-[3] flex  flex-col justify-between h-full w-1/3  overflow-hidden">
              
            </div>

            {/* Right Section - Hidden on smaller screens */}
            <div className="hidden xl:block w-1/3 h-full bg_gradent_">
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurWorkMenu;



