## 2026-02-01 - [Role Injection Vulnerability]
**Vulnerability:** User roles were being accepted directly from URL query parameters without validation and persisted to Firestore.
**Learning:** In Next.js applications using client-side registration flows, URL parameters are untrusted sources. Directly using them to set sensitive fields like 'role' allows for privilege escalation.
**Prevention:** Always validate URL parameters against an allowlist before using them in database operations. Implement server-side validation or Firestore rules as a second layer of defense.
