"use client";

import Link from "next/link";
import Image from "next/image";
import { usePreloader } from "@/contexts/PreloaderContext";
import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const { scrollProgress } = usePreloader();
  const [showContent, setShowContent] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      {/* Navigation - Top Right */}
      <div className={`absolute top-4 md:top-6 lg:top-8 right-4 md:right-6 lg:right-8 z-20 transition-all duration-1000 ease-out ${
        showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}>
        {/* Mobile Burger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3 md:gap-4 lg:gap-6 flex-wrap justify-end">
          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsDropdownOpen(true)}
            onMouseLeave={() => setProductsDropdownOpen(false)}
          >
            <button
              className="text-white text-xs md:text-sm lg:text-base font-body hover:text-white/80 transition-colors flex items-center gap-1"
              aria-expanded={productsDropdownOpen}
              aria-haspopup="true"
            >
              Products
              <svg
                className={`w-3 h-3 md:w-4 md:h-4 transition-transform ${
                  productsDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {productsDropdownOpen && (
              <div className="absolute top-full right-0 pt-2 w-64 bg-transparent z-50">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                  <Link
                    href="/products/lifestyle-home-audio"
                    className="block px-4 py-2 text-sm text-text hover:bg-gray-50 hover:text-secondary transition-colors"
                  >
                    Lifestyle & Home Audio
                  </Link>
                  <Link
                    href="/products/home-cinema"
                    className="block px-4 py-2 text-sm text-text hover:bg-gray-50 hover:text-secondary transition-colors"
                  >
                    Home Cinema
                  </Link>
                  <Link
                    href="/products/boutique-architectural"
                    className="block px-4 py-2 text-sm text-text hover:bg-gray-50 hover:text-secondary transition-colors"
                  >
                    Boutique Architectural
                  </Link>
                  <Link
                    href="/products/commercial-pava-av"
                    className="block px-4 py-2 text-sm text-text hover:bg-gray-50 hover:text-secondary transition-colors"
                  >
                    Commercial PAVA & AV
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link
            href="/projects"
            className="text-white text-xs md:text-sm lg:text-base font-body hover:text-white/80 transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/build-your-own"
            className="text-white text-xs md:text-sm lg:text-base font-body hover:text-white/80 transition-colors"
          >
            Build Your Own
          </Link>
          <Link
            href="/blogs"
            className="text-white text-xs md:text-sm lg:text-base font-body hover:text-white/80 transition-colors"
          >
            Blogs
          </Link>
          <Link
            href="/contact"
            className="text-white text-xs md:text-sm lg:text-base font-body hover:text-white/80 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
            <nav className="flex flex-col">
              {/* Mobile Products Dropdown */}
              <div>
                <button
                  onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                  className="w-full text-left px-4 py-2 text-sm text-text hover:bg-gray-50 hover:text-secondary transition-colors flex items-center justify-between"
                >
                  Products
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      productsDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {productsDropdownOpen && (
                  <div className="ml-4 mt-1 flex flex-col">
                    <Link
                      href="/products/lifestyle-home-audio"
                      className="px-4 py-2 text-sm text-text hover:bg-gray-50 hover:text-secondary transition-colors"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setProductsDropdownOpen(false);
                      }}
                    >
                      Lifestyle & Home Audio
                    </Link>
                    <Link
                      href="/products/home-cinema"
                      className="px-4 py-2 text-sm text-text hover:bg-gray-50 hover:text-secondary transition-colors"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setProductsDropdownOpen(false);
                      }}
                    >
                      Home Cinema
                    </Link>
                    <Link
                      href="/products/boutique-architectural"
                      className="px-4 py-2 text-sm text-text hover:bg-gray-50 hover:text-secondary transition-colors"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setProductsDropdownOpen(false);
                      }}
                    >
                      Boutique Architectural
                    </Link>
                    <Link
                      href="/products/commercial-pava-av"
                      className="px-4 py-2 text-sm text-text hover:bg-gray-50 hover:text-secondary transition-colors"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setProductsDropdownOpen(false);
                      }}
                    >
                      Commercial PAVA & AV
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/projects"
                className="px-4 py-2 text-sm text-text hover:bg-gray-50 hover:text-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/build-your-own"
                className="px-4 py-2 text-sm text-text hover:bg-gray-50 hover:text-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Build Your Own
              </Link>
              <Link
                href="/blogs"
                className="px-4 py-2 text-sm text-text hover:bg-gray-50 hover:text-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-sm text-text hover:bg-gray-50 hover:text-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
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
