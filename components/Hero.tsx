"use client";

import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import { usePreloader } from "@/contexts/PreloaderContext";
import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const { scrollProgress } = usePreloader();
  const [showContent, setShowContent] = useState(false);
  const hasShownRef = useRef(false);

  useEffect(() => {
    // Only show content when preloader reveal is actively happening (60% or more)
    // This ensures text appears during the reveal animation, not before
    if (scrollProgress >= 0.6) {
      if (!hasShownRef.current) {
        hasShownRef.current = true;
        // Small delay before starting animation to sync with reveal
        setTimeout(() => {
          setShowContent(true);
        }, 400);
      } else {
        // Keep content visible once shown
        setShowContent(true);
      }
    } else {
      // Hide content when preloader is active (before reveal)
      setShowContent(false);
      if (scrollProgress < 0.3) {
        hasShownRef.current = false;
      }
    }
  }, [scrollProgress]);

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Navigation - Top Right with Animation */}
      <Navigation variant="dark" withAnimation={true} showContent={showContent} />
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full">
          <Image
            src="/assets/hero section bg image.avif"
            alt="Professional audio studio"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Small "Elk Audios" text and tagline */}
          <div 
            className={`mb-12 md:mb-16 lg:mb-20 transition-all duration-1000 ease-out ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
            style={{ transitionDelay: showContent ? "0ms" : "0ms" }}
          >
            <p className="text-white/60 text-xs md:text-sm lg:text-base font-body tracking-wider uppercase mb-1 md:mb-1.5 lg:mb-2">
              Elk Audios
            </p>
            <p className="text-white/75 text-sm md:text-base lg:text-lg font-body">
              Designed with intention. Delivered with precision.
            </p>
          </div>

          {/* Main Heading */}
          <div 
            className={`mb-12 md:mb-16 lg:mb-20 flex justify-center transition-all duration-1000 ease-out ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-[1.1] tracking-tight lg:whitespace-nowrap text-center">
              Sound, Designed to Belong
            </h1>
          </div>

          {/* Description */}
          <div 
            className={`mb-12 md:mb-16 lg:mb-20 max-w-2xl mx-auto transition-all duration-1000 ease-out ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <p className="text-white/85 text-base md:text-lg lg:text-xl xl:text-2xl font-body leading-relaxed">
              Bespoke audio environments designed to elevate how spaces feel,
              move, and resonate.
            </p>
          </div>

          {/* CTA Button */}
          <div 
            className={`transition-all duration-1000 ease-out ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <Link
              href="/consultation"
              className="inline-block border-2 border-white text-white px-6 py-2.5 md:px-8 md:py-3 lg:px-10 lg:py-3.5 text-sm md:text-base lg:text-lg font-body font-medium rounded-full hover:bg-white hover:text-black transition-colors"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
