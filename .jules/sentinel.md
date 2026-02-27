## 2026-02-27 - Unprotected Sensitive Client-Side Routes
**Vulnerability:** The dashboard route (`/dashboard`) was accessible to unauthenticated users, exposing mock data and UI intended for logged-in users.
**Learning:** Client-side components in Next.js require explicit authentication checks if they are not protected by middleware or server-side logic.
**Prevention:** Implement a standardized authentication guard (e.g., using `onAuthStateChanged`) for all sensitive client-side routes and consider Next.js Middleware for global route protection.

## 2026-02-27 - Role Injection via Query Parameters
**Vulnerability:** The registration flow (`src/app/auth/register/page.tsx`) accepts a `role` from the URL query string without validation, allowing potential elevation of privilege if unintended roles are processed.
**Learning:** Client-side data from URLs should never be trusted for sensitive fields like user roles.
**Prevention:** Validate all input from query parameters against a strict allowlist and perform final role assignment on the server-side or via secure database rules.
