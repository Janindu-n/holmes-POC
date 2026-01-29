## 2025-01-29 - [Secure Authentication & Registration]
**Vulnerability:** Unprotected dashboard and raw error disclosure in registration.
**Learning:** The application lacked a basic client-side authentication guard on the dashboard, allowing anyone to view the layout even without a session. Additionally, raw Firebase errors were being passed directly to the UI, which could leak project configuration or internal logic details.
**Prevention:** Always implement authentication guards for sensitive routes and sanitize error messages before displaying them to the user.
