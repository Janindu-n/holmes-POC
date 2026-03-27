'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * A security component that protects client-side routes.
 * It ensures that only authenticated users can access the wrapped content.
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If auth is not initialized (e.g., during build or missing config),
    // we should fail safely.
    if (!auth || !auth.app) {
      console.warn('Firebase Auth is not initialized. Redirecting to home.');
      router.push('/');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect unauthenticated users to login page
        router.push('/auth/login');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg mx-auto mb-4 animate-pulse">
            <span className="material-symbols-outlined text-3xl">lock</span>
          </div>
          <p className="text-stone-600 dark:text-stone-400 font-medium">Securing your session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
