## 2025-05-15 - [Privilege Escalation via Query Parameters]
**Vulnerability:** User roles were being assigned directly from URL query parameters (e.g., `?role=admin`) without validation during registration.
**Learning:** Client-side routing often uses query parameters for state or context, but these must never be trusted for security-sensitive fields like user roles. An attacker could easily grant themselves elevated privileges by modifying the URL.
**Prevention:** Always use an allow-list for parameters that determine authorization levels. Default to the least-privileged role if the input is missing or invalid.

## 2025-05-15 - [Information Leakage in Auth Flows]
**Vulnerability:** Firebase authentication errors (e.g., "email already in use") were being displayed directly to users.
**Learning:** Detailed error messages in authentication flows can facilitate account enumeration, allowing attackers to identify valid user emails in the system.
**Prevention:** Use generic error messages for all authentication failures (e.g., "An error occurred during registration") and log detailed errors only to internal, secure logging systems.
