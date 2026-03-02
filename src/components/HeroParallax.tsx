'use client';

import React, { useEffect, useRef } from 'react';

interface HeroParallaxProps {
  children: React.ReactNode;
}

/**
 * HeroParallax component optimizes the hero section scroll effect.
 * It uses requestAnimationFrame and direct DOM manipulation to achieve 60fps parallax
 * without triggering React re-renders.
 */
export default function HeroParallax({ children }: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    // Optimization: Use a local variable to track if the component is unmounted
    let isUnmounted = false;

    const updateParallax = () => {
      if (isUnmounted || !containerRef.current) return;

      const scrollY = window.scrollY;
      // Replicating original logic: opacity fades out over 400px, translateY is 1/3 of scroll
      const opacity = Math.max(1 - scrollY / 400, 0);
      const translateY = scrollY / 3;

      containerRef.current.style.opacity = opacity.toString();
      containerRef.current.style.transform = `translateY(${translateY}px)`;

      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateParallax);
        ticking.current = true;
      }
    };

    // Initial update to sync with current scroll position on mount
    updateParallax();

    // Optimization: passive listener for better scroll performance
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      isUnmounted = true;
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-6 text-left max-w-2xl will-change-[transform,opacity]"
    >
      {children}
    </div>
  );
}
