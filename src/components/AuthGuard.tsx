'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

/**
 * AuthGuard component protects routes by ensuring the user is authenticated.
 * It uses Firebase onAuthStateChanged to monitor the session.
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Basic check for auth instance existence
    if (!auth || !auth.app) {
      console.warn('Auth instance is not properly initialized. Redirecting to home.');
      router.push('/');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (!user) {
        // Not authenticated, redirect to login
        router.push('/auth/login');
      } else {
        // Authenticated
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-stone-600 dark:text-stone-400 font-medium animate-pulse">Securing your session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
