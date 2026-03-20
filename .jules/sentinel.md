## 2025-05-14 - Registration Role Injection & Detail Leakage
**Vulnerability:** The registration page allowed arbitrary roles to be assigned via the `role` query parameter without validation and leaked raw Firebase error messages to the client.
**Learning:** Client-side routing parameters used for authorization-related data (like roles) must be whitelisted before being persisted to a database (Firestore). Raw error objects from third-party SDKs (Firebase) can contain internal implementation details and should be caught and replaced with generic user-facing messages.
**Prevention:** Always validate and whitelist input from URL parameters before use. Implement a global or component-level error handling strategy that maps technical errors to safe, localized strings.
