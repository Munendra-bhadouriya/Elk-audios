"use client";

import Image from "next/image";

export default function Category() {
  const categories = [
    {
      title: "Home Audio Systems",
      description: "Purpose-built speaker setups for residences.",
      image: "/assets/category/category 1.webp",
    },
    {
      title: "Lifestyle Audio Solutions",
      description: "Design-forward audio systems for modern living.",
      image: "/assets/category/category 2.avif",
    },
    {
      title: "Professional AV Systems",
      description: "Precision-driven audio-visual environments.",
      image: "/assets/category/category 3.avif",
    },
    {
      title: "Commercial Audio Installations",
      description: "Strategic sound solutions for commercial spaces.",
      image: "/assets/category/category 4.webp",
    },
  ];

  return (
    <section className="relative">
      {categories.map((category, index) => (
        <div
          key={index}
          className="sticky top-0 h-screen flex flex-col items-center justify-center relative overflow-hidden"
        >
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover"
            quality={90}
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="relative z-20 text-white text-center px-4">
            <div className="inline-block relative">
              <h2 className="text-4xl font-bold">{category.title}</h2>

              {/* Desktop arrow - inline with heading */}
              <span className="hidden md:inline-flex items-center justify-center ml-2 align-middle translate-y-[0.1875rem]">
                <svg
                  className="w-9 h-9 md:w-10 md:h-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 12H17M13 8L17 12L13 16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              {/* Mobile arrow - aligned to last line (bottom-right of heading box) */}
              <span className="absolute right-0 bottom-[0.1em] inline-flex md:hidden items-center justify-center">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 12H17M13 8L17 12L13 16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <p className="mt-2">{category.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
