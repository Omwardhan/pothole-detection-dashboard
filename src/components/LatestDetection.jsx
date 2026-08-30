import React from 'react';
import { AlertCircle, Clock, Video, Tag, CheckCircle2, ShieldAlert } from 'lucide-react';

export const LatestDetection = ({ detection, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5 flex flex-col justify-center h-full">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-200 rounded w-1/3"></div>
          <div className="h-10 bg-slate-200 rounded w-2/3"></div>
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 rounded"></div>
            <div className="h-3 bg-slate-200 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!detection) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 shadow-card p-6 flex flex-col items-center justify-center text-center h-full">
        <div className="p-3 bg-slate-100 text-slate-400 rounded-full mb-3">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
          No Detections Yet
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          The system is monitoring the road. Detections recorded by the YOLOv8 model will appear here in real time.
        </p>
      </div>
    );
  }

  const {
    confidence = 0,
    class: detClass = 'pothole',
    timestamp,
    camera_id = 'pi4-001',
    test = false
  } = detection;

  const confidencePct = (confidence * 100).toFixed(1);
  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      })
    : '--:--:--';

  const formattedDate = timestamp
    ? new Date(timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : '';

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5 flex flex-col justify-between h-full">
      {/* Top Banner */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Latest Event
            </span>
          </div>

          {test && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-300 rounded font-mono">
              TEST
            </span>
          )}
        </div>

        {/* Big Alert Heading */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-md mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <div className="text-sm font-bold text-amber-950 uppercase tracking-wide">
                POTHOLE DETECTED
              </div>
              <div className="text-[11px] text-amber-800">
                Identified by Edge YOLOv8 Inference
              </div>
            </div>
          </div>
        </div>

        {/* Prominent Confidence Display */}
        <div className="mb-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Confidence
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-bold font-mono text-slate-900 tabular-nums">
              {confidencePct}%
            </span>
            <span className="text-xs text-slate-500">
              ({confidence.toFixed(4)})
            </span>
          </div>

          {/* Progress bar visual */}
          <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden border border-slate-200">
            <div
              className={`h-full rounded-full ${
                confidence >= 0.8
                  ? 'bg-emerald-500'
                  : confidence >= 0.65
                  ? 'bg-amber-500'
                  : 'bg-orange-500'
              }`}
              style={{ width: `${Math.min(100, Math.max(0, confidence * 100))}%` }}
            ></div>
          </div>
        </div>

        {/* Key-Value Details Grid */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
          
          {/* Class */}
          <div className="bg-slate-50 p-2.5 rounded border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <Tag className="w-3.5 h-3.5" />
              <span className="uppercase text-[10px] font-semibold">Class</span>
            </div>
            <div className="font-semibold text-slate-800 capitalize font-mono">
              {detClass}
            </div>
          </div>

          {/* Camera ID */}
          <div className="bg-slate-50 p-2.5 rounded border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <Video className="w-3.5 h-3.5" />
              <span className="uppercase text-[10px] font-semibold">Camera</span>
            </div>
            <div className="font-semibold text-slate-800 uppercase font-mono">
              {camera_id}
            </div>
          </div>

        </div>
      </div>

      {/* Timestamp Footer */}
      <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Timestamp:</span>
        </div>
        <div className="font-mono font-semibold text-slate-800 tabular-nums text-right">
          <span>{formattedTime}</span>
          {formattedDate && <span className="text-slate-400 ml-1.5 font-normal text-[11px]">{formattedDate}</span>}
        </div>
      </div>
    </div>
  );
};
