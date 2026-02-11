## 2025-05-15 - Unvalidated Role Injection in Registration
**Vulnerability:** The registration page accepted a `role` query parameter and saved it directly to the user's profile in Firestore without validation. This allowed any user to assign themselves elevated roles (e.g., `admin`) by manually modifying the URL.
**Learning:** Client-provided parameters, especially those determining authorization or identity, must always be validated against an allowlist on the server or during the persistence layer interaction.
**Prevention:** Implement an allowlist of valid roles and default to the least privileged role if an invalid or missing role is provided.

## 2025-05-15 - Missing Dashboard Authentication Guard
**Vulnerability:** The dashboard page lacked a client-side authentication check, allowing unauthenticated users to view the dashboard UI and mock data.
**Learning:** All protected routes in a client-side application must have an explicit authentication guard (e.g., using `onAuthStateChanged`) to prevent unauthorized access to the UI and potential sensitive data.
**Prevention:** Use a higher-order component or a shared hook/effect to enforce authentication on all protected routes, redirecting unauthenticated users to a login page.
