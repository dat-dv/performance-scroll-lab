"use client";

import React from "react";

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

/**
 * Shared TabButton component for local navigation between Demo and Docs.
 */
export function TabButton({ active, onClick, icon, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${
        active
          ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:text-white dark:ring-white/10"
          : "text-slate-400 hover:bg-slate-200/50 hover:text-slate-600 dark:hover:bg-white/5 dark:hover:text-slate-300"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
