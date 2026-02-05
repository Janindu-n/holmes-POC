## 2025-05-14 - [Role Escalation Prevention]
**Vulnerability:** User registration allowed arbitrary roles to be assigned via search parameters without validation.
**Learning:** Query parameters should always be validated against an allowlist before being used to set user permissions or roles.
**Prevention:** Use an allowlist for role validation in registration components and enforce it before persisting to the database.

## 2025-05-14 - [Information Leakage in Error Messages]
**Vulnerability:** Raw Firebase error messages were being displayed directly to users.
**Learning:** Displaying raw error objects or messages from external SDKs can leak internal implementation details or stack traces.
**Prevention:** Map error codes from external services (like Firebase 'err.code') to generic, user-friendly messages.
