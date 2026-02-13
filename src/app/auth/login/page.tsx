'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Sentinel: Initialization guard
    if (!auth) {
      setError('Authentication service is currently unavailable');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-white">
              <span className="material-symbols-outlined text-2xl">login</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-stone-900 dark:text-white mb-8">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-600 dark:bg-stone-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  Password
                </label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
              <input
                type="password"
                required
                className="w-full px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-600 dark:bg-stone-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs italic">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-2.5 rounded-lg shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-stone-500">
              Don&apos;t have an account?{' '}
              <Link href="/onboarding" className="text-primary font-bold hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
