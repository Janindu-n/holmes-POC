'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { UserProfile } from '@/types/user';

interface NavbarProps {
  user: UserProfile;
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      if (!auth) {
        router.push('/');
        return;
      }
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-card-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex items-center justify-center size-8 bg-primary rounded-lg text-white shadow-sm group-hover:rotate-6 transition-transform">
                <span className="material-symbols-outlined text-xl">shield_person</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-stone-800 dark:text-white">
                Holmes<span className="text-primary">Home</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-bold text-primary transition-colors" href="/dashboard">Dashboard</Link>
            <Link className="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-primary transition-colors" href="/jobs">Jobs</Link>
            <Link className="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-primary transition-colors" href="/invoices">Invoices</Link>
            <Link className="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-primary transition-colors" href="/settings">Settings</Link>
          </div>

          <div className="flex items-center gap-4">
            {user.role === 'client' && (
              <Link href="/jobs/submit" className="hidden sm:flex items-center justify-center bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all hover:shadow-md">
                <span className="material-symbols-outlined text-[20px] mr-2">add_circle</span>
                Request Service
              </Link>
            )}

            <Link
              href="/notifications"
              className="relative p-2 text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined">notifications</span>
              {/* Simple notification dot if needed */}
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center p-2 text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-lg transition-colors"
              aria-label="Sign Out"
              title="Sign Out"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>

            <Link href="/settings" className="size-9 rounded-full bg-stone-200 overflow-hidden border border-stone-200 dark:border-stone-600 cursor-pointer hover:opacity-80 transition-opacity">
              <img
                alt="User Profile"
                className="w-full h-full object-cover"
                src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ea580c&color=fff`}
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
