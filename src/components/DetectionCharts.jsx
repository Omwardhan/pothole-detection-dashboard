import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { BarChart3, TrendingUp } from 'lucide-react';

export const DetectionCharts = ({ timeDistribution = [], confidenceDistribution = [] }) => {
  // Custom Industrial Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded shadow-md border border-slate-800 font-mono">
          <div className="font-semibold text-slate-300 mb-1">{label}</div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400">●</span>
            <span>Count:</span>
            <span className="font-bold text-white tabular-nums">{payload[0].value}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      
      {/* Chart 1: Pothole Detections Over Time */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-card p-4 flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-slate-700" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Pothole Detections Over Time
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">
            Hourly Interval
          </span>
        </div>

        <div className="h-64 w-full">
          {timeDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDetections" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'monospace' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'monospace' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="detections" 
                  name="Detections"
                  stroke="#0f172a" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorDetections)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-xs">
              No timeline data available
            </div>
          )}
        </div>
      </div>

      {/* Chart 2: Confidence Distribution */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-card p-4 flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-slate-700" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Confidence Distribution
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">
            Model Precision Buckets
          </span>
        </div>

        <div className="h-64 w-full">
          {confidenceDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={confidenceDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="range" 
                  tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'monospace' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'monospace' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  name="Detections"
                  fill="#ea580c" 
                  radius={[4, 4, 0, 0]}
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-xs">
              No confidence data available
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
