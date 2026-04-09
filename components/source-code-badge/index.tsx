"use client";

import React from "react";
import { Code } from "lucide-react";
import { GIT_REPO } from "@/constansts/config";

interface SourceCodeBadgeProps {
  path: string;
}

/**
 * Common component to display a link to the source code on GitHub.
 */
export function SourceCodeBadge({ path }: SourceCodeBadgeProps) {
  return (
    <div className="mb-6 flex items-center gap-2">
      <a
        href={GIT_REPO + path}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 opacity-40 transition-opacity hover:text-blue-500 hover:opacity-100"
      >
        <Code className="size-3" />
        <span className="font-mono text-[10px] font-bold tracking-tight">{path}</span>
      </a>
    </div>
  );
}
