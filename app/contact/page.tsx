"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    // Handle form submission here
    reset();
  };

  return (
    <main className="relative bg-slate-900 text-white min-h-screen">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <div className="w-full h-full">
          <Image
            src="/assets/IMG_6506.JPG"
            alt="Contact background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-slate-900/70"></div>
        </div>
      </div>

      {/* Get In Touch Banner Section */}
      <section className="relative z-10 py-16 md:py-20 lg:py-24 border-b border-gray-800/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.1] tracking-tight mb-4 md:mb-6">
              Get In Touch
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-body max-w-2xl mx-auto">
              Ready to transform your space with exceptional audio? Let&apos;s start a conversation about your vision.
            </p>
          </div>
        </div>
      </section>

      {/* Book Consultation Section */}
      <section ref={sectionRef} className="relative z-10 py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Side - Heading, Description, Button */}
              <div className={`transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 md:mb-8">
                  Book Consultation
                </h2>
                <p className="text-base md:text-lg text-gray-300 font-body leading-relaxed mb-8 md:mb-10">
                  Schedule a personalized consultation with our audio experts. We&apos;ll discuss your space, preferences, and create a tailored solution that perfectly matches your vision and lifestyle.
                </p>
                <p className="text-base md:text-lg text-gray-300 font-body leading-relaxed mb-8 md:mb-10">
                  Our team will guide you through every step, from initial concept to final installation, ensuring an exceptional audio experience that seamlessly integrates into your environment.
                </p>
                <button
                  type="button"
                  className="inline-block border-2 border-white text-white px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-body font-medium rounded-full hover:bg-white hover:text-slate-900 transition-colors"
                  onClick={() => {
                    const formElement = document.getElementById("consultation-form");
                    formElement?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Book Consultation
                </button>
              </div>

              {/* Right Side - Consultation Form */}
              <div 
                id="consultation-form"
                className={`transition-all duration-1000 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                {/* Premium Form Container with Balanced Golden Look */}
                <div className="relative bg-gradient-to-br from-slate-900/70 via-slate-800/50 to-slate-900/70 backdrop-blur-xl rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 p-8 md:p-10 lg:p-12">
                  {/* Subtle golden accents */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/8 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-400/5 rounded-full blur-3xl"></div>
                  </div>
                  
                  {/* Refined border */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl border border-amber-500/15"></div>
                    <div className="absolute inset-[1px] rounded-2xl border border-white/5"></div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-7">
                    <div>
                      <label 
                        htmlFor="name" 
                        className="block text-sm font-body text-gray-300 mb-3 font-medium tracking-wide"
                      >
                        Full Name <span className="text-amber-400/60">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-5 py-4 bg-black/25 backdrop-blur-sm border border-amber-500/15 rounded-xl text-white placeholder-gray-500 outline-none focus-visible:outline-none focus:outline-none focus:ring-1 focus:ring-amber-400/40 focus:border-amber-400/30 transition-all duration-300 font-body hover:border-amber-500/20 focus:bg-black/35"
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-amber-300/90 font-body">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label 
                        htmlFor="email" 
                        className="block text-sm font-body text-gray-300 mb-3 font-medium tracking-wide"
                      >
                        Email Address <span className="text-amber-400/60">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        })}
                        className="w-full px-5 py-4 bg-black/25 backdrop-blur-sm border border-amber-500/15 rounded-xl text-white placeholder-gray-500 outline-none focus-visible:outline-none focus:outline-none focus:ring-1 focus:ring-amber-400/40 focus:border-amber-400/30 transition-all duration-300 font-body hover:border-amber-500/20 focus:bg-black/35"
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-amber-300/90 font-body">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label 
                        htmlFor="phone" 
                        className="block text-sm font-body text-gray-300 mb-3 font-medium tracking-wide"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...register("phone")}
                        className="w-full px-5 py-4 bg-black/25 backdrop-blur-sm border border-amber-500/15 rounded-xl text-white placeholder-gray-500 outline-none focus-visible:outline-none focus:outline-none focus:ring-1 focus:ring-amber-400/40 focus:border-amber-400/30 transition-all duration-300 font-body hover:border-amber-500/20 focus:bg-black/35"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="message" 
                        className="block text-sm font-body text-gray-300 mb-3 font-medium tracking-wide"
                      >
                        Message <span className="text-amber-400/60">*</span>
                      </label>
                      <textarea
                        id="message"
                        {...register("message", { required: "Message is required" })}
                        rows={5}
                        className="w-full px-5 py-4 bg-black/25 backdrop-blur-sm border border-amber-500/15 rounded-xl text-white placeholder-gray-500 outline-none focus-visible:outline-none focus:outline-none focus:ring-1 focus:ring-amber-400/40 focus:border-amber-400/30 transition-all duration-300 font-body resize-none hover:border-amber-500/20 focus:bg-black/35 leading-relaxed"
                        placeholder="Tell us about your project..."
                      />
                      {errors.message && (
                        <p className="mt-2 text-sm text-amber-300/90 font-body">{errors.message.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full group relative overflow-hidden border-2 border-amber-500/30 bg-amber-500/10 backdrop-blur-sm text-white px-10 py-5 text-base md:text-lg font-body font-medium rounded-full hover:border-amber-400/40 hover:bg-amber-500/15 transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] mt-2"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Submit Inquiry
                        <svg
                          className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      {/* Subtle golden shine effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="relative z-10 py-16 md:py-20 lg:py-24 border-t border-gray-800/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-12 md:mb-16 text-center">
              Contact Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Email */}
              <div className="text-center flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500/15 via-amber-400/10 to-transparent backdrop-blur-sm border border-amber-500/20 rounded-full mb-4 shadow-lg shadow-amber-500/5 hover:border-amber-400/30 transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-amber-300"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Email</h3>
                <p className="text-gray-300 font-body">
                  <a href="mailto:info@elkaudios.com" className="hover:text-amber-300 transition-colors">
                    info@elkaudios.com
                  </a>
                </p>
              </div>

              {/* Phone */}
              <div className="text-center flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500/15 via-amber-400/10 to-transparent backdrop-blur-sm border border-amber-500/20 rounded-full mb-4 shadow-lg shadow-amber-500/5 hover:border-amber-400/30 transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-amber-300"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Phone</h3>
                <p className="text-gray-300 font-body">
                  <a href="tel:+15551234567" className="hover:text-amber-300 transition-colors">
                    +1 (555) 123-4567
                  </a>
                </p>
              </div>

              {/* Address */}
              <div className="text-center flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500/15 via-amber-400/10 to-transparent backdrop-blur-sm border border-amber-500/20 rounded-full mb-4 shadow-lg shadow-amber-500/5 hover:border-amber-400/30 transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-amber-300"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Address</h3>
                <p className="text-gray-300 font-body">
                  123 Audio Street<br />
                  San Francisco, CA 94102<br />
                  United States
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="relative z-10 py-16 md:py-20 lg:py-24 border-t border-gray-800/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-12 md:mb-16 text-center">
              Find Us
            </h2>
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 shadow-xl shadow-amber-500/5">
              {/* Premium Google Maps Embed with Dark Theme */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.702339408982!2d77.43850189999999!3d23.217516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c430000ddddf1%3A0xa7d86503fe0c0be5!2sELK%20Audios!5e0!3m2!1sen!2sin!4v1769250464080!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'brightness(0.6) contrast(1.2) saturate(0.7) grayscale(0.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
                title="Elk Audios Location"
              />
              {/* Dark overlay to match placeholder tint (bg-black/25 like form inputs) */}
              <div className="absolute inset-0 bg-black/25 pointer-events-none mix-blend-multiply"></div>
              {/* Additional subtle darkening to match premium look */}
              <div className="absolute inset-0 bg-slate-900/10 pointer-events-none"></div>
              {/* Golden border accent matching the container */}
              <div className="absolute inset-0 rounded-lg pointer-events-none border border-amber-500/20"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
