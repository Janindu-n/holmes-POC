## 2026-04-09 - Secure Route Protection Pattern
**Vulnerability:** Flash of Unauthenticated Content (FOUC) in protected routes.
**Learning:** Initializing 'loading' state to true and checking for 'auth' object existence before 'onAuthStateChanged' ensures a 'fail-secure' posture and prevents flickering of sensitive data.
**Prevention:** Always use a dedicated loading state and server-rendered placeholder or client-side guard with 'router.replace' for protected Next.js pages.
