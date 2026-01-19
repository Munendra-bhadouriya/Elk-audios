"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [backgroundSize, setBackgroundSize] = useState(120);
  const [blur, setBlur] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [opaqueOpacity, setOpaqueOpacity] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
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
    <div className="relative min-h-screen bg-[#232323]">
      {/* Navigation - Top Right */}
      <div 
        className={`absolute top-4 md:top-6 lg:top-8 right-4 md:right-6 lg:right-8 z-20 transition-all duration-1000 ease-out ${
          contentVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
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
            href="/about"
            className="text-white text-xs md:text-sm lg:text-base font-body hover:text-white/80 transition-colors"
          >
            About Us
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
                href="/about"
                className="px-4 py-2 text-sm text-text hover:bg-gray-50 hover:text-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
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

      <div className="relative min-h-screen">
        {/* Feature Background */}
        <div
          className="feature fixed top-0 left-0 right-0 bottom-0 z-0 w-full h-full"
          style={{
            backgroundImage: "url(http://s3.nikecdn.com/pass/NikeBasketball/LeBron_Poster.jpg)",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: `${backgroundSize}%`,
            backgroundAttachment: "fixed",
            boxShadow: "0 -50px 20px -20px #232323 inset",
            filter: `blur(${blur}px)`,
            opacity: opacity,
          }}
        >
          <div
            className="opaque absolute inset-0 bg-[#d2d6f1]"
            style={{ opacity: opaqueOpacity }}
          />
        </div>

        {/* Content */}
        <div className="content relative z-10 flex items-center justify-center min-h-screen md:h-screen w-[95%] mx-auto md:w-[60%] py-8 md:py-0 pb-20 md:pb-0">
          <div 
            className={`bg-gray-800/97 backdrop-blur-md rounded-2xl md:rounded-lg p-6 md:p-12 w-full transition-all duration-1000 ease-out md:bg-gray-800/99 md:backdrop-blur-sm ${
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
              Elk Audio designs high-end speaker environments that integrate seamlessly into their surroundings. Each system is conceived as part of the space itself considered, intentional, and visually restrained.
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
              The result is sound that feels natural and immersive present without intrusion, refined without distraction. Elk Audio creates listening environments designed to endure, both technically and aesthetically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
