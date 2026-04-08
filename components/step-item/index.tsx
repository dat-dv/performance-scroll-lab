import React from "react";
import { ExternalLink, Sparkles } from "lucide-react";

/**
 * Common Step Component - Tái sử dụng với phối màu linh hoạt
 */
function StepItem({
  step,
  title,
  children,
  accentColor,
  glowColor,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
  accentColor: string; // Tailwind class for text & bg
  glowColor: string; // Tailwind class for shadow/glow
}) {
  return (
    <div className="group relative flex gap-10 pb-16 last:pb-0">
      {/* Timeline Line with Gradient */}
      <div className="absolute top-12 left-[21px] h-full w-[2px] bg-slate-100 group-last:hidden dark:bg-white/5" />

      {/* Premium Step Indicator */}
      <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center">
        {/* Glow Effect */}
        <div
          className={`absolute inset-0 rounded-2xl ${accentColor} opacity-20 blur-xl transition-opacity group-hover:opacity-40`}
        />

        {/* Main Badge */}
        <div
          className={`relative flex size-full items-center justify-center rounded-2xl border border-white/40 bg-white shadow-xl transition-all group-hover:scale-110 group-hover:-rotate-6 dark:border-white/5 dark:bg-slate-900 ${glowColor}`}
        >
          <span className={`text-[11px] font-black tracking-tighter italic ${accentColor}`}>
            {step}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-4 pt-1.5">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {title}
        </h3>
        <div className="max-w-3xl text-[15px] leading-relaxed text-slate-500 transition-colors group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-300">
          {children}
        </div>
      </div>
    </div>
  );
}

export default StepItem;
