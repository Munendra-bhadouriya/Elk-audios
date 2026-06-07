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
    progressRef.current = scrollProgress;
    isAnimatingRef.current = isAnimating;
  }, [scrollProgress, isAnimating]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    
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
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400); // ✅ reduced from 1000ms

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
    if (scrollProgress < 1) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      setIsVisible(false);
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [scrollProgress]);

  useEffect(() => {
    if (!isLoading) {
      const isMobile =
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;

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
      }, 3000);

      const startAnimation = (direction: "forward" | "reverse") => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }

        const duration = 1100;
        const startTime = Date.now();
        const startProgress = progressRef.current;
        const targetProgress = direction === "forward" ? 1 : 0;

        const animate = () => {
          const currentTime = Date.now();
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          const easedProgress = 1 - Math.pow(1 - progress, 3);

          const newProgress =
            startProgress +
            (targetProgress - startProgress) * easedProgress;

          progressRef.current = newProgress;

          setScrollProgress(newProgress);
          setContextProgress(newProgress);

          const newScale = 1 + newProgress * 3;
          setScale(newScale);

          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          } else {
            setIsAnimating(false);
            isAnimatingRef.current = false;
            setAnimationDirection(null);
            animationRef.current = null;

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
        const isAtTop = scrollY === 0 || scrollY < 10;
        const currentProgress = progressRef.current;
        const currentIsAnimating = isAnimatingRef.current;

        if (currentProgress >= 1) return;

        if (isAtTop && currentProgress < 1) {
          e.preventDefault();
          e.stopPropagation();

          if (!currentIsAnimating) {
            const scrollDelta = e.deltaY;

            if (scrollDelta > 0) {
              setAnimationDirection("forward");
              setIsAnimating(true);
              isAnimatingRef.current = true;
              startAnimation("forward");
            } else if (scrollDelta < 0 && currentProgress > 0) {
              setAnimationDirection("reverse");
              setIsAnimating(true);
              isAnimatingRef.current = true;
              startAnimation("reverse");
            }
          }
        }
      };

      const handleScroll = () => {
        const scrollY = window.scrollY;
        const currentProgress = progressRef.current;
        const currentIsAnimating = isAnimatingRef.current;

        if (currentProgress >= 1) return;

        if (scrollY === 0 && currentProgress > 0 && !currentIsAnimating && !isLoading) {
          setAnimationDirection("reverse");
          setIsAnimating(true);
          isAnimatingRef.current = true;
          startAnimation("reverse");
        }
      };

      if (progressRef.current < 1) {
        const delay = isMobile ? 600 : 1000; // ✅ reduced
        autoCompleteTimerRef.current = setTimeout(() => {
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

      return () => {
        clearTimeout(safetyTimer);
        if (autoCompleteTimerRef.current) {
          clearTimeout(autoCompleteTimerRef.current);
          autoCompleteTimerRef.current = null;
        }
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("scroll", handleScroll);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isLoading, setContextProgress]);

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