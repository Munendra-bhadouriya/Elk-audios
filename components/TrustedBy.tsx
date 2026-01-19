"use client";

import Image from "next/image";

export default function TrustedBy() {
  // Placeholder brand logos - replace with actual brand logo paths
  const brands = [
    { id: 1, name: "Brand 1", logo: "/assets/brands/brand1.png" },
    { id: 2, name: "Brand 2", logo: "/assets/brands/brand2.png" },
    { id: 3, name: "Brand 3", logo: "/assets/brands/brand3.png" },
    { id: 4, name: "Brand 4", logo: "/assets/brands/brand4.png" },
    { id: 5, name: "Brand 5", logo: "/assets/brands/brand5.png" },
    { id: 6, name: "Brand 6", logo: "/assets/brands/brand6.png" },
  ];

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="bg-slate-900 py-12 md:py-16 overflow-x-hidden relative z-10" style={{ backgroundColor: '#0f172a' }}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-body font-bold text-center mb-8 md:mb-12" style={{ color: '#DEDBD4' }}>
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
                {/* Placeholder - replace with actual Image component when logos are available */}
                <div className="w-full h-full bg-gray-700 rounded flex items-center justify-center text-gray-300 text-xs">
                  {brand.name}
                </div>
                {/* Uncomment when you have actual logos:
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={150}
                  height={80}
                  className="object-contain w-full h-full"
                />
                */}
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
                {/* Placeholder - replace with actual Image component when logos are available */}
                <div className="w-full h-full bg-gray-700 rounded flex items-center justify-center text-gray-300 text-xs">
                  {brand.name}
                </div>
                {/* Uncomment when you have actual logos:
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={150}
                  height={80}
                  className="object-contain w-full h-full"
                />
                */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
