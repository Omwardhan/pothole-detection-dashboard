import React from 'react';
import { ShieldAlert, Video, Radio, Clock, Calendar } from 'lucide-react';
import { useSystemClock } from '../hooks/useSystemClock';
import { DEFAULT_CAMERA_ID } from '../config/firebaseConfig';

export const Header = ({ isMockMode, cameraId = DEFAULT_CAMERA_ID }) => {
  const { formattedTime, formattedDate } = useSystemClock();

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Project Title & Identity */}
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 bg-slate-900 text-white rounded-md flex items-center justify-center shadow-xs">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                AI-Based Pothole Detection System
              </h1>
              {isMockMode && (
                <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 rounded">
                  Demo Data
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Real-Time Road Monitoring Dashboard
            </p>
          </div>
        </div>

        {/* System Meta Status / Right Info */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm">
          
          {/* Dashboard Status */}
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-slate-600 font-medium">System Status:</span>
            <span className="font-semibold text-slate-900 tracking-wide uppercase text-xs">
              ONLINE
            </span>
          </div>

          {/* Primary Camera ID */}
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 font-mono">
            <Video className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-500 text-xs uppercase font-sans">Camera:</span>
            <span className="font-semibold text-slate-800 text-xs">
              {cameraId.toUpperCase()}
            </span>
          </div>

          {/* Real-time Clock */}
          <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 text-slate-700">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
            <div className="h-3.5 w-px bg-slate-300"></div>
            <div className="flex items-center gap-1.5 font-mono font-semibold text-xs text-slate-900 tabular-nums">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{formattedTime}</span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
