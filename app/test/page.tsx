"use client";

import { useEffect } from "react";
import Lenis from "lenis";
const ARCH_IMAGE =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=85";
const SPLIT_IMAGE =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85";

export default function TestPage() {
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true });
    const images = document.querySelectorAll(".parallax-img");
    const currentY = new Map();
    const LERP_FACTOR = 0.08;

    function parallaxScroll(time: number) {
      lenis.raf(time);

      images.forEach((img) => {
        const windowBox = img.parentElement!.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const progress =
          (viewportHeight - windowBox.top) /
          (viewportHeight + windowBox.height);

        const clamped = Math.min(Math.max(progress, 0), 1);

        const windowHeight = windowBox.height;
        const maxTravel = windowHeight * 2.5 - windowHeight;
        const targetY = clamped * maxTravel;

        const prev = currentY.get(img) ?? targetY;
        const next = prev + (targetY - prev) * LERP_FACTOR;
        currentY.set(img, next);

        (img as HTMLElement).style.transform = `translateY(${next}px)`;
      });

      rafId = requestAnimationFrame(parallaxScroll);
    }

    let rafId = requestAnimationFrame(parallaxScroll);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const section = document.querySelector(".scroll-section");
    const textTracks = document.querySelectorAll(".text-track");
    const textWrapper = document.querySelector(".text-wrapper-container");
    // const zoneImage = document.querySelector(".zone-image");
    // const outlineText = document.getElementById("outlineText");

    if (!section || textTracks.length === 0 || !textWrapper) return;

    let currentX = 50;
    let targetX = 50;

    const lenis = new Lenis({
      // Longer duration for a more relaxed, premium feel
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function onScroll(e: any) {
      const scroll = e.scroll;
      const textWrapperElement = textWrapper as HTMLElement;
      const wrapperRect = textWrapperElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Check if text wrapper is visible in viewport
      const isVisible = wrapperRect.top < viewportHeight && wrapperRect.bottom > 0;
      
      if (!isVisible) {
        // Keep text at initial position when not visible
        targetX = 50;
        return;
      }

      const sectionElement = section as HTMLElement;
      const sectionTop = sectionElement.offsetTop;
      const maxScroll = sectionElement.offsetHeight - window.innerHeight;
      const progress = Math.min(
        Math.max((scroll - sectionTop) / maxScroll, 0),
        1
      );
      // Ease the progress so motion ramps up gently
      const easedProgress = Math.pow(progress, 2.2);
      // Further reduce travel distance so each scroll moves the text less
      targetX = 50 - easedProgress * 50;
    }

    lenis.on("scroll", onScroll);

    function animate(time: number) {
      lenis.raf(time);
      // Lower lerp factor for even slower, smoother easing
      currentX += (targetX - currentX) * 0.012;
      // Animate all text tracks together
      textTracks.forEach((track) => {
        (track as HTMLElement).style.transform = `translateX(${currentX}%)`;
      });

      // Outline text positioning - commented out for later use
      // if (zoneImage && outlineText && textTracks.length > 0) {
      //   const zoneRect = zoneImage.getBoundingClientRect();
      //   const trackRect = (textTracks[0] as HTMLElement).getBoundingClientRect();
      //   const xInZone = ((trackRect.left - zoneRect.left) / zoneRect.width) * 100;
      //   outlineText.setAttribute("x", xInZone.toString());
      // }

      requestAnimationFrame(animate);
    }

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
    html.lenis,
    html.lenis body {
      height: auto;
    }
    .lenis.lenis-smooth {
      scroll-behavior: auto;
    }
    .lenis.lenis-smooth [data-lenis-prevent] {
      overscroll-behavior: contain;
    }
    .lenis.lenis-stopped {
      overflow: hidden;
    }
    .lenis.lenis-smooth iframe {
      pointer-events: none;
    }
    
    /* Scroll section that controls scroll */
    .scroll-section {
      /* Reduced height to remove excess space below the boutique-three-col before TrustedBy */
      height: 150vh;
      position: relative;
    }

    /* Sticky container - preserve existing grid layout */
    .boutique-three-col.sticky-container {
      position: sticky;
      top: 0;
      min-height: 100vh;
      overflow: hidden;
      /* Keep grid display from boutique-three-col */
    }

    /* Zone plain - overlay for masking, doesn't affect content */
    .boutique-three-col__cell--content.zone-plain {
      position: relative;
      z-index: 1;
      pointer-events: auto;
      /* Keep normal positioning for content cell */
    }
    
    /* Separate zone-plain overlay for masking */
    .zone-plain-overlay {
      position: absolute;
      left: 0;
      top: 0;
      width: 50%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    }

    /* Zone image - right side with mask, overlays images */
    .zone-image {
      position: absolute;
      right: 0;
      top: 0;
      width: 50%;
      height: 100%;
      z-index: 5;
      overflow: hidden;
      pointer-events: none;
      -webkit-mask-image: linear-gradient(to right, transparent 50vw, black 50vw);
      mask-image: linear-gradient(to right, transparent 50vw, black 50vw);
      -webkit-mask-size: 100vw 100%;
      mask-size: 100vw 100%;
      -webkit-mask-position: -50vw 0;
      mask-position: -50vw 0;
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
    }
    
    /* Ensure split section and images remain visible */
    .boutique-three-col__cell--wide {
      position: relative;
      z-index: 1;
    }
    
    .split-section {
      position: relative;
      z-index: 1;
    }

    .zone-image svg {
      position: absolute;
      left: 0;
      top: 10vh;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .zone-image .svg-outline-text {
      fill: none;
      stroke: #fff;
      stroke-width: 0.2;
      stroke-linecap: round;
      stroke-linejoin: round;
      paint-order: stroke;
    }

    /* Text wrapper container */
    .text-wrapper-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100%;
      z-index: 10;
      display: flex;
      align-items: flex-start;
      padding-top: 83vh;
      pointer-events: none;
      overflow: hidden;
    }

    /* Text wrapper container - positions both text elements */
    .text-wrapper-container {
      position: absolute;
      left: 0;
      top: 88vh;
      width: 100vw;
      height: 20vh;
      z-index: 10;
      pointer-events: none;
      overflow: visible;
    }

    /* Plain text wrapper - covers left 2/3 of viewport */
    .plain-text-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 66.666vw;
      height: 100%;
      z-index: 11;
      overflow: hidden;
      pointer-events: none;
      /* Clip to only show text in the plain area (left 2/3) */
    }

    /* Masked text wrapper - covers right 1/3 of viewport */
    .masked-text-wrapper {
      position: absolute;
      left: 66.666vw;
      /* Slightly raise the right-side (masked) text */
      top: -2vh;
      width: 33.333vw;
      height: 100%;
      z-index: 12;
      overflow: hidden;
      pointer-events: none;
      /* Clip to only show text in the image area (right 1/3) */
    }


    .text-track {
      position: absolute;
      /* Position both tracks at the same location relative to container */
      left: 0;
      top: 0;
      will-change: transform;
      transform: translateX(50%);
      width: 100vw;
      display: flex;
      align-items: flex-start;
      /* Both tracks align at the same position - positioned relative to their wrapper */
    }

    /* Ensure both text tracks align by positioning them relative to container */
    .plain-text-wrapper .text-track {
      position: absolute;
      left: 0;
      top: 0;
    }

    .masked-text-wrapper .text-track {
      position: absolute;
      left: -66.666vw; /* Offset to align with plain text track */
      top: 0;
    }

    /* Base text styles */
    .scroll-text {
      font-size: 12vw;
      font-weight: 600;
      white-space: nowrap;
      will-change: transform;
      font-family: var(--font-heading), sans-serif;
      line-height: 1;
      margin: 0;
      padding: 0;
      display: block;
    }

    /* Solid text - plain area */
    .scroll-text-solid {
      color: #fff !important;
      transform: translateY(-0.1em);
      opacity: 1;
    }

    /* Masked text - image area */
    .scroll-text-masked {
      color: transparent;
      -webkit-text-stroke: 2px #fff;
      text-stroke: 2px #fff;
      transform: translateY(-0.1em);
      /* Use mix-blend-mode to show background through text */
      mix-blend-mode: normal;
      /* Alternative: use background-clip for masking effect */
      background: linear-gradient(to right, transparent 0%, transparent 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      /* Create outline effect by layering */
      text-shadow: 
        -1px -1px 0 #fff,
        1px -1px 0 #fff,
        -1px 1px 0 #fff,
        1px 1px 0 #fff;
    }

    /* Masked text - transparent fill with white outline only (right side) */
    .masked-text-outline {
      /* Force no fill color at all, only outline */
      color: transparent !important;
      -webkit-text-fill-color: transparent !important;
      /* Medium white outline */
      -webkit-text-stroke: 1.5px #ffffff;
      text-stroke: 1.5px #ffffff;
      /* No inner glow so the inside stays fully transparent */
      text-shadow: none;
      /* Ensure no background image/gradient affects the fill */
      background: none;
      -webkit-background-clip: border-box;
      background-clip: border-box;
    }
    
    /* Move Learn more link up */
    .boutique-agency-block__cta {
      margin-top: 1.5rem !important;
    }
    
  `,
        }}
      />
    <div style={{ backgroundColor: "#0c1136" }}>
      <section className="parallax-gallery">
        <h2 className="boutique-split-heading font-heading font-bold tracking-tight">
          Believe
          <span>Believe</span>
          <span>Believe</span>
          <span>in yourself</span>
        </h2>
        <div className="parallax-gallery-row">
        {["left", "center", "right"].map((region, i) => (
          <div key={i} className={`parallax-window parallax-window-${region}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ARCH_IMAGE} alt="" className="parallax-img" />
          </div>
        ))}
        </div>
      </section>

      <section className="boutique-three-col scroll-section sticky-container">
        <div className="zone-plain-overlay"></div>
        <div className="boutique-three-col__cell boutique-three-col__cell--content zone-plain">
          <div className="boutique-agency-block">
            <h2 className="boutique-agency-block__heading">Agency</h2>
            <p className="boutique-agency-block__p">
              <strong>OAKS GROUP SA</strong> is a Swiss real estate investment
              company specializing in <strong>real estate development</strong> in{" "}
              <strong>Geneva</strong> and the <strong>canton of Vaud</strong>. We
              excel in acquiring properties for development, project management,
              and brokerage.
            </p>
            <p className="boutique-agency-block__p">
              As a committed <strong>real estate developer</strong>, our mission
              is to lead eco-responsible and sustainable projects, integrating
              innovation to meet the needs of the market and our clients.
            </p>
            <a href="#" className="boutique-agency-block__cta">
              → Learn more
            </a>
          </div>
        </div>
        <div className="boutique-three-col__cell boutique-three-col__cell--wide">
          <section className="split-section">
            <div
              className="split left"
              style={{ backgroundImage: `url(${SPLIT_IMAGE})` }}
            />
            <div
              className="split right"
              style={{ backgroundImage: `url(${SPLIT_IMAGE})` }}
            />
          </section>
        </div>
        {/* Masked outline text - commented out for later use */}
        {/* <div className="zone-image">
          <svg
            className="svg-image"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMinYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              id="outlineText"
              className="svg-outline-text"
              x="50"
              y="50"
              textAnchor="start"
              dominantBaseline="middle"
              fontFamily="var(--font-heading), sans-serif"
              fontWeight="600"
              fontSize="44"
            >
              Elk Audios
            </text>
          </svg>
        </div> */}
        {/* Text wrapper container */}
        <div className="text-wrapper-container">
          {/* Plain text wrapper - left 2/3 of viewport */}
          <div className="plain-text-wrapper">
            <div className="text-track">
              <h1 className="scroll-text scroll-text-solid" aria-hidden="true">
                Elk Audios
              </h1>
            </div>
          </div>
          
          {/* Masked text wrapper - right 1/3 of viewport */}
          <div className="masked-text-wrapper">
            <div className="text-track">
              <h1 
                className="scroll-text masked-text-outline" 
                aria-hidden="true"
              >
                Elk Audios
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
