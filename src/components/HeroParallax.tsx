'use client';

import React, { useEffect, useRef } from 'react';

interface HeroParallaxProps {
  children: React.ReactNode;
}

export default function HeroParallax({ children }: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const updateParallax = () => {
      if (!containerRef.current) return;

      const scrollY = window.scrollY;
      const opacity = Math.max(1 - scrollY / 400, 0);
      const translateY = scrollY / 3;

      containerRef.current.style.opacity = opacity.toString();
      containerRef.current.style.transform = `translateY(${translateY}px)`;

      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateParallax);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial call to set state
    updateParallax();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-6 text-left max-w-2xl transition-all duration-75"
    >
      {children}
    </div>
  );
}
