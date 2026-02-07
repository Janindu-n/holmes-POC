## 2025-02-07 - Missing Input Validation and Service Guards in Auth Flow
**Vulnerability:** The registration flow lacked validation for the 'role' query parameter, allowing for potential privilege escalation. Additionally, input length validation was missing, and Firebase services were accessed without initialization guards.
**Learning:** Even when project memory suggests certain security features are implemented, they may be missing or regressed. Relying on client-side state (like query params) for sensitive user data like 'role' requires strict allowlist validation.
**Prevention:** Implement strict input validation and service guards at the start of all sensitive user flows. Sanitize error messages to prevent implementation detail leakage.
