## 2026-04-28 - Auth and Role Validation
**Vulnerability:** Unprotected dashboard route and potential role injection during registration.
**Learning:** Client-side routes in Next.js require explicit authentication guards if middleware is not present. Query parameters used for sensitive data (like user roles) must be validated against a strict whitelist.
**Prevention:** Implement a standard authentication guard component or hook for protected routes. Always validate and sanitize user-provided parameters before using them in database operations.
