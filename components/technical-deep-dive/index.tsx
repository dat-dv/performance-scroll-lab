"use client";

import { cn } from "@/libs/cn";
import React, { ComponentProps } from "react";

interface DeepDivePoint {
  title: string;
  description: string;
  colorClass: string;
  label?: string;
}

interface TechnicalDeepDiveProps extends ComponentProps<"div"> {
  mainTitle: string;
  points: DeepDivePoint[];
}

/**
 * TechnicalDeepDive Component
 * Provides a structured 3-column layout to explain the mathematical/logical
 * reasons behind specific performance implementations.
 */
export function TechnicalDeepDive({
  mainTitle,
  points,
  className,
  ...rest
}: TechnicalDeepDiveProps) {
  return (
    <div
      className={cn(
        "mt-10 rounded-2xl border border-gray-100 bg-gray-50/30 p-6 dark:border-white/5 dark:bg-zinc-900/40",
        className
      )}
      {...rest}
    >
      <h3 className="mb-4 text-sm font-bold tracking-widest text-gray-900 uppercase dark:text-white">
        {mainTitle}
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {points.map((point, index) => (
          <div key={index} className="space-y-2">
            <h4 className={cn("text-xs font-bold", point.colorClass)}>
              {index + 1}. {point.label && <span className="opacity-60">{point.label}: </span>}
              {point.title}
            </h4>
            <p className="text-xs leading-relaxed text-gray-500">{point.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
