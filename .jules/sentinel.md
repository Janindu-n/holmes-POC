## 2026-01-31 - Unvalidated Role Assignment in Registration
**Vulnerability:** New users could assign themselves arbitrary roles (e.g., admin) via a query parameter that was saved directly to Firestore.
**Learning:** Client-provided metadata should never be trusted without validation against an allowlist, especially when used for authorization.
**Prevention:** Implement strict allowlists for sensitive fields in client-side forms and complement them with server-side (Firestore) security rules.
