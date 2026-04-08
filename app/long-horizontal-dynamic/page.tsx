"use client";

import React from "react";
import ShowcaseLayout from "@/components/show-case-layout";
import { BookOpen, PlayCircle } from "lucide-react";
import { Docs } from "./docs";
import Demo from "./demo";

/**
 * Case Study 7: Huge Dataset / Horizontal / Dynamic Width
 * Handles virtualization where each item has an unpredictable width.
 * Uses ResizeObserver for real-time coordinate synchronization.
 */
export default function HorizontalDynamicPage() {
  const tabs = [
    {
      label: "Technical Docs",
      value: "docs",
      icon: <BookOpen className="size-4" />,
      children: <Docs />,
    },
    {
      label: "Live Demo",
      value: "demo",
      icon: <PlayCircle className="size-4" />,
      children: <Demo />,
    },
  ];

  return <ShowcaseLayout tabs={tabs} />;
}
