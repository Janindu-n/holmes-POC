## 2025-05-14 - [Role Injection via Query Parameters]
**Vulnerability:** The registration page was blindly trusting the `role` query parameter from the URL and saving it directly to the user's Firestore profile.
**Learning:** Frontend routes often use URL parameters for UI state, but when that state is persisted to a database as a security-critical attribute (like a user role), it must be validated against a strict whitelist.
**Prevention:** Always validate and whitelist any data derived from user-controlled inputs (URL params, localStorage, etc.) before persisting it or using it for authorization logic.
