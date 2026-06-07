import { useEffect } from "react";
import Lenis from "lenis";

export function useParallax() {
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true });

    const images = document.querySelectorAll(".parallax-img");
    const currentY = new Map<Element, number>();

    const LERP_FACTOR = 0.08;

    let rafId = 0;

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

    rafId = requestAnimationFrame(parallaxScroll);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
