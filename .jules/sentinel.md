## 2025-05-15 - [Auth Guard and Role Validation]
**Vulnerability:** The dashboard page was accessible to unauthenticated users, and the registration process allowed arbitrary role injection via query parameters.
**Learning:** Even with mock data, protected routes must have authentication guards to prevent unauthorized UI access. Query parameters used for state (like user roles) must be validated against a strict whitelist to prevent privilege escalation.
**Prevention:** Implement client-side `onAuthStateChanged` listeners for route protection in Next.js client components and use `ALLOWED_ROLES` whitelists for any role-related logic.
