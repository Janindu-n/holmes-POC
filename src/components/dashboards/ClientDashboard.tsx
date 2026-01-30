'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Job } from '@/types/job';
import { UserProfile } from '@/types/user';

interface ClientDashboardProps {
  user: UserProfile;
}

export default function ClientDashboard({ user }: ClientDashboardProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;

    const q = query(
      collection(db!, 'jobs'),
      where('customerId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
      setJobs(jobsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid]);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-stone-800 dark:text-white mb-2">Welcome back, {user.name}</h1>
        <p className="text-stone-500 dark:text-stone-400 font-medium">Manage your properties and service requests.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <section className="bg-card-light dark:bg-surface-dark rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 flex flex-col">
            <div className="px-6 py-5 border-b border-stone-100 dark:border-stone-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-stone-800 dark:text-white">Active Job Requests</h3>
              <Link href="/jobs/submit" className="text-sm font-bold text-primary hover:underline">Request New Service</Link>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-4 text-stone-300 dark:text-stone-600">
                    <span className="material-symbols-outlined text-6xl">assignment_late</span>
                  </div>
                  <p className="text-stone-500 dark:text-stone-400 font-medium">You haven&apos;t submitted any job requests yet.</p>
                  <Link href="/jobs/submit" className="mt-4 inline-block text-primary font-bold hover:underline text-sm">Submit your first request</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <Link
                      key={job.id}
                      href={`/jobs/${job.id}`}
                      className="flex items-center gap-4 p-4 rounded-xl border border-stone-100 dark:border-stone-800 hover:border-primary/50 hover:bg-orange-50/30 dark:hover:bg-orange-900/5 transition-all group"
                    >
                      <div className={`flex-shrink-0 size-12 rounded-xl flex items-center justify-center ${
                        job.status === 'job_completed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-primary'
                      }`}>
                        <span className="material-symbols-outlined text-2xl">
                          {job.nature === 'home' ? 'home' : job.nature === 'commercial' ? 'store' : 'factory'}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col">
                            <h4 className="font-bold text-stone-800 dark:text-white group-hover:text-primary transition-colors line-clamp-1">{job.description}</h4>
                            <span className="text-[10px] font-black text-primary uppercase tracking-wider">{job.specialty}</span>
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                            {job.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-stone-500 dark:text-stone-400">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">location_on</span> {job.location}
                          </span>
                          <span>•</span>
                          <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-stone-300 group-hover:text-primary transition-colors">arrow_forward_ios</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <section className="bg-card-light dark:bg-surface-dark rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-bold text-stone-800 dark:text-white mb-4">Account Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                <span className="text-sm text-stone-500">Active Requests</span>
                <span className="font-bold text-stone-800 dark:text-white">{jobs.filter(j => j.status !== 'job_completed' && j.status !== 'cancelled').length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                <span className="text-sm text-stone-500">Completed Jobs</span>
                <span className="font-bold text-stone-800 dark:text-white">{jobs.filter(j => j.status === 'job_completed').length}</span>
              </div>
            </div>
          </section>

          <section className="bg-primary text-white rounded-xl shadow-md p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-9xl">support_agent</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Premium Support</h3>
            <p className="text-orange-50 text-sm mb-6">Need urgent help? Our property managers are available 24/7 for premium members.</p>
            <button className="w-full bg-white text-primary font-bold py-2.5 rounded-lg text-sm hover:bg-orange-50 transition-colors">
              Upgrade to Premium
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
