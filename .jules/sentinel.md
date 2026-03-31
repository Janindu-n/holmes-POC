## 2025-05-15 - [Registration Hardening]
**Vulnerability:** Privilege escalation via unvalidated role assignment and information disclosure through raw error messages.
**Learning:** The `role` was being assigned directly from the URL query parameter to the Firestore user document without any server-side or client-side validation, allowing any user to claim any role (e.g., `admin`). Additionally, raw Firebase error messages were being displayed to users, potentially leaking internal implementation details.
**Prevention:** Always validate input parameters against an explicit whitelist before using them for authorization-related data. Use generic user-facing error messages while maintaining detailed logs for developers to prevent sensitive information disclosure.
