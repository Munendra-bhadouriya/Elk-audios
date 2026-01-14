"use client";

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
    <section ref={sectionRef} className="relative py-16 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text mb-6 md:mb-8 lg:mb-10 text-center transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0ms" }}
          >
            About Us
          </h2>
          <p 
            className={`text-base md:text-lg lg:text-xl font-body text-text/80 leading-relaxed text-center max-w-3xl mx-auto transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Elk Audios designs high-end speaker environments that integrate seamlessly into their surroundings. We approach audio as a spatial element considering architecture, purpose, and aesthetics before recommending or configuring any system. Rather than selling individual products, we deliver carefully planned setups that enhance how a space is experienced, heard, and remembered.
          </p>
        </div>
      </div>
    </section>
  );
}
