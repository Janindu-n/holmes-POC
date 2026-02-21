'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

/**
 * HeroParallax component isolates high-frequency scroll updates to this leaf component.
 * It uses requestAnimationFrame and direct DOM manipulation via useRef to avoid
 * triggering React re-renders of the entire page on every scroll event.
 *
 * Performance gains:
 * - Reduces landing page re-renders from ~60/sec to 0 during scroll.
 * - Uses passive scroll listener to minimize main thread blocking.
 * - Employs will-change hint for browser compositor optimization.
 */
export default function HeroParallax() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let ticking = false;

    const updateParallax = () => {
      if (contentRef.current) {
        const scrollY = window.scrollY;
        // Calculate values same as before but apply directly to DOM
        const opacity = Math.max(1 - scrollY / 400, 0);
        const translateY = scrollY / 3;

        contentRef.current.style.opacity = opacity.toString();
        contentRef.current.style.transform = `translateY(${translateY}px)`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial sync with current scroll position
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
      ref={contentRef}
      className="flex flex-col gap-6 text-left max-w-2xl"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-800 dark:border-orange-900 dark:bg-orange-900/30 dark:text-orange-300">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
        </span>
        Now accepting new properties
      </div>
      <h1 className="text-4xl font-black leading-tight tracking-tight text-stone-900 dark:text-white sm:text-5xl lg:text-6xl">
        Your Home, Cared For While You&apos;re Away.
      </h1>
      <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed max-w-lg">
        Premium maintenance for overseas owners. We provide smart security, vetted professionals, and live video updates so you never have to worry.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-2">
        <Link href="/jobs/submit" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-700 hover:shadow-orange-500/40 transition-all duration-200">
          Get a Free Quote
        </Link>
        <button
          className="inline-flex items-center justify-center rounded-lg border border-stone-200 bg-white px-6 py-3.5 text-base font-bold text-stone-700 shadow-sm hover:bg-stone-50 hover:text-primary dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 transition-all duration-200"
          aria-label="Watch Video"
        >
          <span className="material-symbols-outlined mr-2">play_circle</span> Watch Video
        </button>
      </div>
      <div className="mt-6 flex items-center gap-4 text-sm font-medium text-stone-500 dark:text-stone-500">
        <div className="flex -space-x-2 overflow-hidden">
          <img alt="User avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrt9yYXivDBlPnWe1CnnximQpeX9_gmPGHfbCSpZE3WnwygfHP3zswm8S22tAangG_oYzGYSrC70Yapu28xcBu8qYKtJlG2eFRtTUKzdi8oS824aD8bFUskFgHU88eyVeZ-AkLW8KaCZCp2SBm5-1WjLb_vzracB91IevIjeX5IJjj_IQA28b_yEYROqBEbk6I6dntIgsPSw5rbpEwvKl3b1PRSNJ5WQNXzv6o-ccMfnGjJJtRgoMh1Fc7LskPTeWjA8nJfa_llkF3"/>
          <img alt="User avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGbCaDz0G2OAuYEH9krDXOcEiKqNpU5kyZn0NEis0kGJ8RfpQNRUK4QaZAv0M7CU3xhcV_g52vFCsGrIYdFOQC7ac2niPePzu4CvI-JJVvZsgEyCTy5iIhnpOezI-E2PsNyuDd42fzmo1TafpoMmJGZZKS7Qh_MSMGYKDQeBgX8_Wn4mGNPcOJTBuWSnR9ofPcW6d6lSwb4wMVRfRof93wEJl_YV5t106E8SQYtv8p-Zyepgo_5cjwPq22SNLSnibVpdpt9nJGRZPk"/>
          <img alt="User avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_2ZyKS3GLe1PxowifBFBGUHjlsfNDoQ6ZyVoYR789da-7TBYb1yxigLP0p-aTCoplasmGi_pPXA9X5gV_4qaYYI4WP8WSDv-pUiUNg31Wu-ATLasTqgbiXaQEukE4JrdFk1CWHuVG969xEurNRjwmu4dgKuaQtERdc6k6hOmTGjfMd_DVutZ218cY8cAYnSCNKiQiPXi9jCHTKS1mHJ0R3imjn88QNtkP2QhVt-mblu8GG8ytKXlamQVa2Zb08pADs8ilK_qrIOYR"/>
        </div>
        <p>Trusted by 500+ homeowners</p>
      </div>
    </div>
  );
}
