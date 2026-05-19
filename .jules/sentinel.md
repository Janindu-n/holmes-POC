## 2026-05-11 - Fail-Secure Initialization for Auth Guards
**Vulnerability:** Incomplete authentication guards that "fail-open" when the auth service is not initialized or missing.
**Learning:** Initializing loading state to `false` when an auth service (like Firebase) is null allows protected content to render before any checks occur.
**Prevention:** Always initialize `loading` state to `true` and explicitly redirect to a safe page (e.g., login) if the auth service is unavailable or uninitialized.

## 2026-05-11 - URL Parameter Role Pollution
**Vulnerability:** Direct use of URL search parameters to assign user roles in Firestore during registration.
**Learning:** Client-side registration flows that trust `searchParams` for role assignment allow any user to escalate privileges by modifying the URL.
**Prevention:** Implement a strict whitelist of allowed roles on the client side and default to the least privileged role. Ideally, role assignment should happen on the server/backend.
