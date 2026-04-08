"use client";

import { Docs } from "./docs";
import ShowcaseLayout from "@/components/show-case-layout";
import { BookOpen, PlayCircle } from "lucide-react";
import Demo1 from "./demo-1";
import Demo2 from "./demo-2";

export default function Case6() {
  const tabs = [
    {
      label: "Technical Docs",
      value: "docs",
      icon: <BookOpen className="size-4" />,
      children: <Docs />,
    },
    {
      label: "Live Demo (Single-row)",
      value: "demo",
      icon: <PlayCircle className="size-4" />,
      children: <Demo1 />,
    },
    {
      label: "Live Demo (Multi-row)",
      value: "demo2",
      icon: <PlayCircle className="size-4" />,
      children: <Demo2 />,
    },
  ];

  return <ShowcaseLayout tabs={tabs} />;
}
