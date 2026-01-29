"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [backgroundSize, setBackgroundSize] = useState(120);
  const [blur, setBlur] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [opaqueOpacity, setOpaqueOpacity] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const fromTop = window.scrollY;
      const htmlHeight = document.documentElement.scrollHeight;
      const featureWidth = window.innerWidth;
      // Start at 120% (slight zoom) and zoom out (decrease) as you scroll
      const initialSize = 120;
      const scrollReduction = fromTop / 15; // Adjust scroll sensitivity
      const newSize = Math.max(100, initialSize - scrollReduction);

      setScrollY(fromTop);

      if (newSize >= 100) {
        setBackgroundSize(newSize);
        setBlur(Math.min(10, fromTop / 100)); // Cap blur at 10px
        setOpacity(Math.max(0, 1 - (fromTop / htmlHeight) * 1.3));
      }

      // Opaque overlay for non-Chrome/Safari browsers
      const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
      const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
      
      if (!isChrome && !isSafari) {
        setOpaqueOpacity(Math.min(1, 0 + fromTop / 5000));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Trigger content animation after a short delay
    const timer = setTimeout(() => {
      setContentVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-900">
      <div className="relative min-h-screen">
        {/* Feature Background */}
        <div
          className="feature fixed top-0 left-0 right-0 bottom-0 z-0 w-full h-full"
          style={{
            backgroundImage: 'url("/assets/category/category 4.webp")',
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: `${backgroundSize}%`,
            backgroundAttachment: "fixed",
            boxShadow: "0 -60px 40px -30px rgba(15, 23, 42, 0.6) inset",
            filter: `grayscale(100%) blur(${blur}px)`,
            opacity: opacity,
          }}
        >
          <div
            className="opaque absolute inset-0 bg-slate-900/90"
            style={{ opacity: opaqueOpacity }}
          />
          {/* Chic dark overlay - refined, premium */}
          <div className="absolute inset-0 bg-slate-900/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/40" />
        </div>

        {/* Content */}
        <div className="content relative z-10 flex items-center justify-center min-h-screen md:h-screen w-[95%] mx-auto md:w-[60%] py-8 md:py-0 pb-20 md:pb-0">
          <div 
            className={`rounded-2xl md:rounded-lg p-6 md:p-12 w-full transition-all duration-1000 ease-out ${
              contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 
              className={`text-2xl md:text-4xl font-heading font-bold mb-5 md:mb-6 text-white transition-all duration-1000 ease-out tracking-tight md:tracking-normal ${
                contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "200ms", lineHeight: "1.2" }}
            >
              About Us
            </h2>
            <p 
              className={`text-sm md:text-lg font-body text-white/95 md:text-white/90 mb-5 md:mb-6 leading-[1.7] md:leading-relaxed transition-all duration-1000 ease-out ${
                contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              Elk Audios designs high-end speaker environments that integrate seamlessly into their surroundings. Each system is conceived as part of the space itself considered, intentional, and visually restrained.
            </p>
            <p 
              className={`text-sm md:text-lg font-body text-white/95 md:text-white/90 mb-5 md:mb-6 leading-[1.7] md:leading-relaxed transition-all duration-1000 ease-out ${
                contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              We treat audio as a spatial element, giving equal weight to architecture, purpose, and aesthetics before recommending or configuring any system. Every decision is guided by how sound will live within the environment, not merely how it will perform.
            </p>
            <p 
              className={`text-sm md:text-lg font-body text-white/95 md:text-white/90 mb-5 md:mb-6 leading-[1.7] md:leading-relaxed transition-all duration-1000 ease-out ${
                contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              Rather than offering individual products, we deliver carefully planned audio setups that enhance how a space is experienced, heard, and remembered. Our work prioritizes balance, clarity, and coherence over excess.
            </p>
            <p 
              className={`text-sm md:text-lg font-body text-white/95 md:text-white/90 mb-5 md:mb-6 leading-[1.7] md:leading-relaxed transition-all duration-1000 ease-out ${
                contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              The result is sound that feels natural and immersive present without intrusion, refined without distraction. Elk Audios creates listening environments designed to endure, both technically and aesthetically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
