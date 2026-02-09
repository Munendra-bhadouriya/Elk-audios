"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NavigationProps {
  variant?: "light" | "dark";
  className?: string;
  withAnimation?: boolean;
  showContent?: boolean;
  fixed?: boolean;
}

export default function Navigation({
  variant = "dark",
  className = "",
  withAnimation = false,
  showContent = true,
  fixed = false,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  const textColor = variant === "dark" ? "text-white" : "text-text";
  const hoverColor = variant === "dark" ? "hover:text-white/80" : "hover:text-secondary";

  const positionClass = fixed ? "fixed" : "absolute";
  const containerClasses = withAnimation
    ? `${positionClass} top-2 md:top-3 lg:top-4 left-4 md:left-6 lg:left-8 right-4 md:right-6 lg:right-8 z-20 transition-all duration-1000 ease-out ${
        showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      } ${className}`
    : `${positionClass} top-2 md:top-3 lg:top-4 left-4 md:left-6 lg:left-8 right-4 md:right-6 lg:right-8 z-20 ${className}`;

  return (
    <div className={`${containerClasses} flex items-center justify-between min-h-[52px] md:min-h-[56px] lg:min-h-[60px] py-2 md:py-3`}>
      {/* Logo - vertically centred with nav items */}
      <Link href="/" className="flex items-center justify-center z-30 relative shrink-0 h-9 md:h-11 lg:h-14 md:-translate-y-1 lg:-translate-y-1.5">
        <Image
          src="/assets/Logo White (1).svg"
          alt="Elk Audios Logo"
          width={200}
          height={56}
          className="h-full w-auto object-contain object-center block"
          priority
          style={{ filter: variant === "dark" ? "none" : "none" }}
        />
      </Link>

      {/* Navigation Items Container */}
      <div className="flex items-center gap-2">
      {/* Mobile Burger Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`md:hidden ${textColor} p-2.5 -m-2.5 rounded-md hover:bg-white/5 transition-colors`}
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
      <nav className="hidden md:flex items-center gap-6 lg:gap-8">
        {/* Products Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setProductsDropdownOpen(true)}
          onMouseLeave={() => setProductsDropdownOpen(false)}
        >
          <button
            className={`${textColor} text-sm lg:text-base font-body font-medium tracking-wide ${hoverColor} transition-colors duration-200 flex items-center gap-1.5 py-1`}
            aria-expanded={productsDropdownOpen}
            aria-haspopup="true"
          >
            Products
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
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
            <div className="absolute top-full right-0 pt-3 w-64 bg-transparent z-50">
              <div className="bg-white/95 backdrop-blur-sm border border-gray-200/80 rounded-xl shadow-xl py-2">
                <Link
                  href="/products/lifestyle-home-audio"
                  className="block px-4 py-2.5 text-sm text-text hover:bg-gray-50 transition-colors"
                >
                  Lifestyle & Home Audio
                </Link>
                <Link
                  href="/products/home-cinema"
                  className="block px-4 py-2.5 text-sm text-text hover:bg-gray-50 transition-colors"
                >
                  Home Cinema
                </Link>
                <Link
                  href="/products/boutique-architectural"
                  className="block px-4 py-2.5 text-sm text-text hover:bg-gray-50 transition-colors"
                >
                  Boutique Architectural
                </Link>
                <Link
                  href="/products/commercial-pava-av"
                  className="block px-4 py-2.5 text-sm text-text hover:bg-gray-50 transition-colors"
                >
                  Commercial PAVA & AV
                </Link>
                <Link
                  href="/build-your-own"
                  className="block px-4 py-2.5 text-sm text-text hover:bg-gray-50 transition-colors"
                >
                  Build Your Own
                </Link>
              </div>
            </div>
          )}
        </div>
        <Link
          href="/projects"
          className={`${textColor} text-sm lg:text-base font-body font-medium tracking-wide ${hoverColor} transition-colors duration-200 py-1`}
        >
          Projects
        </Link>
        <Link
          href="/about"
          className={`${textColor} text-sm lg:text-base font-body font-medium tracking-wide ${hoverColor} transition-colors duration-200 py-1`}
        >
          About Us
        </Link>
        <Link
          href="/contact"
          className={`${textColor} text-sm lg:text-base font-body font-medium tracking-wide ${hoverColor} transition-colors duration-200 py-1`}
        >
          Contact
        </Link>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full right-0 mt-3 w-56 bg-white/95 backdrop-blur-sm border border-gray-200/80 rounded-xl shadow-xl py-3 z-50">
          <nav className="flex flex-col gap-0.5">
            {/* Mobile Products Dropdown */}
            <div>
              <button
                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                className="w-full text-left px-4 py-2.5 text-sm font-medium text-text hover:bg-gray-50 hover:text-secondary transition-colors flex items-center justify-between"
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
                <div className="ml-4 mt-1 flex flex-col gap-0.5">
                  <Link
                    href="/products/lifestyle-home-audio"
                    className="px-4 py-2.5 text-sm text-text hover:bg-gray-50 hover:text-secondary transition-colors"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setProductsDropdownOpen(false);
                    }}
                  >
                    Lifestyle & Home Audio
                  </Link>
                  <Link
                    href="/products/home-cinema"
                    className="px-4 py-2.5 text-sm text-text hover:bg-gray-50 hover:text-secondary transition-colors"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setProductsDropdownOpen(false);
                    }}
                  >
                    Home Cinema
                  </Link>
                  <Link
                    href="/products/boutique-architectural"
                    className="px-4 py-2.5 text-sm text-text hover:bg-gray-50 hover:text-secondary transition-colors"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setProductsDropdownOpen(false);
                    }}
                  >
                    Boutique Architectural
                  </Link>
                  <Link
                    href="/products/commercial-pava-av"
                    className="px-4 py-2.5 text-sm text-text hover:bg-gray-50 hover:text-secondary transition-colors"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setProductsDropdownOpen(false);
                    }}
                  >
                    Commercial PAVA & AV
                  </Link>
                  <Link
                    href="/build-your-own"
                    className="px-4 py-2.5 text-sm text-text hover:bg-gray-50 hover:text-secondary transition-colors"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setProductsDropdownOpen(false);
                    }}
                  >
                    Build Your Own
                  </Link>
                </div>
              )}
            </div>
                  <Link
                    href="/projects"
                    className="px-4 py-2.5 text-sm font-medium text-text hover:bg-gray-50 hover:text-secondary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Projects
                  </Link>
            <Link
              href="/about"
              className="px-4 py-2.5 text-sm font-medium text-text hover:bg-gray-50 hover:text-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2.5 text-sm font-medium text-text hover:bg-gray-50 hover:text-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
      </div>
    </div>
  );
}
