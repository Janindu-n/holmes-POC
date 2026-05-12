## 2026-05-11 - Security Hardening of Auth Flows
**Vulnerability:** Unauthenticated access to dashboard and potential privilege escalation/email enumeration in registration.
**Learning:** Client-side routes in Next.js need explicit authentication guards when using Firebase to prevent displaying mock data before the auth state is resolved. URL parameters for roles must be whitelisted to prevent attackers from assigning themselves elevated roles.
**Prevention:** Always implement fail-closed auth guards and validate all user-supplied metadata (like roles) against a strict whitelist.
