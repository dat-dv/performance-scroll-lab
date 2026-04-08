"use client";

import React from "react";
import Link from "next/link";
import { Code } from "lucide-react";
import { GIT_REPO } from "@/app/constansts/config";
import { cn } from "@/libs/cn";

export type CaseScale = "short" | "long" | "all";
export type CaseDirection = "vertical" | "horizontal" | "bidirectional" | "all";
export type CaseItemSize = "fixed" | "dynamic" | "all";

export interface RenderCase {
  id: string;
  title: string;
  description: string;
  recommendation: string;
  href: string;
  sourcePath: string;
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
 * CaseCard component - Modularized for all virtualization lab scenarios.
 * Implements a premium visual treatment for "Coming Soon" states.
 */
export function CaseCard({ item }: CaseCardProps) {
  const isAvailable = item.isDone && item.href;

  return (
    <li
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 ${
        isAvailable
          ? "border-slate-200 bg-white shadow-sm hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 dark:border-white/5 dark:bg-white/5 dark:hover:border-blue-500/50"
          : "border-slate-100 bg-slate-50/50 opacity-75 grayscale dark:border-white/5 dark:bg-white/5"
      } p-6`}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h2
            className={`text-xs font-bold transition-colors ${
              isAvailable
                ? "text-blue-600 dark:text-blue-400"
                : "text-slate-400 dark:text-slate-600"
            }`}
          >
            {item.title}
          </h2>
          {isAvailable && (
            <div className="size-2 shrink-0 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          )}
        </div>

        <p className="line-clamp-2 text-sm font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
          {item.description}
        </p>

        {/* 📝 Source Path Reference */}
        <a
          href={isAvailable ? GIT_REPO + item.sourcePath : "#"}
          target={isAvailable ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className={`flex w-fit items-center gap-1.5 transition-all ${
            isAvailable
              ? "opacity-50 hover:text-blue-500 hover:opacity-100"
              : "cursor-not-allowed opacity-20"
          }`}
        >
          <Code className="size-3" />
          <span className="font-mono text-[11px] font-medium">{item.sourcePath}</span>
        </a>
      </div>

      <div className="mt-8 flex items-end justify-between gap-2 border-t border-slate-100 pt-4 dark:border-white/5">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
            Strategy Recommendation
          </span>
          <p className="line-clamp-1 text-sm font-medium text-slate-600 dark:text-slate-400">
            {item.recommendation}
          </p>
        </div>

        <Link
          href={item.href || "#"}
          className={cn(
            "flex h-9 shrink-0 items-center rounded-lg px-4 text-xs font-bold transition-all",
            item.isDone
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-600"
          )}
        >
          GO →
        </Link>
      </div>
    </li>
  );
}
