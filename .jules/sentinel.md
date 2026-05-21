## 2026-05-11 - Implement Dashboard Authentication Guard
**Vulnerability:** The `/dashboard` route was completely unprotected, allowing any user (authenticated or not) to access sensitive job data and live streams.
**Learning:** Client-side routes in Next.js/Firebase applications often rely on the assumption of authentication without explicit guards on every sensitive page, leading to data exposure vulnerabilities.
**Prevention:** Always implement authentication guards at the page or middleware level for any route displaying sensitive user data. Use a loading state to prevent flash of unauthenticated content.
