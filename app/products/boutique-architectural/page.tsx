"use client";

import { useEffect } from "react";
import Lenis from "lenis";
const ARCH_IMAGE =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=85";
const SPLIT_IMAGE =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85";

export default function BoutiqueArchitecturalPage() {
  // Same vertical parallax as /test
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

  // Same horizontal text scroll behavior as /test
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
      const viewportCenter = viewportHeight / 2;

      // Get the text wrapper's center position relative to viewport
      const textWrapperCenter = wrapperRect.top + wrapperRect.height / 2;
      
      // Calculate distance from viewport center
      // When text wrapper center is at viewport center, we want progress to start
      const distanceFromCenter = textWrapperCenter - viewportCenter;
      
      // Only animate when text wrapper is in viewport
      if (wrapperRect.bottom < 0 || wrapperRect.top > viewportHeight) {
        // Keep current position when out of view
        return;
      }

      // Calculate progress based on text wrapper position in viewport
      // When text wrapper enters from bottom: progress = 0 (text at right, 50%)
      // When text wrapper is at center: progress = 0.5 (text moving)
      // When text wrapper exits from top: progress = 1 (text at left, 0%)
      
      // Map text wrapper top position to progress
      // Start animation when text wrapper center is near viewport center
      const textWrapperTop = wrapperRect.top;
      const textWrapperBottom = wrapperRect.bottom;
      
      // Calculate progress: 0 when wrapper enters, 1 when wrapper exits
      // But we want it to start moving when wrapper center is near viewport center
      const wrapperCenterY = wrapperRect.top + wrapperRect.height / 2;
      
      // Progress increases as wrapper moves up through viewport
      // When wrapper center is at viewport bottom: progress = 0
      // When wrapper center is at viewport center: progress = 0.5  
      // When wrapper center is at viewport top: progress = 1
      const progress = Math.max(0, Math.min(1,
        1 - (wrapperCenterY / viewportHeight)
      ));

      // Ease the progress so motion ramps up gently
      const easedProgress = Math.pow(progress, 2.2);

      // Scroll down: text goes right (50%) → left (0%)
      // Scroll up: progress decreases, so text goes left → right
      targetX = 50 - easedProgress * 50;
    }

    lenis.on("scroll", onScroll);

    function animate(time: number) {
      lenis.raf(time);

      // Lerp towards target for smooth motion in both directions
      currentX += (targetX - currentX) * 0.06;
      // Animate all text tracks together
      textTracks.forEach((track) => {
        (track as HTMLElement).style.transform = `translateX(${currentX}%)`;
      });

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
    
    /* Parallax gallery section */
    .parallax-gallery {
      background-color: #0f172a;
    }

    /* Scroll section wrapper - normal flow */
    .scroll-section-wrapper {
      position: relative;
      z-index: 1;
      margin-bottom: 12vh;
      background-color: #0f172a;
    }

    /* Scroll section that controls scroll */
    .scroll-section {
      position: relative;
      width: 100%;
      min-height: 100vh;
      /* Ensure it doesn't overlap following sections */
      isolation: isolate;
      background-color: #0f172a;
    }

    /* Container - normal flow, no sticky */
    .boutique-three-col.sticky-container {
      position: relative;
      min-height: 100vh;
      overflow: hidden;
      /* Keep grid display from boutique-three-col */
      z-index: 1;
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

    /* Text wrapper container - positions both text elements */
    .text-wrapper-container {
      position: absolute;
      left: 0;
      top: 88vh;
      width: 100vw;
      height: 20vh;
      z-index: 3;
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
    
    /* New section layout styles */
    .layout-section {
      display: flex;
      height: calc(100vh + 50vh);
      width: 100vw;
      position: relative;
      z-index: 0;
      margin-top: 12vh;
      margin-bottom: 0;
      /* Ensure it appears after scroll-section completes */
      clear: both;
      /* Create new stacking context - appears after scroll-section */
      isolation: isolate;
      /* Ensure it's positioned below the scroll-section */
      top: 0;
      /* Ensure it appears above sticky content when scroll-section completes */
      background: #0f172a;
    }

    .layout-left {
      width: 40%;
      display: flex;
      flex-direction: column;
    }

    .layout-left-top {
      flex: 0 0 50vh;
      background: #486239;
    }

    .layout-left-bottom {
      flex: 1;
      display: flex;
    }

    .layout-bottom-left {
      flex: 1;
      background: #c1bca4;
      position: relative;
    }

    .layout-bottom-right {
      position: absolute;
      top: 0;
      right: 0;
      width: 45%;
      height: 50%;
      background: #f6b51f;
    }

    .layout-right {
      flex: 1;
      background: #7a97af;
      position: relative;
    }

    .layout-vertical-strip {
      position: absolute;
      left: 40%;
      top: 0;
      width: 4%;
      height: 100%;
      background: #7a97af;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      pointer-events: none;
    }

    .layout-vertical-title {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      font-size: 1.7rem;
      letter-spacing: 0.08em;
      padding-top: 1.5rem;
    }

    .layout-vertical-plus {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }

    .layout-label-salt {
      position: sticky;
      top: 50%;
      font-size: 1.8rem;
    }

    .layout-label-interiors {
      position: sticky;
      top: 95%;
      font-size: 2rem;
      z-index: 9;
      text-align: right;
      padding-right: 1.5rem;
    }

    .layout-menu-button {
      position: fixed;
      top: 0%;
      right: 0%;
      background: #f6b51f;
      padding: 0.4rem 0.9rem;
      font-size: 0.9rem;
      border-radius: 0;
      z-index: 10;
    }

    .layout-empty {
      height: 100vh;
      width: 100vw;
      background: #fff;
      position: relative;
      top: 0;
      left: 0;
      z-index: 8;
    }

    .layout-label-architecture {
      transform: rotate(-90deg);
      transform-origin: top left;
      position: sticky;
      top: 25%;
      left: 1.25rem;
      font-size: 1.8rem;
      z-index: 9;
    }

    .layout-label-add {
      position: sticky;
      top: 92%;
      left: 1.5rem;
      font-size: 3.5rem;
      z-index: 9;
    }
    
  `,
        }}
      />
      <div style={{ backgroundColor: "#0f172a", position: "relative" }}>
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

        <div className="scroll-section-wrapper">
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

        <section className="layout-section">
          <div className="layout-left">
            <div className="layout-left-top"></div>
            <div className="layout-left-bottom">
              <div className="layout-bottom-left">
                <div className="layout-label-salt">Salt</div>
                <div className="layout-bottom-right"></div>
              </div>
            </div>
          </div>

          <div className="layout-right">
            <div className="layout-label-architecture">Architecture</div>
            <div className="layout-label-add">+</div>
            <div className="layout-label-interiors">Interiors</div>
          </div>
        </section>
        
        {/* Spacer with TrustedBy background color */}
        <div style={{ height: '12vh', backgroundColor: '#0f172a', width: '100%' }}></div>
      </div>
    </>
  );
}
