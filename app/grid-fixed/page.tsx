"use client";

import React from "react";
import ShowcaseLayout from "@/components/show-case-layout";
import { BookOpen, PlayCircle } from "lucide-react";
import { Docs } from "./docs";
import Demo from "./demo";

/**
 * Case Study 8: Huge Dataset / 2D Grid / Fixed Size
 * Bidirectional virtualization for massive matrices.
 * Performance: O(1) for millions of cells.
 */
export default function GridFixedPage() {
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
