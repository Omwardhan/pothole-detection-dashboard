import React from 'react';
import { Camera, Cpu, Eye, Database, LayoutDashboard, ChevronRight } from 'lucide-react';

export const PipelineBanner = () => {
  const steps = [
    { icon: Camera, name: "OV5647 Camera", desc: "Hardware Sensor" },
    { icon: Cpu, name: "Picamera2", desc: "Raspberry Pi 4 Driver" },
    { icon: Eye, name: "YOLOv8 Model", desc: "Edge Inference" },
    { icon: Database, name: "Cloud Firestore", desc: "Realtime Database" },
    { icon: LayoutDashboard, name: "Monitoring Dashboard", desc: "React Web Client" },
  ];

  return (
    <div className="bg-white border-b border-slate-200 py-2.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto text-xs scrollbar-none gap-2">
        <div className="flex items-center gap-1 text-slate-400 font-semibold uppercase tracking-wider text-[10px] shrink-0 mr-2">
          <span>System Pipeline</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.name}>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded">
                  <Icon className="w-3.5 h-3.5 text-slate-600" />
                  <div>
                    <span className="font-semibold text-slate-800 block leading-tight">{step.name}</span>
                    <span className="text-[10px] text-slate-500 block leading-tight">{step.desc}</span>
                  </div>
                </div>

                {idx < steps.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
