# AI-Based Pothole Detection System - Web Monitoring Dashboard

A real-time, industrial-grade monitoring dashboard for an edge AI pothole detection system using **Raspberry Pi 4 Model B**, **OV5647 Camera**, **Picamera2**, **YOLOv8**, and **Cloud Firestore**.

---

## 🏛️ System Architecture

```
[OV5647 Camera] ──> [Picamera2 Driver] ──> [YOLOv8 Inference] ──> [Cloud Firestore (detections)] ──> [Web Dashboard]
        │
        └─────────> [Flask /video MJPEG Stream] ───────────────────────────────────────────────────> [HTML <img> Feed]
```

### System Data Flow:
1. **Camera Sensor**: OV5647 Camera captures road frames on the vehicle/test setup.
2. **Picamera2 + YOLOv8**: Python service running on Raspberry Pi 4 processes frames through the YOLOv8 model in real-time.
3. **Cloud Firestore**: Detections are pushed to the `detections` collection with confirmed schema (`confidence`, `class`, `timestamp`, `camera_id`, `test`).
4. **Flask Live Stream**: Raspberry Pi exposes an MJPEG HTTP live stream on `http://172.20.10.2:5000/video`.
5. **Web Monitoring Dashboard**: React + Vite application connects to Firestore via realtime `onSnapshot()` listeners and renders the live camera feed and detection statistics.

---

## 🚀 Features

- **Live Camera Feed**: Direct MJPEG `<img />` stream from Raspberry Pi Flask server with automatic offline fallback handling.
- **Realtime Latest Detection Alert**: Prominent alert card displaying the latest detected pothole with model confidence percentage, class, timestamp, and camera ID.
- **Dynamic Statistics Grid**:
  - *Total Potholes*
  - *Today's Detections*
  - *Average Confidence (%)*
  - *Latest Detection Confidence (%)*
- **Subsystem Diagnostic Panel**: Real-time status monitoring for Camera Feed, YOLOv8 Inference, Cloud Firestore, and Web Dashboard.
- **Analytical Charts**:
  - *Pothole Detections Over Time* (Hourly interval frequency)
  - *Confidence Distribution* (Precision buckets: 50-59%, 60-69%, 70-79%, 80-89%, 90-100%)
- **Detection History Log**: High-density tabular view with search, status filters (Verified / Test Flagged), and pagination.
- **Dual Data Source Support**:
  - **Firebase Mode** (`VITE_USE_MOCK_DATA=false`): Real-time Firestore document updates.
  - **Mock Mode** (`VITE_USE_MOCK_DATA=true`): Local simulation data for offline demonstrations.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS
- **Database / Cloud**: Firebase Web SDK v10 (Cloud Firestore)
- **Charts**: Recharts
- **Icons**: Lucide React

---

## ⚙️ Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- npm

### 2. Installation
```bash
git clone <your-repository-url>
cd BE_Project
npm install
```

### 3. Environment Configuration
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

Configure `.env` with your settings:
```env
# Set to 'false' for live Firestore or 'true' for local mock demo data
VITE_USE_MOCK_DATA=false

# Raspberry Pi Flask MJPEG live stream URL
VITE_PI_VIDEO_URL=http://172.20.10.2:5000/video

# Firebase Web App Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> ⚠️ **Security Notice**: Never commit `.env` or place the Firebase Admin service account key (`firebase-key.json`) in the frontend. Service account keys belong strictly on the Raspberry Pi.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
```

---

## 📋 Confirmed Firestore Schema (`detections` collection)

```typescript
{
  confidence: number,    // e.g. 0.845
  class: string,         // "pothole"
  timestamp: Timestamp,  // Firestore Timestamp
  camera_id: string,     // "pi4-001"
  test: boolean          // true for test markers, false for live verifications
}
```

---

## 📄 License
Final Year Engineering Project — All Rights Reserved.
