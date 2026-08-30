import React from 'react';
import { AlertCircle } from 'lucide-react';

export const DemoDataBanner = ({ isMockMode }) => {
  if (!isMockMode) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="font-semibold tracking-wide uppercase px-1.5 py-0.5 bg-amber-200 text-amber-900 rounded text-[10px]">
            DEMO DATA ACTIVE
          </span>
          <span className="text-amber-800">
            The dashboard is currently running in fallback/development mode using simulated detection records from <code className="font-mono bg-amber-100 px-1 py-0.5 rounded text-amber-900 border border-amber-300">src/data/mockDetections.js</code>.
          </span>
        </div>
        <div className="hidden lg:block text-amber-700 text-[11px] shrink-0 font-medium">
          Set <code className="font-mono bg-amber-100 px-1 py-0.5 rounded border border-amber-300">VITE_USE_MOCK_DATA=false</code> & configure <code className="font-mono bg-amber-100 px-1 py-0.5 rounded border border-amber-300">.env</code> to stream live Firestore data.
        </div>
      </div>
    </div>
  );
};
