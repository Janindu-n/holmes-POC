'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Safety check for unconfigured Firebase environment
    if (!auth || !auth.app) {
      console.warn('Firebase Auth is not initialized. Redirecting to home.');
      router.push('/');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/auth/login');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 border-4 border-stone-200 border-t-primary rounded-full animate-spin"></div>
          <p className="text-stone-600 dark:text-stone-400 font-medium animate-pulse">
            Securing your session...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
