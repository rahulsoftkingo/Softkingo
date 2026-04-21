// // app/(public)/case-studies/[slug]/AppScreensCarousel.jsx

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function AppScreensCarousel({ data, primaryColor }) {
  const carouselRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [carouselTab, setCarouselTab] = useState(() => {
    const firstMobile = data.categories.findIndex(c => c.layout !== 'web' && c.screens?.length > 1);
    return firstMobile !== -1 ? firstMobile : 0;
  });

  // Safety: categories must exist
  if (!data || !Array.isArray(data.categories) || data.categories.length === 0) {
    return null;
  }

  // Recursive fallback logic for images
  const getEffectiveImage = (screens, index, categoryImage) => {
    // If we have an image at this index, return it
    if (screens[index]?.image) return screens[index].image;

    // Look backwards for the first available image
    for (let i = index - 1; i >= 0; i--) {
      if (screens[i]?.image) return screens[i].image;
    }

    // Fallback to category hero image or placeholder
    return categoryImage || '/images/placeholder.png';
  };

  const currentCategory = data.categories[activeTab] || data.categories[0];
  const currentCarouselCategory = data.categories[carouselTab] || data.categories[0];
  const baseScreens = Array.isArray(currentCarouselCategory?.screens)
    ? currentCarouselCategory.screens
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
  }, [baseScreens.length, carouselTab]);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);

    // Logic: Only change the top carousel if the new tab actually has its own screen group.
    // If it's a "Feature Only" or "Web Layout" with single point, we keep the previous screens sliding.
    const newCategory = data.categories[tabIndex];
    if (newCategory?.screens && newCategory.screens.length > 1 && newCategory.layout !== 'web') {
      setCarouselTab(tabIndex);
      setCenterIndex(0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
      {/* Infinite carousel */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-sky-50 via-sky-50 to-transparent z-10 pointer-events-none" />
        {/* Always show infinite mobile carousel if baseScreens exist */}
        {baseScreens.length > 0 && (
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
                    <div className="w-28 h-56 sm:w-32 sm:h-64 md:w-40 md:h-[350px]">
                      <Image
                        src={getEffectiveImage(baseScreens, i % baseScreens.length, currentCarouselCategory.categoryImage)}
                        alt={screen.name || 'App Screen'}
                        fill
                        className="object-contain drop-shadow-2xl pointer-events-none rounded-sm"
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
        )}
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
            className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-sm lg:text-base transition-all ${i === activeTab
              ? "bg-white shadow-xl scale-105"
              : "bg-white/80 hover:bg-white hover:shadow-md"
              }`}
            style={
              i === activeTab
                ? {
                  color: primaryColor,
                  borderBottom: `2px solid ${primaryColor}`,
                  borderRadius: "8px",
                }
                : { borderRadius: "8px" }
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
          <div className={`relative ${currentCategory.layout === 'web' ? 'w-full lg:w-[125%] -ml-[5%] lg:-ml-[12%]' : 'w-32 h-64 sm:w-44 sm:h-[340px] md:w-56 md:h-[400px] lg:w-64 lg:h-[480px]'}`}>
            {/* Primary Shadow Glow for Preview */}
            <div
              className="absolute inset-[10%] blur-[80px] opacity-20 -z-10"
              style={{ backgroundColor: primaryColor }}
            />
            <Image
              key={`${activeTab}-${selectedScreen}`}
              src={(currentCategory.layout === 'web' ? currentCategory.categoryImage : (screens[selectedScreen]?.image || (selectedScreen > 0 ? screens[selectedScreen - 1]?.image : null) || currentCategory.categoryImage)) || '/images/placeholder.png'}
              alt={screens[selectedScreen]?.name || 'App Preview'}
              fill={currentCategory.layout !== 'web'}
              width={currentCategory.layout === 'web' ? 1200 : undefined}
              height={currentCategory.layout === 'web' ? 800 : undefined}
              className={`object-contain  ${currentCategory.layout === 'web' ? 'w-full h-auto max-h-[600px]  p-2' : ''}`}
            />
          </div>
        </div>

        {/* List */}
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-4 mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {currentCategory.name} Features
            </h3>
            <div className="w-16 h-1 rounded-full" style={{ backgroundColor: primaryColor }} />
          </div>

          <div className="lg:max-h-[550px] overflow-y-auto pr-2 custom-scrollbar-stylish">
            <div className="space-y-3 sm:space-y-4 p-1">
              {screens.map((screen, i) => {
                const active = i === selectedScreen;
                return (
                  <button
                    key={screen.name}
                    type="button"
                    onMouseEnter={() => setSelectedScreen(i)}
                    className={`w-full flex items-start flex-col gap-1 sm:gap-2 bg-white px-4 sm:px-5 lg:px-6 py-3 sm:py-4 rounded-xl shadow-sm hover:shadow-lg text-left transition-all ${active ? "ring-2" : "opacity-80 hover:opacity-100"
                      }`}
                    style={
                      active
                        ? {
                          borderColor: primaryColor,
                          backgroundColor: `${primaryColor}10`,
                          ringColor: primaryColor,
                        }
                        : {}
                    }
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="rounded-full flex-shrink-0"
                        style={{
                          width: 10,
                          height: 10,
                          backgroundColor: active ? primaryColor : `${primaryColor}40`,
                        }}
                      />
                      <span
                        className={`text-sm sm:text-base lg:text-lg font-bold ${active ? "" : "text-slate-600"}`}
                        style={active ? { color: primaryColor } : {}}
                      >
                        {screen.name}
                      </span>
                    </div>
                    {screen.description && (
                      <div
                        className="text-xs sm:text-sm text-slate-500 pl-4.5 sm:pl-5 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: screen.description }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
