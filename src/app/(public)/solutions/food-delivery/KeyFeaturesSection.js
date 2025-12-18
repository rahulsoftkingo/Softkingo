// components/KeyFeaturesSection.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function KeyFeaturesSection() {
  const [activeTab, setActiveTab] = useState('customer');
  const [openFeature, setOpenFeature] = useState('registration');

  const tabs = [
    { id: 'customer', label: 'Customer app' },
    { id: 'driver', label: 'Driver Panel' },
    { id: 'restaurant', label: 'Restaurant Panel' },
  ];

  const features = [
    {
      id: 'registration',
      title: 'Customer Registration and Verification',
      description: 'Users sign up securely and verify identity for seamless ordering.',
    },
    {
      id: 'search',
      title: 'Search for Restaurants and Dishes',
      description: 'Find your favorite restaurants and dishes quickly with advanced search filters.',
    },
    {
      id: 'location',
      title: 'Location-based Restaurant Discover',
      description: 'Discover nearby restaurants based on your current location.',
    },
    {
      id: 'delivery',
      title: 'Food Delivery',
      description: 'Get your food delivered hot and fresh to your doorstep.',
    },
    {
      id: 'payment',
      title: 'Payment Options',
      description: 'Multiple secure payment methods including cards, wallets, and cash on delivery.',
    },
    {
      id: 'tracking',
      title: 'Order Tracking',
      description: 'Track your order in real-time from preparation to delivery.',
    },
  ];

  const toggleFeature = (featureId) => {
    setOpenFeature(openFeature === featureId ? null : featureId);
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-6 lg:px-20 bg-white">
      <div>
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Key Features of Our Food Delivery App Development
          </h2>
          <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed">
            Enjoy seamless food delivery across all your devices! Our app is available on iOS, Android, Desktop, and
            Web, giving you the flexibility to order from your smartphone, computer, or tablet. Fast, convenient, and
            always at your fingertips—satisfy your cravings whenever you are.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-around gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-3xl text-xl font-semibold transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-cyan-400 text-white shadow-lg'
                  : 'bg-white  border-2 border-black hover:border-cyan-400'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className=" flex flex-col-reverse justify-around lg:flex-row gap-10 ">
          {/* Left Side - Accordion */}
          <div className="space-y-3">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="border-b border-gray-200"
              >
                <button
                  onClick={() => toggleFeature(feature.id)}
                  className="w-full flex items-center justify-between py-4 text-left hover:text-cyan-500 transition-colors"
                >
                  <span className="font-semibold text-xl tracking-wide">{feature.title}</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${openFeature === feature.id ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFeature === feature.id && (
                  <div className="pb-4 text-md text-gray-800">
                    {feature.description}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side - Phone Mockups */}
          <div className="flex justify-center items-center gap-6 relative">
            <div className="hidden lg:absolute -right-30 -top-50 w-42 h-42 ">
              <Image
                src="/images/food-service/pizza2.png"
                alt="Pizza-slice"
                fill
                className="object-contain"
              />
            </div>
            <div className='flex relative gap-4 md:gap-10'>


              <div className="relative w-44 h-96  ">
                <Image
                  src="/images/food-service/ph1.png"
                  alt="Food delivery app screen 1"
                  fill
                  className="object-cover "
                  sizes="176px"
                />
              </div>
              <div className="relative w-44 h-96 ">
                <Image
                  src="/images/food-service/ph1.png"
                  alt="Food delivery app screen 2"
                  fill
                  className="object-cover "
                  sizes="176px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
