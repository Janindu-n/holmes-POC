# Sentinel Journal 🛡️

## 2025-03-29 - [Broken Access Control & Privilege Escalation]
**Vulnerability:** Unauthenticated users can directly access the `/dashboard` route, exposing mock job data and system status. Additionally, the `/auth/register` route trusts the `role` query parameter without validation, allowing users to register with unauthorized roles (e.g., `admin`).
**Learning:** Next.js client-side routes require explicit authentication guards if middleware is not used. Trusting client-provided parameters for security-sensitive fields like user roles without server-side or whitelist validation leads to privilege escalation risks.
**Prevention:** Implement page-level authentication guards using `onAuthStateChanged`. Use an explicit whitelist for user roles and sanitize all user-facing error messages to prevent information leakage.
