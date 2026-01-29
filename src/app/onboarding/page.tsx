'use client';

import Link from 'next/link';

export default function Onboarding() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="flex justify-center mb-8">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg">
            <span className="material-symbols-outlined text-3xl">home_app_logo</span>
          </div>
        </div>

        <h1 className="text-4xl font-black tracking-tight text-stone-900 dark:text-white sm:text-5xl">
          How can we help today?
        </h1>
        <p className="text-lg text-stone-600 dark:text-stone-400">
          Choose how you would like to use HolmesHome
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Link
            href="/auth/register?role=client"
            className="group relative flex flex-col items-center gap-4 rounded-2xl border-2 border-stone-200 bg-white p-8 shadow-sm transition-all hover:border-primary hover:shadow-xl dark:border-stone-700 dark:bg-stone-800/50"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-primary dark:bg-orange-900/20 dark:text-orange-400 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-4xl">home</span>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-stone-900 dark:text-white">I have a Job</h3>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                I need to find a specialist for my property maintenance or construction.
              </p>
            </div>
            <div className="mt-4 flex items-center text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              Get Started <span className="material-symbols-outlined ml-1">arrow_forward</span>
            </div>
          </Link>

          <Link
            href="/auth/register?role=specialist"
            className="group relative flex flex-col items-center gap-4 rounded-2xl border-2 border-stone-200 bg-white p-8 shadow-sm transition-all hover:border-primary hover:shadow-xl dark:border-stone-700 dark:bg-stone-800/50"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-primary dark:bg-orange-900/20 dark:text-orange-400 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-4xl">engineering</span>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-stone-900 dark:text-white">I am a specialist</h3>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                I want to offer my services and find new construction or repair jobs.
              </p>
            </div>
            <div className="mt-4 flex items-center text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              Join as Partner <span className="material-symbols-outlined ml-1">arrow_forward</span>
            </div>
          </Link>
        </div>

        <div className="pt-8">
          <p className="text-sm text-stone-500">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
