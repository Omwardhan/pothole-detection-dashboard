/**
 * Application & Firebase Configuration
 * Reads configuration strictly from Vite environment variables (VITE_*).
 * 
 * NOTE: The Firebase Admin service-account key (firebase-key.json) is used ONLY
 * on the Raspberry Pi. Never expose or place service-account JSON in the frontend.
 */

// Check if Mock Mode is explicitly requested via environment variable
const isExplicitMock = import.meta.env.VITE_USE_MOCK_DATA === 'true' || import.meta.env.VITE_USE_MOCK_DATA === true;

// Live Raspberry Pi MJPEG stream URL (default fallback to local IP on port 5000)
export const PI_VIDEO_URL = import.meta.env.VITE_PI_VIDEO_URL || 'http://172.20.10.2:5000/video';

// Firebase Web SDK Client Configuration
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
};

/**
 * Validates if the required Firebase Web SDK environment variables are populated.
 */
export const isFirebaseConfigured = () => {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.apiKey !== 'your_api_key_here' &&
    firebaseConfig.projectId !== 'your_project_id'
  );
};

/**
 * Determines whether the app should operate in Mock Data mode.
 * Defaults to true if VITE_USE_MOCK_DATA=true OR if Firebase config is not yet supplied.
 */
export const shouldUseMockData = () => {
  if (isExplicitMock) return true;
  return !isFirebaseConfigured();
};

export const DEFAULT_CAMERA_ID = 'PI4-001';
