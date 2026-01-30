## 2026-01-30 - [Role Injection Vulnerability]
**Vulnerability:** Untrusted 'role' query parameter in registration URL was used directly to set user permissions in Firestore.
**Learning:** Even if the UI only provides safe links, users can manually manipulate URL parameters to inject unauthorized roles (e.g., 'admin').
**Prevention:** Always validate parameters from the URL against a strict allowlist before using them in security-sensitive operations or persisting them to a database.
