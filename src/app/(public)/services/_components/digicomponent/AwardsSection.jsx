import React from "react";
import Image from "next/image";

function AwardsSection({
  title: propTitle,
  rating = 4.7,
  reviewCount = "9,015",
  showGdpr = true,
  awards: customAwards,
}) {
  const title =
    propTitle || "The most loved sales\nplatform on the planet";

  const defaultAwards = [
    {
      image:
        "/images/award/Black%20And%20Gold%20Modern%20Award%20Ceremony%20Instagram%20Post%20(1).png",
      alt: "Award 1",
    },
    {
      image:
        "/images/award/Black%20And%20Gold%20Modern%20Award%20Ceremony%20Instagram%20Post%20(4).png",
      alt: "Award 2",
    },
    {
      image:
        "/images/award/Black%20And%20Gold%20Modern%20Award%20Ceremony%20Instagram%20Post%20(2).png",
      alt: "Award 3",
    },
    {
      image: "/images/award/Goodfirms%20award-softkingo.png",
      alt: "GoodFirms Award",
    },
    {
      image: "/images/award/techbeheb.png",
      alt: "TechBehemoths Award",
    },
  ];

  const awards =
    customAwards && customAwards.length > 0
      ? customAwards
      : defaultAwards;

  const renderStars = () => (
    <div className="flex items-center justify-between gap-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-violet-500"
        >
          <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.47L12 17.27l-5.8 3.1 1.11-6.47-4.7-4.58 6.49-.94L12 2.5z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section className="bg-[#f7f5f3] py-8 lg:py-18 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Content */}
          <div className="flex-shrink-0 text-center lg:text-left">
            <h2 className="whitespace-pre-line text-2xl md:text-2xl lg:text-4xl font-bold leading-tight text-gray-900">
              {title}
            </h2>

            <div className="mt-4 flex justify-center lg:justify-start">
              {renderStars()}
            </div>

            <p className="mt-2 text-base text-gray-600">
              <span className="font-semibold text-gray-900">
                {rating}/5
              </span>{" "}
              based on {reviewCount} reviews
              {showGdpr && (
                <>
                  {" "}
                  <span className="mx-1">|</span> GDPR Compliant
                </>
              )}
            </p>
          </div>

          {/* Right Awards */}
          <div className="flex items-center gap-4 flex-nowrap overflow-x-auto scrollbar-hide lg:overflow-visible">
            {awards.map((award, index) => (
              <div
                key={index}
                className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={award.image}
                  alt={award.alt}
                  width={140}
                  height={140}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AwardsSection;