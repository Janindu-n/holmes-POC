## 2026-02-22 - Role Injection in Registration
**Vulnerability:** The registration flow allowed any string to be assigned as a user role via a URL search parameter (`?role=...`), which was then saved directly to the Firestore `users` collection.
**Learning:** Trusting client-provided parameters (especially search params) for sensitive fields like roles without validation can lead to privilege escalation.
**Prevention:** Always validate sensitive fields against an allow-list on the client and server (or at the point of ingestion) before persisting them to the database.
