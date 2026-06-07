import { useEffect } from "react";

/**
 * Drives horizontal text tracks without a second Lenis instance (parallax hook owns Lenis).
 * Uses rAF + getBoundingClientRect so motion stays in sync with smooth scroll.
 */
export function useHorizontalScroll() {
  useEffect(() => {
    let animationId = 0;
    let currentX = 50;
    let targetX = 50;

    function tick() {
      const textTracks = document.querySelectorAll(".text-track");
      const textWrapper = document.querySelector(".text-wrapper-container");

      if (!textWrapper || textTracks.length === 0) {
        animationId = requestAnimationFrame(tick);
        return;
      }

      const wrapperRect = textWrapper.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (wrapperRect.bottom < 0 || wrapperRect.top > viewportHeight) {
        currentX += (targetX - currentX) * 0.06;
        textTracks.forEach((track) => {
          (track as HTMLElement).style.transform = `translateX(${currentX}%)`;
        });
        animationId = requestAnimationFrame(tick);
        return;
      }

      const wrapperCenterY = wrapperRect.top + wrapperRect.height / 2;
      const progress = Math.max(
        0,
        Math.min(1, 1 - wrapperCenterY / viewportHeight)
      );
      const easedProgress = Math.pow(progress, 2.2);
      targetX = 50 - easedProgress * 50;

      currentX += (targetX - currentX) * 0.06;
      textTracks.forEach((track) => {
        (track as HTMLElement).style.transform = `translateX(${currentX}%)`;
      });

      animationId = requestAnimationFrame(tick);
    }

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, []);
}
