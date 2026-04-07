"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/libs/cn";

interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
}

/**
 * FilterChip: The selectable chip used across the Wizard toolbar.
 */
export function FilterChip({ active, onClick, icon, label }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-2.5 rounded-lg px-4 py-2 text-[10px] font-black transition-all outline-none active:scale-[0.98]",
        active
          ? "bg-blue-500 text-white shadow-lg ring-1 shadow-blue-500/30 ring-blue-400/20"
          : "text-slate-600 hover:bg-black/5 hover:text-slate-900 dark:text-slate-500 dark:hover:bg-white/10 dark:hover:text-slate-200"
      )}
    >
      {icon && (
        <span
          className={cn(
            "transition-colors",
            active
              ? "text-white"
              : "text-slate-500 group-hover:text-slate-900 dark:text-slate-600 dark:group-hover:text-slate-400"
          )}
        >
          {icon}
        </span>
      )}
      <span className="tracking-tighter">{label.toUpperCase()}</span>

      {active && (
        <motion.div
          layoutId="chip-active"
          className="absolute -right-1 -bottom-1 -left-1 h-0.5 rounded-full bg-blue-500/50 blur-sm"
        />
      )}
    </button>
  );
}
