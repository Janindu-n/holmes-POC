## 2025-05-15 - Hardening Auth Flow and Dashboard Access
**Vulnerability:** The application lacked an authentication guard on the dashboard, and registration was susceptible to role injection via URL parameters. Additionally, detailed Firebase error messages were leaked to the client.
**Learning:** In projects without a global middleware, each protected route must implement a client-side authentication guard with a loading state to prevent flickering and secure redirection via `router.replace`.
**Prevention:** Always validate external inputs like query parameters against a whitelist and use generic error messages in the UI to avoid information leakage. Ensure Firebase services are checked for initialization before use to handle missing configuration gracefully.
