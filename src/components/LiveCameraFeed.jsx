import React, { useState } from 'react';
import { Camera, Radio, AlertTriangle, RefreshCw, Maximize2, ShieldCheck, WifiOff } from 'lucide-react';
import { useCameraStream } from '../hooks/useCameraStream';
import { DEFAULT_CAMERA_ID } from '../config/firebaseConfig';

export const LiveCameraFeed = ({ cameraId = DEFAULT_CAMERA_ID }) => {
  const {
    streamUrl,
    streamState,
    reconnectKey,
    handleImageLoaded,
    handleImageError,
    retryConnection
  } = useCameraStream();

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-card overflow-hidden flex flex-col h-full">
      {/* Header bar */}
      <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-slate-700" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            LIVE CAMERA DETECTION
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Live / Offline status badge */}
          {streamState === 'streaming' ? (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              LIVE FEED
            </span>
          ) : streamState === 'connecting' ? (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              <RefreshCw className="w-3 h-3 animate-spin" />
              CONNECTING
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-slate-200 text-slate-700 border border-slate-300">
              <WifiOff className="w-3 h-3 text-slate-500" />
              OFFLINE
            </span>
          )}

          {/* Camera identifier */}
          <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-slate-200/80 text-slate-800 border border-slate-300">
            ID: {cameraId.toUpperCase()}
          </span>

          {/* Refresh stream button */}
          <button
            onClick={retryConnection}
            title="Reconnect stream"
            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 rounded transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Video Viewport */}
      <div className="relative bg-slate-900 flex-1 min-h-[320px] sm:min-h-[380px] flex items-center justify-center overflow-hidden">
        {/* Connection State: Offline Fallback */}
        {streamState === 'offline' && (
          <div className="p-6 text-center max-w-md mx-auto flex flex-col items-center justify-center text-slate-300 z-10">
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-3 text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-1">
              Raspberry Pi camera feed unavailable
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Connect the Raspberry Pi to the same network to view the live feed.
            </p>
            <div className="bg-slate-950/80 border border-slate-800 rounded px-3 py-2 text-[11px] font-mono text-slate-400 mb-4 text-left w-full">
              <div className="text-slate-500 text-[10px] uppercase font-sans mb-0.5">Configured Target:</div>
              <div className="text-amber-300 break-all">{streamUrl}</div>
            </div>
            <button
              onClick={retryConnection}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded border border-slate-600 transition-colors shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Connection
            </button>
          </div>
        )}

        {/* Loading Overlay */}
        {streamState === 'connecting' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 text-slate-400 z-10">
            <RefreshCw className="w-8 h-8 animate-spin text-slate-500 mb-2" />
            <p className="text-xs font-medium text-slate-300">Connecting to live video stream...</p>
            <p className="text-[11px] font-mono text-slate-500 mt-1">{streamUrl}</p>
          </div>
        )}

        {/* MJPEG Stream Image Element */}
        <img
          key={reconnectKey}
          src={streamUrl}
          alt="Raspberry Pi YOLOv8 Live Camera Feed"
          onLoad={handleImageLoaded}
          onError={handleImageError}
          className={`w-full h-full object-contain ${
            streamState === 'streaming' ? 'block' : 'hidden'
          }`}
        />

        {/* Live overlay banner when streaming */}
        {streamState === 'streaming' && (
          <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs border border-slate-700/80 text-white px-2.5 py-1 rounded text-xs flex items-center gap-2 pointer-events-none">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-status-pulse"></span>
            <span className="font-mono text-[11px] font-semibold tracking-wider">MJPEG // 5000</span>
          </div>
        )}
      </div>

      {/* Footer Info Strip */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
          <span>Flask HTTP Stream (Local Network)</span>
        </div>
        <div className="font-mono text-[11px] text-slate-600">
          Source: <span className="text-slate-800 font-semibold">{streamUrl}</span>
        </div>
      </div>
    </div>
  );
};
