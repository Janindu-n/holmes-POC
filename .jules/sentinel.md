## 2025-05-14 - Authentication Guard Implementation
**Vulnerability:** Broken Authentication / Missing Authentication on /dashboard
**Learning:** The dashboard was accessible without authentication as it lacked a guard. Implementing a client-side guard with `onAuthStateChanged` requires careful handling of the initial 'null' auth state during build/hydration to avoid errors.
**Prevention:** Use a `loading` state and explicit redirects in a `useEffect` hook for all protected client-side routes.

## 2025-05-14 - Registration Role Validation
**Vulnerability:** Privilege Escalation via Query Parameter
**Learning:** The application trusted the `role` query parameter from the URL without validation, potentially allowing users to register as any role.
**Prevention:** Always validate query parameters against an explicit whitelist before using them for sensitive operations like user profile creation.

## 2025-05-14 - Error Message Hardening
**Vulnerability:** Information Exposure via Error Messages
**Learning:** Firebase error messages can be overly descriptive, potentially revealing if an email address exists in the system.
**Prevention:** Replace detailed service-level errors with generic, user-friendly messages and log the technical details for developers only.
