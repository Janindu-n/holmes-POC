## 2025-05-14 - [Parameter-Based Role Whitelisting]
**Vulnerability:** Registration flow accepted arbitrary 'role' parameters via URL, which were saved directly to Firestore.
**Learning:** Client-side parameters should always be validated against a whitelist before being used in sensitive operations or database writes.
**Prevention:** Implement strict input validation and whitelisting for all user-provided data, especially those determining authorization or roles.

## 2025-05-14 - [Firebase Error Leakage]
**Vulnerability:** Firebase auth errors were being displayed directly to users, potentially revealing implementation details or account existence.
**Learning:** Native error messages from third-party services can be too descriptive.
**Prevention:** Map specific errors to generic, user-friendly messages for public-facing forms.
