import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig, isFirebaseConfigured } from '../config/firebaseConfig';

let app = null;
let db = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (error) {
    console.error('[Firebase Init Error]: Failed to initialize Firebase Web SDK:', error);
  }
} else {
  // Silent or diagnostic info when in mock or unconfigured mode
  console.info('[Firebase Service]: Firebase credentials not found in environment. Mock mode active.');
}

export { app, db };
