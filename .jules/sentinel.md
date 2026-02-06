# Sentinel Journal - Security Learnings

## 2025-05-14 - Registration Page Security Hardening
**Vulnerability:** Multiple security gaps in the registration flow:
1. Missing `role` parameter validation allowed arbitrary role assignment.
2. Unprotected use of Firebase `auth` and `db` instances led to runtime crashes when configuration was missing.
3. Inadequate input length validation for names and passwords.
4. Direct exposure of Firebase error messages leaked internal implementation details.

**Learning:** Client-side components that interact with third-party services like Firebase need robust initialization guards and error mapping. Relying solely on browser-level validation (`required` attribute) is insufficient for security-sensitive fields.

**Prevention:**
1. Always validate parameters from `searchParams` against an allowlist.
2. Implement initialization guards for all shared service instances (auth, db, etc.).
3. Use a centralized or consistent error mapping strategy to provide user-friendly messages while hiding technical details.
4. Enforce business-logic constraints (like minimum lengths) explicitly in the handler, not just the UI.
5. Safely handle `unknown` errors in `catch` blocks by checking for properties like `code` to avoid using `any`.
