'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { UserProfile } from '@/types/user';
import Navbar from '@/components/Navbar';

export default function InvoicesPage() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (db) {
          const userDoc = await getDoc(doc(db!, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          }
        }
      } else {
        router.push('/auth/login');
      }
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!userProfile) return null;

  return (
    <div className="bg-dashboard-bg dark:bg-background-dark min-h-screen flex flex-col transition-colors duration-200">
      <Navbar user={userProfile} />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-stone-900 dark:text-white">Invoices</h1>
          <p className="text-stone-500 dark:text-stone-400 font-medium">Manage your billing and payments.</p>
        </div>

        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex size-20 items-center justify-center rounded-2xl bg-orange-50 text-primary dark:bg-orange-900/20">
              <span className="material-symbols-outlined text-5xl">receipt_long</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-stone-800 dark:text-white mb-2">No Invoices Yet</h2>
          <p className="text-stone-500 dark:text-stone-400 max-w-md mx-auto">
            Once you complete jobs and process payments, your invoices will appear here for your records.
          </p>
        </div>
      </main>
    </div>
  );
}
