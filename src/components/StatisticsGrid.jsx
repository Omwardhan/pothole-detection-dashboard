import React from 'react';
import { Layers, Calendar, Activity, Zap } from 'lucide-react';

export const StatisticsGrid = ({ stats, isLoading }) => {
  const {
    totalPotholes = 0,
    todayDetections = 0,
    averageConfidence = 0,
    latestConfidence = 0
  } = stats || {};

  const cards = [
    {
      id: 'total-potholes',
      label: 'Total Potholes',
      value: isLoading ? '...' : totalPotholes.toLocaleString(),
      subtext: 'Accumulated detections',
      icon: Layers,
      accent: 'text-slate-700',
      borderAccent: 'border-l-slate-800'
    },
    {
      id: 'today-detections',
      label: "Today's Detections",
      value: isLoading ? '...' : todayDetections.toLocaleString(),
      subtext: 'Recorded today',
      icon: Calendar,
      accent: 'text-slate-700',
      borderAccent: 'border-l-blue-700'
    },
    {
      id: 'average-confidence',
      label: 'Average Confidence',
      value: isLoading ? '...' : `${averageConfidence}%`,
      subtext: 'Model aggregate precision',
      icon: Activity,
      accent: 'text-slate-700',
      borderAccent: 'border-l-emerald-600'
    },
    {
      id: 'latest-confidence',
      label: 'Latest Detection Confidence',
      value: isLoading ? '...' : (latestConfidence > 0 ? `${latestConfidence}%` : 'N/A'),
      subtext: 'Most recent detection event',
      icon: Zap,
      accent: 'text-slate-700',
      borderAccent: 'border-l-amber-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`bg-white rounded-lg border border-slate-200 border-l-4 ${card.borderAccent} p-4 shadow-card hover:shadow-panel transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {card.label}
              </span>
              <div className="p-1.5 bg-slate-100 rounded text-slate-600">
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
                {card.value}
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              {card.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
};
