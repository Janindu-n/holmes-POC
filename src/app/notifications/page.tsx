'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot, orderBy, updateDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { UserProfile } from '@/types/user';
import { Notification } from '@/types/notification';
import Navbar from '@/components/Navbar';

export default function Notifications() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

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

    return () => unsubscribeAuth();
  }, [router]);

  useEffect(() => {
    if (!db || !userProfile) return;

    const q = query(
      collection(db!, 'notifications'),
      where('userId', '==', userProfile.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notification)));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userProfile]);

  const markAsRead = async (id: string) => {
    if (!db) return;
    try {
      await updateDoc(doc(db!, 'notifications', id), { isRead: true });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
  if (!userProfile) return null;

  return (
    <div className="bg-dashboard-bg dark:bg-background-dark min-h-screen flex flex-col transition-colors duration-200">
      <Navbar user={userProfile} />

      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden">
          <div className="p-8 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black text-stone-900 dark:text-white">Notifications</h1>
              <p className="text-stone-500 dark:text-stone-400 font-medium">Stay updated on your job progress and account activity.</p>
            </div>
            <button className="text-xs font-black uppercase text-primary hover:underline">Mark all as read</button>
          </div>

          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {notifications.length === 0 ? (
              <div className="p-12 text-center">
                <div className="flex justify-center mb-4 text-stone-200">
                  <span className="material-symbols-outlined text-6xl">notifications_off</span>
                </div>
                <p className="text-stone-500 dark:text-stone-400 font-medium">You have no notifications yet.</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-6 transition-colors hover:bg-stone-50 dark:hover:bg-stone-800/30 flex gap-4 ${n.isRead ? 'opacity-60' : 'bg-orange-50/20'}`}
                  onClick={() => n.id && markAsRead(n.id)}
                >
                  <div className={`flex-shrink-0 size-10 rounded-full flex items-center justify-center ${
                    n.type === 'success' ? 'bg-green-100 text-green-600' :
                    n.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-primary/10 text-primary'
                  }`}>
                    <span className="material-symbols-outlined text-xl">
                      {n.type === 'success' ? 'check_circle' : n.type === 'warning' ? 'warning' : 'info'}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-stone-800 dark:text-white">{n.title}</h3>
                      <span className="text-[10px] text-stone-400 font-bold">{new Date(n.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{n.message}</p>
                    {n.link && (
                      <button
                        onClick={() => router.push(n.link!)}
                        className="mt-3 text-xs font-black text-primary hover:underline"
                      >
                        View Details
                      </button>
                    )}
                  </div>
                  {!n.isRead && (
                    <div className="size-2 rounded-full bg-primary mt-2"></div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
