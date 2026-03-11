## 2025-05-15 - Role Privilege Escalation via Query Parameters
**Vulnerability:** The registration page accepted a `role` query parameter and used it directly to set the user's role in Firestore without validation. An attacker could register as an 'admin' or other unauthorized role by modifying the URL.
**Learning:** Trusting client-side parameters for sensitive user attributes during account creation creates a direct path for privilege escalation.
**Prevention:** Always validate user-provided roles against an allow-list on the server or during the registration process, defaulting to the lowest privilege if invalid.

## 2025-05-15 - Information Leakage via Client-Side Error Logging
**Vulnerability:** Registration error details were being logged to the browser console using `console.error(err)`. This could expose internal Firebase error structures or backend implementation details to users.
**Learning:** Client-side error logging of raw error objects can bypass UI-level security by exposing sensitive details in the developer tools.
**Prevention:** Avoid logging raw error objects on the client side. Use generic, user-facing error messages and log detailed errors to a secure server-side service if needed.
