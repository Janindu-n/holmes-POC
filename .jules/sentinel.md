## 2026-04-30 - Authentication Hardening and Role Validation
**Vulnerability:** The `/dashboard` route was accessible to unauthenticated users, and the registration flow allowed arbitrary role injection via query parameters.
**Learning:** Client-side routes in Next.js without a global middleware require individual authentication guards to prevent unauthorized access to sensitive pages. Additionally, query parameters used for critical data (like user roles) must be whitelisted to prevent privilege escalation or data corruption.
**Prevention:** Implement client-side authentication guards in protected page components and always validate/whitelist query parameters before using them in database operations.
