"use client";

import ShowcaseLayout from "@/components/show-case-layout";
import { BookOpen, PlayCircle } from "lucide-react";
import Docs from "./docs";
import Demo2 from "./demo-2";
import Demo1 from "./demo-1";

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
      label: "TV Channels (Independent Rows)",
      value: "demo1",
      icon: <PlayCircle className="size-4" />,
      children: <Demo1 />,
    },
    {
      label: "Live Demo (Comming Soon)",
      value: "demo2",
      icon: <PlayCircle className="size-4" />,
      children: <Demo2 />,
    },
  ];

  return <ShowcaseLayout tabs={tabs} />;
}
