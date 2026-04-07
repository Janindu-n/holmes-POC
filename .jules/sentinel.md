## 2026-04-07 - Client-side Authentication Guard Pattern
**Vulnerability:** Protected Next.js client-side routes (like `/dashboard`) were accessible to unauthenticated users, leading to potential data exposure or UI flickering of sensitive information.
**Learning:** In Next.js App Router with Firebase, `onAuthStateChanged` is the standard for client-side session verification. Initializing a `loading` state to `true` and checking if `auth` exists before attaching the listener ensures a 'fail-secure' posture and prevents ESLint warnings for synchronous state updates in `useEffect`.
**Prevention:** Implement this pattern on all routes requiring a user session. Ensure `router.replace` is used for redirects to avoid back-button loops.
