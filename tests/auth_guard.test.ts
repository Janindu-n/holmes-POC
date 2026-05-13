import { test, expect } from '@playwright/test';

test('unauthenticated user is redirected from dashboard to login', async ({ page }) => {
  // Use a dummy API key to ensure Firebase initializes and the guard runs
  // Note: auth is null if NEXT_PUBLIC_FIREBASE_API_KEY is missing in src/lib/firebase.ts

  await page.goto('http://localhost:3000/dashboard');

  // The guard should trigger a redirect to /auth/login
  await expect(page).toHaveURL(/\/auth\/login/);
});
