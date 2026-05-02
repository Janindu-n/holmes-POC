## 2025-05-15 - Role Injection in Registration
**Vulnerability:** The registration page was accepting the user `role` directly from query parameters without validation and saving it to the user's Firestore profile.
**Learning:** Client-side registration flows that handle user roles via URL parameters are highly susceptible to privilege escalation if not validated against a server-side or hardcoded whitelist.
**Prevention:** Always validate sensitive user attributes (like roles or permissions) against a whitelist before persisting them, even if the initial value comes from a trusted internal link.

## 2025-05-15 - Unauthenticated Dashboard Access
**Vulnerability:** The dashboard was accessible to unauthenticated users because it lacked a client-side authentication guard, potentially exposing mock data and UI structure.
**Learning:** In Next.js App Router, client components representing sensitive pages must explicitly check authentication state (e.g., via `onAuthStateChanged`) to prevent unauthorized UI exposure.
**Prevention:** Implement a standard authentication guard hook or component for all protected routes.
