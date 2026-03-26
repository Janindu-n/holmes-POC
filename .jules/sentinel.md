## 2025-05-14 - Broken Access Control & Information Disclosure
**Vulnerability:** Unauthenticated access to '/dashboard', role spoofing via 'role' query parameter, and internal Firebase error leakage in the registration flow.
**Learning:** Client-side routing in Next.js requires explicit protection (e.g., Auth Guards) because the UI can be accessed before Firebase Auth initializes. Trusting client-provided query parameters for user roles allows privilege escalation.
**Prevention:** Use a reusable 'AuthGuard' component for protected routes, validate all client-side parameters against a server-side (or hardened client-side) whitelist, and catch all authentication errors to provide generic, safe feedback to users.
