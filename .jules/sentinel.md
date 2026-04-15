## 2025-05-14 - Whitelist-based Role Authorization
**Vulnerability:** URL-based privilege escalation during registration.
**Learning:** Query parameters used for initial state (like `role`) must be validated against a strict whitelist before being persisted to the database.
**Prevention:** Implement an `ALLOWED_ROLES` constant and validate all role-related inputs against it before processing.
