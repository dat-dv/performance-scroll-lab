"use client";

import React from "react";

interface FilterGroupProps {
  label: string;
  children: React.ReactNode;
}

/**
 * FilterGroup: Containers for chip buttons with a label.
 */
export function FilterGroup({ label, children }: FilterGroupProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[10px] leading-none font-black tracking-widest text-slate-500 uppercase">
        {label}
      </span>
      <div className="flex items-center gap-1.5 rounded-xl bg-slate-200/50 p-1.5 ring-1 ring-slate-200 backdrop-blur-md dark:bg-black/30 dark:ring-white/5">
        {children}
      </div>
    </div>
  );
}
