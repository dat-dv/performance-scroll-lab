"use client";

import React from "react";
import Link from "next/link";

export type CaseScale = "short" | "long" | "all";
export type CaseDirection = "vertical" | "horizontal" | "bidirectional" | "all";
export type CaseItemSize = "fixed" | "dynamic" | "all";

export interface RenderCase {
  title: string;
  description: string;
  recommendation: string;
  href: string;
  // Filter Tags
  scale: CaseScale;
  direction: CaseDirection;
  itemSize: CaseItemSize;
  isDone: boolean;
}

interface CaseCardProps {
  item: RenderCase;
}

/**
 * Card component for individual virtualization use cases.
 */
export function CaseCard({ item }: CaseCardProps) {
  const isAvailable = item.isDone && item.href;

  return (
    <li
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-md shadow-black/5 backdrop-blur-sm transition-all dark:shadow-black/20 ${"hover:border-slate-300 hover:bg-slate-100 dark:border-white/5 dark:bg-black/20 dark:bg-white/5 dark:hover:border-white/10 dark:hover:bg-white/10"}`}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-[10px] leading-relaxed font-black tracking-widest text-slate-400 uppercase dark:text-slate-500">
            {item.title}
          </h2>

          <div className="size-2 shrink-0 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed font-medium text-slate-900 dark:text-slate-200">
          {item.description}
        </p>
      </div>

      <div className="mt-6 flex items-end justify-between gap-2 border-t border-slate-200 pt-4 dark:border-white/5">
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] font-black tracking-tighter text-slate-400 uppercase dark:text-slate-500">
            SUGGESTION
          </span>
          <p className="line-clamp-1 text-[11px] font-bold text-slate-600 italic dark:text-slate-400">
            {item.recommendation}
          </p>
        </div>

        {isAvailable ? (
          <Link
            href={item.href}
            className="w-fit shrink-0 rounded-lg bg-blue-500/10 px-3 py-1.5 text-[10px] font-black tracking-tighter text-blue-500 shadow-sm transition-all hover:bg-blue-500 hover:text-white dark:text-blue-400"
          >
            GO →
          </Link>
        ) : (
          <span className="w-fit shrink-0 rounded-lg bg-slate-100 px-3 py-1.5 text-[10px] font-black tracking-tighter text-slate-400 dark:bg-white/5 dark:text-slate-600">
            SOON
          </span>
        )}
      </div>
    </li>
  );
}
