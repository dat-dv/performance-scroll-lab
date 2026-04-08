"use client";

import { cn } from "@/libs/cn";
import React, { ComponentProps } from "react";

interface IntroPoint {
  label: string;
  description: string;
}

interface TechnicalIntroProps extends ComponentProps<"div"> {
  title: string;
  category?: string;
  challengeTitle?: string;
  solutionTitle?: string;
  challenges: IntroPoint[];
  solutions: IntroPoint[];
}

/**
 * Generic TechnicalIntro Component
 * Renders structured technical documentation for performance-oriented demos.
 */
export function TechnicalIntro({
  title,
  challengeTitle = "🔴 Thách thức:",
  solutionTitle = "🟢 Giải pháp:",
  challenges,
  solutions,
  className,
  ...rest
}: TechnicalIntroProps) {
  return (
    <div className={cn("mb-10", className)} {...rest}>
      <h1 className="text-xl font-bold tracking-tight tracking-widest text-gray-900 uppercase dark:text-white">
        {title}
      </h1>
      <div className="mt-4 max-w-4xl text-sm leading-relaxed text-gray-500">
        <div className="mb-6">
          <span className="flex items-center gap-2 font-bold text-red-600 dark:text-red-500">
            {challengeTitle}
          </span>
          <ul className="mt-2 ml-2 list-inside list-disc space-y-1">
            {challenges.map((point, i) => (
              <li key={i}>
                <strong>{point.label}:</strong> {point.description}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-500">
            {solutionTitle}
          </span>
          <ul className="mt-2 ml-2 list-inside list-disc space-y-1">
            {solutions.map((point, i) => (
              <li key={i}>
                <strong>{point.label}:</strong> {point.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
