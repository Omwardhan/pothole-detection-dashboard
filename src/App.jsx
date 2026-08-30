import React from 'react';
import { Header } from './components/Header';
import { PipelineBanner } from './components/PipelineBanner';
import { DemoDataBanner } from './components/DemoDataBanner';
import { StatisticsGrid } from './components/StatisticsGrid';
import { LiveCameraFeed } from './components/LiveCameraFeed';
import { LatestDetection } from './components/LatestDetection';
import { SystemStatus } from './components/SystemStatus';
import { DetectionCharts } from './components/DetectionCharts';
import { DetectionTable } from './components/DetectionTable';
import { useDetections } from './hooks/useDetections';
import { useCameraStream } from './hooks/useCameraStream';
import { DEFAULT_CAMERA_ID } from './config/firebaseConfig';

export function App() {
  const {
    detections,
    stats,
    latestDetection,
    timeDistribution,
    confidenceDistribution,
    isLoading,
    error,
    isMockMode,
    firebaseStatus,
    yoloStatus
  } = useDetections();

  const { streamState } = useCameraStream();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800 antialiased selection:bg-slate-800 selection:text-white">
      {/* 1. Header Bar */}
      <Header isMockMode={isMockMode} cameraId={DEFAULT_CAMERA_ID} />

      {/* 2. Architecture / Pipeline Bar */}
      <PipelineBanner />

      {/* 3. Demo Data Notification (Rendered only when in mock mode) */}
      <DemoDataBanner isMockMode={isMockMode} />

      {/* 4. Main Dashboard Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Error Alert if Firestore listener failed */}
        {error && !isMockMode && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold">Firestore Connection Notice:</span>
              <span>{error}</span>
            </div>
            <span className="font-mono text-[11px] text-rose-600 font-semibold">
              Check .env credentials & Firestore security rules
            </span>
          </div>
        )}

        {/* TOP SECTION: Live Camera Feed (Main Focal Point) + Latest Detection Alert */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Live Camera (7 cols on desktop) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
            <LiveCameraFeed cameraId={DEFAULT_CAMERA_ID} />
          </div>

          {/* Latest Detection Panel (5 cols on desktop) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
            <LatestDetection detection={latestDetection} isLoading={isLoading} />
          </div>
        </section>

        {/* SECTION 2: Dynamic Statistics (4 Cards) */}
        <section>
          <StatisticsGrid stats={stats} isLoading={isLoading} />
        </section>

        {/* SECTION 3: System Subsystem Health Status */}
        <section>
          <SystemStatus
            cameraStatus={streamState}
            yoloStatus={yoloStatus}
            firebaseStatus={firebaseStatus}
            dashboardStatus="online"
          />
        </section>

        {/* SECTION 4: Analytics Charts (Timeline & Confidence Distribution) */}
        <section>
          <DetectionCharts
            timeDistribution={timeDistribution}
            confidenceDistribution={confidenceDistribution}
          />
        </section>

        {/* SECTION 5: Tabular Detection History */}
        <section>
          <DetectionTable
            detections={detections}
            isLoading={isLoading}
          />
        </section>

      </main>

      {/* 5. Engineering Project Footer */}
      <footer className="bg-white border-t border-slate-200 py-5 px-4 sm:px-6 text-xs text-slate-500 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-bold text-slate-700">AI-Based Pothole Detection System</span>
            <span className="mx-2 text-slate-300">|</span>
            <span>Final Year Engineering Project</span>
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            Raspberry Pi 4 • OV5647 Camera • Picamera2 • YOLOv8 • Cloud Firestore
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
