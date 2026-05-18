## 2026-05-11 - Dashboard Authentication Bypass
**Vulnerability:** The /dashboard route was publicly accessible despite containing sensitive user job data (simulated via MOCK_JOB).
**Learning:** Client-side routes in Next.js do not automatically inherit authentication state from Firebase unless explicitly guarded using hooks like onAuthStateChanged.
**Prevention:** Always implement an authentication guard and a loading state for protected routes to prevent data leakage during the initial mount.

## 2026-05-11 - URL-based Privilege Escalation
**Vulnerability:** User roles were accepted directly from URL parameters (?role=specialist) during registration without validation.
**Learning:** Client-side input from URLs should be treated as untrusted and validated against an allow-list before being persisted to the database.
**Prevention:** Implement strict allow-lists for sensitive parameters like user roles.
