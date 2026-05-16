## 2026-05-11 - Dashboard Authentication Bypass
**Vulnerability:** The /dashboard route was found to be unprotected, allowing unauthenticated users to access sensitive mock data.
**Learning:** React state-based dashboards often assume authentication happened at a higher level, but individual pages must verify auth state if no global middleware or layout-level guard is present.
**Prevention:** Always implement authentication guards for sensitive routes and verify them with automated tests.
