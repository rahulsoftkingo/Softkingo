'use client';

import { useState, useEffect } from 'react';
import { FaTimes, FaFileUpload, FaCheck, FaArrowRight } from 'react-icons/fa';

export default function PopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [ndaChecked, setNdaChecked] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaResult] = useState(11);

  // Show modal on first visit
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      setIsOpen(true);
      sessionStorage.setItem('hasSeenPopup', 'true');
    }
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Form submitted successfully!');
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <FaTimes className="text-gray-600 text-xl" />
        </button>
        
        <div className="flex flex-col lg:flex-row">
          {/* Left Section */}
          <div className="w-full lg:w-2/5 bg-gradient-to-br from-blue-900 to-blue-700 text-white p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Pause! Before You Press X,</h2>
              <h3 className="text-xl">See What You Could Be Missing!</h3>
            </div>
            
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4">Our Experts Are Ready to Give You Free:</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaCheck className="mt-1 mr-2 text-green-400" />
                  <span>Detailed Project Roadmap</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="mt-1 mr-2 text-green-400" />
                  <span>Preliminary Cost Estimate</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="mt-1 mr-2 text-green-400" />
                  <span>Timeline Breakdown</span>
                </li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-3">Have a Question? Let's Talk!</h4>
              <p className="mb-2">We answer our phones!</p>
              <p className="text-xl font-semibold mb-4">+91-6350220215</p>
              
              <address className="not-italic mb-2">
                E-191C, Ricco Industrial Area, Mansarovar, Jaipur 302020, Rajasthan, India
              </address>
              
              <p className="mb-1">Email Us</p>
              <p className="font-semibold">sales@jploft.com</p>
            </div>
            
            <div className="mt-auto">
              <p className="text-sm mb-4">
                <span className="font-bold">WFFA</span> Whirlpool Red Bull
              </p>
              <p className="text-sm">
                Rated 4.9 by 1000+ Happy Customers. 10+ Years of Industry-experience.
              </p>
            </div>
          </div>
          
          {/* Right Section - Form */}
          <div className="w-full lg:w-3/5 p-8">
            <h3 className="text-xl font-semibold mb-6 text-center">
              We respond promptly, typically within 30 minutes
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mandatory Field
                </label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="Enter Phone Number"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  placeholder="Share Project Details / Overview of Your Idea (Help Us Come Back Storage)"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="flex items-center cursor-pointer text-sm font-medium text-gray-700">
                    <FaFileUpload className="mr-2 text-blue-600" />
                    <span>Add File</span>
                    <span className="ml-1 text-gray-500">| No file chosen</span>
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="nda"
                    checked={ndaChecked}
                    onChange={(e) => setNdaChecked(e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="nda" className="ml-2 block text-sm text-gray-700">
                    Protect Under ND
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Are you humane? *
                </label>
                <div className="flex items-center">
                  <span className="mr-2">1 + 10 =</span>
                  <input
                    type="text"
                    value={captchaValue}
                    onChange={(e) => setCaptchaValue(e.target.value)}
                    className="w-20 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <span className="ml-2 text-sm text-gray-500">CAPTCHIA Result</span>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
              >
                Submit <FaArrowRight className="ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}