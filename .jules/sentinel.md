## 2026-05-03 - Client-side authentication guard for Next.js App Router
**Vulnerability:** Protected routes were accessible to unauthenticated users, leaking mock data and UI structure.
**Learning:** In projects using Firebase Client SDK without Next.js Middleware, routes must be manually protected using `onAuthStateChanged` in a `useEffect` hook to ensure session-based access control.
**Prevention:** Always implement a "loading" state to prevent flashing protected content and ensure the guard handles cases where Firebase services might not be initialized (e.g., missing environment variables).
