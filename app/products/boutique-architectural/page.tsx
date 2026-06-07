"use client";

import "@/components/boutique/boutique-globals.css";
import ParallaxGallery from "@/components/boutique/ParallaxGallery";
import SplitSection from "@/components/boutique/SplitSection";
import LayoutSection from "@/components/boutique/LayoutSection";
import { useParallax } from "@/components/boutique/hooks/useParallax";
import { useHorizontalScroll } from "@/components/boutique/hooks/useHorizontalScroll";

export default function Page() {
  useParallax();
  useHorizontalScroll();

  return (
    <div
      className="text-white overflow-x-hidden relative"
      style={{ backgroundColor: "#0f172a" }}
    >
      <ParallaxGallery />
      <SplitSection />
      <LayoutSection />
    </div>
  );
}
