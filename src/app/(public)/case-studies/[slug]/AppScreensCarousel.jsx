// // app/(public)/case-studies/[slug]/AppScreensCarousel.jsx

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function AppScreensCarousel({ data, primaryColor }) {
  const carouselRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  // Safety: categories must exist
  if (!data || !Array.isArray(data.categories) || data.categories.length === 0) {
    return null;
  }

  const currentCategory = data.categories[activeTab] || data.categories[0];
  const baseScreens = Array.isArray(currentCategory?.screens)
    ? currentCategory.screens
    : [];

  if (baseScreens.length === 0) {
    // categories hain but screens nahi -> kuch mat dikhाओ
    return null;
  }

  const infiniteScreens = [...baseScreens, ...baseScreens, ...baseScreens];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || baseScreens.length === 0) return;

    let isScrolling = false;
    let scrollTimeout;

    const updateCenterItem = () => {
      const items = Array.from(carousel.querySelectorAll(".carousel-item"));
      if (!items.length) return;

      const containerCenter =
        carousel.scrollLeft + carousel.offsetWidth / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      items.forEach((item, index) => {
        const itemCenter =
          item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(containerCenter - itemCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setCenterIndex(closestIndex);

      const first = items[0];
      const itemWidth = (first ? first.offsetWidth : 0) + 32;
      const sectionWidth = itemWidth * baseScreens.length;

      if (!isScrolling) {
        if (carousel.scrollLeft <= sectionWidth * 0.2) {
          carousel.scrollLeft += sectionWidth;
        } else if (carousel.scrollLeft >= sectionWidth * 1.8) {
          carousel.scrollLeft -= sectionWidth;
        }
      }
    };

    const handleScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        updateCenterItem();
      }, 150);
      updateCenterItem();
    };

    carousel.addEventListener("scroll", handleScroll, { passive: true });

    const firstItem = carousel.querySelector(".carousel-item");
    if (firstItem) {
      const itemWidth = firstItem.offsetWidth + 32;
      carousel.scrollLeft = itemWidth * baseScreens.length;
      updateCenterItem();
    }

    return () => {
      carousel.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [baseScreens.length, activeTab]);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    setCenterIndex(0);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center px-4">
        {data.title}
      </h2>

      {/* Infinite carousel */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-sky-50 via-sky-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-sky-50 via-sky-50 to-transparent z-10 pointer-events-none" />

        <div
          ref={carouselRef}
          className="flex items-center gap-6 sm:gap-8 px-3 sm:px-4 py-8 sm:py-10 overflow-x-scroll scrollbar-hide"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {infiniteScreens.map((screen, i) => {
            const isCenterItem = i === centerIndex;
            const distanceFromCenter = Math.abs(i - centerIndex);

            let scale = 0.7;
            let opacity = 0.4;

            if (isCenterItem) {
              scale = 1.1;
              opacity = 1;
            } else if (distanceFromCenter === 1) {
              scale = 0.9;
              opacity = 0.75;
            } else if (distanceFromCenter === 2) {
              scale = 0.8;
              opacity = 0.6;
            }

            return (
              <div
                key={`screen-${i}-${screen.name}`}
                className="carousel-item flex-shrink-0 transition-all duration-500 ease-out"
                style={{
                  scrollSnapAlign: "center",
                  transform: `scale(${scale})`,
                  opacity,
                  zIndex: isCenterItem ? 20 : distanceFromCenter === 1 ? 10 : 1,
                }}
              >
                <div className="relative">
                  <div className="w-32 h-64 sm:w-40 sm:h-80 md:w-48 md:h-[420px]">
                    <Image
                      src={screen.image}
                      alt={screen.name}
                      fill
                      className="object-contain drop-shadow-2xl pointer-events-none"
                    />
                  </div>
                  {isCenterItem && (
                    <div
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full"
                      style={{ backgroundColor: primaryColor }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CategoryTabs
        categories={data.categories}
        primaryColor={primaryColor}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
}

function CategoryTabs({ categories, primaryColor, activeTab, onTabChange }) {
  const [selectedScreen, setSelectedScreen] = useState(0);

  if (!Array.isArray(categories) || categories.length === 0) {
    return null;
  }

  const currentCategory =
    categories[activeTab] || categories[0] || { screens: [] };
  const screens = Array.isArray(currentCategory.screens)
    ? currentCategory.screens
    : [];

  useEffect(() => {
    setSelectedScreen(0);
  }, [activeTab]);

  if (screens.length === 0) {
    return null;
  }

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4">
        {categories.map((category, i) => (
          <button
            key={category.id || category.name || i}
            onClick={() => onTabChange(i)}
            className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-sm lg:text-base transition-all ${
              i === activeTab
                ? "bg-white shadow-xl scale-105"
                : "bg-white/80 hover:bg-white hover:shadow-md"
            }`}
            style={
              i === activeTab
                ? {
                    color: primaryColor,
                    borderBottom: `3px solid ${primaryColor}`,
                  }
                : {}
            }
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 px-4 sm:px-6 lg:px-12">
        {/* Image */}
        <div className="relative flex justify-center">
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-40 animate-float"
            style={{
              background: `radial-gradient(circle, ${primaryColor}60, transparent)`,
            }}
          />
          <div className="relative w-40 h-80 sm:w-52 sm:h-[380px] md:w-64 md:h-[440px] lg:w-72 lg:h-[520px]">
            <Image
              key={`${activeTab}-${selectedScreen}`}
              src={screens[selectedScreen].image}
              alt={screens[selectedScreen].name}
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* List */}
        <div className="space-y-3 sm:space-y-4">
          <h3
            className="text-lg sm:text-xl lg:text-2xl font-bold mb-2"
            style={{ color: primaryColor }}
          >
            {currentCategory.name} Features
          </h3>
          {screens.map((screen, i) => {
            const active = i === selectedScreen;
            return (
              <button
                key={screen.name}
                type="button"
                onClick={() => setSelectedScreen(i)}
                className={`w-full flex items-center gap-3 sm:gap-4 bg-white px-4 sm:px-5 lg:px-6 py-3 sm:py-4 rounded-2xl shadow-sm hover:shadow-lg text-left transition-all ${
                  active ? "ring-2" : ""
                }`}
                style={
                  active
                    ? {
                        borderColor: primaryColor,
                        backgroundColor: `${primaryColor}10`,
                      }
                    : {}
                }
              >
                <span
                  className="rounded-full"
                  style={{
                    width: active ? 14 : 12,
                    height: active ? 14 : 12,
                    backgroundColor: active
                      ? primaryColor
                      : `${primaryColor}60`,
                  }}
                />
                <span
                  className={`text-xs sm:text-sm lg:text-base ${
                    active ? "font-semibold" : "font-medium"
                  }`}
                  style={active ? { color: primaryColor } : {}}
                >
                  {screen.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
