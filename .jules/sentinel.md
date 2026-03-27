## 2025-05-15 - [Security Hardening: Route Protection, Role Whitelisting, and Error Sanitization]
**Vulnerability:**
1. The `/dashboard` route was accessible to unauthenticated users via client-side navigation.
2. The registration process allowed arbitrary roles (e.g., `?role=admin`) to be passed via query parameters and persisted to Firestore.
3. Registration errors leaked internal Firebase details (stack traces/internal error codes) to the user interface.

**Learning:**
Client-side routes in Next.js require explicit protection even if the backend is secured, to prevent UI exposure. Query parameters used for state (like roles) must be strictly validated against a whitelist to prevent privilege escalation or data corruption. Verbose error handling in client-side `catch` blocks can inadvertently expose system internals.

**Prevention:**
Always wrap sensitive routes in a reusable `AuthGuard` or use Middleware. Implement strict whitelisting for all user-provided inputs that affect state or authorization. Use generic, user-facing error messages in production while logging detailed errors to internal systems.
