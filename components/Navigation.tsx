"use client";

import Link from "next/link";
import { useState } from "react";

interface NavigationProps {
  variant?: "light" | "dark";
  className?: string;
  withAnimation?: boolean;
  showContent?: boolean;
}

export default function Navigation({
  variant = "dark",
  className = "",
  withAnimation = false,
  showContent = true,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  const textColor = variant === "dark" ? "text-white" : "text-text";
  const hoverColor = variant === "dark" ? "hover:text-white/80" : "hover:text-secondary";

  const containerClasses = withAnimation
    ? `absolute top-4 md:top-6 lg:top-8 right-4 md:right-6 lg:right-8 z-20 transition-all duration-1000 ease-out ${
        showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      } ${className}`
    : `absolute top-4 md:top-6 lg:top-8 right-4 md:right-6 lg:right-8 z-20 ${className}`;

  return (
    <div className={containerClasses}>
      {/* Mobile Burger Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`md:hidden ${textColor} p-2`}
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
            className={`${textColor} text-xs md:text-sm lg:text-base font-body ${hoverColor} transition-colors flex items-center gap-1`}
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
          className={`${textColor} text-xs md:text-sm lg:text-base font-body ${hoverColor} transition-colors`}
        >
          Projects
        </Link>
        <Link
          href="/build-your-own"
          className={`${textColor} text-xs md:text-sm lg:text-base font-body ${hoverColor} transition-colors`}
        >
          Build Your Own
        </Link>
        <Link
          href="/about"
          className={`${textColor} text-xs md:text-sm lg:text-base font-body ${hoverColor} transition-colors`}
        >
          About Us
        </Link>
        <Link
          href="/contact"
          className={`${textColor} text-xs md:text-sm lg:text-base font-body ${hoverColor} transition-colors`}
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
  );
}
