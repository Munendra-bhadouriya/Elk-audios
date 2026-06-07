"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function Section_6() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const percentage = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
    setPosition(percentage);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromClientX(event.clientX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  useEffect(() => {
    document.body.style.userSelect = isDragging ? "none" : "";
    return () => {
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return (
    <section className="w-full bg-[#0f172a] py-8 md:py-16">
      <div className="mx-auto w-full max-w-screen-2xl overflow-x-hidden px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-full flex-col items-center justify-center md:flex-row md:items-center md:gap-6 lg:gap-10">
          {/* Text: below slider on mobile, left column on desktop */}
          <div className="order-2 flex w-full min-w-0 max-w-xl flex-col justify-center gap-3 py-6 text-center text-white sm:max-w-2xl md:order-1 md:max-w-none md:flex-[2] md:basis-0 md:py-8 md:text-left lg:px-2">
            <h2 className="font-heading text-xl font-bold leading-tight tracking-tight sm:text-2xl md:text-3xl lg:text-4xl">
              See the transformation
            </h2>
            <p className="mx-auto max-w-prose text-justify text-sm leading-relaxed text-slate-200 sm:text-base md:mx-0 md:text-base lg:text-lg">
              Drag the handle to compare before and after your space is tuned for
              lifestyle home audio. From discreet placement to full-room immersion,
              every detail is balanced for how you live and listen.
            </p>
          </div>

          {/* Slider: top on mobile, right column on desktop */}
          <div className="order-1 flex w-full min-w-0 shrink-0 justify-center md:order-2 md:flex-[3] md:basis-0">
            <div
              ref={containerRef}
              className="relative h-[38vh] w-full touch-none select-none overflow-hidden border-2 border-white rounded-lg bg-[#0f172a] sm:h-[46vh] md:h-[60vh]"
              onClick={(event) => updateFromClientX(event.clientX)}
            >
              <Image
                src="/assets/slider-1.png"
                alt="Before lifestyle home audio setup"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-contain"
              />

              <Image
                src="/assets/slider-2.png"
                alt="After lifestyle home audio setup"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-contain"
                style={{ clipPath: `inset(0 0 0 ${position}%)` }}
              />

              <div
                role="slider"
                aria-label="Before and after image comparison"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(position)}
                tabIndex={0}
                className="absolute top-0 z-30 h-full w-8 -translate-x-1/2 cursor-ew-resize"
                style={{ left: `${position}%` }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    setPosition((prev) => clamp(prev - 2, 0, 100));
                  }
                  if (event.key === "ArrowRight") {
                    event.preventDefault();
                    setPosition((prev) => clamp(prev + 2, 0, 100));
                  }
                }}
              >
                <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-white" />
                <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#e0e0e0] bg-white text-[#666] shadow-md transition-transform duration-150 hover:scale-105">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[18px] w-[18px]"
                  >
                    <polyline points="5,12 10,7 10,17" />
                    <polyline points="19,12 14,7 14,17" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
