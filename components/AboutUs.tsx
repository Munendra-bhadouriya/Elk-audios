"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            // Reset visibility when section leaves viewport so animation can trigger again
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: "0px 0px -100px 0px", // Start animation slightly before it's fully in view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 lg:py-24 bg-slate-900">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Mobile View - Single Column */}
          <div className="md:hidden">
            <h2 
              className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 md:mb-8 lg:mb-10 text-center transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "0ms" }}
            >
              About Us
            </h2>
            <p 
              className={`text-base md:text-lg lg:text-xl font-body text-white/80 leading-relaxed text-justify md:text-left mb-6 transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Elk Audio designs high-end speaker environments that integrate seamlessly into their surroundings. Each system is conceived as part of the space itself considered, intentional, and visually restrained.
            </p>
            <p 
              className={`text-base md:text-lg lg:text-xl font-body text-white/80 leading-relaxed text-justify md:text-left mb-6 transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              We treat audio as a spatial element, giving equal weight to architecture, purpose, and aesthetics before recommending or configuring any system. Every decision is guided by how sound will live within the environment, not merely how it will perform.
            </p>
            <p 
              className={`text-base md:text-lg lg:text-xl font-body text-white/80 leading-relaxed text-justify md:text-left mb-6 transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              Rather than offering individual products, we deliver carefully planned audio setups that enhance how a space is experienced, heard, and remembered. Our work prioritizes balance, clarity, and coherence over excess.
            </p>
            <p 
              className={`text-base md:text-lg lg:text-xl font-body text-white/80 leading-relaxed text-justify md:text-left mb-6 transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              The result is sound that feels natural and immersive present without intrusion, refined without distraction. Elk Audio creates listening environments designed to endure, both technically and aesthetically.
            </p>
            <div 
              className={`text-center transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <Link
                href="/about"
                className="inline-block border-2 border-white text-white px-6 py-2.5 md:px-8 md:py-3 lg:px-10 lg:py-3.5 text-sm md:text-base lg:text-lg font-body font-medium rounded-full hover:bg-white hover:text-slate-900 transition-colors"
              >
                Know More
              </Link>
            </div>
          </div>

          {/* Desktop View - Two Columns */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="flex flex-col">
              <h2 
                className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 md:mb-8 lg:mb-10 transition-all duration-1000 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "0ms" }}
              >
                About Us
              </h2>
              <p 
                className={`text-base md:text-lg lg:text-xl font-body text-white/80 leading-relaxed mb-6 transition-all duration-1000 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                Elk Audio designs high-end speaker environments that integrate seamlessly into their surroundings. Each system is conceived as part of the space itself considered, intentional, and visually restrained.
              </p>
              <p 
                className={`text-base md:text-lg lg:text-xl font-body text-white/80 leading-relaxed transition-all duration-1000 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                We treat audio as a spatial element, giving equal weight to architecture, purpose, and aesthetics before recommending or configuring any system. Every decision is guided by how sound will live within the environment, not merely how it will perform.
              </p>
            </div>

            {/* Right Column */}
            <div className="flex flex-col justify-start">
              <p 
                className={`text-base md:text-lg lg:text-xl font-body text-white/80 leading-relaxed mb-6 transition-all duration-1000 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                Rather than offering individual products, we deliver carefully planned audio setups that enhance how a space is experienced, heard, and remembered. Our work prioritizes balance, clarity, and coherence over excess.
              </p>
              <p 
                className={`text-base md:text-lg lg:text-xl font-body text-white/80 leading-relaxed mb-6 md:mb-8 transition-all duration-1000 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                The result is sound that feels natural and immersive present without intrusion, refined without distraction. Elk Audio creates listening environments designed to endure, both technically and aesthetically.
              </p>
              <div 
                className={`transition-all duration-1000 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                <Link
                  href="/about"
                  className="inline-block border-2 border-white text-white px-6 py-2.5 md:px-8 md:py-3 lg:px-10 lg:py-3.5 text-sm md:text-base lg:text-lg font-body font-medium rounded-full hover:bg-white hover:text-slate-900 transition-colors"
                >
                  Know More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
