## 2026-05-09 - Missing Authentication Guard on Sensitive Routes
**Vulnerability:** The `/dashboard` route was accessible to unauthenticated users, exposing sensitive mock data and application state during hydration.
**Learning:** In Next.js App Router, client components that display sensitive data must implement a "fail-closed" authentication check (e.g., using a loading state that defaults to `true`) to prevent data leakage before the authentication status is verified.
**Prevention:** Always wrap sensitive client-side content in an authentication guard that checks the user's status via `onAuthStateChanged` and redirects unauthenticated users to a login page.
