"use client";

import Image from "next/image";

export default function TrustedBy() {
  const brands = [
    { id: 1, name: "Marshall", logo: "/assets/Brand Logos/Marshall.svg" },
    { id: 2, name: "Bose", logo: "/assets/Brand Logos/Bose.svg" },
    { id: 3, name: "Boat", logo: "/assets/Brand Logos/Boat.svg" },
    { id: 4, name: "Philips", logo: "/assets/Brand Logos/Philips.svg" },
    { id: 5, name: "SONY", logo: "/assets/Brand Logos/SONY.svg" },
    { id: 6, name: "JBL", logo: "/assets/Brand Logos/JBL.svg" },
  ];

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="bg-slate-900 py-12 md:py-16 overflow-x-hidden relative z-10" style={{ backgroundColor: '#0f172a' }}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center mb-8 md:mb-12" style={{ color: '#DEDBD4' }}>
            TRUSTED BY<span className="inline-block w-2 h-2 ml-0.5" style={{ backgroundColor: 'var(--color-primary)' }}></span>
          </h2>
        </div>
      </div>
      
      {/* First Moving Strip */}
      <div className="relative overflow-hidden mb-12 md:mb-16 md:-mx-6 lg:-mx-8">
        <div className="flex animate-scroll">
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex-shrink-0 mx-6 md:mx-8 lg:mx-12 flex items-center justify-center"
              style={{ width: "150px", height: "80px" }}
            >
              <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={150}
                  height={80}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second Moving Strip */}
      <div className="relative overflow-hidden md:-mx-6 lg:-mx-8">
        <div className="flex animate-scroll-reverse">
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.id}-second-${index}`}
              className="flex-shrink-0 mx-6 md:mx-8 lg:mx-12 flex items-center justify-center"
              style={{ width: "150px", height: "80px" }}
            >
              <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={150}
                  height={80}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
