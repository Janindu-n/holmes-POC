# Sentinel Journal 🛡️

## 2025-05-15 - Role-Based Privilege Escalation via Query Params
**Vulnerability:** Role assignment during registration was directly derived from unvalidated query parameters.
**Learning:** In client-side registration flows where the UI offers multiple roles (e.g., client, specialist), it is a common pattern to pass the selected role via URL. However, failing to validate this on the registration page allows attackers to inject unauthorized roles (like 'admin') into the persistence layer.
**Prevention:** Always validate parameters used for authorization or role assignment against a strict whitelist before processing or persisting them.
