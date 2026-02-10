'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Validate role against allowlist
  const allowedRoles = ['client', 'specialist'];
  const queryRole = searchParams.get('role');
  const role = queryRole && allowedRoles.includes(queryRole) ? queryRole : 'client';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Input validation
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    // Initialization guards
    if (!auth || !db) {
      setError('Authentication service is not available. Please try again later.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      // Save user role and profile to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      });

      router.push('/dashboard');
    } catch (err: unknown) {
      // Map Firebase error codes to user-friendly messages
      if (err && typeof err === 'object' && 'code' in err) {
        const firebaseErr = err as { code: string };
        switch (firebaseErr.code) {
          case 'auth/email-already-in-use':
            setError('This email is already in use. Please try logging in instead.');
            break;
          case 'auth/weak-password':
            setError('The password is too weak. Please use a stronger password.');
            break;
          case 'auth/invalid-email':
            setError('The email address is invalid. Please check and try again.');
            break;
          default:
            setError('Failed to create an account. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
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
              <span className="material-symbols-outlined text-2xl">person_add</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-stone-900 dark:text-white mb-2">
            Create your account
          </h2>
          <p className="text-center text-stone-500 dark:text-stone-400 text-sm mb-8">
            Joining as a <span className="font-bold text-primary capitalize">{role}</span>
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-600 dark:bg-stone-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                Password
              </label>
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
              {loading ? 'Creating account...' : 'Register Now'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-stone-500">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Register() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
