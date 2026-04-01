## 2025-05-14 - Fix missing authentication guard on dashboard

**Vulnerability:** Unauthenticated users could access the `/dashboard` route and view mock job data because the client-side authentication guard was missing.
**Learning:** Client-side routes in Next.js that depend on Firebase Auth must explicitly implement a guard (e.g., using `onAuthStateChanged`) to prevent unauthorized access, especially when sensitive or mock data is displayed. Fail-secure logic should also handle cases where the Firebase `auth` object might be null due to configuration issues.
**Prevention:** Always implement an authentication higher-order component or a `useEffect` guard for protected routes. Ensure the UI shows a loading or "verifying" state while authentication status is being determined to avoid flashing protected content.
