"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function ProjectsTestimonialsSwiper() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Sample projects/testimonials data - replace with actual data
  const items = [
    {
      id: 1,
      title: "LUXURY HOME AUDIO SETUP",
      location: "MUMBAI, MAHARASHTRA",
      image: "/assets/hero section bg image.avif",
      testimonial: "Elk Audios transformed our living space with an incredible sound system.",
    },
    {
      id: 2,
      title: "COMMERCIAL INSTALLATION",
      location: "DELHI, NCR",
      image: "/assets/hero section bg temp.jpg",
      testimonial: "Professional service and outstanding audio quality for our office space.",
    },
    {
      id: 3,
      title: "PREMIUM STUDIO SYSTEM",
      location: "BANGALORE, KARNATAKA",
      image: "/assets/category/category 1.webp",
      testimonial: "The perfect audio solution for our recording studio needs.",
    },
    {
      id: 4,
      title: "RESIDENTIAL AUDIO SOLUTIONS",
      location: "GOA",
      image: "/assets/category/category 2.avif",
      testimonial: "Seamless integration and exceptional sound quality throughout our home.",
    },
    {
      id: 5,
      title: "RESTAURANT AUDIO SYSTEM",
      location: "PUNE, MAHARASHTRA",
      image: "/assets/category/category 3.avif",
      testimonial: "Created the perfect ambiance for our restaurant guests.",
    },
    {
      id: 6,
      title: "ENTERTAINMENT SPACE",
      location: "HYDERABAD, TELANGANA",
      image: "/assets/category/category 4.webp",
      testimonial: "Amazing audio experience that enhances every moment.",
    },
  ];

  useEffect(() => {
    if (swiper) {
      const handleSlideChange = () => {
        setActiveIndex(swiper.realIndex);
      };
      handleSlideChange(); // Set initial index
      swiper.on("slideChange", handleSlideChange);
      return () => {
        swiper.off("slideChange", handleSlideChange);
      };
    }
  }, [swiper]);

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 tracking-[0.15em] uppercase" style={{ color: '#DC2626', letterSpacing: '0.15em' }}>
          PROJECTS & TESTIMONIALS
        </h2>
      </div>

        {/* Swiper Container */}
        <div className="relative w-full">
          <Swiper
            onSwiper={setSwiper}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            speed={800}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            spaceBetween={50}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            navigation={false}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            className="projects-testimonials-swiper"
            touchRatio={1}
            touchAngle={45}
            resistance={true}
            resistanceRatio={0.85}
            breakpoints={{
              320: {
                spaceBetween: 20,
              },
              768: {
                spaceBetween: 50,
              },
              1024: {
                spaceBetween: 70,
              },
            }}
          >
            {items.map((item, index) => {
              // Use activeIndex state for loop mode compatibility
              const isActive = activeIndex === index;
              return (
                <SwiperSlide key={item.id}>
                  <div className="relative">
                    {/* Card Container */}
                    <div
                      className={`relative rounded-[2rem] md:rounded-[3rem] overflow-hidden ${
                        isActive
                          ? "opacity-100 grayscale-0 z-10"
                          : "opacity-70 grayscale z-0"
                      }`}
                      style={{
                        aspectRatio: "16/10",
                        minHeight: "400px",
                        maxHeight: "600px",
                        backgroundColor: isActive ? "transparent" : "transparent",
                        transform: isActive ? "scale(0.75)" : "scale(1.1)",
                        transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 40vw"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                      
                      {/* Premium gray tint overlay for inactive cards */}
                      {!isActive && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/60 via-slate-700/50 to-slate-800/60" style={{ mixBlendMode: "multiply" }} />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
                        </>
                      )}
                      
                      {/* Overlay for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10">
                        <h3 className="text-xl md:text-2xl font-bold mb-2 uppercase tracking-wide">
                          {item.title}
                        </h3>
                        <p className="text-sm md:text-base opacity-90 mb-3">
                          {item.testimonial}
                        </p>
                        <p className="text-xs md:text-sm font-semibold uppercase tracking-wider opacity-80">
                          {item.location}
                        </p>
                      </div>
                    </div>

                    {/* Location Text Below Card (for active slide) */}
                    {isActive && (
                      <div className="-mt-2 text-center">
                        <p className="text-sm md:text-base font-bold uppercase tracking-wider text-gray-800">
                          {item.location}
                        </p>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Pagination */}
          <div className="swiper-pagination mt-8" />
        </div>

      <style jsx global>{`
        .projects-testimonials-swiper {
          padding-bottom: 60px;
        }

        .projects-testimonials-swiper .swiper-wrapper {
          background: transparent;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .projects-testimonials-swiper .swiper-slide {
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity;
        }

        .projects-testimonials-swiper .swiper-slide {
          width: 85%;
          max-width: 600px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          background: transparent !important;
        }

        @media (min-width: 640px) {
          .projects-testimonials-swiper .swiper-slide {
            width: 80%;
          }
        }

        .projects-testimonials-swiper .swiper-slide-active {
          z-index: 10;
        }

        .projects-testimonials-swiper .swiper-slide:not(.swiper-slide-active) {
          z-index: 1;
        }

        .projects-testimonials-swiper .swiper-slide > div {
          background: transparent !important;
        }

        .projects-testimonials-swiper .swiper-slide > div > div {
          background: transparent !important;
        }

        .projects-testimonials-swiper .swiper-slide img {
          background: transparent;
        }

        @media (min-width: 768px) {
          .projects-testimonials-swiper .swiper-slide {
            width: 70%;
            max-width: 700px;
          }
        }

        @media (min-width: 1024px) {
          .projects-testimonials-swiper .swiper-slide {
            width: 60%;
            max-width: 800px;
          }
        }

        .projects-testimonials-swiper .swiper-button-next,
        .projects-testimonials-swiper .swiper-button-prev {
          display: none !important;
        }

        .projects-testimonials-swiper .swiper-pagination-bullet {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .projects-testimonials-swiper .swiper-pagination-bullet {
          background: #DC2626;
          opacity: 0.3;
        }

        .projects-testimonials-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .projects-testimonials-swiper .swiper-button-next,
          .projects-testimonials-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
