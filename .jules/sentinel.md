## 2025-05-14 - Missing Authentication Guard on Dashboard
**Vulnerability:** The `/dashboard` route was accessible without authentication, exposing mock job data and system status.
**Learning:** Initial scaffolding often lacks proper route protection, and client-side Next.js routes require explicit `useEffect` guards if not handled at the middleware or layout level.
**Prevention:** Always implement an `onAuthStateChanged` listener with a loading state (`authLoading`) to prevent unauthorized access and UI flashes.
