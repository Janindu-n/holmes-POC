## 2025-02-13 - URL Role Spoofing in Registration
**Vulnerability:** User roles were being assigned directly from the `role` URL search parameter without server-side or client-side validation. This allowed users to potentially register with unauthorized roles (e.g., `admin`) by simply modifying the registration URL.
**Learning:** Even if the UI only provides certain links, any data derived from user-controlled inputs (like URL params) must be validated against a strict allowlist.
**Prevention:** Implement a role allowlist in the registration logic and default to the lowest-privileged role if an invalid role is provided.
