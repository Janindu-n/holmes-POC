'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="bg-dashboard-bg dark:bg-background-dark font-display text-stone-600 dark:text-stone-300 min-h-screen flex flex-col overflow-x-hidden transition-colors duration-200">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-card-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 bg-primary rounded-lg text-white shadow-sm">
                  <span className="material-symbols-outlined text-xl">shield_person</span>
                </div>
                <span className="text-lg font-bold tracking-tight text-stone-800 dark:text-white">Holmes<span className="text-primary">Home</span></span>
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a className="text-sm font-medium text-primary transition-colors" href="#">Dashboard</a>
              <a className="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-primary transition-colors" href="#">My Properties</a>
              <a className="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-primary transition-colors" href="#">Invoices</a>
              <a className="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-primary transition-colors" href="#">Settings</a>
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden sm:flex items-center justify-center bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all hover:shadow-md">
                <span className="material-symbols-outlined text-[20px] mr-2">add_circle</span>
                Request Service
              </button>
              <button className="relative p-2 text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-lg transition-colors">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 size-2 bg-secondary rounded-full border border-card-light dark:border-surface-dark"></span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center p-2 text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-lg transition-colors"
                title="Sign Out"
              >
                <span className="material-symbols-outlined">logout</span>
              </button>
              <div className="size-9 rounded-full bg-stone-200 overflow-hidden border border-stone-200 dark:border-stone-600 cursor-pointer">
                <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCooRgWQXUK6jdIrdSYeqWjfVhT4B0FxuYni-tjM9KsX1cZKRV5fTBR9UrjqYKTqWnuvy1gxEU4T3T32MBXL4x7oP--xNRoGzlR_sdj6JplWyzuyVVtdPedCQ3k-TSA1LDYnssuJhZxtaKmPDNwzJe3yXkMbAyW0xEpTXlBfUkqYMB2RQ6O0EVdeanIJf1itIlcMo8zzIeL6xM7OMoE3KlTbLV2_2hGD4fVbVTrSZ3k0s3U9Cx0JyLyGiAWGTWqsY4fmqqn4RcdiKtb"/>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-stone-800 dark:text-white mb-2">Villa 42, Palm Heights</h1>
              <div className="flex items-center text-stone-500 dark:text-stone-400 text-sm font-medium">
                <span className="material-symbols-outlined text-lg mr-1 text-primary">location_on</span>
                123 Coconut Grove, Miami, FL
              </div>
            </div>
            <div className="flex items-center gap-4 bg-card-light dark:bg-surface-dark px-4 py-3 rounded-lg shadow-sm border border-stone-200 dark:border-stone-700">
              <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-full text-orange-500 dark:text-orange-300">
                <span className="material-symbols-outlined">sunny</span>
              </div>
              <div>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium uppercase">Current Weather</p>
                <p className="text-sm font-bold text-stone-800 dark:text-white">78°F, Sunny</p>
              </div>
              <div className="w-px h-8 bg-stone-200 dark:bg-stone-700 mx-1"></div>
              <div>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium uppercase">Local Time</p>
                <p className="text-sm font-bold text-stone-800 dark:text-white">10:42 AM</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-stone-200 dark:border-stone-700 md:col-span-2 flex items-center justify-between relative overflow-hidden group">
                <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-amber-100/60 to-transparent dark:from-amber-900/20 dark:to-transparent pointer-events-none"></div>
                <div className="flex flex-col gap-1 relative z-10">
                  <span className="text-sm font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Current Status</span>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-4xl fill-1">verified_user</span>
                    <h2 className="text-3xl font-bold text-stone-800 dark:text-white">Secure</h2>
                  </div>
                  <p className="text-stone-600 dark:text-stone-300 mt-2">All sensors active. Perimeter is locked.</p>
                </div>
                <div className="hidden sm:flex flex-col items-end relative z-10">
                  <span className="text-xs font-medium text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-700 px-3 py-1 rounded-full border border-stone-200 dark:border-stone-600">Live Monitor</span>
                  <span className="text-sm text-stone-400 dark:text-stone-500 mt-2">System ID: #PG-9281</span>
                </div>
              </div>
              <div className="bg-card-light dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-stone-200 dark:border-stone-700 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <span className="material-symbols-outlined">history_toggle_off</span>
                  </div>
                  <span className="text-xs font-bold text-orange-800 bg-orange-100 dark:bg-orange-900/40 dark:text-orange-300 px-2 py-1 rounded">On Time</span>
                </div>
                <div>
                  <p className="text-sm text-stone-500 dark:text-stone-400">Last Inspection</p>
                  <p className="text-xl font-bold text-stone-800 dark:text-white">2 hours ago</p>
                </div>
              </div>
              <div className="bg-card-light dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-stone-200 dark:border-stone-700 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <span className="material-symbols-outlined">calendar_month</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-stone-500 dark:text-stone-400">Next Visit</p>
                  <p className="text-xl font-bold text-stone-800 dark:text-white">Oct 12, 2023</p>
                </div>
              </div>
            </section>

            <section className="bg-card-light dark:bg-surface-dark rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 flex flex-col">
              <div className="px-6 py-5 border-b border-stone-100 dark:border-stone-700 flex justify-between items-center">
                <h3 className="text-lg font-bold text-stone-800 dark:text-white">Recent Updates</h3>
                <button className="text-sm font-medium text-primary hover:text-primary-hover">View All</button>
              </div>
              <div className="p-6">
                <div className="flex gap-4 mb-8 relative group">
                  <div className="absolute left-[19px] top-10 bottom-[-32px] w-[2px] bg-stone-200 dark:bg-stone-700 group-last:hidden"></div>
                  <div className="relative z-10 flex-shrink-0">
                    <div className="size-10 rounded-full bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center border-2 border-white dark:border-surface-dark shadow-sm">
                      <span className="material-symbols-outlined text-primary text-xl">plumbing</span>
                    </div>
                  </div>
                  <div className="flex-grow pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-base font-bold text-stone-800 dark:text-white">Plumbing Check Completed</h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400">2 hours ago</p>
                      </div>
                    </div>
                    <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-3">
                      Routine inspection of all water points. No leaks detected. Water pressure is stable at 60 psi.
                    </p>
                    <div className="relative w-full max-w-sm h-48 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 dark:border-stone-700">
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent flex items-end p-3">
                        <p className="text-white text-xs font-medium">Main Valve Inspection.jpg</p>
                      </div>
                      <div className="w-full h-full bg-stone-300" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuATqx7uWABdlspLEnXU_J-RovXkYITTI2d0XDNv9YjhptbRqjVr5o34iXCSuvOkYexDSzU3-v0aX1hn12BrMpprbqTeAeuu6i7c-lRUFJwXGA3bTCCh7AtJ0slBNOAuExN74c7qEl2H5mUWVgSR9I62hSuOEtp6fzOepjUhS2t7mD9jNExzOTKX7USazjzVXpIYiOo8Zu-8mihEA-65kfU27fJRk--sjjU54-IMOMrcWcuzrKgYD9anMdxV3zYlqzh6GxrRuYj4aoXB')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mb-8 relative group">
                  <div className="absolute left-[19px] top-10 bottom-[-32px] w-[2px] bg-stone-200 dark:bg-stone-700"></div>
                  <div className="relative z-10 flex-shrink-0">
                    <div className="size-10 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center border-2 border-white dark:border-surface-dark shadow-sm">
                      <span className="material-symbols-outlined text-secondary dark:text-amber-400 text-xl">yard</span>
                    </div>
                  </div>
                  <div className="flex-grow pb-2">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="text-base font-bold text-stone-800 dark:text-white">Gardening Service</h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400">2 days ago</p>
                      </div>
                    </div>
                    <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                      Lawn mowed and hedges trimmed. Sprinkler system timer adjusted for seasonal change.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 relative group">
                  <div className="relative z-10 flex-shrink-0">
                    <div className="size-10 rounded-full bg-stone-100 dark:bg-stone-700 flex items-center justify-center border-2 border-white dark:border-surface-dark shadow-sm">
                      <span className="material-symbols-outlined text-stone-600 dark:text-stone-300 text-xl">local_police</span>
                    </div>
                  </div>
                  <div className="flex-grow pb-2">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="text-base font-bold text-stone-800 dark:text-white">Security Patrol</h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400">1 week ago</p>
                      </div>
                    </div>
                    <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                      Exterior perimeter check. All lighting fixtures operational.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <section className="bg-card-light dark:bg-surface-dark rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 overflow-hidden">
              <div className="px-6 py-5 border-b border-stone-100 dark:border-stone-700">
                <h3 className="text-lg font-bold text-stone-800 dark:text-white">Upcoming Schedule</h3>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4 px-2">
                  <span className="text-sm font-semibold text-stone-800 dark:text-white">October 2023</span>
                  <div className="flex gap-1">
                    <button className="p-1 hover:bg-stone-100 dark:hover:bg-stone-700 rounded text-stone-500"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                    <button className="p-1 hover:bg-stone-100 dark:hover:bg-stone-700 rounded text-stone-500"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3 items-center p-3 rounded-lg hover:bg-orange-50/50 dark:hover:bg-stone-700/50 transition-colors cursor-pointer group">
                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-orange-50 dark:bg-stone-700 rounded-lg text-primary font-bold">
                      <span className="text-xs uppercase">Oct</span>
                      <span className="text-lg leading-none">12</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-stone-800 dark:text-white group-hover:text-primary transition-colors">Property Inspection</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">09:00 AM - 11:00 AM</p>
                    </div>
                    <span className="material-symbols-outlined text-stone-400 text-sm group-hover:text-primary">arrow_forward_ios</span>
                  </div>
                  <div className="flex gap-3 items-center p-3 rounded-lg hover:bg-orange-50/50 dark:hover:bg-stone-700/50 transition-colors cursor-pointer group">
                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-stone-100 dark:bg-stone-700 rounded-lg text-stone-600 dark:text-stone-300 font-bold">
                      <span className="text-xs uppercase">Oct</span>
                      <span className="text-lg leading-none">18</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-stone-800 dark:text-white group-hover:text-primary transition-colors">Pool Maintenance</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">02:00 PM - 03:30 PM</p>
                    </div>
                    <span className="material-symbols-outlined text-stone-400 text-sm group-hover:text-primary">arrow_forward_ios</span>
                  </div>
                  <div className="flex gap-3 items-center p-3 rounded-lg hover:bg-orange-50/50 dark:hover:bg-stone-700/50 transition-colors cursor-pointer group">
                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-stone-100 dark:bg-stone-700 rounded-lg text-stone-600 dark:text-stone-300 font-bold">
                      <span className="text-xs uppercase">Oct</span>
                      <span className="text-lg leading-none">25</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-stone-800 dark:text-white group-hover:text-primary transition-colors">HVAC Filter Change</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">10:00 AM - 11:00 AM</p>
                    </div>
                    <span className="material-symbols-outlined text-stone-400 text-sm group-hover:text-primary">arrow_forward_ios</span>
                  </div>
                </div>
                <button className="w-full mt-4 py-2 text-sm text-center text-primary font-medium hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors">
                  View Full Calendar
                </button>
              </div>
            </section>

            <section className="bg-primary text-white rounded-xl shadow-md overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-9xl">support_agent</span>
              </div>
              <div className="p-6 relative z-10">
                <h3 className="text-lg font-bold mb-2">Need Assistance?</h3>
                <p className="text-orange-50 text-sm mb-6">Your property manager, David, is available for urgent requests.</p>
                <div className="flex flex-col gap-3">
                  <button className="flex items-center justify-center w-full bg-white text-primary font-bold py-2.5 rounded-lg text-sm hover:bg-orange-50 transition-colors">
                    <span className="material-symbols-outlined text-lg mr-2">call</span>
                    Call Manager
                  </button>
                  <button className="flex items-center justify-center w-full bg-primary-hover border border-white/20 text-white font-bold py-2.5 rounded-lg text-sm hover:bg-black/10 transition-colors">
                    <span className="material-symbols-outlined text-lg mr-2">mail</span>
                    Send Message
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Floating Action Button */}
        <button className="sm:hidden fixed bottom-6 right-6 size-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-primary-hover transition-transform hover:scale-105 active:scale-95">
          <span className="material-symbols-outlined text-2xl">add</span>
        </button>
      </main>
    </div>
  );
}
