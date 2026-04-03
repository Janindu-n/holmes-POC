## 2025-05-15 - [Privilege Escalation via Query Parameters]
**Vulnerability:** The registration page allowed assigning any role (e.g., 'admin') via the `role` query parameter without server-side or client-side validation before Firestore persistence.
**Learning:** Client-side validation of query parameters against a whitelist is a necessary first layer of defense when these parameters influence user permissions or profile data.
**Prevention:** Always validate query parameters against an explicit whitelist before using them to set state or persist data.

## 2025-05-15 - [Authentication Guard in Next.js Client Components]
**Vulnerability:** Protected routes like `/dashboard` were accessible to unauthenticated users, leaking UI structure and mock data.
**Learning:** In Next.js client components, using `useEffect` with `onAuthStateChanged` and a `verifying` state is essential to prevent unauthorized access and "Flash of Unauthenticated Content".
**Prevention:** Implement a standard authentication guard for all protected client-side routes and ensure it handles cases where the authentication object may be null during build.
