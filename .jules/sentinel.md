## 2026-05-08 - Missing Authentication on Protected Dashboard
**Vulnerability:** The `/dashboard` route was accessible to unauthenticated users, exposing mock job data and system status.
**Learning:** Next.js client-side routes are not protected by default. Mock data hardcoded in components is visible to anyone if no route guard is present.
**Prevention:** Implement an authentication guard using `onAuthStateChanged` that defaults to a loading state and redirects to login if the user is not authenticated.
