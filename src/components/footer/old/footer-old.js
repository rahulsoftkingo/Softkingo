"use client";
import React, { useEffect, useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { TbBeta } from "react-icons/tb";
import { FaPaperclip } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./InquirySection.css";
import BudgetSlider from "../BudgetSlider/BudgetSlider";
import ReactCountryFlag from "react-country-flag";
import { GoMail } from "react-icons/go";
import { ImHangouts } from "react-icons/im";
import { TfiSkype } from "react-icons/tfi";
import Image from "next/image";

import Form from "./footer-form";

const InquirySection = () => {
  const [phone, setPhone] = useState("");
  const [fileName, setFileName] = useState("");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState("false");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "");
  };

  useEffect(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setNum1(a);
    setNum2(b);
  }, []);



  const checkAnswer = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setUserAnswer(value);
   if (Number(value) === num1 + num2) {
    setIsCorrect(true);
  } else {
    setIsCorrect(false);
    
  }
  };

  return (
    <div className="w-full z-10">
     

<Form/>
      <footer>
        <div>
          <div className=" footer_main_div  flex items-center justify-center">
            <footer>
              <div className="  flex  items-center justify-center w-full  mb-20 md:mb-0 ">
                <div className="row footer_tag1 flex flex-wrap  w-[90%]  gap-10   ">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                  <div className="col-span-2 col-lg-4 col-md-12 position-relative h-[280px]  ">
                    <div className=" flex gap-16  lg:gap-32 ">
                      <div className="mt-10">
                        <img
                          src="/images/softkingo-logo.png"
                          alt="fterlogo"
                          width="229"
                          height="49"
                        />
                      </div>
                      <div className="image_greatplace">
                        <img
                          src="https://cdn-server.hiddenbrains.com/_next/static/media/footer-great-placetowork-logo.1fe4acf7.svg?ver-20250228192723"
                          alt="Greateplace To Work"
                          width="65"
                          height="111"
                        />
                      </div>
                    </div>

                    <div className="footer_tag   mt-[23px] ">
                      <p className=" w- text-[16px] leading-[26px] ">
                        Incepted in 2020, Softkingo has grown at an
                        exponential pace with clients across 107 countries. We
                        offer a complete range of IT services and industry
                        focused solutions to more than 39+ domains worldwide.
                      </p>
                    </div>
                  </div>

                  <div>
        <h5 class="text-xl font-semibold my-6 text-gray-600">Contact Us</h5>
        <ul class="space-y-4 text-sm">
          <li class="flex items-start">
            <i class="fas fa-envelope mt-1 mr- text-lg text-gray-500"></i>
            <div>
              <p class="font-medium mb-1 text-lg text-gray-500">Email</p>
              <a href="mailto:sales@softkingo.com" class="hover:underline">sales@softkingo.com</a>
            </div>
          </li>
          <li class="flex items-start">
            <i class="fas fa-phone-alt mt-1 mr- text-lg text-gray-500"></i>
            <div>
              <p class="font-medium mb-1 text-lg text-gray-500">Phone</p>
              <a href="tel:+917428750870" class="hover:underline ">+91 74287 50870</a>
            </div>
          </li>
          <li class="flex items-start">
            <i class="fas fa-map-marker-alt mt-1 mr- text-lg text-gray-500"></i>
            <div>
              <p class="font-medium mb-1 text-lg text-gray-500">Address</p>
              <span class="text-sm">MON–FRI 10 AM–7 PM H61, Block H, Sector 63, Noida, Uttar Pradesh 201301, India</span>
            </div>
          </li>
        </ul>
                   </div>

                
                  <div className="col-span-2 offering_div  grid grid-cols-5 lg:grid-cols-2  md:justify-center  md:gap-16  mt[25px]">
                    {/* # OFFERINGS # */}
                    <div className="col-span-3 lg:col-span-1">
                      {/* <div > */}

                      <div>
                        <h1 className="text-xl font-semibold my-6 text-gray-600">OFFERINGS</h1>
                      </div>
                      <div className=" offering_ul">
                        <ul className=" text-[16px] leading-[30px] ">
                          {[
                            "Software Development",
                            "Mobile App Development",
                            "Web Application Development",
                            "Front End Development",
                            
                            "Remote Teams",
                            "Product Prototyping",
                            "Design Engineering",
                            "Data Engineering",
                            "Cloud & Infrastructure",
                           
                          ].map((offering, index) => (
                            <li key={index}>
                              <a
                                href={`/${offering
                                  .toLowerCase()
                                  .replace(/ /g, "-")}.html`}
                              >
                                {offering}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className=" company_col col-lg-2   h-[280px]  ">
                      <div>
                        <h1 className="text-xl font-semibold my-6 text-gray-600 ">COMPANY</h1>
                      </div>
                      <ul className="leading-8">
                        {[
                          "About Us",
                          "Our Team",
                          "Alliances",
                          "Celebrations",
                          "Awards",
                          "CSR",
                          "Career",
                        ].map((company, index) => (
                          <li key={index}>
                            <a
                              href={`/${company
                                .toLowerCase()
                                .replace(/ /g, "-")}.html`}
                            >
                              {company}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-lg-3 col-md-5 hidden ">
                      <div className="global_location ml-10">
                        <h1 className=" text-[20px] mb-10">GLOBAL LOCATION</h1>
                        <div className=" country-list flex  text-[16px]  leading-[16px]">
                          <button className="hover:bg-blue-500 -ml-3 text-left hover:text-white px-3  rounded-sm ">
                            USA
                          </button>
                          <button className="hover:bg-blue-500 hover:text-white px-3 rounded-sm  ">
                            UAE
                          </button>
                          <button className="hover:bg-blue-500 hover:text-white px-3  rounded-sm ">
                            MALAYSIA
                          </button>
                          <button className="hover:bg-blue-500 hover:text-white px-3  rounded-sm ">
                            AFRICA
                          </button>
                        </div>
                        <div className="country-list">
                          <button className="hover:bg-blue-500 -ml-3 hover:text-white px-3   rounded-sm ">
                            INDIA
                          </button>
                          <button className="hover:bg-blue-500 hover:text-white px-3 rounded-sm ">
                            UK
                          </button>
                          <button className="hover:bg-blue-500 hover:text-white px-3  rounded-sm ">
                            NORWAY
                          </button>
                        </div>

                        <div className="mt-4">
                          <hr></hr>
                        </div>
                        <div className="mt-4">
                          <h1 className="font-semibold">California</h1>
                        </div>
                        <div className=" country-list">
                          <p>17875 Von Karman Avenue Irvine, CA</p>
                          <p>92614, United States</p>
                        </div>
                        <div className="mt-4">
                          <h1 className="font-semibold">Illinois</h1>
                        </div>
                        <div className="country-list1 ">
                          <p>1635 W, Wise Road, Suite</p>
                          <p>10T, Schaumburg, IL 60193,</p>
                          <p>USA</p>
                        </div>
                      </div>

                      {/* Add global locations tab content here */}
                    </div>
                  </div>
</div>
                  {/* second last footer */}
                  <div className=" rounded-lg footer_image bg-sky-600 
                  grid grid-cols-2 md:flex md:flex-wrap gap-4
                    md:gap-10 items-center justify-between w-full md:px-10 p-4 ">
                    <div className=" flex items-center justify- ">
                      {/* <Image
                        src="/images/Logo 1.png"
                        alt="Logo"
                        width={80}
                        height={80}
                      /> */}
                      <h1 className="text-sky-500 bg-white font-bold rounded- p-1 leading-none text-xs pr-2">Grat <br/> Place <br/> To <br/> Work <br/> Softkingo</h1>
                    </div>
                    {/* <div className="flex items-center justify-center">
                      <Image
                        src="/images/Logo-2.png"
                        alt="Logo"
                        width={80}
                        height={80}
                        className="w-28"
                      />
                    </div> */}
                    <div className=" flex items-center justify-center">
                      <Image
                        src="/images/Logo-3.png"
                        alt="Logo"
                        width={80}
                        height={80}
                        className="w-28"
                      />
                    </div>

                    <div>
                      <Image
                        src="/images/Logo-4.png"
                        alt="Logo"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div>
                      <Image
                        src="/images/Logo 5.png"
                        alt="Logo"
                        width={80}
                        height={80}
                        className="w-20"
                      />
                    </div>
                    <div>
                      <Image
                        src="/images/Logo 6.png"
                        alt="Logo"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div>
                      <Image
                        src="/images/Logo 7.png"
                        alt="Logo"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div>
                      <Image
                        src="/images/Logo 8.png"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="w-32"
                      />
                    </div>
                    <div>
                      <Image
                        src="/images/logo 9.png"
                        alt="Logo"
                        width={80}
                        height={80}
                      />
                    </div>
                    {/* <div>
                      <Image
                        src="/images/Media-(1).jpeg"
                        alt="Logo"
                        width={80}
                        height={80}
                        className="w-24"
                      />
                    </div> */}
                  </div>
                  {/* ## social media icons #  */}
                  <div className="w-full">
                    <hr />
                  </div>

                  <div className="flex footer_main_div items-center -mt-5 w-full  text-center px-4 mb-4">
                    <div className="footer_icon flex flex-wrap gap-5 justify-center  w-full ">
                      <div>
                        <span>
                          <FaFacebookF className="h-[18px] w-[18px]" />
                        </span>
                      </div>
                      <div>
                        <span>
                          <FaLinkedin className="h-[18px] w-[18px]" />
                        </span>
                      </div>
                      <div>
                        <span>
                          <FaXTwitter className="h-[18px] w-[18px]" />
                        </span>
                      </div>
                      <div>
                        <span>
                          <FaYoutube className="h-[18px] w-[18px]" />
                        </span>
                      </div>
                      <div>
                        <span>
                          <IoLogoInstagram className="h-[18px] w-[18px]" />
                        </span>
                      </div>
                      <div>
                        <span>
                          <TbBeta className="h-[18px] w-[18px]" />
                        </span>
                      </div>
                    </div>

                    <div className=" footer_rights text-[13px] tracking-wide  w-full  mt-2 px-10">
                      <span className="">
                       Copyright © 2020-2025 Softkingo. All rights reserved.
                      </span>
                    </div>

                    <div className=" footer_faq w-full mt-2 ">
                      <ul className="  flex  text-gray-500  gap-2">
                        <li>
                          <a className="hover:underline hover:text-blue-500 cursor-pointer">
                            Privacy Policy
                          </a>{" "}
                          |
                        </li>
                        <li>
                          <a className="hover:underline hover:text-blue-500 cursor-pointer">
                            Terms of Use
                          </a>{" "}
                          |
                        </li>
                        <li>
                          <a className="hover:underline hover:text-blue-500 cursor-pointer">
                            FAQ
                          </a>{" "}
                          |
                        </li>
                        <li>
                          <a className="hover:underline hover:text-blue-500 cursor-pointer">
                            Sitemap
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InquirySection;
