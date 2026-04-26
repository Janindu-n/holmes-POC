## 2025-05-15 - Hardening Registration against Role Injection
**Vulnerability:** User-controlled 'role' parameter from URL was directly stored in Firestore during registration, allowing potential privilege escalation (e.g., ?role=admin).
**Learning:** Client-side routing parameters are untrusted user input. Whitelisting and defaulting are essential when mapping URL parameters to database fields.
**Prevention:** Always validate and whitelist any user-provided metadata that affects authorization or user state before persisting it.
