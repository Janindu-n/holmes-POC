## 2026-05-11 - Dashboard Exposure
**Vulnerability:** Dashboard page (/dashboard) was accessible without authentication, exposing sensitive mock data (client name, location, job details).
**Learning:** Development pages using mock data can still leak sensitive-looking information if not protected. Relying solely on client-side routing without guards allows direct access to components.
**Prevention:** Implement authentication guards (client-side `useEffect` or server-side Middleware) for all sensitive routes from the start, even during the prototyping phase with mock data.
