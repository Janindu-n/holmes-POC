## 2025-05-15 - [Authentication Bypass and Role Injection]
**Vulnerability:** The /dashboard route lacked an authentication guard, and the registration process was vulnerable to role injection via URL parameters.
**Learning:** Client-side routes must explicitly verify authentication status using onAuthStateChanged to prevent unauthorized access to UI components. URL parameters used for user permissions (like 'role') must be validated against a whitelist before being persisted to the database.
**Prevention:** Implement a standard 'withAuth' HOC or a base loading state for protected routes. Always validate query parameters on the client before using them in sensitive operations.
