## 2025-05-14 - Implementation of Client-Side Authentication Guard
**Vulnerability:** The '/dashboard' route was accessible without any authentication check, allowing unauthorized users to view the dashboard UI and mock data.
**Learning:** In client-side rendered applications (especially those using Firebase), routes that display sensitive information must be explicitly protected by checking the authentication state before rendering the component's main content.
**Prevention:** Use an authentication guard (e.g., 'onAuthStateChanged') in a 'useEffect' hook on sensitive pages, and provide a loading state to prevent flickering of protected content.
