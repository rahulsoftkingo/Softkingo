import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";

// 👇 Static data — no backend, no animation, always the same
const TRUSTED_BRANDS = [
  { name: "Salomon", src: "/images/logo/potafologo.png", width: 100, height: 34 },
  { name: "Allbirds", src: "/images/logo/LoveLocal-logo.webp", width: 110, height: 34 },
  { name: "Stanley", src: "/images/logo/Moglix_logo.webp", width: 100, height: 34 },
  { name: "Arc'teryx", src: "/images/logo/practivoo.png", width: 100, height: 34 },
  { name: "Faber-Castell", src:"/images/logo/Bumpy_logo.webp", width: 120, height: 34 },
];

const EXPERT_AVATARS = [
  "/images/client/client2.png",
  "/images/client/client1.png",
  "/images/client/client3.png",
  "/images/client/client6.png",
];

export default function TrustedByCard({
  heading = "Trusted By 150,000+ Ecommerce Brands",
  brands = TRUSTED_BRANDS,
  avatars = EXPERT_AVATARS,
  recommendedText = "Recommended by more than 100+ e-commerce experts",
}) {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Card */}
      <div className="relative top-[-40px] rounded-2xl bg-[#F4F1EA] shadow-xl shadow-black/10">
        <div className="px-6 sm:px-10 py-8 sm:py-10 text-center">
          <h3 className="text-lg sm:text-xl font-bold text-[#0B1F2A]">{heading}</h3>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {brands.map((brand) => (
              <Image
                key={brand.name}
                src={brand.src}
                alt={brand.name}
                width={brand.width}
                height={brand.height}
                className="h-8 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recommended by experts row */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex -space-x-3">
          {avatars.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt="Industry expert"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
        <span className="h-8 w-px bg-gray-300" aria-hidden="true" />
        <p className="text-sm text-gray-500 text-left">{recommendedText}</p>
      </div>
    </div>
  );
}