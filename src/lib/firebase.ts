import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check if we have the minimum required config to initialize Firebase
const isConfigValid = !!firebaseConfig.apiKey;

// Initialize Firebase
// During build time (SSR), we avoid initializing if keys are missing to prevent prerendering errors.
// In the browser, we try to initialize but catch any errors to avoid crashing the whole app.
const app: FirebaseApp | null = (() => {
  if (typeof window === "undefined" && !isConfigValid) {
    return null;
  }
  try {
    return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  } catch (error) {
    console.error("Firebase initialization error:", error);
    return null;
  }
})();

// Export services as null if app initialization failed.
// Components should check for these before use.
const auth = (app ? getAuth(app) : null) as unknown as Auth;
const db = (app ? getFirestore(app) : null) as unknown as Firestore;

// Initialize Analytics conditionally (it only works in the browser)
let analytics: Analytics | undefined;
if (typeof window !== "undefined" && app) {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(err => {
    console.error("Analytics support check failed:", err);
  });
}

export { app, auth, db, analytics };
