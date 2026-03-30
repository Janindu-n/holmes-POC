## 2025-05-14 - Dashboard Authentication Guard Implementation

**Vulnerability:** The `/dashboard` route was accessible to unauthenticated users, exposing mock job data and UI elements that should be private.

**Learning:** Client-side Next.js components that display sensitive or user-specific data must explicitly verify the authentication state using `onAuthStateChanged` or similar mechanisms. Relying on initial state or assuming the user is logged in because they are on the dashboard path is a security risk.

**Prevention:** Always implement an authentication guard in protected routes. Use a `useEffect` hook to check the user's status and redirect to a login page if they are not authenticated. Additionally, use a loading state or return `null` while the authentication status is being determined to prevent a "flash" of unauthorized content. Defensive null-checks on the `auth` object are also necessary for build-time safety.
