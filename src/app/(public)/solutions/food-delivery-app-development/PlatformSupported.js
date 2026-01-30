"use client"
import React from 'react'
import { useState } from 'react';
import Image from 'next/image';

export default function PlatformSupported() {

    const platforms = [
        {
            id: 1,
            name: 'Android',
            bgColor: 'bg-cyan-400',
            description: 'We build high-performing Android food delivery apps that transform your business to new heights. Our apps follow Material Design standards, offering fast performance, intuitive navigation, and secure payment options.',
            image: "/images/food-service/android.png"
        },
        {
            id: 2,
            name: 'iOS',
            bgColor: 'bg-cyan-300',
            description: 'We build high-performing iOS food delivery apps that transform your business to new heights. Our apps follow Apple\'s UI/UX standards, offering fast performance, intuitive navigation, and secure payment options.',
            image: "/images/food-service/IOS.png"
        },
        {
            id: 3,
            name: 'Desktop',
            bgColor: 'bg-cyan-200',
            description: 'Deliver seamless food ordering experiences on desktop. Our web applications provide full functionality with optimized performance for larger screens and desktop workflows.',
            image: "/images/food-service/android.png"
        },
        {
            id: 4,
            name: 'Web App',
            bgColor: 'bg-cyan-100',
            description: 'Access your food delivery platform from any browser. Our responsive web apps work perfectly across all devices, providing consistent experiences without installation.',
            image: "/images/food-service/android.png"
        },
    ];

    const [selectedPlatform, setSelectedPlatform] = useState('Android');

    const currentPlatform = platforms.find(p => p.name === selectedPlatform);

    return (
        <section className="max-w-7xl mx-auto py-16 relative px-6 lg:px-20 text-black ">
            <Image
                className="absolute hidden md:block top-16 left-0"
                src="/images/food-service/pizza.png"
                alt=""
                width={100}
                height={100}
            />
            <div className='max-w-xl lg:max-w-4xl mx-auto text-center'>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    Platform Supporting Food Delivery App
                </h2>
                <p className="text-gray-600 text-xl max-w-4xl mx-auto mb-12">
                    Enjoy seamless food delivery across all your devices! Our app is available on iOS, Android, Desktop, and
                    Web, giving you the flexibility to order from anywhere, on any device, computer, or tablet. Fast, convenient, and
                    tailored to your fingertips—satisfy your cravings whenever you want.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
                {/* Left buttons panel */}
                <div className="lg:w-2/5 lg:left-18  lg:top-10 lg:relative flex lg:flex-col  md:gap-4 justify-center bg-sky-300 rounded-2xl p-5">
                    {platforms.map(platform => (
                        <button
                            key={platform.id}
                            onClick={() => setSelectedPlatform(platform.name)}
                            className={`font-bold rounded-2xl  text-nowrap py-2 px-3 md:py-4 md:px-6 text-lg transition-colors duration-300 ${selectedPlatform === platform.name ? 'bg-white text-black' : 'text-white hover:bg-white hover:text-black'
                                }`}
                        >
                            {platform.name}
                        </button>
                    ))}
                </div>

                {/* Right side content and image */}
                <div className="lg:w-3/5  bg-sky-100 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold mb-4">{currentPlatform.name}</h3>
                    <p className="text-xl font-extralight leading-relaxed">{currentPlatform.description}</p>

                    <div className="flex justify-center lg:mt-10">
                        <div className="relative bg-sky-50 rounded-full w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 p-12">
                            <Image
                                src={currentPlatform.image}
                                alt={`${currentPlatform.name} food delivery app screen`}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
