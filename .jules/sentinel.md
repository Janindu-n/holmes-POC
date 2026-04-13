## 2026-04-13 - Role-Based Privilege Escalation via Query Parameters
**Vulnerability:** User roles were being determined directly from URL query parameters (e.g., `?role=specialist`) and saved to Firestore without server-side or client-side validation.
**Learning:** Client-side components that consume URL parameters for state that affects permissions must validate inputs against a strict whitelist to prevent users from self-assigning elevated roles.
**Prevention:** Always validate query parameters against an `ALLOWED_ROLES` whitelist before performing side effects or persisting data.
