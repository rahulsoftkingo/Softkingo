import Image from 'next/image';
import KeyFeaturesSection from './KeyFeaturesSection';
import PlatformSupported from './PlatformSupported';
import FoodMethodology from './FoodMethodology';
import FoodDeliveryFeatures from './foodDeliveryFeatures';
import { FaDesktop, FaTasks, FaUikit } from 'react-icons/fa';
import { SiFsecure, SiSymfony, SiSystem76 } from 'react-icons/si';
import { Caesar_Dressing } from 'next/font/google';
import CommonTitle from '@/components/ui/CommonTitle';
import ConsultationCTA from '@/components/common/Consultation-Cta';
import BlogSection from '@/components/common/BlogSection';
import FAQAccordion from '@/components/common/Faqaccordion';
import InquirySection from '@/components/footer/InquirySection';
import IndustriesPage from '../../industries/page';
import AwardsSection from '@/components/common/AwardsSection';

export default function FoodDeliveryHero() {
    const logos = [
        { name: 'AnyTime Astro', src: '/images/logo/AnyTime Astro-logo.webp' },
        { name: 'CoreValent', src: '/images/logo/CoreValentLogo.png' },
        { name: 'Bumpy', src: '/images/logo/Bumpy_logo.webp' },
        { name: 'Potafo', src: '/images/logo/potafologo.png' },
    ];

    const stats = [
        { value: '6+', label: 'Years Of Excellence' },
        { value: '100+', label: 'Tech Enthusiast' },
        { value: '500+', label: 'Product Delivered' },
        { value: '20+', label: 'Countries Served' },
    ];

    const services = [
        {
            id: 1,
            title: 'Restaurant Mobile App Development',
            image: '/images/food-service/f2.png',
        },
        {
            id: 2,
            title: 'On Demand Food Delivery App Development',
            image: '/images/food-service/f2.png',
        },
        {
            id: 3,
            title: 'Platform Specific Food Delivery App',
            image: '/images/food-service/f2.png',
        },
        {
            id: 4,
            title: 'Niche Based Food Delivery App',
            image: '/images/food-service/f2.png',
        },
        {
            id: 5,
            title: 'Cloud Kitchen App Development',
            image: '/images/food-service/f2.png',
        },
        {
            id: 6,
            title: 'Customer App',
            image: '/images/food-service/f2.png',
        },
        {
            id: 7,
            title: 'Food Ordering App Development',
            image: '/images/food-service/f2.png',
        },
        {
            id: 8,
            title: 'Food Deliver Aggregator',
            image: '/images/food-service/f2.png',
        },
        {
            id: 9,
            title: 'Delivery-as-a-service (daas) App development',
            image: '/images/food-service/f2.png',
        },
    ];
    const Featuredinlogos = [
        { id: 1, name: 'Clutch', image: '/images/about/f6.png' },
        { id: 2, name: 'HuffPost', image: '/images/about/f1.png' },
        { id: 3, name: 'Bloomberg', image: '/images/about/f2.png' },
        { id: 4, name: 'TechCrunch', image: '/images/about/f3.png' },
        { id: 5, name: 'Business Insider', image: '/images/about/f5.png' },
        { id: 6, name: 'CSQ Wire', image: '/images/about/f4.png' },
    ];
    const bgStyle = {
        backgroundImage: "url('/images/food-service/b1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
    };

    return (
        <main className='text-black bg-white'>
            <section className="relative max-w-7xl mx-auto overflow-hidden">

                <div className=" py-16 lg:relative z-10">
                    <div className="flex justify-center px-6 lg:max-w-2xl">

                        {/* Left Side - Content */}
                        <div className="space-y-6 ">
                            {/* Tag */}
                            <div className="inline-block">
                                <span className="text-2xl font-semibold uppercase tracking-wider">
                                    On Demand
                                </span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-xl flex flex-wrap sm:text-3xl lg:text-5xl font-bold text-gray-900 leading-[1.1]">
                                Food Delivery App
                                <br />
                                Development Company
                            </h1>

                            {/* Description */}
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                                Have a food delivery business idea? At Softkingo, we provide top-notch food delivery
                                app development services for businesses to accelerate their growth.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-cyan-400 hover:bg-cyan-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                                    Let's Work Together
                                </button>
                                <button className="bg-transparent hover:bg-gray-900 text-gray-900 hover:text-white px-8 py-4 rounded-full font-semibold border-2 border-gray-900 hover:shadow-lg transition-all duration-300 text-center">
                                    Schedule A Meeting
                                </button>
                            </div>

                            {/* Trusted By Section */}
                            <div className="pt-6 lg:pt-8">
                                <p className="text-sm font-semibold text-gray-900 mb-4">Trusted By</p>
                                <div className="flex flex-wrap items-center gap-6 lg:gap-8">
                                    {logos.map((logo, index) => (
                                        <div key={index} className="relative h-24 w-24  hover:grayscale-0 transition-all duration-300">
                                            <Image
                                                src={logo.src}
                                                alt={logo.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Hero Image */}
                        <div className="md:absolute md:top-84 lg:top-0 right-0  sm:w-[350px] lg:w-[550px]  xl:w-[850px] lg:h-[650px]">
                            <Image
                                src="/images/food-service/f1.png"
                                alt="Food delivery app interface with delivery person"
                                width={900}
                                height={900}
                                className="md:object-contain object-cover hidden md:block h-full"
                                priority
                            />
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className=" mt-10  lg:mt-10">
                        <div className="grid bg-sky-400  lg:rounded-tr-[4rem] lg:w-[90%] p-10 grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
                                    <h3 className="text-3xl  lg:text-4xl font-bold text-white mb-2 ">
                                        {stat.value}
                                    </h3>
                                    <p className="text-sm sm:text-base text-white/95 font-medium">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto p-6 lg:px-20">

                <div className="text-center mb-12 max-w-3xl mx-auto">

                    <CommonTitle pill={false}
                        title="Fresh"
                        subtitle="Using our Uber eats clone can help you turn your food delivery app dream into reality.
                        Our clone is designed for success. It is feature-rich, scalable, and easily connects
                        customers, restaurants, and drivers."
                        gradientText=", Hot, and Fast - Build the Next Big Food Delivery App"
                        align="center" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="group  gap-4   transition-all duration-300 cursor-pointer "
                        >
                            {/* Image Container */}
                            <div className="relative h-58 w-full bg-gray-200 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl mb-2">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>

                            {/* Card Content */}
                            <div className="p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-2xl">
                                <h3 className="text-center text-sm font-semibold  text-gray-800 leading-snug min-h-[3rem] flex items-center justify-center">
                                    {service.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <PlatformSupported />

            <section className="sm:flex max-w-7xl mx-auto h-[400px]  md:flex-row  ">
                {/* Left Half - Text Only */}
                <div className="flex-1 bg-sky-400  p-8 lg:p-12 flex items-center justify-center">
                    <h2 className=" text-2xl lg:text-4xl font-bold leading-normal text-white">
                        Mobile Apps <br />Developed By Softkingo Have Been Featured In
                    </h2>
                </div>

                {/* Right Half - Logo Grid */}
                <div className="flex-1 p-5 lg:p-10 bg-sky-200 grid grid-cols-2 gap-4 lg:gap-6">
                    {Featuredinlogos.map((logo) => (
                        <div
                            key={logo.id}
                            className="bg-white rounded-lg p-2 lg:p-6 flex items-center justify-center  lg:h-24 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                            <Image
                                src={logo.image}
                                alt={`${logo.name} logo`}
                                width={120}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </section>

            <KeyFeaturesSection />
            {/* /images/food-service/b1.png */}

            {/* Case study */}
            <section className="max-w-7xl mx-auto py-16 px-8">
                <div className="">
                    {/* Section Title */}
                    <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-12">
                        Our Case Studies
                    </h2>

                    {/* Case Study Card */}
                    <article
                        className="rounded-2xl overflow-hidden relative "
                        aria-labelledby="case-study-title"
                    >
                        {/* Background image layer */}
                        <div className="absolute inset-0" style={bgStyle} />

                        {/* Color overlay with multiply blend mode */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "linear-gradient(to right, #fff4b6, #ffb83c)",
                                mixBlendMode: "multiply",
                                opacity: 0.95
                            }}
                        />

                        {/* Subtle gradient overlay for contrast */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-white/10" />

                        {/* Content - Responsive Layout */}
                        <div className="relative z-10 flex flex-col lg:flex-row p-6 sm:p-8 lg:p-10 gap-6 sm:gap-8 lg:gap-10">

                            {/* Left Side - Content */}
                            <div className="flex-1 space-y-6">
                                {/* Logo and Title */}
                                <div className="space-y-4">
                                    <div className="flex gap-4 items-center">
                                        <div className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 rounded-2xl flex items-center justify-center relative flex-shrink-0">
                                            <Image
                                                src="/images/food-service/i2.png"
                                                alt="Potafo icon"
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>
                                        <h3
                                            id="case-study-title"
                                            className="text-xl sm:text-2xl lg:text-3xl font-extrabold"
                                        >
                                            Potafo Delivery App
                                        </h3>
                                    </div>

                                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                                        Potafo is an online food delivery service based in Calicut, Kerala's love of food
                                        drives this work. We bring all restaurants together on one platform that offers a
                                        variety of options to customers.
                                    </p>
                                </div>

                                {/* Info pill */}
                                <div className="rounded-xl bg-white/70 p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-800">
                                    {/* Country */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">🇮🇳</span>
                                        <div>
                                            <div className="text-xs font-medium text-gray-600">Country</div>
                                            <div className="font-semibold text-gray-900">India</div>
                                        </div>
                                    </div>

                                    {/* Platforms */}
                                    <div>
                                        <div className="text-xs font-medium text-gray-600 mb-1">Platforms</div>
                                        <div className="flex items-center gap-1 flex-wrap">
                                            <span className="px-2 py-1 bg-gray-900 text-white text-xs rounded">iOS</span>
                                            <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Android</span>
                                            <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">Web</span>
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div>
                                        <div className="text-xs font-medium text-gray-600 mb-1">Techstack</div>
                                        <div className="font-semibold text-gray-900 text-xs leading-normal">
                                            Hybrid(Flutter), Mongo DB, Node JS
                                        </div>
                                    </div>
                                </div>

                                {/* Badges */}
                                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                                    <Image
                                        src="/images/food-service/google.png"
                                        alt="Google Play"
                                        width={120}
                                        height={36}
                                        style={{
                                            objectFit: "contain",
                                            cursor: "pointer"
                                        }}
                                        className="hover:scale-105 transition-transform w-[100px] sm:w-[120px] lg:w-[140px] h-auto"
                                    />
                                    <Image
                                        src="/images/food-service/ios.png"
                                        alt="App Store"
                                        width={120}
                                        height={36}
                                        style={{
                                            objectFit: "contain",
                                            cursor: "pointer"
                                        }}
                                        className="hover:scale-105 transition-transform w-[100px] sm:w-[120px] lg:w-[140px] h-auto"
                                    />
                                    <Image
                                        src="/images/food-service/web.png"
                                        alt="Web"
                                        width={100}
                                        height={30}
                                        style={{
                                            objectFit: "contain",
                                            cursor: "pointer"
                                        }}
                                        className="hover:scale-105 transition-transform w-[90px] sm:w-[100px] lg:w-[120px] h-auto"
                                    />
                                </div>
                            </div>

                            {/* Right Side - Phone Mockups */}
                            <div className="flex items-center justify-center lg:w-[400px] xl:w-[500px]">
                                <div className="relative w-full max-w-[400px] h-[300px] sm:h-[350px] lg:h-[400px]">
                                    <Image
                                        src="/images/food-service/b1i1.png"
                                        alt="Potafo app screens with delivery person"
                                        fill
                                        className="md:object-contain sm:object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>


            {/* foodMethodology */}
            <FoodMethodology />


            {/* Why choose for food app  */}
            <FoodDeliveryFeatures />

            {/* benefits of food delivery  */}
            <section className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row ">
                {/* Left Section (fixed) */}
                <div className="md:w-1/2 p-8 sticky flex flex-col justify-start">
                    <h2 className="text-4xl font-bold mb-4">Benefits of Our Food Delivery App Development Services</h2>
                    <p className="text-lg mb-4">
                        As a leading custom food delivery app company, we provide numerous user benefits, elevating the experience with convenience and security solutions.
                    </p>
                    {/* Add any other static content here */}
                </div>

                {/* Right Section (scrollable) */}
                <div className="md:w-1/2 px-4 py-8 overflow-y-auto no-scrollbar h-[600px] flex flex-col gap-6">
                    {/* Each benefit card here */}
                    <div className="bg-orange-100 flex-col rounded-2xl flex p-6 shadow-lg">
                        <div className='flex gap-5 items-center'>
                            <FaTasks size={30} />
                            <h4 className='font-bold mb-2 text-2xl'>Task-oriented Approach </h4>
                        </div>
                        <p className='text-xl'>We build easy-to-use healthcare software with expertise in detailing and creating customized solutions to help your organisation more efficiently.</p>
                    </div>
                    <div className="bg-green-100 flex-col rounded-2xl flex p-6 shadow-lg">
                        <div className='flex gap-5 items-center'>
                            <SiSymfony size={30} />
                            <h4 className='font-bold mb-2 text-2xl'>UI/UX Design </h4>
                        </div>
                        <p className='text-xl'>We create unique UI/UX designs to enhance the comprehensive interface and smooth navigation, helping in work efficiency.</p>
                    </div>
                    <div className="bg-blue-200 flex-col rounded-2xl flex p-6 shadow-lg">
                        <div className='flex gap-5 items-center'>
                            <FaDesktop size={30} />
                            <h4 className='font-bold mb-2 text-2xl'>Integrating Internal System </h4>
                        </div>
                        <p className='text-xl'>We build healthcare apps with complete gateway infrastructure, including EHR and practice management, to increase organizational value.</p>
                    </div>
                    <div className="bg-pink-100 flex-col rounded-2xl flex p-6 shadow-lg">
                        <div className='flex gap-5 items-center'>
                            <SiFsecure size={30} />
                            <h4 className='font-bold mb-2 text-2xl'>Security Assurance</h4>
                        </div>
                        <p className='text-xl'>We prioritize data protection in healthcare app development services to provide users with the highest security.</p>
                    </div>

                    {/* Add more cards as needed */}
                </div>
            </section>


            {/*  Our Awards & Recognitions */}
            <AwardsSection />
            {/*  what our client say */}

            <ConsultationCTA imageSrc="/images/cta/cta.png" href="/contact" title="Let’s Build Your Next Big Mobile App" subtitle="Collaborate with a leading mobile app development agency to turn your innovative idea into a feature-rich mobile application." />

            <BlogSection
                category=""
                title="Our Latest Blogs"
                subtitle="Explore our latest insights, product lessons, and engineering best practices."
            />
            <FAQAccordion />
            <InquirySection />
        </main>
    );
}

