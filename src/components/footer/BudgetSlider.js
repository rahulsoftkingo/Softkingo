import React, { useState } from "react";

const BudgetSlider = () => {
  const [budget, setBudget] = useState(0);

  return (
    <div className="flex flex-col items-start w-full">
      <div className=" z-0 bg-white relative bottom-3 mb-2">
        <span className=" w-auto px-1 flex items-center justify-center">
          <label className="font-lato text-base text-gray-600 ">Project Budget : </label>
          <span style={{ color: "#28AFDF" }} className=" ">
            ${budget}
          </span>
        </span>
      </div>
      <div className="relative w-full bottom-4 px-3 ">
        <input
          type="range"
          min="0"
          max="100000"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className=" w-full h-1 bg-sky-100 rounded-lg appearance-none cursor-pointer 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:bg-primary 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:transition-none"
          style={{
            
            background: `linear-gradient(to right, #28AFDF ${
              (budget / 100000) * 100
            }%, #dbeafe ${(budget / 100000) * 100}%)`,
          }}
        />
      </div>
    </div>
  );
};

export default BudgetSlider;
