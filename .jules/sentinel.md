## 2025-05-14 - [Role Injection Prevention]
**Vulnerability:** Registration flow accepted arbitrary roles via URL query parameters (e.g., `?role=admin`).
**Learning:** URL parameters should never be trusted for sensitive metadata like user roles without validation against an allowlist.
**Prevention:** Implement an allowlist check for roles and default to the least privileged role if an invalid one is provided.

## 2025-05-14 - [Firebase Configuration Guard]
**Vulnerability:** Application crashed or leaked internal errors when Firebase was misconfigured or environment variables were missing.
**Learning:** Client-side Firebase SDKs can be null if initialization fails (e.g., during build or due to missing keys).
**Prevention:** Always check if `auth` and `db` are initialized before attempting operations, and provide generic, user-friendly error messages.
