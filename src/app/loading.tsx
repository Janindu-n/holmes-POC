export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-16 w-16">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <div className="relative inline-flex rounded-full h-16 w-16 bg-primary items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-white animate-spin">
              autorenew
            </span>
          </div>
        </div>
        <p className="text-stone-600 dark:text-stone-400 font-medium animate-pulse">
          Please wait...
        </p>
      </div>
    </div>
  );
}
