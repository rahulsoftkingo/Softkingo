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
      <section className="cmn-section footerCommonForm Inquiry_inquiry-section__3eTZ_ p-[3.15rem] max-xl:p-[1rem] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="row flex-column-reverse flex-md-row">
            <div className="col-12 col-md-6">
              <div className="cmn-title Inquiry_cmn-title__vmz4G ">
                <span className="cmn-tagline Inquiry_cmn-tagline__Hy__A">
                  INQUIRY
                </span>
                <h2>Let’s Get In Touch</h2>
              </div>
              <div className="hidden lg:flex row row-cols-3 Inquiry_inquiry-contact-detail__0G_zC Inquiry_inquiry-contact-number__v5exq">
                {[
                  {
                    country: "UNITED STATES",
                    phone: "+1 323-908-3492",
                    code: "US",
                  },
                  {
                    country: "UNITED KINGDOM",
                    phone: "+44 (0)20-7993-2188",
                    code: "GB",
                  },
                  { country: "EUROPE", phone: "+34 93-802-3010", code: "EU" },
                  { country: "INDIA", phone: "+91-989-802-1433", code: "IN" },
                  {
                    country: "AUSTRALIA",
                    phone: "+61 2 6145 2066",
                    code: "AU",
                  },
                  { country: "AFRICA", phone: "+234 915-242-4242", code: "ZA" },
                  { country: "UAE", phone: "+971 50 541 7174", code: "AE" },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="Inquiry_inquiry-contact-col__FeYjU w-56 flex flex-col justify-start "
                  >
                    <div>
                      <ReactCountryFlag
                        style={{
                          fontSize: "1em",
                          lineHeight: "1em",
                          margin: "0 0.5rem 0.3rem 0",
                        }}
                        countryCode={contact.code}
                        svg
                      />
                      {contact.country}
                    </div>
                    <a
                      aria-label={contact.phone}
                      target="_blank"
                      href={`tel:${contact.phone}`}
                    >
                      <p>{contact.phone}</p>
                    </a>
                  </div>
                ))}
              </div>
              <div className="hidden lg:flex row row-cols-3 flex-row mt-18 sm-mt-12 Inquiry_inquiry-contact-detail__0G_zC">
                {[
                  {
                    icon: <GoMail />,
                    label: "EMAIL",
                    value: "biz@hiddenbrains.com",
                    type: "email",
                  },
                  {
                    icon: <ImHangouts />,
                    label: "HANGOUTS",
                    value: "biz@hiddenbrains.com",
                    type: "hangouts",
                  },
                  {
                    icon: <TfiSkype />,
                    label: "SKYPE",
                    value: "hiddenbrains",
                    type: "skype",
                  },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="Inquiry_inquiry-contact-col__FeYjU "
                  >
                    <i
                      className={`Inquiry_icon-biz-col___O0l_ icon-${contact.type}`}
                    >
                      {contact.icon}
                    </i>
                    <div>
                      {contact.label}
                      <a target="_blank" href={`mailto:${contact.value}`}>
                        <p>{contact.value}</p>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12 relative col-md-6 ">
           
              <div className="cmn-card border-0 Inquiry-form-card InquiryForm_Inquiry-form-card__wVD4N card">
                <div className="InquiryForm_card-body__FsroS card-body">
                  <div className="InquiryForm_card-title__F_1DR card-title h5">
                    Hey! there :)
                  </div>
                  <form>
                    <div className="row ">
                      <div className="col-12 col-md-6 full-width">
                        <div className="mb-[1.5rem] h-14 border-[0.5px] rounded border-[#bbb] position-relative">
                          <label
                            className=" w-auto px-1 z-10 bg-white relative bottom-3 InquiryForm_form-label__gENCj form-label"
                            htmlFor="Name"
                          >
                            Your Name
                            <span className="InquiryForm_astric-mark__R3PJc">
                              *
                            </span>
                          </label>
                          <input
                            placeholder="Enter your name"
                            maxLength="50"
                            type="text"
                            id="Name"
                            className="InquiryForm_form-control__JC1Ue form-control relative bottom-3 left-2"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 full-width ">
                        <div className="mb-[1.5rem] h-14 rounded border-[0.5px] border-[#bbb] position-relative">
                          <label
                            className=" w-auto px-1 z-10 bg-white relative bottom-3 InquiryForm_form-label__gENCj form-labels"
                            htmlFor="emailAdd"
                          >
                            Email address
                            <span className="InquiryForm_astric-mark__R3PJc">
                              *
                            </span>
                          </label>
                          <input
                            placeholder="Enter your email"
                            maxLength="50"
                            type="email"
                            id="emailAdd"
                            className="InquiryForm_form-control__JC1Ue form-control relative bottom-3 left-2"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 full-width ">
                        <div className="mb-[1.5rem] h-14 rounded border-[0.2px] border-[#bbb] position-relative ">
                          <label
                            className=" w-auto px-1 z-10 bg-white relative bottom-3  InquiryForm_form-label__gENCj form-labels"
                            htmlFor="phoneNumber"
                          >
                            Phone Number
                            <span className="text-danger">*</span>
                          </label>
                          <div className="p-[2px]">
                            <PhoneInput
                              country={"in"}
                              value={phone}
                              onChange={(value) => setPhone(value)}
                              inputProps={{
                                name: "phone",
                                required: true,
                                className:
                                  "form-control relative  bottom-3 left-2",
                              }}
                              containerStyle={{ border: "none", zIndex: "15" }}
                              inputStyle={{
                                border: "none",
                                boxShadow: "none",
                                backgroundColor: "transparent",
                                outline: "none",
                              }}
                              buttonStyle={{
                                border: "none",
                                backgroundColor: "transparent",
                                position: "absolute",
                                bottom: "1.5rem",
                                borderRight: "1px solid #bbb",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12  col-md-6 full-width">
                        <div className="mb-[1.5rem] h-14 rounded border-[0.2px] border-[#bbb] position-relative">
                          <label
                            className=" w-auto px-1 z-10 bg-white relative bottom-3  InquiryForm_form-label__gENCj form-label"
                            htmlFor="CompanyName"
                          >
                            Company
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            placeholder="Company Name"
                            maxLength="70"
                            type="text"
                            id="CompanyName"
                            className="InquiryForm_form-control__JC1Ue form-control relative bottom-3 left-2"
                          />
                        </div>
                      </div>

                      <div className=" mx-3 h-14 rounded border-[0.2px] border-[#bbb] w-full  px-3 mb-6 ">
                        {" "}
                        <BudgetSlider />
                      </div>
                      <div className="col-12  w-full  px-3">
                        <div className="">
                          <div className="  h-14 rounded border-[0.2px] border-[#bbb]  px-2 flex-col space-y-2 mb-4">
                            <label
                              className=" w-auto px-1 font-lato text-base text-gray-600 z-10 bg-white relative bottom-3 "
                              htmlFor="fileInput"
                            >
                              Attachment
                            </label>
                            <div className="relative bottom-3 left-2 flex items-center space-x-2  p-2 cursor-pointer  ">
                              <input
                                type="file"
                                id="fileInput"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                              />
                              <label
                                htmlFor="fileInput"
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <FaPaperclip
                                  className="text-gray-600 relative bottom-3 right-3"
                                  size={20}
                                />
                                <span className="text-gray-600 relative bottom-3 right-3">
                                  {fileName || "Choose a file..."}
                                </span>
                              </label>
                            </div>
                          </div>

                          <div className=" h-auto rounded border-[0.2px]  border-[#bbb] px-3">
                            <label
                              className=" z-10 w-auto px-1 bg-white relative bottom-3 InquiryForm_form-label__gENCj form-label "
                              htmlFor="message"
                            >
                              Message
                              <span className="InquiryForm_astric-mark__R3PJc">
                                *
                              </span>
                            </label>
                            <textarea
                              placeholder="Brief about the project"
                              id="message"
                              className="InquiryForm_form-control__JC1Ue form-control resize-none"
                            ></textarea>
                          </div>
                           <div className="flex flex-row">
                           <div className="w-44 relative top-11 flex justify-between items-center">
                            <span className="p-4 w-10 h-10 flex justify-center items-center border-[0.2px] border-[#bbb]">
                              {num1}
                            </span>
                            +
                            <span className="p-4 w-10 h-10 flex justify-center items-center border-[0.2px] border-[#bbb]">
                              {num2}
                            </span>
                            =
                            <input
                              type="number"
                              className="p-2 w-[50px] flex justify-center items-center outline-none h-10 border-[0.2px] border-[#bbb]"
                              value={userAnswer}
                              onChange={checkAnswer}
                              placeholder="?"
                            />
                           
                          </div>
                          {!isCorrect&&(
                              <p className="text-red-500">Wrong answer! Try again.</p>
                            )}
                           </div>
                          

                          <div className="w-full h-10 flex justify-end items-center">
                            <div className=" py-2 px-4 mt-4 flex justify-center items-center rounded-full  bg-primary hover:bg-sky-600">
                              <button
                                type="button"
                                id="submitInquiry"
                                aria-label="Submit your Inquiry"
                                disabled={isCorrect === false}
                                className=" text-white font-semibold "
                              >
                                <span className="">Submit</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     
    </div>
  );
};

export default InquirySection;
