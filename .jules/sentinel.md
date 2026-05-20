## 2026-05-11 - Hardening Authentication and Registration Flows
**Vulnerability:** Unauthorized role injection via URL parameters in registration and account enumeration via verbose error messages.
**Learning:** URL parameters were trusted blindly for assigning user roles in Firestore, and Firebase Auth error codes were exposed directly to the user, revealing which emails were already registered.
**Prevention:** Implement strict whitelisting for all user-controllable inputs (like roles) and map backend-specific error codes to generic, safe messages to prevent information leakage.
