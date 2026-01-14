"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Category() {
  const [height, setHeight] = useState("calc(100vh - 3.5rem)");

  useEffect(() => {
    const updateHeight = () => {
      // Check if we're on mobile or desktop
      if (window.innerWidth >= 768) {
        setHeight("calc(100vh - 4rem)"); // Desktop: h-16 = 4rem
      } else {
        setHeight("calc(100vh - 3.5rem)"); // Mobile: h-14 = 3.5rem
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <section 
      className="relative w-full flex items-center justify-center"
      style={{ height }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/category/category 1.webp"
          alt="Category"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay for text readability if needed */}
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </section>
  );
}
