"use client";
import ShowcaseLayout from "@/components/show-case-layout";
import { BookOpen, PlayCircle } from "lucide-react";
import { Docs } from "./docs";
import Demo from "./demo-2";
import DemoWindowScroll from "./demo-1";

/**
 * Case 5: Huge Dataset / Vertical / Dynamic Height
 * Demonstrates advanced virtualization where items have varying heights.
 */
export default function DynamicHeightPage() {
  const tabs = [
    {
      label: "Technical Docs",
      value: "docs",
      icon: <BookOpen className="size-4" />,
      children: <Docs />,
    },
    {
      label: "Live Demo (Window Scroll)",
      value: "demo",
      icon: <PlayCircle className="size-4" />,
      children: <DemoWindowScroll />,
    },
    {
      label: "Live Demo (Container Scroll)",
      value: "demo-2",
      icon: <PlayCircle className="size-4" />,
      children: <Demo />,
    },
  ];

  return <ShowcaseLayout tabs={tabs} />;
}
