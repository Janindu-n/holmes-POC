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
// If we're during build time and keys are missing, we don't initialize to avoid prerendering errors
const app: FirebaseApp | null = isConfigValid
  ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig))
  : null;

// Cast to correct types to satisfy TS, but these will be null if config is missing.
// This is acceptable during build time as long as these are not called during SSR.
const auth = (app ? getAuth(app) : null) as unknown as Auth;
const db = (app ? getFirestore(app) : null) as unknown as Firestore;

// Initialize Analytics conditionally (it only works in the browser)
let analytics: Analytics | undefined;
if (typeof window !== "undefined" && app) {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, analytics };
