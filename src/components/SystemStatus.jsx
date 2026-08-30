import React from 'react';
import { Camera, Eye, Database, LayoutDashboard, CheckCircle2, XCircle, HelpCircle, RefreshCw } from 'lucide-react';

export const SystemStatus = ({ 
  cameraStatus = 'offline', 
  yoloStatus = 'unknown', 
  firebaseStatus = 'connected', 
  dashboardStatus = 'online' 
}) => {
  const subsystems = [
    {
      id: 'camera',
      name: 'Camera Feed',
      subtext: 'OV5647 / Flask Stream',
      icon: Camera,
      status: cameraStatus === 'streaming' ? 'Connected' : cameraStatus === 'connecting' ? 'Connecting' : 'Offline',
      type: cameraStatus === 'streaming' ? 'success' : cameraStatus === 'connecting' ? 'warning' : 'error',
    },
    {
      id: 'yolo',
      name: 'YOLOv8 Inference',
      subtext: 'Edge Detection Engine',
      status: yoloStatus === 'active' ? 'Active' : yoloStatus === 'standby' ? 'Standby' : 'Unknown',
      type: yoloStatus === 'active' ? 'success' : yoloStatus === 'standby' ? 'warning' : 'neutral',
      icon: Eye,
    },
    {
      id: 'firebase',
      name: 'Cloud Firestore',
      subtext: 'Realtime Document Store',
      status: firebaseStatus === 'connected' ? 'Connected' : firebaseStatus === 'mock' ? 'Mock Mode' : firebaseStatus === 'connecting' ? 'Connecting' : 'Disconnected',
      type: firebaseStatus === 'connected' ? 'success' : firebaseStatus === 'mock' ? 'warning' : firebaseStatus === 'connecting' ? 'warning' : 'error',
      icon: Database,
    },
    {
      id: 'dashboard',
      name: 'Web Dashboard',
      subtext: 'Client UI Interface',
      status: 'Online',
      type: 'success',
      icon: LayoutDashboard,
    },
  ];

  const getStatusBadge = (type, text) => {
    switch (type) {
      case 'success':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            {text}
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
            {text}
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
            {text}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
            {text}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-card p-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Subsystem Diagnostics
        </h3>
        <span className="text-[11px] text-slate-400 font-mono">
          STATUS MONITOR
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {subsystems.map((sub) => {
          const Icon = sub.icon;
          return (
            <div
              key={sub.id}
              className="p-3 bg-slate-50 border border-slate-200/80 rounded flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-1.5 bg-white border border-slate-200 rounded text-slate-700 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-800 truncate">
                    {sub.name}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {sub.subtext}
                  </div>
                </div>
              </div>
              <div className="shrink-0">
                {getStatusBadge(sub.type, sub.status)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
