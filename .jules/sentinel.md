## 2025-05-14 - [Unprotected Routes and Role Spoofing]
**Vulnerability:** The `/dashboard` route was accessible to unauthenticated users, and the `/auth/register` page allowed arbitrary role assignment via a query parameter (e.g., `?role=admin`).
**Learning:** Client-side routes in Next.js do not automatically inherit authentication protection from Firebase. Also, trusting client-provided URL parameters for sensitive fields like user roles without server-side validation or a client-side whitelist leads to privilege escalation risks.
**Prevention:** Implement a client-side authentication guard for protected routes and validate all sensitive query parameters against a strict whitelist before persisting them to the database.
