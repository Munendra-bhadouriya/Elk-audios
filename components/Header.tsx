"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <nav className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-auto md:h-10 lg:h-12 flex items-center">
              <Image
                src="/assets/Elk Logo transparent.png"
                alt="Elk Audios Logo"
                width={200}
                height={60}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Navigation Links - Hidden on mobile, visible on tablet+ */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <button
                className="text-text text-sm lg:text-base font-body hover:text-secondary transition-colors flex items-center gap-1"
                aria-expanded={productsDropdownOpen}
                aria-haspopup="true"
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
                <div className="absolute top-full left-0 pt-2 w-64 bg-transparent z-50">
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
              className="text-text text-sm lg:text-base font-body hover:text-secondary transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/build-your-own"
              className="text-text text-sm lg:text-base font-body hover:text-secondary transition-colors"
            >
              Build Your Own
            </Link>
            <Link
              href="/blogs"
              className="text-text text-sm lg:text-base font-body hover:text-secondary transition-colors"
            >
              Blogs
            </Link>
            <Link
              href="/contact"
              className="text-text text-sm lg:text-base font-body hover:text-secondary transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Book Consultation Button */}
          <Link
            href="/consultation"
            className="bg-secondary text-white px-3 py-1.5 md:px-5 md:py-2 lg:px-6 lg:py-2.5 text-xs md:text-sm lg:text-base font-body font-medium rounded hover:bg-[#1e3a8a] transition-colors whitespace-nowrap"
          >
            Book Consultation
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-text p-2"
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
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              {/* Mobile Products Dropdown */}
              <div>
                <button
                  onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                  className="text-text text-base font-body hover:text-secondary transition-colors flex items-center justify-between w-full"
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
                  <div className="mt-2 ml-4 flex flex-col gap-2">
                    <Link
                      href="/products/lifestyle-home-audio"
                      className="text-text text-sm font-body hover:text-secondary transition-colors"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setProductsDropdownOpen(false);
                      }}
                    >
                      Lifestyle & Home Audio
                    </Link>
                    <Link
                      href="/products/home-cinema"
                      className="text-text text-sm font-body hover:text-secondary transition-colors"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setProductsDropdownOpen(false);
                      }}
                    >
                      Home Cinema
                    </Link>
                    <Link
                      href="/products/boutique-architectural"
                      className="text-text text-sm font-body hover:text-secondary transition-colors"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setProductsDropdownOpen(false);
                      }}
                    >
                      Boutique Architectural
                    </Link>
                    <Link
                      href="/products/commercial-pava-av"
                      className="text-text text-sm font-body hover:text-secondary transition-colors"
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
                className="text-text text-base font-body hover:text-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/build-your-own"
                className="text-text text-base font-body hover:text-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Build Your Own
              </Link>
              <Link
                href="/blogs"
                className="text-text text-base font-body hover:text-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link
                href="/contact"
                className="text-text text-base font-body hover:text-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
