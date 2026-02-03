## 2025-05-14 - Role-based Registration Vulnerability
**Vulnerability:** Users could register with any role (e.g., 'admin') by modifying the `role` query parameter in the registration URL, as the client-side registration logic did not validate the role against an allowlist before persisting it to Firestore.
**Learning:** Query parameters should never be trusted for sensitive data like user roles without server-side or strict client-side allowlist validation.
**Prevention:** Always validate the `role` against a predefined allowlist ('client', 'specialist') in the registration handler and enforce minimum length requirements for name and password to prevent low-quality or malicious account creation.
