## 2026-05-11 - Dashboard Authentication Bypass
**Vulnerability:** The `/dashboard` route was accessible to unauthenticated users, exposing sensitive mock data and application layout.
**Learning:** Client-side components in Next.js using Firebase Auth require explicit lifecycle-based authentication guards to ensure protected content is not rendered before the user's identity is verified.
**Prevention:** Always implement a fail-closed authentication listener (`onAuthStateChanged`) in sensitive client-side pages and initialize loading states based on service availability to prevent unauthorized access and minimize render flickering.
