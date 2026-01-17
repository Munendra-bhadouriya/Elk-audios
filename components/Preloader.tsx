"use client";

import { useEffect, useState, useRef } from "react";
import { usePreloader } from "@/contexts/PreloaderContext";

export default function Preloader() {
  const { setScrollProgress: setContextProgress } = usePreloader();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [scale, setScale] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<"forward" | "reverse" | null>(null);
  const animationRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartTimeRef = useRef<number | null>(null);
  const autoCompleteTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Sync refs with state
    progressRef.current = scrollProgress;
    isAnimatingRef.current = isAnimating;
  }, [scrollProgress, isAnimating]);

  useEffect(() => {
    // Reset scroll position to top on mount and reset preloader state
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden"; // Also set on html for mobile
    
    // Reset all preloader state
    setScrollProgress(0);
    setScale(1);
    setIsAnimating(false);
    setIsLoading(true);
    setAnimationDirection(null);
    progressRef.current = 0;
    isAnimatingRef.current = false;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Fallback: Force complete preloader after maximum time (5 seconds total)
    // This ensures the preloader never gets stuck
    const maxTimer = setTimeout(() => {
      if (progressRef.current < 1) {
        setScrollProgress(1);
        setContextProgress(1);
        setScale(4);
        setIsVisible(false);
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(maxTimer);
      if (autoCompleteTimerRef.current) {
        clearTimeout(autoCompleteTimerRef.current);
        autoCompleteTimerRef.current = null;
      }
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [setContextProgress]);

  useEffect(() => {
    // Prevent body scroll when preloader is active
    if (scrollProgress < 1) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden"; // Also set on html for mobile
    } else {
      // Ensure scroll is unlocked when preloader completes
      document.body.style.overflow = "";
      document.documentElement.style.overflow = ""; // Also clear on html for mobile
      setIsVisible(false);
    }
    
    return () => {
      // Cleanup: always ensure scroll is unlocked
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [scrollProgress]);

  useEffect(() => {
    if (!isLoading) {
      // Detect if device is mobile/touch device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                       ('ontouchstart' in window) || 
                       (navigator.maxTouchPoints > 0);
      
      // Safety mechanism: Force complete preloader after 4 seconds if still stuck
      const safetyTimer = setTimeout(() => {
        if (progressRef.current < 1) {
          setScrollProgress(1);
          setContextProgress(1);
          setScale(4);
          setIsVisible(false);
          setIsAnimating(false);
          isAnimatingRef.current = false;
          document.body.style.overflow = "";
          document.documentElement.style.overflow = "";
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
          }
        }
      }, 4000);

      const startAnimation = (direction: "forward" | "reverse") => {
        // Cancel any existing animation
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }

        const duration = 2000; // 2 seconds for smooth animation
        const startTime = Date.now();
        const startProgress = progressRef.current;
        const targetProgress = direction === "forward" ? 1 : 0;

        const animate = () => {
          const currentTime = Date.now();
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smooth animation (ease-in-out)
          const easedProgress = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
          
          const newProgress = startProgress + (targetProgress - startProgress) * easedProgress;
          progressRef.current = newProgress;
          
          setScrollProgress(newProgress);
          setContextProgress(newProgress);
          // Scale from 1 to 4 (zooms out until completely outside frame)
          const newScale = 1 + newProgress * 3;
          setScale(newScale);

          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          } else {
            setIsAnimating(false);
            isAnimatingRef.current = false;
            setAnimationDirection(null);
            animationRef.current = null;
            // Ensure body scroll is unlocked when animation completes
            if (newProgress >= 1) {
              document.body.style.overflow = "";
              document.documentElement.style.overflow = "";
              setIsVisible(false);
            }
          }
        };

        animationRef.current = requestAnimationFrame(animate);
      };

      const handleWheel = (e: WheelEvent) => {
        const scrollY = window.scrollY;
        const isAtTop = scrollY === 0 || scrollY < 10; // Small threshold for "at top"
        const currentProgress = progressRef.current;
        const currentIsAnimating = isAnimatingRef.current;
        
        // If preloader is complete (progress >= 1), allow normal scrolling
        if (currentProgress >= 1) {
          return; // Don't prevent default, allow normal scroll
        }
        
        // If at top and preloader is active, always prevent default to stop page scroll
        if (isAtTop && currentProgress < 1) {
          e.preventDefault();
          e.stopPropagation();
          
          // Only trigger new animation if not currently animating
          if (!currentIsAnimating) {
            const scrollDelta = e.deltaY;
            
            if (scrollDelta > 0) {
              // Scroll down - trigger forward animation
              setAnimationDirection("forward");
              setIsAnimating(true);
              isAnimatingRef.current = true;
              startAnimation("forward");
            } else if (scrollDelta < 0 && currentProgress > 0) {
              // Scroll up - trigger reverse animation
              setAnimationDirection("reverse");
              setIsAnimating(true);
              isAnimatingRef.current = true;
              startAnimation("reverse");
            }
          }
        }
        // If not at top, allow normal scrolling (don't prevent default)
      };

      const handleScroll = () => {
        const scrollY = window.scrollY;
        const currentProgress = progressRef.current;
        const currentIsAnimating = isAnimatingRef.current;
        
        // If preloader is complete, don't handle scroll
        if (currentProgress >= 1) {
          return;
        }
        
        // When scrolling back to top, trigger reverse animation if preloader was revealed
        if (scrollY === 0 && currentProgress > 0 && !currentIsAnimating && !isLoading) {
          setAnimationDirection("reverse");
          setIsAnimating(true);
          isAnimatingRef.current = true;
          startAnimation("reverse");
        }
      };

      // Touch event handlers for mobile devices
      const handleTouchStart = (e: TouchEvent) => {
        const scrollY = window.scrollY;
        const isAtTop = scrollY === 0 || scrollY < 10;
        const currentProgress = progressRef.current;
        
        // Only handle touch if preloader is active and at top
        if (isAtTop && currentProgress < 1) {
          touchStartYRef.current = e.touches[0].clientY;
          touchStartTimeRef.current = Date.now();
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        const scrollY = window.scrollY;
        const isAtTop = scrollY === 0 || scrollY < 10;
        const currentProgress = progressRef.current;
        const currentIsAnimating = isAnimatingRef.current;
        
        // If preloader is complete, allow normal scrolling
        if (currentProgress >= 1) {
          return;
        }
        
        // If at top and preloader is active, prevent default scrolling
        if (isAtTop && currentProgress < 1 && touchStartYRef.current !== null) {
          e.preventDefault();
          e.stopPropagation();
        }
      };

      const handleTouchEnd = (e: TouchEvent) => {
        const scrollY = window.scrollY;
        const isAtTop = scrollY === 0 || scrollY < 10;
        const currentProgress = progressRef.current;
        const currentIsAnimating = isAnimatingRef.current;
        
        // Cancel auto-complete timer if user interacts
        if (autoCompleteTimerRef.current) {
          clearTimeout(autoCompleteTimerRef.current);
          autoCompleteTimerRef.current = null;
        }
        
        // If preloader is complete, allow normal scrolling
        if (currentProgress >= 1) {
          touchStartYRef.current = null;
          touchStartTimeRef.current = null;
          return;
        }
        
        // Only process if we have a valid touch start and are at top
        if (isAtTop && currentProgress < 1 && touchStartYRef.current !== null && touchStartTimeRef.current !== null) {
          const touchEndY = e.changedTouches[0].clientY;
          const touchDeltaY = touchStartYRef.current - touchEndY;
          const touchDuration = Date.now() - touchStartTimeRef.current;
          
          // Minimum swipe distance to trigger animation (30px)
          const minSwipeDistance = 30;
          
          // Only trigger animation if swipe is significant and not currently animating
          if (Math.abs(touchDeltaY) >= minSwipeDistance && !currentIsAnimating) {
            if (touchDeltaY > 0) {
              // Swipe up (scroll down) - trigger forward animation
              setAnimationDirection("forward");
              setIsAnimating(true);
              isAnimatingRef.current = true;
              startAnimation("forward");
            } else if (touchDeltaY < 0 && currentProgress > 0) {
              // Swipe down (scroll up) - trigger reverse animation
              setAnimationDirection("reverse");
              setIsAnimating(true);
              isAnimatingRef.current = true;
              startAnimation("reverse");
            }
          }
        }
        
        touchStartYRef.current = null;
        touchStartTimeRef.current = null;
      };

      // Auto-complete preloader on mobile after a short delay if no interaction
      // Also auto-complete on desktop after a longer delay
      if (progressRef.current < 1) {
        const delay = isMobile ? 1500 : 2500; // Mobile: 1.5s, Desktop: 2.5s
        autoCompleteTimerRef.current = setTimeout(() => {
          // Only auto-complete if still at 0 progress (no user interaction yet)
          if (progressRef.current === 0 && !isAnimatingRef.current) {
            setAnimationDirection("forward");
            setIsAnimating(true);
            isAnimatingRef.current = true;
            startAnimation("forward");
          }
          autoCompleteTimerRef.current = null;
        }, delay);
      }

      window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
      window.addEventListener("scroll", handleScroll, { passive: true });
      
      // Add touch event listeners for mobile devices
      if (isMobile) {
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });
      }
      
      return () => {
        clearTimeout(safetyTimer);
        if (autoCompleteTimerRef.current) {
          clearTimeout(autoCompleteTimerRef.current);
          autoCompleteTimerRef.current = null;
        }
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("scroll", handleScroll);
        if (isMobile) {
          window.removeEventListener("touchstart", handleTouchStart);
          window.removeEventListener("touchmove", handleTouchMove);
          window.removeEventListener("touchend", handleTouchEnd);
        }
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isLoading, setContextProgress]);

  // Keep in DOM for reversible scrolling
  // Hide completely when progress reaches 1
  if (scrollProgress >= 1 && !isLoading) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[100] ${
        scrollProgress >= 1 ? "pointer-events-none" : ""
      }`}
        style={{
        opacity: isLoading ? 1 : Math.max(0, 1 - (scrollProgress - 0.7) / 0.3),
        pointerEvents: scrollProgress >= 1 ? "none" : "auto",
        visibility: scrollProgress >= 1 ? "hidden" : "visible",
      }}
    >
      {/* Dark background with logo cutout using mask-composite */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: "#0f172a",
          WebkitMaskImage: `linear-gradient(black, black), url('/assets/Elk Logo transparent.png')`,
          WebkitMaskSize: `100% 100%, ${40 * scale}vw`,
          WebkitMaskRepeat: "no-repeat, no-repeat",
          WebkitMaskPosition: "center center, center 40%",
          WebkitMaskComposite: "subtract",
          maskImage: `linear-gradient(black, black), url('/assets/Elk Logo transparent.png')`,
          maskSize: `100% 100%, ${40 * scale}vw`,
          maskRepeat: "no-repeat, no-repeat",
          maskPosition: "center center, center 40%",
          maskComposite: "exclude",
        }}
      />
    </div>
  );
}
