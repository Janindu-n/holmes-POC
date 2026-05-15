## 2026-05-11 - Prevent Privilege Escalation in Registration
**Vulnerability:** Unvalidated `role` parameter in the registration URL allowed users to register with any arbitrary role (e.g., `role=admin`) by manually altering the URL.
**Learning:** URL search parameters are untrusted user input. When these parameters are used to determine user authorization levels or roles in a database, they must be validated against a strict whitelist.
**Prevention:** Implement strict whitelisting for all sensitive parameters ingested from the client-side (URL, headers, body) before using them in database operations or authorization logic.
