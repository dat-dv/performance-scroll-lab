"use client";

import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge tailwind classes
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LaboratoryDemoHeaderProps {
  /**
   * Main title of the demo section
   * @default "Live Demo"
   */
  title?: string;
  /**
   * Smaller description or technical stats (e.g., "100 Items • Native Grid")
   */
  description?: string;
  /**
   * Text displayed in the status badge
   * @default "Interactive"
   */
  badgeText?: string;
  /**
   * Color class for the pulse dot
   * @default "bg-emerald-500"
   */
  badgeColor?: string;
  /**
   * Additional className for the container
   */
  className?: string;
}

/**
 * Common header component for Laboratory Demo sections.
 * Follows the Antigravity Premium design pattern with a pulse badge and technical stats.
 */
export function LaboratoryDemoHeader({
  title = "Live Demo",
  description,
  badgeText = "Interactive",
  badgeColor = "bg-emerald-500",
  className,
}: LaboratoryDemoHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-slate-100 px-8 py-5 dark:border-white/5",
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
          {title}
        </h3>
        {description && (
          <p className="text-[10px] font-semibold text-slate-500/80 dark:text-slate-400/80 tracking-tight">
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className={cn("flex size-2 animate-pulse rounded-full", badgeColor)}></span>
        <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
          {badgeText}
        </span>
      </div>
    </div>
  );
}
