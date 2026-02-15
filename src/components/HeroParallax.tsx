'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HeroParallax() {
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        rafId.current = window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial sync to handle cases where page is already scrolled
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const opacity = Math.max(1 - scrollY / 400, 0);
  const translateY = scrollY / 3;

  return (
    <section className="relative overflow-hidden bg-background-light dark:bg-background-dark pt-16 pb-20 lg:pt-24 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div
            className="flex flex-col gap-6 text-left max-w-2xl"
            style={{
              opacity: opacity,
              transform: `translateY(${translateY}px)`
            }}
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
          <div className="relative lg:h-auto h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent z-10"></div>
            <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-green-400">gpp_good</span>
                <span className="font-bold text-sm tracking-wide uppercase">System Active</span>
              </div>
              <p className="text-sm opacity-90">Live Feed • Living Room Cam 01</p>
            </div>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhqwGi8qZnZJogTGOJhYA_q8LMWQ3U5KTHBOQrqDWGqfr0RKCAKqhs1l7DboBNoFaf8JDCVP2YADK-y5_I0uf4-uw5yIs79ztpnj2P7rbk3ejhw8KeIQPDlORl0vKjQEV3GFiEvqu69AnJCdyKB1tOps-OD302PJKeua8rZVyawkwMaTd710XDLKCT_-jlBwLRuJFW5LeWD_a1U-vk9PVGnzbuyT-vRIIV_l-_lem6KDCOpd0alpx9xg2GhooSk9RNq1qTVlPR719X')" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
