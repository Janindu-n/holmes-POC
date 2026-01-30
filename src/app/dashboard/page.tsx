'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { UserProfile } from '@/types/user';
import Navbar from '@/components/Navbar';
import ClientDashboard from '@/components/dashboards/ClientDashboard';
import SpecialistDashboard from '@/components/dashboards/SpecialistDashboard';

export default function Dashboard() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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

    return () => unsubscribe();
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
        {userProfile.role === 'client' ? (
          <ClientDashboard user={userProfile} />
        ) : (
          <SpecialistDashboard user={userProfile} />
        )}
      </main>
    </div>
  );
}
