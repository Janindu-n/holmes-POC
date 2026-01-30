'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Job, JobStatus, TimelineEntry } from '@/types/job';
import { Quotation } from '@/types/quotation';
import { UserProfile } from '@/types/user';
import Navbar from '@/components/Navbar';

export default function JobDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [job, setJob] = useState<Job | null>(null);
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');

  // Quotation Form State
  const [quotePrice, setQuotePrice] = useState<string>('');
  const [quoteDesc, setQuoteDesc] = useState('');

  useEffect(() => {
    if (!auth || !db) return;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db!, 'users', user.uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data() as UserProfile);
        }
      } else {
        router.push('/auth/login');
      }
    });

    const unsubscribeJob = onSnapshot(doc(db!, 'jobs', id), (snapshot) => {
      if (snapshot.exists()) {
        setJob({ id: snapshot.id, ...snapshot.data() } as Job);
      } else {
        setError('Job not found');
      }
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeJob();
    };
  }, [id, router]);

  useEffect(() => {
    if (!db || !job?.quotationId) return;

    const unsubscribeQuote = onSnapshot(doc(db!, 'quotations', job.quotationId), (snapshot) => {
      if (snapshot.exists()) {
        setQuotation({ id: snapshot.id, ...snapshot.data() } as Quotation);
      }
    });

    return () => unsubscribeQuote();
  }, [job?.quotationId]);

  const updateJobStatus = async (newStatus: JobStatus, displayStatus: string, notes: string) => {
    if (!db || !job || !userProfile) return;
    setActionLoading(true);
    try {
      const now = new Date().toISOString();
      const newTimelineEntry: TimelineEntry = {
        status: newStatus,
        updatedAt: now,
        completedAt: null,
        isActive: true,
        notes
      };

      const updatedTimeline = (job.timeline || []).map(t => ({ ...t, isActive: false }));
      updatedTimeline.push(newTimelineEntry);

      await updateDoc(doc(db!, 'jobs', id), {
        status: newStatus,
        timelineDisplayStatus: displayStatus,
        timeline: updatedTimeline,
        ...(newStatus === 'consultation_started' && userProfile.role === 'specialist' ? {
          contractorId: userProfile.uid,
          contractorName: userProfile.name,
          currentSpecialist: userProfile.name
        } : {})
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const submitQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || !job || !userProfile) return;

    setActionLoading(true);
    try {
      const now = new Date().toISOString();
      const price = parseFloat(quotePrice);

      const newQuote: Omit<Quotation, 'id'> = {
        jobId: id,
        specialistId: userProfile.uid,
        specialistName: userProfile.name,
        price,
        currency: 'LKR',
        description: quoteDesc,
        items: [{ name: 'Total Service Cost', amount: price }],
        status: 'pending',
        createdAt: now,
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };

      const quoteDoc = await addDoc(collection(db!, 'quotations'), newQuote);

      const newStatus: JobStatus = 'quotation_submitted';
      const updatedTimeline = (job.timeline || []).map(t => ({ ...t, isActive: false }));
      updatedTimeline.push({
        status: newStatus,
        updatedAt: now,
        completedAt: null,
        isActive: true,
        notes: `Quotation of LKR ${price.toLocaleString()} submitted by ${userProfile.name}.`
      });

      await updateDoc(doc(db!, 'jobs', id), {
        quotationId: quoteDoc.id,
        status: newStatus,
        timelineDisplayStatus: 'Quotation Submitted',
        timeline: updatedTimeline
      });

      setQuotePrice('');
      setQuoteDesc('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const toggleStreaming = async () => {
    if (!db || !job) return;
    try {
      await updateDoc(doc(db!, 'jobs', id), {
        isStreaming: !job.isStreaming
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const actionQuotation = async (action: 'accepted' | 'rejected') => {
    if (!db || !job || !quotation) return;

    setActionLoading(true);
    try {
      const now = new Date().toISOString();
      await updateDoc(doc(db!, 'quotations', job.quotationId!), {
        status: action
      });

      const newStatus: JobStatus = action === 'accepted' ? 'quotation_accepted' : 'consultation_started';
      const updatedTimeline = (job.timeline || []).map(t => ({ ...t, isActive: false }));
      updatedTimeline.push({
        status: newStatus,
        updatedAt: now,
        completedAt: null,
        isActive: true,
        notes: action === 'accepted'
          ? 'Quotation accepted by customer. Ready to start job.'
          : 'Quotation rejected. Specialist may submit a new one after consultation.'
      });

      await updateDoc(doc(db!, 'jobs', id), {
        status: newStatus,
        timelineDisplayStatus: action === 'accepted' ? 'Quotation Accepted' : 'Consultation In Progress',
        timeline: updatedTimeline,
        ...(action === 'rejected' ? { quotationId: null } : {})
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
  if (!userProfile || !job) return null;

  const isCustomer = userProfile.role === 'client';
  const isSpecialist = userProfile.role === 'specialist';
  const isAssignedSpecialist = job.contractorId === userProfile.uid;

  return (
    <div className="bg-dashboard-bg dark:bg-background-dark min-h-screen flex flex-col transition-colors duration-200">
      <Navbar user={userProfile} />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Side: Job Info & Actions */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-black uppercase rounded-full tracking-wider mb-2 inline-block">
                      {job.nature}
                    </span>
                    <h1 className="text-3xl font-black text-stone-900 dark:text-white">{job.description}</h1>
                    <div className="flex items-center gap-2 mt-2 text-stone-500 dark:text-stone-400">
                      <span className="material-symbols-outlined text-lg">location_on</span>
                      <span className="font-medium">{job.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-stone-400 uppercase font-bold">Status</p>
                    <p className="text-primary font-black text-lg">{job.timelineDisplayStatus}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-6 border-y border-stone-100 dark:border-stone-800">
                  <div>
                    <p className="text-xs text-stone-400 uppercase font-bold mb-1">Customer</p>
                    <p className="font-bold text-stone-800 dark:text-white">{job.customerName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 uppercase font-bold mb-1">Specialist</p>
                    <p className="font-bold text-stone-800 dark:text-white">{job.contractorName || 'Not Assigned'}</p>
                  </div>
                </div>

                {/* Role-Based Actions */}
                <div className="mt-8">
                  {isSpecialist && job.status === 'consultation_pending' && (
                    <button
                      onClick={() => updateJobStatus('consultation_started', 'Consultation In Progress', 'Specialist accepted the consultation request.')}
                      disabled={actionLoading}
                      className="w-full bg-primary hover:bg-primary-hover text-white font-black py-4 rounded-xl shadow-lg transition-all"
                    >
                      {actionLoading ? 'Processing...' : 'Accept Consultation'}
                    </button>
                  )}

                  {isAssignedSpecialist && job.status === 'consultation_started' && (
                    <div className="space-y-4">
                      <div className="p-6 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/30">
                        <h3 className="font-bold text-primary mb-2">Prepare Quotation</h3>
                        <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">Provide a detailed price estimate for the customer to review.</p>
                        <form onSubmit={submitQuotation} className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Estimated Price (LKR)</label>
                            <input
                              type="number"
                              required
                              placeholder="e.g. 25000"
                              className="w-full px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-600 dark:bg-stone-800 outline-none focus:ring-2 focus:ring-primary"
                              value={quotePrice}
                              onChange={(e) => setQuotePrice(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Scope of Work</label>
                            <textarea
                              required
                              rows={3}
                              placeholder="What's included in this price?"
                              className="w-full px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-600 dark:bg-stone-800 outline-none focus:ring-2 focus:ring-primary resize-none"
                              value={quoteDesc}
                              onChange={(e) => setQuoteDesc(e.target.value)}
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={actionLoading}
                            className="w-full bg-primary hover:bg-primary-hover text-white font-black py-3 rounded-lg shadow-md transition-all"
                          >
                            Submit Quotation
                          </button>
                        </form>
                      </div>
                    </div>
                  )}

                  {isAssignedSpecialist && job.status === 'quotation_accepted' && (
                    <button
                      onClick={() => updateJobStatus('job_started', 'Job In Progress', 'Specialist has started the job.')}
                      disabled={actionLoading}
                      className="w-full bg-primary hover:bg-primary-hover text-white font-black py-4 rounded-xl shadow-lg transition-all"
                    >
                      Start Work
                    </button>
                  )}

                  {isAssignedSpecialist && job.status === 'job_started' && (
                    <div className="flex gap-4">
                      <button
                        onClick={toggleStreaming}
                        className={`flex-1 ${job.isStreaming ? 'bg-red-600 hover:bg-red-700' : 'bg-stone-900 hover:bg-black'} text-white font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2`}
                      >
                        <span className={`material-symbols-outlined ${job.isStreaming ? 'animate-pulse' : ''} ${job.isStreaming ? 'text-white' : 'text-red-500'}`}>videocam</span>
                        {job.isStreaming ? 'Stop Streaming' : 'Start Live Stream'}
                      </button>
                      <button
                        onClick={() => updateJobStatus('job_completed', 'Job Completed', 'Specialist marked the job as completed.')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl shadow-lg transition-all"
                      >
                        Complete Job
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Quotation View */}
            {quotation && (
              <section className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden">
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black text-stone-900 dark:text-white">Service Quotation</h2>
                    <span className={`px-3 py-1 text-xs font-black uppercase rounded-full ${
                      quotation.status === 'accepted' ? 'bg-green-100 text-green-600' :
                      quotation.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {quotation.status}
                    </span>
                  </div>

                  <div className="p-6 bg-stone-50 dark:bg-stone-800/30 rounded-xl mb-6">
                    <p className="text-sm text-stone-600 dark:text-stone-300 mb-4 italic">&quot;{quotation.description}&quot;</p>
                    <div className="flex justify-between items-end border-t border-stone-200 dark:border-stone-700 pt-4">
                      <div>
                        <p className="text-xs text-stone-400 uppercase font-bold">Total Estimate</p>
                        <p className="text-3xl font-black text-stone-900 dark:text-white">
                          <span className="text-lg font-bold mr-1">LKR</span>
                          {quotation.price.toLocaleString()}
                        </p>
                      </div>
                      <p className="text-xs text-stone-400">Valid until {new Date(quotation.validUntil).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {isCustomer && quotation.status === 'pending' && (
                    <div className="flex gap-4">
                      <button
                        onClick={() => actionQuotation('accepted')}
                        className="flex-1 bg-primary hover:bg-primary-hover text-white font-black py-4 rounded-xl shadow-lg transition-all"
                      >
                        Accept & Proceed
                      </button>
                      <button
                        onClick={() => actionQuotation('rejected')}
                        className="flex-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 font-bold py-4 rounded-xl hover:bg-stone-50 transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Right Side: Timeline */}
          <div className="lg:col-span-1">
            <section className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 p-8 h-fit">
              <h2 className="text-xl font-black text-stone-900 dark:text-white mb-8">Job Timeline</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-stone-200 dark:before:to-stone-800">
                {(job.timeline || []).slice().reverse().map((entry, idx) => (
                  <div key={idx} className="relative flex items-start">
                    <div className={`absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white dark:border-surface-dark shadow shadow-primary/20 ${
                      entry.isActive ? 'bg-primary text-white scale-110 z-10' : 'bg-stone-200 text-stone-500 dark:bg-stone-800'
                    }`}>
                      <span className="material-symbols-outlined text-sm font-bold">
                        {entry.status === 'job_completed' ? 'done_all' :
                         entry.status === 'job_started' ? 'play_arrow' :
                         entry.status.includes('quotation') ? 'payments' : 'chat_bubble'}
                      </span>
                    </div>
                    <div className="ml-16">
                      <p className={`text-sm font-black uppercase tracking-wider ${entry.isActive ? 'text-primary' : 'text-stone-500'}`}>
                        {entry.status.replace('_', ' ')}
                      </p>
                      <p className="text-[10px] text-stone-400 font-bold mt-1">
                        {new Date(entry.updatedAt).toLocaleString()}
                      </p>
                      {entry.notes && (
                        <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed italic">
                          {entry.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}
