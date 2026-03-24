## 2025-05-15 - [Authentication Guard & Registration Hardening]
**Vulnerability:** Lack of route protection on sensitive dashboard, role-spoofing in registration, and Firebase detail leakage in registration errors.
**Learning:** Even if a dashboard is client-side rendered, sensitive UI and mock data remain accessible without a guard; query-param-based role assignment can be easily manipulated by users.
**Prevention:** Implement a high-level `AuthGuard` using `onAuthStateChanged` for sensitive routes, whitelist all user-provided metadata like roles, and use generic error messages in client-side 'catch' blocks to mask implementation details.
