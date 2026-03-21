## 2025-05-15 - [Authentication and Authorization Hardening]

**Vulnerability:**
1. Missing authentication guard on the `/dashboard` route, which is intended for logged-in users.
2. Potential for privilege escalation in the registration process via an unvalidated `role` query parameter.
3. Internal detail leakage through raw Firebase error messages in the registration form.

**Learning:**
The application relied on client-side routing and mock data, which could lead to sensitive areas being accessible or data being improperly categorized if authentication and input validation are not strictly enforced. In Next.js applications using Firebase, it's critical to use `onAuthStateChanged` to manage protected routes and validate all user-provided metadata before persisting it.

**Prevention:**
1. Always implement an authentication guard for sensitive routes using Firebase's `onAuthStateChanged` and provide a secure loading state to prevent UI flashes.
2. Validate all user-provided input, including query parameters used for user metadata like roles, against an explicit whitelist.
3. Use generic error messages for client-facing interfaces to prevent leaking information about the underlying authentication or database provider.
