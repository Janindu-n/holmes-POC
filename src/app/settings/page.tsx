'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { UserProfile } from '@/types/user';
import Navbar from '@/components/Navbar';

export default function Settings() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth || !db) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db!, 'users', user.uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data() as UserProfile);
        }
      } else {
        router.push('/auth/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
  if (!userProfile) return null;

  return (
    <div className="bg-dashboard-bg dark:bg-background-dark min-h-screen flex flex-col transition-colors duration-200">
      <Navbar user={userProfile} />

      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden">
          <div className="p-8 border-b border-stone-100 dark:border-stone-800">
            <h1 className="text-3xl font-black text-stone-900 dark:text-white">Account Settings</h1>
            <p className="text-stone-500 dark:text-stone-400 font-medium">Manage your personal information and preferences.</p>
          </div>

          <div className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="size-24 rounded-2xl bg-orange-50 dark:bg-orange-900/20 overflow-hidden border-2 border-primary shadow-lg">
                  <img
                    alt="User Profile"
                    className="w-full h-full object-cover"
                    src={userProfile.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.name)}&background=ea580c&color=fff&size=200`}
                  />
                </div>
              </div>
              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase text-stone-400 tracking-widest mb-1">Full Name</label>
                  <p className="text-lg font-bold text-stone-800 dark:text-white">{userProfile.name}</p>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-stone-400 tracking-widest mb-1">Email Address</label>
                  <p className="text-lg font-bold text-stone-800 dark:text-white">{userProfile.email}</p>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-stone-400 tracking-widest mb-1">Account Role</label>
                  <span className="inline-block px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-sm font-black uppercase rounded tracking-wider">
                    {userProfile.role}
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-stone-400 tracking-widest mb-1">Member Since</label>
                  <p className="text-lg font-bold text-stone-800 dark:text-white">{new Date(userProfile.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-stone-100 dark:border-stone-800">
              <h3 className="text-xl font-bold text-stone-800 dark:text-white mb-4">Privacy & Security</h3>
              <div className="space-y-4">
                <button className="flex items-center justify-between w-full p-4 rounded-xl border border-stone-200 dark:border-stone-700 hover:border-primary transition-all group">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-stone-400 group-hover:text-primary">lock</span>
                    <span className="font-bold text-stone-700 dark:text-stone-300">Change Password</span>
                  </div>
                  <span className="material-symbols-outlined text-stone-300 group-hover:text-primary">chevron_right</span>
                </button>
                <button className="flex items-center justify-between w-full p-4 rounded-xl border border-stone-200 dark:border-stone-700 hover:border-primary transition-all group">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-stone-400 group-hover:text-primary">verified_user</span>
                    <span className="font-bold text-stone-700 dark:text-stone-300">Two-Factor Authentication</span>
                  </div>
                  <div className="bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded text-[10px] font-black uppercase text-stone-500">Disabled</div>
                </button>
              </div>
            </div>

            <div className="pt-8 border-t border-stone-100 dark:border-stone-800">
              <button className="text-red-500 font-bold hover:underline flex items-center gap-2">
                <span className="material-symbols-outlined">delete_forever</span>
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
