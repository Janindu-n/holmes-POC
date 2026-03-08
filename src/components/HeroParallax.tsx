'use client';

import React, { useEffect, useRef } from 'react';

interface HeroParallaxProps {
  children: React.ReactNode;
}

export default function HeroParallax({ children }: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let ticking = false;

    const updateParallax = () => {
      if (!containerRef.current) return;

      const scrollY = window.scrollY;
      const opacity = Math.max(1 - scrollY / 400, 0);
      const translateY = scrollY / 3;

      // Direct DOM manipulation to bypass React state re-renders
      containerRef.current.style.opacity = opacity.toString();
      containerRef.current.style.transform = `translateY(${translateY}px)`;

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial call to sync state
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
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
