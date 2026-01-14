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

  useEffect(() => {
    // Sync refs with state
    progressRef.current = scrollProgress;
    isAnimatingRef.current = isAnimating;
  }, [scrollProgress, isAnimating]);

  useEffect(() => {
    // Reset scroll position to top on mount and reset preloader state
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    
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

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    // Prevent body scroll when preloader is active
    if (scrollProgress < 1) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [scrollProgress]);

  useEffect(() => {
    if (!isLoading) {
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

      window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
      window.addEventListener("scroll", handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("scroll", handleScroll);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isLoading]);

  // Keep in DOM for reversible scrolling
  return (
    <div
      className={`fixed inset-0 z-[100] ${
        scrollProgress >= 1 ? "pointer-events-none" : ""
      }`}
        style={{
        opacity: isLoading ? 1 : Math.max(0, 1 - (scrollProgress - 0.7) / 0.3),
        pointerEvents: scrollProgress >= 1 ? "none" : "auto",
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
