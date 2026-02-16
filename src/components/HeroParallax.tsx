'use client';

import React, { useEffect, useRef } from 'react';

interface HeroParallaxProps {
  children: React.ReactNode;
}

/**
 * HeroParallax component isolates the scroll-based parallax effect.
 * It uses a direct DOM manipulation via ref and requestAnimationFrame to avoid
 * React re-renders on every scroll event, significantly improving performance.
 */
export default function HeroParallax({ children }: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    // Optimization: Use a dedicated function for the animation update
    const updateParallax = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        // Calculation logic moved from parent component
        const opacity = Math.max(1 - scrollY / 400, 0);
        const translateY = scrollY / 3;

        // Directly update style to bypass React's reconciliation
        containerRef.current.style.opacity = opacity.toString();
        containerRef.current.style.transform = `translateY(${translateY}px)`;
      }
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        // Optimization: Throttle updates to match display refresh rate
        window.requestAnimationFrame(updateParallax);
        ticking.current = true;
      }
    };

    // Optimization: Use { passive: true } to improve scrolling responsiveness
    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial call to set correct state based on current scroll position
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      // Added will-change to hint the browser about incoming transformations
      className="flex flex-col gap-6 text-left max-w-2xl will-change-[transform,opacity]"
    >
      {children}
    </div>
  );
}
