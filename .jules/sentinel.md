## 2026-05-11 - Auth and Role Validation Improvements
**Vulnerability:** Unvalidated role assignment via URL parameters in registration and detailed error messages in authentication flows.
**Learning:** The registration flow blindly trusted the 'role' query parameter, which could be manipulated to assign unauthorized roles if they existed in the system. Additionally, detailed error messages from Firebase could leak user existence or internal configuration details.
**Prevention:** Always whitelist allowed values for sensitive parameters like 'role' and provide generic error messages to the frontend while logging specific details internally for debugging.
