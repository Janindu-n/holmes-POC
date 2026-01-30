'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, query, where, onSnapshot, orderBy, limit, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Job } from '@/types/job';
import { UserProfile } from '@/types/user';

interface SpecialistDashboardProps {
  user: UserProfile;
}

export default function SpecialistDashboard({ user }: SpecialistDashboardProps) {
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [availableJobs, setAvailableJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;

    // Fetch jobs assigned to this specialist
    const myJobsQuery = query(
      collection(db!, 'jobs'),
      where('contractorId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    // Fetch available jobs (not yet assigned) that match specialist specialty
    const availableJobsQuery = query(
      collection(db!, 'jobs'),
      where('contractorId', '==', null),
      where('status', '==', 'consultation_pending'),
      where('specialty', '==', user.specialty || 'General'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubscribeMyJobs = onSnapshot(myJobsQuery, (snapshot) => {
      setMyJobs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job)));
    });

    const unsubscribeAvailableJobs = onSnapshot(availableJobsQuery, (snapshot) => {
      setAvailableJobs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job)));
      setLoading(false);
    });

    return () => {
      unsubscribeMyJobs();
      unsubscribeAvailableJobs();
    };
  }, [user.uid, user.specialty]);

  const handlePickUpJob = async (jobId: string) => {
    if (!db) return;
    try {
      const now = new Date().toISOString();
      const jobRef = doc(db!, 'jobs', jobId);

      // Fetch job to get current timeline
      const jobSnap = await getDoc(jobRef);
      if (!jobSnap.exists()) return;
      const jobData = jobSnap.data() as Job;

      const newTimelineEntry = {
        status: 'picked_up' as const,
        updatedAt: now,
        completedAt: null,
        isActive: true,
        notes: `Job picked up by specialist ${user.name}.`
      };

      const updatedTimeline = (jobData.timeline || []).map(t => ({ ...t, isActive: false }));
      updatedTimeline.push(newTimelineEntry);

      await updateDoc(jobRef, {
        contractorId: user.uid,
        contractorName: user.name,
        currentSpecialist: user.name,
        status: 'picked_up',
        timelineDisplayStatus: 'Job Picked Up',
        timeline: updatedTimeline
      });
    } catch (error) {
      console.error('Error picking up job:', error);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-stone-800 dark:text-white mb-2">Specialist Portal</h1>
        <p className="text-stone-500 dark:text-stone-400 font-medium">Manage your assignments and provide expert service.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* My Assigned Jobs */}
          <section className="bg-card-light dark:bg-surface-dark rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 flex flex-col">
            <div className="px-6 py-5 border-b border-stone-100 dark:border-stone-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-stone-800 dark:text-white">My Active Assignments</h3>
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">{myJobs.length} Active</span>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : myJobs.length === 0 ? (
                <div className="text-center py-8 text-stone-500 dark:text-stone-400 italic">
                  No active assignments found.
                </div>
              ) : (
                <div className="space-y-4">
                  {myJobs.map((job) => (
                    <Link
                      key={job.id}
                      href={`/jobs/${job.id}`}
                      className="flex items-center gap-4 p-4 rounded-xl border border-stone-100 dark:border-stone-800 hover:border-primary/50 hover:bg-orange-50/30 dark:hover:bg-orange-900/5 transition-all group"
                    >
                      <div className="flex-shrink-0 size-12 rounded-xl bg-primary text-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">construction</span>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col">
                            <h4 className="font-bold text-stone-800 dark:text-white group-hover:text-primary transition-colors line-clamp-1">{job.description}</h4>
                            <span className="text-[10px] font-black text-primary uppercase tracking-wider">{job.specialty}</span>
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-900/40 text-primary">
                            {job.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-stone-500 dark:text-stone-400">
                          <span className="flex items-center gap-1 font-bold">
                            <span className="material-symbols-outlined text-sm">person</span> {job.customerName}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">location_on</span> {job.location}
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-stone-300 group-hover:text-primary transition-colors">arrow_forward_ios</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Available Jobs to Pick Up */}
          <section className="bg-card-light dark:bg-surface-dark rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 flex flex-col">
            <div className="px-6 py-5 border-b border-stone-100 dark:border-stone-700">
              <h3 className="text-lg font-bold text-stone-800 dark:text-white">Available Opportunities</h3>
            </div>
            <div className="p-6">
              {availableJobs.length === 0 ? (
                <div className="text-center py-8 text-stone-500 dark:text-stone-400 italic">
                  No new job requests available at the moment.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-5 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 flex flex-col gap-4"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex gap-2">
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded tracking-wider">{job.nature}</span>
                            <span className="px-2 py-0.5 bg-orange-50 text-primary text-[10px] font-black uppercase rounded tracking-wider">{job.specialty}</span>
                          </div>
                          <span className="text-[10px] text-stone-400">{new Date(job.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h4 className="font-bold text-stone-800 dark:text-white line-clamp-2 min-h-[3rem]">{job.description}</h4>
                        <div className="flex items-center gap-2 mt-3 text-xs text-stone-500 dark:text-stone-400">
                          <span className="material-symbols-outlined text-sm">location_on</span> {job.location}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="flex-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-primary hover:text-primary py-2 rounded-lg text-[10px] font-bold text-center transition-all"
                        >
                          Details
                        </Link>
                        <button
                          onClick={() => job.id && handlePickUpJob(job.id)}
                          className="flex-1 bg-primary text-white hover:bg-primary-hover py-2 rounded-lg text-[10px] font-bold transition-all"
                        >
                          Pick Up Job
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <section className="bg-card-light dark:bg-surface-dark rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-bold text-stone-800 dark:text-white mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                <div className="flex flex-col">
                  <span className="text-[10px] text-stone-500 uppercase font-black">Rating</span>
                  <span className="font-bold text-stone-800 dark:text-white">4.9 / 5.0</span>
                </div>
                <span className="material-symbols-outlined text-amber-400 fill-1">star</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                <div className="flex flex-col">
                  <span className="text-[10px] text-stone-500 uppercase font-black">Jobs Completed</span>
                  <span className="font-bold text-stone-800 dark:text-white">124</span>
                </div>
                <span className="material-symbols-outlined text-green-500">task_alt</span>
              </div>
            </div>
          </section>

          <Link
            href="/jobs/browse"
            className="group p-6 bg-stone-800 rounded-xl text-white shadow-lg transition-all hover:bg-black overflow-hidden relative"
          >
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">Marketplace</h3>
              <p className="text-stone-400 text-sm">Browse all open requests across the island.</p>
            </div>
            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-8xl opacity-10 group-hover:opacity-20 transition-opacity">search_insights</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
