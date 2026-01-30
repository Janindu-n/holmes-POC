'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Job, JobStatus } from '@/types/job';
import { UserProfile } from '@/types/user';

export default function SubmitJob() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [nature, setNature] = useState<'home' | 'commercial' | 'industrial'>('home');

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (db) {
          const userDoc = await getDoc(doc(db!, 'users', user.uid));
          if (userDoc.exists()) {
            const profile = userDoc.data() as UserProfile;
            if (profile.role !== 'client') {
              router.push('/dashboard');
            } else {
              setUserProfile(profile);
            }
          }
        }
      } else {
        router.push('/auth/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile || !db) return;

    setSubmitting(true);
    setError('');

    try {
      const now = new Date().toISOString();
      const initialStatus: JobStatus = 'consultation_pending';

      const newJob: Omit<Job, 'id'> = {
        customerId: userProfile.uid,
        customerName: userProfile.name,
        contractorId: null,
        contractorName: null,
        description,
        location,
        nature,
        status: initialStatus,
        timelineDisplayStatus: 'Consultation Pending',
        currentSpecialist: null,
        currentTeamMembers: [],
        connectionStatus: 'offline',
        quotationId: null,
        createdAt: now,
        timeline: [
          {
            status: initialStatus,
            updatedAt: now,
            completedAt: null,
            isActive: true,
            notes: 'Job request submitted. Waiting for a specialist to be assigned.'
          }
        ]
      };

      await addDoc(collection(db!, 'jobs'), newJob);
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit job request');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden border border-stone-200 dark:border-stone-700">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg">
              <span className="material-symbols-outlined text-3xl">add_task</span>
            </div>
          </div>
          <h2 className="text-3xl font-black text-center text-stone-900 dark:text-white mb-2">
            Submit a Job
          </h2>
          <p className="text-center text-stone-500 dark:text-stone-400 text-sm mb-8">
            Tell us what you need and we&apos;ll get back to you with a free consultation.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2">
                Property Nature
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['home', 'commercial', 'industrial'] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setNature(option)}
                    className={`py-2 px-4 text-sm font-bold rounded-lg border transition-all ${
                      nature === option
                        ? 'bg-primary border-primary text-white shadow-md'
                        : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-primary'
                    }`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2">
                Location
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-600 dark:bg-stone-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                placeholder="e.g. Colombo 07, Sri Lanka"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2">
                Job Description
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-600 dark:bg-stone-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none resize-none"
                placeholder="Describe the issue or maintenance required..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {error && (
              <p className="text-red-500 text-xs italic font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary hover:bg-primary-hover text-white font-black py-3 rounded-lg shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Request Consultation'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
