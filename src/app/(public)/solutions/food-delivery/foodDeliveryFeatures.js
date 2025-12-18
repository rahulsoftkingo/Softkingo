'use client';

import Image from 'next/image';
import {
    FaCheckCircle,
    FaClock,
    FaDollarSign,
    FaUsers,
    FaMobileAlt,
    FaLink,
    FaUserShield,
    FaSun
} from 'react-icons/fa';

export default function FoodDeliveryFeatures() {
    // Top features (with images)
    const topFeatures = [
        {
            icon: FaCheckCircle,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            title: "100% Quality Assurance",
            description: "We guarantee top-quality standards in every aspect. Our development process includes rigorous quality checks to ensure your app is bug-free and secure."
        },
        {
            icon: FaClock,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            title: "On-time Delivery",
            description: "Timely project completion is our priority. We follow strict timelines and keep you updated throughout the development phase ensuring efficient delivery."
        },
        {
            icon: FaDollarSign,
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-600",
            title: "Fully Customisable",
            description: "We offer completely customisable delivery app that caters to all your unique needs and preferences ensuring your business stands out."
        },
        {
            icon: FaSun,
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600",
            title: "Scalability Opportunities",
            description: "Our apps are designed for scalability, providing scope to expand and grow according to your business needs without any concerns."
        }
    ];

    // Bottom features (icon grid)
    const bottomFeatures = [
        {
            icon: FaMobileAlt,
            iconBg: "bg-yellow-50",
            iconColor: "text-yellow-500",
            title: "Amazing UI/UX",
            description: "Our development team is committed to deliver the best possible user interface design and experience to increase customer engagement."
        },
        {
            icon: FaLink,
            iconBg: "bg-yellow-50",
            iconColor: "text-yellow-500",
            title: "Third-party Integrations",
            description: "We seamlessly integrate your app with essential third-party services such as payment gateways, CRM systems, and marketing tools for streamlined results."
        },
        {
            icon: FaUsers,
            iconBg: "bg-yellow-50",
            iconColor: "text-yellow-500",
            title: "Highly-Dedicated Teams",
            description: "Our team of experienced developers and designers work round the clock, committed to delivering exceptional results."
        },
        {
            icon: FaUserShield,
            iconBg: "bg-yellow-50",
            iconColor: "text-yellow-500",
            title: "Unwavered Security",
            description: "Your data security is our top priority. We implement robust authentication, real-time monitoring, and stringent data protection."
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            {/* CTA Banner */}

            {/* Why Choose Section */}
            <section className="lg:mb-40 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Why Choose Softkingo For Food<br className="hidden sm:block" />
                            Delivery App Development?
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
                            Being the best on-demand food delivery app development company Apptunix provides
                            comprehensive solutions that cover the entire development lifecycle and post-launch
                            support, ensuring your app's success in the long run.
                        </p>
                    </div>

                    {/* Top Features Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {topFeatures.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div key={index} className="text-center">
                                    {/* Icon */}
                                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${feature.iconBg} flex items-center justify-center`}>
                                        <IconComponent className={`w-8 h-8 ${feature.iconColor}`} />
                                    </div>
                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    {/* Description */}
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom Features Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {bottomFeatures.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                                    {/* Icon */}
                                    <div className={`w-14 h-14 mb-4 rounded-xl ${feature.iconBg} flex items-center justify-center`}>
                                        <IconComponent className={`w-7 h-7 ${feature.iconColor}`} />
                                    </div>
                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    {/* Description */}
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Hungry For More Banner */}
            <section className="relative w-full mb-5">
                <div className="lg:absolute  -top-50 h-auto w-full">
                    <div className="bg-transparent  rounded-3xl w-full  overflow-hidden">
                        <div className="flex sm:px-5 gap-5 lg:px-20 flex-col md:flex-row  justify-between items-center">
                            {/* Left - Text */}
                            <div className=" bg-sky-100  w-full lg:max-w-2xl rounded-[3rem] flex-1 p-6  md:py-10  ">

                                <h2 className=" text-3xl font-bold mb-2  text-gray-900">
                                    Hungry For More?
                                </h2>
                                <div className='flex gap-5 items-end'>
                                    <div>
                                        <p className=" text-md mb-2 lg:mb-6">
                                            Explore your delivery app development with technical excellence and bring your vision to life
                                        </p>
                                        <button className=" bg-linear-to-r from-sky-800 to-sky-500 hover:bg-cyan-600 text-white md:px-20  px-4 py-4 rounded-full font-semibold transition-all hover:scale-105 shadow-lg">
                                            Get Started Today
                                        </button>

                                    </div>
                                    <div className="relative w-60 h-40">
                                        <Image
                                            src="/images/food-service/i6.png"
                                            alt="Delicious food"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>


                            </div>

                            {/* Right - Image */}
                            <div className="relative lg:block hidden w-full md:w-68 h-64 md:h-80">
                                <Image
                                    src="/images/food-service/i5.png"
                                    alt="Delicious food"
                                    fill
                                    className="object-contain "
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-sky-400 lg:pt-32 lg:pb-16'>
                <div className='p-6 max-w-7xl mx-auto'>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl max-w-3xl mx-auto text-center py-10 font-bold text-white'>
                        Why Invest In Food Delivery App Development?
                    </h2>
                    <div className='flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-16 px-4 md:px-10 lg:px-20'>

                        <div className="relative w-full h-72 sm:h-96 md:h-96 rounded-lg overflow-hidden">
                            <Image
                                src="/images/food-service/i4.png"
                                alt="Delicious food"
                                fill
                                className="object-fill rounded-lg"
                            />
                            <div className='hidden lg:block absolute right-0 top-0 bottom-0 bg-gradient-to-b from-gray-100 to-black w-2 rounded-r-lg' />
                        </div>

                        <div className='flex flex-col justify-center gap-6 lg:relative lg:-left-24'>
                            {[{
                                src: "/images/food-service/g1.png",
                                alt: "Order icon",
                                title: "Increased Numbers Of Orders",
                                desc: "With our on-demand food delivery app development solution, you can substantially boost the number of orders, leveraging the latest technology and user-friendly interfaces to attract more customers."
                            }, {
                                src: "/images/food-service/g2.png",
                                alt: "Commission icon",
                                title: "Savings on Paying Commission",
                                desc: ""
                            }, {
                                src: "/images/food-service/g3.png",
                                alt: "Customer icon",
                                title: "Improved Customer Experience",
                                desc: ""
                            }, {
                                src: "/images/food-service/g4.png",
                                alt: "Resources icon",
                                title: "Optimum Utilization of Resources",
                                desc: ""
                            }].map(({ src, alt, title, desc }, i) => (
                                <div key={i} className='flex items-center gap-4'>
                                    <div className="relative w-16 h-16 flex-shrink-0">
                                        <Image src={src} alt={alt} fill className="object-contain" />
                                    </div>
                                    <div>
                                        <h4 className='text-xl text-white md:text-2xl font-bold'>{title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>


        </div >

    );
}
