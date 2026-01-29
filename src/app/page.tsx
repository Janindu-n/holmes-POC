'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-stone-900 dark:text-white font-display min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-stone-900 dark:text-white">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
              <span className="material-symbols-outlined text-xl">home_app_logo</span>
            </div>
            <span className="text-xl font-bold tracking-tight">HomeCare</span>
          </div>
          <nav className="hidden md:flex flex-1 justify-center gap-8">
            <a className="text-sm font-medium text-stone-600 hover:text-primary dark:text-stone-300 dark:hover:text-white transition-colors" href="#services">Services</a>
            <a className="text-sm font-medium text-stone-600 hover:text-primary dark:text-stone-300 dark:hover:text-white transition-colors" href="#how-it-works">How it Works</a>
            <a className="text-sm font-medium text-stone-600 hover:text-primary dark:text-stone-300 dark:hover:text-white transition-colors" href="#pricing">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-bold text-stone-600 hover:text-primary dark:text-stone-300 transition-colors">
              Sign In
            </Link>
            <Link href="/onboarding" className="flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all">
              Get a Quote
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background-light dark:bg-background-dark pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="flex flex-col gap-6 text-left max-w-2xl">
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
                <Link href="/onboarding" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-700 hover:shadow-orange-500/40 transition-all duration-200">
                  Get a Free Quote
                </Link>
                <button className="inline-flex items-center justify-center rounded-lg border border-stone-200 bg-white px-6 py-3.5 text-base font-bold text-stone-700 shadow-sm hover:bg-stone-50 hover:text-primary dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 transition-all duration-200">
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

      {/* Partners Section */}
      <div className="border-y border-stone-200 bg-white py-8 dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-stone-500">Insured & Vetted Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
            <div className="h-8 text-stone-800 dark:text-white font-bold text-xl flex items-center gap-1"><span className="material-symbols-outlined">security</span> SafeGuard</div>
            <div className="h-8 text-stone-800 dark:text-white font-bold text-xl flex items-center gap-1"><span className="material-symbols-outlined">nest_cam_iq_outdoor</span> NestHome</div>
            <div className="h-8 text-stone-800 dark:text-white font-bold text-xl flex items-center gap-1"><span className="material-symbols-outlined">key</span> SmartLock</div>
            <div className="h-8 text-stone-800 dark:text-white font-bold text-xl flex items-center gap-1"><span className="material-symbols-outlined">verified_user</span> Zurich Ins.</div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 bg-background-light dark:bg-background-dark" id="services">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl">Key Service Pillars</h2>
            <p className="mt-4 text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              We ensure your property remains secure and well-maintained through our three core promises. No surprises, just peace of mind.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-stone-700 dark:bg-stone-800/50">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-primary dark:bg-orange-900/20 dark:text-orange-400 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">lock</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-white">Secure Access</h3>
                <p className="mt-2 text-stone-600 dark:text-stone-400 leading-relaxed">
                  Bank-grade smart lock integration. We generate one-time codes for vendors. No loose keys under the mat, ever.
                </p>
              </div>
            </div>
            <div className="group relative flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-stone-700 dark:bg-stone-800/50">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-primary dark:bg-orange-900/20 dark:text-orange-400 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">engineering</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-white">Efficient Repairs</h3>
                <p className="mt-2 text-stone-600 dark:text-stone-400 leading-relaxed">
                  A network of vetted plumbers and electricians on standby 24/7. We handle the coordination so you don&apos;t have to.
                </p>
              </div>
            </div>
            <div className="group relative flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-stone-700 dark:bg-stone-800/50">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-primary dark:bg-orange-900/20 dark:text-orange-400 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">visibility</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-white">Transparent Reporting</h3>
                <p className="mt-2 text-stone-600 dark:text-stone-400 leading-relaxed">
                  See what we see. Get real-time photo & video logs after every visit directly to your dashboard or app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-stone-900" id="how-it-works">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="w-full aspect-[3/4] rounded-2xl bg-cover bg-center shadow-lg" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBBCBsjDW83osSTXyE4F3GDRIphisU5xVkNgv6AN3Z9CThkBwBB4_0JuDDKHZoU4ZutqwWwhsu4BNXym-hSH66Lx2i-kGXlpBJwfc64Y-0E2ZNHzTPjrKopOneeXhAsgrdUUt0_ZfX1Qga01zMln6SnYNyKaDRQPqMvDXEqOtPQlheaTEGcMaRANo1u9FG5aArlJ8uLmCp4fzjcGTvEx8yDAVF9ZJmO9WQ7YIZEHYYBjCV8f-7_GL1pRkuImbfTiUUiXAQ-KIHm3lGD')" }}></div>
                  <div className="w-full aspect-square rounded-2xl bg-cover bg-center shadow-lg" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDLnsJ25r8niw5gZpo01T4kCCGQpw_QjLc3DNqZ3jVoqpVto6aJwSJ1njVmyFRY4lKpCxlORy7gBBk4Q_OhqkGAMkCIu56QwPVDAfE5p2JRDcc84s3bvoL1n5ECJB-OYPdPRy5j7bEGi1OoduxVPAGLfDcuzSMnT-mfNmU2rZgqkA4tc_MFhZshcFzynEcNWgH-7ZE2RC-Wepm90oSyPALI-UKOsZuNyE6mMNdE51qPIhT7LQLPYQWQCQN3JZGDyjTZLuDulE1LAxuG')" }}></div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="w-full aspect-square rounded-2xl bg-cover bg-center shadow-lg" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAe09Tw9NWs7XB-N10l7nOfjNQRngl_QWas5gSks-WnI-NjE4E64CER8iSRamfzLO5DlttlikbNWJMBBMQEey1nsDP2aFJPAXYJiBVFMR4NCRVL8AGWGeZU3Ma3Ol9JfzsihXi_-3u-XifkYCS5lBhkJhFqrpUPJjnkmgNn1xupCLA0nBdufU6nZqRytvoh6KIX-XMM8xErFJHEeQ3pXIs4ubRIsHtColI0xHRmgEzeM3qzkXUQ3qZiar9B8JCgeb8dB57ctHVOiZeA')" }}></div>
                  <div className="w-full aspect-[3/4] rounded-2xl bg-cover bg-center shadow-lg" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDAzR2VvHq0ALOSYjWneSGW5VFLhRP3Y6_Qh497dhPEdY93SCs3rLog2E_J1aDkE7Jco-PlaIjTtJs9B5SGYVNcHaDiuCVT_MtN9IZ61bnqCZBEuT79S-G9tnk9pqQ8aziw1egoeYuvcdxY2APuFJuDMs1CSB0Zkr35HZARVQz797zOhDHKPZkrcOE1Xq0aRFENspeVe3pNLB_24CbKK0JeZtripyE5eJQf0wxY97F0Z-JRkzD3vm4XbuIvWNrdpNGhtKXPSAqHPYyr')" }}></div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl mb-8">How It Works</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-stone-300 before:to-transparent dark:before:via-stone-700">
                <div className="relative flex items-start group">
                  <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-white bg-orange-50 shadow ring-1 ring-stone-900/5 group-hover:ring-primary group-hover:bg-primary group-hover:text-white transition-all dark:bg-stone-800 dark:ring-stone-700">
                    <span className="material-symbols-outlined text-xl">contact_mail</span>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white">1. Get Your Quote</h3>
                    <p className="mt-2 text-stone-600 dark:text-stone-400">Fill out our simple form with your property details. We&apos;ll assess your needs and provide a custom maintenance plan within 24 hours.</p>
                  </div>
                </div>
                <div className="relative flex items-start group">
                  <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-white bg-orange-50 shadow ring-1 ring-stone-900/5 group-hover:ring-primary group-hover:bg-primary group-hover:text-white transition-all dark:bg-stone-800 dark:ring-stone-700">
                    <span className="material-symbols-outlined text-xl">settings_remote</span>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white">2. Smart Setup</h3>
                    <p className="mt-2 text-stone-600 dark:text-stone-400">We install or integrate with your existing smart locks and sensors. A secure digital profile is created for your home.</p>
                  </div>
                </div>
                <div className="relative flex items-start group">
                  <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-white bg-orange-50 shadow ring-1 ring-stone-900/5 group-hover:ring-primary group-hover:bg-primary group-hover:text-white transition-all dark:bg-stone-800 dark:ring-stone-700">
                    <span className="material-symbols-outlined text-xl">verified</span>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white">3. Relax & Monitor</h3>
                    <p className="mt-2 text-stone-600 dark:text-stone-400">Our team performs regular checks. You receive instant notifications and detailed reports after every visit. Approval for repairs is one click away.</p>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <Link href="/onboarding" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-700 transition-all">
                  Start Your Plan
                  <span className="material-symbols-outlined ml-2 text-lg">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-background-light dark:bg-background-dark border-t border-stone-200 dark:border-stone-800">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-6 flex justify-center text-primary">
            <span className="material-symbols-outlined text-4xl">format_quote</span>
          </div>
          <h2 className="text-2xl font-bold leading-relaxed text-stone-900 dark:text-white md:text-3xl">
            &quot;Living in Melbourne while maintaining a home in Colombo used to be stressful. HomeCare changed everything. The verified specialists and live video updates give me absolute peace of mind.&quot;
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-2">
            <div className="size-12 overflow-hidden rounded-full bg-stone-200">
              <img alt="Customer Avatar" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASsRqylbw-D4F7Rqt0AMKPTIBRASKQ0J9o24VlmGnMYE7MOP7ibHKmGIpgJjt7TX70Pqxu0A_MvHAskLl5MtveI5whEhbgJVfAFLHam-qx1Dh4wP_jn-xxqI-7yjPV5ih8VG355rR69CQqWtaIHhZIKg1sdXETfI49qE2iKbk-8XVzkYcXUrPyVqkrc943kSompL9J1rroSmCioTVNKs7QMzRUqGKb3WM3v_0Av64H3_X1jp7Vb0WGRlUoDRkPZxw-Khjiiii0gApF"/>
            </div>
            <div className="text-base font-semibold text-stone-900 dark:text-white">Aruni P.</div>
            <div className="text-sm text-stone-500">Property Owner, Melbourne</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl mb-6">
            Ready to secure your peace of mind?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-orange-100 mb-10">
            Join hundreds of homeowners who trust HomeCare. Get a custom quote tailored to your property&apos;s needs today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/onboarding" className="flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-bold text-primary shadow-lg hover:bg-orange-50 transition-all">
              Get a Free Quote
            </Link>
            <button className="flex items-center justify-center rounded-lg bg-orange-800 border border-orange-600 px-8 py-4 text-base font-bold text-white hover:bg-orange-700 transition-all">
              Contact Sales
            </button>
          </div>
          <p className="mt-6 text-sm text-orange-200">
            <span className="material-symbols-outlined align-middle text-lg mr-1">check_circle</span> No credit card required for quote
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-background-dark border-t border-stone-200 dark:border-stone-800 pt-12 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 text-stone-900 dark:text-white mb-4">
                <div className="flex size-6 items-center justify-center rounded bg-primary text-white">
                  <span className="material-symbols-outlined text-sm">home_app_logo</span>
                </div>
                <span className="font-bold">HomeCare</span>
              </div>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Smart, secure, and transparent home maintenance for the modern homeowner.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-stone-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-stone-500 dark:text-stone-400">
                <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-stone-900 dark:text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-stone-500 dark:text-stone-400">
                <li><a className="hover:text-primary transition-colors" href="#">Maintenance</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Security Audit</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Emergency Repair</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-stone-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-stone-500 dark:text-stone-400">
                <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-100 dark:border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-stone-400">© {new Date().getFullYear()} HomeCare Inc. All rights reserved.</p>
            <div className="flex gap-4 text-stone-400">
              <a className="hover:text-primary transition-colors" href="#">
                <span className="sr-only">Twitter</span>
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                <span className="sr-only">Facebook</span>
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
