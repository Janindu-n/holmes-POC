'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot, orderBy, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Job } from '@/types/job';
import { UserProfile } from '@/types/user';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function JobsPage() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
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
    });

    return () => unsubscribeAuth();
  }, [router]);

  useEffect(() => {
    if (!db || !userProfile) return;

    let q;
    if (userProfile.role === 'client') {
      q = query(
        collection(db!, 'jobs'),
        where('customerId', '==', userProfile.uid),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(
        collection(db!, 'jobs'),
        where('contractorId', '==', userProfile.uid),
        orderBy('createdAt', 'desc')
      );
    }

    const unsubscribeJobs = onSnapshot(q, (snapshot) => {
      setJobs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job)));
      setLoading(false);
    });

    return () => unsubscribeJobs();
  }, [userProfile]);

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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-stone-900 dark:text-white">Your Jobs</h1>
            <p className="text-stone-500 dark:text-stone-400">Manage all your {userProfile.role === 'client' ? 'requests' : 'assignments'} in one place.</p>
          </div>
          {userProfile.role === 'client' && (
            <Link
              href="/jobs/submit"
              className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl font-bold shadow-lg transition-all"
            >
              Post New Job
            </Link>
          )}
        </div>

        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden">
          {jobs.length === 0 ? (
            <div className="p-12 text-center">
              <div className="flex justify-center mb-4 text-stone-300">
                <span className="material-symbols-outlined text-6xl">work_off</span>
              </div>
              <p className="text-stone-500 dark:text-stone-400 font-medium text-lg">No jobs found.</p>
              {userProfile.role === 'client' && (
                <Link href="/jobs/submit" className="text-primary font-bold hover:underline mt-2 inline-block">Submit a new request to get started.</Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-stone-50 dark:bg-stone-800/50 border-b border-stone-100 dark:border-stone-800">
                  <tr>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-stone-500">Job Description</th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-stone-500">Specialty</th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-stone-500">Status</th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-stone-500">Location</th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-stone-500 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-orange-50/20 dark:hover:bg-orange-900/5 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-stone-800 dark:text-white line-clamp-1">{job.description}</p>
                        <p className="text-[10px] text-stone-400 uppercase font-black tracking-tighter mt-0.5">ID: {job.id?.slice(0, 8)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-[10px] font-black uppercase rounded">
                          {job.specialty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded ${
                          job.status === 'job_completed' ? 'bg-green-100 text-green-700' :
                          job.status === 'job_started' ? 'bg-blue-100 text-blue-700' :
                          'bg-orange-100 text-primary'
                        }`}>
                          {job.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-500 dark:text-stone-400">
                        {job.location}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="text-primary font-black text-sm hover:underline"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
