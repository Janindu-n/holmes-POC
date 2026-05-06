## 2025-05-15 - Missing Authentication Guard for Dashboard
**Vulnerability:** The `/dashboard` route was accessible to unauthenticated users, exposing mock job data and UI components.
**Learning:** Client-side routes in Next.js using Firebase are not automatically protected. If an authentication guard is missing, the component will render its content regardless of the user's login state.
**Prevention:** Implement a client-side authentication guard using `onAuthStateChanged` in a `useEffect` hook for all protected routes. Initialize a `loading` state to `true` (or `auth !== null`) to ensure a secure default-locked state during the initial authentication check.
