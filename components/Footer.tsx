"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white py-12 md:py-16 relative z-10" style={{ backgroundColor: '#ffffff' }}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Logo and Description */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center justify-center md:justify-start mb-4">
                <div className="relative h-14 w-auto md:h-16 flex items-center">
                  <Image
                    src="/assets/Logo_PNG_Withou_brand_line.svg"
                    alt="Elk Audios Logo"
                    width={200}
                    height={60}
                    className="h-full w-auto object-contain"
                  />
                </div>
              </Link>
              <p className="text-gray-600 text-xs md:text-sm font-body mb-3 text-center md:text-left">
                A Unit of Globe Audios
              </p>
              <p className="text-gray-800 text-sm md:text-base font-body italic text-center md:text-left">
                Designed with intention. Delivered with precision.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg md:text-xl font-heading font-bold mb-4 text-slate-900">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-700 hover:text-slate-900 transition-colors text-sm md:text-base font-body"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="text-gray-700 hover:text-slate-900 transition-colors text-sm md:text-base font-body"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-700 hover:text-slate-900 transition-colors text-sm md:text-base font-body"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg md:text-xl font-heading font-bold mb-4 text-slate-900">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/consultation"
                    className="text-gray-700 hover:text-slate-900 transition-colors text-sm md:text-base font-body"
                  >
                    Book Consultation
                  </Link>
                </li>
                <li>
                  <span className="text-gray-700 text-sm md:text-base font-body">
                    Home Audio Systems
                  </span>
                </li>
                <li>
                  <span className="text-gray-700 text-sm md:text-base font-body">
                    Professional AV Systems
                  </span>
                </li>
                <li>
                  <span className="text-gray-700 text-sm md:text-base font-body">
                    Commercial Installations
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg md:text-xl font-heading font-bold mb-4 text-slate-900">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-700 text-sm md:text-base font-body">
                  Email: info@elkaudios.com
                </li>
                <li className="text-gray-700 text-sm md:text-base font-body">
                  Phone: +1 (555) 123-4567
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 mt-8 md:mt-12 pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-xs md:text-sm font-body text-center md:text-left">
                © {new Date().getFullYear()} Elk Audios. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-slate-900 transition-colors text-xs md:text-sm font-body"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-slate-900 transition-colors text-xs md:text-sm font-body"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
