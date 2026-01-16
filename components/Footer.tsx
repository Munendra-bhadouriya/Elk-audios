"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Logo and Description */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center mb-4">
                <div className="relative h-14 w-auto md:h-16 flex items-center">
                  <Image
                    src="/assets/Elk Logo transparent.png"
                    alt="Elk Audios Logo"
                    width={200}
                    height={60}
                    className="h-full w-auto object-contain"
                  />
                </div>
              </Link>
              <p className="text-white/60 text-xs md:text-sm font-body mb-3">
                A Unit of Globe Audios
              </p>
              <p className="text-white/80 text-sm md:text-base font-body italic">
                Designed with intention. Delivered with precision.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg md:text-xl font-heading font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-white/70 hover:text-white transition-colors text-sm md:text-base font-body"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="text-white/70 hover:text-white transition-colors text-sm md:text-base font-body"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="text-white/70 hover:text-white transition-colors text-sm md:text-base font-body"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white/70 hover:text-white transition-colors text-sm md:text-base font-body"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg md:text-xl font-heading font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/consultation"
                    className="text-white/70 hover:text-white transition-colors text-sm md:text-base font-body"
                  >
                    Book Consultation
                  </Link>
                </li>
                <li>
                  <span className="text-white/70 text-sm md:text-base font-body">
                    Home Audio Systems
                  </span>
                </li>
                <li>
                  <span className="text-white/70 text-sm md:text-base font-body">
                    Professional AV Systems
                  </span>
                </li>
                <li>
                  <span className="text-white/70 text-sm md:text-base font-body">
                    Commercial Installations
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg md:text-xl font-heading font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-white/70 text-sm md:text-base font-body">
                  Email: info@elkaudios.com
                </li>
                <li className="text-white/70 text-sm md:text-base font-body">
                  Phone: +1 (555) 123-4567
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 mt-8 md:mt-12 pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/60 text-xs md:text-sm font-body text-center md:text-left">
                © {new Date().getFullYear()} Elk Audios. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/privacy"
                  className="text-white/60 hover:text-white transition-colors text-xs md:text-sm font-body"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-white/60 hover:text-white transition-colors text-xs md:text-sm font-body"
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
