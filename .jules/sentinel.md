## 2025-05-14 - [Role Parameter Tampering in Registration]
**Vulnerability:** The registration page blindly accepted the `role` query parameter and persisted it to Firestore. A malicious user could register with any role (e.g., 'admin') by manually appending `?role=admin` to the registration URL.
**Learning:** Client-side inputs, including query parameters used for critical business logic like user roles, must be strictly validated against a server-side (or in this case, a hardcoded) whitelist before being used in state or database operations.
**Prevention:** Always implement a strict whitelist for sensitive parameters and provide a safe default value. Never trust user-provided values for authorization-related data.
